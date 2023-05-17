import { Pagination } from 'react-bootstrap';

export interface PaginationComponentProps {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent = ({
  page,
  pages,
  onPageChange,
}: PaginationComponentProps) => {
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1) {
      onPageChange(1);
    } else if (pageNumber > pages) {
      onPageChange(pages);
    } else {
      onPageChange(pageNumber);
    }
  };

  if (pages === 1) {
    return null;
  } else if (pages > 5) {
    return (
      <Pagination className="mb-0">
        <Pagination.Prev onClick={() => handlePageChange(page - 1)} />

        {page != 1 && (
          <Pagination.Item onClick={() => handlePageChange(1)}>
            {1}
          </Pagination.Item>
        )}

        {page - 3 >= 1 && <Pagination.Ellipsis />}

        {page - 2 == 1 && (
          <Pagination.Item onClick={() => handlePageChange(page - 1)}>
            {page - 1}
          </Pagination.Item>
        )}

        {page + 1 >= pages && (
          <Pagination.Item onClick={() => handlePageChange(pages - 2)}>
            {pages - 2}
          </Pagination.Item>
        )}

        {page == pages && (
          <Pagination.Item onClick={() => handlePageChange(page - 1)}>
            {page - 1}
          </Pagination.Item>
        )}

        <Pagination.Item active>{page}</Pagination.Item>

        {page == 1 && (
          <Pagination.Item onClick={() => handlePageChange(page + 1)}>
            {page + 1}
          </Pagination.Item>
        )}

        {page - 1 <= 1 && (
          <Pagination.Item onClick={() => handlePageChange(3)}>
            {3}
          </Pagination.Item>
        )}

        {page + 2 == pages && (
          <Pagination.Item onClick={() => handlePageChange(page + 1)}>
            {page + 1}
          </Pagination.Item>
        )}

        {page + 3 <= pages && <Pagination.Ellipsis />}

        {page != pages && (
          <Pagination.Item onClick={() => handlePageChange(pages)}>
            {pages}
          </Pagination.Item>
        )}

        <Pagination.Next onClick={() => handlePageChange(page + 1)} />
      </Pagination>
    );
  } else {
    return (
      <Pagination className="m-0">
        {[...Array(pages)].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <Pagination.Item
              key={pageNumber}
              active={pageNumber === page}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </Pagination.Item>
          );
        })}
      </Pagination>
    );
  }
};

export default PaginationComponent;
