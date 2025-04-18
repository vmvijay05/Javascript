// When DOM is ready, fetch and render products
document.addEventListener("DOMContentLoaded", fetchProducts);

async function fetchProducts() {
  try {
    const res = await fetch("http://localhost:8000/get-products");
    const products = await res.json();

    const container = document.querySelector(".products");
    container.innerHTML = "";  // clear any placeholders

    // Optional: show newest first
    products.reverse().forEach(p => {
      const card = document.createElement("div");
      card.className = "product";
      card.innerHTML = `
        <img src="${p.image}" alt="${p.product_name}">
        <h3>${p.product_name}</h3>
        <p class="price">₹${p.price}</p>
        <p class="desc">${p.description}</p>
        <button class="buy-btn">Add to Cart</button>
      `;
      container.appendChild(card);
    });

  } catch (err) {
    console.error("Failed to load products:", err);
  }
}
