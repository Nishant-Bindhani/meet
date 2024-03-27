import EventsNear from "../components/HomePageComponents/EventsNear.jsx";
import Footer from "../components/HomePageComponents/Footer.jsx";
import Hero from "../components/HomePageComponents/Hero.jsx";
import Nav from "../components/HomePageComponents/Nav.jsx";
import UpComingEvents from "../components/HomePageComponents/UpComingEvents.jsx";
import "../index.css";

const Home = () => {
  return (
    <div>
      <Nav />
      <Hero />
      <UpComingEvents />
      <EventsNear />
      <Footer />
    </div>
  );
};

export default Home;
