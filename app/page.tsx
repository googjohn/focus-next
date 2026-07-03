"use client";

import { useState } from "react";

import { cn, saveSettings } from "./lib/utility";
import { inter } from "./ui/fonts";
import { FaPause, FaPlay } from "react-icons/fa6";
import { bgClasses } from "./lib/constants";
import { useCountDown } from "./lib/countdown";

import Button from "./ui/button";
import Header from "@/app/ui/header/header";
import Body from "@/app/ui/body/body";
import Indicator from "@/app/ui/border-indicator";
import Modes from "@/app/ui/body/modes";
import TimerDisplay from "@/app/ui/body/timer";
import Modal from "./ui/modal/modal";

export default function Page() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const {
        play,
        stop,
        timeLeft,
        settings,
        timerStatus,
        selectedMode,
        handleSelectedMode,
        handleChangeSettings,
    } = useCountDown()

    const handleModalOpen = () => {
        setIsModalOpen(!isModalOpen)
    }

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

                    <TimerDisplay duration={timeLeft} />

                    <Button
                        className={cn(
                            `${inter.className} font-bold  bg-white/75  antialiased tracking-wider px-7 py-2 rounded-lg hover:bg-white/50 cursor-pointer flex items-center gap-1.5`,
                            {
                                "text-focus": selectedMode === 'focus',
                                "text-short": selectedMode === 'short',
                                "text-long": selectedMode === 'long',
                            }
                        )}
                        onClick={timerStatus === 'running' ? stop : play}
                    >
                        <span className="text-2xl">
                            {timerStatus === 'running' ? 'PAUSE' : 'START'}
                        </span>
                        {timerStatus === 'running' ? <FaPause /> : <FaPlay />}
                    </Button>
                </Body>
                <Modal
                    modalProp={{ isModalOpen, handleModalOpen }}
                    settingsProp={{ settings, handleChangeSettings, saveSettings }}
                    selectedMode={selectedMode}
                />
            </main>
        </div >
    );
}
