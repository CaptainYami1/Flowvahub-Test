import { useEffect, useRef, useState } from "react";
import { NotificationIcon } from "../icons/icons";

export const Notification = () => {
  const [notifications, setNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notifications &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notifications]);
  return (
    <div>
      <button
        ref={buttonRef}
        title="notification"
        onClick={() => setNotifications(!notifications)}
        className="bg-gray-200 w-10 h-10 hover:bg-gray-300 hover:text-primary relative rounded-full flex items-center justify-center cursor-pointer group"
      >
        <NotificationIcon />
      </button>
      {notifications && (
        <div className="absolute top-8 right-0 w-100 max-w-100 h-[318.1px] max-h-100 bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden opacity-100 visible z-1000 transition duration-200 ease-in-out">
          <div className="flex items-center justify-between px-5 py-4 text-white  bg-linear-to-br from-[#9013FE] to-[#FF9FF5]">
            <div className="flex items-center gap-2 h-6 text-white text-base font-semibold">
              Notifications
            </div>
            <div className="flex items-center gap-2 self-start text-white">
              <button
                className="block px-2 py-1 rounded text-[13px] font-medium leading-[19.5px] text-white/60 opacity-50 text-center transition-all duration-200 ease-in-out"
                disabled
                title="Mark all as read"
              >
                Mark all as read
              </button>
            </div>
          </div>
          <div className=" block h-64 max-h-75 w-100 overflow-y-auto">
            <div className="flex flex-col items-center justify-centerpx-5 py-15 text-center">
              <div className="block text-5xl leading-18 h-18 w-16 mb-4 text-center opacity-50">
                🔔
              </div>
              <div className="block text-base font-medium mb-1 text-center text-slate-500">
                No notifications
              </div>
              <div className=" block text-sm text-center text-slate-400">
                You're all caught up!
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
