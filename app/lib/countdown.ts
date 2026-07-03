"use client";

import { useCallback, useEffect, useReducer, useRef, useState } from "react";

import {
    IntervalRefType,
    SelectedMode,
    TimeoutRefType,
    TimerSettings,
    TimerStatus
} from "./definitions";
import { MODE_CONFIG } from "./constants";
import { timerReducer } from "./reducers";
import { getUserSettings, initializeReducerState } from "./utility";

export const useCountDown = () => {
    const [settings, setSettings] = useState(MODE_CONFIG);

    const [selectedMode, setSelectedMode] = useState<SelectedMode>('focus')

    useEffect(() => {
        setSettings(getUserSettings(MODE_CONFIG))
    }, [])

    const derivedDuration = settings[selectedMode];

    const [timerState, dispatch] = useReducer(timerReducer, derivedDuration, initializeReducerState)

    console.log('this is derived duration ', derivedDuration)

    const intervalRef = useRef<IntervalRefType>(null);
    const autoPlayTimeoutRef = useRef<TimeoutRefType>(null);
    const autoSwitchTimeoutRef = useRef<TimeoutRefType>(null);


    const { timeLeft, timerStatus } = timerState;

    useEffect(() => {
        dispatch({ type: "UPDATE_TIME", payload: { duration: Math.max(0, derivedDuration * 60) } })
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
        if (autoPlayTimeoutRef.current && autoSwitchTimeoutRef.current) {
            clearTimeout(autoPlayTimeoutRef.current)
            clearTimeout(autoSwitchTimeoutRef.current)
        }
        dispatch({ type: "SET_STATUS", payload: { status: 'stopped' } })
        // clearTick()
    }

    const pause = () => {
        dispatch({ type: "SET_STATUS", payload: { status: 'paused' } })
        // clearTick()
    }

    const switchMode = (mode: SelectedMode) => {
        if (mode === 'focus') {
            setSettings(prev => {
                const nextSession = prev.sessions + 1
                const nextMode = nextSession % prev.interval === 0 ? "long" : "short"
                setSelectedMode(nextMode)

                return {
                    ...prev,
                    sessions: nextSession,
                }
            })
            return;
        }

        setSelectedMode('focus')
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

        // clearTick();
        dispatch({ type: "FINISHED" })

        autoSwitchTimeoutRef.current = setTimeout(() => {
            switchMode(selectedMode);
        }, 1000);

        autoPlayTimeoutRef.current = setTimeout(() => {
            play();
        }, 2000);

    }, [timeLeft, timerStatus, selectedMode])
    console.log(timeLeft, timerStatus)
    console.log(settings)
    return {
        play,
        stop,
        timeLeft,
        settings,
        switchMode,
        timerStatus,
        selectedMode,
        handleSelectedMode,
        handleChangeSettings,
    }
}
