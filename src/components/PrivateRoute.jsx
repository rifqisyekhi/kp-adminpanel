// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import { isStillAuthorized } from "../libs/user";
// import { removeCookie } from "../libs/cookie";

// const PrivateRoute = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(null);

//   // Check authentication status on mount
//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const isAuth = await isStillAuthorized();

//         if (isAuth) {
//           setIsAuthenticated(true);
//         } else {
//           removeCookie();
//           setIsAuthenticated(false);
//         }
//       } catch (error) {
//         console.error("Error during authentication check:", error);
//         removeCookie();
//         setIsAuthenticated(false);
//       }
//     };

//     checkAuth();
//   }, []);

//   // Wait for the authentication check to complete before rendering
//   if (isAuthenticated === null) {
//     return <div>Loading...</div>; // Loading state while checking auth
//   }

//   return isAuthenticated ? children : <Navigate to="/login" />;
// };

// export default PrivateRoute;
