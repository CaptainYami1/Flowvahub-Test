import { AppContext } from "../../context/AppContext";
import { Menu } from "lucide-react";
import { useContext } from "react";
import { Notification } from "./notification";

interface HeaderProps {
  h1: string;
  p: string;
}
export const Header = ({ h1, p }: HeaderProps) => {
    const context = useContext(AppContext)!;
      const { setOpenSidebar } = context;
  return (
    <div className="flex flex-col sticky top-0 z-10 bg-gray-50 pb-2  pt-3 lg:pt-0 lg:py-0">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Menu size={28} className="lg:hidden" onClick={() => setOpenSidebar(true)}/>
        <h1 className="text-xl md:text-2xl font-normal">{h1}</h1>
      </div>

      <Notification/>
    </div>
    <p className="text-gray-600">{p}</p>
    </div>
  );
};
