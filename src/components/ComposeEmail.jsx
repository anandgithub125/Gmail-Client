import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ComposeEmail = ({ onSend, onClose }) => {
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [attachments, setAttachments] = useState([]);

  const handleAttachment = (e) => {
    const files = Array.from(e.target.files);
    setAttachments([...attachments, ...files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend({ recipient, subject, body, attachments });
    setRecipient('');
    setSubject('');
    setBody('');
    setAttachments([]);
    console.log("recipient", recipient)
  };

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Compose Email</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formRecipient" className="mb-3">
            <Form.Label>To</Form.Label>
            <Form.Control
              type="email"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Enter recipient"
              required
            />
          </Form.Group>
          <Form.Group controlId="formSubject" className="mb-3">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject"
            />
          </Form.Group>
          <Form.Group controlId="formBody" className="mb-3">
            <Form.Label>Body</Form.Label>
            <ReactQuill value={body} onChange={setBody} />
          </Form.Group>
          <Form.Group controlId="formAttachments" className="mb-3">
            <Form.Label>Attachments</Form.Label>
            <Form.Control type="file" onChange={handleAttachment} multiple />
          </Form.Group>
          <Button variant="primary" type="submit">
            Send
          </Button>
          <Button variant="secondary" onClick={onClose} className="ms-2">
            Close
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ComposeEmail;
