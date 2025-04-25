let sliderImages = [
  "images/hero-section-bg.jpg",
  "images/hero2.jpg",
   "images/hero4.jpg",
  "images/hero3.jpg",
];
let currentSlide = 0;
let sliderImg = document.getElementById("slider-img");
let prevBtn = document.getElementById("prev-btn");
let nextBtn = document.getElementById("next-btn");


let productList = document.getElementById("product-list");
let cartCount = document.getElementById("cart-count");
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let allProducts = [];
let message = document.createElement("div");
message.id = "cart-message";

function changeImages() {
  sliderImg.src = sliderImages[currentSlide];
}

nextBtn.addEventListener(("click"),()=>{
  currentSlide++;
  if(currentSlide >= sliderImages.length){
    currentSlide = 0;
  }
  changeImages();
})

prevBtn.addEventListener(("click"), ()=>{
  currentSlide--;
  if(currentSlide<0){
    currentSlide = sliderImages.length - 1;
  }
  changeImages();
})
setInterval(()=>{
  currentSlide++;
  if(currentSlide>= sliderImages.length){
    currentSlide = 0;
  }
  changeImages();
}, 3000);

cartCount.textContent = cart.length;

fetch("products.json")
  .then((response) => response.json())
  .then((data) => {
    allProducts = data.products;
    displayProducts(allProducts);
  })
  .catch((error) => console.error("Error loading products:", error));

document.getElementById("sort-filter").addEventListener("change", () => {
  let selected = document.getElementById("sort-filter").value;
  let sortedProducts = [...allProducts];

  if (selected === "asc") {
    sortedProducts.sort((a, b) => {
      return a.price - b.price;
    });
  } else if (selected === "desc") {
    sortedProducts.sort((a, b) => {
      return b.price - a.price;
    });
  }
  displayProducts(sortedProducts);
});

document.getElementById("logo").addEventListener(("click"),()=>{
  window.location.href = "products.html";

})

function displayProducts(productsArr) {
  productList.innerHTML = "";
  productsArr.forEach((product) => {
    let productItem = document.createElement("div");
    productItem.className = "product-item";
    productItem.innerHTML = `

<div class="card product-clickable" style="width: 18rem;">
  <img src="${product.image}" class="card-img-top" alt="${product.name}">
  <div class="card-body">
    <h3 class="card-title">${product.name}</h3>
    <p class="card-text lead">Price: $<strong>${product.price}</strong></p>
    
    <a href="#" class="btn btn-primary add-to-cart" data-id="${product.id}">Add to cart</a>
  </div>
</div>
        `;

    productList.appendChild(productItem);
  });

  document.querySelectorAll(".product-clickable").forEach((item) => {
    item.addEventListener("click", (e) => {
      if (e.target.classList.contains("add-to-cart")) return; 
      let productId = item
        .querySelector(".add-to-cart")
        .getAttribute("data-id");
      let product = allProducts.find((p) => p.id == productId);
      console.log(product);
      if (product) {
        localStorage.setItem("selectedProduct", JSON.stringify(product));
        window.location.href = "card.html";
      } else {
        console.error("Product not found!");
      }
    });
  });

  let addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      let productId = button.getAttribute("data-id");
      addToCart(productId);
    });
  });
}

function addToCart(productId) {
  let product = allProducts.find((p) => p.id == productId);
  if (product) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    cartCount.textContent = cart.length;

    showMessage("Product added to cart!", "success");
  } else {
    showMessage("Product not found!", "error");
  }
}

function showMessage(productId, message, type) {
  let productCard = document
    .querySelector(`[data-id="${productId}"]`)
    .closest(".card-body");

  let messageDiv = productCard.querySelector("#cart-message");
  if (!messageDiv) {
    messageDiv = document.createElement("div");
    messageDiv.id = "cart-message";
  }
  messageDiv.innerHTML = `
<i class="fa-solid ${
    type === "success" ? "fa-circle-check" : "fa-circle-xmark"
  }"></i> ${message}`;

  productCard.appendChild(messageDiv);
  setTimeout(() => {
    messageDiv.style.animation = "fadeOut 0.5s";
    setTimeout(() => messageDiv.remove(), 500);
  }, 3000);
}

function openCart() {
  window.location.href = "cart.html";
}

document
  .getElementById("category-filter")
  .addEventListener("change", function () {
    let selected = this.value;
    let filtered =
      selected === "all"
        ? allProducts
        : allProducts.filter((p) => p.category === selected);
    displayProducts(filtered);
  });

if (cart.length > 0) {
  cartCount.textContent = cart.length;
  cartCount.style.display = "flex";
} else {
  cartCount.style.display = "none";
}



const scrollToTopBtn = document.getElementById("scrollToTopBtn");
window.onscroll = function () {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
};

scrollToTopBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
