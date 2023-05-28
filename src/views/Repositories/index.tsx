import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
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
    hasNextPage,
    repositories,
    totalPages,
    loading,
    userRepositoriesEndCursor,
    updateUserRepositoriesEndCursor,
    updateSearchQuery,
    updateCurrentPage,
    updateHasNextPage,
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
    updateCurrentPage(page);
  };

  const selectRepositoryHandler = (owner: string, name: string) => {
    navigate(`${owner}/${name}`);
  };

  const debouncedSearchValue = useDebounce(searchQuery, 500);

  const loadMoreUserRepositories = async () => {
    setLoading(true);

    const variables = {
      queryString: debouncedSearchValue,
      first: 10,
      after: userRepositoriesEndCursor,
    };

    try {
      const response =
        debouncedSearchValue.trim() === ""
          ? await getCurrentUserRepositories(variables)
          : await getGithubRepositories(variables);

      const { pageInfo, nodes } = response.data.data.viewer.repositories;

      updateHasNextPage(pageInfo.hasNextPage);
      updateUserRepositoriesEndCursor(pageInfo.endCursor);

      updateRepositories([...repositories, ...nodes]);
    } catch (error) {
      console.error("Failed to fetch repositories.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchRepositories = async () => {
      setLoading(true);

      const after =
        debouncedSearchValue.trim() === ""
          ? userRepositoriesEndCursor
          : (currentPage - 1) * 10 > 0
          ? btoa(`cursor:${(currentPage - 1) * 10}`)
          : btoa(`cursor:0`);

      const variables = {
        queryString: debouncedSearchValue,
        first: 10,
        after,
      };

      try {
        const response =
          debouncedSearchValue.trim() === ""
            ? await getCurrentUserRepositories(variables)
            : await getGithubRepositories(variables);

        const { repositoryCount, totalCount, pageInfo, nodes } =
          debouncedSearchValue.trim() === ""
            ? response.data.data.viewer.repositories
            : response.data.data.search;

        updateHasNextPage(pageInfo.hasNextPage);
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
    updateCurrentPage,
    setLoading,
    updateRepositories,
    updateTotalPages,
    updateHasNextPage,
    updateUserRepositoriesEndCursor,
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
      <LayoutWrapper>
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
          <div className="flex items-center justify-center min-h-screen">
            <LoadingSpinner />
          </div>
        )}

        {debouncedSearchValue.trim() !== "" ? (
          <Pagination
            currentPage={Number(currentPage)}
            totalCount={totalPages}
            pageSize={10}
            onPageChange={pageChangeHandler}
          />
        ) : hasNextPage ? (
          <button
            onClick={loadMoreUserRepositories}
            className="text-gray-500 hover:cursor-pointer w-full flex justify-center mb-10"
          >
            <FormattedMessage id="SHOW_MORE" />
          </button>
        ) : null}
      </LayoutWrapper>
    </main>
  );
};

export default Repositories;
