import { Col, Row } from 'react-bootstrap';
import { Audit } from '../utils/types';
import { convertAuditsToCsv } from '../utils/data.service';

export interface DownloadComponentProps {
  audits: Audit[];
}

const DownloadComponent = ({ audits }: DownloadComponentProps) => {
  const csv = convertAuditsToCsv(audits);

  return (
    <Row className="mb-3">
      <Col className="d-flex justify-content-end gap-2">
        <a
          href={'data:text/csv;charset=utf-8,' + encodeURIComponent(csv)}
          role="button"
          className="btn btn-sm btn-outline-success"
          download="audits.csv"
        >
          Download CSV
        </a>
        <a
          href={
            'data:text/json;charset=utf-8,' +
            encodeURIComponent(JSON.stringify(audits))
          }
          role="button"
          className="btn btn-sm btn-outline-warning"
          download="audits.json"
        >
          Download JSON
        </a>
      </Col>
    </Row>
  );
};

export default DownloadComponent;
