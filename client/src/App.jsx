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
import UpdateEventPage from "./components/Organiser/UpdateEventPage";
import UpdateUser from "./components/User/UpdateUser";
import UpdateOrg from "./components/Organiser/UpdateOrg";
import ShowEvent from "./components/Organiser/ShowEvent";
import { PrivateRoute } from "./Routes/PrivateRoute";
import { AdminRoute } from "./Routes/AdminRoute";
function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events/:title/:state/:id" element={<MainEventPage />} />
          <Route
            path="/search/:slugTitle/:slugState"
            element={<EventSearchPage />}
          />

          <Route path="/user" element={<PrivateRoute />}>
            <Route path="home" element={<UserHome />} />
            <Route path="update-user" element={<UpdateUser />} />
            <Route
              path="events/:title/:state/:id"
              element={<MainEventPage />}
            />
            <Route path="pay/:title/:price/:id" element={<PaymentScreen />} />
            <Route
              path="search/:slugTitle/:slugState"
              element={<EventSearchPage />}
            />
          </Route>
          {/* <Route path="/user/update-user" element={<UpdateUser />} /> */}
          {/* <Route
            path="/user/events/:title/:state/:id"
            element={<MainEventPage />}
          /> */}
          {/* <Route
            path="/user/pay/:title/:price/:id"
            element={<PaymentScreen />}
          /> */}

          {/* <Route
            path="/user/search/:slugTitle/:slugState"
            element={<EventSearchPage />}
          /> */}

          <Route path="/org-login" element={<OrgLogin />} />
          <Route path="/org-register" element={<OrgRegister />} />

          <Route path="/org" element={<AdminRoute />}>
            <Route path="home" element={<OrgHome />} />
            <Route path="update-org" element={<UpdateOrg />} />
            <Route path="create-form" element={<CreateEventForm />} />
            <Route path="update-event/:id" element={<UpdateEventPage />} />
            <Route path="show-event/:id" element={<ShowEvent />} />
          </Route>
          {/* <Route path="/org/update-org" element={<UpdateOrg />} /> */}

          {/* <Route path="/org/create-form" element={<CreateEventForm />} />
          <Route path="/org/update-event/:id" element={<UpdateEventPage />} />
          <Route path="/org/show-event/:id" element={<ShowEvent />} /> */}

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
