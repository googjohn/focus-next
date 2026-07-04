import { bgClasses } from "../lib/constants";
import { SelectedMode } from "../lib/definitions";

export default function Indicator({
    timeLeft,
    duration,
    sessions,
    interval,
    selectedMode,
}: {
    timeLeft: number,
    duration: number,
    sessions: number,
    interval: number,
    selectedMode: SelectedMode,
}) {

    const progress = (((duration - timeLeft) / duration) * 100)
    const width = Math.max(0, Math.min(progress, 100))

    let bgColor = undefined;
    if (selectedMode === 'focus') {
        const nextSession = sessions + 1
        const nextMode = nextSession % interval === 0 ? "long" : "short"
        bgColor = bgClasses[nextMode]
    } else {
        bgColor = bgClasses['focus']
    }

    return (
        <div className="bg-white/80 h-0.5 w-full">
            <div className={`${bgColor} h-full transition-[width] duration-1000 ease-linear`} style={{ width: `${width}%` }}></div>
        </div>
    )
}