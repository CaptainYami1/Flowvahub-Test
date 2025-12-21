import { useState } from "react";
import { Header } from "../../components/ui/header";
import { EarnPoint } from "./EarnPoint/EarnPoint";
import { RedeemRewards } from "./RedeemRewards/RedeemRewards";
import { Tab } from "../../components/ui/tab";

export const RewardsHub = () => {
  const [activeTab, setActiveTab] = useState("Earn Points");
  return (
    <div>
      <Header
        h1="Rewards Hub"
        p="Earn points, unlock rewards, and celebrate your progress!"
      />
      <div className="lg:h-[calc(100vh-110px)] [scrollbar-width:none] [-ms-overflow-style:none] overflow-x-hidden">
        <div className="flex flex-row gap-3 items-center mt-4">
          <Tab name="Earn Points" activeTab={activeTab} setActiveTab={setActiveTab} />
          <Tab name="Redeem Rewards" activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        {activeTab === "Earn Points" && <EarnPoint />}
        {activeTab === "Redeem Rewards" && <RedeemRewards />}
      </div>
    </div>
  );
};
