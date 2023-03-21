const mainList = document.querySelector('.main-list');
let cartTotalValue = 0;
let productsCartQuantity = document.getElementById('quantity-value');
let productsCartTotalValue = document.getElementById('total-value');
const cartEmptyElement = document.querySelector(".cart-empty");
const cartDetails = document.querySelector('.cart-details');
cartDetails.style.display = 'none';


function createCard(list) {
    for (let i = 0; i < list.length; i++) {
        let currentElement = list[i];
        const productImg = document.createElement('img');
        productImg.setAttribute('class', 'product-image');

        const productTag = document.createElement('span');
        productTag.setAttribute('class', 'product-type');

        const productName = document.createElement('h3');
        productName.setAttribute('class', 'product-name');

        const productDescription = document.createElement('p');
        productDescription.setAttribute('class', 'product-description');

        const productPrice = document.createElement('h4');
        productPrice.setAttribute('class', 'product-price');

        createButton(currentElement);

        const li = document.createElement('li');
        li.setAttribute('class', 'product-item');

        const container = document.createElement('div');
        container.setAttribute('class', 'product-card');

        productImg.src = currentElement.img; 
        productTag.innerHTML = `<small>${currentElement.tag.toString()}</small>`;
        productName.innerText = currentElement.nameItem;
        productDescription.innerText = currentElement.description;        
        productPrice.innerText = `R$ ${currentElement.value.toFixed(2)};`

        container.append(productTag, productName, productDescription, productPrice, createButton(currentElement));
        li.append(productImg, container);
        mainList.appendChild(li);
    }
};

function productsFilter(list, productType) {
    let filteredProducts = [];
    
    filteredProducts = list.filter(product => product.tag.toString().toLowerCase() == productType);
    return filteredProducts;
}

function showSpecificProducts(){
    const navButtons = document.querySelector('.header-menu');

    navButtons.addEventListener('click', function(e) {
        mainList.innerHTML = '';
        btnResult = e.target.innerText.toLowerCase();
        if(btnResult == 'todos') {
            createCard(data);
        }
            else{createCard(productsFilter(data, btnResult)) }  
    })    
}

function searchBarProducts (list) {
    const searchBtn = document.querySelector('.search-button');
    let filteredProducts = [];

    searchBtn.addEventListener('click', function() {
        mainList.innerHTML = '';
        let searchValue = document.querySelector('.search-input').value.toLowerCase();
        filteredProducts = list.filter(product => product.nameItem.toLowerCase().includes(searchValue) || product.description.toLowerCase().includes(searchValue));
        createCard(filteredProducts);
    })
}

function createButton(item){
    const addProductBtn = document.createElement('button');
    addProductBtn.setAttribute('id', `product_${item.id}`);        
    addProductBtn.setAttribute('class', 'add-button');
    addProductBtn.innerText = 'Adicionar ao carrinho'
    addProductBtn.addEventListener('click', function() {
        addCartEvent(item);
    });
    return addProductBtn;
}

function addCartEvent(item) {
    const cartList = document.querySelector('.cart-list');
        cartDetails.style.display = 'flex'
        cartEmptyElement.style.display = "none";
        productsCartQuantity.innerText++;
        cartTotalValue += item.value;
        productsCartTotalValue.innerText = 'R$' + cartTotalValue.toFixed(2);

        const li = document.createElement('li');
        li.setAttribute('class', 'cart-item');

        const productImg = document.createElement('img');
        productImg.src = item.img;
        productImg.setAttribute('class', 'productCart-image');

        CartContainer = document.createElement('div');
        CartContainer.setAttribute('class', 'productCart-container');

        productCartTitle = document.createElement('h3');
        productCartTitle.innerText = item.nameItem;
        productCartTitle.setAttribute('class', 'productCart-title');
        
        const productCartPrice = document.createElement('h4');
        productCartPrice.innerText = `R$ ${item.value.toFixed(2)}`;
        productCartPrice.setAttribute('class', 'productCart-price');

        const removeProductBtn = document.createElement('button');
        removeProductBtn.innerText = 'Remover produto';
        removeProductBtn.setAttribute('id', `remove_${item.id}`);
        removeProductBtn.setAttribute('class', 'remove-button');
        removeProductBtn.addEventListener('click', function(event){
            removeElement(event)
        })


        CartContainer.append(productCartTitle, productCartPrice, removeProductBtn);
        li.append(productImg, CartContainer);
        cartList.appendChild(li);
    }

function removeElement(event){
    let listPath = event.composedPath();
    let productValue =  Number(listPath[1].childNodes[1].innerText.substring(3));
    listPath[2].remove();
    productsCartQuantity.innerText --;
    cartTotalValue -= productValue;
    productsCartTotalValue.innerText = 'R$' + cartTotalValue.toFixed(2);

    const cartList = document.querySelector('.cart-list')
    if(cartList.innerHTML == ''){
        cartEmptyElement.style.display = "flex";
        cartDetails.style.display = 'none';
    }
}

createCard(data)
showSpecificProducts()
searchBarProducts(data)