import { Share2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";

export function ShareStack() {
  return (
    <Card variant="border">
      <CardHeader className="flex-row p-4 border border-b-[#f3f4f6] border-t-0 border-r-0 border-l-0 bg-white flex items-center gap-3">
        <div className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 bg-[rgba(228,144,230,0.1)] text-primary">
          <Share2 />
        </div>
        <div>
          <h3 className="font-semibold text-sm">Share Your Stack</h3>
          <p className="text-xs text-gray-500">Earn +25 pts</p>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-sm">Share your tool stack</p>
          </div>
          <button className="bg-[#eef2ff] hover:text-white hover:bg-primary text-primary py-2 px-4 rounded-full font-semibold text-sm transition-all duration-200 inline-flex items-center gap-2 border-0">
            <Share2 size={24}/>
            Share
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
