import { Task, TaskHandles } from "@/app/lib/definitions"
import { ListContainer, ListHeading, NewTaskList } from "../list";

export const TaskList = ({
    tasks,
    handles,
}: {
    tasks: Task[],
    handles: TaskHandles,
}) => {
    const { handleClear, handleDelete, handleCheckboxChange } = handles

    return (
        <ListContainer>
            {tasks.length > 0 && (
                <ListHeading
                    title="Tasks"
                    handleClear={handleClear}
                />
            )}
            {tasks.length > 0 && tasks.map((task) => (
                <NewTaskList
                    key={task.id}
                    list={task}
                    handles={{ handleClear, handleDelete, handleCheckboxChange }}
                />
            ))}
        </ListContainer>
    )
}