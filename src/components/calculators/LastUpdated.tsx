import { Clock } from "lucide-react";

interface LastUpdatedProps {
  date: string;
}

export const LastUpdated = ({ date }: LastUpdatedProps) => (
  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mt-4">
    <Clock className="size-3" />
    <span>Last updated: {date}</span>
  </div>
);
