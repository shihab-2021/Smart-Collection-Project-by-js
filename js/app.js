// load the API 
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  spinnerDisplay('none');//For showing spinner
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div class="mb-2">
    <img class="product-image" src=${image}></img>
      </div>
      <div class="card-body">
      <h3 class="text-primary">${product.title.slice(0,50)}</h3>
      <p>Category: ${product.category}</p>
      <div class="d-flex justify-content-between">
        <h4 class="text-secondary">Rating:<br> <span class="text-danger">${product.rating.rate}</span></h4>
        <h4 class="text-secondary">Review:<br> <span class="text-danger">${product.rating.count}</span></h4>
      </div>
      <h2><span class="text-success">Price:</span> <span class="text-warning">$ </span> ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-outline-secondary">Add to cart</button>
      <button onclick="productDetails(${product.id})" id="details-btn" class="btn btn-outline-info">Details</button>
      </div>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
// Function for Product Details 
const productDetails = (id) => {
  document.getElementById('search').scrollIntoView();//for jumping to the up to show the details
  document.getElementById("product-details").textContent = '';
  spinnerDisplay('block');//For showing spinner
  console.log(id);
  fetch(`https://fakestoreapi.com/products/${id}`)
  .then(res => res.json())
  .then(data => showDetails(data));
};
const showDetails = (data) => {
  spinnerDisplay('none');//For hiding spinner
  document.getElementById("product-details").textContent = '';
  const div = document.createElement("div");
  div.innerHTML = `<div class="details mb-3 d-flex flex-lg-row flex-md-column flex-column">
        <div class="mb-2 align-self-center">
          <img class="product-image" src=${data.image}></img>
        </div>
        <div class="card-body pl-2">
          <h2 class="text-primary">${data.title}</h2>
          <h5 class="text-danger">Category: ${data.category}</h6>
          <h3 class="text-info">${data.description}</h3>
          <h4 class="text-secondary">Rating: <span class="text-danger">${data.rating.rate}</span></h4>
          <h4 class="text-secondary">Review: <span class="text-danger">${data.rating.count}</span></h4>
          <h2><span class="text-success">Price:</span> <span class="text-warning">$ </span> ${data.price}</h2>
          <button onclick="addToCart(${data.id},${data.price})" id="addToCart-btn" class="buy-now btn btn-secondary">Add to cart</button>
        </div>
      </div>
      `;
    document.getElementById("product-details").appendChild(div);
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

// Function for Spinner 
const spinnerDisplay = displaySpinner => {
  document.getElementById('spinner').style.display = displaySpinner;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
  updateTotal();
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
