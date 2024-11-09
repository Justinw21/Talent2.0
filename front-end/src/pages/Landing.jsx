import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <section>
      <div>Hello, this is the Landing page!</div>
      <Button onClick={() => navigate('/post')}>
        Post Page
      </Button>
    </section>
  );
};

export default Landing;