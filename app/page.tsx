"use client";

import { useEffect, useMemo, useState } from "react";

import { cn } from "./lib/utility";
import { inter } from "./ui/fonts";
import { FaPause, FaPlay } from "react-icons/fa6";
import {
    ChangeEvent,
    TimerStatus,
    SelectedMode,
    TimerSettings,
} from "./lib/definitions";

import Button from "./ui/button";
import Header from "@/app/ui/header/header";
import Body from "@/app/ui/body/body";
import Indicator from "@/app/ui/border-indicator";
import Modes from "@/app/ui/body/modes";
import TimerDisplay from "@/app/ui/body/timer";
import Modal from "./ui/modal/modal";
import { useCountDown } from "./lib/countdown";
import { bgClasses } from "./lib/constants";

export default function Page() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedMode, setSelectedMode] = useState<SelectedMode>('focus')

    const {
        settings,
        timerStatus,
        currentDuration,
        clearTick,
        handlePlay,
        handleStop,
        getSavedSettings,
        handleSaveSettings,
        handleChangeSettings,
    } = useCountDown(selectedMode)

    const handleModalOpen = () => {
        setIsModalOpen(!isModalOpen)
    }

    const handleSelectedMode = (mod: SelectedMode) => {
        if (!mod || mod === selectedMode) return;
        setSelectedMode(mod)
        handleStop()
    }

    useEffect(() => {
        getSavedSettings()
    }, [])

    console.log(settings)
    console.log('this is current duration', currentDuration)
    return (
        <div className={cn(
            "flex flex-col flex-1 items-center justify-center sm:px-0 px-2.5 z-50",
            bgClasses[selectedMode]
        )}>
            <main className="flex flex-1 w-full max-w-2xl flex-col items-center ">
                <Header handleModalOpen={handleModalOpen} />
                <Indicator />
                <Body>
                    <Modes
                        selectedMode={selectedMode}
                        handleSelectedMode={handleSelectedMode}
                    />

                    <TimerDisplay duration={currentDuration} />

                    <Button
                        className={cn(
                            `${inter.className} font-bold  bg-white/75  antialiased tracking-wider px-7 py-2 rounded-lg hover:bg-white/50 cursor-pointer flex items-center gap-1.5`,
                            {
                                "text-focus": selectedMode === 'focus',
                                "text-short": selectedMode === 'short',
                                "text-long": selectedMode === 'long',
                            }
                        )}
                        onClick={timerStatus === 'running' ? handleStop : handlePlay}
                    >
                        <span className="text-2xl">
                            {timerStatus === 'running' ? 'PAUSE' : 'START'}
                        </span>
                        {timerStatus === 'running' ? <FaPause /> : <FaPlay />}
                    </Button>
                </Body>
                <Modal
                    modalProp={{ isModalOpen, handleModalOpen }}
                    settingsProp={{ settings, handleChangeSettings, handleSaveSettings }}
                    selectedMode={selectedMode}
                />
            </main>
        </div >
    );
}
