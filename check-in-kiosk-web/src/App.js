import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import StudentsIndex from './pages/StudentsIndex';
import NoPage from './pages/NoPage';
import AddStudent from './pages/AddStudent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="index" element={<StudentsIndex />} />
          <Route path="index/add" element={<AddStudent />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
