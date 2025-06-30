"use client";

import { ExplicacionIA } from "./components/ExplicacionIA";
import { Introduction } from "./components/Introduction";
import { InformationTabs } from "./components/InformationTabs";
import { Resources } from "./components/Resources";
import { CallToAction } from "./components/CallToAction";

export default function ExplicacionPage() {
  return (
    <div className="space-y-8 ">
      <ExplicacionIA />
      <Introduction />
      <InformationTabs />
      <Resources />
      <CallToAction />
    </div>
  );
}
