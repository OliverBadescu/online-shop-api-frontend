function api(path, method = 'GET', body = null) {
    const url = `http://localhost:8080/cart/${path}`;
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'X-Requested-With': 'XMLHttpRequest',
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    return fetch(url, options);
}

async function request(path, method = 'GET', body = null) {
    try {
        const response = await api(path, method, body);
        const data = await response.json().catch(() => null);

        if (!response.ok) {
            const errorMessage =
                (data && data.message) || response.statusText || 'Request failed';
            throw new Error(errorMessage);
        }

        return {
            success: true,
            status: response.status,
            body: data,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || 'Something went wrong',
        };
    }
}

export async function getCartByUserId(userId) {
    return request(`getCartByUserId/${userId}`, 'GET');
}

export async function deleteProductFromCart(userId, productId) {
    return request(`deleteProductFromCart/${userId}/product/${productId}`, 'DELETE');
}

export async function addProductToCart(userId, product) {
    return request(`addProductToCart/${userId}`, 'POST', product);
}

export async function updateCartQuantity(userId, productId, quantityRequest) {
    return request(`updateProductQuantity/${userId}/products/${productId}`, 'PUT', quantityRequest);
}

export async function clearUserCart(userId){
    return request(`emptyUserCart/${userId}`, 'GET');
}