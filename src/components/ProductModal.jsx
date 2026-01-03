import { useOutletContext } from 'react-router';
import { X, Plus, Minus } from 'lucide-react';
import { numInCart } from '../utils';
import styled from 'styled-components';
import ReviewStars from './ReviewStars';

function ProductModal({ productData, setDetailedProduct }) {
  const [cart, updateCart] = useOutletContext();
  const { title, description, price, rating, image } = productData;

  const quantity = numInCart(productData.id, cart);

  const handleDismiss = (e) => {
    if (e.target === e.currentTarget) {
      setDetailedProduct(null);
    }
  };

  return (
    <Wrapper onClick={handleDismiss}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Close
          onClick={(e) => {
            e.stopPropagation();
            setDetailedProduct(null);
          }}
        >
          <X />
        </Close>
        <ImageContainer>
          <ProductImage src={image} />
        </ImageContainer>
        <Content>
          <Title>{title}</Title>
          <Rating>
            <ReviewStars rate={rating.rate} />
            <Rate>{rating.rate}</Rate>
            <Count>({rating.count})</Count>
          </Rating>
          <Description>{description}</Description>
          <Price>${price.toFixed(2)}</Price>
          {quantity === 0 ? (
            <AddToCart onClick={() => updateCart(productData, 'add')}>
              Add to Cart
            </AddToCart>
          ) : (
            <ChangeCart>
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
        </Content>
      </Modal>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
`;

const Close = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
`;

const Modal = styled.div`
  position: relative;
  --padding: 3rem;
  max-width: 80%;
  background-color: #f1f1f1;
  padding: var(--padding);
  display: flex;
  gap: 1rem;
  min-height: max-content;
`;

const ImageContainer = styled.div`
  min-width: 40%;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: 'Merriweather';
`;

const Title = styled.p``;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Rate = styled.p`
  font-weight: bold;
`;

const Count = styled.p``;

const Description = styled.p``;

const Price = styled.p`
  font-size: 2rem;
  font-weight: bold;
`;

const AddToCart = styled.button`
  background-color: var(--brand-gold);
  color: var(--black);
  font-weight: bold;
  padding: 0.2rem 0.5rem;
  border: none;
  border-radius: 6px;
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

export default ProductModal;
