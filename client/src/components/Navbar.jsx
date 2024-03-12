import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import LightModeIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined';
//import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import YoutubeIcon from '../img/logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';
import Upload from './Upload';

const Container = styled.div`
    position:sticky;
    top:0;
    background-color: ${({ theme }) => theme.bgLighter};
    height:60px;
    position:sticky;
    z-index:99;
  
  `
const Wrapper = styled.div`
    display:flex;
    justify-content:flex-end;
    align-itmes:center;
    height;100%;
    padding : 0px 20px;
    position: relative;
    @media screen and (max-width: 768px) {
      padding: 0px 10px;
  }
    
  `
const Search = styled.div`
    width: 35%;
    margin:10px auto 10px auto;
    display: flex;
    justify-content: start;
    padding:5px 15px;
    border: 1px solid #545353;
    border-radius: 20px;
    color:${({ theme }) => theme.text} ;
    &:active {
      border-color: #3ea6ff;
    }
    @media screen and (max-width: 768px) {
      width:30%;
  }
  `;

const Input = styled.input`
    background-color:transparent;
    width:340px;
    border:none;
    padding: 5px;
    margin-left :8px;
    outline:none;
    color:${({ theme }) => theme.text} ;
  `
const Button = styled.button`
    margin-top:5px;
    padding: 5px 15px;
    background-color: transparent;
    border: 1px solid #3ea6ff;
    color: #3ea6ff;
    border-radius: 20px;
    font-weight: 400;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    &:hover {
      background-color: #4086c2;
      color: white;
    }
    @media screen and (min-width: 700px) and (max-width:850px){
      margin-left:1px;
    }
  `;
const Logo = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: bold;
    color: ${({ theme }) => theme.text};
    margin-top:15px;
`;
const Span = styled.h2`
  font-size:16px;
  margin:0;
  @media screen and (max-width: 768px) {
    display: none; 
}
`;

const HamburgerIcon = styled(MenuRoundedIcon)`
  align-items:center;
  margin-top:15px;
  gap:10px;
  cursor:pointer;
  color:${({ theme }) => theme.text};
  font-weight:300;
  margin-right:10px;
  
  &:hover{
    background-color:grey;
    border-radius:50%;
  }
  
`;
const Img = styled.img`
    height: 25px;
    
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
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
  font-size:16px;
  font-weight:400;
  text-transform:uppercase;
`;

const Item = styled.div`
  width:36px;
  height:36px;
  background-color:black;
  color:white;
  border-radius:50%;
  display:flex;
  justify-content:center;
  align-items:center;
  cursor:pointer;
  background-color:${({ theme }) => theme.soft};
  color:${({ theme }) => theme.text};
  `
  ;

const UploadIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  &:hover {
    background-color: ${({ theme }) => theme.soft};
    &::after {
      content:"Upload video";
      background-color:${({ theme }) => theme.soft};
      color:${({ theme }) => theme.text};
      position:absolute;
      padding:10px;
      border-radius:5px;
      opacity:1;
      font-size:12px;
      top:40px;
      right:60px;
      transform: translateX(-50%);
    }
  }
  display:flex;
  align-items:center;
  justify-content:center;
  cursor:pointer;
`;

const SearchIcon = styled(SearchOutlined)`
  cursor: pointer;
`;



const Navbar = ({ toggleMenu, setToggleMenu, darkMode, setDarkMode }) => {

  const navigate = useNavigate()
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  }

  const handlekeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      navigate(`/search?q=${q}`)
    }
  }

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    if (windowWidth <=1000) {
      setToggleMenu(false)
      console.log('Window size is 800px');
    }
  }, [windowWidth,setToggleMenu]);
  return (
    <>
      <Container>
        <Wrapper>
          <HamburgerIcon onClick={() => { setToggleMenu(!toggleMenu) }} />
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Logo>
              <Img src={YoutubeIcon} />
              <Span>VideoTube</Span>
            </Logo>
          </Link>
          <Search>
            <SearchIcon onClick={() => navigate(`/search?q=${q}`)} />
            <Input placeholder="search"
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={handlekeyDown}
            />

          </Search>
          <User>
            <Item onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <DarkModeIcon fontSize='small' /> : <LightModeIcon fontSize='small' />}
            </Item>

            {currentUser ? (
              <User>
                <UploadIcon onClick={() => setOpen(true)}><VideoCallOutlinedIcon /></UploadIcon>
                <Avatar>{currentUser.name.charAt(0).toUpperCase()}</Avatar>
                <Button onClick={handleLogout}>Logout</Button>
              </User>

            ) : (<Link to="Signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                Sign in
              </Button>
            </Link>
            )}
          </User>
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>

  )
}

export default Navbar