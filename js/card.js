let product = JSON.parse(localStorage.getItem("selectedProduct"));
let productDetails = document.getElementById("product-details");
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartCount = document.getElementById("cart-count");

if (product) {
  productDetails.innerHTML = `
    <div class="product-details-page">
      <div class="product-image">
        <img src="${product.image}" alt="${
    product.name
  }" class="product-detail-image">
      </div>
      <div class="product-info">
        <h1 class="product-title">${product.name}</h1>
        <p class="product-price">$${product.price}</p>
              <p class="product-description">${
                product.description || "No description available."
              }</p>
        <p class="product-rating">${generateStars(product.rating)}</p>
        <p class="product-category"><strong>Category:</strong> ${
          product.category
        }</p>

              <div class="form-group">
        <label for="quantity">Quantity:</label>
        <input type="number" id="quantity" value="1" min="1">
      </div>

      
        <button class="add-btn" onclick="addToCartFromCard()">Add to Cart</button>
      </div>
    </div>
  `;
} else {
  productDetails.innerHTML = `<p>Product not found!</p>`;
}

document.getElementById("logo").addEventListener(("click"),()=>{
  window.location.href = "products.html";

})
function generateStars(rating) {
  let stars = "";
  let fullStars = Math.floor(rating);
  let halfStars = rating % 1 >= 0.5 ? 1 : 0;
  let emptyStars = 5 - fullStars - halfStars;

  for (let i = 0; i <= fullStars; i++) {
    stars += `<i class="fas fa-star text-warning"></i>`;
  }
  for (let i = 0; i < halfStars; i++) {
    stars += `<i class="fas fa-star-half-alt text-warning"></i>`;
  }
  for (let i = 0; i < emptyStars; i++) {
    stars += `<i class="far fa-star text-warning"></i>`;
  }
  return stars;
}
function addToCartFromCard() {
  let product = JSON.parse(localStorage.getItem("selectedProduct"));
  let quantity = parseInt(document.getElementById("quantity").value) || 1;

  if (!product) {
    alert("Product not found!");
    return;
  }
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  for (let i = 0; i < quantity; i++) {
    cart.push(product);
  }
  localStorage.setItem("cart", JSON.stringify(cart));

  if (cartCount) {
    cartCount.textContent = cart.length;
  }
  cartCount.style.display = "flex";
  
  console.log(cart);
  let message = document.createElement("div");
  message.innerHTML = `
            <div id="message" class="mt-3 text-success" style="display: none; font-weight: 500;">
            <i class="fa-solid fa-circle-check"></i> Product added to cart!
          </div>
    `;
  document.getElementById("product-details").appendChild(message);
  message.style.display = "block";
  setTimeout(() => {
    message.style.display = "none";
  }, 2000);




}
document.getElementById("cart-btn").addEventListener("click", openCart);

function openCart() {
  window.location.href = "cart.html";
}
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
  