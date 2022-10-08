import React from "react";
import {View,StyleSheet,Text,TouchableOpacity} from 'react-native';

const Home = ({navigation})=> {
    return (
        <View style = {styles.container}>
            <View style={styles.title}>
            <Text style={styles.containertext}>Inje University</Text>
            </View>    
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signInButton}
                    onPress={()=>navigation.navigate('map')}>
                    <Text>지도</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.signInButton}
                    onPress={()=>navigation.navigate('Login')}>
                    <Text>로그인</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.signUpButton}
                    onPress={()=>navigation.navigate('Sign')}>
                    <Text>회원가입</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems:'center',
    },
    containertext: {
        fontSize: 50,
    },  
    title: {
        width: '100%',
        height: '55%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: "100%",
        height: "45%",
        alignItems: "center",
        paddingTop: 90,
    },
    signInButton: {
        width: "40%",
        alignItems: "center",
        borderRadius: 15,
        borderWidth: 1,
        padding: 10,
        margin: 10,
      },
      signUpButton: {
        width: "40%",
        alignItems: "center",
        borderRadius: 15,
        borderWidth: 1,
        padding: 10,
        margin: 10,
      },
})
export default Home;