const form = document.getElementById("Form");
const message = document.getElementById("message");
const productContainer = document.getElementById("product-container");

const baseEnd = "https://btl-products-api.onrender.com/products";

const fetchProducts = async () => {
  try {
    const response = await fetch(baseEnd);
    console.log(response);

    const data = await response.json();
    displayData(data);
    // console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("");
  }
};
fetchProducts();

const displayData = (data) => {
  console.log(data);

  data.forEach((item, index) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
  <img src= ${item.image} alt = ${item.title}/>
  <h2 class= "title"> ${item.title}</h2>
  <p class ="description"> ${item.description}</p>
  <p class="price">Price: &#8373;${item.price}</p>
  <button class="buttons delete-btn"> Delete</button>
  `;
    productContainer.appendChild(productCard);

    // const deleteBtn = productCard.querySelector(".delete-btn");
    // deleteBtn.addEventListener("click", () => {
    //   productCard.remove();
    // });
  });
};

const addProducts = async () => {
        try {
            const response = await fetch(baseEnd, {method:"POST", body:JSON.stringify(item),
                headers:{ "Content-Type":"application/json",
  },
            });
            if(!response.ok){throw new Error("Error sending data");

            }
            const data =await response.json();
            console.log(data);
            return data;
            
            
        } catch (error) {}
      };

form.addEventListener("submit", submitDocument);
function submitDocument(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const image = document.getElementById("image-url").value;
  const price = document.getElementById("price").value;
  const brand = document.getElementById("brand").value;

  if (
    name.length === 0 ||
    description.length === 0 ||
    image.length === 0 ||
    price.length === 0 ||
    brand.length === 0
  ) {
    message.innerText = "Please input all fields!";
    message.classList.add("error");
    return;
  }
  form.reset();
  message.innerText = "Product added successfully!";
  message.className = "success";
}
