import type {
  ComponentType,
  ReactNode,
} from "react";

import type { LucideIcon } from "lucide-react";

export type OnboardingStepProps = {
     formId: string;
  initialData?: unknown;
  isSubmitting: boolean;
  onNext: (data: unknown) => Promise<void>;
  onBack: () => void;
};

export type OnboardingStep = {
  id: string;
  title: ReactNode;
  icon?: LucideIcon;
  description: ReactNode;
  component: ComponentType<OnboardingStepProps>;

  submit?: (
    data: unknown
  ) => Promise<unknown>;

   footer?: {
    primaryLabel?: string;
    secondaryLabel?: string;

    hideBack?: boolean;
    hidePrimary?: boolean;
  };

};
