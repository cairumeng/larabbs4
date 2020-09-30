import React from 'react'
import ReactDOM from 'react-dom'

function range(start, end) {
  var ans = []
  for (let i = start; i <= end; i++) {
    ans.push(i)
  }
  return ans
}

const Pagination = ({ paginator }) => {
  const start = Math.max(paginator.current_page - 3, 1)
  const end = Math.min(paginator.current_page + 3, paginator.last_page)
  const links = range(start, end)

  const getPageLink = page => `${paginator.path}?page=${page}`
  return (
    paginator.last_page > 1 && (
      <nav aria-label="Page navigation example" className="mt-5">
        <ul className="pagination">
          <li className="page-item">
            <a
              className="page-link"
              href={getPageLink(Math.max(paginator.current_page - 1, 1))}
            >
              Previous
            </a>
          </li>
          {links.map(link => (
            <li
              key={link}
              className={`page-item ${link === paginator.current_page &&
                'active'}`}
            >
              <a className="page-link" href={getPageLink(link)}>
                {link}
              </a>
            </li>
          ))}

          <li className="page-item">
            <a
              className="page-link"
              href={getPageLink(
                Math.min(paginator.current_page + 1, paginator.last_page)
              )}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    )
  )
}

export default Pagination
