import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Doctors from "./pages/Doctors";
import MyAppointments from "./pages/MyAppointments";
import UploadReport from "./pages/UploadReport";
import MyReports from "./pages/MyReports";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route
  path="/my-appointments"
  element={<MyAppointments />}
/>
<Route
  path="/upload-report"
  element={<UploadReport />}
/>
<Route
  path="/my-reports"
  element={<MyReports />}
/>
<Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
