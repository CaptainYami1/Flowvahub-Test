import { Card } from "../ui/card"

interface RedeemablesProps {
    icon : string;
    name : string;
    description: string;
    point: number; 
    disabled: boolean;
    button: string;
    redeem: boolean
    onClick: ()=> void;
}
export const Redeemables = ({icon,name,description, point, disabled, button,redeem,onClick}:RedeemablesProps) => {
  return (
    <>
    <Card variant="redeemable">
        <div className="flex flex-col items-center justify-center gap-4">
        <span className="w-12 h-12 rounded-xl flex items-center justify-center m-[0_auto] text-2xl text-primary bg-[#E9D4FF]">{icon}</span>
        <div className="flex flex-col gap-2 items-center justify-center">
          <h2 className="text-center text-[1.1rem] font-semibold">{name}</h2>
          <p className="text-center text-[0.9rem] text-[#2D3748]">{description}</p>
        </div>
        <p className="flex items-center justify-center text-primary font-semibold mb-4">⭐ {point} pts</p>
        <button disabled={disabled} onClick={onClick} className={`w-full font-semibold p-3 rounded-lg transition-all duration-300 ease-in-out  text-white ${redeem ? "bg-primary":"bg-[#d7e0ed]"}`}>{button}</button>
        </div>
    </Card>
    </>
  )
}
