import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from "expo-secure-store";
import Home from './Home';
import Login from './Login';
import Sign from './Sign';
import map from './map';
//import MainScreen from './MainScreen';
//import { url } from "./env"; //서버 주소

const Stack = createNativeStackNavigator();
export const AuthContext = React.createContext();

export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch(action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.type,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(()=> {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await SecureStore.getItemAsync("userToken");
      }
      catch(e) {
        // Restoring token failed
      }
      dispatch({type: "RESTORE_TOKEN", token: userToken});
    };
    bootstrapAsync();
  },[]);

  const authContext = React.useMemo(
    () => ({
      signIn:async(data) => {
        const {userId, password} = data;
        const signin_info = {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        };
        if (userId && password) {
          fetch(url + "/signin", signin_info)
          .then((response)=>response.json())
          .then((response)=>{
            if(response.result === "success") {
              SecureStore.setItemAsync("userToken",response.token);
              dispatch({ type: "SIGN_IN", token: response.token });
            }
            else alert(response.error);
          });
        } else {
          alert("입력 양식을 확인해주세요!");
        }
      },
      signOut: async() => {
        await SecureStore.deleteItemAsync("userToken");
        dispatch({type: "SIGN_OUT"});
      },
      signUp: async(data) => {
        const {userId, username, password, repassword} = data;
        const signup_info = {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        };
        let result;
        if (
          userId && username && password && repassword && password === repassword
        ) {
          fetch(url + "/signup", signup_info)
          .then((response)=> response.json())
          .then((response)=> {
            if(response.result === "success") {
              SecureStore.setItemAsync("userToken", response.token);
              dispatch({type: "SIGN_IN", token: response.token});
            } else alert(response.error);
          });
        } else {
          alert("입력 양식을 확인해주세요!");
        }
      },
    }),[]
  );

  return (
    <NavigationContainer>
      <AuthContext.Provider value={authContext}>
        <Stack.Navigator>
          {/* {state.userToken == null ? (
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Sign" component={Sign} />
            </>
          ) : (
            <>
              <Stack.Screen name="Main" component={MainScreen}
                initialParams={{token: state.userToken}}
              />
            </>
          )} */}
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="map" component={map} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Sign" component={Sign} />
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
}
