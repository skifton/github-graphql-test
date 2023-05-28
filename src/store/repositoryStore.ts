import { SetState, create } from "zustand";
import { IRepository, IRepositoryDetails } from "../models/repository.model";

interface RepositoryState {
  searchQuery: string;
  currentPage: number;
  hasNextPage: boolean;
  repositories: IRepository[];
  repository: IRepositoryDetails | null;
  totalPages: number;
  loading: boolean;
  userRepositoriesEndCursor: string | null;
  updateUserRepositoriesEndCursor: (endCursor: string) => void;
  updateUserRepositories: (newRepositories: IRepository[]) => void;
  updateSearchQuery: (query: string) => void;
  updateCurrentPage: (page: number) => void;
  updateHasNextPage: (nextPage: boolean) => void;
  updateRepositories: (repositories: IRepository[]) => void;
  updateRepository: (repository: IRepositoryDetails) => void;
  updateTotalPages: (totalPages: number) => void;
  setLoading: (loading: boolean) => void;
}

const useRepositoryStore = create<RepositoryState>(
  (set: SetState<RepositoryState>) => ({
    searchQuery: "",
    currentPage: 1,
    hasNextPage: false,
    repositories: [],
    repository: null,
    totalPages: 0,
    loading: false,
    userRepositoriesEndCursor: null,
    updateUserRepositoriesEndCursor: (endCursor) =>
      set({ userRepositoriesEndCursor: endCursor }),
    updateUserRepositories: (newRepositories: any) =>
      set((prev: any) => {
        return { repositories: [...prev, newRepositories] };
      }),
    updateSearchQuery: (query) => set({ searchQuery: query }),
    updateCurrentPage: (page) => set({ currentPage: page }),
    updateHasNextPage: (nextPage) => set({ hasNextPage: nextPage }),
    updateRepositories: (repositories) => set({ repositories }),
    updateRepository: (repository) => set({ repository: repository }),
    updateTotalPages: (totalPages) => set({ totalPages }),
    setLoading: (loading) => set({ loading }),
  })
);

export default useRepositoryStore;
