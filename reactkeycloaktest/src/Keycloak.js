import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
 url: "https://auth.megabrain.kr/",
 realm: "ToyProject",
 clientId: "springclient",
});
//const keycloak = new Keycloak('https://auth.megabrain.kr/ReactSpringrealm/keycloak.json');
export default keycloak;