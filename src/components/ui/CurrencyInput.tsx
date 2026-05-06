import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface CurrencyInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  prefix?: string;
  suffix?: string;
  step?: number;
  className?: string;
  inputClassName?: string;
  label?: string;
  id?: string;
}

/**
 * CurrencyInput — a controlled number input that:
 * 1. Allows the user to fully clear the field (no stuck-zero bug)
 * 2. Shows formatted value (e.g. £300,000) when not focused
 * 3. Shows raw number when focused for easy editing
 * 4. Clamps to min/max on blur
 */
export function CurrencyInput({
  value,
  onChange,
  min = 0,
  max = Infinity,
  prefix = "£",
  suffix = "",
  step = 1,
  className,
  inputClassName,
  label,
  id,
}: CurrencyInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [raw, setRaw] = useState<string>(value === 0 ? "" : String(value));
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync external value changes into raw when not focused
  useEffect(() => {
    if (!isFocused) {
      setRaw(value === 0 ? "0" : String(value));
    }
  }, [value, isFocused]);

  const handleFocus = () => {
    setIsFocused(true);
    // Show plain number when focused, strip formatting
    setRaw(value === 0 ? "" : String(value));
    // Select all on focus for easy replacement
    setTimeout(() => inputRef.current?.select(), 0);
  };

  const handleBlur = () => {
    setIsFocused(false);
    const parsed = parseFloat(raw.replace(/[^0-9.]/g, ""));
    if (isNaN(parsed) || raw.trim() === "") {
      // Empty or invalid — reset to min
      const clamped = Math.max(min, 0);
      setRaw(String(clamped));
      onChange(clamped);
    } else {
      const clamped = Math.min(Math.max(parsed, min), max);
      setRaw(String(clamped));
      onChange(clamped);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow digits, one decimal point, nothing else
    const cleaned = e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
    setRaw(cleaned);
    if (cleaned === "" || cleaned === ".") {
      // Don't call onChange yet — user is still typing
      return;
    }
    const parsed = parseFloat(cleaned);
    if (Number.isFinite(parsed)) {
      onChange(Math.min(Math.max(parsed, min), max));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min((value || 0) + step, max);
      onChange(next);
      setRaw(String(next));
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max((value || 0) - step, min);
      onChange(next);
      setRaw(String(next));
    }
  };

  // Display value: formatted when not focused, raw when focused
  const displayValue = isFocused
    ? raw
    : value === 0
    ? "0"
    : value.toLocaleString("en-GB");

  return (
    <div className={cn("relative flex items-center", className)}>
      {prefix && (
        <span className="absolute left-3 text-sm font-medium text-muted-foreground pointer-events-none select-none z-10">
          {prefix}
        </span>
      )}
      <input
        ref={inputRef}
        id={id}
        type="text"
        inputMode="decimal"
        autoComplete="off"
        value={displayValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        aria-label={label}
        className={cn(
          "w-full rounded-md border border-input bg-background text-sm ring-offset-background",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "h-10 py-2 transition-colors",
          "touch-manipulation",
          prefix ? "pl-7 pr-3" : "px-3",
          suffix ? "pr-7" : "",
          inputClassName
        )}
      />
      {suffix && (
        <span className="absolute right-3 text-sm font-medium text-muted-foreground pointer-events-none select-none z-10">
          {suffix}
        </span>
      )}
    </div>
  );
}
