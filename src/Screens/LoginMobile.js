import { View, Text, ImageBackground, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import backgroundImage from '../../assets/splash-screen.png'
import headerImage from '../../assets/header-image.png'
import { RenderError } from '../Constants/Util'

const LoginMobile = ({ navigation }) => {

    const [mobileNumber, setMobileNumber] = useState('')
    const [error, setError] = useState({})
    const disable = mobileNumber.length != 10
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={backgroundImage}
                resizeMode="cover"
                style={{ flex: 1, justifyContent: 'center', position: 'relative' }}
            />
            <View style={{ position: 'absolute', right: -40, top: -15 }}>
                <Image source={headerImage} />
            </View>
            <View style={{ position: 'absolute', bottom: -85, left: -40 }}>
                <Image source={headerImage} />
            </View>
            <View style={{ position: 'absolute', top: 150, padding: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: 500, color: 'white' }}>
                    What’s your{"\n"}
                    Mobile Number ?
                </Text>
                <Text style={{ fontSize: 10, fontWeight: 400, color: 'white', marginTop: 10 }}>
                    Rest assured, we prioritize your privacy. Your phone number{"\n"}is safe with us, and we will never disclose it to third parties
                </Text>
                <View style={{ flex: 1, flexDirection: 'row', marginTop: 30, width: '100%' }}>
                    <TouchableOpacity style={{ backgroundColor: 'white', padding: 10, borderRadius: 6, justifyContent: 'center', marginRight: 17, height: 45 }} activeOpacity={1}>
                        <Text style={{ fontSize: 12, fontWeight: 400, color: 'black' }}>
                            IN +91
                        </Text>
                    </TouchableOpacity>
                    <View>
                        <TextInput
                            placeholder='Mobile Number'
                            style={{ backgroundColor: 'white', borderRadius: 6, paddingHorizontal: 16, width: 250, height: 45 }}
                            maxLength={10}
                            keyboardType={'numeric'}
                            onChangeText={(text) => {
                                text = text ? text?.replace(/[,.-]/g, '').replace(/^0+/, '') : ''
                                setMobileNumber(text.trim())
                                setError(prev => ({ ...prev, mobileNumber: (!text) }))
                            }}
                        />
                        {error.mobileNumber && <RenderError message='Enter Mobile Number' />}
                        {(mobileNumber && mobileNumber.length !== 10) && <RenderError message='Enter Valid Mobile Number' />}
                    </View>
                </View>
            </View>
            <TouchableOpacity
                style={{
                    paddingVertical: 15, width: '60%',
                    justifyContent: 'center', alignItems: 'center',
                    position: 'absolute', bottom: 85,
                    backgroundColor: disable ? '#C4C4C4' : '#6989CC',
                    alignSelf: 'center', borderRadius: 10
                }}
                onPress={() => {
                    navigation.navigate('LoginOTP')
                }}
                disabled={disable}
            >
                <Text style={{ fontSize: 16, fontWeight: 500, color: 'white' }}>
                    Continue
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default LoginMobile