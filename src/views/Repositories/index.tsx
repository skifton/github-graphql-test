import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import LayoutWrapper from "../../components/LayoutWrapper";
import Input from "../../components/Input";
import RepositoryList from "./RepositoryList";
import useRepositoryStore from "../../store/repositoryStore";
import useDebounce from "../../hooks/useDebounce";
import Pagination from "../../components/Pagination";
import {
  getCurrentUserRepositories,
  getGithubRepositories,
} from "../../services/github-api.services";
import LoadingSpinner from "../../components/LoadingSpinner";

const Repositories: React.FC = () => {
  const intl = useIntl();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    searchQuery,
    currentPage,
    previousPage,
    repositories,
    totalPages,
    loading,
    userRepositoriesStartCursor,
    userRepositoriesEndCursor,
    updateUserRepositoriesStartCursor,
    updateUserRepositoriesEndCursor,
    updateSearchQuery,
    updateCurrentPage,
    updatePreviousPage,
    updateRepositories,
    updateTotalPages,
    setLoading,
  } = useRepositoryStore();

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchQuery(e.target.value);
    const searchParams = new URLSearchParams();
    if (e.target.value === "") {
      searchParams.delete("q");
      navigate(`?${searchParams.toString()}`);
      updateCurrentPage(1);
    } else {
      searchParams.set("q", e.target.value);
      navigate(`?${searchParams.toString()}`);
      updateCurrentPage(1);
    }
  };

  const pageChangeHandler = (page: number) => {
    updatePreviousPage(currentPage);
    updateCurrentPage(page);
  };

  const selectRepositoryHandler = (owner: string, name: string) => {
    navigate(`${owner}/${name}`);
  };

  const debouncedSearchValue = useDebounce(searchQuery, 500);

  useEffect(() => {
    const fetchRepositories = async () => {
      setLoading(true);

      const after =
        debouncedSearchValue.trim() === ""
          ? currentPage > previousPage
            ? userRepositoriesEndCursor
            : null
          : (currentPage - 1) * 10 > 0
          ? btoa(`cursor:${(currentPage - 1) * 10}`)
          : btoa(`cursor:0`);

      console.log("after: ", after);

      const before =
        debouncedSearchValue.trim() === ""
          ? currentPage < previousPage
            ? userRepositoriesStartCursor
            : null
          : null;

      console.log("before: ", before);

      const variables = {
        queryString: debouncedSearchValue,
        first: 10,
        after,
        before,
      };

      try {
        const response =
          debouncedSearchValue.trim() === ""
            ? await getCurrentUserRepositories(variables)
            : await getGithubRepositories(variables);

        const { repositoryCount, pageInfo, totalCount, nodes } =
          debouncedSearchValue.trim() === ""
            ? response.data.data.viewer.repositories
            : response.data.data.search;

        updateUserRepositoriesStartCursor(pageInfo.startCursor);
        updateUserRepositoriesEndCursor(pageInfo.endCursor);
        updateTotalPages(repositoryCount || totalCount);
        updateRepositories(nodes);
      } catch (error) {
        console.error("Failed to fetch repositories.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, [
    debouncedSearchValue,
    currentPage,
    previousPage,
    updateCurrentPage,
    setLoading,
    updateRepositories,
    updateTotalPages,
  ]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("q") || "";
    const page = Number(searchParams.get("page")) || 1;
    updateCurrentPage(page);
    updateSearchQuery(query);
  }, [location.search, updateSearchQuery, updateCurrentPage]);

  return (
    <main>
      <LayoutWrapper className="space-y-10">
        <Input
          id={intl.formatMessage({ id: "INPUT.SEARCH" })}
          wrapperClassName="mt-10 flex justify-center sm:justify-end"
          inputWrapperClassName="w-full sm:w-fit"
          placeholder={intl.formatMessage({
            id: "INPUT.SEARCH.PLACEHOLDER",
          })}
          srLabel={intl.formatMessage({ id: "INPUT.SEARCH" })}
          RightIcon={MagnifyingGlassIcon}
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />

        {!loading ? (
          <RepositoryList
            repositories={repositories}
            selectRepository={selectRepositoryHandler}
          />
        ) : (
          <div className="flex items-center justify-center min-h-screen ">
            <LoadingSpinner />
          </div>
        )}

        <Pagination
          currentPage={Number(currentPage)}
          totalCount={totalPages}
          pageSize={10}
          onPageChange={pageChangeHandler}
        />
      </LayoutWrapper>
    </main>
  );
};

export default Repositories;
