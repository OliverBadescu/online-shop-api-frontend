function apiCart(path, method = "GET", body = null) {
    const url = "http://localhost:8080/cart/" + path;
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'X-Requested-With': 'XMLHttpRequest',
        }
    }
    if (body != null) {
        options.body = JSON.stringify(body);
    }
    
    return fetch(url, options);
}

export async function getCartByUserId(userId){
    try{


        let response= await apiCart(`getCartByUserId/${userId}`,"get",null)


        let data= await response.json();

        return {
            status: response.status,
            success:true,
            body: data

       };

   }catch(err){

       return { success: false, message: err };
   }
}

export async function deleteProductFromCart(userId, productId){
    try{


        let response= await apiCart(`deleteProductFromCart/${userId}/product/${productId}`,"delete",null)


        let data= await response.json();


        return {
            status: response.status,
            success:true,
            body: data

       };

   }catch(err){

       return { success: false, message: err };
   }
}


export async function addProductToCart(userId, product){
    try{


        let response= await apiCart(`addProductToCart/${userId}`,"post",product)


        let data= await response.json();


        return {
            status: response.status,
            success:true,
            body: data

       };

   }catch(err){

       return { success: false, message: err };
   }
}
