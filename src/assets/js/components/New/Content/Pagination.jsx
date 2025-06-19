import React from 'react';
import { RiArrowLeftLine, RiArrowRightLine } from '@remixicon/react';

const Pagination = ({ currentPage, totalPages, onPageChange, paginationData }) => {
  if (!paginationData || totalPages <= 1) return null;

  const pageNumbers = [];
  const maxVisiblePages = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 mb-4 
                    p-4 bg-white rounded-xl shadow-md">
      {/* Page Info */}
      <div className="text-sm text-gray-600 font-[Montserrat]">
        Showing <span className="font-medium">{paginationData.from || 0}</span> to{' '}
        <span className="font-medium">{paginationData.to || 0}</span> of{' '}
        <span className="font-medium">{paginationData.total || 0}</span> results
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center space-x-1 sm:space-x-2">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-500 
                   bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white 
                   disabled:hover:text-gray-500 transition-all duration-200"
        >
          <RiArrowLeftLine className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* First Page */}
        {startPage > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="w-10 h-10 text-sm font-medium text-gray-500 bg-white border 
                       border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 
                       transition-all duration-200"
            >
              1
            </button>
            {startPage > 2 && (
              <span className="px-2 text-gray-400">...</span>
            )}
          </>
        )}

        {/* Page Numbers */}
        {pageNumbers.map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 text-sm font-medium rounded-lg transition-all duration-200
                       ${page === currentPage
                         ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25 transform scale-105'
                         : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                       }`}
          >
            {page}
          </button>
        ))}

        {/* Last Page */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="px-2 text-gray-400">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="w-10 h-10 text-sm font-medium text-gray-500 bg-white border 
                       border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 
                       transition-all duration-200"
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-500 
                   bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white 
                   disabled:hover:text-gray-500 transition-all duration-200"
        >
          <span className="hidden sm:inline">Next</span>
          <RiArrowRightLine className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;