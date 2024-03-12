import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import axios from "axios";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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
  font-size:22px;
  font-weight:400;
  @media screen and (max-width: 768px) {
    font-size:14px;
    width:30px;
    height:30px;
}
`;


const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchComments();
  }, [videoId]);


  const handleAddComment = async () => {
    try {
      //exit from acessing the below the user is not logged in
      if(!currentUser){
        alert("please login to comment")
        return;
      }

      const newCommentData = {
        desc:newCommentText,
        videoId:videoId
      }
      const res = await axios.post(`/comments`, newCommentData);
      const newComment = res.data;
      setComments(()=> [newComment,...comments]);
      setNewCommentText("");
    } catch (err) {
      console.log(err);
    }
  };
  const handlekeyDown = (event)=>{
    if(event.key==="Enter"){
      event.preventDefault();
      handleAddComment();
    }
  }

  return (
    <Container>
      <NewComment>
      <ChannelImg>{currentUser?(currentUser.name.charAt(0).toUpperCase()):("x")}</ChannelImg>

        <Input
          placeholder="Add a comment..."
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          onKeyDown = {handlekeyDown}
        />
      </NewComment>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
};

export default Comments;
