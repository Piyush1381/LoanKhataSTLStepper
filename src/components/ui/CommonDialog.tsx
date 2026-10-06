import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type CommonDialogProps = {
  open: boolean;
  title: string;
  description?: string;

  onClose: () => void;

  confirmLabel?: string;
  cancelLabel?: string;

  onConfirm?: () => void | Promise<void>;

  loading?: boolean;

  variant?: "error" | "warning" | "success" | "info";
};

export function CommonDialog({
  open,
  title,
  description,
  onClose,
  confirmLabel = "OK",
  cancelLabel = "Cancel",
  onConfirm,
  loading = false,
  variant = "info",
}: CommonDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>

          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <DialogFooter>
          {onConfirm && (
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-lg border px-4 py-2 text-sm"
            >
              {cancelLabel}
            </button>
          )}

          <button
            type="button"
            onClick={onConfirm ?? onClose}
            disabled={loading}
            className={[
              "rounded-lg px-4 py-2",
              "text-sm font-medium text-white",

              variant === "error"
                ? "bg-red-600 hover:bg-red-700"
                : variant === "warning"
                  ? "bg-amber-600 hover:bg-amber-700"
                  : variant === "success"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-primary-600 hover:bg-primary-700",
            ].join(" ")}
          >
            {loading ? "Please wait..." : confirmLabel}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
