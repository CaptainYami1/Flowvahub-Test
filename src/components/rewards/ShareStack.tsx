import { Share2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { NoStackModal } from "./NoStackModal";
import { useState, useContext } from "react";
import supabase from "../../services/config";
import { toast } from "react-toastify";
import { StackAvailModal } from "./StackAvailModal";
import { ShareOptionModal } from "./ShareOptionModal";
import { AppContext } from "../../context/AppContext";


export function ShareStack() {
  const context = useContext(AppContext)!;
  const { setStacks } = context;
  
  const [openModal, setOpenModal] = useState(false);
  const [openStackAvailModal, setOpenStackAvailModal] = useState(false);
  const [openShareOptionModal, setOpenShareOptionModal] = useState(false);

  const handleShare = async () => {
    // Fetch stacks from endpoint
    const {
      data: { session },
    } = await supabase.auth.getSession();
    
    if (!session?.user) {
      toast.error("Please log in to share your stack");
      return;
    }

    const { data, error } = await supabase
      .from("stack")
      .select()
      .eq("user_id", session.user.id);

    if (error) {
      toast.error("Unable to fetch stacks.");
      console.error(error);
      return;
    }

    // Check if data is returned
    if (!data || data.length === 0) {
      // No data returned - show NoStackModal
      setOpenModal(true);
    } else {
      // Data returned - save to AppContext and show StackAvailModal
      setStacks(data);
      setOpenStackAvailModal(true);
    }
  };

  const handleOpenShareOption = () => {
    setOpenShareOptionModal(true);
  };

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
          <button
            className="bg-[#eef2ff] hover:text-white hover:bg-primary text-primary py-2 px-4 rounded-full font-semibold text-sm transition-all duration-200 inline-flex items-center gap-2 border-0"
            onClick={() => handleShare()}
          >
            <Share2 size={24} />
            Share
          </button>
        </div>
      </CardContent>
      <NoStackModal isOpen={openModal} onClose={() => setOpenModal(false)} />
      <StackAvailModal 
        isOpen={openStackAvailModal} 
        onClose={() => setOpenStackAvailModal(false)}
        openShareOption={handleOpenShareOption}
      />
      <ShareOptionModal 
        isOpen={openShareOptionModal} 
        onClose={() => {setOpenShareOptionModal(false),setOpenStackAvailModal(false)}}
      />
    </Card>
  );
}
