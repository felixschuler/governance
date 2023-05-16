import { Table } from 'react-bootstrap';
import { Audit } from '../utils/types';
import AuditListComponent from './AuditListComponent';

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
  const filteredAudits: Audit[] = [];

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

  return (
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
        {filteredAudits.map((audit: Audit) => {
          return <AuditListComponent key={audit.id} audit={audit} />;
        })}
      </tbody>
    </Table>
  );
};

export default AuditTableComponent;
