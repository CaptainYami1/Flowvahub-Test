import { Modal } from "../ui/modal";

export const StackAvailModal = ({ isOpen, onClose, openShareOption }: any) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center  relative w-full gap-4">
        {" "}
        <button
          type="button"
          aria-label="Close"
          className="absolute -top-3 -right-3 bg-none text-black/45  rounded-sm cursor-pointer text-sm h-8 w-8 text-center font-semibold leading-3.5 outline-none z-1000 flex items-center justify-center"
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
        <h2 className="text-2xl font-bold text-black font-ui">
          Share Your Stack
        </h2>
        <p className="text-gray-600">Share a stack to earn 25 points!</p>
        <div className="space-y-2 h-full m-h-[300px] overflow-y-auto w-full" onClick={openShareOption}>
          <div className="transition-all cursor-pointer duration-200 rounded-xl p-4 hover:bg-[rgba(144,19,254,0.05)] hover:-translate-y-0.5  flex items-center justify-between w-full">
            <div className="flex items-center">
              <div className="relative h-7 flex justify-center items-center w-7 rounded-md overflow-hidden text-white bg-primary">
                C
              </div>
              <div className="ml-3">
                <p className="font-medium text-start">Crypto</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="min-w-20 text-center px-2 py-1 rounded-full font-semibold text-sm bg-[#eef2ff] text-[#9013f3]">
                +25 pts
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-share2 lucide-share-2"
              >
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line>
                <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
