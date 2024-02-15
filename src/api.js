// src/api.js

import NProgress from 'nprogress'
import mockData from './mock-data';
import './page-loader.css'

/**
 *
 * @param {*} events:
 * The following function should be in the “api.js” file.
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */

export const extractLocations = (events) => {
    const extractedLocations = events.map((event) => event.location);
    const locations = [...new Set(extractedLocations)];
    return locations;
};

const removeQuery = () => {
    let newurl;
    if (window.history.pushState && window.location.pathname) {
        newurl =
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname;
        window.history.pushState("", "", newurl);
    } else {
        newurl = window.location.protocol + "//" + window.location.host;
        window.history.pushState("", "", newurl);
    }
};


export const getEvents = async (token) => {
    NProgress.start();

    // console.log("token within getevents:", token);
    // if we're testing the app locally, return the mockdata instead of fetching the events from the API
    if (window.location.href.startsWith("http://localhost")) {
        NProgress.done();
        return mockData;
    }

    // if we're offline, try to get the cached events from local storage
    if (!navigator.onLine) {
        const events = localStorage.getItem("lastEvents");
        NProgress.done();
        return events ? JSON.parse(events) : [];
    }

    // if the user has an access token, fetch the events from the google calendar API

    removeQuery();

    if (token) {
        const url = `https://eio4ssbtcl.execute-api.eu-west-2.amazonaws.com/dev/api/get-events/${token}`;
        // if (!fetching) {
        // setFetching(true)
        // console.log("fetching...");
        const response = await fetch(url);
        const result = await response.json();
        if (result) {
            // setFetching(false)
            NProgress.done();
            localStorage.setItem("lastEvents", JSON.stringify(result.events));
            return result.events;
        }
        else return null;
    }

};

const getToken = async (authCode, setToken) => {
    try {
        const encodedAuthCode = encodeURIComponent(authCode);
        const response = await fetch(
            `https://eio4ssbtcl.execute-api.eu-west-2.amazonaws.com/dev/api/token/${encodedAuthCode}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { access_token } = await response.json();
        access_token && localStorage.setItem("access_token", access_token);
        setToken(access_token)
        // console.log("setting token inside getToken...", access_token);
        return access_token;
    } catch (error) {
        error.json();
    }
};

const checkToken = async (accessToken) => {
    const response = await fetch(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    );
    const result = await response.json();
    return result;
};


export const getAccessToken = async (setToken, setShowLoginScreen) => {
    const accessToken = localStorage.getItem("access_token");

    const tokenCheck = accessToken && (await checkToken(accessToken));

    // console.log("tokencheck value:", tokenCheck);

    // if no access token, do checks
    if (!accessToken || tokenCheck.error) {

        localStorage.removeItem("access_token");
        const searchParams = new URLSearchParams(window.location.search);
        const authCode = searchParams.get("code");

        //if there's no code in the url, get the auth url and 
        if (!authCode) {

            // console.log("showing login screen...");
            setShowLoginScreen(true)
            // setLoading(false)
            return

        }

        return authCode && getToken(authCode, setToken);
    }

    // otherwise return stored token
    if (accessToken) {
        setToken(accessToken);
        // console.log("token set as:", accessToken);
    }
};


