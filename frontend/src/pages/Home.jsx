import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaReact,
  FaNodeJs,
  FaJava,
  FaPython,
  FaDocker,
  FaAws,
} from "react-icons/fa";

import { SiMongodb, SiExpress } from "react-icons/si";

import heroImage from "../assets/images/hero.svg";
import "../assets/styles/home.css";

import { getJobs } from "../services/jobService";

import LatestJobs from "../components/LatestJobs";
import WhyChooseUs from "../components/WhyChooseUs";
import Footer from "../components/Footer";

function Home() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await getJobs();

      // Hide test jobs and show latest 3
      const latestJobs = data
        .filter(
          (job) =>
            job.title !== "1111111111" &&
            job.company !== "1111111111"
        )
        .slice(-3)
        .reverse();

      setJobs(latestJobs);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="container section-space">
        <div className="row align-items-center">

          <div className="col-lg-6">

            <span className="badge bg-primary mb-3 fs-6 px-3 py-2">
              🚀 Start Your Career Today
            </span>

            <h1 className="main-heading">
              Find Your <span className="text-primary">Dream Job</span>
            </h1>

            <p className="body-text mt-4">
              Discover thousands of opportunities from top companies
              and take the next step in your career with confidence.
            </p>

            <div className="mt-4 d-flex gap-3">

              <Link
                to="/jobs"
                className="btn btn-primary btn-lg px-4"
              >
                Browse Jobs
              </Link>

              <Link
                to="/register"
                className="btn btn-outline-primary btn-lg px-4"
              >
                Register
              </Link>

            </div>

          </div>

          <div className="col-lg-6 text-center">

            <img
              src={heroImage}
              alt="Hero"
              className="img-fluid hero-image"
              style={{ maxWidth: "90%" }}
            />

          </div>

        </div>
      </section>

      {/* Latest Jobs */}
      <LatestJobs jobs={jobs} />

      {/* Trending Technologies */}
      <section className="container section-space">

        <h2 className="section-heading text-center mb-5">
          🔥 Trending Technologies
        </h2>

        <div className="row">

          <div className="col-md-3 col-6 mb-4">
            <div className="card custom-card text-center p-4 h-100">
              <FaReact
                size={55}
                className="text-info mb-3"
              />
              <h5>React</h5>
            </div>
          </div>

          <div className="col-md-3 col-6 mb-4">
            <div className="card custom-card text-center p-4 h-100">
              <FaNodeJs
                size={55}
                className="text-success mb-3"
              />
              <h5>Node.js</h5>
            </div>
          </div>

          <div className="col-md-3 col-6 mb-4">
            <div className="card custom-card text-center p-4 h-100">
              <SiMongodb
                size={55}
                className="text-success mb-3"
              />
              <h5>MongoDB</h5>
            </div>
          </div>

          <div className="col-md-3 col-6 mb-4">
            <div className="card custom-card text-center p-4 h-100">
              <SiExpress
                size={55}
                className="mb-3"
              />
              <h5>Express.js</h5>
            </div>
          </div>

          <div className="col-md-3 col-6 mb-4">
            <div className="card custom-card text-center p-4 h-100">
              <FaJava
                size={55}
                className="text-danger mb-3"
              />
              <h5>Java</h5>
            </div>
          </div>

          <div className="col-md-3 col-6 mb-4">
            <div className="card custom-card text-center p-4 h-100">
              <FaPython
                size={55}
                className="text-primary mb-3"
              />
              <h5>Python</h5>
            </div>
          </div>

          <div className="col-md-3 col-6 mb-4">
            <div className="card custom-card text-center p-4 h-100">
              <FaAws
                size={55}
                className="text-warning mb-3"
              />
              <h5>AWS</h5>
            </div>
          </div>

          <div className="col-md-3 col-6 mb-4">
            <div className="card custom-card text-center p-4 h-100">
              <FaDocker
                size={55}
                className="text-primary mb-3"
              />
              <h5>Docker</h5>
            </div>
          </div>

        </div>

      </section>

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Home;