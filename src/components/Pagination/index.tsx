import React, { memo, useMemo } from "react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/20/solid";
import { usePagination } from "../../hooks/usePagination";
import { FormattedMessage, useIntl } from "react-intl";

interface IProps {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
}

const Pagination: React.FC<IProps> = memo(
  ({ onPageChange, totalCount, siblingCount, currentPage, pageSize }) => {
    const navigate = useNavigate();
    const intl = useIntl();
    const paginationRange =
      usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
      }) || [];

    const isFirstPage = useMemo(
      () => currentPage === paginationRange[0],
      [currentPage, paginationRange]
    );

    const isLastPage = useMemo(
      () => currentPage === paginationRange.at(-1),
      [currentPage, paginationRange]
    );

    const nextPageHandler = () => {
      const nextPage = currentPage + 1;
      onPageChange(nextPage);
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set("page", nextPage.toString());
      navigate(`?${urlParams.toString()}`);
    };

    const previousPageHandler = () => {
      const previousPage = currentPage - 1;
      onPageChange(previousPage);
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set("page", previousPage.toString());
      navigate(`?${urlParams.toString()}`);
    };

    const selectPage = (page: number) => {
      onPageChange(page);
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set("page", page.toString());
      navigate(`?${urlParams.toString()}`);
    };

    if (
      currentPage === 0 ||
      paginationRange == null ||
      paginationRange.length < 2
    ) {
      return null;
    }

    return (
      <nav
        className="flex w-full my-10 pb-8 justify-between border-t border-gray-200 px-4 sm:px-0"
        aria-label={intl.formatMessage({ id: "PAGINATION" })}
      >
        <div className="flex m-0 w-0 flex-1">
          <button
            type="button"
            onClick={previousPageHandler}
            disabled={isFirstPage}
            className="inline-flex border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            aria-label={intl.formatMessage({ id: "PREVIOUS_PAGE" })}
          >
            <ArrowLongLeftIcon
              className="mr-3 h-5 w-5 text-gray-400"
              aria-hidden="true"
              aria-label={intl.formatMessage({ id: "ARROW.LEFT" })}
            />
            <FormattedMessage id="PREVIOUS" />
          </button>
        </div>

        <ul className="hidden m-0 md:-mt-px md:flex" role="list">
          {paginationRange?.map((pageNumber, index) => {
            if (pageNumber === "...") {
              return (
                <li key={`dots${index}`}>
                  <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
                    &#8230;
                  </span>
                </li>
              );
            }

            return (
              <li
                key={pageNumber}
                className={clsx(
                  "inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 hover:cursor-pointer",
                  {
                    "inline-flex items-center border-t-2 border-indigo-500 px-4 pt-4 text-sm font-medium text-indigo-600":
                      pageNumber === currentPage,
                  }
                )}
                onClick={() => selectPage(pageNumber as number)}
                role="list item"
                aria-label={`Page ${pageNumber}`}
                tabIndex={0}
              >
                {pageNumber}
              </li>
            );
          })}
        </ul>

        <div className="flex w-0 flex-1 justify-end">
          <button
            type="button"
            onClick={nextPageHandler}
            disabled={isLastPage}
            className="inline-flex border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            aria-label={intl.formatMessage({ id: "NEXT_PAGE" })}
          >
            <FormattedMessage id="NEXT" />
            <ArrowLongRightIcon
              className="ml-3 h-5 w-5 text-gray-400"
              aria-hidden="true"
              aria-label={intl.formatMessage({ id: "ARROW.RIGHT" })}
            />
          </button>
        </div>
      </nav>
    );
  }
);

export default Pagination;
