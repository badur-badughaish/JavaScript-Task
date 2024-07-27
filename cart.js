document.addEventListener("DOMContentLoaded", function() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsDiv = document.getElementById("cart-items");
    const totalPriceDiv = document.getElementById("total-price");
    let totalPrice = 0;

    if (cartItems.length === 0) {
        cartItemsDiv.textContent = "Your cart is empty.";
    } else {
        cartItems.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.className = "c1";

            const img = document.createElement("img");
            img.src = item.imgSrc;
            img.alt = item.altText;
            img.width = 100;
            img.height = 100;

            const h3 = document.createElement("h3");
            h3.textContent = item.title;

            const p = document.createElement("p");
            p.textContent = item.description;

            const price = document.createElement("p");
            price.textContent = `Price: $${item.price}`;

            const totalPricePerItem = document.createElement("p");
            totalPricePerItem.textContent = `Total: $${item.price * item.quantity}`;

            const quantityLabel = document.createElement("label");
            quantityLabel.textContent = "Quantity: ";
            
            const quantityDiv = document.createElement("div");
            quantityDiv.className = "quantity";

            const quantityInput = document.createElement("input");
            quantityInput.type = "number";
            quantityInput.min = 1;
            quantityInput.value = item.quantity;
            quantityInput.className = "quantity-input";

            const increaseButton = document.createElement("button");
            increaseButton.textContent = "+";
            increaseButton.className = "quantity-button";
            increaseButton.onclick = () => updateQuantity(item.id, parseInt(quantityInput.value) + 1);

            const decreaseButton = document.createElement("button");
            decreaseButton.textContent = "-";
            decreaseButton.className = "quantity-button";
            decreaseButton.onclick = () => updateQuantity(item.id, parseInt(quantityInput.value) - 1);

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "delete-button";
            deleteButton.onclick = () => deleteFromCart(item.id);

            quantityDiv.appendChild(decreaseButton);
            quantityDiv.appendChild(quantityInput);
            quantityDiv.appendChild(increaseButton);

            itemDiv.appendChild(img);
            itemDiv.appendChild(h3);
            itemDiv.appendChild(p);
            itemDiv.appendChild(price);
            itemDiv.appendChild(quantityLabel);
            itemDiv.appendChild(quantityDiv);
            itemDiv.appendChild(totalPricePerItem);
            itemDiv.appendChild(deleteButton);

            cartItemsDiv.appendChild(itemDiv);

            totalPrice += item.price * item.quantity;
        });

        totalPriceDiv.textContent = `Total Price: $${totalPrice}`;
    }
});

function updateQuantity(productId, quantity) {
    if (quantity < 1) return; // Prevent setting quantity less than 1
    let cart = JSON.parse(localStorage.getItem("cart"));
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity = parseInt(quantity);
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
    }
}

function deleteFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}
