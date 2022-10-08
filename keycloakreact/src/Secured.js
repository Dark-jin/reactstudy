import {React,useState,useEffect} from 'react'
import Keycloak from 'keycloak-js';
import UserInfo from './UserInfo';
import Logout from './Logout';

const Secured = () => {
    const [keycloakState, setKeycloakState] = useState({ keycloak: null, authenticated: false });

    useEffect(() => {
        const keycloak = new Keycloak({
        url: "https://auth.megabrain.kr/",
        realm: "ToyProject",
        clientId: "springclient",
        });
        //ページロード時の処理で、Keycloak.init関数を呼び出し、未認証の場合
        //認可コードフローを開始しログインページを表示
        keycloak.init({onLoad: 'login-required'}).then(authenticated => {
            setKeycloakState({ keycloak: keycloak, authenticated: authenticated });      
        })
    }, [])
    console.log(keycloakState)
    if(keycloakState.keycloak){

        if(keycloakState.authenticated)
        return (
            <div>
                <p>login success</p>
                <UserInfo keycloak={keycloakState} />
                <Logout keycloak={keycloakState} />
            </div>
            ) ; 
        else 
        return(<div> 認証できません</div>)
        }
    return (
        <div>Keycloak...</div>
    )
}

export default Secured