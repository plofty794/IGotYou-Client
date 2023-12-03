import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RegisterSchema, ZodRegisterSchema } from "@/zod/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/partials/components/ErrorMessage";
import { useRegister } from "@/hooks/useRegister";
import { dotPulse } from "ldrs";

dotPulse.register();

function Register() {
  const { mutate, isPending } = useRegister();
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
          <Input
            id="password"
            className="border-slate-400 font-medium"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <ErrorMessage message={errors.password.message} />
          )}
          <Label
            className="font-semibold text-gray-600"
            htmlFor="confirmPassword"
          >
            Confirm password
          </Label>
          <Input
            id="confirmPassword"
            className="border-slate-400 font-medium"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <ErrorMessage message={errors.confirmPassword.message} />
          )}
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
