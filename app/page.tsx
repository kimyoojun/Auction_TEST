import AuctionList from "@/components/AuctionList";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <AuctionList/>
    </div>
  );
}
