'use client';

import styled from 'styled-components';

export const StyledComponentView = () => {
  return (
    <div>
      <Title>StyledComponentView</Title>
    </div>
  );
};

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #bf4f74;
`;
