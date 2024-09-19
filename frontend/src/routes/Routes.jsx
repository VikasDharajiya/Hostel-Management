import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Services from "../Pages/ServicesPage/Services";
import Accommodation from "../Pages/Accommodations/Accommodation";
import AccommodationForm from "../Pages/Accommodations/Form/Form";
import SignInUpPage from "../Pages/Sign-in-up/SignInUpPage";
import Cleaning from "../Pages/ServicesPage/Forms/Cleaning";
import Medical from "../Pages/ServicesPage/Forms/Medical";
import Clearance from "../Pages/ServicesPage/Forms/Clearance";
import Leave from "../Pages/ServicesPage/Forms/Leave";
import RoomInquire from "../Pages/Accommodations/DetailPage/RoomInquire";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import Admin from "../Pages/Sign-in-up/Subfiles/Admin";
import Reservations from "../Pages/Home/Subfiles/Reservations";
import ContactUs from "../Pages/Home/Subfiles/ContactUs";
import ForgotPassword from "../Pages/Sign-in-up/Subfiles/ForgotPassword";
import ResetPassword from "../Pages/Sign-in-up/Subfiles/ResetPassword";
import VerifyOTP from "../Pages/Sign-in-up/Subfiles/VerifyOtp";

function AppRoutes() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isStudent, setIsStudent] = React.useState(true);

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userType = localStorage.getItem("userType");
    const token = localStorage.getItem("token");
    if (user?.email && token) {
      setIsAuthenticated(true);
      if (userType == "student") {
        setIsStudent(true);
      } else {
        setIsStudent(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <Router>
      {isAuthenticated && isStudent && <Navbar />}
      <Routes>
        {/* <Route path="/signin" element={<SignInUpPage />} /> */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to={isStudent ? "/home" : "/adminpage"} />
            ) : (
              <SignInUpPage />
            )
          }
        />
        <Route
          path="/about"
          element={
            isAuthenticated ? (
              isStudent ? (
                <About />
              ) : (
                <AdminDashboard />
              )
            ) : (
              <SignInUpPage />
            )
          }
        />

        <Route
          path="/ContactUs"
          element={
            isAuthenticated ? (
              isStudent ? (
                <ContactUs />
              ) : (
                <AdminDashboard />
              )
            ) : (
              <SignInUpPage />
            )
          }
        />

        <Route
          path="/reservations"
          element={
            isAuthenticated ? (
              isStudent ? (
                <Reservations />
              ) : (
                <AdminDashboard />
              )
            ) : (
              <SignInUpPage />
            )
          }
        />
        <Route
          path="/home"
          element={
            isAuthenticated ? (
              isStudent ? (
                <Home />
              ) : (
                <AdminDashboard />
              )
            ) : (
              <SignInUpPage />
            )
          }
        />

        <Route
          path="/services"
          element={
            isAuthenticated ? (
              isStudent ? (
                <Services />
              ) : (
                <AdminDashboard />
              )
            ) : (
              <SignInUpPage />
            )
          }
        />

        <Route
          path="/accommodation"
          element={
            isAuthenticated ? (
              isStudent ? (
                <Accommodation />
              ) : (
                <AdminDashboard />
              )
            ) : (
              <SignInUpPage />
            )
          }
        />
        <Route
          path="/accommodation/form"
          element={
            isAuthenticated ? (
              isStudent ? (
                <AccommodationForm />
              ) : (
                <AdminDashboard />
              )
            ) : (
              <SignInUpPage />
            )
          }
        />
        <Route
          path="/accommodation/inquire"
          element={
            isAuthenticated ? (
              isStudent ? (
                <RoomInquire />
              ) : (
                <AdminDashboard />
              )
            ) : (
              <SignInUpPage />
            )
          }
        />
        <Route
          path="/services/Cleaning"
          element={
            isAuthenticated ? (
              isStudent ? (
                <Cleaning />
              ) : (
                <AdminDashboard />
              )
            ) : (
              <SignInUpPage />
            )
          }
        />
        <Route
          path="/services/Medical"
          element={
            isAuthenticated ? (
              isStudent ? (
                <Medical />
              ) : (
                <AdminDashboard />
              )
            ) : (
              <SignInUpPage />
            )
          }
        />

        <Route
          path="/services/Clearance"
          element={
            isAuthenticated ? (
              isStudent ? (
                <Clearance />
              ) : (
                <AdminDashboard />
              )
            ) : (
              <SignInUpPage />
            )
          }
        />
        <Route
          path="/services/Leave"
          element={
            isAuthenticated ? (
              isStudent ? (
                <Leave />
              ) : (
                <AdminDashboard />
              )
            ) : (
              <SignInUpPage />
            )
          }
        />
        <Route
          path="/adminpage"
          element={
            isAuthenticated ? (
              isStudent ? (
                <Home />
              ) : (
                <AdminDashboard />
              )
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="*"
          element={
            <div
              style={{
                height: "100vh",
                width: "100wh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              404 | Page Not Found!
            </div>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
      {isAuthenticated && isStudent && <Footer />}
    </Router>
  );
}

export default AppRoutes;
