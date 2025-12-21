import { useState } from "react";
import { Tab } from "../../../components/ui/tab";
import { Subheading } from "../../../components/ui/subheading";
import { Redeemables } from "../../../components/rewards/Redeemables";

export const RedeemRewards = () => {
  const tabs = ["All Rewards", "Unlocked", "Locked", "Coming soon"];
const balance = 5;
  const redeemablesItems = [
    {
      icon: "💸",
      name: "$5 Bank Transfer",
      descriprion:
        "The $5 equivalent will be transferred to your bank account.",
      points: 5000,
    },
    {
      icon: "💸",
      name: "$5 PayPal International",
      descriprion:
        "Receive a $5 PayPal balance transfer directly to your PayPal account email.",
      points: 5000,
    },
    {
      icon: "🎁",
      name: "$5 Virtual Visa Card",
      descriprion:
        "Use your $5 prepaid card to shop anywhere Visa is accepted online.",
      points: 5000,
    },
    {
      icon: "🎁",
      name: "$5 Apple Gift Card",
      descriprion:
        "Redeem this $5 Apple Gift Card for apps, games, music, movies, and more on the App Store and iTunes.",
      points: 5000,
    },
    {
      icon: "🎁",
      name: "$5 Google Play Card",
      descriprion:
        "Use this $5 Google Play Gift Card to purchase apps, games, movies, books, and more on the Google Play Store.",
      points: 5000,
    },
    {
      icon: "🎁",
      name: "$5 Amazon Gift Card",
      descriprion:
        "Get a $5 digital gift card to spend on your favorite tools or platforms.",
      points: 5000,
    },
    {
      icon: "🎁",
      name: "$10 Amazon Gift Card",
      descriprion:
        "Get a $10 digital gift card to spend on your favorite tools or platforms.",
      points: 10000,
    },
    {
      icon: "📚",
      name: "Free Udemy Course",
      descriprion: "Coming Soon!",
      points: 0,
    },
  ];
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
        <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] mt-6">
          {getFilteredItems(activeTab).map((item) => (
            <Redeemables
              key={item.name}
              icon={item.icon}
              name={item.name}
              description={item.descriprion}
              point={item.points}
              disabled={balance < item.points }
              redeem= {balance >= item.points && item.points !== 0}
              button={
                item.points > balance
                  ? "Locked"
                  : item.points === 0
                  ? "Coming Soon"
                  : "Redeem"
              }
              onClick={()=> console.log(item.name)}
            />
          ))}
        </div>
      </div>
    </>
  );
};
