"use client"

import { useState, useEffect, useRef } from "react"
export default function Auction() {
    const [error, setError] = useState("")
    const [bidder, setBidder] = useState<string | null>(null)
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [connection, setConnection] = useState("")
    const wsRef = useRef<WebSocket | null>(null)  // WebSocket 연결을 담아둘 상자

    useEffect(() => {
        if (!name) return   // 이름이 없으면 실행 안함

        const ws = new WebSocket(`ws://localhost:8000/ws?name=${encodeURIComponent(name)}`)
        wsRef.current = ws

        ws.onmessage = (event) => {        // 서버가 보낸 문자열 그대로
            const msg = JSON.parse(event.data)
            console.log(msg)

            if (msg.type == "price")
            {
                setPrice(msg.price)
                setBidder(msg.bidder)
                setError("")   
            }
            else if (msg.type == "join")
            {
                setConnection(msg.name)
            } 
            else if (msg.type == "error")
            {
                setError(msg.message)
            }
        }
    return () => {                                 //  cleanup: 이전 연결 닫기
            ws.close()
            wsRef.current = null
        }
    }, [name])   

    useEffect(() => {
        if (!connection) return                       // 비어 있으면 할 일 없음

        const timer = setTimeout(() => setConnection(""), 3000)

        return () => clearTimeout(timer)              // cleanup: 다음 실행 전에 이전 타이머 취소
    }, [connection])

    if (!name) {
        return (
            <div className="flex w-screen h-screen justify-center items-center">
                <form
                    className="card border flex flex-col gap-3 p-5"
                    onSubmit={(e) => {
                        e.preventDefault()
                        const value = new FormData(e.currentTarget).get("name") as string
                        if (value.trim()) setName(value.trim())
                    }}
                >
                    <h1 className="text-2xl">이름을 입력하세요</h1>
                    <input name="name" className="border p-1" autoFocus />
                    <button className="rounded-lg bg-blue-500 p-2 active:scale-95 active:bg-blue-700">
                        입장
                    </button>
                </form>
            </div>
        )
    }


    return (
        <div className="relative flex min-h-screen w-full items-center justify-center">
            {connection && (
                <h2 className="absolute inset-x-0 top-4 text-center text-2xl">
                {connection} 님이 접속했습니다.
                </h2>
            )}
            <div className="card border flex flex-col gap-5">
                <h1 className="text-4xl">
                    유니콘 건담 한정판
                </h1>
                <div className="flex justify-center text-2xl">
                    {price}원
                </div>
                {bidder && <p>최고 입찰자: {bidder}</p>}
                <form
                    className="flex gap-2"
                    onSubmit={(e) => {
                        e.preventDefault()
                        const form = e.currentTarget
                        const value = Number(new FormData(form).get("bid"))

                        if (!value) return
                        wsRef.current?.send(JSON.stringify({ type: "bid", price: value }))
                        form.reset()
                    }}
                >
                    <input name="bid" type="number" className="border"/>
                    <button className="rounded-lg bg-blue-500 p-2 active:scale-95 active:bg-blue-700">
                        입찰
                    </button>
                </form>
                {error && <p className="text-red-500">{error}</p>}
            </div>
        </div>
    )
}