import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Comments from "../components/Comments";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { format } from "timeago.js";
import { subscription } from "../redux/userSlice";
import Recommendation from "../components/Recommendation";

const Container = styled.div`
  display: flex;
  gap:15px;
  @media screen and (max-width:1100px) {
    flex-direction:column;
  }
`;

const Content = styled.div`
  flex: 5;
  
`;
const VideoWrapper = styled.div`
  border-radius:8px;
  margin-left:15px;

`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
  @media screen and (max-width: 768px) {
    font-size:16px;
}
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    font-size:12px;
}
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
  font-size:16px;
  @media screen and (max-width: 768px) {
    font-size:14px;
}
`;
const Btns = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius:20px;
  gap:10px;
  padding:6px 15px;
  background-color:${({ theme }) => theme.soft};
  @media screen and (max-width: 768px) {
    font-size:12px;
    pdding:4px 10px;
}
`;
const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    font-size:14px;
}
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;
const VerticalLine = styled.hr`
  border: none;
  border-left: 1px solid ${({ theme }) => theme.text}; 
  height: 15px; 
  margin: 0; 
`;




const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const ChannelImg = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #383838;
  color:white;
  display:flex;
  justify-content:center;
  align-items:center;
  font-size:18px;
  font-weight:400;
  @media screen and (max-width: 768px) {
    font-size:14px;
    height:30px;
    width:30px;
}
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
  @media screen and (max-width: 768px) {
    font-size:14px;
}
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
  @media screen and (max-width: 768px) {
    font-size:12px;
}
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 20px;
  height: max-content;
  padding: 10px 16px;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    font-size:12px;
}
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];

  const [channel, setChannel] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/videos/find/${path}`);
        const channelRes = await axios.get(
          `/users/find/${videoRes.data.userId}`
        );
        setChannel(channelRes.data);
        console.log(channelRes.data)
        dispatch(fetchSuccess(videoRes.data));
      } catch (err) { }
    };
    fetchData();
  }, [path, dispatch]);

  const handleLike = async () => {
    try {
      if (!currentUser) {
        alert("please sign in to like")
        return; // Exit the function to prevent further execution
      }
  
      await axios.put(`/users/like/${currentVideo._id}`);
      dispatch(like(currentUser._id));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle 401 error (Unauthorized) by redirecting to the sign-in page
        alert("please sign in to like")
      } else {
        // Handle other errors
        console.error("An error occurred:", error);
        // Display an error message or handle the error as needed
      }
    }
  };
  
  const handleDislike = async () => {
    try {
      if (!currentUser) {
        alert("please sign in to dislike")
        return; // Exit the function to prevent further execution
      }
  
      await axios.put(`/users/dislike/${currentVideo._id}`);
      dispatch(dislike(currentUser._id));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle 401 error (Unauthorized) by redirecting to the sign-in page
        alert("please sign in to dislike");
      } else {
        // Handle other errors
        console.error("An error occurred:", error);
        // Display an error message or handle the error as needed
      }
    }
  };
  
  const handleSub = async () => {
    try {
      if (!currentUser) {
        alert("please sign in to subscribe")
        return; // Exit the function to prevent further execution
      }
  
      currentUser.subscribedUsers.includes(currentVideo.userId)
        ? await axios.put(`/users/unsub/${currentVideo.userId}`)
        : await axios.put(`/users/sub/${currentVideo.userId}`);
  
      dispatch(subscription(currentVideo.userId));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("please sign in to subscribe")
      } else {
        console.error("An error occurred:", error);
      }
    }
  };
  

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo.videoUrl} controls />
        </VideoWrapper>
        <Title>{currentVideo.title}</Title>
        <Details>
          <Info>
            {currentVideo.views} views • {format(currentVideo.createdAt)}
          </Info>

          <Buttons>
            <Btns>
              <Button onClick={handleLike}>
                {currentVideo.likes?.includes(currentUser?._id) ? (
                  <ThumbUpIcon />
                ) : (
                  <ThumbUpOutlinedIcon />
                )}{" "}
                {currentVideo.likes?.length}
              </Button>
              <VerticalLine />
              <Button onClick={handleDislike}>
                {currentVideo.dislikes?.includes(currentUser?._id) ? (
                  <ThumbDownIcon />
                ) : (
                  <ThumbDownOffAltOutlinedIcon />
                )}{" "}
              </Button>
            </Btns>
            <Btns>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            </Btns>
            <Btns>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
            </Btns>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
          <ChannelImg>{channel.name?.[0]?.toUpperCase()}</ChannelImg>

            <ChannelDetail>
              <ChannelName>{channel.name} </ChannelName>
              <ChannelCounter>{ channel.subscribers} subscibers</ChannelCounter>
              <Description>channel desc:{currentVideo.desc}</Description>
            </ChannelDetail>
          </ChannelInfo>
          {(currentUser && currentUser.subscribedUsers) ? (
            <Subscribe onClick={handleSub}>
              {currentUser.subscribedUsers?.includes(currentVideo.userId)
                ? "SUBSCRIBED"
                : "SUBSCRIBE"}
            </Subscribe>) : (
            <Subscribe onClick={handleSub} >
              SUBSCRIBE
            </Subscribe>
          )}
        </Channel>
        <Hr />
        <Comments videoId={currentVideo._id} />
      </Content>
      <Recommendation tags={currentVideo.tags} />
    </Container>
  );
};

export default Video;