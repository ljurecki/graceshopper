
// const BASE_URL = 'https://best-books.onrender.com/api';
const BASE_URL ='http://localhost:3001/api';

const createHeaders = jwt => {
    return jwt
        ? {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
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
        console.error(err);
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
        console.error(err);
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


export const createProduct = async (jwt, user, { title, imageurl, description, price, author, genre }) => {
    try {
        const response = await fetch(`${BASE_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
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

export const updateProduct = async (jwt, {id, title, imageurl, description, price, author, genre }) => {
    try {
            const response =  await fetch(`${BASE_URL}/products/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify({
                    title: title,
                    imageurl: imageurl,
                    description: description,
                    price: price,
                    author: author,
                    genre: genre
            })
        })
        const result = await response.json();
        return result;
    } catch (ex) {
        console.log('error updating product')
    }
};


export const deleteProduct = async (jwt, productId) => {
    try {
        const response = await fetch(`${BASE_URL}/products/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
        });
        const result = await response.json();
        return result;
    } catch (err) {
        console.error(err);
    }
};


export const deleteCartProduct = async (jwt, productId) => {
    try {
        const response = await fetch(`${BASE_URL}/cart/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
        });
        const result = await response.json();
        return result;
    } catch (err) {
        console.error(err);
    }
};


  

export const getCart = async (jwt) => {
   console.log(`${BASE_URL}/cart`)
    try {
        const response = await fetch(`${BASE_URL}/cart`, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }
    });   
    const results = await response.json();
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

export const updateCartProduct = async (jwt, id, qty) => {
    try {
            const response =  await fetch(`${BASE_URL}/cart/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify({
                    qty: qty
            })
        })
        const result = await response.json();
        return result;
    } catch (ex) {
        console.log('error updating cart product')
    }
};
  
