import { Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';

function BreadCrumbs({ path }) {
  return (
    <Wrapper>
      <Crumb to="/">Home</Crumb>
      <ChevronRight size={16} color="#666666" />
      {path.map((node, index) => {
        const text = node.charAt(0).toUpperCase() + node.slice(1);
        if (index >= path.length - 1) {
          return (
            <Crumb key={node} to={'/' + path.join('/')}>
              {text}
            </Crumb>
          );
        }
        return (
          <Fragment key={node}>
            <Crumb to={'/' + path.slice(0, index + 1).join('/')}>{text}</Crumb>
            <ChevronRight size={12} color="#666666" />
          </Fragment>
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #444444;
  font-family: 'Merriweather';
  padding: 0.5rem;
  padding-left: 1rem;
`;

const Crumb = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:last-of-type {
    font-weight: bold;
  }
`;

export default BreadCrumbs;
