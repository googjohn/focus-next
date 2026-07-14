"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/app/lib/utility";
import { NoteInput } from "./notesInput";
import { NotesList } from "./noteList";
import { ChangeEvent, Note } from "@/app/lib/definitions";

export const Notes = () => {
    const noteIdRef = useRef('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    // create a ref for multiple notes utilizing Map
    const notesRef = useRef(new Map<string, HTMLTextAreaElement>());

    const [notes, setNotes] = useState<Note[]>([]);
    const [newNote, setNewNote] = useState('')

    useEffect(() => {
        if (!noteIdRef.current) return;
        console.log(notesRef.current)
        const textarea = notesRef.current.get(noteIdRef.current)
        if (textarea) {
            textarea?.focus()
            textarea.style.height = "auto"
            textarea.style.height = `${textarea.scrollHeight}px`
        }
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
        noteIdRef.current = '';
    }, [notes])

    const handleAddNote = () => {
        if (!newNote.trim()) return;

        noteIdRef.current = crypto.randomUUID();

        const note = {
            id: noteIdRef.current,
            value: newNote,
            height: notesRef.current.get(noteIdRef.current)?.scrollHeight ?? 0,
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

    const updateTextareaHeight = (textarea: HTMLTextAreaElement) => {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
    }

    const handleTextareaChange = (e: ChangeEvent) => {
        const { value } = e.currentTarget
        setNewNote(value)
        updateTextareaHeight(e.currentTarget as HTMLTextAreaElement)
    }

    const handleDelete = (id: string) => {
        setNotes(prev => prev.filter(note => note.id !== id))
    }

    const handleClear = () => {
        const yes = prompt("Are you sure to clear all?")
        if (!yes) return;

        setNotes([])
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