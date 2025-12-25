interface TabProps {
  name: string;
  activeTab: string; // Add this prop to know which tab is active
  setActiveTab: (tabName: string) => void;
  amount?: number;
}

export const Tab = ({ name, activeTab, setActiveTab, amount }: TabProps) => {
  return (
    <div
      className={`flex flex-row items-center gap-2 px-3 py-3 transition-all duration-300 ease-in-out hover:bg-purple-100 rounded-t-lg cursor-pointer text-base leading-6 whitespace-nowrap font-ui ${
        activeTab === name
          ? "border-b-[3px] border-primary bg-purple-100 text-primary"
          : "text-slate-500"
      }`}
      onClick={() => setActiveTab(name)}
    >
      <p>{name}</p>

      {amount !== undefined && (
        <span
          className={`text-xs rounded-full h-5 px-2 inline-flex justify-center items-center font-semibold ${
            activeTab === name
              ? "bg-[#9031fe]/10 text-primary"
              : "bg-[#E2E8F0] text-[#CBD5E0]"
          }`}
        >
          {amount}
        </span>
      )}
    </div>
  );
};
