import Footer from "../components/HomePageComponents/Footer.jsx";
import Hero from "../components/HomePageComponents/Hero.jsx";

import OrgNav from "../components/HomePageComponents/OrgNav.jsx";

import OrgEvents from "../components/Organiser/OrgEvents.jsx";

const OrgHome = () => {
  return (
    <div>
      <OrgNav />
      <Hero />
      <OrgEvents />
      <Footer />
    </div>
  );
};

export default OrgHome;
