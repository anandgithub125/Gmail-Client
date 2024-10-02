import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import EmailList from './components/EmailList';
import EmailDetail from './components/EmailDetail';
import ComposeEmail from './components/ComposeEmail';
import SearchBar from './components/SearchBar';
import Filter from './components/Filter';
import emailData from './data/emails.json';
import { Button } from 'react-bootstrap';

const App = () => {
  const [emails, setEmails] = useState(emailData);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [composeOpen, setComposeOpen] = useState(false);
  const [filteredEmails, setFilteredEmails] = useState(emailData);

  const handleSendEmail = (newEmail) => {
    const newEmailFormatted = {
      id: emails.length + 1,
      sender: newEmail.recipient,
      subject: newEmail.subject,
      body: newEmail.body,
      snippet: newEmail.body.slice(0, 50),
      date: new Date().toLocaleDateString(),
      attachments: newEmail.attachments
    };
    setEmails([...emails, newEmailFormatted]);
    setFilteredEmails([...emails, newEmailFormatted]);
    setComposeOpen(false);
  };

  const handleSearch = (query) => {
    const result = emails.filter(
      email =>
        email.sender.toLowerCase().includes(query.toLowerCase()) ||
        email.subject.toLowerCase().includes(query.toLowerCase()) ||
        email.date.toLowerCase().includes(query.toLowerCase()) ||
        email.snippet.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEmails(result);
  };

  const handleFilter = (criteria) => {
    const result = emails.filter(email => email[criteria]);
    setFilteredEmails(result);
  };

  return (
    <Router>
      <div className={`app ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <Sidebar setComposeOpen={setComposeOpen} />
        </div>
        <div className="main-content">
          <div className="top-bar d-flex justify-content-between align-items-center my-3">
            <div className="d-flex align-items-center">
              <Button className="btn btn-lg btn-primary" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <i className="bi bi-list"></i>
                Toggle
              </Button>

            </div>
            <div className="d-flex align-items-center flex-grow-1 ms-2">
              <SearchBar onSearch={handleSearch} />
              <Filter onFilter={handleFilter} />
            </div>
          </div>
          <div className="content flex-grow-1 overflow-auto">
            <Routes>
              <Route path="/" element={
                <EmailList
                  className="email-list"
                  emails={filteredEmails}
                  onSelectEmail={setSelectedEmail}
                />
              } />
              <Route path="/email/:id" element={<EmailDetail emails={emails} selectedEmail={selectedEmail} />} />

            </Routes>
            {composeOpen && <ComposeEmail onSend={handleSendEmail} onClose={() => setComposeOpen(false)} />}
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;

