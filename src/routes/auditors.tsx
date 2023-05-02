import { Auditor } from '../utils/types';

export interface AuditorsProps {
  auditors: Auditor[];
}

const Auditors = ({ auditors }: AuditorsProps) => {
  return (
    <div>
      <h1 className="display-2 my-5 text-center">Auditors</h1>
      {auditors.map((auditor: Auditor) => {
        return (
          <div key={auditor.id}>
            <h2>{auditor.name}</h2>
            <p>{auditor.type}</p>
            <p>{auditor.mcap}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Auditors;
