"use client";

import { useRef, useState } from "react";

import { TaskInput } from "./tasksInput";
import { TaskList } from "./tasksList";
import { ChangeEvent, Task } from "@/app/lib/definitions";

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

    const handleClear = () => {
        const allDone = tasks.every(task => task.checked)
        if (allDone) {
            const yes = prompt("Are you sure to clear all?")
            if (!yes) return;

            setTasks([])
        } else {
            const yes = prompt("There are still some tasks to finish. Are you sure to clear all?")
            if (!yes) return;
            setTasks([])
        }
    }

    const handleDelete = (id: number) => {
        const newTasks = tasks.filter(task => task.id !== id)
        setTasks(newTasks)
    }

    return (
        <div className="max-w-lg bg-white/40 rounded-xl w-full min-h-full mt-5 p-5 text-white">
            <div className="h-10 flex items-center justify-center relative w-full">
                <h2 className="text-[clamp(1.3rem,2.5vw,1.5rem)]">To Do</h2>
            </div>
            <div className="container">
                <TaskInput
                    inputRef={inputRef}
                    newTask={newTask}
                    handleAddTask={handleAddTask}
                    handleInputChange={handleInputChange}
                />
                <TaskList
                    tasks={tasks}
                    handles={{
                        handleClear,
                        handleDelete,
                        handleCheckboxChange
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