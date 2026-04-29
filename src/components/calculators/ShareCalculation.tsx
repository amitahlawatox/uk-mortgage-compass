import { useState } from "react";
import { Share2, MessageCircle, Mail, FileDown, Link2, Check } from "lucide-react";
import jsPDF from "jspdf";
import { track } from "@/lib/analytics";

export interface ShareLine {
  label: string;
  value: string;
}

export interface ShareSection {
  heading: string;
  lines: ShareLine[];
}

interface ShareCalculationProps {
  title: string;
  calculator: string;
  summary: ShareLine[];
  intro?: string;
  sections?: ShareSection[];
  notes?: string[];
}

const buildText = (
  title: string,
  intro: string | undefined,
  summary: ShareLine[],
  sections: ShareSection[] | undefined,
  url: string,
) => {
  const header = `${title} — RepayWise`;
  const summaryBlock = summary.map((s) => `• ${s.label}: ${s.value}`).join("\n");
  const sectionBlocks = (sections ?? [])
    .map((s) => `\n${s.heading}\n${s.lines.map((l) => `• ${l.label}: ${l.value}`).join("\n")}`)
    .join("\n");
  return [header, intro, summaryBlock, sectionBlocks, "", `Calculate yours: ${url}`]
    .filter(Boolean)
    .join("\n");
};

/**
 * Open a Blob PDF in a new browser tab safely on iOS Safari.
 * `doc.save()` triggers an in-place navigation that replaces the current
 * calculator tab on iOS. Using an anchor with target="_blank" keeps the
 * calculator open and shows the PDF in a separate tab; on desktop the
 * `download` attribute still triggers a normal file download.
 */
const openPdfInNewTab = (doc: jsPDF, filename: string) => {
  const blob = doc.output("blob");
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
};

export const ShareCalculation = ({
  title,
  calculator,
  summary,
  intro,
  sections,
  notes,
}: ShareCalculationProps) => {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "https://repaywise.co.uk";
  const text = buildText(title, intro, summary, sections, url);

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

    const INK: [number, number, number] = [20, 20, 20];
    const BODY: [number, number, number] = [70, 70, 70];
    const MUTED: [number, number, number] = [130, 130, 130];
    const RULE: [number, number, number] = [220, 220, 220];
    const ZEBRA: [number, number, number] = [248, 248, 248];

    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 48;
    let y = 56;

    const ensureSpace = (needed: number) => {
      if (y + needed > pageHeight - 80) {
        doc.addPage();
        y = 56;
      }
    };

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(INK[0], INK[1], INK[2]);
    doc.text("RepayWise", margin, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
    doc.text("UK Mortgage Calculators", pageWidth - margin, y, { align: "right" });

    y += 10;
    doc.setDrawColor(RULE[0], RULE[1], RULE[2]);
    doc.setLineWidth(0.6);
    doc.line(margin, y, pageWidth - margin, y);

    y += 32;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(INK[0], INK[1], INK[2]);
    const wrappedTitle = doc.splitTextToSize(title, pageWidth - margin * 2);
    doc.text(wrappedTitle, margin, y);
    y += wrappedTitle.length * 22;

    const dateStr = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
    doc.text(`Generated ${dateStr}`, margin, y);
    y += 18;

    if (intro) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10.5);
      doc.setTextColor(BODY[0], BODY[1], BODY[2]);
      const wrapped = doc.splitTextToSize(intro, pageWidth - margin * 2);
      doc.text(wrapped, margin, y);
      y += wrapped.length * 14 + 6;
    }

    const renderSection = (heading: string, lines: ShareLine[]) => {
      ensureSpace(40 + lines.length * 24);
      y += 14;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
      doc.text(heading.toUpperCase(), margin, y);
      y += 6;
      doc.setDrawColor(RULE[0], RULE[1], RULE[2]);
      doc.line(margin, y, pageWidth - margin, y);
      y += 14;

      lines.forEach((row, i) => {
        ensureSpace(24);
        const rowH = 22;
        if (i % 2 === 0) {
          doc.setFillColor(ZEBRA[0], ZEBRA[1], ZEBRA[2]);
          doc.rect(margin, y - 14, pageWidth - margin * 2, rowH, "F");
        }
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10.5);
        doc.setTextColor(BODY[0], BODY[1], BODY[2]);
        doc.text(row.label, margin + 10, y);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(INK[0], INK[1], INK[2]);
        doc.text(row.value, pageWidth - margin - 10, y, { align: "right" });
        y += rowH;
      });
    };

    renderSection("Summary", summary);
    (sections ?? []).forEach((s) => renderSection(s.heading, s.lines));

    if (notes && notes.length) {
      ensureSpace(40);
      y += 18;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
      doc.text("NOTES", margin, y);
      y += 6;
      doc.setDrawColor(RULE[0], RULE[1], RULE[2]);
      doc.line(margin, y, pageWidth - margin, y);
      y += 14;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(BODY[0], BODY[1], BODY[2]);
      notes.forEach((note) => {
        const wrapped = doc.splitTextToSize(`• ${note}`, pageWidth - margin * 2);
        ensureSpace(wrapped.length * 13 + 6);
        doc.text(wrapped, margin, y);
        y += wrapped.length * 13 + 4;
      });
    }

    const pageCount = doc.getNumberOfPages();
    for (let p = 1; p <= pageCount; p++) {
      doc.setPage(p);
      const footerY = pageHeight - 40;
      doc.setDrawColor(RULE[0], RULE[1], RULE[2]);
      doc.line(margin, footerY - 14, pageWidth - margin, footerY - 14);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
      doc.text(
        "Estimates only — not financial advice. Confirm figures with a qualified, FCA-authorised broker.",
        margin,
        footerY,
      );
      doc.text(`Page ${p} of ${pageCount}`, pageWidth - margin, footerY, { align: "right" });
      doc.setTextColor(BODY[0], BODY[1], BODY[2]);
      doc.text(url, margin, footerY + 12);
    }

    const safe = calculator.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
    openPdfInNewTab(doc, `repaywise-${safe}-${Date.now()}.pdf`);
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
