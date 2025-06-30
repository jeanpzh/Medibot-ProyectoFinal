import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TABS_DATA } from "../constants";
import { BasicsTab } from "./BasicsTab";
import { VariantsTab } from "./VariantsTab";
import { VaccinesTab } from "./VaccinesTab";
import { TimelineTab } from "./TimelineTab";
import { GlobalImpactTab } from "./GlobalImpactTab";

export const InformationTabs = () => (
  <Tabs defaultValue="basics" className="w-full">
    <TabsList className="grid w-full grid-cols-5 mb-6">
      {TABS_DATA.map(({ value, label, icon: Icon }) => (
        <TabsTrigger key={value} value={value} className="gap-2">
          <Icon className="h-4 w-4" />
          <span className="hidden sm:inline">{label}</span>
        </TabsTrigger>
      ))}
    </TabsList>
    <TabsContent value="basics" className="space-y-6">
      <BasicsTab />
    </TabsContent>
    <TabsContent value="variants" className="space-y-6">
      <VariantsTab />
    </TabsContent>
    <TabsContent value="vaccines" className="space-y-6">
      <VaccinesTab />
    </TabsContent>
    <TabsContent value="timeline" className="space-y-6">
      <TimelineTab />
    </TabsContent>
    <TabsContent value="global" className="space-y-6">
      <GlobalImpactTab />
    </TabsContent>
  </Tabs>
);
