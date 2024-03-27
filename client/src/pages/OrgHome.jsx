import EventsNear from "../components/HomePageComponents/EventsNear.jsx";
import Footer from "../components/HomePageComponents/Footer.jsx";
import Hero from "../components/HomePageComponents/Hero.jsx";
import Nav from "../components/HomePageComponents/Nav.jsx";
import OrgNav from "../components/HomePageComponents/OrgNav.jsx";
import UpComingEvents from "../components/HomePageComponents/UpComingEvents.jsx";

const OrgHome = () => {
  return (
    <div>
      <OrgNav />
      <Hero />
      <UpComingEvents />
      <EventsNear />
      <Footer />
    </div>
  );
};

export default OrgHome;
