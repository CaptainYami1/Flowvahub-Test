import { X, LogIn } from "lucide-react";
import Logo from "../../assets/logos/flowvaLogo.png";
import {
  HomeIcon,
  DiscoverIcon,
  RewardIcon,
  SettingsIcon,
  SubscriptionIcon,
  LibraryIcon,
  TechStackIcon,
} from "../icons/icons";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Button from "../ui/button";
import supabase from "../../services/config";

export const AppSidebar = () => {
  const context = useContext(AppContext)!;
  const { openSidebar, setOpenSidebar, activeItem , setSession} = context;
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);

  // Check for access token and handle anonymous login
  useEffect(() => {
    const checkToken = async () => {
      try {
        // Check Supabase session
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.access_token) {
          setAccessToken(session.access_token);
          const user = session.user;

          // Check if user is anonymous
          const anonymous =
            user.is_anonymous ||
            user.app_metadata?.provider === "anonymous" ||
            !user.email;

          setIsAnonymous(anonymous);

          if (anonymous) {
            // Anonymous user - show as Guest
            setUserName("Guest User");
            setUserEmail("");
          } else {
            // Authenticated user
            setUserName(
              user.user_metadata?.name || user.email?.split("@")[0] || "User"
            );
            setUserEmail(user.email || "");
          }
        } else {
          // No session - check localStorage/sessionStorage as fallback
          const token =
            localStorage.getItem("accessToken") ||
            localStorage.getItem("token") ||
            sessionStorage.getItem("accessToken") ||
            sessionStorage.getItem("token");

          if (token) {
            setAccessToken(token);
            setIsAnonymous(false);
            const storedName =
              localStorage.getItem("userName") ||
              sessionStorage.getItem("userName");
            const storedEmail =
              localStorage.getItem("userEmail") ||
              sessionStorage.getItem("userEmail");
            if (storedName) setUserName(storedName);
            if (storedEmail) setUserEmail(storedEmail);
          } else {
            // No session and no token - show login button
            setAccessToken(null);
            setIsAnonymous(false);
            setUserName("");
            setUserEmail("");
          }
        }
      } catch (error) {
        console.error("Error checking token:", error);
        setAccessToken(null);
        setIsAnonymous(false);
      }
    };

    checkToken();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.access_token) {
        setAccessToken(session.access_token);
        const user = session.user;

        const anonymous =
          user.is_anonymous ||
          user.app_metadata?.provider === "anonymous" ||
          !user.email;

        setIsAnonymous(anonymous);

        if (anonymous) {
          setUserName("Guest User");
          setUserEmail("");
        } else {
          setUserName(
            user.user_metadata?.name || user.email?.split("@")[0] || "User"
          );
          setUserEmail(user.email || "");
        }
      } else {
        setAccessToken(null);
        setIsAnonymous(false);
        setUserName("");
        setUserEmail("");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInAnonymously()

      if (error) {
        console.error("Error signing in anonymously:", error);
      } 
      
      if (data?.session) {
        // Auth state change listener will handle the UI update
        setAccessToken(data.session.access_token);
        setSession(data.session.access_token)
        setIsAnonymous(true);
        setUserName("Guest User");

        setUserEmail("");
      }
    } catch (error) {
      console.error("Error during anonymous login:", error);
    }
  };

  const SidebarItems = [
    {
      name: "Home",
      icon: <HomeIcon />,
    },
    {
      name: "Discover",
      icon: <DiscoverIcon />,
    },
    {
      name: "Library",
      icon: <LibraryIcon />,
    },
    {
      name: "Tech Stack",
      icon: <TechStackIcon />,
    },
    {
      name: "Subscription",
      icon: <SubscriptionIcon />,
    },
    {
      name: "Rewards Hub",
      icon: <RewardIcon />,
    },
    {
      name: "Settings",
      icon: <SettingsIcon />,
    },
  ];

  return (
    <div
      className={
        openSidebar
          ? "fixed  inset-0 bg-black/50  z-30 lg:block lg:bg-transparent lg:z-0 lg:relative"
          : "hidden lg:block lg:bg-transparent lg:z-0 lg:relative"
      }
    >
      <div className="px-4 py-3 flex flex-col bg-white  max-w-72 overflow-x-hidden  h-screen shadow-md border-r border-black/10 text-black font-ui">
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
              className={`flex w-[202.5px] items-center gap-3 px-4 p-3 mb-2 rounded-lg font-ui cursor-pointer  duration-200 transition-all
                ${
                  activeItem === item.name
                    ? " bg-[rgba(144,19,254,0.2)] text-primary"
                    : "text-black hover:bg-[rgba(144,19,254,0.1)] hover:text-primary"
                }`}
            >
              {item.icon}
              <span className="tracking-wide truncate">{item.name}</span>
            </div>
          ))}
        </div>
        <div className="mt-auto pt-3 relative flex justify-center border-t border-[#64748B]">
          <div className="w-full flex items-center justify-between">
            {accessToken ? (
              <button className="flex items-center border-none w-full">
                <div className="w-10 h-10 relative overflow-hidden rounded-full font-semibold mr-3 flex items-center justify-center text-primary bg-[#E9D4FF] shrink-0">
                  <p className="font-semibold">
                    {userName ? userName.charAt(0).toUpperCase() : "U"}
                  </p>
                </div>
                <div className="text-start flex-1 min-w-0">
                  <span className="text-[0.9rem] font-semibold block truncate">
                    {userName || "User"}
                  </span>
                  {userEmail ? (
                    <p className="text-[0.8rem] text-[#718096] truncate overflow-x-hidden">
                      {userEmail}
                    </p>
                  ) : isAnonymous ? (
                    <p className="text-[0.8rem] text-[#718096] truncate overflow-x-hidden">
                      Anonymous
                    </p>
                  ) : null}
                </div>
              </button>
            ) : (
              <Button
                onClick={handleLogin}
                variant="primary"
                className="w-full"
              >
                <LogIn size={18} />
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
