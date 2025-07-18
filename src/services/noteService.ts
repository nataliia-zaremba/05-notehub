import axios, { type AxiosResponse } from "axios";
import { type Note } from "../types/note";

const API_BASE_URL = "https://notehub-public.goit.study/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export interface FetchNotesResponse {
  data: Note[];
  pagination: {
    page: number;
    perPage: number;
    totalPages: number;
    totalCount: number;
  };
}

export interface CreateNoteRequest {
  title: string;
  content: string;
  tag: string;
}

export interface CreateNoteResponse {
  data: Note;
}

export interface DeleteNoteResponse {
  data: Note;
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export const fetchNotes = async (
  params?: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const response: AxiosResponse<FetchNotesResponse> = await api.get("/notes", {
    params: {
      page: params?.page || 1,
      perPage: params?.perPage || 12,
      search: params?.search || "",
    },
  });

  return response.data;
};

export const createNote = async (
  noteData: CreateNoteRequest
): Promise<CreateNoteResponse> => {
  const response: AxiosResponse<CreateNoteResponse> = await api.post(
    "/notes",
    noteData
  );
  return response.data;
};

export const deleteNote = async (id: string): Promise<DeleteNoteResponse> => {
  const response: AxiosResponse<DeleteNoteResponse> = await api.delete(
    `/notes/${id}`
  );
  return response.data;
};
