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

// default settings
export const MODE_CONFIG: TimerSettings = {
    focus: 25,
    short: 5,
    long: 15,
    interval: 4,
}