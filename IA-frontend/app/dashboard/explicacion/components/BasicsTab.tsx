import { InfoCard, InfoCardVariant } from "@/components/InfoCard";
import { basicInfo } from "../constants";

export const BasicsTab = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {basicInfo.map((item, index) => (
      <InfoCard
        key={index}
        title={item.title}
        description={item.description}
        icon={item.icon}
        content={item.content}
        variant={item.variant as InfoCardVariant}
      />
    ))}
  </div>
);
