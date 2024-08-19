"use client";
import { useSearchParams } from "next/navigation";
import { Container } from "../../../components/ui/craft";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";

export default function CheckoutResultPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <Container className="flex min-h-screen flex-col items-center justify-center bg-red-50">
      {sessionId ? (
        <div className="text-center">
          <div className="text-6xl">😞</div>
          <h1 className="mt-8 text-3xl font-bold text-red-600">
            Payment Failed!
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Unfortunately, your payment could not be processed. Please try
            again.
          </p>
          <div className="align-center mt-4 flex items-center justify-center gap-4">
            <Link href="/pricing">
              <Button variant="destructive">Try Again</Button>
            </Link>
            <Link href="/">
              <Button>Home</Button>
            </Link>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </Container>
  );
}
