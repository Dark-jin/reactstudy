import React, {useState, useEffect} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';

const map =() => {
    const [initialRegion, setInitialRegion] = useState({
        latitude: 35.91395373474155,
        longitude: 127.73829440215488,
        latitudeDelta: 5,
        longitudeDelta: 5,
      })

    return (
        <View style={styles.container}>
        <MapView 
            initialRegion={initialRegion}
            style={[styles.map]}
            provider={PROVIDER_GOOGLE}
        />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
    height: '80%',
  },
});
export default map;