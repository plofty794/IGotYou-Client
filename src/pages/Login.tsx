import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoginSchema, ZodLoginSchema } from "@/zod/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import "../../node_modules/@geoapify/geocoder-autocomplete/styles/minimal.css";
import useLogin from "@/hooks/useLogin";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Register from "../partials/components/Register";
import ErrorMessage from "@/partials/components/ErrorMessage";
import { useEffect } from "react";
import { dotPulse } from "ldrs";
import useGoogleSignin from "@/hooks/useGoogleSignin";
import { Label } from "@/components/ui/label";
import { FirebaseError } from "firebase/app";
import { toast } from "sonner";
dotPulse.register();

function Login() {
  const navigate = useNavigate();
  const googleSignIn = useGoogleSignin();
  useEffect(() => {
    document.title = "Sign in - IGotYou";
  }, []);

  const { mutate, isPending, error } = useLogin();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<LoginSchema>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(ZodLoginSchema),
  });

  function handleLogin(data: LoginSchema) {
    mutate(data);
  }

  function handleGoogleSignIn() {
    googleSignIn.mutate();
  }

  useEffect(() => {
    if (error) {
      const err = error as FirebaseError;
      const message = (
        err.code.split("/")[1].slice(0, 1).toUpperCase() +
        err.code.split("/")[1].slice(1)
      )
        .split("-")
        .join(" ");
      if (message == "User disabled") {
        sessionStorage.setItem("disabledUser", getValues("email"));
        toast.warning("Your account has been disabled!", {
          action: {
            label: "See why",
            onClick: () => navigate("/account-disabled", { replace: true }),
          },
          actionButtonStyle: {
            backgroundColor: "#DC7609",
            color: "white",
            border: "1px solid #FF9EA1",
            borderRadius: "4px",
          },
          className: "font-bold",
        });
      }
    }
  }, [error, getValues, navigate]);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <section className="flex w-3/5 items-center justify-between gap-10 max-lg:w-1/3 max-lg:flex-col max-lg:gap-5 max-sm:w-3/4">
        <span className="h-full w-full max-lg:w-32 max-md:w-20">
          <img
            className="mx-auto block max-h-full max-w-full object-cover transition-transform hover:scale-105"
            loading="lazy"
            src="https://uploads.turbologo.com/uploads/icon/preview_image/2880304/draw_svg20200612-15006-1ioouzj.svg.png"
            alt="logo"
          />
        </span>
        <div className="w-full">
          <div className="p-5">
            <h1 className="mx-auto w-max text-3xl font-bold text-gray-900 max-md:text-2xl">
              Sign in to IGotYou
            </h1>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-5">
            <form
              onSubmit={handleSubmit(handleLogin)}
              className="flex w-full flex-col gap-2 bg-white"
            >
              <Label className="font-semibold text-gray-600">
                Email address
              </Label>
              <Input
                id="email"
                className="border-gray-400 font-medium"
                autoFocus
                autoComplete="off"
                type="text"
                {...register("email")}
              />
              {errors.email && <ErrorMessage message={errors.email.message} />}
              <Label className="font-semibold text-gray-600">Password</Label>
              <Input
                id="password"
                className="border-gray-400 font-medium"
                type="password"
                {...register("password")}
              />
              {errors.password && (
                <ErrorMessage message={errors.password.message} />
              )}
              <Button
                disabled={
                  isPending ||
                  !!errors.email?.message ||
                  !!errors.password?.message
                }
                size={"lg"}
                className="mt-3 rounded-full bg-gray-950 font-semibold hover:bg-[#2d2d2d]"
              >
                {isPending ? (
                  <l-dot-pulse
                    size="35"
                    speed="1.3"
                    color="white"
                  ></l-dot-pulse>
                ) : (
                  "Sign in"
                )}
              </Button>
              <Button
                size={"lg"}
                type="button"
                onClick={handleGoogleSignIn}
                className="mt-2 rounded-full border bg-gray-950 font-semibold hover:bg-[#2d2d2d]"
              >
                <img
                  width={20}
                  height={20}
                  className="mr-2"
                  loading="lazy"
                  src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
                  alt="Google logo"
                />{" "}
                Continue with Google
              </Button>
              <Link
                to={"/forgot-password"}
                className="mt-2 text-center text-xs font-semibold text-gray-900 underline underline-offset-2"
              >
                Forgot your password?
              </Link>
            </form>
            <div className="flex items-center justify-center text-xs">
              <span className="font-medium text-gray-600">
                New to IGotYou?{" "}
              </span>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="ml-1 p-0 text-xs font-semibold text-gray-900 underline underline-offset-2"
                    variant={"link"}
                    size={"sm"}
                  >
                    Sign up
                  </Button>
                </DialogTrigger>
                <DialogContent className="border border-slate-300 p-8 max-md:w-full">
                  <DialogHeader>
                    <DialogTitle className="flex flex-col items-center justify-center gap-4">
                      <span className="h-20 w-20 max-lg:w-32 max-md:w-20">
                        <img
                          className="mx-auto block max-h-full max-w-full object-cover transition-all hover:scale-105"
                          loading="lazy"
                          src="https://uploads.turbologo.com/uploads/icon/preview_image/2880304/draw_svg20200612-15006-1ioouzj.svg.png"
                          alt="logo"
                        />
                      </span>
                      <span className="text-2xl font-semibold">
                        Sign up to IGotYou
                      </span>
                    </DialogTitle>
                  </DialogHeader>
                  <Register />
                  <DialogFooter className="px-4 py-2 text-center text-xs font-semibold text-gray-600">
                    Sign up and become a part of the conversation. Share your
                    thoughts, ideas, and feedback with us and connect with
                    others who share your interests.
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;
