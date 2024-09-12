import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MasonryGrid } from "./components/MasonryGrid/MasonryGrid";

import { lazy, Suspense } from "react";

const PhotoDetail = lazy(() => import("./components/PhotoDetail/PhotoDetail"));
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/photo/:id"
          element={
            <Suspense fallback={<div>Loading photo details...</div>}>
              <PhotoDetail />
            </Suspense>
          }
        />{" "}
        <Route path="/" element={<MasonryGrid />} />
      </Routes>
    </Router>
  );
}

export default App;
