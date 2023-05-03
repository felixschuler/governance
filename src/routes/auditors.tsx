import { Col, Row } from 'react-bootstrap';
import { Auditor } from '../utils/types';
import AuditorListComponent from '../components/AuditorListComponent';

export interface AuditorsProps {
  auditors: Auditor[];
}

const Auditors = ({ auditors }: AuditorsProps) => {
  return (
    <div>
      <h1 className="display-2 mb-5 text-center">Auditors</h1>
      <Row>
        {auditors.map((auditor: Auditor) => {
          return (
            <Col key={auditor.id} sm={6} md={4} xl={3} className="mb-3">
              <AuditorListComponent auditor={auditor} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Auditors;
