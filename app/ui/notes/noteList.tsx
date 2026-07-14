import { Note, NoteHandles } from "@/app/lib/definitions"
import { ListContainer, ListHeading, NewNoteList } from "../list"

export const NotesList = ({
    notes,
    notesRef,
    handles,
}: {
    notes: Note[],
    handles: NoteHandles,
    notesRef: React.RefObject<Map<string, HTMLTextAreaElement>>,
}) => {
    const { handleClear, handleDelete } = handles;

    return (
        <ListContainer>
            {notes.length > 0 && (
                <ListHeading
                    title="Notes"
                    handleClear={handleClear}
                />
            )}
            {notes.length > 0 && notes.map((note) => (
                <NewNoteList
                    key={note.id}
                    list={note}
                    notesRef={notesRef}
                    handleDelete={handleDelete}
                />
            ))}

        </ListContainer>
    )
}