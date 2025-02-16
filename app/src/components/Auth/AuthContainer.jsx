import { createContext, useContext, useState } from "react";
import App from '../App';
import { BrowserRouter as Router, Routes as PossibleRoutes, Route, Navigate } from 'react-router-dom';
import { Routes } from "../../core/routing";
import LoginPage from "../Auth/OnBoarding/Login/LoginPage";
import storage from "../../core/storage";

const AuthContext = createContext();

const AuthContainer = () => {
    const [user, setUser] = useState(storage.getUser());

    const updateUser = (updatedUser) => {
        storage.storeUser(updatedUser);
        if(updatedUser) {
            storage.storeUserVariableData({'username': updatedUser.username});
        } else {
            storage.storeUserVariableData(null);
        }
        setUser(updatedUser);
    }

    const logout = () => {
        updateUser(null);
    }

    if(user) {
        return (
            <AuthContext.Provider value={{user, setUser: updateUser, logout}}>
                <App setUser={updateUser}/>
            </AuthContext.Provider>
        )
    }

    return (
        <Router>
            <PossibleRoutes>
                <Route index path={Routes.Login} element={<LoginPage setUser={updateUser} />} />
                <Route path="*" element={<Navigate to={Routes.Login} replace />} />
            </PossibleRoutes>
        </Router>
)
}

const useAuth = () => {
    return useContext(AuthContext);
}

export {
    useAuth,
}

export default AuthContainer;