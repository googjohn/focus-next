import { useEffect, useState } from "react"

import { QuotesType, SelectedMode } from "@/app/lib/definitions";
import quotes from "@/public/quotes.json"


export const Quotes = ({ mode }: { mode: SelectedMode }) => {
    const [quote, setQuote] = useState<QuotesType>({ q: '', a: '', c: '', h: '', });
    useEffect(() => {
        if (mode === 'focus') {
            const random = Math.floor(Math.random() * quotes.length)
            setQuote(quotes[random])
        }
    }, [mode])

    return (
        <div className="quotes-container max-w-lg w-full bg-white/20 h-full p-5 mt-2.5 rounded-xl text-white/80 text-center shadow-2xl">
            <div dangerouslySetInnerHTML={{ __html: quote?.h }}></div>
        </div>
    )
}
