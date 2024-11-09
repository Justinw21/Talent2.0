import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <section className="relative flex flex-col items-center justify-center h-screen w-full bg-black text-white p-6">
      <div className="text-center max-w-2xl">
        <div className="bg-orange-500 text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
          Talent 2.0
        </div>
        <h1 className="text-4xl font-bold mb-4">Potluck: The Community-Driven Personalized Interview Platform</h1>
        <p className="text-lg mb-6">
          Elevate your hiring process with a personalized, candidate-centered experience that fosters genuine connections, aiming for long-term success.
        </p>
        <Button
          className="bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-primary-foreground"
          onClick={() => navigate('/Pots')}
        >
          Post
        </Button>
      </div>
    </section>
  );
};

export default Landing;