import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import parse from 'html-react-parser';
import { FixedSizeGrid as Grid } from 'react-window';
import 'bootstrap/dist/css/bootstrap.min.css';

const EmailDetail = ({ emails }) => {
  const { id } = useParams();  
  const navigate = useNavigate
  const email = emails.find(email => email.id === parseInt(id, 10));
  if (!email) {
    return (
      <Container className="p-3">
        <h4>Email Not Found</h4>
        <p>The email you are looking for does not exist or has been deleted.</p>
        <Button onClick={() => navigate('/')}>Go Back to Inbox</Button>
      </Container>
    );
  }

  const renderLargeTable = () => (
    <Grid
      className="Grid"
      columnCount={20}
      columnWidth={100}
      height={500}
      rowCount={10000}
      rowHeight={35}
      width={1000}
    >
      {({ columnIndex, rowIndex, style }) => (
        <div style={style}>
          Cell {rowIndex},{columnIndex}
        </div>
      )}
    </Grid>
  );

  const stripHTML = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  return (
    <Container className="p-3">
      <h2>{email.subject}</h2>
      <div>
        <strong>{email.sender}</strong>
        <span className="text-muted"> - {email.date}</span>
      </div>
      <div className="mt-3">
        {email.contentType === 'html'
          ? parse(email.content)
          : email.content === 'large_table_placeholder'
          ? renderLargeTable()
          : <p>{email.content}</p>
        }
      </div>
      <div className="mt-3">
      <p>{stripHTML(email.snippet)}</p>
      </div>

      {email.attachments?.length > 0 && (
        <div className="mt-3">
          <h5>Attachments</h5>
          <ul>
            {email.attachments.map((attachment, index) => (
              <li key={index}>
                <a href={attachment.url} download>
                  {attachment.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Container>
  );
};

export default EmailDetail;
