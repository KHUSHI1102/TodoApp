import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./Layout/Layout";
import Todo from "./pages/Home";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Todo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
