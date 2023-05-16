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
  if (pages === 1) {
    return null;
  } else if (pages > 10) {
    return (
      <Pagination className="mb-0">
        <Pagination.First onClick={() => onPageChange(1)} />
        {page > 2 && <Pagination.Ellipsis />}
        {page > 1 && (
          <Pagination.Item
            key={page - 1}
            onClick={() => onPageChange(page - 1)}
          >
            {page - 1}
          </Pagination.Item>
        )}
        <Pagination.Item key={page} active onClick={() => onPageChange(page)}>
          {page}
        </Pagination.Item>
        {page < pages && (
          <Pagination.Item
            key={page + 1}
            onClick={() => onPageChange(page + 1)}
          >
            {page + 1}
          </Pagination.Item>
        )}
        {page + 1 < pages && <Pagination.Ellipsis />}
        <Pagination.Last onClick={() => onPageChange(pages)} />
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
              onClick={() => onPageChange(pageNumber)}
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
