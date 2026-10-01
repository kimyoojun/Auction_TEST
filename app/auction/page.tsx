export default function Auction() {
    return (
        <div className="flex w-screen h-screen justify-center items-center">
            <div className="card border flex flex-col gap-5">
                <h1 className="text-4xl">
                    유니콘 건담 한정판
                </h1>
                <div className="flex justify-center text-2xl">
                    10000원
                </div>
                <div className="flex gap-2">
                    <input className="border"/>
                    <button className="rounded-lg bg-blue-500 p-2 active:scale-95 active:bg-blue-700">
                        입찰
                    </button>
                </div>
            </div>
        </div>
    )
}