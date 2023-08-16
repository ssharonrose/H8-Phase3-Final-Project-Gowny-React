// const baseUrl = "http://localhost:3000"
const baseUrl = "https://gowny.martiniblue.dev"

import { DRESS_FETCH_SUCCESS, DRESS_DETAIL_FETCH_SUCCESS, LOADING, LOGIN_SUCCESS, LOGIN_ERROR, REGISTER_ERROR, REGISTER_SUCCESS, LOGOUT_SUCCESS, LOADING_STORE, STORE_FETCH_SUCCESS, STORE_DETAIL_FETCH_SUCCESS, ADD_DRESS_ERROR, CREATE_INVOICE_REQUEST, CREATE_INVOICE_SUCCESS, CREATE_INVOICE_FAILURE, CATEGORY_FETCH_SUCCESS, CATS_LOADING, ADD_CATS_ERROR, FAVORITE_FETCH_SUCCESS, FETCH_HISTORY_REQUEST, FETCH_HISTORY_SUCCESS, FETCH_HISTORY_FAILURE } from "./actionType"

import axios from 'axios';
import Swal from "sweetalert2";
import CryptoJS from 'crypto-js';

// LOGIN --- REGISTER --- LOGOUT --- //

export const loginSuccess = ({ role, username }) => (
    {
        type: LOGIN_SUCCESS,
        payload: { role, username }
    }
)

export const loginError = (error) => ({
    type: LOGIN_ERROR,
    error: error,
});

export const login = (data) => {
    return async (dispatch) => {
        try {

            const response = await fetch(`${baseUrl}/login`,
                {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({
                        email: data.email,
                        password: data.password
                    })
                },

            )
            const responseJson = await response.json()
            // console.log(responseJson, "ini dari backend");

            const { access_token } = responseJson
            const { role, username, email } = responseJson

            // console.log(access_token, role, username);

            if (!response.ok) {
                Swal.fire({
                    icon: "error",
                    title: `${responseJson.message}!`,
                });
                throw new Error(responseJson.message)
            }

            if (role === "Admin") {

                Swal.fire({
                    icon: "success",
                    title: `Welcome Back Admin!`,
                });
            } else {
                Swal.fire({
                    icon: "success",
                    title: `Login success!`,
                });
            }
            dispatch(loginSuccess({ role, username, email }))


            localStorage.setItem("access_token", access_token)
            localStorage.setItem("role", role)
            localStorage.setItem("username", username)
            localStorage.setItem("email", email)
            return Promise.resolve();

        } catch (error) {
            // console.log(error, "dari action creator");
            dispatch(loginError(error.message))
            return Promise.reject(error);
        }
    }
}

export const registerError = (error) => ({
    type: REGISTER_ERROR,
    error: error,
});

export const registerSuccess = () => (
    {
        type: REGISTER_SUCCESS,
    }
)

export const register = (data) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${baseUrl}/register`, {
                method: "POST",
                headers: {
                    access_token: localStorage.getItem('access_token'),
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const responseJson = await response.json()

            if (!response.ok) {
                Swal.fire({
                    icon: "error",
                    title: `${responseJson}!`,
                });
                throw new Error(responseJson)
            }

            Swal.fire({
                icon: "success",
                title: `Register successfully!`,
            });
            dispatch(registerSuccess())

            return Promise.resolve();

        } catch (error) {
            // console.log(error);
            dispatch(registerError(error.message))
            return Promise.reject(error);
        }
    }
}

export const logoutSuccess = () => (
    {
        type: LOGOUT_SUCCESS,
    }
)

export const logout = () => {
    return async (dispatch) => {
        try {

            localStorage.clear()
            dispatch(logoutSuccess())
            Swal.fire({
                icon: "success",
                title: `Logout success!`,
            });

        } catch (error) {
            // console.log(error);
            Swal.fire({
                icon: "error",
                title: `Logout failed!`,
            });
        }
    }
}



// ---- DRESS CRUD ----- //


export const loading = () => (
    {
        type: LOADING,
    }
)

export const dressesFetchSuccess = (dresses) => (
    {
        type: DRESS_FETCH_SUCCESS,
        payload: dresses
    }
)

export const dressesFetch = (filter) => {
    // {categoryId: 1}
    // console.log("Filter from request", filter);
    return async (dispatch) => {
        try {

            dispatch(loading())

            let query = ""
            if (filter) {
                const { CategoryId, name, grade, page, StoreId } = filter
                if (CategoryId) {
                    query = `CategoryId=${CategoryId}`
                }

                if (name) {
                    query = `name=${name}`
                }

                if (grade) {
                    query = `grade=${grade}`
                }
                if (page) {
                    query = `page=${page}`
                }
                if (StoreId) {
                    query = `StoreId=${StoreId}`
                }
                // console.log(query, "ini <<<<<<<<<");

            }
            // if (!filter) {
            //     query = "dress"
            // }

            const response = await fetch(`${baseUrl}/dress?${query}`)
            const responseJson = await response.json()

            // console.log(responseJson, "ini response JSON");

            dispatch(dressesFetchSuccess(responseJson))

        } catch (error) {
            // console.log(error);
        }
    }
}

export const dressDetailFetchSuccess = (dress) => (
    {
        type: DRESS_DETAIL_FETCH_SUCCESS,
        payload: dress
    }
)

export const detailDressFetch = (id) => {
    return async (dispatch) => {
        try {

            dispatch(loading())

            const response = await fetch(`${baseUrl}/dress/${id}`)
            const responseJson = await response.json()

            // console.log(responseJson, "ini response JSON");

            dispatch(dressDetailFetchSuccess(responseJson))

        } catch (error) {
            // console.log(error);
        }
    }
}


export const deleteDress = (id) => {
    return async (dispatch) => {
        try {

            // console.log(id);
            const response = await fetch(`${baseUrl}/dress/${id}`, {
                method: "DELETE",
                headers: {
                    access_token: localStorage.getItem('access_token'),
                    "content-type": "application/json"
                },
            })

            // console.log("berhasil delete");
            dispatch(dressesFetch())
            Swal.fire({
                icon: "success",
                title: `Dress with ID ${id} deleted successfully`,
            });
            // console.log(response, "ini res");

        } catch (error) {
            // console.log(error);
            Swal.fire({
                icon: "error",
                title: `Dress with ID ${id} cannot be deleted`,
            });
        }
    }
}

export const addDressError = (error) => ({
    type: ADD_DRESS_ERROR,
    error: error,
});

export const addDress = (dress) => {
    return async (dispatch) => {
        try {
            // console.log(dress, "dari action creator");

            const response = await fetch(`${baseUrl}/dress`, {
                method: "POST",
                headers: {
                    access_token: localStorage.getItem('access_token'),
                    "content-type": "application/json"
                },
                body: JSON.stringify(dress)
            })

            const responseJson = await response.json()
            // console.log(responseJson, "dari action 273");

            if (!response.ok) {
                Swal.fire({
                    icon: "error",
                    title: `${responseJson.message}`,
                });
                throw new Error(responseJson.message)
            }


            dispatch(dressesFetch())
            Swal.fire({
                icon: "success",
                title: `Dress ${responseJson.result.name} added successfully  `,
            });
            return Promise.resolve();

        } catch (error) {
            // console.log(error, "from action creator");
            dispatch(addDressError(error.message))
            return Promise.reject(error);
        }
    }
}

export const editDress = (dress, id) => {
    return async (dispatch) => {
        try {
            // console.log(dress, "dari action creator");
            const { name,
                description,
                grade,
                price,
                mainImage,
                CategoryId,
                StoreId, imageUrl1,
                imageUrl2,
                imageUrl3 } = dress

            const response = await fetch(`${baseUrl}/dress/${id}`, {
                method: "PUT",
                headers: {
                    access_token: localStorage.getItem('access_token'),
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    description,
                    grade,
                    price,
                    mainImage,
                    CategoryId,
                    StoreId,
                    imageUrl1,
                    imageUrl2,
                    imageUrl3
                })
            })

            const responseJson = await response.json()

            // console.log("kelar edit")
            // console.log(responseJson, "<<<<<<<<<<<<<ini response>>>>>>>>>>>>>");

            if (!response.ok) {
                Swal.fire({
                    icon: "error",
                    title: `${responseJson}`,
                });
                throw new Error(responseJson)
            }

            dispatch(dressesFetch())
            Swal.fire({
                icon: "success",
                title: `${responseJson.message}`,
            });

            return Promise.resolve();

        } catch (error) {
            // console.log(error.message, "dari action creator");
            Swal.fire({
                icon: "error",
                title: `${error.message}`,
            });
            // dispatch(addDressError(error.message))
            return Promise.reject(error);
        }
    }
}

// ---- STORE CRUD ----- //


export const loadingStore = () => (
    {
        type: LOADING_STORE,
    }
)

export const storesFetchSuccess = (stores) => (
    {
        type: STORE_FETCH_SUCCESS,
        payload: stores
    }
)

export const storesFetch = () => {
    return async (dispatch) => {
        try {

            dispatch(loading())
            // console.log("masuk stores");
            const responseShop = await fetch(`${baseUrl}/nearestShop`, { method: "POST" })
            const response = await fetch(`${baseUrl}/store`)
            const responseJson = await response.json()

            console.log(responseJson, "ini response JSON");

            dispatch(storesFetchSuccess(responseJson))

        } catch (error) {
            // console.log(error);
        }
    }
}

export const storeDetailFetchSuccess = (store) => (
    {
        type: STORE_DETAIL_FETCH_SUCCESS,
        payload: store
    }
)

export const detailStoreFetch = (id) => {
    return async (dispatch) => {
        try {

            dispatch(loading())

            const response = await fetch(`${baseUrl}/store/${id}`)
            const responseJson = await response.json()

            // console.log(responseJson, "ini response JSON");

            dispatch(storeDetailFetchSuccess(responseJson))

        } catch (error) {
            // console.log(error);
        }
    }
}


export const deleteStore = (id) => {
    return async (dispatch) => {
        try {

            // console.log(id);
            const response = await fetch(`${baseUrl}/store/${id}`, {
                method: "DELETE",
            })

            // console.log("berhasil delete");
            dispatch(storesFetch())
            Swal.fire({
                icon: "success",
                title: `Store with ID ${id} deleted successfully`,
            });

        } catch (error) {
            // console.log(error);
            Swal.fire({
                icon: "error",
                title: `${error}`,
            });
        }
    }
}

export const createInvoiceRequest = () => ({
    type: CREATE_INVOICE_REQUEST
});

export const createInvoiceSuccess = (data) => ({
    type: CREATE_INVOICE_SUCCESS,
    payload: data
});

export const createInvoiceFailure = (error) => ({
    type: CREATE_INVOICE_FAILURE,
    payload: error
});

// Async Action Creator for creating invoice
export const paymentQris = (data) => async (dispatch, res) => {
    dispatch(createInvoiceRequest());
    try {
        // console.log("masukkk payment");
        // console.log(data);
        const response = await axios.post(`${baseUrl}/payment`, data, {
            headers: {
                access_token: localStorage.getItem('access_token'),
                "content-type": "application/json"
            }
        });

        // console.log(response, "dari action creator");
        // console.log(response.data, "dari action creator");
        const { Data } = response.data
        // console.log(Data.Url, "ini action creator");
        // // dispatch(createInvoiceSuccess(Data.Url));
        return Data.Url

    } catch (error) {
        dispatch(createInvoiceFailure('Failed to create invoice'));
    }
};

// ---- CATEGORY CRUD ----- //
export const categoryFetchSuccess = (category) => ({
    type: CATEGORY_FETCH_SUCCESS,
    payload: category
});

export const loadingCategory = () => (
    {
        type: CATS_LOADING,
    }
)

export const addCategoryError = (error) => ({
    type: ADD_CATS_ERROR,
    error: error,
});


export const categoryFetch = () => {
    return async (dispatch) => {
        try {
            dispatch(loadingCategory())

            const response = await fetch(`${baseUrl}/categories`)
            const responseJson = await response.json()

            dispatch(categoryFetchSuccess(responseJson))
        } catch (error) {
            // console.log(error);
        }
    }
}

export const addCategorySuccess = (category) => {
    return async (dispatch) => {
        try {
            // console.log(category, "dari action creator");

            const response = await fetch(`${baseUrl}/categories`, {
                method: "POST",
                headers: {
                    access_token: localStorage.getItem('access_token'),
                    "content-type": "application/json"
                },
                body: JSON.stringify(category)
            })

            const responseJson = await response.json()

            if (!response.ok) {
                Swal.fire({
                    icon: "error",
                    title: `${responseJson}`,
                });
                throw new Error(responseJson)
            }

            dispatch(categoryFetchSuccess())
            Swal.fire({
                icon: "success",
                title: `Category name ${responseJson.name} added successfully`,
            });
            return Promise.resolve();
        } catch (error) {
            // console.log(error, "from action creator");
            dispatch(addCategoryError(error.message))
            return Promise.reject(error);
        }
    }
}

export const deleteCategory = (id) => {
    return async (dispatch) => {
        try {
            await fetch(`${baseUrl}/categories/${id}`, {
                method: 'DELETE',
                headers: {
                    "access_token": localStorage.getItem("access_token")
                }
            })
            dispatch(categoryFetch())
            Swal.fire({
                icon: "success",
                title: `Category with ID ${id} deleted!`,
            });
        } catch (err) {
            // console.log(err);
            Swal.fire({
                icon: "error",
                title: `${err}`,
            });
        }
    }
}

// ----- FAVOURITE CRD ------ //

export const favortieFecthSuccess = (favorite) => (
    {
        type: FAVORITE_FETCH_SUCCESS,
        payload: favorite
    }
)


export const favoriteFetch = () => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${baseUrl}/favorite`, {
                method: "GET",
                headers: {
                    access_token: localStorage.getItem('access_token'),
                    "content-type": "application/json"
                }
            })
            const responseJson = await response.json()
            // console.log(responseJson, "<< fav");

            dispatch(favortieFecthSuccess(responseJson))

        } catch (error) {
            // console.log(error);
        }
    }
}

export const addFavoriteSuccess = (id) => {
    return async (dispatch) => {
        try {
            // console.log(id);
            const response = await fetch(`${baseUrl}/favorite/${id}`, {
                method: "POST",
                headers: {
                    access_token: localStorage.getItem('access_token'),
                    "content-type": "application/json"
                }
            })

            const responseJson = await response.json()


            dispatch(favoriteFetch())
            Swal.fire({
                icon: "success",
                title: `Added dress to favorite successfully`,
            });
            return Promise.resolve();
        } catch (error) {
            // console.log(error, "from action creator");
        }
    }
}

export const deleteFavorite = (id) => {
    return async (dispatch) => {
        try {
            await fetch(`${baseUrl}/favorite/${id}`, {
                method: 'DELETE',
                headers: {
                    "access_token": localStorage.getItem("access_token")
                }
            })
            dispatch(favoriteFetch())

        } catch (err) {
            // console.log(err);
            // Swal.fire({
            //     icon: "error",
            //     title: `${err}`,
            // });
        }
    }
}

const fetchHistoryRequest = () => ({
    type: FETCH_HISTORY_REQUEST,
});

const fetchHistorySuccess = (data) => ({
    type: FETCH_HISTORY_SUCCESS,
    payload: data,
});

const fetchHistoryFailure = (error) => ({
    type: FETCH_HISTORY_FAILURE,
    payload: error,
});

export const fetchHistory = () => {
    return (dispatch) => {

        dispatch(fetchHistoryRequest());

        const data = {
            orderBy: 'id',
            order: 'DESC',
            limit: '20',
        };
        // data.append('orderBy', 'id');
        // data.append('order', 'DESC');
        // data.append('limit', '20');
        const va = "0000002258387876"
        const apikey = "SANDBOX952E0321-0A01-4F86-93C9-1BE729F9DDC6"
        const bodyEncrypt = CryptoJS.SHA256(JSON.stringify(data));
        const stringtosign = "POST:" + va + ":" + bodyEncrypt + ":" + apikey;

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://sandbox.ipaymu.com/api/v2/history',
            headers: {
                "access_token": localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
                'signature': CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(stringtosign, apikey)),
                'va': va,
                'timestamp': '20150201121045'
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                // console.log(response);
                dispatch(fetchHistorySuccess(response.data));
            })
            .catch(function (error) {
                // console.log(error);
                dispatch(fetchHistoryFailure(error));
            });
    };
};

