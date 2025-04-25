import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/admin/Register";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Courses from "./pages/courses/Courses";
import CreateCourse from "./pages/courses/CreateCourse";
import EditCourse from "./pages/courses/EditCourse";
import Events from "./pages/events/Events";
import CreateEvent from "./pages/events/CreateEvent";
import EditEvent from "./pages/events/EditEvent";
import TvShows from "./pages/tv-shows/TvShows";
import CreateTvShow from "./pages/tv-shows/CreateTvShow";
import EditTvShow from "./pages/tv-shows/EditTvShow";
import Home from "./pages/user/Home";
import UserRegister from "./pages/user/UserRegister";
import UserLogin from "./pages/user/UserLogin";
import ManageUsers from "./pages/admin/ManageUsers";
import UserDashboard from "./pages/user/UserDashboard";
import ProfileUpdate from "./pages/user/ProfileUpdate";
import Forum from "./pages/Forum";
import UserMembershipStatus from "./pages/user/UserMembershipStatus";
import UserPayments from "./pages/admin/UserPayments";
// import PaymentOptions from './pages/user/PaymentOptions';

import TelebirrPayment from "./pages/user/TeleBirrPayment";
import UserEventsPage from "./pages/user/UserEventsPage";
import UserEventsPage2 from "./pages/user/UserEventsPage2";
import ManageEventRegistration from "./pages/admin/ManageEventRegistration";
import UserCoursesPage from "./pages/user/UserCoursesPage";
import UserTvShowsPage from "./pages/user/UserTvShowsPage";
import UserTvShowsPage2 from "./pages/user/UserTvShowsPage2";
import CourseContentPage from "./pages/user/CourseContentPage";

import About from "./pages/user/about";
import Contact from "./pages/user/contact";

// 🔐 Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

const ProtectedUserRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/user-login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected User Routes */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedUserRoute>
              <UserDashboard />
            </ProtectedUserRoute>
          }
        />

        <Route
          path="/user-profile"
          element={
            <ProtectedUserRoute>
              <ProfileUpdate />
            </ProtectedUserRoute>
          }
        />

        <Route
          path="/forum"
          element={
            <ProtectedUserRoute>
              <Forum />
            </ProtectedUserRoute>
          }
        />

        <Route
          path="/membership-status"
          element={
            <ProtectedUserRoute>
              <UserMembershipStatus />
            </ProtectedUserRoute>
          }
        />

        {/* <Route path="/payment-options" element={
          <ProtectedUserRoute>
            <PaymentOptions />
          </ProtectedUserRoute>
        } /> */}

        <Route
          path="/telebirr-payment"
          element={
            <ProtectedUserRoute>
              <TelebirrPayment />
            </ProtectedUserRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/courses/create"
          element={
            <ProtectedRoute>
              <CreateCourse />
            </ProtectedRoute>
          }
        />

        <Route
          path="/courses/edit/:id"
          element={
            <ProtectedRoute>
              <EditCourse />
            </ProtectedRoute>
          }
        />

        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          }
        />

        <Route
          path="/events/create"
          element={
            <ProtectedRoute>
              <CreateEvent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/events/edit/:id"
          element={
            <ProtectedRoute>
              <EditEvent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tv-shows"
          element={
            <ProtectedRoute>
              <TvShows />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tv-shows/create"
          element={
            <ProtectedRoute>
              <CreateTvShow />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tv-shows/edit/:id"
          element={
            <ProtectedRoute>
              <EditTvShow />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage-users"
          element={
            <ProtectedRoute>
              <ManageUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user-payments"
          element={
            <ProtectedRoute>
              <UserPayments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user-events2"
          element={
            <ProtectedUserRoute>
              <UserEventsPage2 />
            </ProtectedUserRoute>
          }
        />

        <Route
          path="/user-events"
          element={
            <ProtectedUserRoute>
              <UserEventsPage />
            </ProtectedUserRoute>
          }
        />

        <Route
          path="/manage-event-registration"
          element={
            <ProtectedRoute>
              <ManageEventRegistration />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user-courses"
          element={
            <ProtectedUserRoute>
              <UserCoursesPage />
            </ProtectedUserRoute>
          }
        />

        <Route
          path="/user-tv-shows"
          element={
            <ProtectedUserRoute>
              <UserTvShowsPage />
            </ProtectedUserRoute>
          }
        />

        <Route
          path="/user-tv-shows2"
          element={
            <ProtectedUserRoute>
              <UserTvShowsPage2 />
            </ProtectedUserRoute>
          }
        />

        <Route
          path="/course-content/:id"
          element={
            <ProtectedUserRoute>
              <CourseContentPage />
            </ProtectedUserRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
