document.addEventListener("DOMContentLoaded", async function () {
    var Buy_Now_Price=0;
    // API endpoint URL from Crudcrud.
    const url =
        "https://crudcrud.com/api/ea97d978e83241aaa53ee1531a7165a4/CandyCartData";

    // Initial list of candies
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
        // {
        //     id: 6,
        //     name: "Pulse",
        //     description: "The real taste of kachha-aam.",
        //     price: 10,
        //     availability: 100,
        // },
    ];

    // Select the candy list container
    const candyList = document.getElementById("candyList");

     // Select the container for selected candies (cart)
     const selectedCandies = document.getElementById("selectedCandies");
     let cart = [];

     const getCandyData = () => {
        return new Promise((resolve, reject) => {
            axios.get(`${url}`)
                .then(response => resolve(response.data))
                .catch(error => reject(error));
        });
    };

    const AddToCartInBackend = (method, data) => {
        return new Promise((resolve, reject) => {
            axios[method](`${url}`, data)
                .then((response) => {
                    resolve(response);
                    console.log(`POST Request Successful - New candy added`)
                })
                .catch((error) =>{ 
                    reject(error);
                    console.log(error);
                });
        });
    };

    const updateCartItemInBackend = (id, data) => {
        return new Promise((resolve, reject) => {
            axios.put(`${url}/${id}`, data)
            .then((response) => {
                resolve(response);
                console.log(`PUT Request Successful - Updated quantity: ${data.quantity}`)
            })
            .catch((error) =>{ 
                reject(error);
                console.log(error);
            });
        });
    };

    const deleteCartItemBackend = (id) => {
        return new Promise((resolve, reject) => {
            axios.delete(`${url}/${id}`)
            .then((response) => {
                resolve(response);
                console.log(`DELETE Request Successful - Candy deleted from endpoint`)
            })
            .catch((error) =>{ 
                reject(error);
                console.log(error);
            });
        });
    };

    const renderCart = () => {
        Buy_Now_Price = 0;
        selectedCandies.innerHTML = "";
        cart.forEach((item, index) => {
            const total_price = item.price * item.quantity;
            Buy_Now_Price = Buy_Now_Price + total_price;
            const div = document.createElement("div");
            div.className = "cart-item";
            div.innerHTML = `
                <span>${item.name} x ${item.quantity} x &#8377;${total_price}</span>
                <button class="btn btn-info btn-sm edit-btn" data-index="${index} mr-2">Edit</button>
                <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Delete</button>
            `;
            selectedCandies.appendChild(div);
            div.querySelector(".edit-btn").addEventListener(
                "click",
                function () {
                    editCartItem(index);
                }
            );
            div.querySelector(".delete-btn").addEventListener(
                "click",
                function () {
                    deleteCartItem(index);
                }
            );
        });
    };
    const updateAvailabilityInDOM = (candyId, updatedAvailability) => {
        const availabilityElement = document.getElementById(
            `check-availability-${candyId}`
        );
        if (availabilityElement) {
            availabilityElement.textContent = `Available: ${updatedAvailability}`;
        }
    };

    const updateAvailabilityInDOMafterDeletion = (itemToDelete) => {
        const updatedAvailability = itemToDelete.availability + itemToDelete.quantity;
        const availabilityElement = document.getElementById(
            `check-availability-${itemToDelete.id}`
        );
        if (availabilityElement) {
            availabilityElement.textContent = `Available: ${updatedAvailability}`;
        }
    };

    const addToCart = async (candy, quantity) => {
        try {
            const cartData = await getCandyData();
            const cartItem = cartData.find(item => item.id === candy.id);
            const cartItemlocal = cart.find(item => item.id === candy.id);

            if (cartItemlocal) {
                cartItemlocal.quantity = quantity;
            }

            if (cartItem) {
                cartItem.quantity = quantity;
                const updatedAvailability = candy.availability - quantity;
                updateAvailabilityInDOM(candy.id, updatedAvailability);
                await updateCartItemInBackend(cartItem._id, {
                    id: cartItem.id,
                    name: cartItem.name,
                    availability: candy.availability - cartItem.quantity,
                    price: cartItem.price,
                    quantity: cartItem.quantity
                });
            } else {
                cart.push({ ...candy, quantity: quantity });
                const updatedAvailability = candy.availability - quantity;
                updateAvailabilityInDOM(candy.id, updatedAvailability);
                await AddToCartInBackend("post", {
                    id: candy.id,
                    name: candy.name,
                    availability: candy.availability - quantity,
                    price: candy.price,
                    quantity: quantity
                });
            }
            renderCart();
        } catch (error) {
            console.log(error);
        }
    };

    const editCartItem = (index) => {
        const item = cart[index];
        const confirmEdit = confirm(`Do you want to edit ${cart[index].name}?`);
        if (confirmEdit) {
            const quantityInputs = candyList.getElementsByClassName("quantity-input");
            for (let input of quantityInputs) {
                if (input.dataset.id == item.id) {
                    input.value = item.quantity;
                    break;
                }
            }
        }
    };

    const deleteCartItem = async (index) => {
        const item = cart[index];
        const confirmDelete = confirm(`Do you want to delete ${cart[index].name}?`);
        if (confirmDelete) {
            try {
                const cartData = await getCandyData();
                const itemToDelete = cartData.find(item => item.id === cart[index].id);
                if (itemToDelete) {
                    cart.splice(index, 1);
                    renderCart();
                    const quantityInputs = candyList.getElementsByClassName("quantity-input");
                    for (let input of quantityInputs) {
                        if (input.dataset.id == item.id) {
                            input.value = 0;
                            break;
                        }
                    }
                    await deleteCartItemBackend(itemToDelete._id);
                    updateAvailabilityInDOMafterDeletion(itemToDelete);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

     //Attaching event listener to BUY NOW button
     const BuyNowButton = document.getElementById("buyNowBtn");
     BuyNowButton.addEventListener("click", function () {
         alert("Your total price is: Rs " + Buy_Now_Price);
     });


    // Render each candy card
    candies.forEach((candy) => {
        const card = document.createElement("div");
        card.className = "card mb-3";
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title" data-id="${candy.id}">${candy.name}</h5>
                <p class="card-text" data-id="${candy.id}">${candy.description}</p>
                <p class="card-text" data-id="${candy.id}">Price:&#8377;${candy.price}</p>
                <p class="card-text" data-id="${candy.id}" id="check-availability-${candy.id}">Available: ${candy.availability}</p>
                <input type="number" min="0" max="10" value="0" class="form-control quantity-input" data-id="${candy.id}">
                <button class="btn btn-success mt-2 add-to-cart-btn" data-id="${candy.id}">Add to Cart</button>
            </div>
        `;
        candyList.appendChild(card);

        // Event listener for adding candy to cart
        card.querySelector(".add-to-cart-btn").addEventListener(
            "click",
            function () {
                const quantity = parseInt(
                    card.querySelector(".quantity-input").value,
                    10
                ); //Converting the input field value into a number.
                if (quantity > 0 && quantity <= 10) {
                    addToCart(candy, quantity);
                }
                else {
                    alert("Please enter a quantity between 1 to 10.");
                }
            }
        );
    });

    try {
        const cartData = await getCandyData();
        cart = cartData;
        renderCart();
        for (let item of cart) {
            const availabilityElement = document.getElementById(
                `check-availability-${item.id}`
            );
            if (availabilityElement) {
                const updatedAvailability = item.availability;
                availabilityElement.textContent = `Available: ${updatedAvailability}`;
            }
        }
    } catch (error) {
        console.log(error);
    }

   
    

});
