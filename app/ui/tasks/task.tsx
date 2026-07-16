"use client";

import { useRef, useState } from "react";

import { TaskInput } from "./tasksInput";
import { TaskList } from "./tasksList";
import { ChangeEvent, Task } from "@/app/lib/definitions";

export const Tasks = () => {
    const taskIdRef = useRef(crypto.randomUUID())
    const inputRef = useRef<HTMLInputElement>(null)
    const [tasks, setTasks] = useState<Task[]>([])
    const [newTask, setNewTask] = useState('')

    const handleCheckboxChange = (id: string) => {
        setTasks(prev => {
            const newTasks = [...prev]
            const existingIndex = newTasks.findIndex(task => task.id === id)

            if (existingIndex !== -1) {
                newTasks[existingIndex] = {
                    ...newTasks[existingIndex],
                    checked: !newTasks[existingIndex].checked
                }
                return newTasks
            }

            return prev
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

        taskIdRef.current = crypto.randomUUID();

        setTasks(prev => [...prev, task]);
        setNewTask('')

        inputRef.current?.focus()
    }

    const handleClear = () => {
        const allDone = tasks.every(task => task.checked)

        if (allDone) {
            const yes = confirm("Are you sure to clear all?")
            if (!yes) return;
        } else {
            const yes = confirm("There are still some tasks to finish. Are you sure to clear all?")
            if (!yes) return;
        }

        setTasks([])
    }

    const handleDelete = (id: string) => {
        setTasks(prev => prev.filter(task => task.id !== id))
    }

    return (
        <div className="max-w-lg bg-white/20 rounded-xl w-full min-h-full mt-2.5 p-5 pt-2.5 text-white shadow-2xl">
            <div className="h-10 flex items-center justify-center relative w-full">
                <h2 className="text-h2">To Do</h2>
            </div>
            <div className="w-full mt-2.5">
                <TaskInput
                    ref={inputRef}
                    newInput={newTask}
                    handleAdd={handleAddTask}
                    handleChange={handleInputChange}
                />
                <TaskList
                    tasks={tasks}
                    handles={{
                        handleClear,
                        handleDelete,
                        handleCheckboxChange,
                    }}
                />
            </div>
        </div>
    )
}

/* 
    can add synchronisation with timer to automatically remove task after timer ends or ready for the next timer
    if enabled needs a button or switch for switching mode to auto
*/