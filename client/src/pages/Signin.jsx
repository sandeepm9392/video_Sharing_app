import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../firebase'
import GoogleIcon from "@mui/icons-material/Google"

const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    height:calc(100vh-56px);
    color:${({ theme }) => theme.text};

`

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    background-color:${({ theme }) => theme.bgLighter};
    border: 1px solid  ${({ theme }) => theme.soft};
    border-radius:3px;
    padding:8px 90px;
    width:300px;
`

const Title = styled.h1`
font-size:20px;
font-weight:500;

`

const Text = styled.h2`
font-size:14px;
font-weight:500;

`


const Input = styled.input`
border:none;
border-radius:3px;
width:100%;
margin:5px 0px;
padding:14px;
background-color:${({theme})=>theme.bgLighter};
border-bottom:2px solid ${({ theme }) => theme.bg} ;
color:${({theme})=>theme.text};
&:focus{
    outline:none;
    border-bottom-color:${({ theme }) => theme.soft};
}
`

const Button = styled.button`
border-radius:20px;
border:none;
width:100%;
cursor:pointer;
padding:8px 14px;
align-items:center;
justify-content:space-around;
display:flex;
margin:5px 0px;
font-weight:500;
color:${({ theme }) => theme.textSoft};
background-color:${({theme})=>theme.soft};

&:hover{
    background-color:#380303;
}
`

const More = styled.div`
font-size:12px;
display:flex;
justify-content:space-between;
align-items:center;
`

const Links = styled.div`
display:flex;
margin-left:50px;
`

const Link = styled.span`
margin-left:30px;
cursor:pointer;
`

const Hr = styled.hr`
width:30%;
`

const Signin = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginStart());
        try {
            const res = await axios.post("/auth/signin", { name, password });
            dispatch(loginSuccess(res.data));
            navigate("/");
            console.log(res);
        } catch (err) {
            dispatch(loginFailure());

        }
    }; 

    const  handleSignUp = async(e) => {
        e.preventDefault();
        try{
            const res = await axios.post("/auth/signup",{name,email,password});
            console.log(res.data)
            alert(`User ${res.data.name} created successfully!`)

        }catch(err){
            dispatch(loginFailure());
        }

    }


    const signInWithGoogle = async () => {
        dispatch(loginStart());
        signInWithPopup(auth, provider)
          .then((result) => {
            axios
              .post("/auth/google", {
                name: result.user.displayName,
                email: result.user.email,
                
              })
              .then((res) => {
                console.log(res)
                dispatch(loginSuccess(res.data));
                navigate("/");
              });
          })
          .catch((error) => {
            dispatch(loginFailure());
          });
      };

    return (
        <Container>
            <Wrapper>
                <Title>Sign in / Sign up</Title>
                <Text>Sign in to youtube account</Text>
                <Input placeholder="Username" onChange={(e) => setName(e.target.value)} />
                <Input placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

                <Button onClick={handleLogin} >Sign in</Button>
                <Hr />
                <Button onClick={signInWithGoogle} ><GoogleIcon style={{fontSize:14}}/> Sign in with google</Button>
                <Hr />
                <Input placeholder="Username" onChange={(e) => setName(e.target.value)} />
                <Input type="email" placeholder="Email..." onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <Button onClick={handleSignUp} >Sign up</Button>

            </Wrapper>
            <More>
                English(USA)
                <Links>
                    <Link>help</Link>
                    <Link>Privacy</Link>
                    <Link>Terms</Link>
                </Links>

            </More>

        </Container>
    )
}

export default Signin;