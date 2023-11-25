import { Audit } from '../utils/types';

export interface AuditListComponentProps {
  audit: Audit;
}

const AuditListComponent = ({ audit }: AuditListComponentProps) => {
  return (
    <tr>
      <td>{audit.auditee}</td>
      <td>{audit.auditor}</td>
      <td>{audit.date}</td>
      <td className="text-center">
        <a href={audit.report} target="_blank" rel="noopener noreferrer">
          View Paper
        </a>
      </td>
    </tr>
  );
};

export default AuditListComponent;
