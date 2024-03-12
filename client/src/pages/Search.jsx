import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Card from '../components/Card';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content:space-between;
  align-items:center;
  height:85vh;
  gap:10px;
  @media screen and (max-width:1000x) {
    justify-content:center;
}
`;

const Search = () => {
    const [videos, setVideos] = useState([]);
    const query = useLocation().search;

    useEffect(() => {
        const fetchVideos = async () => {
            const res = await axios.get(`/videos/search${query}`)
            setVideos(res.data)
        };
        fetchVideos();
    }, [query])

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
            {videos.map(video => (
                <Card key={video._id} video={video}
                    onClick={() => handleIncrementView(video._id)} />
            ))}
        </Container>
    )
}

export default Search;