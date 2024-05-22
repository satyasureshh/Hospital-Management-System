/* eslint-disable react/no-unescaped-entities */
import Header from "../components/header";
import { Link } from "react-router-dom";

import "../styles/Homepage.css";
import FlexCard from "../components/Home-flex";
import hfimg1 from "../assets/stethes.svg";
import hfimg2 from "../assets/medhist.svg";
import hfimg3 from "../assets/bed.svg";
import hfimg4 from "../assets/pills.svg";
import doc1 from "../assets/johnny1.jpg";
import doc2 from "../assets/johnny2.jpeg";
import doc3 from "../assets/doc1.jpg";

const Homepage = () => {
  const f4card1 = {
    id: 1,
    dbfoimg: hfimg2,
    dbforole: "Appointments",
    dbfoposcnt: "to",
    dbfoposcnt2: "Schedule",
  };

  const f4card2 = {
    id: 2,
    dbfoimg: hfimg1,
    dbforole: "Consultation",
    dbfoposcnt: "with",
    dbfoposcnt2: "Doctors",
  };

  const f4card3 = {
    id: 3,
    dbfoimg: hfimg3,
    dbforole: "Referrals",
    dbfoposcnt: "for",
    dbfoposcnt2: "Tests",
  };

  const f4card4 = {
    id: 4,
    dbfoimg: hfimg4,
    dbforole: "Prescription",
    dbfoposcnt: "for",
    dbfoposcnt2: "Medicines",
  };

  const f4cards = [f4card1, f4card2, f4card3, f4card4];

  return (
    <>
      <Header />
      <div className="background-img">
        <div className="login-signup">
          <div className="d-flex gap-2 justify-content-center py-5">
            <Link
              to="/Login"
              className="btn btn-primary d-inline-flex align-items-center"
              type="button"
            >
              Login
            </Link>
            <Link
              to="Register"
              className="btn btn-outline-secondary d-inline-flex align-items-center"
              type="button"
            >
              Register
            </Link>
          </div>
        </div>
        <div className="welcome-message">
          <h1>Your Journey to Wellness Begins Here</h1>
        </div>
        <div className="flex-4">
          {f4cards.map((ffocard, index) => (
            <div key={f4cards.id} className={`f4card-${index + 1}`}>
              {
                <FlexCard
                  key={ffocard.id}
                  dbfoimg={ffocard.dbfoimg}
                  dbforole={ffocard.dbforole}
                  dbfoposcnt={ffocard.dbfoposcnt}
                  dbfoposcnt2={ffocard.dbfoposcnt2}
                />
              }
            </div>
          ))}
        </div>

        <div className="about">
          <div className="img-1">
            <img src={doc1} alt="doctor-img1"></img>
          </div>

          <p>
            The cutting-edge health care panorama affords countless challenges
            for each hospitals and sufferers, especially when it comes to
            reserving appointments. At a time of growing call for fitness
            services, the need for custom designed solutions is turning into an
            increasing number of obvious. The predominant goal of this mission
            is to increase a reliable and consumer-friendly internet software
            that permits seamless control of appointments whilst providing easy
            access to crucial fitness facts. Several key regulations could be
            evaluated and applied to reap this intention.
          </p>

          <div className="img-2">
            <img src={doc2} alt="doctor-img2"></img>
          </div>
          <div className="img-3">
            <img src={doc3} alt="doctor-img2"></img>
          </div>
          <p>
            The Hospital Management System targets to provide complete answers
            to the issues faced with the aid of hospitals and sufferers. Through
            cautious design, development and checking out, we intention to
            contribute substantially to the healthcare industry's ongoing
            efforts to provide great healthcare in an increasingly complex
            environment. Kubernetes orchestration on GCP permits availability,
            scale, and fault tolerance. CI/CD pipelines simplify development and
            deployment, while monitoring and logging tools will let you screen
            machine conduct and protection.
          </p>
        </div>

        <div className="footer">
          <footer className="py-3 my-4">
            <ul className="nav justify-content-center border-bottom pb-3 mb-3">
              <li className="nav-item">
                <a href="#" className="nav-link px-2 text-body-secondary">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link px-2 text-body-secondary">
                  Specialties
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link px-2 text-body-secondary">
                  Diagnosis
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link px-2 text-body-secondary">
                  FAQs
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link px-2 text-body-secondary">
                  About
                </a>
              </li>
            </ul>
            <p className="text-center text-body-secondary">
              © 2024 Hospitals, Org
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Homepage;
