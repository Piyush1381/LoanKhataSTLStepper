import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { OnboardingStepProps } from "../onboarding.type";

const schema = z.object({
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  pincode: z.string().min(5, "Invalid pincode"),
});

type FormData = z.infer<typeof schema>;

export default function AddressStep({
  onNext,
  onBack,
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

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-5">
      <input
        {...register("address")}
        placeholder="Address"
        className="w-full rounded-lg border px-3 py-2"
      />

      {errors.address && (
        <p className="text-sm text-red-500">{errors.address.message}</p>
      )}

      <input
        {...register("city")}
        placeholder="City"
        className="w-full rounded-lg border px-3 py-2"
      />

      {errors.city && (
        <p className="text-sm text-red-500">{errors.city.message}</p>
      )}

      <input
        {...register("pincode")}
        placeholder="Pincode"
        className="w-full rounded-lg border px-3 py-2"
      />

      {errors.pincode && (
        <p className="text-sm text-red-500">{errors.pincode.message}</p>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg border px-5 py-2.5"
        >
          Back
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-white disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Continue"}
        </button>
      </div>
    </form>
  );
}
