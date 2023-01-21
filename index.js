"use strict";
let insertProductName = document.querySelector(".insert-product-name");
let insertProductPrice = document.querySelector(".insert-product-price");
let insertProductQuantity = document.querySelector(".insert-product-quantity");
let form = document.querySelector("form");
let productItemContainer = document.querySelector(".product-item-container");
let total = document.querySelector(".total");
const getProductInfoFromLocal = () => {
    let productInfo = localStorage.getItem("productInfo");
    if (productInfo === null) {
        return [];
    }
    return JSON.parse(productInfo);
};
let productArr = getProductInfoFromLocal();
let checkProductInformation = () => {
    let displayProduct = document.querySelector(".display-product");
    console.log(productArr);
    if (productArr.length == 0) {
        displayProduct.style.display = "block";
        total.style.color = '#dc3545';
    }
    else {
        displayProduct.style.display = "none";
        total.style.color = '#28a745';
    }
};
checkProductInformation();
let setProductToLocalStorage = () => {
    localStorage.setItem("productInfo", JSON.stringify(productArr));
    getTotal();
    checkProductInformation();
};
let createProduct = () => {
    if ((insertProductName === null || insertProductName === void 0 ? void 0 : insertProductName.value.trim()) == "" ||
        (insertProductPrice === null || insertProductPrice === void 0 ? void 0 : insertProductPrice.value) == null ||
        (insertProductQuantity === null || insertProductQuantity === void 0 ? void 0 : insertProductQuantity.value) == null)
        return;
    let id;
    if (productArr.length <= 0) {
        id = 1;
    }
    else {
        id = productArr[productArr.length - 1].id + 1;
    }
    const newProduct = {
        id: id,
        productName: insertProductName.value,
        productPrice: insertProductPrice.value,
        productQuantity: insertProductQuantity.value,
    };
    productArr.push(newProduct);
    setProductToLocalStorage();
    addNewProduct(newProduct);
};
let addNewProduct = (product) => {
    let content = "";
    content += `
            <div class="items">
                <p>${product.productName}</p>
               <p>${product.productPrice}</p>
               <p>${product.productQuantity}</p>
               <button data-id=${product.id} class=" remove-product"><i class="fa-solid fa-xmark "></i></button>
                </div>
                `;
    productItemContainer.innerHTML += content;
    removeProduct();
};
let removeProduct = () => {
    let removeProducts = document.querySelectorAll(".remove-product");
    removeProducts.forEach((removeButton) => {
        removeButton.addEventListener("click", () => {
            productArr.map((productItem, index) => {
                let stringProductId = removeButton === null || removeButton === void 0 ? void 0 : removeButton.dataset.id;
                if (stringProductId !== undefined) {
                    let productIdNumber = parseInt(stringProductId);
                    if (productItem.id == productIdNumber) {
                        productArr.splice(index, 1);
                        let productInfo = removeButton.closest(".items");
                        if (productInfo !== null) {
                            productInfo.style.display = "none";
                        }
                    }
                }
            });
            setProductToLocalStorage();
        });
    });
};
let getTotal = () => {
    let totalPrice = 0;
    let stringTotalPrice = totalPrice.toString();
    if (productArr.length == 0) {
        total.innerHTML = stringTotalPrice;
    }
    else {
        productArr.map((item) => {
            let productPriceNumber = parseInt(item.productPrice);
            let productQuantityNumber = parseInt(item.productQuantity);
            totalPrice += productPriceNumber * productQuantityNumber;
            let stringTotalPrice = totalPrice.toString();
            total.innerHTML = stringTotalPrice;
        });
    }
};
getTotal();
productArr.forEach(addNewProduct);
form.addEventListener("submit", (e) => {
    e.preventDefault();
    createProduct();
    insertProductName.value = "";
    insertProductPrice.value = "";
    insertProductQuantity.value = "";
});
