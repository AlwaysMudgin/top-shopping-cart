import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import { CARD_MIN_WIDTH } from './utils';

import BreadCrumbs from './components/BreadCrumbs';
import FilterWidget from './components/FilterWidget';
import Sort from './components/Sort';
import ProductCard from './components/ProductCard';

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

  console.log(data);

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
            />
          ))}
      </Products>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;

const Products = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, ${CARD_MIN_WIDTH});
  grid-template-rows: 250px;
  gap: 0.5rem;
  align-items: start;
  padding: 1rem;
`;

export default Shop;
