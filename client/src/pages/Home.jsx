import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content:space-between;
  align-items:center;
  gap:10px;
  @media screen and (max-width:1000x) {
    justify-content:center;
}
`;

const Home = ({type}) => {
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    console.log("Called", type)
    const res = await axios.get(`/videos/${type}`);
    setVideos(res.data);
  };

  useEffect(() => {
    fetchVideos();
  },[type]);

  //increasin view
  const handleIncrementView = async(videoId)=>{
    try{
      console.log("Incrementing view for videoId:", videoId);
      await axios.put(`/videos/view/${videoId}`)
    }catch(err){
      console.log("error incr views",err)
    }
  }

  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} 
        onClick={() => handleIncrementView(video._id)}
        />
      ))}
    </Container>
  );
};

export default Home;