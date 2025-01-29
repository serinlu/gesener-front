import React, { useState, useMemo } from "react";
import clsx from "clsx";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [expandedRange, setExpandedRange] = useState(false);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = expandedRange ? 5 : 1; // Reduce la cantidad visible en pantallas pequeñas

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
      "flex items-center justify-center px-2 h-6 text-xs sm:px-3 sm:h-8 sm:text-sm leading-tight", // Reducido
      isActive
        ? "z-10 text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
        : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
    );

  return (
    <div className="flex flex-col items-center space-y-2 mt-2">
      <nav aria-label="Page navigation">
        <ul className="flex items-center -space-x-px text-xs sm:text-sm"> {/* Reduce fuente */}
          {/* Botón "Anterior" (flecha compacta en pantallas pequeñas) */}
          <li>
            <button
              className={clsx(
                "flex items-center justify-center px-2 h-6 sm:px-3 sm:h-8 leading-tight rounded-s-lg",
                currentPage <= 1
                  ? "text-gray-300 bg-gray-100 cursor-not-allowed"
                  : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              )}
              disabled={currentPage <= 1}
              onClick={() => onPageChange(currentPage - 1)}
            >
              <span className="hidden sm:inline">Anterior</span>
              <span className="sm:hidden">←</span>
            </button>
          </li>
          {pageNumbers.map((pageNumber, index) =>
            pageNumber === "..." ? (
              <li key={`dots-${index}`} aria-hidden="true">
                <span className="px-2 h-6 sm:px-3 sm:h-8 text-gray-500">...</span>
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
          {/* Botón "Siguiente" (flecha compacta en pantallas pequeñas) */}
          <li>
            <button
              className={clsx(
                "flex items-center justify-center px-2 h-6 sm:px-3 sm:h-8 leading-tight rounded-e-lg",
                currentPage >= totalPages
                  ? "text-gray-300 bg-gray-100 cursor-not-allowed"
                  : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              )}
              disabled={currentPage >= totalPages}
              onClick={() => onPageChange(currentPage + 1)}
            >
              <span className="hidden sm:inline">Siguiente</span>
              <span className="sm:hidden">→</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
