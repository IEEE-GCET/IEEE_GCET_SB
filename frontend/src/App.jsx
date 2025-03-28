import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";
import "keen-slider/keen-slider.min.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useContext } from "react";

import Home from "./components/partials/Home_components/Home";
import About from "./components/partials/About_components/About";
import Societies from "./components/partials/Society_components/Societies";
import Event from "./components/partials/Event_components/Event";
import { Login } from "./components/auth/Login";
import Layout from "./Layout";
import EventViewCard from "./components/partials/Event_components/Event_view_components/EventViewCard";
import EventFormWrapper from "./components/partials/Event_components/Event_form_components/EventFormWrapper";
import { AuthProvider, AuthContext } from "./Context/AuthContext";

// ProtectedRoute component: it does not redirect but renders the Outlet
// You can use the isAuthenticated value inside your protected pages to display appropriate UI.
const ProtectedRoute = () => {
  const { loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  // Simply render the nested routes, regardless of authentication.
  // Your components (or Navbar) should check isAuthenticated to conditionally display features.
  return <Outlet />;
};

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/* Public Routes */}
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/society" element={<Societies />} />
      <Route path="/event" element={<Event />} />

      {/* Protected Routes - no automatic redirection */}
      <Route element={<ProtectedRoute />}>
        <Route path="/event/upload" element={<EventFormWrapper />} />
        <Route path="/event/:eventId" element={<EventViewCard />} />
      </Route>
    </Route>
  )
);

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <AuthProvider>
        <RouterProvider router={appRouter} />
      </AuthProvider>
    </LocalizationProvider>
  );
};

export default App;
