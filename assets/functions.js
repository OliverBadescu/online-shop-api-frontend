
const userDropdown = document.querySelector('.user-dropdown');
const userIcon = document.querySelector('.user-icon');


userIcon.addEventListener('click', (e) => {
    e.preventDefault(); 
    userDropdown.classList.toggle('active'); 
});

document.addEventListener('click', (e) => {
    if (!userDropdown.contains(e.target)) {
        userDropdown.classList.remove('active');
    }
});


function login(){

    let btnLogin  = document.querySelector("login-button");

    btnLogin.addEventListener('click', async() =>{

        const email = document.querySelector("#email-login").value;
        const password = document.querySelector("#password-login").value;

        const loginRequest = {
            email: email,
            password: password
        }
        const result = await login(loginRequest);

        if(result.success== true){
            console.log("test");
        }

    });
    

}