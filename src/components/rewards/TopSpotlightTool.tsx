import { Calendar, Gift, UserPlus } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import Button from "../ui/button";

interface TopSpotlightToolProps {}

export function TopSpotlightTool({}: TopSpotlightToolProps) {
  return (
    <Card variant="shadow">
      <CardHeader className="p-4 bg-[linear-gradient(135deg,#9013FE_0%,#70D6FF_100%)] text-white relative overflow-hidden">
        <span className="bg-white/20 w-fit backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
          Featured
        </span>
        <h3 className="text-[1.25rem] font-bold relative z-2">
          Top Tool Spotlight
        </h3>
        <p className="text-lg">
          <strong> Reclaim</strong>
        </p>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col gap-4">
          <div className="flex justify-start mb-4">
            <div className="w-6 h-6 animate-pulse bg-[#eef2ff] rounded-md flex items-center justify-center mr-4 shrink-0 text-primary">
              <Calendar size={24} />
            </div>
            <div className="flex-1">
              <h4 className="mb-1 font-semibold">
                Automate and Optimize Your Schedule
              </h4>
              <p className="text-[0.875rem] text-gray-600">
                Reclaim.ai is an AI-powered calendar assistant that
                automatically schedules your tasks, meetings, and breaks to
                boost productivity. Free to try — earn Flowva Points when you
                sign up!
              </p>
            </div>
          </div>

          <div className=" py-1 flex justify-between items-center border border-t-[#f3f4f6] border-b-0 border-r-0 border-l-0">
            <Button variant="primary">
              <UserPlus />
              Sign up
            </Button>
            <Button variant="tertiary" >
              <Gift />
              Claim 50 pts
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
