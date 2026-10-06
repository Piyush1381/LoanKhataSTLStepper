import { CustomStepper } from "@/components/CustomStepper";
import { OnboardingFooter } from "@/components/OnboardingFooter/OnboardingFooter";
import { CommonDialog } from "@/components/ui/CommonDialog";

import { onboardingSteps } from "@/features/onboarding/onboarding.steps";
import { useOnboardingStore } from "@/features/onboarding/onboarding.store";
import { useState } from "react";
import { ScreenLoader } from "@/components/ui/ScreenLoader";

export default function OnboardingPage() {
  const {
    currentStep,
    completedSteps,
    data,
    isSubmitting,
    error,

    setCurrentStep,
    setStepData,
    markCompleted,
    setSubmitting,
    setError,
  } = useOnboardingStore();

  const [dialog, setDialog] = useState({
    open: false,
    title: "",
    description: "",
    variant: "info" as "error" | "warning" | "success" | "info",
  });

  const step = onboardingSteps[currentStep];

  const StepComponent = step.component;

  const isFirstStep = currentStep === 0;

  const isLastStep = currentStep === onboardingSteps.length - 1;

  // Unique form ID for current step
  const formId = `onboarding-form-${step.id}`;

  const handleNext = async (formData: unknown) => {
    try {
      setSubmitting(true);
      setError(null);

      // 1. Store form data
      setStepData(step.id, formData);

      // 2. Call API if this step has API
      if (step.submit) {
        await step.submit(formData);
      }

      // 3. Mark step complete
      markCompleted(step.id);

      // 4. Move to next step
      if (!isLastStep) {
        setCurrentStep(currentStep + 1);
      }

      // Last step
      if (isLastStep) {
        // onboarding complete logic
        console.log("Onboarding completed");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");

      setDialog({
        open: true,
        title: "Unable to continue",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
        variant: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      {isSubmitting && <ScreenLoader text="Saving your information..." />}

      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Stepper */}
        <CustomStepper
          steps={onboardingSteps}
          currentStep={currentStep}
          completedSteps={completedSteps}
        />

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Step content */}
        <div className="mt-8 rounded-xl border bg-white p-6">
          <StepComponent
            formId={formId}
            initialData={data[step.id]}
            isSubmitting={isSubmitting}
            onNext={handleNext}
            onBack={handleBack}
          />

          {/* Footer */}
          <OnboardingFooter
            back={{
              label: "Back",
              onClick: handleBack,
              hidden: isFirstStep,
              disabled: isSubmitting,
            }}
            primary={{
              label:
                step.footer?.primaryLabel ??
                (isLastStep ? "Finish" : "Continue"),

              onClick: () => {
                // Important:
                // Footer should trigger the current form submit.
              },
              // Footer submits CURRENT step form
              formId,

              loading: isSubmitting,
              disabled: isSubmitting,
            }}
          />
        </div>

        <CommonDialog
          open={dialog.open}
          title={dialog.title}
          description={dialog.description}
          variant={dialog.variant}
          onClose={() =>
            setDialog((prev) => ({
              ...prev,
              open: false,
            }))
          }
        />
      </div>
    </>
  );
}
