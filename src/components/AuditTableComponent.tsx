import { Form, Table } from 'react-bootstrap';
import { Audit } from '../utils/types';
import AuditListComponent from './AuditListComponent';
import PaginationComponent from './PaginationComponent';
import { useState } from 'react';
import DownloadComponent from './DownloadComponent';

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
    { value: 5, label: '5 / page' },
    { value: 10, label: '10 / page' },
    { value: 20, label: '20 / page' },
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
      <DownloadComponent audits={filteredAudits} />
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
      <div className="d-flex mb-5 justify-content-sm-between flex-sm-row flex-column-reverse align-items-center gap-3">
        <div>
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
