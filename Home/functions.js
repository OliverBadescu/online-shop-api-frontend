import { getAllProducts } from "./service.js";
import { createCartPage } from "../Cart/functions.js";
import { getCartByUserId } from "../Cart/service.js";
import { createShopPage } from "../Shop/functions.js";
import { createAccountPage } from "../Account/functions.js";


export async function createHomePage(userId){

    let container = document.querySelector(".container");
    let ct = 0;
    const limit = 8;
    container.innerHTML = `

    <div class="header-container">
        <h1>Furniro</h1>

        <div class="navigation-container">
            <a href="#"><p>Home</p></a>
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


    <div class="aside-container">

        <div class="content-container">
            <p class="line-space">New Arrival</p>
            <h2>Discover Our <br> New Collection</h2>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, obcaecati. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam, suscipit.</p>
            <button class="buy-now-btn">BUY NOW</button>
        </div>

    </div>


    <div class="main-container">

        <div class="range-container">
            <div class="title-container">
                <h1>Browse The Range</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt, autem.</p>
            </div>
            <div class="section-container">
                <div class="section-card dining-section">
                    <img src="assets/imgs/dining.jpg" alt="dining" class="dining-img">
                    <p>Dining</p>
                </div>
                <div class="section-card living-section">
                    <img src="assets/imgs/living.jpg" alt="dining">
                    <p>Living</p>
                </div>
                <div class="section-card bedroom-section">
                    <img src="assets/imgs/bedroom.jpg" alt="dining">
                    <p>Bedroom</p>
                </div>
            </div>
        </div>


        <div class="products-container">
            <div class="title">
                <h1>Our Products</h1>
            </div>
            <div class="card-section">

            </div>

            <button class="show-more-button">Show More</button>
            
        </div>


        <div class="setup-container">
            <p>Share your setup with</p>
            <h1>#FuniroFurniture</h1>
            <img src="assets/imgs/setup.png" alt="">
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

    loadProducts(ct, limit, userId);

    const showMore = document.querySelector('.show-more-button');
    const shoppingCart= document.querySelector('.shopping-cart-icon');

    showMore.addEventListener('click', ()=>{
        ct+= limit;
        loadProducts(ct, limit);

    });

    shoppingCart.addEventListener('click',async () =>{
        const cart =await loadCart(userId);
        createCartPage(cart, userId);
    });

    const shopLink = document.querySelector('.shop-link');

    shopLink.addEventListener('click', () =>{
        createShopPage(userId);
    });

    const buyNow = document.querySelector(".buy-now-btn");

    buyNow.addEventListener('click' , () =>{
        createShopPage(userId);
    });

    const userIcon = document.querySelector('.user-icon');

    userIcon.addEventListener('click', () => {

        createAccountPage(userId);
    });



}

function createProductCard(product) {
    const div = document.createElement("div");
    div.classList.add("product-card");

    div.innerHTML = `
        <img src="assets/imgs/test.jpg" alt="">
        <p>${product.name}</p>
        <p class="description">${product.description}</p>
        <p>$${product.price}</p>
        <button class="add-to-cart" data-id="${product.id}">Add to cart</button>
    `;

    return div;
}

function attachProductCards(products){
    let cardSection = document.querySelector('.card-section');

    products.map(product => createProductCard(product)).forEach(element =>{
        cardSection.appendChild(element);
    })
}

export async function loadProducts(offset = 0, limit = 8, userId) { 
    try {
        let response = await getAllProducts();
        let products = response.body.list;


        let limitedProducts = products.slice(offset, offset+limit);

        attachProductCards(limitedProducts, userId);
        if(offset + limit >= products.length){
            const showMore = document.querySelector('.show-more-button');
            showMore.style.display = 'none';
        }
    } catch (err) {
        console.log(err);
    }
}

export async function loadCart(userId){

    let result = await getCartByUserId(userId);
    let body = result.body;
    let cart = body.list;

    return cart;


}