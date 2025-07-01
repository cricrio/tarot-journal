import { addEntry, getEntries, type Node } from './db';
import { type Spread } from './spread';

type NoteInput = {
  content: string;
  spreadId: Spread['id'];
};

export type Note = Node & NoteInput;

export async function addNote(note: NoteInput): Promise<IDBValidKey> {
  return addEntry<NoteInput>('notes', note);
}

export async function getNotes(spreadId: Spread['id']): Promise<Note[]> {
  const notes = await getEntries<Note>('notes');
  return notes.filter((note) => note.spreadId === spreadId);
}
