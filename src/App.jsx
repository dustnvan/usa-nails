import ConfirmPage from './Pages/ConfirmPage';
import HomePage from './Pages/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Confirm" element={<ConfirmPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
