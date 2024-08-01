import {createContext, useContext, useEffect} from "react";
import {useState} from "react";
import { json } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [services, setServices] = useState([]);
    const authorizationToken = `Bearer ${token}`;

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem('token',serverToken);
    }

    let isLoggedIn = !!token;

    const LogoutUser = () => {
        setToken("");
        localStorage.removeItem('token');
    }

    // JWT Authentication : Getting currently logged in user data.

    const userAuthentication = async () => {
        try {
            setIsLoading(true);
            const response = await fetch("http://localhost:5000/api/auth/user",{
                method:"GET",
                headers:{
                    Authorization: authorizationToken,
                }
            });

            if(response.ok){
                const data = await response.json();
                console.log("user data ", data.userData);
                setUser(data.userData);
                setIsLoading(false);
            }else{
                console.log("Error fetching user data!");
                setIsLoading(false);
            }
        } catch (error) {
            console.log("Error fetching user data.");
        }
    }

    const getServices = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/data/service",{
                method:"GET",
            });

            if(response.ok){
                const data = await response.json();
                console.log(data.message);
                setServices(data.message);
            }
        } catch (error) {
            console.log(`services frontend error : ${error}`);
        }
    }

    useEffect(() => {
        getServices();
        userAuthentication();
    },[])

    return <AuthContext.Provider value={{storeTokenInLS, LogoutUser, isLoggedIn, user, services, authorizationToken, isLoading}}>
        {children}
    </AuthContext.Provider>
} 

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if(!authContextValue){
        throw new Error("useAuth used outside Provider.");
    }
    return authContextValue;
}