import { useParams } from 'react-router-dom';

export interface AuditProps {
  id: string;
  auditor: string;
  date: string;
  paper: string;
}

const Audit = () => {
  const { auditId } = useParams();
  return (
    <div>
      <h2>{auditId}</h2>
    </div>
  );
};

export default Audit;
