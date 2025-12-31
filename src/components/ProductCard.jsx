import styled from 'styled-components';

function ProductCard({ productData }) {
  console.log(productData);
  const { title, description, price, rating, category, image } = productData;

  return (
    <Wrapper>
      <Category>{category}</Category>
      <div>{title}</div>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const Category = styled.p``;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

export default ProductCard;
