import { deleteProductFromCart } from "./service.js";

export function createCartPage(cart, userId){


    let container = document.querySelector('.container');


    container.innerHTML = `
    
        <div class="header-container">
        <h1>Furniro</h1>

        <div class="navigation-container">
            <a href=""><p>Home</p></a>
            <a href=""><p>Shop</p></a>
            <a href=""><p>About</p></a>
            <a href=""><p>Contact</p></a>
        </div>

        <div class="navigation-container-icons">
            <a href="#" class="user-icon"><i class="fa-regular fa-user"></i></a>
            <a href=""><i class="fa-regular fa-heart"></i></a>
            <a href=""><i class="fa-solid fa-cart-shopping"></i></a>
        </div>
    </div>

    <div class="aside-container-cart">

        <div class="cart-container">
            <h1>Cart</h1>
            <p><b>Home ></b> Cart</p>
        
        </div>

    </div>

    <div class="main-container-cart">


        <table class="cart-table">
            <tr>
                <th><p>Product</p></th>
                <th><p>Price</p></th>
                <th><p>Quantity</p></th>
                <th><p>Subtotal</p></th>
            </tr>
 
        </table>


        <div class="cart-total">
            <h1>Cart Total</h1>
            <div class="total-cart">
                <p>Total</p>

            </div>

            <button class="check-out-button">Check Out</button>
        </div>
    </div>

    <div class="info-container-cart">
        <div class="card-info">
            <i class="fa-solid fa-trophy"></i>
            <div class="text-section-info">
                <p>High Quality</p>
                <p class="description-text">crafted from top materials</p>
            </div>
        </div>
        <div class="card-info">
            <i class="fa-solid fa-check"></i>
            <div class="text-section-info">
                <p>Warranty Protection</p>
                <p class="description-text">Over 2 years</p>
            </div>
        </div>
        <div class="card-info">
            <i class="fa-solid fa-truck-fast"></i>
            <div class="text-section-info">
                <p>Free Shipping</p>
                <p class="description-text">Order over $150</p>
            </div>
        </div>
        <div class="card-info">
            <i class="fa-solid fa-headset"></i>
            <div class="text-section-info">
                <p>24 / 7 Support</p>
                <p class="description-text">Dedicated support</p>
            </div>
        </div>
    </div>


    <div class="footer-container">
        <hr width="100%"/>
        <div class="footer-section">
            <div class="address-section">
                <h4>Furniro.</h4>
                <p class="description">400 University Drive Suite 200 Caral Gables <br>
                    FL 33134 USA</p>
            
            </div>
            <div class="links-section">
                <p class="description">Links</p>
                <a href=""><p>Home</p></a>
                <a href=""><p>Shop</p></a>
                <a href=""><p>About</p></a>
                <a href=""><p>Contact</p></a>
            </div>
            <div class="help-section">
                <p class="description">Help</p>
                <a href=""><p>Payment Options</p></a>
                <a href=""><p>Returns</p></a>
                <a href=""><p>Privacy Policies</p></a>
            </div>
            <div class="newsletter-section">
                <p class="description">Newsletter</p>
                <input type="email" name="email" id="newsletter-email" placeholder="Enter your email address">
                <button class="newsletter-button">SUBSCRIBE</button>
            </div>
        </div>
        <hr width="80%"/>
        <div class="end-section">
            <p>2025 furino. All rights reserved</p>
        </div>
    </div>
    
    `;
    attachProductCards(cart, userId);
    createTotalCart(cart);



    let table = document.querySelector('.cart-table');

    table.addEventListener('click', async (event) =>{
        let product = event.target;

        if(product.classList.contains("delete-product")){
            const productId = product.getAttribute("data-id");

        }

    });

}


function createTotalCart(products){

    const totalCartValue = products.reduce((total, product) => {
        return total + product.price * product.quantity;
    }, 0); 


    const p = document.createElement("p");
    p.classList.add("total-price");
    p.innerHTML = `$${totalCartValue.toFixed(2)}`; 

    let totalSection = document.querySelector('.total-cart');
    totalSection.appendChild(p);
}

function attachProductCards(products, userId) {
    let cardSection = document.querySelector('.cart-table');

    products.map(product => createCartProductCard(product, userId, products)).forEach(element => {
        cardSection.appendChild(element);
    });
}

function createCartProductCard(product, userId, products) {
    const tr = document.createElement("tr");
    tr.classList.add("product-card-cart");

    tr.innerHTML = `
        <td>${product.name}</td>
        <td>$${product.price}</td>
        <td><input type="number" name="number" id="quantity" value="${product.quantity}"></td>
        <td>$${product.price * product.quantity}</td>
        <td><a href="#" data-id="${product.productId}" class="delete-product"><i class="fa-solid fa-trash"></i></a></td>
    `;

    

    
    const deleteButton = tr.querySelector('.delete-product');
    deleteButton.addEventListener('click', async (event) => {
        event.preventDefault();
        const productId = deleteButton.getAttribute('data-id');
        console.log(productId);
        const success = await deleteProductFromCartPage(productId, userId);

        if (success) {
            
            const productIndex = products.findIndex(product => product.id === productId);
            if (productIndex !== -1) {
                products.splice(productIndex, 1); 
            }

            tr.remove();

            updateTotalCartAfterDeletion(products);
        }
    });

    return tr;
}

function updateTotalCartAfterDeletion(products) {
    const totalCartValue = products.reduce((total, product) => {
        return total + product.price * product.quantity;
    }, 0);

    const totalPriceElement = document.querySelector('.total-price');
    if (totalPriceElement) {
        totalPriceElement.innerHTML = `$${totalCartValue.toFixed(2)}`;
    }
}

async function deleteProductFromCartPage(productId, userId) {
    try {
        let result = await deleteProductFromCart(userId, productId);
        if (result.success) {
            console.log("Product deleted successfully");
            return true;
        } else {
            console.error("Failed to delete product");
            return false; 
        }
    } catch (error) {
        console.error("Error deleting product:", error);
        return false; 
    }
}