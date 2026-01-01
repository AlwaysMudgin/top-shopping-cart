import styled from 'styled-components';
import { capitalizeFirst, CARD_MIN_WIDTH } from '../utils';
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

function ProductCard({ productData, filter, numInCart = 0, setNumInCart }) {
  if (!productData) return;
  console.log(productData);
  const { title, description, price, rating, category, image } = productData;

  return (
    <Wrapper>
      <PictureContainer>
        <Picture src={image} />
      </PictureContainer>
      <Category onClick={() => filter('choose', capitalizeFirst(category))}>
        {capitalizeFirst(category)}
      </Category>
      <Title>{title}</Title>
      <Rating>
        <ReviewStars rate={rating.rate} />
        <Rate>{rating.rate}</Rate>
        <Count>{rating.count} Ratings</Count>
      </Rating>
      <Price>${price}</Price>
      {numInCart === 0 ? <AddToCart>Add to Cart</AddToCart> : <Input></Input>}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  grid-row: span 6;
  display: grid;
  grid-template-rows: subgrid;
  font-family: 'Plex Sans';
  width: ${CARD_MIN_WIDTH};
`;

const Top = styled.div`
  position: relative;

  & > p {
    display: none;
  }

  &:hover > p {
    display: block;
  }
`;

const PictureContainer = styled.div`
  display: flex;
  overflow: hidden;
  width: 100%;
`;

const Picture = styled.img`
  object-fit: contain;
  width: 100%;
`;

const Description = styled.p`
  position: absolute;
  bottom: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(11, 22, 19, 0.7);
  color: white;
  padding: 0.5rem;
`;

const Category = styled.button`
  color: #444444;
  font-style: italic;
  background: none;
  border: none;
  padding: 0;
  text-align: start;

  &:hover {
    cursor: pointer;
    color: var(--brand-gold);
  }
`;

const Title = styled.p``;

const Rating = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
`;

const Stars = styled.div`
  display: flex;
  max-width: ${(props) => props.$showWidth}px;
  overflow: hidden;
`;

const StyledStar = styled(Star)`
  color: var(--black);
  min-width: ${starSize}px;
`;

const Rate = styled.p``;

const Count = styled.p`
  color: #888888;
  margin-left: auto;
`;

const Price = styled.p`
  font-weight: bold;
`;

const AddToCart = styled.button`
  background-color: var(--brand-gold);
  color: var(--black);
  font-weight: bold;
  padding: 0.2rem 0.5rem;
  border: none;
  border-radius: 6px;
  width: 100%;
`;

const Input = styled.div``;

export default ProductCard;
