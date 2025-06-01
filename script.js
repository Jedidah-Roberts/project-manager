const form = document.getElementById("Form");
const message = document.getElementById("message");
const productContainer = document.getElementById("product-container");

const baseEnd = "https://btl-products-api.onrender.com/products";

// fetch your products from the API
const fetchProducts = async () => {
  try {
    const response = await fetch(baseEnd, { method: "GET" });
    console.log(response);
    const data = await response.json();
    displayProducts(data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
  // finally {
  //   console.log("");
  // }
};
fetchProducts();

// CREATE A DIV TO HOLD THE PRODUCT CARDS THAT WILL BE DISPLAYED
const displayProducts = (products) => {
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
  <img src= ${product.image} alt = ${product.title}/>
  <h2 class= "title"> ${product.title}</h2>
  <p class ="description"> ${product.description}</p>
  <p class="price">Price: &#8373;${product.price}</p>
  <button class="buttons delete-btn"> Delete</button>
  `;
    productContainer.appendChild(productCard);

    const deleteBtn = productCard.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
      productCard.remove();
    });
  });
};

// MAKE A POST REQUEST TO THE API
const addProduct = async (product) => {
  try {
    const response = await fetch(baseEnd, {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "Content-Type": "application/json" },
    });
    if (!response) {
      throw new Error("Error sending data");
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("Error posting data", error);
  }
};

form.addEventListener("submit", submitDocument);
function submitDocument(event) {
  event.preventDefault();

  const title = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const image = document.getElementById("image-url").value;
  const price = document.getElementById("price").value;
  const brand = document.getElementById("brand").value;

  if (
    title.length === 0 ||
    description.length === 0 ||
    image.length === 0 ||
    price.length === 0 ||
    brand.length === 0
  ) {
    message.innerText = "Please input all fields!";
    message.classList.add("error");
    return;
  }
  const newProduct = {
    title,
    description,
    image,
    price,
    brand,
  };
  console.log(newProduct);

  addProduct(newProduct);
  message.innerText = "Product added successfully!";
  message.classList.add("success");
  // form.reset();
}
