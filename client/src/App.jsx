import "./App.css";
import OrgLogin from "./components/Organiser/OrgLogin";

import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserHome from "./pages/UserHome";
import PageNotFound from "./components/HomePageComponents/PageNotFound";
import OrgRegister from "./components/Organiser/OrgRegister";
import CreateEventForm from "./components/Organiser/CreateEventForm";
import EventSearchPage from "./components/EventPage/EventSearchPage";
import OrgHome from "./pages/OrgHome";
import MainEventPage from "./components/EventPage/MainEventPage";
import PaymentScreen from "./components/EventPage/PayementScreen";
function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events/:title" element={<MainEventPage />} />
          <Route path="/user" element={<UserHome />} />
          <Route path="/user/events/:title" element={<MainEventPage />} />
          <Route path="/user/pay/:title/:price" element={<PaymentScreen />} />
          <Route path="/pay/:title/:price" element={<PaymentScreen />} />

          <Route
            path="/user/search/:slugTitle/:slugState"
            element={<EventSearchPage />}
          />
          <Route path="/user/search/:slugState" element={<EventSearchPage />} />

          <Route path="/org-login" element={<OrgLogin />} />
          <Route path="/org-register" element={<OrgRegister />} />
          <Route path="/org" element={<OrgHome />} />
          <Route path="/org/events/:title" element={<MainEventPage />} />
          <Route path="/org/create-form" element={<CreateEventForm />} />
          <Route path="/org/pay/:title/:price" element={<PaymentScreen />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
