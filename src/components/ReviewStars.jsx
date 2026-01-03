import styled from 'styled-components';
import { Star } from 'lucide-react';

const starSize = 14;

function ReviewStars({ rate }) {
  return (
    <Stars $showWidth={(rate / 5) * 5 * starSize}>
      <StyledStar size={starSize} fill="rgb(241, 194, 73)" strokeWidth="1px" />
      <StyledStar size={starSize} fill="rgb(241, 194, 73)" strokeWidth="1px" />
      <StyledStar size={starSize} fill="rgb(241, 194, 73)" strokeWidth="1px" />
      <StyledStar size={starSize} fill="rgb(241, 194, 73)" strokeWidth="1px" />
      <StyledStar size={starSize} fill="rgb(241, 194, 73)" strokeWidth="1px" />
    </Stars>
  );
}

const Stars = styled.div`
  display: flex;
  max-width: ${(props) => props.$showWidth}px;
  overflow: hidden;
`;

const StyledStar = styled(Star)`
  color: var(--black);
  min-width: ${starSize}px;
`;

export default ReviewStars;
