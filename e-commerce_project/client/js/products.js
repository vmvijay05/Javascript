document.addEventListener("DOMContentLoaded", fetchProduct);

async function fetchProduct() {
  await fetchProducts();
}

// Simulated login check
function isUserLoggedIn() {
  return localStorage.getItem("loggedIn") === "true";
}

async function fetchProducts() {
  try {
    const res = await fetch("http://localhost:8000/get-products");
    const products = await res.json();

    const container = document.querySelector(".products");
    container.innerHTML = "";

    products.reverse().forEach(p => {
      const card = document.createElement("div");
      card.className = "product";
      card.innerHTML = `
        <img src="${p.image}" alt="${p.product_name}">
        <h3>${p.product_name}</h3>
        <p class="price">₹${p.price}</p>
        <p class="desc">${p.description}</p>
        <button class="buy-btn" data-id="${p.product_id}">Add to Cart</button>
      `;
      container.appendChild(card);
    });

    document.querySelectorAll(".buy-btn").forEach(btn => {
      btn.addEventListener("click", async () => {
        const productId = btn.getAttribute("data-id");

        if (isUserLoggedIn()) {
          const res = await fetch("http://localhost:8000/add-to-cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ product_id: productId })
          });
          const result = await res.json();
          alert(result.message);
        } else {
          alert("Please login to add products to cart!");
          window.location.href = "cart.html";  // View-only cart
        }
      });
    });

  } catch (err) {
    console.error("Failed to load products:", err);
  }
}
