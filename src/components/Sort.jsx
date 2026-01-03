import { useState, useRef, useEffect, memo } from 'react';
import styled from 'styled-components';
import { ChevronDown } from 'lucide-react';

function Sort({ current, change }) {
  const [open, setOpen] = useState(false);

  const sortRef = useRef();

  useEffect(() => {
    const handleClose = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    if (open) {
      window.addEventListener('click', handleClose);
    }

    return () => window.removeEventListener('click', handleClose);
  }, [open]);

  return (
    <Wrapper ref={sortRef}>
      <By>Sort By: </By>
      <Dropdown>
        <Selector onClick={() => setOpen((prev) => !prev)}>
          {current.charAt(0).toUpperCase() + current.slice(1)}
          <StyledPicker $open={open} />
        </Selector>
        <Options $show={open}>
          <SortOption>
            <OptionButton onClick={() => change('category')}>
              Category
            </OptionButton>
          </SortOption>
          <SortOption>
            <OptionButton onClick={() => change('price')}>Price</OptionButton>
          </SortOption>
          <SortOption>
            <OptionButton onClick={() => change('rating')}>Rating</OptionButton>
          </SortOption>
        </Options>
      </Dropdown>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  font-family: 'Plex Sans';
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const By = styled.span``;

const Dropdown = styled.div``;

const Selector = styled.button`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  background: white;
  border: 1px solid #999999;
  padding: 0.5rem;
  width: 150px;

  &:hover {
    cursor: pointer;
  }
`;

const StyledPicker = styled(ChevronDown)`
  transform: rotate(${(props) => (props.$open ? '180deg' : '0deg')});
  transition: transform 0.3s;
`;

const Options = styled.ul`
  display: ${(props) => (props.$show ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  padding: 0;
  transform: scaleY(${(props) => (props.$show ? '1' : '0')});
  transform-origin: top;
  transition: display 0.3s ease-in-out, transform 0.3s ease-in-out;
  transition-behavior: allow-discrete;
  border: 1px solid #999999;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: white;
  width: 150px;

  &:first-of-type {
    border-top: none;
  }

  @starting-style {
    transform: scaleY(0);
  }

  & li {
    list-style-type: none;
  }
`;

const SortOption = styled.li`
  border-bottom: 1px solid #999999;
  display: flex;

  &:last-of-type {
    border-bottom: none;
  }
`;

const OptionButton = styled.button`
  width: 100%;
  background: none;
  border: none;
  text-align: start;
  padding: 0.5rem;

  &:hover {
    cursor: pointer;
    background-color: var(--brand-gold);
  }
`;

export default memo(Sort);
