import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import MaineLayout from "../layouts/MaineLayout";

type FormFields = {
  email: string;
  password: string;
};

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<FormFields>();
  const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
    console.log("Form submitted successfully:", data);
    try {
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async operation
      alert(
        `Form submitted successfully! Email: ${data.email}, Password: ${data.password}`
      );
      throw new Error();
    } catch (error) {
      setError("root", {
        type: "manual",
        message: "This user is no longer registered."
      });
    }
  };
  return (
    <MaineLayout>
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl mb-4">Sign Up With React Hooks Form</h2>

          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                validate: (value) =>
                  /^\S+@\S+\.\S+$/.test(value) || "Invalid email format"
              })}
              type="email"
              name="email"
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Password</label>
            <input
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message:
                    "Password must be at least 8 characters long and contain letters and numbers"
                }
              })}
              type="password"
              name="password"
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
            {errors.password && (
              <p className="text-red-400 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full py-2 bg-indigo-600 rounded hover:bg-indigo-700"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          {errors.root && (
            <p className="text-red-400 text-sm">{errors.root.message}</p>
          )}
        </form>
      </div>
    </MaineLayout>
  );
}
