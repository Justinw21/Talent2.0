import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Post = () => {
  const navigate = useNavigate();

  return (
    <section>
      <div>Hello, this is the Post page!</div>
      <Button onClick={() => navigate('/')}>
        Main Page
      </Button>
    </section>
  );
};

export default Post;