"use client";

import { PreventionHeader, PreventionTabs } from "./components";

export default function PrevencionPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <PreventionHeader />
      <PreventionTabs />
    </div>
  );
}
