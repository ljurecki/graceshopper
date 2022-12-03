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

export const createProduct = async (jwt, user, { name, imageurl, description, price, author, genre }) => {

    try {
        const headers = createHeaders(jwt);
        return await fetch(`${BASE_URL}/products`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                name: name,
                imageurl: imageurl,
                description: description,
                price: price,
                author: author,
                genre: genre
            }),
        }).then(response => response.json());
    } catch (err) {
        console.error(err);
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

// for cart??
export const addProductToCart = async (productId, title, qty, jwt) => {
    try {
      const headers = createHeaders(jwt);
      return await fetch(`${BASE_URL}/products/${productId}/cartProducts`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          productId: productId,
          title: title,
          qty: qty
        }),
      }).then(response => response.json());
    } catch (err) {
      console.error(err);
    }
  };
  
  export const createCartProduct = async (jwt, user, { title, qty }) => {
    try {
      const headers = createHeaders(jwt);
      return await fetch(`${BASE_URL}/cartProducts`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          user,
          title: title,
          qty: qty,
        }),
      }).then(response => response.json());
    } catch (err) {
      console.error(err);
    }
  };

  export const updateCart = async (jwt, { id, title, qty }) => {
    try {
      const headers = createHeaders(jwt);
      return await fetch(`${BASE_URL}/cartProducts/${id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
          title: title,
          qty: qty,
        }),
      }).then(response => response.json());
    } catch (err) {
      console.error(err);
    }
  };

  export const emptyCart = async (jwt, {id, title, qty}) => {
    try {
        const headers = createHeaders(jwt);
      return await fetch(`${BASE_URL}/cartProducts/${id}`, {
        method: 'DELETE',
        headers,
      })
    } catch (err) {
      console.error(err);
    }
  };