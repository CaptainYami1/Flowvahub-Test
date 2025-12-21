
interface SubheadingProps {
    h2: string;
}
export const Subheading = ({ h2 }:SubheadingProps) => {
  return (
    <>
      <h2 className=" text-lg md:text-2xl my-3 text-black border border-l-4 border-t-0 border-b-0 border-r-0 border-[#9301fe] pl-3 font-semibold">
        {h2}
      </h2>
    </>
  );
};
