import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { format } from "timeago.js";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.div`
  width:32px;
  height:32px;
  background-color:black;
  color:white;
  border-radius:50%;
  display:flex;
  justify-content:center;
  align-items:center;
  font-size:20px;
  font-weight:400;
  @media screen and (max-width: 768px) {
    font-size:14px;
    width:28px;
    height:28px;
}
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text}
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
  @media screen and (max-width: 768px) {
    font-size:12px;
}
  
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

const Comment = ({comment}) => {

  const { currentUser } = useSelector((state) => state.user);
  const [channel,setChannel] = useState({});


  useEffect(()=>{
    const fetchComment = async()=>{
      const res = await axios.get(`/users/find/${comment.userId}`);
      setChannel(res.data);
    };
    fetchComment();
  },[comment.userId]);

  return (
    <Container>
      <Avatar>{currentUser?currentUser.name.charAt(0).toUpperCase():'X'}</Avatar>
      <Details>
        <Name>
          {channel.name} <Date>{format(comment.createdAt)}</Date>
        </Name>
        <Text>
          {comment.desc}
        </Text>
      </Details>
    </Container>
  );
};

export default Comment;