import { Copy, Users } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { useState, useEffect } from "react";
import supabase from "../../services/config";
import { toast } from "react-toastify";
import { usePointBalance } from "../../hooks/usePointBalance";
import { useRewards } from "../../hooks/useRewards";

export function ReferAndEarn() {
  const [referralCode, setReferralCode] = useState<string>("");
  const [referralsCount, setReferralsCount] = useState<number>(0);
  const [pointsEarned, setPointsEarned] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const { updateBalance } = usePointBalance();
  const { referralReward } = useRewards();
  // Generate referral code from user ID and store it
  useEffect(() => {
    const setupReferralCode = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        // Use first 8 characters of user ID as referral code
        const code = session.user.id.substring(0, 8);
        setReferralCode(code);

        // Store referral code mapping in database
        const { error } = await supabase.from("referral_codes").upsert(
          {
            user_id: session.user.id,
            code: code,
          },
          { onConflict: "user_id" }
        );

        if (error) {
          console.error("Error storing referral code:", error);
        }
      }
    };
    setupReferralCode();
  }, []);

  // Fetch referral stats
  useEffect(() => {
    const fetchReferralStats = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { data, error } = await supabase
        .from("referral_codes")
        .select("id")
        .eq("user_id", session.user.id);

      if (!error && data) {
        setReferralsCount(data.length);
        // Calculate points earned (referrals count * referral reward)
        if (referralReward) {
          setPointsEarned(data.length * referralReward);
        }
      }
    };

    if (referralCode) {
      fetchReferralStats();
    }
  }, [referralCode, referralReward]);

  useEffect(() => {
    const processReferral = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const refCode = urlParams.get("ref");

      if (!refCode) return;

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) return;

      const { data: existingRef } = await supabase
        .from("referrals")
        .select("id")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (existingRef) return;
      try {
        const { data: referralMapping } = await supabase
          .from("referral_codes")
          .select("user_id")
          .eq("code", refCode)
          .single();

        if (referralMapping && referralMapping.user_id !== session.user.id) {
          const referrerId = referralMapping.user_id;

          // Create referral record
          const { error: refError } = await supabase.from("referrals").insert({
            referrer_id: referrerId,
            user_id: session.user.id,
            referral_code: refCode,
          });

          if (!refError) {
            if (referralReward !== null) {
              updateBalance(referralReward);
            }

            toast.success("Referral processed! Points added to referrer.");
          }
        }
      } catch (error) {
        console.error("Error processing referral:", error);
      }
    };

    if (referralReward) {
      processReferral();
    }
  }, [referralReward]);

  const handleCopy = async () => {
    const referralLink = `localhost:5173/?ref=${referralCode}`;
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast.success("Referral link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const referralLink = referralCode
    ? `localhost:5173/?ref=${referralCode}`
    : "localhost:5173/?ref=loading";

  return (
    <Card variant="shadow">
      <CardHeader className="flex-row items-center gap-3 p-4 relative border border-b-[#f3f4f6] bg-[#eef2ff] border-t-0 border-r-0 border-l-0">
        <div className="w-6 h-6 text-primary">
          <Users />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-700">
            Share Your Link
          </h3>
          <p className="text-gray-500 text-sm">
            Invite friends and earn 25 points when they join!
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-4 gap-6 flex flex-col">
        <div className="flex flex-row items-center">
          <div className="text-center p-2 flex-1">
            <div className="text-2xl font-semibold text-primary">
              {referralsCount}
            </div>
            <div className="text-gray-600">Referrals</div>
          </div>
          <div className="text-center p-2 flex-1">
            <div className="text-2xl font-semibold text-primary">
              {pointsEarned}
            </div>
            <div className="text-gray-600">Points Earned</div>
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm mb-2 text-gray-700">
            Your personal referral link:
          </p>
          <div className="relative">
            <input
              type="text"
              title="link"
              readOnly
              className="flex-1  border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full pr-10"
              value={referralLink}
            />
            <button
              title="copy"
              onClick={handleCopy}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer z-10 hover:opacity-80 transition-opacity"
            >
              <Copy
                className={copied ? "text-green-500" : "text-primary"}
                size={24}
              />
            </button>
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <button
            title="social-media"
            className="w-7.5 h-7.5 rounded-full flex items-center justify-center text-white text-[18px] transition-transform duration-200 hover:-translate-y-0.75"
            style={{ background: "rgb(24, 119, 242)" }}
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="facebook-f"
              className="svg-inline--fa fa-facebook-f w-4"
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
          <button
            title="social-media"
            className="w-7.5 h-7.5 rounded-full flex items-center justify-center text-white text-[18px] transition-transform duration-200 hover:-translate-y-0.75"
            style={{ background: "black" }}
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="x-twitter"
              className="svg-inline--fa fa-x-twitter w-4"
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
          <button
            title="social-media"
            className="w-7.5 h-7.5 rounded-full flex items-center justify-center text-white text-[18px] transition-transform duration-200 hover:-translate-y-0.75"
            style={{ background: "rgb(0, 119, 181)" }}
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="linkedin-in"
              className="svg-inline--fa fa-linkedin-in w-4"
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
          <button
            title="social-media"
            className="w-7.5 h-7.5 rounded-full flex items-center justify-center text-white text-[18px] transition-transform duration-200 hover:-translate-y-0.75"
            style={{ background: "rgb(37, 211, 102)" }}
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="whatsapp"
              className="svg-inline--fa fa-whatsapp w-4"
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
        </div>
      </CardContent>
    </Card>
  );
}
