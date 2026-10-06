import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

  import { OnboardingStepProps } from "../onboarding.type";

const schema = z.object({
  firstName: z.string().min(2, "First name is required"),

  lastName: z.string().min(2, "Last name is required"),

  email: z.string().email("Invalid email"),
});

type FormData = z.infer<typeof schema>;

export default function PersonalStep({
  formId,
  onNext,
  initialData,
  isSubmitting,
}: OnboardingStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData as FormData,
  });

  const submit = async (data: FormData) => {
    await onNext(data);
  };

  return (
    <form id={formId} onSubmit={handleSubmit(submit)} className="space-y-5">
      <div>
        <label className="mb-1 block text-sm font-medium">First name</label>

        <input
          {...register("firstName")}
          className="w-full rounded-lg border px-3 py-2"
        />

        {errors.firstName && (
          <p className="mt-1 text-sm text-red-500">
            {errors.firstName.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Last name</label>

        <input
          {...register("lastName")}
          className="w-full rounded-lg border px-3 py-2"
        />

        {errors.lastName && (
          <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Email</label>

        <input
          {...register("email")}
          className="w-full rounded-lg border px-3 py-2"
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
    </form>
  );
}
