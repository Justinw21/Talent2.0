import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AOS from "aos";
import "aos/dist/aos.css";

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800, // Animation duration in milliseconds
      once: true, // Whether animation should happen only once
    });
  }, []);

  return (
    <div className="bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <section className="relative flex flex-col lg:flex-row items-center justify-center min-h-screen w-full p-3">
        <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl">
          <div className="text-left max-w-2xl lg:mr-8" data-aos="fade-right">
            <div className="bg-gray-300 text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
              Talent 2.0
            </div>
            <h1 className="text-4xl font-bold mb-4 text-center lg:text-left">
              Potluck: The Community-Driven Personalized Interview Platform
            </h1>
            <p className="text-lg mb-6 text-center lg:text-left">
              Enhance hiring with a personalized, candidate-focused approach
              that builds authentic connections for lasting success.
            </p>
            <div className="flex justify-center lg:justify-start">
              <Button
                className="bg-gray-800 text-white font-semibold px-6 py-2 rounded-lg hover:bg-gray-700"
                onClick={() => navigate("/Pots")}
              >
                Contact Us
              </Button>
            </div>
          </div>
          <div
            className="text-left content-center mt-8 lg:mt-0"
            data-aos="fade-left"
          >
            {/* Placeholder for Hero Image */}
            <img src="./public/logo.png" alt="logo" className="w-3/4 h-auto" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="p-6">
        <h2 className="text-3xl font-bold mb-6 text-center" data-aos="fade-up">
          Features
        </h2>
        <div className="flex flex-wrap justify-center">
          {/* Feature 1 */}
          <div
            className="max-w-sm m-4 p-6 bg-white rounded-lg shadow-md"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <h3 className="text-xl font-semibold mb-2">
              Personalized Interviews
            </h3>
            <p>
              Customizable interview processes tailored to each candidate's
              unique profile.
            </p>
          </div>
          {/* Feature 2 */}
          <div
            className="max-w-sm m-4 p-6 bg-white rounded-lg shadow-md"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <h3 className="text-xl font-semibold mb-2">Community-Driven</h3>
            <p>
              Leverage community insights to improve hiring strategies and
              candidate experience.
            </p>
          </div>
          {/* Feature 3 */}
          <div
            className="max-w-sm m-4 p-6 bg-white rounded-lg shadow-md"
            data-aos="zoom-in"
            data-aos-delay="300"
          >
            <h3 className="text-xl font-semibold mb-2">
              Authentic Connections
            </h3>
            <p>
              Build lasting relationships with candidates through genuine
              engagement.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="p-6 bg-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-center" data-aos="fade-up">
          How It Works
        </h2>
        <div className="flex flex-wrap justify-center">
          {/* Step 1 */}
          <div
            className="max-w-sm m-4 p-6"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="text-5xl mb-2">1</div>
            <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
            <p>
              Create an account to start customizing your interview process.
            </p>
          </div>
          {/* Step 2 */}
          <div
            className="max-w-sm m-4 p-6"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="text-5xl mb-2">2</div>
            <h3 className="text-xl font-semibold mb-2">Customize</h3>
            <p>
              Use our tools to tailor interviews to match each candidate's
              profile.
            </p>
          </div>
          {/* Step 3 */}
          <div
            className="max-w-sm m-4 p-6"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="text-5xl mb-2">3</div>
            <h3 className="text-xl font-semibold mb-2">Connect</h3>
            <p>Engage with candidates and build authentic connections.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="p-6">
        <h2 className="text-3xl font-bold mb-6 text-center" data-aos="fade-up">
          Testimonials
        </h2>
        <div className="flex flex-wrap justify-center">
          {/* Testimonial 1 */}
          <div
            className="max-w-md m-4 p-6 bg-white rounded-lg shadow-md"
            data-aos="flip-left"
            data-aos-delay="100"
          >
            <p className="italic">
              "Potluck transformed our hiring process, making it more personal
              and effective."
            </p>
            <p className="mt-4 font-semibold">- Jane Doe, HR Manager</p>
          </div>
          {/* Testimonial 2 */}
          <div
            className="max-w-md m-4 p-6 bg-white rounded-lg shadow-md"
            data-aos="flip-left"
            data-aos-delay="200"
          >
            <p className="italic">
              "A game-changer for candidate engagement and recruitment success."
            </p>
            <p className="mt-4 font-semibold">
              - John Smith, Talent Acquisition Lead
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="p-6 bg-gray-300">
        <h2 className="text-3xl font-bold mb-4 text-center" data-aos="fade-up">
          Ready to Enhance Your Hiring Process?
        </h2>
        <div className="flex justify-center" data-aos="zoom-in">
          <Button
            className="bg-gray-800 text-white font-semibold px-6 py-2 rounded-lg hover:bg-gray-700"
            onClick={() => navigate("/Pots")}
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-6 bg-gray-100 text-center">
        <p>&copy; {new Date().getFullYear()} Potluck. All rights reserved.</p>
        <div className="mt-4">
          {/* Social Media Links */}
          <a href="#" className="mx-2 text-gray-600 hover:text-gray-800">
            Twitter
          </a>
          <a href="#" className="mx-2 text-gray-600 hover:text-gray-800">
            LinkedIn
          </a>
          <a href="#" className="mx-2 text-gray-600 hover:text-gray-800">
            Facebook
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
