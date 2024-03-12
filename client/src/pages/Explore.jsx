import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content:start;
  top:0;
  padding-top:0;
  gap:10px;
  height:100vh;
  @media screen and (max-width:1000x) {
    justify-content:start;
}
`;
const Div = styled.div`
top:0;
left:0;
color:${({ theme }) => theme.text}
`;

const Title = styled.h1`
    font-size:28px;
    font-weight:400;
`;

const Explore = ({ menuquery }) => {
    const [videos, setVideos] = useState([]);

    const fetchVideos = async () => {
        console.log("Called", menuquery)
        const res = await axios.get(`/videos/search?q=${menuquery}`);
        setVideos(res.data);
    };

    useEffect(() => {
        fetchVideos();
    }, [menuquery]);

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
        <Div>
            <Title>{menuquery}</Title>
            <Container>
                {videos.map((video) => (
                    <Card key={video._id} video={video}
                    onClick={() => handleIncrementView(video._id)} />
                ))}
            </Container>
        </Div>

    );
};

export default Explore;