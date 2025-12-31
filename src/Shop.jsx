import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import BreadCrumbs from './components/BreadCrumbs';
import FilterWidget from './components/FilterWidget';
import Sort from './components/Sort';
import ProductCard from './components/ProductCard';

const productsData = fetch('https://fakestoreapi.com/products');

function Shop() {
  const [data, setData] = useState([]);
  const [sort, setSort] = useState('Category');
  const [filters, setFilters] = useState({
    "Men's Clothing": true,
    Jewelery: true,
    Electronics: true,
    "Women's Clothing": true,
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

  const toggleFilter = (option) => {
    const nextFilters = { ...filters };
    nextFilters[option] = !nextFilters[option];
    setFilters(nextFilters);
  };

  return (
    <Wrapper>
      <BreadCrumbs path={path} />
      <Controls>
        <FilterWidget current={filters} change={toggleFilter} />
        <Sort current={sort} change={setSort} />
      </Controls>
      <Products>
        {!data && 'Loading...'}
        {data && <ProductCard productData={data[0]} />}
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
`;

export default Shop;
