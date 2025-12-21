import { useEffect, useState, type ReactNode } from "react";
import { createContext } from "react";

type AppContextType = {
  openSidebar: boolean;
  setOpenSidebar: (open: boolean) => void;
  activeItem: string;
  setActiveItem: (item: string) => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

type AppProviderProps = {
  children: ReactNode;
};
export function AppProvider({ children }: AppProviderProps) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [activeItem, setActiveItem] = useState("Rewards");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        setOpenSidebar(false);
      }
    };

    handleChange(mediaQuery);

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <AppContext.Provider
      value={{ openSidebar, setOpenSidebar, activeItem, setActiveItem }}
    >
      {children}
    </AppContext.Provider>
  );
}
