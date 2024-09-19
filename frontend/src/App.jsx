import React from "react";
import "./App.css";
import AppRoutes from "./routes/Routes";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <AppRoutes></AppRoutes>
    </UserProvider>
  );
}

export default App;
