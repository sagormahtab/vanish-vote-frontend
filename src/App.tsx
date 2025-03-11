import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CreatePoll from "./pages/CreatePoll";
import ViewPoll from "./pages/ViewPoll";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="create" element={<CreatePoll />} />
          <Route path="poll/:id" element={<ViewPoll />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
