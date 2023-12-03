import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RegisterSchema, ZodRegisterSchema } from "@/zod/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/partials/components/ErrorMessage";
import { useRegister } from "@/hooks/useRegister";
import { dotPulse } from "ldrs";
import { Toggle } from "@/components/ui/toggle";
import { useState } from "react";
dotPulse.register();

function Register() {
  const { mutate, isPending } = useRegister();
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [isHidden2, setIsHidden2] = useState<boolean>(true);
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<RegisterSchema>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(ZodRegisterSchema),
  });

  async function handleRegister(data: RegisterSchema) {
    const { email, password } = data;
    try {
      mutate({ email, password });
    } catch (error) {
      console.log(error);
    }
  }

  console.log(isHidden);

  return (
    <>
      <div className="flex flex-col gap-4">
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="flex flex-col gap-2 py-5 w-full mx-auto"
        >
          <Label className="font-semibold text-gray-600" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            className="border-slate-400 font-medium"
            autoComplete="email"
            type="text"
            {...register("email")}
          />
          {errors.email && <ErrorMessage message={errors.email.message} />}
          <Label className="font-semibold text-gray-600" htmlFor="password">
            Password
          </Label>
          <span className="relative flex flex-col gap-2">
            <Input
              id="password"
              className="border-slate-400 font-medium"
              type={`${isHidden ? "password" : "text"}`}
              {...register("password")}
            />
            {errors.password && (
              <ErrorMessage message={errors.password.message} />
            )}
            <div className="absolute top-0 right-0 flex justify-between w-max">
              <Toggle
                onPressedChange={(v) => setIsHidden(v)}
                className="ml-auto rounded-full p-2"
              >
                {isHidden ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </Toggle>
            </div>
          </span>
          <Label
            className="font-semibold text-gray-600"
            htmlFor="confirmPassword"
          >
            Confirm password
          </Label>
          <span className="relative flex flex-col gap-2">
            <Input
              id="confirmPassword"
              className="border-slate-400 font-medium"
              type={`${isHidden2 ? "password" : "text"}`}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <ErrorMessage message={errors.confirmPassword.message} />
            )}
            <div className="absolute top-0 right-0 flex justify-between w-max">
              <Toggle
                onPressedChange={(v) => setIsHidden2(v)}
                className="ml-auto rounded-full p-2"
              >
                {isHidden2 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </Toggle>
            </div>
          </span>
          <div className="mt-1 flex flex-col">
            <Button
              disabled={
                isPending ||
                !!errors.email?.message ||
                !!errors.password?.message ||
                !!errors.confirmPassword?.message
              }
              className="bg-gray-950 mt-1 font-semibold rounded-full"
            >
              {isPending ? (
                <l-dot-pulse size="30" speed="1.3" color="white"></l-dot-pulse>
              ) : (
                "Sign up"
              )}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
