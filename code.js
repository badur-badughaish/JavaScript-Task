document.addEventListener("DOMContentLoaded", function() {
    const products = [
        {
            id: 1,
            imgSrc: "/product1.jpg",
            altText: "product1",
            title: "Sony WH-CH520",
            description: "Wireless Headphones Bluetooth On-Ear Headset with Microphone, Black",
            price: 50
        },
        {
            id: 2,
            imgSrc: "/product2.jpg",
            altText: "product2",
            title: "JBL Tune 510BT",
            description: "Wireless On-Ear Headphones with Purebass Sound - White, Medium",
            price: 70
        },
        {
            id: 3,
            imgSrc: "/product3.jpg",
            altText: "product3",
            title: "Bose",
            description: "QuietComfort Wireless Noise Cancelling Headphones, with Up To 24 Hours of Battery Life, Black",
            price: 100
        }
    ];

    const productList = document.getElementById("product-list");

    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "c1";

        const img = document.createElement("img");
        img.src = product.imgSrc;
        img.alt = product.altText;
        img.width = 100;
        img.height = 100;

        const h3 = document.createElement("h3");
        h3.textContent = product.title;

        const p = document.createElement("p");
        p.textContent = product.description;

        const price = document.createElement("p");
        price.textContent = `Price: $${product.price}`;

        const quantityDiv = document.createElement("div");
        quantityDiv.className = "quantity";

        const quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.min = 1;
        quantityInput.value = 1;
        quantityInput.className = "quantity-input";

        const increaseButton = document.createElement("button");
        increaseButton.textContent = "+";
        increaseButton.className = "quantity-button";
        increaseButton.onclick = () => quantityInput.value = parseInt(quantityInput.value) + 1;

        const decreaseButton = document.createElement("button");
        decreaseButton.textContent = "-";
        decreaseButton.className = "quantity-button";
        decreaseButton.onclick = () => {
            if (parseInt(quantityInput.value) > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
            }
        };

        const button = document.createElement("button");
        button.textContent = "Add";
        button.onclick = () => addToCart(product, quantityInput.value);

        quantityDiv.appendChild(decreaseButton);
        quantityDiv.appendChild(quantityInput);
        quantityDiv.appendChild(increaseButton);

        productDiv.appendChild(img);
        productDiv.appendChild(h3);
        productDiv.appendChild(p);
        productDiv.appendChild(price);
        productDiv.appendChild(quantityDiv);
        productDiv.appendChild(button);

        productList.appendChild(productDiv);
    });
});

function addToCart(product, quantity) {
    let cart = localStorage.getItem("cart");
    cart = cart ? JSON.parse(cart) : [];

    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += parseInt(quantity);
    } else {
        product.quantity = parseInt(quantity);
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item(s) added to cart");
}
