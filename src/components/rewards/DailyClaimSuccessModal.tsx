import { Modal } from "../ui/modal";
import React from "react";

interface DailyClaimSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DailyClaimSuccessModal = React.memo(
  ({ isOpen, onClose }: DailyClaimSuccessModalProps) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="w-full font-ui">
          <div className="block relative box-border text-sm text-start leading-5.5 wrap-break-word list-none appearance-none overflow-wrap-break-word pointer-events-auto">
            <button
              type="button"
              aria-label="Close"
              className="absolute top-0 right-0 bg-none border border-black/45 rounded-sm cursor-pointer text-sm h-8 w-8 text-center font-semibold leading-3.5 outline-none z-1000 flex items-center justify-center"
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

            <div className="relative overflow-hidden">
              <div className="flex justify-center z-20 relative ">
                <div className="w-24 h-24 text-green-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center my-2.5 ">
                <h2 className="text-2xl font-bold text-center text-primary">
                  Level Up! 🎉
                </h2>
                <p className="text-4xl pt-1 font-extrabold my-2.5 bg-linear-to-br from-primary to-[#FF9FF5] text-center bg-clip-text text-transparent [text-shadow:1px_1px_3px_rgba(0,0,0,0.1)]">
                  +5 Points
                </p>
              </div>
              <div className="flex justify-center space-x-1 mb-2.5">
                <span
                  className="animate-bounce"
                  style={{ animationDelay: "0ms" }}
                >
                  ✨
                </span>
                <span
                  className="animate-bounce"
                  style={{ animationDelay: "150ms" }}
                >
                  💎
                </span>
                <span
                  className="animate-bounce"
                  style={{ animationDelay: "300ms" }}
                >
                  🎯
                </span>
              </div>
              <p className="text-gray-600 text-[15px] text-center leading-relaxed mb-6">
                You've claimed your daily points! Come back tomorrow for more!
              </p>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
);
