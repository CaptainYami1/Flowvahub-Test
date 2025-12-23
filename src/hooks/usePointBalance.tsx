import {
  updatePointBalance,
} from "../services/pointBalance";
import supabase from "../services/config";
import { useEffect, useState} from "react";

export const usePointBalance = () => {
  const [pointBalance, setPointBalance] = useState<number | null>(null);
  const [pointBalanceLoading, setPointBalanceLoading] = useState<boolean>(true);
  const [pointBalanceError, setPointBalanceError] = useState<any | null>(null);

  const fetchBalance = async (showLoading: boolean = true) => {
    if (showLoading) {
      setPointBalanceLoading(true);
    }
    try {
      // Fetch both balance and record ID
      const { data, error } = await supabase
        .from("accumulated_point_balance")
        .select("id, balance")
        .single();

      if (error && error.code !== "PGRST116") {
        setPointBalanceError(error);
        return;
      }

      if (data) {
        setPointBalance(data.balance);
      } else {
        // Insert initial record if none exists
        const { data: insertData, error: insertError } = await supabase
          .from("accumulated_point_balance")
          .insert({ balance: 0 })
          .select("id, balance")
          .single();

        if (insertError) {
          setPointBalanceError(insertError);
          return;
        }
        setPointBalance(insertData?.balance || 0);
      }
    } catch (error) {
      setPointBalanceError(error);
    } finally {
      if (showLoading) {
        setPointBalanceLoading(false);
      }
    }
  };

  const updateBalance = async (addNumber: number) => {
    if (pointBalance === null) return;
    const newBalance = pointBalance + addNumber;
    await updatePointBalance(newBalance);
    setPointBalance(newBalance);
  };

  // Initial fetch and real-time subscription
  useEffect(() => {
    fetchBalance(true);

    // Create a channel for real-time updates
    const channel = supabase
      .channel("public:accumulated_point_balance")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "accumulated_point_balance",
          filter: `id=eq.1`, // Use the same ID as in updatePointBalance
        },
        (payload) => {
          // When an update occurs, update local state
          const updatedBalance = payload.new.balance;
          setPointBalance(updatedBalance);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Auto-refresh every 2 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchBalance(false);
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return {
    pointBalance,
    pointBalanceError,
    pointBalanceLoading,
    updateBalance,
  };
};
