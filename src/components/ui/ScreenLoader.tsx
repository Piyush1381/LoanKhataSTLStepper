import { Loader2 } from "lucide-react";

type ScreenLoaderProps = {
  text?: string;
};

export function ScreenLoader({ text = "Please wait..." }: ScreenLoaderProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-[1px]">
      <div className="flex flex-col items-center gap-3 rounded-xl bg-white/90 px-6 py-5 shadow-lg">
        <Loader2 className="h-7 w-7 animate-spin text-primary-600" />

        <span className="text-sm font-medium text-gray-700">{text}</span>
      </div>
    </div>
  );
}
