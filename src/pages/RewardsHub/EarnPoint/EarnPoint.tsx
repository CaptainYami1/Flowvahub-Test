import { DailyStreakCard } from "../../../components/rewards/DailyStreak";
import { PointsBalanceCard } from "../../../components/rewards/PointBalanceCard";
import { Subheading } from "../../../components/ui/subheading";
import { TopSpotlightTool } from "../../../components/rewards/TopSpotlightTool";
import { ReferAndWin } from "../../../components/rewards/ReferAndWin";
import { ShareStack } from "../../../components/rewards/ShareStack";
import { ReferAndEarn } from "../../../components/rewards/ReferAndEarn";
import { useAppContext } from "../../../context/AppContext";
export const EarnPoint = () => {
   const { pointBalance, pointBalanceLoading } = useAppContext();
  return (
    <div className="flex flex-col">
      <div className="mt-4 flex flex-col">
        <Subheading h2="Your Rewards Journey" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PointsBalanceCard
            balance={
              pointBalanceLoading
                ? "-"
                : pointBalance ?? "0"
            }
          />
          <DailyStreakCard />
          <TopSpotlightTool />
        </div>
      </div>
      <div className="flex flex-col">
        <Subheading h2="Earn More Points" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ReferAndWin />
          <ShareStack />
        </div>
      </div>
      <div className="flex flex-col">
        <Subheading h2="Refer & Earn" />
        <div className="">
          <ReferAndEarn />
        </div>
      </div>
    </div>
  );
};
