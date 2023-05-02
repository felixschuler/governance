import { useParams } from 'react-router-dom';

const Auditor = () => {
  const { auditorId } = useParams();
  return (
    <div>
      <h2>{auditorId}</h2>
    </div>
  );
};

export default Auditor;
