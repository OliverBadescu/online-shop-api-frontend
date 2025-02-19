import { getUserById, updateUser } from "./service.js";
import { getAllCustomerOrders } from "../CheckOut/service.js";
import { createHomePage } from "../Home/functions.js";
import { createCartPage } from "../Cart/functions.js";
import { createShopPage } from "../Shop/functions.js";
import { loadCart } from "../Home/functions.js";

export async function createAccountPage(userId) {
    let container = document.querySelector('.container');

    let data = await getUserById(userId);
    const user = data.body;


    
    container.innerHTML = `
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

    <div class="aside-container-cart">
        <div class="cart-container">
            <h1>Account</h1>
            <p><b>Home ></b> Account</p>
        </div>
    </div>

    <div class="main-container-account">
        <div class="left-side-buttons">
            <button class="my-account-button" disabled>My account</button>
            <button class="my-orders-button">My orders</button>
        </div>

        <div class="right-side-info">
            <div class="email-input">
                <p>Email:</p>
                <input type="email" name="email" id="email-register" value="${user.email}">
            </div>
            <div class="name-input">
                <p>Full name:</p>
                <input type="text" name="name" id="name-register" value="${user.fullName}">
            </div>
            <div class="phone-input">
                <p>Phone:</p>
                <input type="number" name="phone" id="phone-register" value="${user.phone}">
            </div>
            <div class="country-input">
                <p>Country:</p>
                <input type="text" name="country" id="country-register" value="${user.country}">
            </div>
            <div class="billing-input">
                <p>Billing address:</p>
                <input type="text" name="billing" id="billing-register" value="${user.billing}">
            </div>
            <div class="shipping-input">
                <p>Shipping address:</p>
                <input type="text" name="shipping" id="shipping-register" value="${user.shipping}">
            </div>

            <button class="save-changes-button">Save Changes</button>
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

    <button class="save-changes-button" style="display: none;">Save Changes</button>
    `;

    
    const saveChangesButton = container.querySelector('.save-changes-button');
    const myAccountButton = container.querySelector('.my-account-button');
    const myOrdersButton = container.querySelector('.my-orders-button');
    const rightSideInfo = container.querySelector('.right-side-info');

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


    const updateForm = document.querySelector('.right-side-info');
    updateForm.addEventListener('input', () =>{

        saveChangesButton.style.display = 'block';
        
    });
   

    saveChangesButton.addEventListener('click', async () => {
        
        const updateRequest = {
            email: document.getElementById('email-register').value,
            fullName: document.getElementById('name-register').value,
            phone: document.getElementById('phone-register').value,
            country: document.getElementById('country-register').value,
            billingAddress: document.getElementById('billing-register').value,
            shippingAddress: document.getElementById('shipping-register').value,
        };

      
        try {
            const response = await updateUser(userId, updateRequest);
            alert('Changes saved successfully!');
            
            saveChangesButton.style.display = 'none';
        } catch (error) {
            alert('Failed to save changes. Please try again.');
        }
    });

    myOrdersButton.addEventListener('click', async () => {
       
        myOrdersButton.disabled = true;
        myAccountButton.disabled = false;

        const data = await getAllCustomerOrders(userId);

        const orders = data.body.list;


        rightSideInfo.innerHTML = '';

        if (orders.length > 0) {
            orders.forEach(order => {
                const orderCard = document.createElement('div');
                orderCard.className = 'order-card';
                orderCard.innerHTML = `
                    <h3>Order ID: ${order.id}</h3>
                    <p>Date: ${order.orderDate}</p>
                    <p>Total: $${order.amount}</p>
                    <p>Status: ${order.orderStatus}</p>
                `;
                rightSideInfo.appendChild(orderCard);
            });
        } else {
            rightSideInfo.innerHTML = '<p>No orders found.</p>';
        }
    });

    myAccountButton.addEventListener('click', () => {
        
        myAccountButton.disabled = true;
        myOrdersButton.disabled = false;

        
        rightSideInfo.innerHTML = `
            <div class="email-input">
                <p>Email:</p>
                <input type="email" name="email" id="email-register" value="${user.email}">
            </div>
            <div class="name-input">
                <p>Full name:</p>
                <input type="text" name="name" id="name-register" value="${user.fullName}">
            </div>
            <div class="phone-input">
                <p>Phone:</p>
                <input type="number" name="phone" id="phone-register" value="${user.phone}">
            </div>
            <div class="country-input">
                <p>Country:</p>
                <input type="text" name="country" id="country-register" value="${user.country}">
            </div>
            <div class="billing-input">
                <p>Billing address:</p>
                <input type="text" name="billing" id="billing-register" value="${user.billing}">
            </div>
            <div class="shipping-input">
                <p>Shipping address:</p>
                <input type="text" name="shipping" id="shipping-register" value="${user.shipping}">
            </div>

            <button class="save-changes-button">Save Changes</button>
        `;
    });
}