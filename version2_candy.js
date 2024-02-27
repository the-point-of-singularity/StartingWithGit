document.addEventListener("DOMContentLoaded", function () {
    const url =
        "https://crudcrud.com/api/4e12c54ac5154931ad2eade302add356/CandyCartData";
    const candies = [
        {
            id: 1,
            name: "Dairy Milk",
            description: "Rich cocoa with a smooth finish.",
            price: 50,
            availability: 100,
        },
        {
            id: 2,
            name: "Mango Bites",
            description: "Tangy and sweet, a perfect chew.",
            price: 20,
            availability: 150,
        },
        {
            id: 3,
            name: "Alpenliebe",
            description: "Soft, fruity, and irresistible.",
            price: 10,
            availability: 200,
        },
        {
            id: 4,
            name: "Melody",
            description: "A festive choclaty treat.",
            price: 15,
            availability: 250,
        },
        {
            id: 5,
            name: "Hajmola",
            description: "Long-lasting and flavorful.",
            price: 30,
            availability: 300,
        },
    ];

    const candyList = document.getElementById("candyList");

    candies.forEach((candy) => {
        const card = document.createElement("div");
        card.className = "card mb-3";
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title" data-id="${candy.id}">${candy.name}</h5>
                <p class="card-text" data-id="${candy.id}">${candy.description}</p>
                <p class="card-text" data-id="${candy.id}">Price: Rs${candy.price}</p>
                <p class="card-text" data-id="${candy.id}" id="check-availability-${candy.id}">Available: ${candy.availability}</p>
                <input type="number" min="0" max="10" value="0" class="form-control quantity-input" data-id="${candy.id}">
                <button class="btn btn-success mt-2 add-to-cart-btn" data-id="${candy.id}">Add to Cart</button>
            </div>
        `;
        candyList.appendChild(card);

        card.querySelector(".add-to-cart-btn").addEventListener(
            "click",
            function () {
                const quantity = parseInt(
                    card.querySelector(".quantity-input").value,
                    10
                );
                if (quantity > 0 && quantity <= 10) {
                    addToCart(candy, quantity);
                }
            }
        );
    });

    const selectedCandies = document.getElementById("selectedCandies");

    let cart = [];

    function addToCart(candy, quantity) {
        axios
            .get(`${url}`)
            .then((response) => {
                const cartData = response.data;
                const cartItem = cartData.find((item) => item.id === candy.id);

                // Updating the cart locally
                const cartItemlocal = cart.find((item) => item.id === candy.id);
                if (cartItemlocal) {
                    cartItemlocal.quantity = quantity;
                }

                if (cartItem) {
                    // Candy already exists in the cart, update the quantity
                    cartItem.quantity = quantity;

                    // Update availability in the DOM
                    const availabilityElement = document.getElementById(
                        `check-availability-${candy.id}`
                    );
                    console.log(availabilityElement);
                    if (availabilityElement) {
                        const updatedAvailability =
                            candy.availability - quantity;
                        availabilityElement.textContent = `Available: ${updatedAvailability}`;
                    }

                    // Axios PUT request to update the quantity
                    axios
                        .put(`${url}/${cartItem._id}`, {
                            id: cartItem.id,
                            name: cartItem.name,
                            availability:
                                candy.availability - cartItem.quantity,
                            price: cartItem.price,
                            quantity: cartItem.quantity,
                        })
                        .then((response) => {
                            console.log(
                                `PUT Request Successful - Updated quantity: ${cartItem.quantity}`
                            );
                            renderCart();
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                } else {
                    cart.push({ ...candy, quantity: quantity });

                    // Update availability in the DOM
                    const availabilityElement = document.getElementById(
                        `check-availability-${candy.id}`
                    );
                    console.log(availabilityElement);
                    if (availabilityElement) {
                        const updatedAvailability =
                            candy.availability - quantity;
                        availabilityElement.textContent = `Available: ${updatedAvailability}`;
                    }

                    // Candy doesn't exist in the cart, add it
                    axios
                        .post(`${url}`, {
                            id: candy.id,
                            name: candy.name,
                            availability: candy.availability - quantity,
                            price: candy.price,
                            quantity: quantity,
                        })
                        .then((response) => {
                            console.log(
                                `POST Request Successful - New candy added`
                            );
                            renderCart();
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function renderCart() {
        selectedCandies.innerHTML = ""; // Clear the cart display
        cart.forEach((item, index) => {
            const total_price = item.price * item.quantity;
            const div = document.createElement("div");
            div.className = "cart-item";
            div.innerHTML = `
                <span>${item.name} x ${item.quantity} x Rs${total_price}</span>
            `;
            selectedCandies.appendChild(div);
        });
    }

    // Axios GET request to fetch cart data when the page loads
    axios
        .get(`${url}`)
        .then((response) => {
            cart = response.data;
            renderCart();
            // Update availability in the DOM
            for (let item of cart) {
                const availabilityElement = document.getElementById(
                    `check-availability-${item.id}`
                );
                if (availabilityElement) {
                    const updatedAvailability = item.availability;
                    availabilityElement.textContent = `Available: ${updatedAvailability}`;
                }
            }
        })
        .catch((error) => {
            console.log(error);
        });
});
