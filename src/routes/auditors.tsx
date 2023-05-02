import { Auditor } from '../utils/types';

export interface AuditorsProps {
  auditors: Auditor[];
}

const Auditors = ({ auditors }: AuditorsProps) => {
  return (
    <div>
      <h1>Auditors</h1>
      {auditors.map((auditor: Auditor) => {
        return (
          <div key={auditor.id}>
            <h2>{auditor.name}</h2>
            <p>{auditor.type}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Auditors;
