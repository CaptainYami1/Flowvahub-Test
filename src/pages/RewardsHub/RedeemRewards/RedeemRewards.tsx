import { useState } from "react";
import { Tab } from "../../../components/ui/tab";
import { Subheading } from "../../../components/ui/subheading";
import { Redeemables } from "../../../components/rewards/Redeemables";
import { usePointBalance } from "../../../hooks/usePointBalance";
import supabase from "../../../services/config";
import { toast } from "react-toastify";
import { Skeleton } from "../../../components/ui/skeleton";

interface RedeemableItem {
  id: number;
  icon: string;
  name: string;
  description: string;
  points: number;
}

export const RedeemRewards = () => {
  const { pointBalance, updateBalance } = usePointBalance();
  const [redeemablesItems, setRedeemablesItems] = useState<RedeemableItem[]>(
    []
  );
  const [redeeming, setRedeeming] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const tabs = ["All Rewards", "Unlocked", "Locked", "Coming soon"];
  const balance = pointBalance ?? 0;

  const fetchRedeemables = async () => {
    const { data, error } = await supabase.from("redeemables").select();

    if (error) {
      toast.error("Unable to fetch redeemables.");
      return;
    }
    setLoading(false)
    setRedeemablesItems(data);
  };
  fetchRedeemables();
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const getFilteredItems = (tab: string) => {
    if (tab === "Unlocked")
      return redeemablesItems.filter(
        (i) => i.points > 0 && i.points <= balance
      );
    if (tab === "Locked")
      return redeemablesItems.filter((i) => i.points > balance);
    if (tab === "Coming soon")
      return redeemablesItems.filter((i) => i.points === 0);
    return redeemablesItems;
  };

  const handleRedeem = async (item: any) => {
    setRedeeming(item.id);
    if (item.description === "Coming Soon!" || item.points > balance) return;
    const { error } = await supabase.from("redeemed").insert({
      item_name: item.name,
      point: item.points,
    });
    if (error) {
      toast.error("Unable to claim reward");
      setRedeeming(null);
      console.log(error);
      return;
    }
    updateBalance(-item.points);
    setRedeeming(null);
    toast.success(`Successfully redeemed ${item.name}`);
  };

  return (
    <>
      <div className="flex flex-col gap mt-4">
        <Subheading h2="Your Rewards Journey" />
        <div className="flex flex-row gap-3 items-center">
          {tabs.map((tab) => {
            const count = getFilteredItems(tab).length;

            return (
              <Tab
                key={tab}
                name={tab}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                amount={count}
              />
            );
          })}
        </div>
        {loading && (
          <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] mt-6">
            <Skeleton className="w-full h-60 bg-gray-300" />
            <Skeleton className="w-full h-60 bg-gray-300" />
            <Skeleton className="w-full h-60 bg-gray-300" />
            <Skeleton className="w-full h-60 bg-gray-300" />
            <Skeleton className="w-full h-60 bg-gray-300" />
            <Skeleton className="w-full h-60 bg-gray-300" />
          </div>
        )}
        <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] mt-6">
          {redeemablesItems &&
            getFilteredItems(activeTab).map((item) => (
              <Redeemables
                key={item.id}
                icon={item.icon}
                name={item.name}
                description={item.description}
                point={item.points}
                disabled={
                  balance < item.points ||
                  item.description === "Coming Soon!" ||
                  redeeming === item.id
                }
                redeem={balance >= item.points && item.points !== 0}
                button={
                  item.points > balance
                    ? "Locked"
                    : item.points === 0
                    ? "Coming Soon"
                    : redeeming === item.id
                    ? "Redeeming..."
                    : "Redeem"
                }
                onClick={() => handleRedeem(item)}
              />
            ))}
        </div>
      </div>
    </>
  );
};
