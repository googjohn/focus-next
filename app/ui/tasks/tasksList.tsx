import { cn } from "@/app/lib/utility";
import { Task, TaskHandles } from "@/app/lib/definitions"
import { CheckIcon, TrashIcon } from "@heroicons/react/24/outline"
import { FaSquare } from "react-icons/fa6"

export const TaskList = ({ tasks, handles }: { tasks: Task[], handles: TaskHandles }) => {
    const { handleClear, handleDelete, handleCheckboxChange } = handles
    return (
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
                        "bg-white/20 rounded-l-md  w-full h-full flex items-center pl-2.5 relative",
                        task.checked ? "line-through bg-black/10" : "",
                    )}>
                        {task.value}
                        <button
                            onClick={() => handleDelete(task.id)}
                            className={cn(
                                `w-12 h-12 flex justify-center items-center  rounded-full hover:bg-white/20 cursor-pointer absolute right-0`,
                                !task.checked ? "hidden" : '',
                            )}
                            title="Remove task"
                        >
                            <TrashIcon className="size-8" />
                        </button>
                    </span>
                    <label
                        htmlFor={`${task.id}`}
                        title="Mark done"
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
    )
}