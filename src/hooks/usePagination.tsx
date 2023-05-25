import { useMemo } from "react";
import { getRangeOfPages } from "../utils/getRangeOfPages";

interface IProps {
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  currentPage: number;
}

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}: IProps) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = totalCount > 1000 ? 100 : Math.ceil(totalCount / pageSize);
    const totalPageNumbers = siblingCount + 10;

    if (totalPageNumbers >= totalPageCount) {
      return getRangeOfPages(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - 3, 1);
    const rightSiblingIndex = Math.min(
      currentPage + 3,
      totalPageCount
    );
    const shouldShowLeftDots = leftSiblingIndex > 4;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 4;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 8 + 2 * siblingCount;
      const leftRange = getRangeOfPages(1, leftItemCount);

      return [...leftRange, "...", totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 8 + 2 * siblingCount;
      const rightRange = getRangeOfPages(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, "...", ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = getRangeOfPages(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};
