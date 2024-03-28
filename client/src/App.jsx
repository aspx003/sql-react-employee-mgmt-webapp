import Navbar from "./Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllEmployees from "./pages/AllEmployees";
import AddEmployee from "./pages/AddEmployee";
import UpdateEmployee from "./pages/UpdateEmployee";
import DeleteEmployee from "./pages/DeleteEmployee";

function App() {
  return (
    <div>

      <div className="mx-10">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<AllEmployees />} />
            <Route path="/add-employee" element={<AddEmployee />} />
            <Route path="/update-employee" element={<UpdateEmployee />} />
            <Route path="/remove-employee" element={<DeleteEmployee />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
