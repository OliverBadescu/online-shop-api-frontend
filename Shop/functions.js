import { createHomePage, loadProducts, loadCart } from "../Home/functions.js";
import { createCartPage } from "../Cart/functions.js";
import { createProductPage } from "../ProductPage/functions.js";
import { createAccountPage } from "../Account/functions.js";

export async function createShopPage(userId){

    let container = document.querySelector(".container");
    let ct = 0;
    const limit = 16;
    container.innerHTML = `

    <div class="header-container">
        <h1>Furniro</h1>

        <div class="navigation-container">
            <a href="#" class = "home-link"><p>Home</p></a>
            <a href="#"><p>Shop</p></a>
            <a href="#"><p>About</p></a>
            <a href="#"><p>Contact</p></a>
        </div>

        <div class="navigation-container-icons">
            <a href="#" class="user-icon"><i class="fa-regular fa-user"></i></a>
            <a href="#"><i class="fa-regular fa-heart"></i></a>
            <a href="#" class="shopping-cart-icon"><i class="fa-solid fa-cart-shopping"></i></a>
        </div>
    </div>

    <div class="aside-container-shop">
        <div class="shop-container">
            <h1>Shop</h1>
            <p><b>Home ></b> Shop</p>
        
        </div>
    </div>

    <div class="filter-container">

        <div class="filter-container right-side">
            <a href="#" class="filter-button"><i class="fa-solid fa-sliders"></i></a>
            <p>Filter</p>
            <p class="result-text">Showing 1-16 of 32 results</p>
        </div>

        <div class="filter-container left-side">
            <p>Sort By</p>
            <select name="sort" id="sort-by-select" class="drop-down-select">
                <option value="price-ascending">Default</option>
                <option value="price-ascending">Price ascending</option>
                <option value="price-ascending">Price descending</option>

            </select>
        </div>

        

    </div>

    <div class="products-container-shop">
        <div class="card-section">

        </div>

        <div class="pages-section">
            <button class="page-btn active">1</button>
            <button class="page-btn">2</button>
            <button class="page-btn">3</button>
            <button class="page-btn next-btn">Next</button>
        </div>
        
    </div>

    <div class="info-container-cart-shop">
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

    await loadProducts(ct, limit, userId);

    const homeLink= document.querySelector(".home-link");

    homeLink.addEventListener('click', ()=> {
        createHomePage(userId);
    });

    const shoppingCart= document.querySelector('.shopping-cart-icon');

    shoppingCart.addEventListener('click',async () =>{
        const cart =await loadCart(userId);
        createCartPage(cart, userId);
    });

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.getAttribute('data-id');
            createProductPage(userId, productId);
        });
    });

    const userIcon = document.querySelector('.user-icon');
    
        userIcon.addEventListener('click', () => {
    
            createAccountPage(userId);
        });
    



}


