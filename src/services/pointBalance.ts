import supabase from "./config";
import { toast } from "react-toastify";

interface PointBalance {
  id: number;
  balance: number;
}

export const fetchPointBalance = async (): Promise<number> => {
  const { data, error } = await supabase
    .from("accumulated_point_balance")
    .select()
    .single<PointBalance>();

  if (error && error.code !== "PGRST116") {
    toast.error("Unable to fetch point balance.");
    console.log(error);
    return 0;
  }

  if (!data) {
    // Insert initial record if none exists
    const { data: insertData, error: insertError } = await supabase
      .from("accumulated_point_balance")
      .insert({ balance: 0 })
      .single<PointBalance>();

    if (insertError) {
      console.error("Error initializing point balance:", insertError);
      return 0;
    }
    return insertData?.balance || 0;
  }

  return data.balance;
};
const targetId = 1;
export const updatePointBalance = async (newBalance: number) => {
  const { data, error } = await supabase
    .from("accumulated_point_balance")
    .update({ balance: newBalance })
    .eq('id', targetId);


  if (error) throw error;
  return data;
};
