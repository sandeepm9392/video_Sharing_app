import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";

const Container = styled.div`
  flex:2;
  @media screen and (min-width:900px) and (max-width:1200px){
    flex:1.5;
  }
`;

const Recommendation = ({ tags }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/videos/tags?tags=${tags}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [tags]);

  //increasin view
  const handleIncrementView = async (videoId) => {
    try {
      console.log("Incrementing view for videoId:", videoId);
      await axios.put(`/videos/view/${videoId}`)
    } catch (err) {
      console.log("error incr views", err)
    }
  }

  return (
    <Container>
      {videos.map((video) => (
        <Card type="sm" key={video._id} video={video}
          onClick={() => handleIncrementView(video._id)} />
      ))}
    </Container>
  );
};

export default Recommendation;