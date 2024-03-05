import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { profileStyles } from '../Styles/ProfileStyles'
import ProfilePicture from '../../assets/profile-pic.png'
import RatingStar from '../../assets/rating-star.png'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { useSafeAreaFrame } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'


const ProfileScreen = ({ navigation }) => {

    const [data, setData] = useState({})

    const fetchData = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const url = 'http://yesquiz-stage.eba-gwufjrqj.ap-south-1.elasticbeanstalk.com/api/v1/students'
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setData(response.data)
        } catch (error) {
            console.error('Error fetching API data', error)
        }
        console.log(data && data)
    }

    const logout = async () => {
        await AsyncStorage.removeItem('token')
        navigation.navigate('Splash')
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <View style={{ backgroundColor: '#F5F5F5', flex: 1 }}>
            <View style={{ backgroundColor: '#FFFFFF', padding: 16, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                <Header onPress={() => navigation.navigate('HomePage')} />
                <View style={{ alignItems: 'center' }}>
                    <Image source={ProfilePicture} style={{ height: 85, width: 85, borderRadius: 42.5, borderWidth: 3.5, borderColor: '#374259' }} />
                    <Text style={{ marginVertical: 7, fontSize: 14, fontWeight: 500, color: '#374259' }}>
                        {data.first_name} {data.last_name}
                    </Text>
                    <Text style={{ fontSize: 12, fontWeight: 400, color: '#748AA1' }}>
                        Beginner
                    </Text>
                </View>
            </View>
            <View style={{ backgroundColor: '#FFFFFF', marginTop: 26, marginHorizontal: 7, borderRadius: 11, paddingVertical: 16, paddingHorizontal: 14, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ width: '65%' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
                        <Text style={{ fontSize: 12, fontWeight: 500, color: '#748AA1' }}>
                            Email:
                        </Text>
                        <Text style={{ fontSize: 12, fontWeight: 600, color: '#031645' }}>
                            {data.email}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
                        <Text style={{ fontSize: 12, fontWeight: 500, color: '#748AA1' }}>
                            Phone Number:
                        </Text>
                        <Text style={{ fontSize: 12, fontWeight: 600, color: '#031645' }}>
                            {data.phone}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 12, fontWeight: 500, color: '#748AA1' }}>
                            Programme:
                        </Text>
                        <Text style={{ fontSize: 12, fontWeight: 600, color: '#031645' }}>
                            {data.programme}
                        </Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', width: '35%' }}>
                    <Image source={RatingStar} style={{ height: 41, width: 41 }} />
                    <Text style={{ fontSize: 20, fontWeight: 600, color: '#394257' }}>
                        500
                    </Text>
                </View>
            </View>
            <View style={{ backgroundColor: '#FFFFFF', marginVertical: 15, marginHorizontal: 7, borderRadius: 11, paddingVertical: 16, paddingHorizontal: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 14, fontWeight: 500, color: '#394257' }}>
                    Edit Profile
                </Text>
                <Ionicon name='create-outline' size={20} />
            </View>
            <TouchableOpacity
                style={{ backgroundColor: '#FFFFFF', marginHorizontal: 7, borderRadius: 11, paddingVertical: 16, paddingHorizontal: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                onPress={logout}
            >
                <Text style={{ fontSize: 14, fontWeight: 500, color: '#394257' }}>
                    Logout
                </Text>
                <Ionicon name='arrow-forward-outline' size={20} />
            </TouchableOpacity>
        </View>
    )
}

const Header = ({ onPress }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPress}
            >
                <Ionicons name='chevron-back-outline' size={24} color={'#000000'} />
            </TouchableOpacity>
            <Text style={{ fontSize: 19, fontWeight: 600, color: '#374259', marginLeft: 6 }}>
                Profile
            </Text>
        </View>
    )
}

export default ProfileScreen