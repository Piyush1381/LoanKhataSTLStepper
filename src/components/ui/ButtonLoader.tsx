import { Loader2 } from "lucide-react";

type ButtonLoaderProps = {
  text?: string;
};

export function ButtonLoader({ text = "Please wait..." }: ButtonLoaderProps) {
  return (
    <span className="inline-flex items-center gap-2">
      <Loader2 className="h-4 w-4 animate-spin" />
      {text}
    </span>
  );
}
