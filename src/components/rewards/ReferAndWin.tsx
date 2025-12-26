import { Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";

interface ReferAndWinProps {}

export function ReferAndWin({}: ReferAndWinProps) {
  return (
    <Card variant="border">
      <CardHeader className="flex-row p-4 border border-b-[#f3f4f6] border-t-0 border-r-0 border-l-0 bg-white flex items-center gap-3">
        <div className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 bg-[rgba(228,144,230,0.1)] text-primary">
          <Star />
        </div>
        <h3 className="font-semibold text-black/88 text-sm font-ui">Refer and win 10,000 points!</h3>
      </CardHeader>
      <CardContent className="p-4">
        <p className=" text-sm font-medium text-black/88 font-ui">
          Invite 3 friends by Nov 20 and earn a chance to be one of 5 winners of{" "}
          <span className="text-primary">10,000 points</span>. Friends must
          complete onboarding to qualify.
        </p>
      </CardContent>
    </Card>
  );
}
