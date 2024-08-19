import React from "react";
import CTA from "./CTA";
import Hero from "./hero";
import Feature from "./features";

export default function LandingPage() {
  return (
    <div className="flex flex-col pt-20">
      <Hero />
      <section id="features" className="pt-24">
        <Feature />
        <CTA />
      </section>
    </div>
  );
}
