import { Navigate, Route, Routes } from "react-router";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Layout from "./components/Layout";
import Albums from "./pages/Albums";
import Users from "./pages/Users";
import AlbumDetail from "./pages/AlbumDetail";
import UserDetail from "./pages/UserDetail";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/albums" element={<Albums />} />
        <Route path="/albums/:id" element={<AlbumDetail />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetail />} />

        <Route
          path="*"
          element={<Navigate to="/albums?pageSize=10&currentPage=1" replace />}
        />
      </Route>
    </Routes>
  );
}

export default App;
