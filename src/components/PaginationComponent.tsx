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
};

export default PaginationComponent;
