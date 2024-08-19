"use client";
import { useSearchParams } from "next/navigation";
import { Container } from "../../../components/ui/craft";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";

export default function CheckoutResultPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <Container className="flex min-h-screen flex-col items-center justify-center bg-green-50">
      {sessionId ? (
        <div className="text-center">
          <div className="text-6xl">🎉</div>
          <h1 className="mt-8 text-3xl font-bold text-green-600">
            Payment Successful!
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Thanks for being a part of our community. Your payment has been
            successfully.
          </p>
          <div className="align-center mt-4 flex items-center justify-center gap-4">
            <Link href="/">
              <Button>Home Page</Button>
            </Link>
            <Link href="/flashcards/sets">
              <Button variant="outline">Flashcards</Button>
            </Link>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </Container>
  );
}
