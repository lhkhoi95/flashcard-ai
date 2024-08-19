// Layout
import { Section, Container } from '@/app/components/ui/craft';
import Link from 'next/link';

// Icons
import {
  BookText,
  BrainCircuit,
  GraduationCap,
  ArrowRight,
} from 'lucide-react';

const featureText = [
  {
    icon: <BookText className="h-6 w-6" />,
    title: 'Create Flashcards with one click',
    description:
      'All you need to do is input your text and we will generate flashcards for you.',
    cta: '',
  },
  {
    icon: <BrainCircuit className="h-6 w-6" />,
    title: 'Create and store flashcard decks',
    description:
      'Create and modify flashcard decks so you can study more effectively.',
    cta: '',
  },
];

const singleFeatureText = [
  {
    icon: <GraduationCap className="h-6 w-6" />,
    title: 'Import flashcards',
    description:
      'Import flashcards from other platforms and use artificial intelligence to improve their effectiveness and generate similar cards.',
    cta: '',
  },
];

const Feature = () => {
  return (
    <Section>
      <Container className="not-prose">
        <div className="flex flex-col gap-6">
          <div className="mt-6 grid gap-6 md:mt-12 md:grid-cols-2">
            {featureText.map(
              ({ icon, title, description, href, cta }, index) => (
                <div
                  className="flex flex-col justify-between gap-6 rounded-lg border p-6 transition-all hover:-mt-2 hover:mb-2"
                  key={index}
                >
                  <div className="grid gap-4">
                    {icon}
                    <h4 className="text-xl text-primary">{title}</h4>
                    <p className="text-base opacity-75">{description}</p>
                  </div>
                  {cta && (
                    <div className="flex h-fit items-center text-sm font-semibold">
                      <p>{cta}</p> <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  )}
                </div>
              )
            )}
          </div>
          <div>
            {singleFeatureText.map(
              ({ icon, title, description, href, cta }, index) => (
                <div
                  className="flex flex-col justify-between gap-6 rounded-lg border bg-muted/25 p-6 transition-all hover:-mt-2 hover:mb-2"
                  key={index}
                >
                  <div className="grid gap-4">
                    {icon}
                    <h4 className="text-xl text-primary">{title}</h4>
                    <p className="text-base opacity-75">{description}</p>
                  </div>
                  {cta && (
                    <div className="flex h-fit items-center text-sm font-semibold">
                      <p>{cta}</p> <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Feature;
