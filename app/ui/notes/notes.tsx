"use client";

import { useEffect, useRef, useState } from "react";

import { cn, updateTextareaHeight } from "@/app/lib/utility";
import { NoteInput } from "./notesInput";
import { NotesList } from "./noteList";
import { ChangeEvent, Note } from "@/app/lib/definitions";
import { useIdb } from "@/app/lib/indexedDB";

export const Notes = () => {
    const noteIdRef = useRef('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    // create a ref for multiple notes utilizing Map
    const notesRef = useRef(new Map<string, HTMLTextAreaElement>());

    const [notes, setNotes] = useState<Note[]>([]);
    const [newNote, setNewNote] = useState('')
    const { openDB, getRecords } = useIdb()
    // initialize notes with saved notes from indexedDB
    useEffect(() => {
        const init = async () => {
            const db = await openDB("focus-next", 1, "notes")
            const records = await getRecords(db, null, "notes")
            if (records.length < 0) return;

            records.forEach(record => {
                const noteCopy = {
                    id: record.value.id,
                    value: record.value.value,
                }
                setNotes(prev => [...prev, noteCopy])
            })
        }
        init()
    }, [])

    useEffect(() => {
        if (!noteIdRef.current) return;
        const textarea = notesRef.current.get(noteIdRef.current)
        if (textarea) {
            textarea?.focus()
            updateTextareaHeight(textarea)
        }
        if (textareaRef.current) {
            updateTextareaHeight(textareaRef.current)
        }
        noteIdRef.current = '';
    }, [notes])

    const handleAddNote = () => {
        if (!newNote.trim()) return;

        noteIdRef.current = crypto.randomUUID();

        const note = {
            id: noteIdRef.current,
            value: newNote,
        }

        setNotes(prev => [...prev, note]);
        setNewNote('');

        /* alternative to using useEffect */
        requestAnimationFrame(() => {
            if (textareaRef.current) {
                updateTextareaHeight(textareaRef.current)
            }
        })
    }

    const handleTextareaChange = (e: ChangeEvent) => {
        const { value } = e.currentTarget
        setNewNote(value)
        if (e.currentTarget instanceof HTMLTextAreaElement) {
            updateTextareaHeight(e.currentTarget)
        }
    }

    const handleDelete = (id: string) => {
        setNotes(prev => prev.filter(note => note.id !== id))
    }

    const handleClear = () => {
        const yes = confirm("Are you sure to clear all? This deletes all notes from database.")
        if (!yes) return;

        setNotes([])
        const deleteFromdb = async () => {
            const db = await openDB("focus-next", 1, "notes")
            const transaction = db.transaction("notes", "readwrite");
            const store = transaction.objectStore("notes");
            store.clear()
        }
        deleteFromdb()
    }

    return (
        <div className={cn(
            "notes-container max-w-lg w-full bg-white/20 min-h-full shadow-2xl mt-2.5 rounded-xl p-5 pt-2.5 text-white",
        )}>
            <div className="h-10 flex items-center justify-center relative w-full">
                <h2 className="text-h2">Keep Notes</h2>
            </div>
            <div className="mt-2.5 w-full">
                <NoteInput
                    ref={textareaRef}
                    newInput={newNote}
                    handleAdd={handleAddNote}
                    handleChange={handleTextareaChange}
                />
                <NotesList
                    notes={notes}
                    notesRef={notesRef}
                    handles={{ handleClear, handleDelete }}
                />
            </div>
        </div>
    )
}