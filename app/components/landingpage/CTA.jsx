import Link from "next/link";

import Balancer from "react-wrap-balancer";

// UI component imports
import { Button } from "../ui/button";

import { Section, Container } from "@/app/components/ui/craft";
import { CREATE_FLASHCARDS_URL } from "@/app/lib/constants";

const CTA = () => {
  return (
    <Section className="px-4">
      <Container className="flex flex-col items-center gap-6 rounded-lg border bg-accent/50 p-6 text-center md:rounded-xl md:p-12">
        <h2 className="!my-0 text-3xl md:text-4xl">Try it out for yourself</h2>
        <h3 className="!mb-0 text-xl text-muted-foreground md:text-2xl">
          <Balancer>Sign up for a free account and start learning.</Balancer>
        </h3>
        <div className="not-prose mx-auto flex items-center gap-2">
          <Button className="w-fit" asChild>
            <Link href={CREATE_FLASHCARDS_URL}>Get Started</Link>
          </Button>
          <Button className="w-fit" variant="outline" asChild>
            <Link href="/contact">Contact</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
};

export default CTA;
