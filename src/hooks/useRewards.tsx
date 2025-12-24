import { toast } from "react-toastify";
import supabase from "../services/config";
import { useState } from "react";

export const useRewards = () => {
  const [dailyReward, setDailyReward] = useState<number | null>(null);
  const [shareStackReward, setShareStackReward] = useState<number | null>(null);
  const [topToolReward, setTopToolReward] = useState<number | null>(null);
  const [referralReward, setReferralReward] = useState<number | null>(null);

  const fetchRewards = async () => {
    const { data, error } = await supabase.from("rewards").select();

    if (error) {
      toast.error("Unable to fetch redeemables.");
      console.log(error);
      return;
    }
    setDailyReward(data[0].daily_reward);
    setShareStackReward(data[0].share_stack_reward);
    setTopToolReward(data[0].top_tool_reward);
    setReferralReward(data[0].referal_reward);
  };
  fetchRewards();
  return { dailyReward, shareStackReward, topToolReward, referralReward };
};
