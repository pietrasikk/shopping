let products = JSON.parse(localStorage.getItem("products")) || [];

const form = document.getElementById("productForm");
const list = document.getElementById("productList");
const totalEl = document.getElementById("total");
const resetBtn = document.getElementById("resetBtn");

form.addEventListener("submit", addProduct);
resetBtn.addEventListener("click", resetList);

render();

function addProduct(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const price = parseFloat(document.getElementById("price").value);
  const quantity = parseInt(document.getElementById("quantity").value);

  products.push({
    id: Date.now(),
    name,
    price,
    quantity
  });

  saveAndRender();
  form.reset();
  document.getElementById("quantity").value = 1; // przywraca domyślną ilość
}

function deleteProduct(id) {
  products = products.filter(p => p.id !== id);
  saveAndRender();
}

function editProduct(id) {
  const product = products.find(p => p.id === id);
  const newName = prompt("Nowa nazwa:", product.name);
  const newPrice = prompt("Nowa cena:", product.price);
  const newQuantity = prompt("Nowa ilość:", product.quantity);

  if (newName && newPrice && newQuantity) {
    product.name = newName;
    product.price = parseFloat(newPrice);
    product.quantity = parseInt(newQuantity);
    saveAndRender();
  }
}

function resetList() {
  if (confirm("Na pewno usunąć całą listę?")) {
    products = [];
    localStorage.removeItem("products"); // czyści dane
    render();
  }
}

function saveAndRender() {
  localStorage.setItem("products", JSON.stringify(products));
  render();
}

function render() {
  list.innerHTML = "";
  let total = 0;

  products.forEach(p => {
    const productTotal = p.price * p.quantity; // suma dla tego produktu
    total += productTotal;

    const li = document.createElement("li");

    li.innerHTML = `
            <span>${p.name} – ${p.quantity} × ${p.price.toFixed(2)} zł = ${productTotal.toFixed(2)} zł</span>
            <div class="actions">
                <button onclick="editProduct(${p.id})">✏️</button>
                <button onclick="deleteProduct(${p.id})">❌</button>
            </div>
        `;

    list.appendChild(li);
  });

  totalEl.textContent = total.toFixed(2);
}