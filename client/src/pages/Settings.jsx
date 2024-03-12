import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
  height:85vh;
`;
const Wrapper = styled.div``;
const Title = styled.h1`
  color:${({theme})=>theme.text};
  font-size:24px;
  font-weight:400;
`;

const Settings = ({footertype}) => {
  console.log(footertype)
  return (
    <Container>
      <Wrapper>
        <Title>
          {footertype}
        </Title>
      </Wrapper>
    </Container>   
  )
}

export default Settings