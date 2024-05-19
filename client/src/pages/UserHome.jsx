import AttendingEvents from "../components/HomePageComponents/AttendingEvents.jsx";
import EventsNear from "../components/HomePageComponents/EventsNear.jsx";
import Footer from "../components/HomePageComponents/Footer.jsx";
import Hero from "../components/HomePageComponents/Hero.jsx";

import OrgNav from "../components/HomePageComponents/OrgNav.jsx";
import UserNav from "../components/HomePageComponents/UserNav.jsx";

const UserHome = () => {
  return (
    <div>
      <UserNav />
      <Hero />
      <EventsNear />
      <AttendingEvents />
      <Footer />
    </div>
  );
};

export default UserHome;
