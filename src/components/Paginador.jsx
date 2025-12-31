
const Paginador = ({ page, setPage, totalPages }) => {

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  return (
    <div className="pagination-container">
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              &laquo; Anterior
            </button>
          </li>

          <li className="page-item active">
            <span className="page-link">{page} de {totalPages}</span>
          </li>

          <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            >
              Siguiente &raquo;
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Paginador;
