"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
    ChangeEvent,
    IntervalRefType,
    SelectedMode,
    TimerStatus
} from "./definitions";
import { MODE_CONFIG, } from "./constants";

export const useCountDown = (mode: SelectedMode) => {
    const [settings, setSettings] = useState(MODE_CONFIG);

    const initialDuration = Math.max(0, settings[mode]);
    const [currentDuration, setCurrentDuration] = useState(initialDuration * 1);
    const [timerStatus, setTimerStatus] = useState<TimerStatus>('stopped')

    const intervalRef = useRef<IntervalRefType>(null);

    const clearTick = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }

    const advance = useCallback(() => {
        if (timerStatus === 'running' && currentDuration === 0) {
            if (settings.sessions === settings.interval) {

            }
        }
    }, [])

    const handlePlay = () => setTimerStatus('running');
    const handleStop = () => setTimerStatus('stopped');
    const handleSwitchMode = () => {

    }

    // handle input change
    const handleChangeSettings = (e: ChangeEvent) => {
        const { id, value } = e.currentTarget;

        setSettings(prev => ({
            ...prev,
            [id]: isNaN(parseInt(value)) ? 0 : parseInt(value)
        }))
    }

    // handle save
    const handleSaveSettings = () => {
        console.log(settings)
        const newSettings = JSON.stringify(settings)
        if (!newSettings) return;
        localStorage.setItem("userSettings", newSettings)
        console.log("New user settings saved.")
    }

    const getSavedSettings = () => {
        const storedSettings = localStorage.getItem("userSettings")

        if (!storedSettings) {
            console.log("No saved user settings.")
            return;
        }

        console.log('will i get passed here')
        const parsedUserSettings = JSON.parse(storedSettings)
        setSettings(parsedUserSettings)
    }

    useEffect(() => {
        setCurrentDuration(Math.max(0, settings[mode]))
        // has to add settings for dependency so that the first
        // change to settings from local storage is rendered
    }, [mode, settings])

    useEffect(() => {
        if (currentDuration <= 0) {
            handleStop();
            return;
        }

    }, [currentDuration])

    useEffect(() => {
        if (timerStatus === 'stopped') {
            clearTick();
            return;
        }

        intervalRef.current = setInterval(() => {
            setCurrentDuration(prev => {
                if (currentDuration <= 1) {
                    clearTick()
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return clearTick

    }, [timerStatus])

    return {
        settings,
        timerStatus,
        currentDuration,
        clearTick,
        handlePlay,
        handleStop,
        getSavedSettings,
        handleSaveSettings,
        handleChangeSettings,
    }
}
