import { Form, Table } from 'react-bootstrap';
import { Audit } from '../utils/types';
import AuditListComponent from './AuditListComponent';
import PaginationComponent from './PaginationComponent';
import { useState } from 'react';

export interface AuditTableComponentProps {
  audits: Audit[];
  filterQuery: string;
  sortType: string;
  minDate: string;
  maxDate: string;
}

const AuditTableComponent = ({
  audits,
  filterQuery,
  sortType,
  minDate,
  maxDate,
}: AuditTableComponentProps) => {
  const [auditsPerPage, setAuditsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const filteredAudits: Audit[] = [];

  const pageOptions = [
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 20, label: '20' },
  ];

  audits.forEach((audit: Audit) => {
    if (
      (audit.auditee.toLowerCase().includes(filterQuery.toLowerCase()) ||
        audit.auditor.toLowerCase().includes(filterQuery.toLowerCase())) &&
      audit.date >= minDate &&
      audit.date <= maxDate
    ) {
      filteredAudits.push(audit);
    }
  });

  filteredAudits.sort((a: Audit, b: Audit) => {
    switch (sortType) {
      case 'AUDITEE_ASC':
        return a.auditee.localeCompare(b.auditee);
      case 'AUDITEE_DESC':
        return b.auditee.localeCompare(a.auditee);
      case 'AUDITOR_ASC':
        return a.auditor.localeCompare(b.auditor);
      case 'AUDITOR_DESC':
        return b.auditor.localeCompare(a.auditor);
      case 'DATE_ASC':
        return a.date.localeCompare(b.date);
      case 'DATE_DESC':
        return b.date.localeCompare(a.date);
      default:
        return 0;
    }
  });

  const indexOfLastAudit = page * auditsPerPage;
  const indexOfFirstAudit = indexOfLastAudit - auditsPerPage;
  if (indexOfFirstAudit > filteredAudits.length) {
    setPage(1);
  }
  const paginatedAudits = filteredAudits.slice(
    indexOfFirstAudit,
    indexOfLastAudit
  );

  return (
    <>
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
          {paginatedAudits.map((audit: Audit) => {
            return <AuditListComponent key={audit.id} audit={audit} />;
          })}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center gap-5">
        <div className="d-flex align-items-center">
          <span className="flex-shrink-0 me-2">Audits per page:</span>{' '}
          <Form.Select
            aria-label="Select audits per page"
            value={auditsPerPage}
            onChange={(e) => setAuditsPerPage(parseInt(e.target.value))}
          >
            {pageOptions.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </Form.Select>
        </div>
        <PaginationComponent
          page={page}
          pages={Math.ceil(filteredAudits.length / auditsPerPage)}
          onPageChange={setPage}
        />
      </div>
    </>
  );
};

export default AuditTableComponent;
