import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/Signin";
import Search from "./pages/Search";
import Explore from "./pages/Explore";
import { useSelector } from "react-redux";
import Settings from "./pages/Settings";
import Report from "./pages/Report";

const Container = styled.div`
  display: flex;
  flex-direction:column;
`;

const Main = styled.div`
  display:flex;
  flex:1;
  background-color: ${({ theme }) => theme.bg};
`;
const Wrapper = styled.div`
  flex:7;
  padding: 22px 16px;
  overflow-y:auto;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  const [toggleMenu, setToggleMenu] = useState(true)

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Navbar toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
          {toggleMenu && <Menu  darkMode={darkMode} setDarkMode={setDarkMode} />}
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random" />} />
                  <Route path="trends" element={<Home type="trend" />} />
                  <Route path="subscriptions" element={<Home type="sub" />} />
                  <Route path="search" element={<Search />} />
                  <Route path="gaming" element={<Explore menuquery="gaming" />} />
                  <Route path="sports" element={<Explore menuquery="sports" />} />
                  <Route path="movies" element={<Explore menuquery="movies" />} />
                  <Route path="music" element={<Explore menuquery="music" />} />
                  <Route path="liveTv" element={<Explore menuquery="liveTv" />} />
                  <Route path="shopping" element={<Explore menuquery="shopping" />} />
                  <Route path="education" element={<Explore menuquery="education" />} />
                  <Route path="news" element={<Explore menuquery="news" />} />
                  <Route path="fashion" element={<Explore menuquery="fashion" />} />
                  <Route path="settings" element={<Settings footertype="Settings" />} />
                  <Route path="feedback" element={<Report footertype="Feedback" />} />
                  <Route path="Report" element={<Report footertype="Report" />} />
                  <Route path="Help" element={<Settings footertype="Help" />} />

                  <Route
                    path="signin"
                    element={currentUser ? <Home type="random" /> : <SignIn />}
                  />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;