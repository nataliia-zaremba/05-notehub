import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import { fetchNotes } from "../../services/noteService";
import css from "./App.module.css";
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const perPage = 12;

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", currentPage, debouncedSearchTerm],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        perPage,
        search: debouncedSearchTerm,
      }),
  });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNoteCreated = () => {
    setIsModalOpen(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading notes</div>;

  const notes = data?.data || [];
  const totalPages = data?.pagination.totalPages || 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />

        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}

        <button onClick={handleOpenModal} className={css.button}>
          Create note +
        </button>
      </header>

      {notes.length > 0 && <NoteList notes={notes} />}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <NoteForm onSuccess={handleNoteCreated} onCancel={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default App;
