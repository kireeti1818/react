import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Create, Plan } from './components/plans';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/new" element={<Create />} />
        <Route path="/" element={<Plan />} />
      </Routes>
    </Router>
  );
}

export default App;
