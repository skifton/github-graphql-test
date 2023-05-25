import { SetState, create } from "zustand";
import { IRepository, IRepositoryDetails } from "../models/repository.model";

interface RepositoryState {
  searchQuery: string;
  currentPage: number;
  previousPage: number;
  repositories: IRepository[];
  repository: IRepositoryDetails | null;
  totalPages: number;
  loading: boolean;
  userRepositoriesStartCursor: string | null;
  userRepositoriesEndCursor: string | null;
  updateUserRepositoriesStartCursor: (startCursor: string) => void;
  updateUserRepositoriesEndCursor: (endCursor: string) => void;
  updateSearchQuery: (query: string) => void;
  updateCurrentPage: (page: number) => void;
  updatePreviousPage: (page: number) => void;
  updateRepositories: (repositories: IRepository[]) => void;
  updateRepository: (repository: IRepositoryDetails) => void;
  updateTotalPages: (totalPages: number) => void;
  setLoading: (loading: boolean) => void;
}

const useRepositoryStore = create<RepositoryState>(
  (set: SetState<RepositoryState>) => ({
    searchQuery: "",
    currentPage: 1,
    previousPage: 1,
    repositories: [],
    repository: null,
    totalPages: 0,
    loading: false,
    userRepositoriesStartCursor: null,
    userRepositoriesEndCursor: null,
    updateUserRepositoriesStartCursor: (startCursor) =>
      set({ userRepositoriesStartCursor: startCursor }),
    updateUserRepositoriesEndCursor: (endCursor) =>
      set({ userRepositoriesEndCursor: endCursor }),
    updateSearchQuery: (query) => set({ searchQuery: query }),
    updateCurrentPage: (page) => set({ currentPage: page }),
    updatePreviousPage: (page) => set({ previousPage: page }),
    updateRepositories: (repositories) => set({ repositories }),
    updateRepository: (repository) => set({ repository: repository }),
    updateTotalPages: (totalPages) => set({ totalPages }),
    setLoading: (loading) => set({ loading }),
  })
);

export default useRepositoryStore;
