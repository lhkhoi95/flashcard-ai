import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex h-screen items-center justify-center pt-24 align-middle">
      <SignUp />
    </div>
  );
}
