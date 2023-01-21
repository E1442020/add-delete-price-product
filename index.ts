let insertProductName = document.querySelector(
  ".insert-product-name"
) as HTMLInputElement;
let insertProductPrice = document.querySelector(
  ".insert-product-price"
) as HTMLInputElement;

let insertProductQuantity = document.querySelector(
  ".insert-product-quantity"
) as HTMLInputElement;
let form = document.querySelector("form") as HTMLFormElement;
let productItemContainer = document.querySelector(
  ".product-item-container"
) as HTMLDivElement;
let total = document.querySelector(".total") as HTMLSpanElement;

interface Product {
  id: number;
  productName: string;
  productPrice: string;
  productQuantity: string;
}

const getProductInfoFromLocal = (): Product[] => {
  let productInfo = localStorage.getItem("productInfo");
  if (productInfo === null) {
    return [];
  }
  return JSON.parse(productInfo);
};

let productArr: Product[] = getProductInfoFromLocal();

let checkProductInformation = (): void => {
  let displayProduct = document.querySelector(
    ".display-product"
  ) as HTMLParagraphElement;

  console.log(productArr);
  if (productArr.length == 0) {
    displayProduct.style.display = "block";
    total.style.color='#dc3545'
  } else {
    displayProduct.style.display = "none";
    total.style.color='#28a745'

  }
};

checkProductInformation();

let setProductToLocalStorage = (): void => {
  localStorage.setItem("productInfo", JSON.stringify(productArr));
  getTotal();
  checkProductInformation();
};

let createProduct = (): void => {
  if (
    insertProductName?.value.trim() == "" ||
    insertProductPrice?.value == null ||
    insertProductQuantity?.value == null
  )
    return;

  let id: number;
  if (productArr.length <= 0) {
    id = 1;
  } else {
    id = productArr[productArr.length - 1].id + 1;
  }

  const newProduct: Product = {
    id: id,
    productName: insertProductName.value,
    productPrice: insertProductPrice.value,
    productQuantity: insertProductQuantity.value,
  };
  productArr.push(newProduct);

  setProductToLocalStorage();

  addNewProduct(newProduct);
};

let addNewProduct = (product: Product): void => {
  let content: string = "";

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

let removeProduct = (): void => {
  let removeProducts =
    document.querySelectorAll<HTMLButtonElement>(".remove-product");

  removeProducts.forEach((removeButton) => {
    removeButton.addEventListener("click", () => {
      productArr.map((productItem, index) => {
        let stringProductId: string | undefined = removeButton?.dataset.id;
        if (stringProductId !== undefined) {
          let productIdNumber: number = parseInt(stringProductId);
          if (productItem.id == productIdNumber) {
            productArr.splice(index, 1);
            let productInfo = removeButton.closest(".items") as HTMLDivElement;
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

let getTotal = ():void => {
  let totalPrice:number= 0;
  let stringTotalPrice:string = totalPrice.toString();

  if (productArr.length == 0) {
    total.innerHTML = stringTotalPrice;
  } else {
    productArr.map((item) => {
      let productPriceNumber: number = parseInt(item.productPrice);
      let productQuantityNumber: number = parseInt(item.productQuantity);
      totalPrice += productPriceNumber * productQuantityNumber;
      let stringTotalPrice:string = totalPrice.toString();
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
