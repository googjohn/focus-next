"use client";

import { useEffect, useState } from "react"

import { IoClose } from "react-icons/io5"
import { FaSquare } from "react-icons/fa6"
import { cn, updateTextareaHeight } from "../lib/utility"
import { CheckIcon, TrashIcon } from "@heroicons/react/24/outline"
import { ChangeEvent, Note, Task, TaskHandles } from "../lib/definitions"
import { useIdb } from "../lib/indexedDB"

type HeadingList = {
    title: string,
    handleClear: () => void;
}

type TaskProps = {
    list: Task,
    handles: TaskHandles,
}

type NoteProps = {
    list: Note;
    handleDelete: (id: string) => void;
    notesRef?: React.RefObject<Map<string, HTMLTextAreaElement>>;
}


export const ListContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <ul className="list-container m-auto flex flex-col gap-1.5">
            {children}
        </ul>
    )
}

export const ListHeading = ({ title, handleClear }: HeadingList) => {
    return (
        <div className="flex justify-between items-center">
            <span className="text-h2">{title}</span>
            <button
                onClick={handleClear}
                className="w-10 h-10 flex justify-center items-center bg-white/20 rounded-full hover:bg-black/10 cursor-pointer"
                title={`Clear ${title ? title : 'note'} list`}
            >
                <TrashIcon className="size-6" />
            </button>
        </div>
    )
}

export const NewNoteList = ({ notesRef, list, handleDelete }: NoteProps) => {
    const [localState, setLocalState] = useState<Note>({
        value: list.value,
        id: list.id,
    })

    const { openDB, addRecord } = useIdb();

    useEffect(() => {
        const rundb = async (state: Note) => {
            const db = await openDB("focus-next", 1, "notes");
            addRecord(db, 'notes', state)
        }
        const timeout = setTimeout(() => {
            rundb(localState)
        }, 1500)

        return () => clearTimeout(timeout)
    }, [localState])

    const handleChangeUpdate = (e: ChangeEvent) => {
        const { value } = e.currentTarget;
        setLocalState(prev => ({
            ...prev,
            value
        }))
        updateTextareaHeight(e.currentTarget as HTMLTextAreaElement)
    }

    return (
        <li className="h-full rounded-md  overflow-hidden">

            <span className="w-full h-7 bg-black/5 flex items-center justify-end pr-1">
                <button
                    className="cursor-pointer hover:bg-white/20 rounded-full p-1"
                    onClick={() => handleDelete(localState.id)}
                >
                    <IoClose className="size-5 text-white/80" />
                </button>
            </span>
            <textarea
                ref={(el) => {
                    if (el) {
                        notesRef?.current.set(String(localState.id), el)
                    } else {
                        notesRef?.current.delete(String(localState.id))
                    }
                }}
                value={localState.value}
                onChange={handleChangeUpdate}
                className={cn(
                    "w-full h-full block px-2.5 py-2 outline-none rounded-b-md resize-none  bg-white/10 shadow-2xl",
                )}
            >
            </textarea>
        </li>
    )
}

export const NewTaskList = ({ list, handles }: TaskProps) => {
    const { handleDelete, handleCheckboxChange } = handles
    return (
        <li className="h-full w-full  flex items-center gap-1.5  overflow-hidden">
            <span className={cn(
                "bg-white/10 rounded-l-md  w-full min-h-10 h-full flex items-center px-2.5 py-2 relative",
                list.checked ? "line-through bg-black/10" : "",
            )}>
                {list.value}
                <button
                    onClick={() => handleDelete(list.id)}
                    className={cn(
                        `w-10 h-10 justify-center items-center rounded-full hover:bg-white/20 cursor-pointer absolute right-0 top-0`,
                        !list.checked ? "hidden" : 'flex',
                    )}
                    title="Remove task"
                >
                    <TrashIcon className="size-6" />
                </button>
            </span>

            <label
                htmlFor={`${list.id}`}
                title="Mark done"
                className="h-10 w-12 self-start select-none rounded-r-md  cursor-pointer"
            >
                <input
                    id={`${list.id}`}
                    checked={list.checked}
                    onChange={() => handleCheckboxChange(list.id)}
                    type="checkbox"
                    className="hidden"
                />
                <span className={cn(
                    "w-full min-h-10 h-full flex items-center justify-center rounded-r-md",
                    list.checked ? "bg-black/10" : "bg-white/10",
                )}>
                    {list.checked ? (<CheckIcon className="size-8 text-white/80" />) : (<FaSquare className="size-8 text-white/50" />)}
                </span>
            </label>
        </li >
    )
}
