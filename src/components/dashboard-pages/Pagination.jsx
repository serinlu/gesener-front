import React, { useState, useMemo } from "react";
import clsx from "clsx";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [expandedRange, setExpandedRange] = useState(false);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = expandedRange ? 5 : 2;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const startPage = Math.max(2, currentPage - (expandedRange ? 2 : 1));
      const endPage = Math.min(
        totalPages - 1,
        currentPage + (expandedRange ? 2 : 1)
      );

      pageNumbers.push(1);

      if (startPage > 2) {
        pageNumbers.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }

      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = useMemo(() => getPageNumbers(), [currentPage, totalPages, expandedRange]);

  const buttonClass = (isActive) =>
    clsx(
      "flex items-center justify-center px-3 h-8 leading-tight",
      isActive
        ? "z-10 text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
        : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
    );

  return (
    <div className="flex flex-col items-center space-y-2 mt-4">
      <nav aria-label="Page navigation">
        <ul className="flex items-center -space-x-px h-8 text-sm">
          <li>
            <button
              className={clsx(
                "flex items-center justify-center px-3 h-8 leading-tight rounded-s-lg",
                currentPage <= 1
                  ? "text-gray-300 bg-gray-100 cursor-not-allowed"
                  : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              )}
              disabled={currentPage <= 1}
              onClick={() => onPageChange(currentPage - 1)}
            >
              Anterior
            </button>
          </li>
          {pageNumbers.map((pageNumber, index) =>
            pageNumber === "..." ? (
              <li key={`dots-${index}`} aria-hidden="true">
                <span className="px-3 h-8 text-gray-500">...</span>
              </li>
            ) : (
              <li key={pageNumber}>
                <button
                  onClick={() => onPageChange(pageNumber)}
                  className={buttonClass(currentPage === pageNumber)}
                  aria-current={currentPage === pageNumber ? "page" : undefined}
                >
                  {pageNumber}
                </button>
              </li>
            )
          )}
          <li>
            <button
              className={clsx(
                "flex items-center justify-center px-3 h-8 leading-tight rounded-e-lg",
                currentPage >= totalPages
                  ? "text-gray-300 bg-gray-100 cursor-not-allowed"
                  : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              )}
              disabled={currentPage >= totalPages}
              onClick={() => onPageChange(currentPage + 1)}
            >
              Siguiente
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
