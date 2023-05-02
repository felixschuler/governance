import { Audit } from '../utils/types';

export interface AuditsProps {
  audits: Audit[];
}

const Audits = ({ audits }: AuditsProps) => {
  return (
    <div>
      <h1 className="display-2 my-5 text-center">Audits</h1>
      {audits.map((audit: Audit) => {
        return (
          <div key={audit.id}>
            <h2>{audit.auditor}</h2>
            <p>{audit.date}</p>
            <p>{audit.paper}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Audits;
