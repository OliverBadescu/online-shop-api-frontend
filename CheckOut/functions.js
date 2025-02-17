import { loadCart, createHomePage } from "../Home/functions.js";
import { createCartPage } from "../Cart/functions.js";
import { createShopPage } from "../Shop/functions.js";
import { addOrder } from "./service.js";
import { clearUserCart } from "../Cart/service.js";

export async function createCheckOutPage(userId){



    const container = document.querySelector('.container');

    container.innerHTML= 
    `
    <div class="header-container">
        <h1>Furniro</h1>

        <div class="navigation-container">
            <a href="#" class ="home-link"><p>Home</p></a>
            <a href="#" class="shop-link"><p>Shop</p></a>
            <a href="#"><p>About</p></a>
            <a href="#"><p>Contact</p></a>
        </div>

        <div class="navigation-container-icons">
            <a href="#" class="user-icon"><i class="fa-regular fa-user"></i></a>
            <a href="#"><i class="fa-regular fa-heart"></i></a>
            <a href="#" class="shopping-cart-icon"><i class="fa-solid fa-cart-shopping"></i></a>
        </div>
    </div>

    <div class="aside-container-checkout">

        <div class="cart-container">
            <h1>Checkout</h1>
            <p><b>Home ></b> Checkout</p>
        
        </div>

    </div>


    <div class="main-container-checkout">

        <div class="total-container">
            <div class="total-checkout">
                <div class="products-checkout">
                <p>Product</p>
                <div class="product-name">

                </div>
                <p>Total</p>
            </div>

            <div class="subtotal-checkout">
                <p>Subtotal</p>
                <div class="subtotal-section">
                    
                </div>
                <div class="total-text">
                    
                </div>
            </div>
        </div>

            

            <hr class="line-checkout">

            <div class="payment-method">
                <div class="credit-card">
                    <input type="radio" name="paymentMethod" id="card-payment">
                    <label for="card-payment"> Credit Card</label>
                </div>
                <div class="cash-on-delivery">
                    <input type="radio" name="paymentMethod" id="cash-on-delivery">
                    <label for="cash-on-delivery"> Cash on Delivery</label>
                </div>
            </div>

            <p class="privacy-text">Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <b>privacy policy</b>.</p>
            <div class="button-container">
                <button class="add-to-cart-product-page-button place-order-button">Place order</button>
            </div>
        </div>

    </div>

    <div class="info-container-cart info-checkout-page">
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

    const cart = await loadCart(userId);

    attachProductName(cart);
    attachSubtotal(cart);
    calculateAndAttachTotal(cart);

    let homeLink = document.querySelector(".home-link");
    
    homeLink.addEventListener('click', ()=>{
        createHomePage(userId);
    
    });
    
    const shopLink = document.querySelector('.shop-link');
        
    shopLink.addEventListener('click', () =>{
        createShopPage(userId);
    });

    const shoppingCart= document.querySelector('.shopping-cart-icon');
    
    shoppingCart.addEventListener('click',async () =>{
        const cart =await loadCart(userId);
        createCartPage(cart, userId);
    });

    const placeOrder = document.querySelector('.place-order-button');
    
    placeOrder.addEventListener('click', async() =>{
        const cart =await loadCart(userId);

        const currentDate = new Date();

   
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
        const day = String(currentDate.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;

        const productList = cart.map(item => ({
            productName: item.name, 
            productId: item.productId,     
            quantity: item.quantity 
        }));

        const orderRequest = {
            "orderDate": formattedDate,
            "productList": productList
        }

        let data = await addOrder(userId, orderRequest);

        if(data.success){
            alert("Order placed successfully");
            await clearUserCart(userId);
        }else{
            alert("Error when sending order");
        }
    });
}



function createProductName(product){

    const productElement = document.createElement('p');
    productElement.innerHTML = `<i class="grey-text">${product.name}</i> x ${product.quantity}`;
    return productElement;
}

function attachProductName(products){
    let cardSection = document.querySelector('.product-name');



    products.map(product => createProductName(product)).forEach(element =>{
        cardSection.appendChild(element);
    })
}


function createSubtotalCard(product){

    const subtotal = product.price * product.quantity.toFixed(2);

    const subtotalElement = document.createElement('p');
    subtotalElement.innerHTML = `$${subtotal}`;
    return subtotalElement;

}


function attachSubtotal(products){

    let subtotalSection = document.querySelector('.subtotal-section');
    products.map(product => createSubtotalCard(product)).forEach(element =>{
        subtotalSection.appendChild(element);
    })


}

function calculateAndAttachTotal(products){

    let container = document.querySelector('.total-text');

    const total = products.reduce((sum, product) => {
        return sum + (product.price * product.quantity);
    }, 0);

    
    container.textContent = `$${total.toFixed(2)}`;

}

