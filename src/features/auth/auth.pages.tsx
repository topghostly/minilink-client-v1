import { SignInForm } from "@/components/signin-form";
import { SignUpForm } from "@/components/signup-form";

export const SignIn = () => {
  return (
    <div className="bg-white flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <SignInForm />
      </div>
    </div>
  );
};

export const SignUp = () => {
  return (
    <div className="bg-white flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <SignUpForm />
      </div>
    </div>
  );
};
