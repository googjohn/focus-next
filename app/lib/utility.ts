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

// initialize settings from default config or settings from local storage
export const getUserSettings = (config: TimerSettings): TimerSettings => {
    try {
        // client side / browser
        if (typeof window !== undefined) {
            const userSettings = localStorage.getItem("userSettings");
            return userSettings ? JSON.parse(userSettings) : config
        }

        // server side
        return config
    } catch (error) {
        console.error(error)
        return config;
    }
}

// initialize reducer
export const initializeReducerState = (duration: number): TimerState => {
    return {
        timerStatus: "stopped",
        timeLeft: duration,
        sessions: 0,
    }
}

// handle save settings to localStorage
export const saveSettings = (settings: TimerSettings) => {
    try {
        const newUserSettings = JSON.stringify(settings)
        if (typeof window !== undefined) {
            localStorage.setItem("userSettings", newUserSettings)
            console.log("New user settings saved.")
        }
        return;
    } catch (error) {
        console.error((error))
    }
}
