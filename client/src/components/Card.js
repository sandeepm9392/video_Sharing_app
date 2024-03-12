import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { Link } from 'react-router-dom'
import axios from 'axios';
// import channelimg from '../img/channel.webp'
// import videoimg from '../img/page.png'
import { format } from "timeago.js"

const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "360px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap:10px;
  @media screen and (min-width:1440px){
    width:360px;
  }
  @media screen and (min-width:500px) and (max-width:700px){
    width: ${(props) => (props.type === "sm" ? "400px" : "360px")};
  }
  @media screen and (min-width:700px) and (max-width:1100px){
    width: ${(props) => (props.type === "sm" ? "550px" : "360px")};
  }
`;

const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "100px" : "202px")};
  background-color: #999;
  flex:1;
  border-radius:8px;
  @media screen and (max-width:1100px){
    height: ${(props) => (props.type === "sm" ? "150px;" : "202px")};
  }
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex:1.5;
  @media screen and (max-width:1100px){
    flex:2.5;
  }
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  @media screen and (max-width:1100px){
    font-size:14px;
  }
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
  @media screen and (max-width:1100px){
    font-size:12px;
  }
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  @media screen and (max-width:1100px){
    font-size:12px;
  }
`;

const ChannelImg = styled.div`
  width:32px;
  height:32px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color:white;
  border-radius:50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size:22px;
  font-weight:400;
  text-transform:uppercase;
  display: ${(props) => props.type === "sm" && "none"};
`;


const Card = ({ type, video,onClick }) => {
  const [channel, setChannel] = useState({});

  const handleClick = ()=>{
    if(onClick){
      onClick();
    }
  }

  useEffect(() => {
    if (video && video.userId) {
      const fetchChannel = async () => {
        try {
          const res = await axios.get(`/users/find/${video.userId}`);
          setChannel(res.data);
        } catch (error) {
          console.error('Error fetching channel:', error);
        }
      };
      fetchChannel();
    }
  }, [video]);

  if (!video || !video.userId) {
    return null;
  }

  const channelInitial = channel.name? channel.name.charAt(0).toUpperCase():'';
  const backgroundColor = `hsl(${channelInitial.charCodeAt(0) * 100 % 360}, 100%, 30%)`;

  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
      <Container type={type} onClick={handleClick} >
        <Image type={type} src={video.imgUrl} />
        <Details type={type} >
          <ChannelImg type={type} backgroundColor={backgroundColor} >{channelInitial}</ChannelImg>
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName >{channel.name}</ChannelName>
            <Info>{video.views}views.{format(video.createdAt)}</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  )
}

export default Card