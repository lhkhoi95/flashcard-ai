import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex h-screen items-center justify-center pt-12 align-middle">
      <SignIn />
    </div>
  );
}
