import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Container = styled.div`
    height:100%;
    width:100%;
    background-color:#000000a7;
    color: ${({ theme }) => theme.text};
    position:absolute;
    top:0;
    left:0;
    display:flex;
    align-items:center;
    justify-content:center;
    z-index:999
`;

const Wrapper = styled.div`
    height:600px;
    width:600px;
    background-color:${({ theme }) => theme.bgLighter};
    color:${({ theme }) => theme.text};
    display:flex;
    flex-direction:column;
    position:relative;
    border-radius:5px;
    padding:20px;
    gap:20px;
    z-index:999;
`;



const Close = styled.div`
    position:absolute;
    top:10px;
    right:20px;
    cursor:pointer;
    font-size:1.5rem;
    padding:5px 10px;
    &:hover {
        background-color: #3ea6ff;
        border-radius:50%; 
        &::after {
          content:"Close";
          background-color:${({ theme }) => theme.soft};
          color:${({ theme }) => theme.text};
          position:absolute;
          padding:10px;
          border-radius:5px;
          opacity:1;
          font-size:12px;
          top:40px;

        }
      }
    `;

const Title = styled.h1`
    text-align:center;
    
`;

const Input = styled.input`
    color:${({ theme }) => theme.text};
    border: 1px solid ${({ theme }) => theme.soft};
    border-radius:5px;
    background-color:transparent;
    padding:10px;
`;
const Desc = styled.textarea`
    color:${({ theme }) => theme.text};
    border: 1px solid ${({ theme }) => theme.soft};
    border-radius:5px;
    background-color:transparent;
    padding:10px;
`;
const Button = styled.button`
    color:${({ theme }) => theme.textSoft};
    background-color:${({ theme }) => theme.soft};
    border-radius:5px;
    border:none;
    cursor:pointer;
    padding:10px 20px;
    &:hover{
        background-color:#380303;
        }
`;

const Label = styled.label`
    font-sixze:14px;
`;

const Upload = ({ setOpen }) => {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => { },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/videos", { ...inputs, tags });
      setOpen(false);
      res.status===200 && navigate(`/video/${res.data._id}`)
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };


  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>X</Close>
        <Title>Upload a New Video</Title>
        <Label>Video:</Label>
        {videoPerc > 0 ? (
          "Uploading:" + videoPerc
        ) : (
          <Input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        )}
        <Input
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
        />
        <Desc
          placeholder="Description"
          name="desc"
          rows={8}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Separate the tags with commas."
          onChange={handleTags}
        />
        <Label>Image:</Label>
        {imgPerc > 0 ? (
          "Uploading:" + imgPerc + "%"
        ) : (
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
        )}
        <Button onClick={handleUpload}>Upload</Button>
      </Wrapper>
    </Container>
  );
};

export default Upload;