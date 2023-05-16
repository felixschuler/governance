import { Col, Form, Row } from 'react-bootstrap';

export interface FilterComponentProps {
  filterQuery: string;
  sortType: string;
  minDate: string;
  maxDate: string;
  onFilterQueryChange: (filterQuery: string) => void;
  onSortTypeChange: (sortType: string) => void;
  onMinDateChange: (minDate: string) => void;
  onMaxDateChange: (maxDate: string) => void;
}

const FilterComponent = ({
  filterQuery,
  sortType,
  minDate,
  maxDate,
  onFilterQueryChange,
  onSortTypeChange,
  onMinDateChange,
  onMaxDateChange,
}: FilterComponentProps) => {
  const sortOptions = [
    { value: 'NONE', label: 'None' },
    { value: 'AUDITEE_ASC', label: 'Auditee ascending' },
    { value: 'AUDITEE_DESC', label: 'Auditee descending' },
    { value: 'AUDITOR_ASC', label: 'Auditor ascending' },
    { value: 'AUDITOR_DESC', label: 'Auditor descending' },
    { value: 'DATE_ASC', label: 'Date ascending' },
    { value: 'DATE_DESC', label: 'Date descending' },
  ];

  return (
    <Row>
      <Col xs={3}>
        <Form.Group controlId="filter.nameSearch">
          <Form.Label>Filter by auditee or auditor:</Form.Label>
          <Form.Control
            type="text"
            value={filterQuery}
            placeholder="Enter name..."
            onChange={(e) => onFilterQueryChange(e.target.value)}
          />
        </Form.Group>
      </Col>
      <Col xs={6}>
        <Row className="justify-content-center">
          <Col xs={4}>
            <Form.Group controlId="filter.nameSearch">
              <Form.Label>From: </Form.Label>
              <Form.Control
                type="date"
                value={minDate}
                onChange={(e) => onMinDateChange(e.target.value)}
                min={new Date('2018-01-01').toISOString().split('T')[0]}
                max={
                  maxDate !== ''
                    ? new Date(maxDate).toISOString().split('T')[0]
                    : new Date().toISOString().split('T')[0]
                }
              />
            </Form.Group>
          </Col>
          <Col xs={4}>
            <Form.Group controlId="filter.nameSearch">
              <Form.Label>To:</Form.Label>
              <Form.Control
                type="date"
                value={maxDate}
                onChange={(e) => onMaxDateChange(e.target.value)}
                min={
                  minDate !== ''
                    ? new Date(minDate).toISOString().split('T')[0]
                    : new Date('2018-01-01').toISOString().split('T')[0]
                }
                max={new Date().toISOString().split('T')[0]}
              />
            </Form.Group>
          </Col>
        </Row>
      </Col>
      <Col xs={3}>
        <Form.Group controlId="filter.nameSearch">
          <Form.Label>Sort audits by:</Form.Label>
          <Form.Select
            aria-label="Filter Select"
            value={sortType}
            onChange={(e) => onSortTypeChange(e.target.value)}
          >
            {sortOptions.map((sortOption) => (
              <option key={sortOption.value} value={sortOption.value}>
                {sortOption.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Col>
    </Row>
  );
};

export default FilterComponent;
