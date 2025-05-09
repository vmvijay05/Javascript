// Open/close popup
document.getElementById("createBtn").addEventListener("click", () => {
  document.getElementById("productPopup").classList.add("show");
});
document.getElementById("closePopup").addEventListener("click", () => {
  document.getElementById("productPopup").classList.remove("show");
});

// Submit new product
document.getElementById("createProductBtn").addEventListener("click", async () => {
  const product_name = document.getElementById("product_name").value;
  const description = document.getElementById("description").value;
  const image = document.getElementById("image").value;
  const price = document.getElementById("price").value;
  const stock = document.getElementById("stock").value;

  const productData = { product_name, description, image, price, stock };

  try {
    const res = await fetch("http://localhost:8000/create-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData)
    });
    const result = await res.json();

    if (res.status === 200) {
      alert(result.message);
      document.getElementById("productPopup").classList.remove("show");
      fetchProducts();
    } else {
      alert(result.message || "Failed to create product");
    }
  } catch (err) {
    console.error("Error creating product:", err);
    alert("Something went wrong.");
  }
});

// Load and render products
async function fetchProducts() {
  try {
    const res = await fetch("http://localhost:8000/get-products");
    const products = await res.json();

    const tbody = document.getElementById("productBody");
    tbody.innerHTML = "";

    // latest on top
    products.reverse().forEach(product => {
      debugger
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${product.product_id}</td>
        <td>${product.product_name}</td>.
        <td>${product.description}</td>
        <td><img src="${product.image}" alt="product" style="width:60px;height:60px;"></td>
        <td>${product.price}</td>
        <td>${product.stock}</td>
      `;
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error("Error loading products:", err);
  }
}

window.onload = fetchProducts;
