import axios from 'axios';
import queryString from 'query-string';
import firebase from 'firebase';


const getFirebaseToken = async () => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) return currentUser.getIdToken();

    //Not logged in 
    const haRememberAccount = localStorage.getItem('firebaseui::rememberedAccounts')
    if (!haRememberAccount) return null;

    //logged but current user is not fetch -> wait
    return new Promise((resolve, reject) => {
        const waitTimer = setTimeout(() => {
            reject(null);
            console.log("Reject Timeout")
        }, 10000)

        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
            //user logout 
            if (!user) {
                reject(null);
            }
            const token = await user.getIdToken();
            console.log("[AXIOS] Loged in user: ", token);
            resolve(token);
            unregisterAuthObserver();
            clearTimeout(waitTimer)
        })

    })
}

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'content-type': 'application/json',

    },
    paramsSerializer: params => queryString.stringify(params),
})

axiosClient.interceptors.request.use(async function (config) {
    // Do something before request is sent
    // const currentUser = firebase.auth().currentUser;
    // if (currentUser) {
    //     const token = await currentUser.getIdToken();
    //     console.log("token in apiclient", token)
    //     config.headers.Authorization = `Bearer ${token}`
    // }

    const token = await getFirebaseToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axiosClient.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response && response.data) return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default axiosClient;