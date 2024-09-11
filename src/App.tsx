import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MasonryGrid } from "./components/MasonryGrid/MasonryGrid";
import { PhotoDetail } from "./components/PhotoDetail/PhotoDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/photo/:id" element={<PhotoDetail />} />
        <Route path="/" element={<MasonryGrid />} />
      </Routes>
    </Router>
  );
}

export default App;
