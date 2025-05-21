// document.addEventListener("DOMContentLoaded", () => {
//   fetchProduct();

//   const searchInput = document.getElementById("searchInput");
//   searchInput.addEventListener("input", handleSearch);
// });

// let allProducts = []; // global array to hold products

// async function fetchProduct() {
//   await fetchProducts();
// }

// // Simulated login check
// function isUserLoggedIn() {
//   return localStorage.getItem("loggedIn") === "true";
// }

// async function fetchProducts() {
//   try {
//     const res = await fetch("http://localhost:8000/get-products");
//     allProducts = await res.json(); // save to global array

//     renderProducts(allProducts); // initially show all products
//   } catch (err) {
//     console.error("Failed to load products:", err);
//   }
// }

// function renderProducts(products) {
//   const container = document.querySelector(".products");
//   container.innerHTML = "";

//   products.reverse().forEach(p => {
//     const card = document.createElement("div");
//     card.className = "product";
//     card.innerHTML = `
//       <img src="${p.image}" alt="${p.product_name}">
//       <h3>${p.product_name}</h3>
//       <p class="price">₹${p.price}</p>
//       <p class="desc">${p.description}</p>
//       <button class="buy-btn" data-id="${p.product_id}">Add to Cart</button>
//     `;
//     container.appendChild(card);
//   });

//   document.querySelectorAll(".buy-btn").forEach(btn => {
//     btn.addEventListener("click", async () => {
//       const productId = btn.getAttribute("data-id");

//       if (isUserLoggedIn()) {
//         const res = await fetch("http://localhost:8000/add-to-cart", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ product_id: productId })
//         });
//         const result = await res.json();
//         alert(result.message);
//       } else {
//         alert("Please login to add products to cart!");
//         window.location.href = "cart.html";  // View-only cart
//       }
//     });
//   });
// }

// // Search functionality
// function handleSearch(e) {
//   const keyword = e.target.value.toLowerCase();

//   const filteredProducts = allProducts.filter(p =>
//     p.product_name.toLowerCase().includes(keyword) ||
//     p.description.toLowerCase().includes(keyword)
//   );

//   renderProducts(filteredProducts.reverse()); // Show matching products
// }

document.addEventListener("DOMContentLoaded", () => {
  fetchProduct();

  document.getElementById("searchInput").addEventListener("input", applyFilters);
  document.getElementById("minRange").addEventListener("input", handleRangeChange);
  document.getElementById("maxRange").addEventListener("input", handleRangeChange);
  document.getElementById("minDropdown").addEventListener("change", handleDropdownChange);
  document.getElementById("maxDropdown").addEventListener("change", handleDropdownChange);
  document.getElementById("clearBtn").addEventListener("click", clearFilters);
});

let allProducts = [];

async function fetchProduct() {
  try {
    const res = await fetch("http://localhost:8000/get-products");
    allProducts = await res.json();
    renderProducts(allProducts);
  } catch (err) {
    console.error("Failed to load products:", err);
  }
}

function isUserLoggedIn() {
  return localStorage.getItem("loggedIn") === "true";
}

function renderProducts(products) {
  const container = document.querySelector(".products");
  container.innerHTML = "";

  products.forEach(p => {
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
        window.location.href = "cart.html";
      }
    });
  });
}

function applyFilters() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const minPrice = parseInt(document.getElementById("minRange").value);
  const maxPrice = parseInt(document.getElementById("maxRange").value);

  const filtered = allProducts.filter(p => {
    const nameMatch = p.product_name.toLowerCase().includes(keyword);
    const descMatch = p.description.toLowerCase().includes(keyword);
    const priceMatch = p.price >= minPrice && p.price <= maxPrice;
    return (nameMatch || descMatch) && priceMatch;
  });

  renderProducts(filtered);
}

function handleRangeChange() {
  const min = parseInt(document.getElementById("minRange").value);
  const max = parseInt(document.getElementById("maxRange").value);

  if (min > max) {
    document.getElementById("minRange").value = max;
  }

  applyFilters();
}

function handleDropdownChange() {
  const min = parseInt(document.getElementById("minDropdown").value);
  const max = parseInt(document.getElementById("maxDropdown").value);

  if (min > max) return;

  document.getElementById("minRange").value = min;
  document.getElementById("maxRange").value = max;

  applyFilters();
}

function clearFilters() {
  document.getElementById("minRange").value = 0;
  document.getElementById("maxRange").value = 50000;
  document.getElementById("minDropdown").value = "0";
  document.getElementById("maxDropdown").value = "50000";
  document.getElementById("searchInput").value = "";

  renderProducts(allProducts);
}
