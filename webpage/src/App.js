import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PaymentPage from "./pages/PaymentPage";
import Header from "./components/Header";
import Goals from "./pages/Goals";
import Project from "./pages/Project";
import ProjectPage from "./pages/ProjectsPage";
import DonationPage from "./pages/DonationPage";
import AuthPage from "./pages/AuthPage";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ContactPage from "./pages/ContactPage";
import PartnersSection from "./pages/PartnersSection";
import GiftShopping from "./pages/GiftShopping";
import "./index.css";
const stripePromise = loadStripe(
  "pk_test_51PDscFAKfyGzdYwI9oddBx3Spo9KHO49E61e5OY1fHMKQeJZa9FfyFJZvxTVvS9NhCU4mGaX6eEW7RRqWhaoABqv00lk3TpXL7"
);

function App() {
  return (
    <Elements stripe={stripePromise}>
      <div className="App w-full grid">
        <div className="w-full ">
          <Header />
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/partners" element={<PartnersSection />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/auth-page" element={<AuthPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/gift-shopping" element={<GiftShopping />} />
          <Route path="/projects/:id" element={<Project />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/donate" element={<DonationPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </div>
    </Elements>
  );
}

export default App;
