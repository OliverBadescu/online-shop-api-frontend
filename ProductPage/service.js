function apiProduct(path, method = "GET", body = null) {
    const url = "http://localhost:8080/product/" + path;
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

export async function getProductById(productId){
    try{


        let response= await apiProduct(`${productId}`,"GET")


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