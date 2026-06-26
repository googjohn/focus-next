import { roboto } from "../fonts";
import { GoDotFill } from "react-icons/go";
import { formatTime } from "@/app/lib/utility";

export default function TimerDisplay({ duration }: { duration: number }) {

    const { min, sec } = formatTime(duration)

    return (
        <div className={`${roboto.className} antialiased text-9xl text-white/80 w-full flex gap-2.5 items-center justify-center max-w-96`}>
            <span className="basis-1/2 flex justify-end">{min}</span>
            <span className="basis-5 flex gap-3.5 flex-col items-center justify-center">
                <GoDotFill size={28} />
                <GoDotFill size={28} />
            </span>
            <span className="flex basis-1/2">{sec}</span>
        </div>
    )
}