import React from "react";
import { Container } from "@/app/components/ui/craft";

export default function Page() {
  return (
    <Container className="min-h-screen">
      <div className="mt-24 animate-pulse">
        <div className="mb-12 h-12 w-96 rounded bg-gray-300 text-3xl"></div>
        <div className="mb-4 h-64 w-full rounded-lg bg-gray-300"></div>
        <div className="relative mt-2 flex justify-center gap-4">
          <div className="absolute left-0 h-12 w-12 rounded-full bg-gray-300"></div>
          <div className="h-12 w-12 rounded-full bg-gray-300"></div>
          <div className="h-12 w-24 bg-gray-300"></div>
          <div className="h-12 w-12 rounded-full bg-gray-300"></div>
        </div>
      </div>
    </Container>
  );
}
