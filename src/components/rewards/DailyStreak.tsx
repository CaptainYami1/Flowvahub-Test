import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Button from "../ui/button";
import { cn } from "../../lib/utils";
import { Zap } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import supabase from "../../services/config";
import { toast } from "react-toastify";
import { DailyClaimSuccessModal } from "./DailyClaimSuccessModal";
import { useRewards } from "../../hooks/useRewards";
import { useAppContext } from "../../context/AppContext";
interface Claim {
  claim_date: string;
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function DailyStreakCard() {
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const { updateBalance, refetchBalance } = useAppContext();
  const { dailyReward } = useRewards();
  const today = new Date().toISOString().split("T")[0];
  const todayDayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
    new Date().getDay()
  ];

  const fetchClaims = async () => {
    setLoading(true);

    // Get current user session
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

    const { data: allClaims, error: fetchError } = await supabase
      .from("claim_days")
      .select("id, claim_date")
      .eq("user_id", user.id)
      .gte("claim_date", sevenDaysAgo.toISOString().split("T")[0])
      .order("id", { ascending: true });

    if (fetchError) {
      console.error("Error fetching claims:", fetchError);
      toast.error("Failed to load streak data");
      setLoading(false);
      return;
    }

    if (!allClaims || allClaims.length === 0) {
      setClaims([]);
      setLoading(false);
      return;
    }

    // Handle duplicates: if multiple claims exist for the same date, keep only the first (oldest) one
    const uniqueClaimsMap = new Map<string, { claim: Claim; id: number }>();
    const duplicateIds: number[] = [];

    allClaims.forEach((claim) => {
      const claimDate = new Date(claim.claim_date).toISOString().split("T")[0];

      if (!uniqueClaimsMap.has(claimDate)) {
        uniqueClaimsMap.set(claimDate, {
          claim: { claim_date: claim.claim_date },
          id: claim.id,
        });
      } else {
        duplicateIds.push(claim.id);
      }
    });

    // Delete duplicate claims if any exist
    if (duplicateIds.length > 0) {
      const { error: deleteError } = await supabase
        .from("claim_days")
        .delete()
        .in("id", duplicateIds);

      if (deleteError) {
        console.error("Error deleting duplicate claims:", deleteError);
      }
    }

    // Set the unique claims (extract just the claim_date from the map values)
    setClaims(Array.from(uniqueClaimsMap.values()).map((item) => item.claim));

    setLoading(false);
  };
  const handleClaim = async () => {
    if (!canClaim || dailyReward === null) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error("Please log in to claim rewards");
      return;
    }

    // Check if user already claimed today (filtered by user_id)
    const { data: existingClaims } = await supabase
      .from("claim_days")
      .select("id")
      .eq("user_id", user.id)
      .eq("claim_date", today);

    if (existingClaims && existingClaims.length > 0) {
      toast.error("You have already claimed today");
      console.log(existingClaims)
      await fetchClaims(); // Refetch to update UI
      return;
    }

   
    const { error } = await supabase.from("claim_days").upsert({
      user_id: user.id,
      claim_date: today,
    });

    if (error) {
      if (error.code === "23505") {
        toast.info("You have already claimed today");
        console.log(error)
        await fetchClaims(); // Refetch to update UI
      } else {
        toast.error("Failed to claim reward");
        console.error("Claim error:", error);
        await fetchClaims();
      }
      return;
    }

     updateBalance(dailyReward);
    await refetchBalance();   

    await fetchClaims();  
     setOpenSuccessModal(true);
  };
  useEffect(() => {
    let mounted = true;

    // Initial fetch
    const initFetch = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session && mounted) {
        fetchClaims();
      }
    };

    initFetch();

    // Listen for auth state changes (same pattern as point balance)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      if (session && mounted) {
        fetchClaims();
      } else if (!session && mounted) {
        // Clear claims when user logs out
        setClaims([]);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Check if user can claim today
  const claimToday = claims.find((c) => {
    const claimDate = new Date(c.claim_date).toISOString().split("T")[0];
    return claimDate === today;
  });
  const canClaim = claimToday === undefined;
  // Map claims to days of the week
  const weekClaims = claims.map((c) => {
    const date = new Date(c.claim_date);
    return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()];
  });

  // Calculate current streak
  const currentStreak = (() => {
    const dates = claims
      .map((c) => new Date(c.claim_date))
      .sort((a, b) => b.getTime() - a.getTime());
    let streak = 0;
    let lastDate = new Date(today);
    for (let d of dates) {
      if (
        d.toISOString().split("T")[0] === lastDate.toISOString().split("T")[0]
      ) {
        streak++;
        lastDate.setDate(lastDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  })();

  const handleCloseModal = useCallback(() => {
    setOpenSuccessModal(false);
  }, []);

  return (
    <Card variant="shadow">
      <CardHeader className="p-4 relative border border-b-[#f3f4f6] bg-[#eef2ff] border-t-0 border-r-0 border-l-0">
        <CardTitle className="text-lg font-semibold flex items-center gap-2 text-gray-700">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="far"
            data-icon="calendar"
            className="svg-inline--fa fa-calendar  text-[#70D6FF] h-5 w-5 "
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l352 0 0 256c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256z"
            ></path>
          </svg>
          Daily Streak
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 py-4">
        <div className="flex items-center gap-3">
          <div>
            <p className="font-extrabold text-[36px] text-primary mb-2 font-ui">
              {currentStreak} day{currentStreak !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="">
          <div className="flex mt-4 space-x-2 justify-center">
            {DAYS.map((day) => {
              const isClaimed = weekClaims.includes(day);
              const isToday = day === todayDayName;

              return (
                <div
                  key={day}
                  className={cn(
                    "h-9 w-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 bg-gray-200 text-gray-500 ",
                    isClaimed &&
                      "bg-[#70D6FF] border-4 border-cyan-200 text-white",
                    !isClaimed && isToday && "ring-2 ring-primary ring-offset-2"
                  )}
                >
                  {day.charAt(0)}
                </div>
              );
            })}
          </div>
          <p className="text-sm text-gray-600 text-center mt-3">
            Check in daily to to earn +5 points
          </p>
        </div>
        <Button
          onClick={handleClaim}
          disabled={loading || !canClaim}
          variant={loading || !canClaim ? "disabled" : "primary"}
          className={cn("w-full")}
        >
          <Zap size={20} />
          {canClaim ? "Claim Today's Point" : "Claimed Today"}
        </Button>
      </CardContent>
      <DailyClaimSuccessModal
        isOpen={openSuccessModal}
        onClose={handleCloseModal}
      />
    </Card>
  );
}
