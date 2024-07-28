import React from "react";

export default function Pagination({
  items,
  pageSize,
  currentPage,
  onPageChange,
}) {
  const pagesCount = Math.ceil(items / pageSize);
  
  if (pagesCount === 1) return null;
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
  return (
    <div>
      <ul className="flex gap-5 items-center">
        <li>
          <button
            disabled={currentPage == 1}
            className={`${
              currentPage == 1 ? "text-gray-400" : "text-white"
            }  text-lg px-3 py-2 bg-black rounded-lg cursor-pointer disabled`}
            onClick={() => onPageChange(currentPage - 1)}
          >
            Back
          </button>
        </li>
        {pages.map((page) => {
          return (
            <li key={page}>
              <a
                className={`${
                  page == currentPage ? "text-blue-500" : "text-white"
                }  text-lg px-3 py-2 bg-black rounded-lg cursor-pointer`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </a>
            </li>
          );
        })}
        <li>
          <button
            disabled={currentPage == pagesCount}
            className={`${
              currentPage == pagesCount ? "text-gray-400" : "text-white"
            } text-lg px-3 py-2 bg-black rounded-lg cursor-pointer`}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
}
