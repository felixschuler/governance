import { Badge, Button, Card, Modal } from 'react-bootstrap';
import { Auditor } from '../utils/types';
import { useState } from 'react';

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
            </Badge>
          </h5>
          <p>
            Number of projects audited: <strong>{auditor.projects}</strong>
          </p>
          <p>
            Market cap of projects audited: <strong>{auditor.mcap}</strong>
          </p>
          <p>
            Major clients audited:{' '}
            <strong>
              {auditor.clients.map((client) => client).join(', ')}
            </strong>
          </p>
          <p>
            Supported blockchains:{' '}
            <strong>{auditor.chains.map((chain) => chain).join(', ')}</strong>
          </p>
          <p>
            Website:{' '}
            <a href={auditor.website} target="_blank" rel="noopener noreferrer">
              {auditor.website}
            </a>
          </p>
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
