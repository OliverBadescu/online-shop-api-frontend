import { login, register } from "./service.js";
import { createHomePage } from "../Home/functions.js";
import { getCartByUserId } from "../Cart/service.js";

export function createLoginPage(){
    let container = document.querySelector(".container");


    container.innerHTML = `

<div class="login-page">
    
    <div>
        <div class="login-container">
            <h1>Log in</h1>
            <div class="email-input">
                <p>Email:</p>
                <input type="email" name="email" id="email-login" placeholder="Your email here">
            </div>
            <div class="password-input">
                <p>Password:</p>
                <input type="password" name="password" id="password-login" placeholder="Your password here">
            </div>
            <p>Don't have an account? <a href="#" class="register-link">Register here</a></p>
            <button class="login-button">Log in</button>
        </div>
    </div>


</div>
    
    `;


    let loginBtn = document.querySelector(".login-button");

    let registerLink = document.querySelector(".register-link");

    registerLink.addEventListener('click', ()=>{
        createRegisterPage();
    });


    loginBtn.addEventListener('click', async() =>{
        const email = document.querySelector("#email-login").value;
        const password = document.querySelector("#password-login").value;


        const loginRequest = {
            email: email,
            password: password
        };

        const result = await login(loginRequest);
        if(result.status=== 200){

            const data = result.body;
            const id = data.id;
            createHomePage(id);
        }else{
            const error = document.querySelector(".login-error");
            if(error){
                error.remove();
            }
            const popUp = failedLogin();
            const loginContainer = document.querySelector(".login-container");
            if(loginContainer){
                loginContainer.insertAdjacentElement('afterend', popUp);
                popUp.classList.toggle("show");
            }
        }

    });

}


export function createRegisterPage(){


    let container = document.querySelector(".container");


    container.innerHTML = `

<div class="register-page">
    <div>

        <div class="register-container">
            <h1>Register</h1>
            <div class="email-input">
                <p>Email:</p>
                <input type="email" name="email" id="email-register" placeholder="Your email here">
            </div>
            <div class="password-input">
                <p>Password:</p>
                <input type="password" name="password" id="password-register" placeholder="Your password here">
            </div>
            <div class="name-input">
                <p>Full name:</p>
                <input type="text" name="name" id="name-register" placeholder="Your full name here">
            </div>
            <div class="phone-input">
                <p>Phone:</p>
                <input type="number" name="phone" id="phone-register" placeholder="Your phone number here">
            </div>
            <div class="country-input">
                <p>Country:</p>
                <input type="text" name="country" id="country-register" placeholder="Your country here">
            </div>
            <div class="billing-input">
                <p>Billing address:</p>
                <input type="text" name="billing" id="billing-register" placeholder="Your billing address here">
            </div>
            <div class="shipping-input">
                <p>Shipping address:</p>
                <input type="text" name="shipping" id="shipping-register" placeholder="Your shipping address here">
            </div>
            
            <p>Already have an account? <a href="#" class="login-link">Log in here</a></p>
            <button class="register-button">Register</button>
        </div>

    </div>
</div>
    `;


    let registerButton = document.querySelector(".register-button");
    let loginLink = document.querySelector(".login-link");


    loginLink.addEventListener('click', () => {
        createLoginPage();
    });

    registerButton.addEventListener('click',async () =>{
        const userRequest = {
            fullName : document.querySelector('#name-register').value,
            email: document.querySelector('#email-register').value,
            password:document.querySelector('#password-register').value,
            phone: document.querySelector('#phone-register').value,
            country:document.querySelector('#country-register').value,
            billingAddress: document.querySelector('#billing-register').value,
            shippingAddress: document.querySelector('#shipping-register').value


        }

        const result = await register(userRequest);
        if (result.status == '201') {
            alert("Successfully registered, please login to continue");
            createLoginPage();
          } else {
            const error = document.querySelector(".register-error");
            if (error) {
              error.remove();
            }

            const popUp = registerError();
            const registerContainer = document.querySelector(".register-container");
            
            if (registerContainer) {
              registerContainer.insertAdjacentElement("afterend", popUp);
              popUp.classList.toggle("show");
            }
          }

    });



}

function failedLogin(){

    const popUp = document.createElement("div");
    popUp.classList.add("login-error");

    popUp.innerHTML = `
        <div class = "error-message">
            <p>Failed to login, email or password is incorrect. <br> Please try again!</p>
        </div>
    `;

    return popUp;

}

function registerError(){

    const popUp = document.createElement("div");
    popUp.classList.add("register-error");

  popUp.innerHTML = `
    <div class="error-message">
      <p class = "error-text">Failed to register. Email already used. <br> Please try again!</p>
    </div>
  `;

  return popUp;

}