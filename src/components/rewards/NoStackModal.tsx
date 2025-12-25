import { Modal } from "../ui/modal";

interface NoStackModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export const NoStackModal = ({ isOpen, onClose }: NoStackModalProps) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <div className="relative w-full flex flex-col justify-between items-center gap-4 -py-1">
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
        <h2 className="text-2xl font-bold text-black font-ui">Share Your Stack</h2>
        <div className="w-10 h-10  rounded-full flex justify-center items-center  text-[1rem] p-2 bg-[#E9D4FF] text-[#9013FE]">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="layer-group"
            className="svg-inline--fa fa-layer-group "
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path
              fill="currentColor"
              d="M264.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 149.8C37.4 145.8 32 137.3 32 128s5.4-17.9 13.9-21.8L264.5 5.2zM476.9 209.6l53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 277.8C37.4 273.8 32 265.3 32 256s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0l152-70.2zm-152 198.2l152-70.2 53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 405.8C37.4 401.8 32 393.3 32 384s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0z"
            ></path>
          </svg>
        </div>
        <p className="text-gray-600 text-sm max-w-80.5 text-center font-ui">You have no stack created yet, go to Tech Stack to create one.</p>
      </div>
    </Modal>
  );
};
