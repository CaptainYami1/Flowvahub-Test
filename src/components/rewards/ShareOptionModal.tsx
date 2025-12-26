import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import { useAppContext } from "../../context/AppContext";
import { useRewards } from "../../hooks/useRewards";

export const ShareOptionModal = ({ isOpen, onClose }: any) => {
  const {stacks, updateBalance, refetchBalance } = useAppContext();
  const { shareStackReward } = useRewards();
  const [mounted, setMounted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Mount portal on client side
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useLayoutEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      // The base modal (z-40) may already have set this, but ensure it's set
      document.body.style.overflow = "hidden";

      return () => {
        // When this modal closes, check if base modal (z-40) is still open
        // If base modal is open, keep overflow hidden; otherwise restore it
        const baseModal = document.querySelector(".fixed.inset-0.z-40");
        if (
          !baseModal ||
          baseModal.getAttribute("style")?.includes("display: none")
        ) {
          document.body.style.overflow = "";
        }
      };
    }
  }, [isOpen]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  const handleModalContentClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
    },
    []
  );

  const handleContentMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
    },
    []
  );

  const handleCopy = () => {
    const copyText =
      "🚀 I just created something awesome on Flowva! Check it out – it could be a helpful collection for you. 👉 Explore here: https://app.flowvahub.com/s/jhqfka";

    navigator.clipboard
      .writeText(copyText)
      .then(() => {
        toast.success("Referral link copied to clipboard!");
  })
      .catch((err) => {
        console.error("Failed to copy!", err);
      });
  };

  if (!mounted) return null;

  const handleClaim=async()=>{
   
   if (!shareStackReward) {
    toast.error("Reward is not available.");
    return;
  }

  updateBalance(shareStackReward); 
  await refetchBalance();         
  onClose();
  }

  const modalContent = (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-60  bg-black/50"
      style={{ display: isOpen ? "block" : "none" }}
      onClick={handleOverlayClick}
    >
      <div
        className="h-fit mx-auto top-25 max-w-130 animate-fadeIn w-full rounded-md shadow-lg px-6 py-5 flex flex-col items-center justify-center bg-white border-gray-900/10 border-2 border-b-0 rounded-t-2xl rounded-b-2xl shadow-[rgba(0,0,0,0.08)] box-border text-sm leading-5.5 text-start relative select-text font-ui "
        onClick={handleModalContentClick}
        onMouseDown={handleContentMouseDown}
      >
        <button
          type="button"
          aria-label="Close"
          className="absolute top-3 right-3 bg-none text-black/45  rounded-sm cursor-pointer text-sm h-8 w-8 text-center font-semibold leading-3.5 outline-none z-1000 flex items-center justify-center"
          onClick={onClose}
        >
          <span className="flex items-center justify-center cursor-pointer box-border text-base font-semibold h-4 w-4 text-center leading-4 list-none appearance-none">
            <span
              role="img"
              aria-label="close"
              className="flex items-center cursor-pointer box-border h-4 w-4 text-base font-semibold text-center leading-4 list-none appearance-none"
            >
              <svg
                fillRule="evenodd"
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="close"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
              </svg>
            </span>
          </span>
        </button>
        <h1 className="text-[#9301fe] text-xl w-full">Share Your Stack</h1>
        <div className="w-full bg-[#eef2ff] p-5 rounded-lg border-dashed border border-[#9301fe] mt-2">
          <div className="flex items-center gap-2 mb-3.75">
            <h2 className="text-[#9031fe] text-[18px] font-bold ">
              {stacks?.[0]?.name}+ {(stacks?.length ?? 0) - 1}
            </h2>
          </div>
          <p></p>
          <div className="bg-white w-fit mt-3.75  p-[8px_12px] rounded-md flex items-center border border-[#e5e7eb] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]">
            <p className="h-6 w-6 bg-[#eef2ff] rounded-[md] flex items-center justify-center mr-2  text-xs text-[#9301fe]">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="circle-info"
                className="svg-inline--fa fa-circle-info "
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                ></path>
              </svg>
            </p>
            <p>
              <span>{stacks?.length ?? 0} tool is</span> in this stack
            </p>
          </div>
        </div>
        <div className="mt-5 gap-3.75 flex justify-center">
          <button onClick={()=>handleClaim()}
            title="x"
            className="w-7.5 h-7.5 md:w-8.75 md:h-8.75 hover:-translate-y-0.75 bg-black rounded-full flex items-center p-2 justify-center text-white text-[20px] cursor-pointer transition-transform duration-200 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="x-twitter"
              className="svg-inline--fa fa-x-twitter "
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
              ></path>
            </svg>
          </button>
          <button onClick={()=>handleClaim()}
            title="facebook"
            className=" p-2 w-7.5 h-7.5 md:w-8.75 md:h-8.75 hover:-translate-y-0.75 rounded-full bg-[#4267B2] flex items-center justify-center text-white text-[20px] cursor-pointer transition-transform duration-200 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="facebook-f"
              className="svg-inline--fa fa-facebook-f "
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path
                fill="currentColor"
                d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"
              ></path>
            </svg>
          </button>
          <button onClick={()=>handleClaim()}
            title="linkedIn"
            className="p-2 w-7.5 h-7.5 md:w-8.75 md:h-8.75 hover:-translate-y-0.75 bg-[#0077B5] rounded-full flex items-center justify-center text-white text-[20px] cursor-pointer transition-transform duration-200 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="linkedin-in"
              className="svg-inline--fa fa-linkedin-in "
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
              ></path>
            </svg>
          </button>
          <button onClick={()=>handleClaim()}
            title="whatsapp"
            className="p-2 w-7.5 h-7.5 md:w-8.75 md:h-8.75 hover:-translate-y-0.75 bg-[#31cf31] rounded-full flex items-center justify-center text-white text-[20px] cursor-pointer transition-transform duration-200 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="whatsapp"
              className="svg-inline--fa fa-whatsapp "
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
              ></path>
            </svg>
          </button>
          <button onClick={()=>handleClaim()}
            title="gmail"
            className="p-2 w-7.5 h-7.5 md:w-8.75 md:h-8.75 hover:-translate-y-0.75 bg-[#D44638] rounded-full flex items-center justify-center text-white text-[20px] cursor-pointer transition-transform duration-200 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="envelope"
              className="svg-inline--fa fa-envelope "
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex gap-2 items-center my-2 w-full">
          <div className="relative group w-full ">
            <input
              type="text"
              name="tools"
              disabled
              placeholder="Search for tools..."
              className=" peer w-full h-full border py-2 px-4 text-base  border-[#EDE9FE] transition-all ease-linear duration-200 rounded-md   outline-none focus:border-primary"
              required
              value="🚀 I just created something awesome on Flowva! Check it out – it could be a helpful collection for you. 👉 Explore here: https://app.flowvahub.com/s/jhqfka"
            />
            <div className="pointer-events-none absolute inset-0 rounded-md peer-focus:shadow-[0_0_0_3px_rgba(124,58,237,0.1)]"></div>
          </div>
          <button
            className="rounded-lg px-6 py-2 bg-[#9013FE] text-white transition-all border-none duration-200  hover:bg-[#7a0fd8] hover:transform hover:-translate-y-px"
            onClick={handleCopy}
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
