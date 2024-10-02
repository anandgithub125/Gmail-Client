import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Sidebar = ({setComposeOpen}) => {
  return (
    <div className="sidebar-content">
       <Button onClick={() => setComposeOpen(true)} variant="contained" color="primary" className="btn btn-lg btn-primary ms-2">
                Compose
              </Button>
              
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            <i className="bi bi-inbox me-2"></i> Inbox
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/sent" className="nav-link">
            <i className="bi bi-send me-2"></i> Sent
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/drafts" className="nav-link">
            <i className="bi bi-file-earmark me-2"></i> Drafts
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/trash" className="nav-link">
            <i className="bi bi-trash me-2"></i> Trash
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
