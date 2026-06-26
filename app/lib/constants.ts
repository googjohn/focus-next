import { SelectedMode, TimerSettings } from "./definitions"

// background classes
export const bgClasses = {
    focus: "bg-focus",
    short: "bg-short",
    long: "bg-long",
}

export const MODES: SelectedMode[] = [
    "focus",
    "short",
    "long",
]

export const MODE_CONFIG: TimerSettings = {
    focus: 25,
    short: 5,
    long: 15,
    sessions: 0,
    interval: 4,
}

export const totalSeconds = (mode: SelectedMode) => MODE_CONFIG[mode] * 60