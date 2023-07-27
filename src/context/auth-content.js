import React from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogin: () => {},
    onLogout: () => {} // For better autocompletion of code inside the IDE (Visual Studio Code)
});

export default AuthContext;