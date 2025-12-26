import { useCallback, useState, useEffect } from "react";
import supabase from "../services/config";

export const usePointBalance = () => {
  const [pointBalance, setPointBalance] = useState<number | null>(null);
  const [pointBalanceLoading, setPointBalanceLoading] = useState(false);

  // Fetch current balance
  const fetchBalance = useCallback(async () => {
    setPointBalanceLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setPointBalance(null);
      setPointBalanceLoading(false);
      return;
    }
    const { data, error } = await supabase
      .from("accumulated_point_balance")
      .select("id, balance")
      .eq("user_id", user.id)
      .limit(1)
      .single();

    if (error && error.code === "PGRST116") {
      // Row doesn't exist
      setPointBalance(0);
    } else if (data) {
      setPointBalance(data.balance);
    }

    setPointBalanceLoading(false);
  }, []);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  // Increment or set balance safely
  const updateBalance = useCallback(async (amount: number) => {
    setPointBalanceLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setPointBalanceLoading(false);
      return;
    }

    const { data: existingRow, error: fetchError } = await supabase
      .from("accumulated_point_balance")
      .select("id, balance")
      .eq("user_id", user.id)
      .limit(1)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Error fetching balance:", fetchError);
      setPointBalanceLoading(false);
      return;
    }

    if (existingRow) {
      // Row exists — increment balance
      const { data, error } = await supabase
        .from("accumulated_point_balance")
        .update({ balance: existingRow.balance + amount })
        .eq("id", existingRow.id)
        .select()
        .single();

      if (!error && data) setPointBalance(data.balance);
    } else {
      // Row doesn't exist — insert new row
      const { data } = await supabase
        .from("accumulated_point_balance")
        .insert({ user_id: user.id, balance: amount })
        .select()
        .single();

      if ( data) setPointBalance(data.balance);
    }

    setPointBalanceLoading(false);
  }, []);

  return {
    pointBalance,
    pointBalanceLoading,
    updateBalance,
    refetch: fetchBalance,
  };
};
