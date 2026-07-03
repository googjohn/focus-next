import { cn } from "@/app/lib/utility";
import { inter } from "../fonts";
import { SelectedModeState } from "@/app/lib/definitions";
import { MODES, bgClasses } from "@/app/lib/constants";
import Button from "../button";

export default function Modes({ selectedMode, handleSelectedMode }: SelectedModeState) {

    return (
        <div className={`${inter.className} text-white flex items-center justify-center gap-1 sm:gap-2 antialiased`}>
            {MODES.map(mode => (
                <Button
                    key={mode}
                    className={cn(
                        "px-3 py-2 rounded-lg bg-white/20",
                        mode === selectedMode && `${bgClasses[selectedMode]} font-semibold`
                    )}
                    // data-mode={mode}
                    onClick={() => handleSelectedMode(mode)}
                >
                    {mode === 'focus' ? 'Focus On' : mode === 'short' ? 'Short Break' : 'Long Break'}
                </Button>
            ))}
        </div >
    )
}