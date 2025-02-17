import { loadProducts,loadCart,createHomePage } from "../Home/functions.js";
import { getProductById } from "./service.js";
import { createCartPage } from "../Cart/functions.js";
import { addProductToCart } from "../Cart/service.js";



export async function createProductPage(userId, productId){

    let ct = 0;
    const limit = 4;

    const container = document.querySelector('.container');

    let result = await getProductById(productId);
    let product = result.body;

    container.innerHTML =
    `
        <div class="header-container">
        <h1>Furniro</h1>

        <div class="navigation-container">
            <a href="#" class="home-link"><p>Home</p></a>
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
    


    <div class="aside-container-product-page">
        <p class="grey-text">Home</p>
        <i class="fa-solid fa-arrow-right"></i>
        <p class="grey-text">Shop</p>
        <i class="fa-solid fa-arrow-right"></i>
        <p class="product-name-aside-container">${product.name}</p>
    </div>


    <div class="main-container-product-page">

        <div class="product-pictures-container">
            <div class="select-images">
                <a href="#"><img src="assets/imgs/test.jpg" alt=""></a>
                <a href="#"><img src="assets/imgs/test.jpg" alt=""></a>
                <a href="#"><img src="assets/imgs/test.jpg" alt=""></a>
                <a href="#"><img src="assets/imgs/test.jpg" alt=""></a>
            </div>
            <div class="main-image">
                <img src="assets/imgs/test.jpg" alt="">
            </div>
        </div>


        <div class="product-info-container">
            <h1 class="product-name-main">${product.name}</h1>
            <p class="grey-text product-price">$${product.price}</p>
            <p class="product-description">${product.description}</p>
            <div class="add-to-cart-product-page">
                <input type="number" name="quantity" id="quantity-product-page" value="1" min="1" max="99" onkeyup="if(value<1) value=1;if(value>100) value=99;">
                <button class="add-to-cart-product-page-button">Add To Cart</button>
            </div>

            <hr class="hr-product-page">

            <div class="product-category">
                <p>SKU: SS001</p>
                <p>Category: Sofas</p>

            </div>
        </div>

        

    </div>


    <div class="additional-information">

        <hr class="additional-information-hr">

        <div class="titles">
            <a href="#">Description</a>
            <a href="#">Additional Information</a>
        </div>
        <div class="description-additional-info">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe sunt quidem nisi, natus eius optio veritatis impedit, quis in nesciunt deleniti esse, ratione ipsum enim fugiat ea officiis similique odit sequi eum! Praesentium pariatur itaque aut quos. Numquam placeat <br> <br> sunt adipisci ducimus, distinctio provident architecto expedita aliquid iure? Suscipit dicta numquam voluptate quaerat, ipsam perferendis. Maxime rerum molestias maiores delectus, dignissimos deleniti soluta aut omnis commodi tempora fugit nostrum, sapiente quae saepe, distinctio enim laboriosam possimus odio! Quod architecto eaque facilis nihil illo aut aperiam cumque expedita exercitationem. Dolores temporibus aspernatur voluptas quas, placeat sapiente facilis voluptatibus doloremque dolorem nulla.</p>
        </div>
        <div class="additional-information-imgs">
            <img src="assets/imgs/sofa.jpg" alt="">
            <img src="assets/imgs/sofa.jpg" alt="">
        </div>

        <hr class="additional-information-hr">
    </div>


    <div class="related-products-container products-container">
        <h1>Related Products</h1>

        <div class="card-section">

        </div>

        <button class="show-more-button">Show More</button>
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

    let homeLink = document.querySelector(".home-link");
    
    homeLink.addEventListener('click', ()=>{
        createHomePage(userId);
    });
    
    shoppingCart.addEventListener('click',async () =>{
        const cart =await loadCart(userId);
        createCartPage(cart, userId);
    });
    
    const shopLink = document.querySelector('.shop-link');
    
    shopLink.addEventListener('click', () =>{
        createShopPage(userId);
    });

    const addToCartButton = document.querySelector('.add-to-cart-product-page-button');

    addToCartButton.addEventListener('click', async ()=>{

        const quantity = document.querySelector('#quantity-product-page');

        const productRequest = {
            productId: productId,
            quantity: quantity.value  
        }
        
        let data = await addProductToCart(userId, productRequest);

        if(data.success){
            alert("Product added to cart successfully");
        }else{
            alert("err");
        }

    });

}