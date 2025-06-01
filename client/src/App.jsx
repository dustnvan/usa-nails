import ConfirmPage from './Pages/ConfirmPage';
import HomePage from './Pages/HomePage';
import AdminPage from './Pages/AdminPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SelectDate from './Pages/SelectDate';

function App() {
  return (
    <div className="no-scrollbar">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/confirm" element={<ConfirmPage />} />
          <Route path="/select-date" element={<SelectDate />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
