import React, { useState } from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [expandedRange, setExpandedRange] = useState(false);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = expandedRange ? 5 : 2;

    if (totalPages <= maxVisiblePages) {
      // Mostrar todas las páginas si son pocas
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Generar rango dinámico
      const startPage = Math.max(2, currentPage - (expandedRange ? 2 : 1));
      const endPage = Math.min(
        totalPages - 1,
        currentPage + (expandedRange ? 2 : 1)
      );

      // Siempre incluir la primera página
      pageNumbers.push(1);

      // Puntos suspensivos al inicio del rango
      if (startPage > 2) {
        pageNumbers.push("...");
      }

      // Agregar páginas del rango dinámico
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Puntos suspensivos al final del rango
      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }

      // Siempre incluir la última página
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const handleExpandRange = () => {
    setExpandedRange(true);
  };

  const handleCollapseRange = () => {
    setExpandedRange(false);
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col items-center space-y-2 mt-4">
      {/* Paginación */}
      <nav aria-label="Page navigation example">
        <ul className="flex items-center -space-x-px h-8 text-sm">
          {/* Botón Anterior */}
          <li>
            <button
              className={`flex items-center justify-center px-3 h-8 leading-tight ${currentPage <= 1
                  ? "text-gray-300 bg-gray-100 cursor-not-allowed"
                  : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                } rounded-s-lg`}
              disabled={currentPage <= 1}
              onClick={() => onPageChange(currentPage - 1)}
            >
              Anterior
            </button>
          </li>

          {/* Números de Página */}
          {pageNumbers.map((pageNumber, index) =>
            pageNumber === "..." ? (
              <li key={`dots-${index}`}>
                <button
                  onClick={
                    expandedRange ? handleCollapseRange : handleExpandRange
                  }
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                >
                  ...
                </button>
              </li>
            ) : (
              <li key={pageNumber}>
                <button
                  onClick={() => onPageChange(pageNumber)}
                  className={`flex items-center justify-center px-3 h-8 leading-tight ${currentPage === pageNumber
                      ? "z-10 text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                      : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                    }`}
                >
                  {pageNumber}
                </button>
              </li>
            )
          )}

          {/* Botón Siguiente */}
          <li>
            <button
              className={`flex items-center justify-center px-3 h-8 leading-tight ${currentPage >= totalPages
                  ? "text-gray-300 bg-gray-100 cursor-not-allowed"
                  : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                } rounded-e-lg`}
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

