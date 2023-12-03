import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
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
dotPulse.register();

function Login() {
  const googleSignIn = useGoogleSignin();
  useEffect(() => {
    document.title = "IGotYou - Sign in";
  }, []);

  const { mutate, isPending } = useLogin();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginSchema>({
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

  return (
    <main className="min-h-screen flex justify-center items-center">
      <section className="flex max-lg:flex-col max-lg:gap-5 gap-10 justify-between items-center w-3/5 max-lg:w-1/3 max-sm:w-3/4">
        <span className="h-full w-full max-lg:w-32 max-md:w-20">
          <img
            className="hover:scale-105 transition-all max-w-full max-h-full object-cover block mx-auto"
            loading="lazy"
            src="https://uploads.turbologo.com/uploads/icon/preview_image/2880304/draw_svg20200612-15006-1ioouzj.svg.png"
            alt="logo"
          />
        </span>
        <div className="w-full">
          <div className="p-5">
            <h1 className="text-gray-900 font-bold text-3xl w-max mx-auto max-md:text-2xl">
              Sign in to IGotYou
            </h1>
          </div>
          <div className="w-full flex flex-col items-center justify-center gap-5">
            <form
              onSubmit={handleSubmit(handleLogin)}
              className="w-full bg-white flex flex-col gap-2"
            >
              <Label className="text-gray-600 font-semibold">
                Email address
              </Label>
              <Input
                id="email"
                className="font-medium border-gray-400"
                autoFocus
                autoComplete="email"
                type="text"
                {...register("email")}
              />
              {errors.email && <ErrorMessage message={errors.email.message} />}
              <Label className="text-gray-600 font-semibold">Password</Label>
              <Input
                id="password"
                className="font-medium border-gray-400"
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
                className="bg-gray-950 hover:bg-[#2d2d2d] mt-3 font-semibold rounded-full"
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
                className="bg-gray-950 hover:bg-[#2d2d2d] border mt-2 font-semibold rounded-full"
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
                className="text-center mt-2 underline underline-offset-2 text-xs text-gray-900 font-semibold"
              >
                Forgot your password?
              </Link>
            </form>
            <div className="flex items-center justify-center text-xs">
              <span className="text-gray-600 font-medium">
                New to IGotYou?{" "}
              </span>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="text-gray-900 underline underline-offset-2 p-0 ml-1 font-semibold text-xs"
                    variant={"link"}
                    size={"sm"}
                  >
                    Sign up
                  </Button>
                </DialogTrigger>
                <DialogContent className="p-8 border border-slate-300 max-md:min-h-screen max-md:w-full">
                  <DialogHeader>
                    <DialogTitle className="flex flex-col gap-4 items-center justify-center">
                      <span className="h-20 w-20 max-lg:w-32 max-md:w-20">
                        <img
                          className="hover:scale-105 transition-all max-w-full max-h-full object-cover block mx-auto"
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
                  <DialogFooter className="text-gray-600 text-center py-2 px-4 text-xs font-semibold">
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
