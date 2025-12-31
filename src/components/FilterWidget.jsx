import { useState } from 'react';
import styled from 'styled-components';
import { SlidersHorizontal } from 'lucide-react';

function FilterWidget({ current, change }) {
  const [open, setOpen] = useState(false);

  return (
    <Wrapper>
      <Selector onClick={() => setOpen((prev) => !prev)}>
        Filter
        <StyledPicker size={18} />
      </Selector>
      <Options $show={open}>
        {Object.keys(current).map((option) => (
          <FilterOption key={option}>
            <Label htmlFor={option}>
              {option}
              <input
                type="checkbox"
                id={option}
                checked={current[option]}
                onChange={() => change(option)}
              />
            </Label>
          </FilterOption>
        ))}
      </Options>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: max-content;
  font-family: 'Plex Sans';
`;

const Selector = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: 1px solid #999999;
  padding: 0.5rem;
  min-width: 100%;

  &:hover {
    cursor: pointer;
  }
`;

const StyledPicker = styled(SlidersHorizontal)``;

const Options = styled.ul`
  display: ${(props) => (props.$show ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  padding: 0rem;
  transform: scaleY(${(props) => (props.$show ? '1' : '0')});
  transform-origin: top;
  transition: display 0.3s ease-in-out, transform 0.3s ease-in-out;
  transition-behavior: allow-discrete;
  width: max-content;
  background-color: white;
  border: 1px solid #999999;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  @starting-style {
    transform: scaleY(0);
  }

  & li {
    list-style-type: none;
  }
`;

const FilterOption = styled.li`
  border-bottom: 1px solid #999999;

  &:last-of-type {
    border-bottom: none;
  }
`;

const Label = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  background: none;
  text-align: start;
  padding: 0.5rem;

  &:hover {
    cursor: pointer;
    background-color: var(--brand-gold);
  }
`;

export default FilterWidget;
