import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const extractNameFromEmail = (email) => {
  if (!email) return ''; 
  const namePart = email.split('@')[0];
  
  const nameArray = namePart.split(/[._]/).filter(part => isNaN(part));
  
  const formattedName = nameArray.map((part) => {
    return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
  }).join(' ');

  return formattedName;
};

const EmailList = ({ emails }) => {
  const navigate = useNavigate();

  const handleSelectEmail = (id) => {
    navigate(`/email/${id}`);
  };
  const stripHTML = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  return (
    <ListGroup>
      {emails.map((email) => (
        <ListGroup.Item key={email.id} action onClick={() => handleSelectEmail(email.id)}>
          <div className="d-flex justify-content-between">
            <strong>{extractNameFromEmail(email.sender)}</strong>
           <div className="d-flex ">
           <strong>{`${email.subject}`}</strong>
           <p className='mx-1'>{`- ${stripHTML(email.snippet)}`}</p>
           </div>
            <span>{email.date}</span>
          </div>
         
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default EmailList;
