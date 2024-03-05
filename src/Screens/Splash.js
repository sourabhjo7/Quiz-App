import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import backgroundImage from '../../assets/splash-screen.png'
import { splashStyles } from '../Styles/SplashStyles'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Splash = ({ navigation }) => {
    const handle = async () => {
        const token = await AsyncStorage.getItem('token')
        if (token) {
            navigation.navigate('HomePage')
        } else {
            navigation.navigate('Login')
        }
    }
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={backgroundImage}
                resizeMode="cover"
                style={splashStyles.backgroundImage}
            />
            <TouchableOpacity
                style={splashStyles.getStartedButton}
                onPress={handle}
            >
                <Text style={splashStyles.getStartedText}>
                    Get Started
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Splash