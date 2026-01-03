export const capitalizeFirst = (string) => {
  return string
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const numInCart = (id, cart) => {
  if (cart.length === 0) return 0;
  const match = cart.find((item) => item.id === id);
  if (!match) {
    return 0;
  }
  return match.quantity;
};

export const subtractFromCart = (nextCart, product) => {
  if (!product) {
    console.log('subtract from cart error, product not valid: ', product);
    return;
  }

  const match = nextCart.find((item) => item.id === product.id);

  if (match.quantity === 1) {
    return nextCart.filter((item) => item.id !== product.id);
  } else {
    match.quantity--;
    return nextCart;
  }
};

export const addToCart = (nextCart, product) => {
  if (!product) {
    console.log('add to cart error, product not valid: ', product);
    return;
  }

  if (nextCart.length === 0) {
    nextCart.push({ ...product, quantity: 1 });
    return nextCart;
  }

  const match = nextCart.find((item) => item.id === product.id);

  if (match) {
    match.quantity++;
  } else {
    nextCart.push({ ...product, quantity: 1 });
  }

  return nextCart;
};

export const setCartAmount = (nextCart, product, number) => {
  if (number === 0) {
    nextCart.filter((item) => item.id !== product.id);
    return nextCart;
  }
  const match = nextCart.find((item) => item.id === product.id);
  match.quantity = number;
  return nextCart;
};

export const getItemTotal = (item) => {
  if (!item.price || !item.quantity) {
    console.log('failed to get item total for item: ', item);
    return;
  }

  const total = item.price * item.quantity;

  return total.toFixed(2);
};

export const getCartTotal = (cart) => {
  if (!cart) {
    console.log('failed to get cart total for cart: ', cart);
  }
  const total = cart.reduce((acc, curr) => {
    return (acc += curr.price * curr.quantity);
  }, 0);

  return total.toFixed(2);
};

export const CARD_MIN_WIDTH = '13rem';
