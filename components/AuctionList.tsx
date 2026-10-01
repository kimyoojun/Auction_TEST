import Link from "next/link"

export default function AuctionList() {
    return (
        <div className="card border hover">
            <h1 className="flex justify-center">
                경매 1
            </h1>
            <Link href="/auction">
                <button className="rounded-full bg-blue-500 p-2 active:scale-95 active:bg-blue-700">
                    경매 들어가기   
                </button>
            </Link>
        </div>
    )
}
