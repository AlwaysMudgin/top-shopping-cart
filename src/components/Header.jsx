import styled from 'styled-components';
import { Link } from 'react-router';
import SuperHeader from './SuperHeader';
import { Store, ShoppingCart } from 'lucide-react';

import logoCircle from '../assets/images/privada-logo-round.jpg';

function Header({ cartSize }) {
  return (
    <>
      <SuperHeader />
      <Wrapper>
        <MainLink to="/">
          <Logo src={logoCircle} />
        </MainLink>
        <Nav>
          <ul>
            <li>
              <StyledLink to="/shop">
                <Store />
              </StyledLink>
            </li>
            <li>
              <StyledLink to="/cart">
                <ShoppingCart />
                {cartSize > 0 && <CartSize>3</CartSize>}
              </StyledLink>
            </li>
          </ul>
        </Nav>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.header`
  --black: #0b1613;
  position: relative;
  background-color: var(--black);
  padding: 0.75rem;
  font-family: 'Plex Sans';
  width: 100%;
  display: flex;
  justify-content: center;
`;

const MainLink = styled(Link)`
  margin: 0 auto;
`;

const Logo = styled.img`
  height: 4rem;
  width: auto;
`;

const Nav = styled.nav`
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);

  & ul {
    display: flex;
    gap: 1rem;
    padding: 0;
  }

  & li {
    list-style-type: none;
  }
`;

const StyledLink = styled(Link)`
  --brand-color: rgb(241, 194, 73);
  color: white;
  text-decoration: none;
  position: relative;

  &:hover {
    color: var(--brand-color);
  }
`;

const CartSize = styled.div`
  --side: 20px;
  background-color: var(--brand-color);
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--black);
  font-weight: bold;
  border-radius: 50%;
  position: absolute;
  top: calc(0px - var(--side) * 0.5);
  right: calc(0px - var(--side) * 0.5);
  width: var(--side);
  height: var(--side);
`;

export default Header;
