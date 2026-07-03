import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TimerSettings, TimerState } from "./definitions";

export const cn = (...input: ClassValue[]) => twMerge(clsx(...input))

export const formatTime = (duration: number) => {
    if (!duration) {
        return {
            min: '00',
            sec: '00'
        }
    }

    const min = Math.floor(duration / 60);
    const sec = Math.floor(duration % 60);

    return {
        min: String(min).padStart(2, '0'),
        sec: String(sec).padStart(2, '0'),
    }
}

// initialize settings by passing this function to useState
export const getUserSettings = (config: TimerSettings): TimerSettings => {
    try {
        const userSettings = localStorage.getItem("userSettings");

        if (!userSettings) {
            console.log("No saved user settings.")
            return config
        }

        const parsedSettings = JSON.parse(userSettings)

        return {
            ...parsedSettings
        }

    } catch (error) {
        console.error((error))
        return config
    }
}

// initialize reducer
export const initializeReducerState = (duration: number): TimerState => {
    return {
        timerStatus: "stopped",
        timeLeft: duration
    }
}

// handle save settings to localStorage
export const saveSettings = (settings: TimerSettings) => {

    const save = (setting: string) => localStorage.setItem("userSettings", setting)

    try {
        const storedSettings = localStorage.getItem("userSettings");

        if (!storedSettings) {
            console.log("No saved user settings.")
            save(JSON.stringify(settings))
        } {
            localStorage.clear()
            save(JSON.stringify(settings))
            console.log("New user settings saved.")
        }
        return;
    } catch (error) {
        console.error((error))
    }

}
