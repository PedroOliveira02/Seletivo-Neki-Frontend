import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import RoutesApp from "./routes";
import GlobalStyle from "./styles/global";

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <RoutesApp />
      <GlobalStyle />
    </AuthProvider>
  </BrowserRouter>
);

export default App;