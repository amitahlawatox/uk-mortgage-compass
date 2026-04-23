import { useState } from "react";
import { Share2, MessageCircle, Mail, FileDown, Link2, Check } from "lucide-react";
import jsPDF from "jspdf";
import { track } from "@/lib/analytics";

export interface ShareLine {
  label: string;
  value: string;
}

interface ShareCalculationProps {
  title: string;
  /** Short calculator id, e.g. "repayment" */
  calculator: string;
  /** Key/value lines summarising the result */
  summary: ShareLine[];
  /** Optional preamble line (e.g. inputs) */
  intro?: string;
}

const buildText = (title: string, intro: string | undefined, summary: ShareLine[], url: string) => {
  const header = `${title} — RepayWise`;
  const body = summary.map((s) => `• ${s.label}: ${s.value}`).join("\n");
  return [header, intro, body, "", `Calculate yours: ${url}`].filter(Boolean).join("\n");
};

export const ShareCalculation = ({ title, calculator, summary, intro }: ShareCalculationProps) => {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "https://www.repaywise.co.uk";
  const text = buildText(title, intro, summary, url);

  const onWhatsApp = () => {
    track("share_calculation", { calculator, channel: "whatsapp" });
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  const onEmail = () => {
    track("share_calculation", { calculator, channel: "email" });
    const subject = encodeURIComponent(`${title} — RepayWise`);
    const body = encodeURIComponent(text);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const onCopy = async () => {
    track("share_calculation", { calculator, channel: "link" });
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* noop */
    }
  };

  const onPdf = () => {
    track("share_calculation", { calculator, channel: "pdf" });
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 48;
    let y = 64;

    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(20, 20, 20);
    doc.text("RepayWise", margin, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(120, 120, 120);
    doc.text("UK Mortgage Calculators", pageWidth - margin, y, { align: "right" });

    // Divider
    y += 14;
    doc.setDrawColor(220, 220, 220);
    doc.line(margin, y, pageWidth - margin, y);

    // Title
    y += 36;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(20, 20, 20);
    doc.text(title, margin, y);

    if (intro) {
      y += 22;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(90, 90, 90);
      const wrapped = doc.splitTextToSize(intro, pageWidth - margin * 2);
      doc.text(wrapped, margin, y);
      y += wrapped.length * 14;
    }

    // Summary table
    y += 24;
    doc.setDrawColor(235, 235, 235);
    doc.setFillColor(248, 248, 248);
    summary.forEach((row, i) => {
      const rowH = 28;
      if (i % 2 === 0) doc.rect(margin, y - 18, pageWidth - margin * 2, rowH, "F");
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(80, 80, 80);
      doc.text(row.label, margin + 12, y);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(20, 20, 20);
      doc.text(row.value, pageWidth - margin - 12, y, { align: "right" });
      y += rowH;
      if (y > 760) {
        doc.addPage();
        y = 64;
      }
    });

    // Footer
    const footerY = doc.internal.pageSize.getHeight() - 48;
    doc.setDrawColor(220, 220, 220);
    doc.line(margin, footerY - 16, pageWidth - margin, footerY - 16);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(140, 140, 140);
    doc.text(
      "Estimates only — not financial advice. Always confirm figures with a qualified broker.",
      margin,
      footerY,
    );
    doc.setTextColor(90, 90, 90);
    doc.text(url, pageWidth - margin, footerY, { align: "right" });

    const safe = calculator.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
    doc.save(`repaywise-${safe}-${Date.now()}.pdf`);
  };

  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Share2 className="size-4 text-accent" />
        <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          Share this calculation
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <ShareButton onClick={onWhatsApp} icon={<MessageCircle className="size-4" />} label="WhatsApp" />
        <ShareButton onClick={onEmail} icon={<Mail className="size-4" />} label="Email" />
        <ShareButton onClick={onPdf} icon={<FileDown className="size-4" />} label="PDF" />
        <ShareButton
          onClick={onCopy}
          icon={copied ? <Check className="size-4 text-success" /> : <Link2 className="size-4" />}
          label={copied ? "Copied" : "Copy"}
        />
      </div>
    </div>
  );
};

const ShareButton = ({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-3 py-2.5 text-xs font-semibold hover:border-accent hover:bg-accent/5 transition-colors"
  >
    {icon}
    <span>{label}</span>
  </button>
);
