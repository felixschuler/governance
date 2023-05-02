import { Link } from 'react-router-dom';

const Root = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-100">
      <h1 className="mb-3">Bachelor Project</h1>
      <h2>List of Smart Contract Auditors and Audits</h2>
      <div className="mt-5 d-flex gap-5">
        <Link
          className="py-3 px-4 border rounded text-black text-decoration-none"
          to={'auditors'}
        >
          Auditors
        </Link>
        <Link
          className="py-3 px-4 border rounded text-black text-decoration-none"
          to={'audits'}
        >
          Audits
        </Link>
      </div>
    </div>
  );
};

export default Root;
