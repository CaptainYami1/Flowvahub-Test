import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import supabase from "../../services/config";
import { useRewards } from "../../hooks/useRewards";
import { usePointBalance } from "../../hooks/usePointBalance";

export const TopToolClaimModal = ({ isOpen, onClose, submitClaim }: any) => {
  const { topToolReward } = useRewards();
  const { updateBalance } = usePointBalance();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [fileError, setFileError] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);

  // Mount portal on client side
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useLayoutEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setFile(null);
      setFileName("");
      setEmailError("");
      setFileError("");
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

  const handleClaim = async (e?: React.FormEvent) => {
    e?.preventDefault();

    setEmailError("");
    setFileError("");

    let hasError = false;

    if (!email || email.trim() === "") {
      setEmailError("Please enter your Reclaim sign-up email");
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address");
      hasError = true;
    }

    if (!file) {
      setFileError("Please upload a screenshot of your Reclaim profile");
      hasError = true;
    }

    if (hasError) {
      if (!email || email.trim() === "") {
        toast.error("Please enter your Reclaim sign-up email");
      } else if (!file) {
        toast.error("Please upload a screenshot of your Reclaim profile");
      }

      return;
    }

  
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error("Please log in to submit a claim");
      return;
    }
    const { data: existingClaims, error: checkError } = await supabase
      .from("top_tool_claims")
      .select("id")
      .eq("user_id", user.id)
      .order("id", { ascending: true }); 

    if (checkError) {
      console.error("Error checking existing claim:", checkError);
      toast.error("Failed to check claim status");
      return;
    }

    if (existingClaims && existingClaims.length > 0) {
      toast.error("You have already submitted a claim for the top tool reward");
      return;
    }
    const claimData: any = {
      user_id: user.id,
      email: email.trim(),
      status: "pending",
    };

    const { error: insertError } = await supabase
      .from("top_tool_claims")
      .insert(claimData);

    if (insertError) {
      // Handle duplicate key error (shouldn't happen if we checked above, but handle gracefully)
      if (insertError.code === "23505") {
        toast.error(
          "You have already submitted a claim for the top tool reward"
        );
      } else {
        console.error("Error creating claim:", insertError);
        toast.error("Failed to submit claim. Please try again.");
      }
      return;
    }

    // Success - show success message
    toast.success(
      "Claim submitted successfully! Points will be added to your balance in a moment."
    );
    setEmail("");
    setFile(null);
    setFileName("");
    onClose();
    if (topToolReward !== null) {
      updateBalance(topToolReward);
      toast.success("Points have been added to your balance!");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) {
      setEmailError("");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : "");
    if (fileError) {
      setFileError("");
    }
  };

  const handleCancel = () => {
    setEmail("");
    setFile(null);
    setFileName("");
    setEmailError("");
    setFileError("");
    submitClaim();
    onClose();
  };

  if (!mounted) return null;

  const modalContent = (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/50"
      style={{ display: isOpen ? "flex" : "none" }}
      onClick={handleOverlayClick}
    >
      <div
        className="max-w-130 animate-fadeIn w-full rounded-md shadow-lg px-6 py-5 flex flex-col items-center justify-center bg-white border-gray-900/10 border-2 border-b-0 rounded-t-2xl rounded-b-2xl shadow-[rgba(0,0,0,0.08)] box-border text-sm leading-5.5 text-start relative select-text font-ui "
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
        <h1 className="md:text-lg w-full">Claim Your 25 Points</h1>
        <div className=" w-full">
          <p className="text-[0.9rem] text-[#6c757d]">
            Sign up for Reclaim (free, no payment needed), then fill the form
            below:
          </p>
          <ul className="text-[0.9rem] text-[#6c757d]">
            <li>1️⃣ Enter your Reclaim sign-up email.</li>
            <li>
              2️⃣ Upload a screenshot of your Reclaim profile showing your email.
            </li>
          </ul>
          <p className="text-[0.9rem] text-[#6c757d]">
            After verification, you’ll get 25 Flowva Points! 🎉😊
          </p>
          <form className="mt-3" onSubmit={handleClaim}>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-2 text-[#111827]"
            >
              Email used on Reclaim
            </label>
            <div className="relative group w-full mb-5">
              <input
                type="email"
                id="email"
                placeholder="user@example.com"
                className={`peer w-full border text-base py-2.5 px-3.5 transition-all ease-linear duration-200 rounded-md outline-none ${
                  emailError
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#EDE9FE] focus:border-primary"
                }`}
                required
                value={email}
                onChange={handleEmailChange}
              />
              <div className="pointer-events-none absolute inset-0 rounded-md peer-focus:shadow-[0_0_0_3px_rgba(124,58,237,0.1)]"></div>
              {emailError && (
                <p className="text-red-500 text-xs mt-1">{emailError}</p>
              )}
            </div>
            <label
              htmlFor="file"
              className="block text-sm mb-2 font-medium text-[#111827]"
            >
              Upload screenshot (mandatory)
            </label>
            <label
              className={`p-2 cursor-pointer hover:bg-[rgba(29,28,28,0.05)] block border border-dashed rounded-lg bg-[#f9f9f9] transition-all duration-200 ${
                fileError ? "border-red-500" : "border-[#e9ecef]"
              }`}
            >
              <p className="text-center flex justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-cloud-download"
                >
                  <path d="M12 13v8l-4-4"></path>
                  <path d="m12 21 4-4"></path>
                  <path d="M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284"></path>
                </svg>
                <span className="text-base">{fileName || "Choose file"}</span>
              </p>
              <input
                className="hidden"
                type="file"
                id="file"
                accept="image/*"
                required
                onChange={handleFileChange}
              />
            </label>
            {fileError && (
              <p className="text-red-500 text-xs mt-1">{fileError}</p>
            )}
            <div className="flex gap-3 justify-end mt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="p-[0.5rem_1rem] rounded-lg font-semibold transition-all duration-200 hover:bg-[#d1d5db] bg-[#e9ecef] text-[#020617]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="p-[0.5rem_1rem] rounded-lg font-semibold transition-all duration-200 bg-[#9103fe] text-white hover:bg-[#FF8687]"
                onClick={handleClaim}
              >
                Submit Claim
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
