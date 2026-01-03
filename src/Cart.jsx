import { useState } from 'react';
import { useOutletContext, Link, useLocation } from 'react-router';
import { ShoppingCart, Check, Plus, Minus } from 'lucide-react';
import styled from 'styled-components';
import { getItemTotal, getCartTotal } from './utils';

import BreadCrumbs from './components/BreadCrumbs';

const PIC_WIDTH = '5rem';

const DISCOUNT = 'brig';

function Cart() {
  const [code, setCode] = useState('');
  const [submittedCode, setSubmittedCode] = useState();
  const [cart, updateCart] = useOutletContext();

  const path = useLocation().pathname.slice(1).split('/');

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    setSubmittedCode(code.toLowerCase());
  };

  const brigscount = submittedCode === DISCOUNT;

  return (
    <>
      <BreadCrumbs path={path} />
      <Wrapper>
        <h1>
          Cart <ShoppingCart />
        </h1>
        <CartContents>
          {cart.length === 0 ? (
            <Empty>
              <EmptyMessage>You have NOTHING</EmptyMessage>
              <ShopLink to="/shop">Consume More</ShopLink>
            </Empty>
          ) : (
            cart.map((item) => {
              return (
                <CartItem>
                  <Picture src={item.image} />
                  <TitleContainer>
                    <Title>{item.title}</Title>
                    <ShippingMessage>
                      <Check size={14} /> Same Day Brigging
                    </ShippingMessage>
                  </TitleContainer>
                  <ItemTotal>
                    {brigscount ? 'Free' : `$${getItemTotal(item)}`}
                  </ItemTotal>
                  <QuantWrapper>
                    <Quantity
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateCart(item, 'set', Number(e.target.value))
                      }
                    />
                    <QuantButtons>
                      <PlusButton>
                        <Plus size={12} />
                      </PlusButton>
                      <MinusButton>
                        <Minus size={12} />
                      </MinusButton>
                    </QuantButtons>
                  </QuantWrapper>
                </CartItem>
              );
            })
          )}
        </CartContents>
        {cart.length > 0 && (
          <Checkout>
            <Top>
              <CartTotal>
                Total: {brigscount ? 'Free' : `$${getCartTotal(cart)}`}
              </CartTotal>
              <Discount onSubmit={handleCodeSubmit}>
                <label>Enter Code: </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  disabled={brigscount}
                ></input>
                <Submit type="submit">Apply</Submit>
                {submittedCode ? (
                  brigscount ? (
                    <FormAlert style={{ color: 'green' }}>
                      Discount Applied!
                    </FormAlert>
                  ) : (
                    <FormAlert style={{ color: 'red' }}>Invalid Code</FormAlert>
                  )
                ) : null}
              </Discount>
            </Top>
            <CheckoutButton>Checkout</CheckoutButton>
          </Checkout>
        )}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  font-family: 'Plex Sans';
  padding: 0 1rem;

  & h1 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: 'Merriweather';
    font-size: 1.75rem;
  }
`;

const Empty = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
  font-size: 1.5rem;
`;

const EmptyMessage = styled.p``;

const ShopLink = styled(Link)`
  text-decoration: none;
  color: var(--brand-gold);
  background-color: var(--black);
  padding: 0.5rem;
  border-radius: 8px;
`;

const CartContents = styled.div`
  padding: 1rem;
  max-height: 450px;
  overflow: auto;
  scrollbar-width: none;
  overflow-y: scroll;

  &::webkit-scrollbar {
    display: none;
  }
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.8rem;
  border-bottom: 1px solid #999999;
  padding: 1rem;

  &:first-of-type {
    border-top: 1px solid #999999;
  }
`;

const Picture = styled.img`
  width: ${PIC_WIDTH};
  height: auto;
`;

const TitleContainer = styled.div``;

const Title = styled.p`
  margin-bottom: 0.5rem;
`;

const ShippingMessage = styled.p`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: green;
`;

const ItemTotal = styled.p`
  font-weight: bold;
  margin-left: auto;
`;

const QuantWrapper = styled.div`
  display: flex;
`;

const Quantity = styled.input`
  max-width: 40px;
  height: 40px;
  border: 1px solid black;
  text-align: center;
`;

const QuantButtons = styled.div`
  --button-min: 1.1rem;
  display: flex;
  flex-direction: column;
`;

const PlusButton = styled.button`
  background-color: var(--brand-gold);
  color: var(--black);
  border: none;
  padding: 0;
  min-width: var(--button-min);
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-right-radius: 6px;
`;

const MinusButton = styled.button`
  background-color: var(--black);
  color: var(--brand-gold);
  border: none;
  padding: 0;
  min-width: var(--button-min);
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-right-radius: 6px;
`;

const Checkout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartTotal = styled.p`
  font-size: 2rem;
  font-weight: bold;
`;

const Discount = styled.form`
  & label {
    display: block;
  }
`;

const Submit = styled.button`
  background-color: var(--brand-gold);
  color: var(--black);
  border: none;
  padding: 0.2rem;
  font-weight: bold;
`;

const FormAlert = styled.p``;

const CheckoutButton = styled.button`
  background-color: var(--black);
  color: var(--brand-gold);
  border: none;
  padding: 0.2rem;
  font-weight: bold;
  width: 50%;
  align-self: center;
`;

export default Cart;
