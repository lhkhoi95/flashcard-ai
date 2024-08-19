import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Section, Container } from "@/app/components/ui/craft";
import { Button } from "../ui/button";
import { Badge } from "@/app/components/ui/badge";
import { CREATE_FLASHCARDS_URL } from "@/app/lib/constants";

const Hero = () => {
  return (
    <Section className="relative backdrop-blur-sm">
      <Container className="flex flex-col gap-8">
        <Badge className="not-prose w-fit" variant="outline">
          <Link className="group flex items-center gap-1" href="/story">
            Read out story
            <ArrowRight className="w-4 transition-all group-hover:-rotate-45" />
          </Link>
        </Badge>
        <h1 className="!mb-0 text-4xl md:text-5xl lg:text-6xl">
          What if creating flashcards was as easy as a click of a button?
        </h1>
        <h3 className="rounded-md border bg-muted/50 p-4 text-xl font-thin text-muted-foreground md:text-2xl lg:text-3xl">
          It is using Flashcard App. Based on your input, we generate flashcards
          to help you study quickly and effectively.
        </h3>

        <div className="flex gap-4">
          <Link href={CREATE_FLASHCARDS_URL}>
            <Button>Get Started</Button>
          </Link>
          {/* Todo: make scroll down to the features and cta */}
          <Link href="/#features">
            <Button variant="outline">Learn More</Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
};

export default Hero;
