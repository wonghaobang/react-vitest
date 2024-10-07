import { range } from "../utils/utils"

interface PaginationProps {
  total: number
  limit: number
  currentPage: number
  selectPage: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  limit,
  currentPage,
  selectPage,
}) => {
  const pagesCount = Math.ceil(total / limit)
  const pages = range(1, pagesCount + 1)

  return (
    <ul>
      {pages.map((page) => (
        <li
          data-testid="page-container"
          key={page}
          onClick={() => selectPage(page)}
          className={`page-item ${currentPage === page ? "active" : ""}`}
        >
          <span>{page}</span>
        </li>
      ))}
    </ul>
  )
}

export default Pagination
