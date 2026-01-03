import { useRef } from 'react';
import styled from 'styled-components';
import { Minus, Plus } from 'lucide-react';
import { capitalizeFirst, numInCart, CARD_MIN_WIDTH } from '../utils';
import ReviewStars from './ReviewStars';

function ProductCard({ productData, select, filter, cart, updateCart }) {
  const bottomRef = useRef();
  if (!productData) return;
  const { title, price, rating, category, image } = productData;
  const quantity = numInCart(productData.id, cart);

  return (
    <Wrapper
      onClick={(e) => {
        e.stopPropagation();
        if (e.target === bottomRef.current) return;
        select(productData);
      }}
    >
      <PictureContainer>
        <Picture src={image} />
        <DetailsButton>See Details</DetailsButton>
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
      <Price>${price.toFixed(2)}</Price>
      {quantity === 0 ? (
        <AddToCart
          onClick={(e) => {
            e.stopPropagation();
            updateCart(productData, 'add');
          }}
        >
          Add to Cart
        </AddToCart>
      ) : (
        <ChangeCart onClick={(e) => e.stopPropagation()}>
          <Remove onClick={() => updateCart(productData, 'remove')}>
            <Minus />
          </Remove>
          <NumInCart
            type="number"
            value={quantity}
            onChange={(e) => updateCart(productData, 'set', e.target.value)}
          />
          <Add onClick={() => updateCart(productData, 'add')}>
            <Plus />
          </Add>
        </ChangeCart>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  grid-row: span 6;
  display: grid;
  grid-template-rows: subgrid;
  gap: 0.2rem;
  font-family: 'Plex Sans';
  width: ${CARD_MIN_WIDTH};
`;

const DetailsButton = styled.div`
  position: absolute;
  bottom: 0;
  transform: translateY(0);
  transition-behavior: allow-discrete;
  transition: display 0.3s, transform 0.3s;
  background-color: rgba(11, 22, 19, 0.7);
  color: var(--brand-gold);
  font-weight: bold;
  width: 100%;
  padding: 0.5rem 0;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;

  @starting-style {
    transform: translateY(100%);
  }
`;

const PictureContainer = styled.button`
  isolation: isolate;
  position: relative;
  display: flex;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  border: none;
  padding: none;
  background: none;

  &:hover ${DetailsButton} {
    display: block;
  }

  &:not(:hover) ${DetailsButton} {
    display: none;
  }
`;

const Picture = styled.img`
  object-fit: contain;
  width: 100%;
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

const ChangeCart = styled.div`
  --outside-radius: 10px;
  display: flex;
`;

const Remove = styled.button`
  background-color: var(--black);
  color: var(--brand-gold);
  border: none;
  border-radius: 0px;
  border-top-left-radius: var(--outside-radius);
  border-bottom-left-radius: var(--outside-radius);
`;

const Add = styled.button`
  background-color: var(--brand-gold);
  border: none;
  border-radius: 0px;
  border-top-right-radius: var(--outside-radius);
  border-bottom-right-radius: var(--outside-radius);
`;

const NumInCart = styled.input`
  max-width: 70%;
  border: 1px solid var(--black);
  border-radius: 0px;
  text-align: center;
`;

export default ProductCard;
