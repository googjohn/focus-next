"use client";

import { useEffect, useReducer, useRef, useState } from "react";

import { MODE_CONFIG } from "./constants";
import { timerReducer } from "./reducers";
import {
    SelectedMode,
    TimerSettings,
    TimeoutRefType,
    IntervalRefType,
} from "./definitions";
import {
    saveSettings,
    getUserSettings,
    initializeReducerState,
} from "./utility";
import { useAlarm } from "./alarm";

export const useCountDown = () => {
    const [settings, setSettings] = useState(MODE_CONFIG);
    const [selectedMode, setSelectedMode] = useState<SelectedMode>('focus')

    const derivedDuration = settings[selectedMode] * 60;

    console.log('this is derived duration ', derivedDuration);
    const [timerState, dispatch] = useReducer(timerReducer, derivedDuration, initializeReducerState);

    const intervalRef = useRef<IntervalRefType>(null);
    const autoPlayTimeoutRef = useRef<TimeoutRefType>(null);
    const autoSwitchTimeoutRef = useRef<TimeoutRefType>(null);

    const { timeLeft, timerStatus, sessions } = timerState;
    const { playAlarm, stopAlarm } = useAlarm()

    useEffect(() => {
        const storedSettings = getUserSettings(MODE_CONFIG)
        setSettings(storedSettings)
    }, [])

    useEffect(() => {
        saveSettings(settings)
    }, [settings])

    useEffect(() => {
        dispatch({ type: "UPDATE_TIME", payload: { duration: Math.max(0, derivedDuration) } })
    }, [derivedDuration])

    const handleSelectedMode = (mod: SelectedMode) => {
        if (!mod || mod === selectedMode) return;
        stop()
        setSelectedMode(mod)
    }

    const clearTick = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }

    const play = () => {
        dispatch({ type: "SET_STATUS", payload: { status: 'running' } })
    }

    const stop = () => {
        if (autoPlayTimeoutRef.current) {
            clearTimeout(autoPlayTimeoutRef.current)
            autoPlayTimeoutRef.current = null
        }

        if (autoSwitchTimeoutRef.current) {
            clearTimeout(autoSwitchTimeoutRef.current)
            autoSwitchTimeoutRef.current = null
        }
        dispatch({ type: "SET_STATUS", payload: { status: 'stopped' } })
    }

    const pause = () => {
        dispatch({ type: "SET_STATUS", payload: { status: 'paused' } })
        // clearTick()
    }

    const switchMode = (mode: SelectedMode) => {
        if (mode === 'focus') {
            const nextSession = sessions + 1
            const nextMode = nextSession % settings.interval === 0 ? "long" : "short"
            setSelectedMode(nextMode)
            dispatch({ type: 'UPDATE_SESSIONS' })
            return;
        }

        setSelectedMode('focus');
    }

    // handle input change
    const handleChangeSettings = (localState: Omit<TimerSettings, 'sessions'>) => {
        const { focus, short, long, interval } = localState

        setSettings(prev => ({
            ...prev,
            focus: Number(focus),
            short: Number(short),
            long: Number(long),
            interval: Number(interval),
        }))
    }

    useEffect(() => {
        if (timerStatus !== 'running') {
            clearTick();
            return;
        }

        intervalRef.current = setInterval(() => {
            dispatch({ type: "TICKING" })
        }, 1000)

        return clearTick

    }, [timerStatus])

    useEffect(() => {
        if (timerStatus !== 'running' || timeLeft > 0) return;

        playAlarm();
        dispatch({ type: "FINISHED" })

        autoSwitchTimeoutRef.current = setTimeout(() => {
            stopAlarm();
            switchMode(selectedMode);
        }, 1500);

        autoPlayTimeoutRef.current = setTimeout(() => {
            play();
        }, 2500);

    }, [timeLeft, timerStatus, selectedMode])
    console.log(timeLeft, timerStatus, sessions)
    console.log(settings)
    return {
        play,
        stop,
        timeLeft,
        settings,
        sessions,
        switchMode,
        timerStatus,
        selectedMode,
        handleSelectedMode,
        handleChangeSettings,
        duration: derivedDuration,
    }
}
