
import { ButtonGroup, Button } from 'react-bootstrap';

const Filter = ({ onFilter }) => {
  return (
    <ButtonGroup>
      <Button onClick={() => onFilter('unread')}>Unread</Button>
      <Button onClick={() => onFilter('starred')}>Starred</Button>
    
    </ButtonGroup>
  );
};

export default Filter;
