import { Form } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => {
  return (
    <Form.Control
      type="text"
      placeholder="Search emails..."
      onChange={(e) => onSearch(e.target.value)}
      className="me-2 searchBar"
    />
  );
};

export default SearchBar;
