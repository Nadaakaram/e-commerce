let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCartItems() {
  let cartList = document.getElementById("cart-list");
  let cartTotal = document.getElementById("cart-total");
  let cartCount = document.getElementById("cart-count");


  if (cart.length > 0) {
    cartCount.textContent = cart.length;
    cartCount.style.display = "flex";
  } else {
    cartCount.style.display = "none";
  }


  if (!cartList || !cartTotal || !cartCount) return;

  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartList.innerHTML = '<p class="lead">Your cart is empty.</p>';
    cartTotal.innerHTML = "";
    cartCount.innerHTML = 0;
    return;
  }

  cart.forEach((item) => {
    let cartItem = document.createElement("div");
    cartItem.className = "col-12 border-bottom pb-3";
    cartItem.innerHTML = `
      <div class="d-flex justify-content-between align-items-center p-2">
        <div>
          <h5>${item.name}</h5>
          <p class="text-muted mb-1">Price: $${item.price}</p>
        </div>
        <button class="btn btn-danger ms-5 remove-from-cart" data-id="${item.id}">Remove</button>
      </div>
    `;
    cartList.appendChild(cartItem);
  });


  
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
cartTotal.innerHTML = `<h4>Total: $${totalPrice.toFixed(2)}</h4>`;
cartCount.innerHTML = cart.length;

  document.querySelectorAll(".remove-from-cart").forEach((button) => {
    button.addEventListener("click", () => {
      let id = Number(button.getAttribute("data-id"));
      removeFromCart(id);
    });
  });

}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id != productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCartItems();
}

displayCartItems();

function buyNow() {
  if (cart.length === 0) {
    empty = document.createElement("div");
        empty.className = "alert alert-danger col text-center";
        empty.innerHTML=`
        <p class="text-danger lead">Your cart is empty. Please add items to your cart before proceeding to checkout.</p>
        `
        let emptyCart = document.getElementById("emptyCart");
        emptyCart.appendChild(empty);


    return;
  }

  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCartItems();

  window.location.href = "shipped.html";
}



document.getElementById("logo").addEventListener("click", () => {
  window.location.href = "products.html";
});

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
