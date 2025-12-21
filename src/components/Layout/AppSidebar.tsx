import { X } from "lucide-react";
import Logo from "../../assets/logos/flowvaLogo.png";
import { HomeIcon, DiscoverIcon, RewardIcon, SettingsIcon, SubscriptionIcon, LibraryIcon, TechStackIcon } from "../icons/icons";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export const AppSidebar = () => {
  const context = useContext(AppContext)!;
  const { openSidebar, setOpenSidebar, activeItem } = context;

  const SidebarItems =[{
    name: 'Home',
    icon: <HomeIcon />
  },{
    name: 'Discover',
    icon: <DiscoverIcon />
  },{
    name: 'Library',
    icon: <LibraryIcon />
  },{
    name: 'Tech Stack',
    icon: <TechStackIcon />
  },{
    name: 'Subscription',
    icon: <SubscriptionIcon />
  },{
    name: 'Rewards',
    icon: <RewardIcon />
  },{
    name: 'Settings',
    icon: <SettingsIcon />
  }]

  return (
    <div
      className={
        openSidebar
          ? "fixed  inset-0 bg-black/50  z-30 lg:block lg:bg-transparent lg:z-0 lg:relative"
          : "hidden lg:block lg:bg-transparent lg:z-0 lg:relative"
      }
    >
      <div className="px-4 py-3 flex flex-col bg-white  w-72 overflow-x-hidden  h-screen shadow-md border-r border-black/10 text-black font-sans">
        <div className="flex justify-between p-3 ">
          <img src={Logo} alt="Flowva Logo" className="h-15" />
          <X
            size={28}
            className="lg:hidden"
            onClick={() => setOpenSidebar(false)}
          />
        </div>
        <div className="">

          {SidebarItems.map((item) => (
            <div
              key={item.name}
              className={`flex items-center gap-3 px-4 p-3 mb-2 rounded-lg cursor-pointer  duration-200 transition-all
                ${activeItem === item.name ? " bg-[rgba(144,19,254,0.2)] text-primary" : "text-black hover:bg-[rgba(144,19,254,0.1)] hover:text-primary"}`}>
              {item.icon}
              <span className="tracking-wide truncate">{item.name}</span>
            </div>
          ))}
          
        </div>
        <div className="mt-auto pt-3 relative flex justify-center border-t border-[#64748B]">
          <div className="w-full flex items-center justify-between ">
            <button className="flex items-center border-none">
              <div className="w-10 h-10 relative overflow-hidden rounded-full font-semibold mr-3 flex items-center justify-center  text-primary bg-[#E9D4FF]">
                <p className="font-semibold">A</p>
              </div>
              <div className="text-start">
                <span className="text-[0.9rem] font-semibold">Adesola</span>
                <p className="text-[0.8rem] text-[#718096] truncate overflow-x-hidden max-w-38.25">
                  adesolasolarin@gmail.com
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
