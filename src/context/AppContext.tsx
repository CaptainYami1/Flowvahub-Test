import { useEffect, useState, type ReactNode } from "react";
import { createContext } from "react";

export interface Stack {
  id: number;
  name: string;
  description: string;
  tool: string;
}

type AppContextType = {
  openSidebar: boolean;
  setOpenSidebar: (open: boolean) => void;
  activeItem: string;
  setActiveItem: (item: string) => void;
  session: unknown;
  setSession: (session: unknown) => void;
  stacks: Stack[] | null;
  setStacks: (stacks: Stack[] | null) => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

type AppProviderProps = {
  children: ReactNode;
};
export function AppProvider({ children }: AppProviderProps) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [activeItem, setActiveItem] = useState("Rewards Hub");
  const [session, setSession] = useState<unknown>(undefined);
  const [stacks, setStacks] = useState<Stack[] | null>(null);
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
      value={{
        openSidebar,
        setOpenSidebar,
        activeItem,
        setActiveItem,
        session,
        setSession,
        stacks,
        setStacks,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
