import React from 'react'
import styled from 'styled-components'
import HomeIcon from '@mui/icons-material/HomeOutlined';
import ExploreIcon from '@mui/icons-material/ExploreOutlined';
import SubscriptionsIcon from '@mui/icons-material/SubscriptionsOutlined';
// import LibraryAddIcon from '@mui/icons-material/LibraryAddOutlined';
// import HistoryIcon from '@mui/icons-material/HistoryOutlined';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import NewspaperIcon from '@mui/icons-material/NewspaperOutlined';
import LightbulbIcon from '@mui/icons-material/LightbulbOutlined';
import StyleIcon from '@mui/icons-material/StyleOutlined';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusicOutlined';
import SportsIcon from '@mui/icons-material/SkateboardingOutlined';
import GamingIcon from '@mui/icons-material/SportsEsportsOutlined';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutlineOutlined';
import LiveTvIcon from '@mui/icons-material/LiveTvOutlined';
import MovieIcon from '@mui/icons-material/MovieOutlined';
import ReportIcon from '@mui/icons-material/ReportOutlined';
import LightModeIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined';
import { Link } from 'react-router-dom'


const Container = styled.div`
    flex:1.3;
    background-color: ${({ theme }) => theme.bgLighter};
    color:${({ theme }) => theme.text};
    height:100vh;
    top:0;
    overflow-y:auto;
    position:sticky;
    @media screen and (max-width: 500px) {
        flex:2.5;
    }
    @media screen and (min-width: 600px) and (max-width:900px){
        flex:2;
        font-size:13px;
      }

`
const Wrapper = styled.div`
    padding: 18px 26px;
    font-size:16px;
    @media screen and (max-width: 768px) {
        padding:10px;
        font-size:14px;
    }
    @media screen and (max-width: 768px) {
        padding:8px;
        font-size:12px;
    }
`
const Item = styled.div`
    display:flex;
    align-items:center;
    padding:7.5px 0px;
    border-radius:6px;
    gap:20px;
    cursor:pointer;
    transition: background-color color .3s ease;
    &:hover{
        background-color:${({ theme }) => theme.soft};
        color:red;
    }
    &:active {
        background-color:${({ theme }) => theme.soft};
        color:red;
    }
   `;
const Hr = styled.hr`

    margin 15px 0px;
    border-color: ${({ theme }) => theme.soft};
    @media screen and (max-width: 768px) {
        margin: 10px 0px;
    }
`;

const Content = styled.div`
    font-size:13px;
    color:grey;
    margin-top:10px;
`;

const Menu = ({ darkMode, setDarkMode }) => {
    return (
        <Container>
            <Wrapper>
                
                <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                    <Item>
                        <HomeIcon fontSize='small' />
                        Home
                    </Item>
                </Link>
                <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>
                    <Item>
                        <ExploreIcon fontSize='small' />
                        Explore
                    </Item>
                </Link>
                <Link to="subscriptions" style={{ textDecoration: "none", color: "inherit" }}>
                    <Item>
                        <SubscriptionsIcon fontSize='small' />
                        subscription
                    </Item>
                </Link>
                <Hr />
                <Link to="music" style={{ textDecoration: "none", color: "inherit" }}>
                    <Item>
                        <LibraryMusicIcon fontSize='small' />
                        Music
                    </Item>
                </Link>
                <Link to="shopping" style={{ textDecoration: "none", color: "inherit" }}>
                    <Item>
                        <ShoppingBagIcon fontSize='small' />
                        Shopping
                    </Item>
                </Link>
                <Link to="sports" style={{ textDecoration: "none", color: "inherit" }}>
                    <Item>
                        <SportsIcon fontSize='small' />
                        Sports
                    </Item>
                </Link>
                <Link to="gaming" style={{ textDecoration: "none", color: "inherit" }}>
                    <Item>
                        <GamingIcon fontSize='small' />
                        gaming
                    </Item>
                </Link>
                <Link to="education" style={{ textDecoration: "none", color: "inherit" }}>
                    <Item>
                        <LightbulbIcon fontSize='small' />
                        Education
                    </Item>
                </Link>

                <Link to="news" style={{ textDecoration: "none", color: "inherit" }}>
                    <Item>
                        <NewspaperIcon fontSize='small' />
                        News
                    </Item>
                </Link>

                <Link to="movies" style={{ textDecoration: "none", color: "inherit" }}>
                    <Item>
                        <MovieIcon fontSize='small' />
                        Movies
                    </Item>
                </Link>
                <Link to="fashion" style={{ textDecoration: "none", color: "inherit" }}>
                    <Item>
                        <StyleIcon fontSize='small' />
                        Fashion
                    </Item>
                </Link>
                <Link to="liveTv" style={{ textDecoration: "none", color: "inherit" }}>
                    <Item>
                        <LiveTvIcon fontSize='small' />
                        LiveTv
                    </Item>
                </Link>


                <Hr />
                <Link to="settings" style={{ textDecoration: "none", color: "inherit" }}>
                    <Item>
                        <SettingsIcon fontSize='small' />
                        Settings
                    </Item>
                </Link>
                <Link to="Report" style={{ textDecoration: "none", color: "inherit" }}>
                    <Item>
                        <ReportIcon fontSize='small' />
                        Report
                    </Item>
                </Link>
                <Link to="Help" style={{ textDecoration: "none", color: "inherit" }}>
                    <Item>
                        <HelpOutlineIcon fontSize='small' />
                        Help
                    </Item>
                </Link>
                <Link to="feedback" style={{ textDecoration: "none", color: "inherit" }}>
                    <Item>
                        <FeedbackOutlinedIcon fontSize='small' />
                        Feedback
                    </Item>
                </Link>
                <Item onClick={() => setDarkMode(!darkMode)}>
                    {darkMode ? <DarkModeIcon fontSize='small' /> : <LightModeIcon fontSize='small' />}
                    {darkMode ? "Light" : "Dark"} Mode
                </Item>
                <Content>Note:This is for Educational purpose only didn't mean to violate any copy rights © 2024</Content>
            </Wrapper>
        </Container>
    )
}

export default Menu