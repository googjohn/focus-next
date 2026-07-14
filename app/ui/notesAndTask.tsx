import { ChildrenProps } from "../lib/definitions"

export const NotesOrTaskContainer = ({
    children
}: ChildrenProps
) => {
    return (
        <div className="tasks-notes-container m-auto mb-2.5">
            <div className="flex gap-1.5 items-center h-full">
                {children}
            </div>
        </div>
    )
}