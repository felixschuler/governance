import { Col, Form, Row, Table } from 'react-bootstrap';
import { Audit } from '../utils/types';
import AuditListComponent from '../components/AuditListComponent';
import { useState } from 'react';
import { getFilteredAndSortedAudits } from '../utils/data.service';

export interface AuditsProps {
  audits: Audit[];
}

const Audits = ({ audits }: AuditsProps) => {
  const [sortType, setSortType] = useState('NONE');
  const [filterQuery, setFilterQuery] = useState('');
  const [filteredAndSortedAudits, setFilteredAndSortedAudits] =
    useState(audits);

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortType = e.target.value;
    setSortType(sortType);
    filterAndSortAudits(filterQuery, sortType);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filterQuery = e.target.value;
    setFilterQuery(filterQuery);
    filterAndSortAudits(filterQuery, sortType);
  };

  const filterAndSortAudits = (filterQuery: string, sortType: string) => {
    const filteredAndSortedAudits = getFilteredAndSortedAudits(
      filterQuery,
      sortType
    );
    setFilteredAndSortedAudits(filteredAndSortedAudits);
  };

  return (
    <div>
      <h1 className="display-2 mb-5 text-center">Audits</h1>
      <div className="mb-3">
        <Row>
          <Col xs={8}>
            <Form.Group controlId="filter.nameSearch">
              <Form.Label>Filter by auditee or auditor:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name..."
                onChange={handleFilter}
              />
            </Form.Group>
          </Col>
          <Col xs={4}>
            <Form.Group controlId="filter.nameSearch">
              <Form.Label>Sort audits by:</Form.Label>
              <Form.Select
                aria-label="Filter Select"
                defaultValue="NONE"
                onChange={handleSort}
              >
                <option value="NONE">None</option>
                <option value="AUDITEE">Auditee</option>
                <option value="AUDITOR">Auditor</option>
                <option value="DATE_ASC">Date ascending</option>
                <option value="DATE_DESC">Date descending</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </div>
      <Table striped responsive="sm">
        <thead>
          <tr>
            <th>Auditee</th>
            <th>Auditor</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedAudits.map((audit: Audit) => {
            return <AuditListComponent key={audit.id} audit={audit} />;
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Audits;
