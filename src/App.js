import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddForm from "./components/addForm";
import EditForm from "./components/editForm";
import List from "./components/list";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<AddForm />} />
        <Route exact path="/list" element={<List />} />
        <Route path="/editList/:id" element={<EditForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
