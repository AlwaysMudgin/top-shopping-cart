import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Check } from 'lucide-react';

function SuperHeader() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (index >= CONTENT.length - 1) {
        setIndex(0);
      } else {
        setIndex((prev) => prev + 1);
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <Wrapper>
      <Text $exit={index !== 0}>
        <Check color="green" size={12} strokeWidth={4} />
        <Bold>Premium brigars</Bold> for an affordable price
      </Text>
      <Text $exit={index !== 1}>
        <Check color="green" size={12} strokeWidth={4} />
        <Bold>Fast tracked</Bold> shipping in 2 to 4 days
      </Text>
      <Text $exit={index !== 2}>
        <Check color="green" size={12} strokeWidth={4} />
        <Bold>Boveda</Bold> controlled packages
      </Text>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0.5rem 0;
  overflow: hidden;
  background-color: white;
`;

const Text = styled.span`
  display: ${(props) => (props.$exit ? 'none' : 'flex')};
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  font-family: 'Plex Sans';
  font-size: 0.75rem;
  min-width: max-content;
  transform: translateX(${(props) => (props.$exit ? '-100vw' : '0')});
  transition: transform 0.5s, display 0.2s;
  transition-behavior: allow-discrete;

  @starting-style {
    transform: translateX(100vw);
  }
`;

const Bold = styled.span`
  font-weight: bold;
`;

const CONTENT = [
  <Text>
    <Bold>Premium brigars</Bold> for an affordable price
  </Text>,
  <Text>
    <Bold>Fast tracked</Bold> shipping in 2 to 4 days
  </Text>,
  <Text>
    <Bold>Boveda</Bold> controlled packages
  </Text>,
];

export default SuperHeader;
