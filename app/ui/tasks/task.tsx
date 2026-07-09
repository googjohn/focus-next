"use client";

import { useRef, useState } from "react";

import { cn } from "@/app/lib/utility"
import { ChangeEvent, Task } from "@/app/lib/definitions";
import { CheckIcon, PlusIcon, TrashIcon, } from "@heroicons/react/24/outline"
import { FaSquare } from "react-icons/fa6";

export const Tasks = () => {
    const taskIdRef = useRef(0)
    const inputRef = useRef<HTMLInputElement>(null)
    const [tasks, setTasks] = useState<Task[]>([])
    const [newTask, setNewTask] = useState('')

    const handleCheckboxChange = (index: number) => {

        setTasks(prev => {
            const newTasks = [...prev]
            newTasks[index] = {
                ...newTasks[index],
                checked: !newTasks[index].checked
            }
            return newTasks
        })

    }

    const handleInputChange = (e: ChangeEvent) => {
        setNewTask(e.currentTarget.value)
    }

    const handleAddTask = () => {
        if (!newTask.trim()) return;

        const task = {
            checked: false,
            value: newTask,
            id: taskIdRef.current,
        }

        taskIdRef.current++;

        setTasks(prev => [...prev, task]);
        setNewTask('')

        inputRef.current?.focus()
    }

    const handleClear = () => setTasks([])

    return (
        <div className="max-w-lg bg-white/40 rounded-xl w-full min-h-full mt-5 p-5 text-white">
            <div className="h-10 flex items-center justify-center relative w-full">
                <h2 className="text-[clamp(1.3rem,2.5vw,1.5rem)]">To Do List</h2>
            </div>
            <div className="container">
                <div className="input-task-container max-w-md m-auto mb-2.5">
                    <div className="flex gap-1.5 items-center h-12 relative">
                        <input
                            ref={inputRef}
                            id="task-input"
                            type="text"
                            placeholder="Add new task..."
                            value={newTask}
                            onChange={handleInputChange}
                            className={cn(
                                'w-full block h-12 px-2.5 bg-white/20 rounded-l-md outline-none focus:border-2 focus:border-white/20 text-[clamp(1.2rem,2.5vw,1.5rem)]'
                            )}
                        />
                        <button
                            onClick={handleAddTask}
                            className="w-14 h-full rounded-r-md flex items-center justify-center bg-white/20 hover:bg-black/10 cursor-pointer"
                        >
                            <PlusIcon className="size-8" />
                        </button>
                    </div>
                </div>
                <ul className="task-container max-w-md m-auto flex flex-col gap-1.5">
                    {tasks.length > 0 && (
                        <div className="flex justify-between items-center">
                            <span className="text-[clamp(1.2rem,2.5vw,1.5rem)]">Tasks</span>
                            <button
                                onClick={handleClear}
                                className="w-12 h-12 flex justify-center items-center bg-white/20 rounded-full hover:bg-black/10 cursor-pointer"
                                title="Clear task list"
                            >
                                <TrashIcon className="size-8" />
                            </button>
                        </div>
                    )}
                    {tasks.length > 0 && tasks.map((task, index) => (
                        <li key={task.id} className="h-12  flex items-center gap-1.5 rounded-sm overflow-hidden">
                            <span className={cn(
                                "bg-white/20 rounded-l-md  w-full h-full flex items-center pl-2.5",
                                task.checked ? "line-through decoration-black" : "",
                            )}>
                                {task.value}
                            </span>

                            <label
                                htmlFor={`${task.id}`}
                                className="h-full w-14 select-none rounded-r-md cursor-pointer"
                            >

                                <input
                                    id={`${task.id}`}
                                    checked={task.checked}
                                    onChange={() => handleCheckboxChange(index)}
                                    type="checkbox"
                                    className="hidden"
                                />
                                <span className={cn(
                                    "w-full h-full bg-white/20 flex items-center justify-center rounded-r-md",
                                    task.checked ? "bg-black/10" : "",
                                )}>
                                    {task.checked ? (<CheckIcon />) : (<FaSquare className="size-10 text-white/50" />)}
                                </span>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
