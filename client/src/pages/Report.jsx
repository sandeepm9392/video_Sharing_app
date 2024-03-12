import axios from 'axios';
import React, { useState } from 'react'
import styled from 'styled-components';

const Container = styled.div`
    height:100vh;
`;
const Wrapper = styled.div`
`;
const Title = styled.div`
  color:${({ theme }) => theme.text};
  font-size:22px;
  font-weight:400;
`;
const Text = styled.div`
    color:${({ theme }) => theme.text};
    font-size:18px;
    font-weight:300;
    margin-top:10px;
`;

const Inputs = styled.div`
    display: flex;
    flex-direction:column;
    gap:15px;
    margin-top:30px;
    margin-left:50px;
    align-items:start;
`;

const Input = styled.input`
    color:${({ theme }) => theme.text};
    border: 1px solid ${({ theme }) => theme.textsoft};
    border-radius:5px;
    background-color:transparent;
    padding:10px;
    width:35%;
    font-size:14px;
`;
const Desc = styled.textarea`
    color:${({ theme }) => theme.text};
    border: 1px solid ${({ theme }) => theme.textsoft};
    border-radius:5px;
    background-color:transparent;
    padding:10px;
    width:40%;
`;
const Button = styled.button`
    color:${({ theme }) => theme.textSoft};
    background-color:${({ theme }) => theme.bgLight};
    border-radius:5px;
    border:none;
    cursor:pointer;
    padding:10px 20px;
    width:20%;
    &:hover{
        background-color:grey;
        }
`;

const Form = styled.form``;


const Report = ({ footertype }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        issue: "",
        videoLink: "",
        description: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { name, email, issue, videoLink, description } = formData;
            console.log(formData)
            const res = await axios.post('/formsubmit', { name, email, issue, videoLink, description });
            console.log(res.data)

        } catch (err) { console.log(err) }
    }
    return (
        <Container>
            <Wrapper>
                <Title>{footertype}</Title>
                <Text>{footertype === "Report" ? ("Please Mention what makes you feel Uncomfortable") : ("Tell us what possible changes can we make to feel the UI/UX bit more better")}</Text>
                <Form onSubmit={handleSubmit}>
                    <Inputs>
                        <Input placeholder="Name" type="text" name="name" value={formData.name} onChange={handleChange} required />
                        <Input placeholder="Email" type="text" name="email" value={formData.email} onChange={handleChange} required />
                        {footertype === "Report" && (
                            <>
                                <Input placeholder="Mention what the issue is"
                                    type="text" name="issue" value={formData.issue} onChange={handleChange} />
                                <Input placeholder="paste the link of video you had issue with here. "
                                    type="text" name="videoLink" value={formData.videoLink} onChange={handleChange} />
                            </>)
                        }

                        <Desc placeholder="Desc" rows={8}
                            type="text" name="description" value={formData.description} onChange={handleChange} required />
                        <Button type="submit">Send</Button>
                    </Inputs>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Report