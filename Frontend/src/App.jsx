import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateNote from "./pages/CreateNote";
import MyNotes from "./pages/MyNotes";
import ShareNote from "./pages/ShareNote";
import ProtectedRoute from "./components/ProtectedRoutes";
import PageNotFound from "./pages/PageNotFound";

function App() {

  const RedirectComponent = ()=> {

  }

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Navigate to="/notes" />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/notes/new"
          element={
            <ProtectedRoute>
              <CreateNote />
            </ProtectedRoute>
          }

        />

        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <MyNotes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/share/:token"
          element={
            <ProtectedRoute>
              <ShareNote />
            </ProtectedRoute>
          }
        />

          <Route 
          path="*"
          element={<PageNotFound/>}
          />


      </Routes>

    </BrowserRouter>

  );
}

export default App;