import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import { useOutletContext } from 'react-router';
import { CARD_MIN_WIDTH } from './utils';
import { XCircle } from 'lucide-react';

import BreadCrumbs from './components/BreadCrumbs';
import FilterWidget from './components/FilterWidget';
import Sort from './components/Sort';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';

const productsData = fetch('https://fakestoreapi.com/products');
// In larger projects with many fetches, avoid pre-fetching before
// render. Browser max fetch slots can block other components
// that need their data first.

function Shop() {
  const [data, setData] = useState([]);
  const [sort, setSort] = useState('Category');
  const [filters, setFilters] = useState({
    "Men's Clothing": false,
    Jewelery: false,
    Electronics: false,
    "Women's Clothing": false,
  });
  const [detailedProductData, setDetailedProductData] = useState(null);
  const [cart, updateCart] = useOutletContext();
  const [brig, setBrig] = useState(true);
  const path = useLocation().pathname.slice(1).split('/');

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const data = await (await productsData).json();
        setData(data);
      } catch {
        return;
      }
    };

    dataFetch();
  }, []);

  const changeFilters = (action, option) => {
    if (action === 'reset') {
      const nextFilters = { ...filters };
      for (const filter in nextFilters) {
        nextFilters[filter] = false;
      }
      setFilters(nextFilters);
      return;
    }

    if (action === 'toggle') {
      const nextFilters = { ...filters };
      nextFilters[option] = !nextFilters[option];
      setFilters(nextFilters);
      return;
    }

    if (action === 'choose') {
      const nextFilters = { ...filters };
      nextFilters[option] = true;
      setFilters(nextFilters);
    }
  };

  if (!data) return 'Loading...';

  return (
    <Wrapper>
      <BreadCrumbs path={path} />
      <Controls>
        <FilterWidget current={filters} change={changeFilters} />
        <Sort current={sort} change={setSort} />
      </Controls>
      <Products>
        {!data && 'Loading...'}
        {data &&
          data.map((product) => (
            <ProductCard
              key={product.id}
              productData={product}
              filter={changeFilters}
              select={setDetailedProductData}
              cart={cart}
              updateCart={updateCart}
            />
          ))}
      </Products>
      {brig && (
        <BrigBanner>
          100% BRIG{' '}
          <CloseBrig onClick={() => setBrig(false)}>
            <XCircle size={20} />
          </CloseBrig>
        </BrigBanner>
      )}
      {detailedProductData && (
        <ProductModal
          productData={detailedProductData}
          setDetailedProduct={setDetailedProductData}
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
`;

const Controls = styled.div`
  position: sticky;
  top: 0;
  background-color: white;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  z-index: 2;
`;

const Products = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, ${CARD_MIN_WIDTH});
  grid-template-rows: 250px;
  gap: 1rem;
  align-items: start;
  padding: 1rem;
`;

const BrigBanner = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: rgb(246, 172, 58);
  color: var(--black);
  font-family: 'Merriweather';
  font-size: 1rem;
  font-weight: bold;
  height: 8rem;
  width: 12rem;
  transform: rotate(45deg);
  transform-origin: left top;
  padding: 0.9rem;
  padding-left: 3rem;
`;

const CloseBrig = styled.button`
  position: relative;
  top: -40px;
  right: -10px;
  border: none;
  padding: 0;
  border-radius: 50%;
  background-color: rgb(246, 172, 58);
  transform: rotate(-45deg);
`;

export default Shop;
