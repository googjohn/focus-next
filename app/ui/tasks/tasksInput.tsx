"use client";

import { useState } from "react";

import { cn } from "@/app/lib/utility"
import { TaskNoteInputProps } from "@/app/lib/definitions"
import { PlusIcon } from "@heroicons/react/24/outline"
import { NotesOrTaskContainer } from "../notesAndTask";

export const TaskInput = ({
    ref,
    newInput,
    handleAdd,
    handleChange,
}: TaskNoteInputProps<HTMLInputElement>) => {
    const [isFocused, setIsFocused] = useState(false)
    const handleFocus = (isFocused: boolean) => setIsFocused(isFocused)
    return (
        <NotesOrTaskContainer>
            <input
                ref={ref}
                id="task-input"
                type="text"
                placeholder="Add new task..."
                value={newInput}
                onChange={handleChange}
                onFocus={() => handleFocus(true)}
                onBlur={() => handleFocus(false)}
                className={cn(
                    'w-full block h-10 px-2.5 bg-black/5 rounded-l-md outline-none focus:bg-black/10',
                )}
            />
            <button
                onClick={handleAdd}
                title="Add task"
                className={cn(
                    "w-full h-10 rounded-r-md flex items-center justify-center bg-white/20 hover:bg-black/10 cursor-pointer transition-[width] duration-150 ease-linear",
                    isFocused && 'w-12'
                )}
            >
                <PlusIcon className="size-6" />
            </button>
        </NotesOrTaskContainer>
    )
}