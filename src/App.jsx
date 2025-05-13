import { Navigate, Route, Routes } from "react-router";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Layout from "./components/Layout";
import Albums from "./pages/albums";
import Users from "./pages/users";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/albums" element={<Albums />} />
        <Route path="users" element={<Users />} />

        <Route path="*" element={<Navigate to="/albums" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
