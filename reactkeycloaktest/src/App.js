import './App.css';
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./Nav";
import WelcomePage from "./Homepage";
import SecuredPage from "./Securedpage";

function App() {
  return (
    <div>
     <ReactKeycloakProvider authClient={keycloak}>
       <Nav />
       <BrowserRouter>
         <Routes>
           <Route exact path="/" element={<WelcomePage />} />
           <Route path="/secured" element={<SecuredPage />} />
         </Routes>
       </BrowserRouter>
       </ReactKeycloakProvider>
   </div>
  );
}

export default App;
