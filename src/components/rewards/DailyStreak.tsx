import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Button from "../ui/button";
import { cn } from "../../lib/utils";
import { Zap } from 'lucide-react';

interface DailyStreakCardProps {
  currentStreak: number;
  weekClaims: string[];
  lastClaimDate: string | null;
  onClaim: () => void;
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function DailyStreakCard({
  currentStreak,
  //   weekClaims,
  lastClaimDate,
  onClaim,
}: DailyStreakCardProps) {
  const today = new Date().toISOString().split("T")[0];
  const canClaim = lastClaimDate !== today;
  const todayDayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
    new Date().getDay()
  ];

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
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <div>
            <p className="font-extrabold text-[36px] text-primary mb-2">
              {currentStreak} Day{currentStreak !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="">
          <div className="flex mt-4 space-x-2 justify-center">
            {DAYS.map((day) => {
              // const isClaimed = weekClaims.includes(day);
              const isClaimed = false; // Placeholder until weekClaims is used
              const isToday = day === todayDayName;

              return (
                
                  <div
                  key={day}
                    className={cn(
                      "h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 bg-gray-200 text-gray-500 ",
                      isClaimed && "ring-2 ring-primary ring-offset-2",
                      !isClaimed &&
                        isToday &&
                        "ring-2 ring-primary ring-offset-2",
                      
                    )}
                  >
                    {day.charAt(0)}
                  </div>
              
              );
            })}
          </div>
          <p className="text-3.5 text-gray-600 text-center mt-3">
            Check in daily to to earn +5 points
          </p>
        </div>
        <Button
          onClick={onClaim}
          disabled={!canClaim}
          variant="secondary"
          className={cn(
            "w-full",
            canClaim
              ? " bg-primary text-white hover:shadow-[0_4px_12px_rgba(144,19,254,0.2)] hover:-translate-y-0.5"
              : ""
          )}
        >
          <Zap size={20} />
          {canClaim ? "Claim Today's Point" : "Claimed Today"}
        </Button>
      </CardContent>
    </Card>
  );
}
