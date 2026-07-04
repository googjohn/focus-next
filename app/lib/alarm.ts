"use client";

import { useCallback, useEffect, useRef } from "react";

export function useAlarm() {
    const alarmRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        alarmRef.current = new Audio("/alarm/alarm-buzzer.wav")

        // make sure to stop playing after unmount
        return () => {
            alarmRef.current?.pause();
            alarmRef.current = null
        }
    }, [])

    const playAlarm = useCallback(() => {
        const audio = alarmRef.current;
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(console.error)
        }
    }, [])

    const stopAlarm = useCallback(() => {
        const audio = alarmRef.current;
        if (audio && !audio.paused) {
            audio.pause()
            audio.currentTime = 0;
        }
    }, [])

    return {
        stopAlarm,
        playAlarm
    }
}