"use client";

import { useState } from "react";

import { cn } from "./lib/utility";
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
import { Tasks } from "./ui/tasks/task";
import { Quotes } from "./ui/quotes/quotes";
import { Notes } from "./ui/notes/notes";

export default function Page() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const {
        play,
        stop,
        pause,
        settings,
        sessions,
        timeLeft,
        timerStatus,
        selectedMode,
        sessionDuration,
        handleSelectedMode,
        handleChangeSettings,
    } = useCountDown()

    const handleModalOpen = () => {
        setIsModalOpen(!isModalOpen)
    }

    /* 
        ## future feature
            # can add task with custom time
            # automatically remove task after elapsed time - auto-switch provided
            # notes that can be a pop-up or independent app
                => if independent, sends note to a database? main app fetches from database for syncing

    
    */

    return (
        <div className={cn(
            "relative flex flex-col flex-1 items-center justify-start sm:px-0 px-2.5 z-50",
            bgClasses[selectedMode]
        )}>
            <main className="flex  w-full max-w-3xl flex-col items-center relative">
                <Header handleModalOpen={handleModalOpen} />
                <Indicator
                    timeLeft={timeLeft}
                    duration={sessionDuration}
                    sessions={sessions}
                    interval={settings.interval}
                    selectedMode={selectedMode}
                />
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
                        onClick={timerStatus === 'running' ? pause : play}
                    >
                        <span className="text-2xl">
                            {timerStatus === 'running' ? 'PAUSE' : 'START'}
                        </span>
                        {timerStatus === 'running' ? <FaPause /> : <FaPlay />}
                    </Button>
                </Body>
                <Modal
                    modalProp={{ isModalOpen, handleModalOpen }}
                    settingsProp={{ settings, handleChangeSettings }}
                    selectedMode={selectedMode}
                />
                <Quotes mode={selectedMode} />
                <div className="w-full flex flex-col md:flex-row items-center md:items-stretch md:gap-2.5">
                    <Tasks />
                    <Notes />
                </div>
            </main>
        </div >
    );
}
