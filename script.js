// Tive uma aula sobre esse projeto com o aluno Ícaro Emanuel, consegui entender a lógica do assunto através do projeto dele. Muitas das funções aqui tem como referência seu projeto.
// link: https://github.com/tryber/sd-014-b-project-shopping-cart/pull/36

const cartList = document.querySelector('.cart__items');
const clearCartButton = document.querySelector('.empty-cart');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) { // 2. definindo o padrão dos parâmetros para construir o objeto
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(
    createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'),
  );

  return section;
}

/*        REQUISITO 4 (passos 7-9)      */
// 7. pega, na página html, os valores dos produtos que estão no carrinho e os salva no local storagem com a key cartItems
const saveCartList = () => localStorage.setItem('cartItems', cartList.innerHTML);

// 8. Puxa o cartItems do local storage e os adiciona à lista na página
const getCartList = () => {
  cartList.innerHTML = localStorage.getItem('cartItems');
};

/*       REQUISITO 3 (passo 6)      */
// 6.
function cartItemClickListener(event) {
  event.target.remove();
  saveCartList();
}

// 9. torna possível apagar o item após trazê-lo do local storage
cartList.addEventListener('click', cartItemClickListener);

// 4.
function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

/*       REQUISITO 1 (passos 1-2)      */
/* 1. */
function fetchProducts() {
  fetch('https://api.mercadolibre.com/sites/MLB/search?q=$computador')
    .then((response) => response.json())
    .then(({ results }) => {
      results.forEach((product) => {
        const productsList = document.querySelector('.items');
        productsList.appendChild(createProductItemElement(product)); // chama a função createProductItemElement, usando como parâmetro cada produto do data, para construir o objeto, então o adiciona como filho da lista de produtos.
      });
    }); 
}

/*       REQUISITO 2 (passos 3-5)     */
/* 3. */
function addProductToCart(sku) {
  fetch(`https://api.mercadolibre.com/items/${sku}`)
    .then((response) => response.json())
    .then((product) => {
      const cartItemsList = document.querySelector('.cart__items');
      cartItemsList.appendChild(createCartItemElement(product));
      saveCartList();
    });
}

// 5.
document.addEventListener('click', (event) => {
  if (event.target.className
    === 'item__add') addProductToCart(getSkuFromProductItem(event.target.parentElement));
});

/*       REQUISITO 6 (passos 10)     */
// 10.
clearCartButton.addEventListener('click', () => {
  cartList.innerHTML = '';
  saveCartList();
});

window.onload = () => {
  fetchProducts();
  getCartList();
};
