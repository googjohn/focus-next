"use client";

import { useState } from "react"

import { cn } from "@/app/lib/utility"
import { TaskNoteInputProps } from "@/app/lib/definitions"
import { PlusIcon } from "@heroicons/react/24/outline"
import { NotesOrTaskContainer } from "../notesAndTask";

export const NoteInput = ({
    ref,
    newInput,
    handleAdd,
    handleChange,
}: TaskNoteInputProps<HTMLTextAreaElement>) => {
    const [isFocused, setIsFocused] = useState(false)

    return (
        <NotesOrTaskContainer>
            <textarea
                ref={ref}
                id="notes-input"
                rows={1}
                value={newInput}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Add notes..."
                className={cn(
                    "w-full  px-2.5 py-2 outline-none rounded-l-md resize-none focus:bg-black/10 bg-black/5",
                )}
            >
            </textarea>
            <button
                onClick={handleAdd}
                title="Add note"
                className={cn(
                    "w-full h-10 rounded-r-md flex self-start items-center justify-center bg-white/20 hover:bg-black/10 cursor-pointer transition-[width] duration-150 ease-linear",
                    isFocused && 'w-12',
                )}
            >
                <PlusIcon className="size-6" />
            </button>
        </NotesOrTaskContainer>
    )
}