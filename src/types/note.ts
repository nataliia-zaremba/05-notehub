export type NoteTagType = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface CreateNoteRequest {
  title: string;
  content: string;
  tag: NoteTagType;
}

export interface Note {
  id: number;
  title: string;
  content: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
}

export interface NoteTag {
  id: number;
  name: string;
}
