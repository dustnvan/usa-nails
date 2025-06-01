import ConfirmPage from './Pages/ConfirmPage';
import HomePage from './Pages/HomePage';
import AdminPage from './Pages/AdminPage';
import BookPage from './Pages/BookPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SelectDateTime from './Pages/SelectDateTime';

function App() {
  return (
    <div className="no-scrollbar">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/confirm" element={<ConfirmPage />} />
          <Route path="/select-date" element={<SelectDateTime />} />
          <Route path="/book" element={<BookPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
