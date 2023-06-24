import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import MasterPage from "./MasterPage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import HomePage from "./Pages/HomePage";
import ProtectedRoute from "./Pages/ProtectedRoute";

function App() {


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MasterPage />}>
        <Route index element={<ProtectedRoute Component={HomePage} />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
