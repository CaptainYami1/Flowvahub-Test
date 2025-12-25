import { toast } from "react-toastify";
import supabase from "../services/config";
import { useEffect, useState, useRef } from "react";

export const usePointBalance = () => {
  const [pointBalance, setPointBalance] = useState<number | null>(null);
  const [pointBalanceLoading, setPointBalanceLoading] = useState(true);
  const [PointBalanceError, setPointBalanceError] = useState<any>(null);
  const fetchingRef = useRef(false);

  const fetchBalance = async () => {
    try {
      setPointBalanceLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setPointBalanceLoading(false);

        return;
      }

      const { data: allRecords, error: fetchError } = await supabase
        .from("accumulated_point_balance")
        .select("id, balance")
        .eq("user_id", user.id)
        .order("id", { ascending: true });

      if (fetchError) {
        console.error("Error fetching balance:", fetchError);
        setPointBalanceError(fetchError);
        setPointBalanceLoading(false);
        return;
      }

      if (!allRecords || allRecords.length === 0) {
        setPointBalance(0);
      } else {
        const firstRecord = allRecords[0];
        const balanceToKeep = firstRecord.balance || 0;

        setPointBalance(balanceToKeep);
      }
    } catch (err) {
      console.error("Error in fetchBalance:", err);
      setPointBalanceError(err);
    } finally {
      setPointBalanceLoading(false);
      fetchingRef.current = false;
    }
  };

  const updateBalance = async (amount: number) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("Please log in to update balance");
        return;
      }

      if (pointBalance === null) {
        toast.error("Balance not loaded yet");
        return;
      }

      const newBalance = pointBalance + amount;

      // Optimistic update - this should trigger immediate UI update
      setPointBalance(newBalance);

      // Get the FIRST (oldest) record to update - user can only update the first record
      const { data: records, error: fetchError } = await supabase
        .from("accumulated_point_balance")
        .select("id")
        .eq("user_id", user.id)
        .order("id", { ascending: true }) // Get oldest first
        .limit(1);

      if (fetchError || !records || records.length === 0) {
        // If no record exists, create one (this should be the first and only record)
        const { data: inserted, error: insertError } = await supabase
          .from("accumulated_point_balance")
          .insert({
            user_id: user.id,
            balance: newBalance,
          })
          .select("balance")
          .single();

        if (insertError) {
          if (insertError.code === "23505") {
            console.warn(
              "Duplicate balance record detected, fetching existing first record"
            );
            await fetchBalance();
          } else {
            console.error("Error creating balance:", insertError);
            setPointBalanceError(insertError);
            await fetchBalance(); // Rollback optimistic update
            toast.error("Failed to update balance");
          }
        } else if (inserted) {
          // Successfully created first record, balance is already set optimistically
          // When balance is reset to 0, also reset daily claims
          if (newBalance === 0) {
            await supabase.from("claim_days").delete().eq("user_id", user.id);
          }
          // Refetch to ensure UI shows the exact database value
          // Optimistic update already showed the new value, this confirms it
          await fetchBalance();
        }
      } else {
        // Update ONLY the first (oldest) record
        const firstRecordId = records[0].id;
        const { error: updateError } = await supabase
          .from("accumulated_point_balance")
          .update({ balance: newBalance })
          .eq("id", firstRecordId);

        if (updateError) {
          console.error("Error updating balance:", updateError);
          setPointBalanceError(updateError);
          // Rollback by refetching actual balance
          await fetchBalance();
          toast.error("Failed to update balance");
        } else {
          // If any duplicates exist, delete them to ensure only first record remains
          const { data: allRecords } = await supabase
            .from("accumulated_point_balance")
            .select("id")
            .eq("user_id", user.id)
            .order("id", { ascending: true });

          if (allRecords && allRecords.length > 1) {
            const duplicateIds = allRecords.slice(1).map((r) => r.id);
            await supabase
              .from("accumulated_point_balance")
              .delete()
              .in("id", duplicateIds);
          }
          // Refetch to ensure UI shows the exact database value
          // Optimistic update already showed the new value, this confirms it
          await fetchBalance();
        }
      }
    } catch (err) {
      console.error("Error in updateBalance:", err);
      setPointBalanceError(err);
      // Rollback by refetching actual balance
      await fetchBalance();
    }
  };

  useEffect(() => {
    let mounted = true;

    // Initial fetch
    const initFetch = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session && mounted) {
        fetchBalance();
      }
    };

    initFetch();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      if (session && mounted) {
        fetchBalance();
      } else if (!session && mounted) {
        // Clear balance when user logs out
        setPointBalance(null);
        setPointBalanceLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return {
    pointBalance,
    pointBalanceLoading,
    PointBalanceError,
    updateBalance,
    refetch: fetchBalance,
  };
};
