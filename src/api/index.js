const BASE_URL = 'http://localhost:3001/api';

const createHeaders = jwt => {
    return jwt
        ? {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
        }
        : {
            'Content-Type': 'application/json',
        };
};

export const login = async (username, password) => {
    const headers = createHeaders();
    try {
        return await fetch(`${BASE_URL}/users/login`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                username,
                password,
            }),
        }).then(response => response.json());
    } catch (err) {
        console.error(error);
    }
};

export const register = async (username, password) => {
    try {
        const response = await fetch(`${BASE_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });
        const result = await response.json();
        return result;
    } catch (err) {
        console.error(error);
    }
};

export const getUserData = async jwt => {
    const headers = createHeaders(jwt);
    try {
        return await fetch(`${BASE_URL}/users/me`, {
            headers,
        }).then(response => response.json());
    } catch (err) {
        console.error(err);
    }
};

export const getAllProducts = async () => {
    try {
        const response = await fetch(`${BASE_URL}/products`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        
        const results = response.json();
        return results;
    } catch (err) {
        console.error(err);
    }
};


export const getProductsByUsername = async (user, jwt) => {
    try {
        const headers = createHeaders(jwt);
        const { username } = user;
        return await fetch(`${BASE_URL}/users/${username}/products`, {
            headers,
        }).then(response => response.json());
    } catch (err) {
        console.error(err);
    }
};

// export const createProduct = async (jwt, { title, imageurl, description, price, author, genre }) => {
//     try {
//         const headers = createHeaders(jwt);
//         return await fetch(`${BASE_URL}/products`, {
//             method: 'POST',
//             headers,
//             body: JSON.stringify({
//                 title,
//                 imageurl,
//                 description,
//                 price,
//                 author,
//                 genre
//             }),
            
//         }).then(response => response.json());
//     } catch (err) {
//         console.error(err);
//     }
// };


export const createProduct = async (jwt, user, { title, imageurl, description, price, author, genre }) => {
    try {
        const response = await fetch(`${BASE_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({
                user,
                title,
                imageurl,
                description,
                price,
                author,
                genre
            }),
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
};

export const updateProduct = async (updatedProduct, jwt) => {
    try {
        const headers = createHeaders(jwt);
        return await fetch(`${BASE_URL}/products/${id}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify(updatedProduct),
        }).then(response => response.json());
    } catch (err) {
        console.error(err);
    }
};

export const deleteProduct = async (product, jwt) => {
    try {
        const headers = createHeaders(jwt);
        return await fetch(`${BASE_URL}/products/${product.id}`, {
            method: 'DELETE',
            headers,
        }).then(response => response.json());
    } catch (err) {
        console.error(err);
    }
};

export const getCart = async (jwt, user) => {
    const headers = createHeaders(jwt);
    try {
        const response = await fetch(`${BASE_URL}/cart`, {
            headers,
            body: JSON.stringify({
            user: user.id,
        }),
    });   
        const results = response.json();
        return results;
    } catch (err) {
        console.error(err);
    }
};


  export const addProductToCart = async (jwt, {productId, qty}) => {
    const headers = createHeaders(jwt);
    try {
        const response = await fetch(`${BASE_URL}/cart`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                productId,
                qty,
            }),
        });
        const result = await response.json();
        return result;
    } catch (err) {
        console.error(err);
    }
};
  

export const deleteCartProduct = async (cart_product, jwt) => {
    try {
      const headers = createHeaders(jwt);
      return await fetch(`${BASE_URL}/cart/${cart_product.id}`, {
        method: 'DELETE',
        headers,
      }).then(response => response.json());
    } catch (err) {
      console.error(err);
    }
  };