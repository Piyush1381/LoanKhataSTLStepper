import type { OnboardingStep } from "@/features/onboarding/onboarding.type";

type StepperProps = {
  steps: OnboardingStep[];
  currentStep: number;
  completedSteps: string[];

  onStepClick?: (index: number) => void;

  activeColor?: string;
  completedColor?: string;
};
export function CustomStepper({
  steps,
  currentStep,
  completedSteps,
  onStepClick,

  activeColor = "bg-primary-600",
  completedColor = "bg-primary-600",
}: StepperProps) {
  return (
    <div className="w-full">
      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block">
        <div className="relative flex w-full">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(step.id);
            const isActive = currentStep === index;
            const isLast = index === steps.length - 1;

            const Icon = step.icon;

            return (
              <div
                key={step.id}
                className="relative flex flex-1 flex-col items-center"
              >
                {/* Connector */}
                {!isLast && (
                  <div
                    className={[
                      "absolute left-1/2 top-5 h-0.5 w-full",
                      index < currentStep ? completedColor : "bg-gray-200",
                    ].join(" ")}
                  />
                )}

                {/* Circle */}
                <button
                  type="button"
                  disabled={!onStepClick}
                  onClick={() => onStepClick?.(index)}
                  className={[
                    "relative z-10 flex h-10 w-10",
                    "items-center justify-center",
                    "rounded-full border-2",
                    "transition-all duration-200",
                    "focus:outline-none",

                    isCompleted
                      ? `${completedColor} border-transparent text-white`
                      : isActive
                        ? `${activeColor} border-transparent text-white`
                        : "border-gray-300 bg-white text-gray-400",
                  ].join(" ")}
                >
                  {isCompleted ? (
                    <span className="text-sm font-bold">✓</span>
                  ) : Icon ? (
                    <Icon className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </button>

                {/* Title */}
                <div
                  className={[
                    "mt-3 max-w-[120px] text-center",
                    "text-xs leading-4",
                    isActive || isCompleted
                      ? "font-semibold text-gray-900"
                      : "text-gray-500",
                  ].join(" ")}
                >
                  {step.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="md:hidden">
        {(() => {
          const step = steps[currentStep];
          const Icon = step?.icon;

          return (
            <div className="rounded-xl border bg-white p-4 shadow-sm">
              {/* Progress */}
              <div className="mb-4 flex gap-1">
                {steps.map((stepItem, index) => {
                  const completed = completedSteps.includes(stepItem.id);

                  const active = currentStep === index;

                  return (
                    <div
                      key={stepItem.id}
                      className={[
                        "h-1.5 flex-1 rounded-full",
                        completed || active ? activeColor : "bg-gray-200",
                      ].join(" ")}
                    />
                  );
                })}
              </div>

              {/* Current Step */}
              <div className="flex items-center gap-3">
                {/* Icon */}
                <div
                  className={[
                    "flex h-11 w-11 shrink-0",
                    "items-center justify-center",
                    "rounded-full",
                    activeColor,
                    "text-white",
                  ].join(" ")}
                >
                  {Icon ? (
                    <Icon className="h-5 w-5" />
                  ) : (
                    <span className="font-semibold">{currentStep + 1}</span>
                  )}
                </div>

                {/* Title */}
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-medium text-gray-500">
                    Step {currentStep + 1} of {steps.length}
                  </div>

                  <div className="mt-0.5 truncate text-base font-semibold text-gray-900">
                    {step?.title}
                  </div>

                  {step?.description && (
                    <div className="mt-0.5 truncate text-xs text-gray-500">
                      {step.description}
                    </div>
                  )}
                </div>

                {/* Percentage */}
                <div className="text-sm font-semibold text-gray-500">
                  {Math.round(((currentStep + 1) / steps.length) * 100)}%
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
