async function fetchProducts() {
  const res = await fetch("/api/products");
  const products = await res.json();
  const container = document.getElementById("product-list");
  if (container) {
    container.innerHTML = products.map ((p: any) => `<div><h3>${p.name}</h3><p>$${p.price}</p></div>`).join("");
  }
}

document.addEventListener("DOMContentLoaded", fetchProducts);
