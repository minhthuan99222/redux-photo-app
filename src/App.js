import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import NotFound from './components/NotFound';
import SignIn from './features/Auth/pages/SignIn';
import firebase from 'firebase';
import productApi from './api/productApi';
import { Button } from 'reactstrap';
import { getMe } from './features/Auth/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const Photo = React.lazy(() => import('./features/Photo'));

// Configure Firebase.
const config = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REAC_APP_FIREBASE_AUTH_DOMAIN,
    // ...
};
firebase.initializeApp(config);

function App() {
    const [productList, setProductList] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const params = {
                    _page: 1,
                    _limit: 10,
                }
                const response = await productApi.getAll(params);
                console.log("All product: call api: ", response)
                setProductList(response)
            } catch (error) {
                console.log("Failed to Fecth product list: ", error)
            }
        }
        fetchProductList();
    }, [])

    //handle firebase auth change
    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
            //user logout 
            if (!user) {
                console.log("User not logged in")
                return
            }
            //get me when signed in 
            try {
                const action = getMe()
                const actionResult = await dispatch(action);
                const currentUser = unwrapResult(actionResult);
                console.log("Logged in  user: ", currentUser)
            } catch (error) {
                console.log("Failed login ", error.message)
            }

            // const token = await user.getIdToken();
            // console.log("Loged in user: ", user.displayName)
            // console.log("Loged in user: ", token)
        })

        return () => unregisterAuthObserver;
    }, [])

    const handleButtonClick = async () => {
        try {
            const params = {
                _page: 1,
                _limit: 10,
            }
            const response = await productApi.getAll(params);
            console.log("All product: call api: ", response)
            setProductList(response)
        } catch (error) {
            console.log("Failed to Fecth product list: ", error)
        }
    }

    return (
        <div className="photo-app">
            <Suspense fallback={<div>...loading</div>}>
                <BrowserRouter>
                    <Header />
                    {/* <ul>
                        <li><Link to="/photos">Go to photo page</Link></li>
                        <li><Link to="/photos/add">Go to Add photo page</Link></li>
                        <li><Link to="/photos/123">Go to Edit photo page </Link></li>
                    </ul> */}
                    <Button onClick={handleButtonClick}>Fetch Product List</Button>

                    <Switch>
                        <Redirect exact from="/" to="photos" />
                        <Route path="/photos" component={Photo} />
                        <Route path="/sign-in" component={SignIn} />
                        <Route component={NotFound} />
                    </Switch>
                </BrowserRouter>
            </Suspense>
        </div>

    );
}


export default App;