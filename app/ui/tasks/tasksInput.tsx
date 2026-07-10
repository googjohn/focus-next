import { TaskInputProps } from "@/app/lib/definitions"
import { cn } from "@/app/lib/utility"
import { PlusIcon } from "@heroicons/react/24/outline"

export const TaskInput = ({ inputRef, newTask, handleInputChange, handleAddTask }: TaskInputProps) => {

    return (
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
                        'w-full block h-12 px-2.5 bg-white/20 rounded-l-md outline-none focus:bg-black/10 focus:border-2 focus:border-white/20 text-[clamp(1.2rem,2.5vw,1.5rem)]'
                    )}
                />
                <button
                    onClick={handleAddTask}
                    title="Add task"
                    className="w-14 h-full rounded-r-md flex items-center justify-center bg-white/20 hover:bg-black/10 cursor-pointer"
                >
                    <PlusIcon className="size-8" />
                </button>
            </div>
        </div>
    )
}