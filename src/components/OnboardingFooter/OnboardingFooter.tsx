import type { ReactNode } from "react";
import { ButtonLoader } from "@/components/ui/ButtonLoader";

type FooterAction = {
  label: string;
  formId?: string;
  onClick?: () => void | Promise<void>;
  loading?: boolean;
  disabled?: boolean;
  hidden?: boolean;
};

type OnboardingFooterProps = {
  back?: FooterAction;
  primary?: FooterAction;
  children?: ReactNode;
};

export function OnboardingFooter({
  back,
  primary,
  children,
}: OnboardingFooterProps) {
  return (
    <div className="mt-8 flex items-center justify-between border-t pt-5">
      {/* Back */}
      <div>
        {back && !back.hidden && (
          <button
            type="button"
            onClick={back.onClick}
            disabled={back.disabled || back.loading}
            className="
              rounded-lg border border-gray-300
              bg-white px-5 py-2.5
              text-sm font-medium text-gray-700
              transition hover:bg-gray-50
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {back.loading ? <ButtonLoader text="Please wait..." /> : back.label}
          </button>
        )}
      </div>

      {children}

      {/* Primary */}
      <div>
        {primary && !primary.hidden && (
          <button
            type="submit"
            form={primary.formId}
            disabled={primary.disabled || primary.loading}
            className="
              inline-flex min-w-[120px]
              items-center justify-center
              rounded-lg bg-primary-600
              px-5 py-2.5
              text-sm font-medium text-white
              transition hover:bg-primary-700
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {primary.loading ? <ButtonLoader /> : primary.label}
          </button>
        )}
      </div>
    </div>
  );
}
