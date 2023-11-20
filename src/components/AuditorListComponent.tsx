import { useState } from 'react';
import {
  Badge,
  Button,
  Card,
  Modal,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { InfoCircle } from 'react-bootstrap-icons';
import {
  getEconomicDescription,
  getSecurityDescription,
} from '../utils/data.service';
import { Auditor } from '../utils/types';

export interface AuditorProps {
  auditor: Auditor;
}

const AuditorListComponent = ({ auditor }: AuditorProps) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {auditor.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>
            Auditor type:{' '}
            <Badge
              bg={auditor.type === 'Economic' ? 'warning' : 'info'}
              text={auditor.type === 'Economic' ? 'dark' : 'light'}
            >
              {auditor.type}
            </Badge>{' '}
            <OverlayTrigger
              placement={'right'}
              overlay={
                <Tooltip id={`tooltip-right`}>
                  {auditor.type === 'Economic'
                    ? getEconomicDescription()
                    : getSecurityDescription()}
                </Tooltip>
              }
            >
              <span>
                <InfoCircle />
              </span>
            </OverlayTrigger>
          </h5>
          <p>
            <strong>Number of clients:</strong> {auditor.clients}
          </p>
          <p>
            <strong>Notable clients:</strong>{' '}
            {auditor.notableClients.join(', ')}
          </p>
          <p>
            <strong>Key performance indicators:</strong>{' '}
            {auditor.kpis.length === 0 ? (
              'None stated'
            ) : (
              <ul>
                {auditor.kpis.map((kpi) => (
                  <li key={kpi}>{kpi}</li>
                ))}
              </ul>
            )}
          </p>
          <p>
            <strong>Website:</strong>{' '}
            <a href={auditor.website} target="_blank" rel="noopener noreferrer">
              {auditor.website}
            </a>
          </p>
          <p>
            <strong>Reports:</strong>{' '}
            <a
              href={auditor.reportsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {auditor.reportsUrl}
            </a>
          </p>
          {auditor.source && (
            <p className="text-secondary">
              <small>
                Source: {auditor.source.title} <br />
                <a
                  href={auditor.source.url}
                  className="text-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {auditor.source.url}
                </a>
              </small>
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" onClick={() => setModalShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Card>
        <Card.Body>
          <Card.Title>{auditor.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {auditor.type}
          </Card.Subtitle>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setModalShow(true)}
          >
            More Information
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default AuditorListComponent;
