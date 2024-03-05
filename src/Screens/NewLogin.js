import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import headerImage from '../../assets/header-image.png';
import {RenderError, reg} from '../Constants/Util';
import useRequest from '../Hooks/useRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {login} from '../Services/Auth';

const NewLogin = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [oneTimePassword, setOneTimePassword] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});
  const [token, setToken] = useState('');
  const disable = !reg.test(email);

  const {makeRequest} = useRequest();

  const newLogin = async () => {
    try {
      const res = await login(email, oneTimePassword, true, password);
      console.log(res);
      navigation.navigate('HomePage');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#374259'}}>
      <Image
        source={headerImage}
        style={{alignSelf: 'flex-end', right: -40, top: -15}}
      />
      <View style={{paddingHorizontal: 20}}>
        <Text style={{fontSize: 20, fontWeight: 500, color: 'white'}}>
          Enter Your Credentials
        </Text>

        <Text
          style={{
            fontSize: 12,
            fontWeight: 300,
            color: 'white',
            marginTop: 30,
          }}>
          Your e-mail
        </Text>
        <TextInput
          autoCapitalize="none"
          placeholder="Enter your e-mail here"
          style={{
            backgroundColor: 'white',
            borderRadius: 6,
            paddingHorizontal: 16,
            width: '100%',
            marginTop: 11,
            height: 45,
          }}
          onChangeText={text => {
            setEmail(text.trim());
            setError(prev => ({...prev, email: !text}));
          }}
          keyboardType="email-address"
        />
        {error.email && <RenderError message="Enter your email" />}
        {email && !reg.test(email) && (
          <RenderError message="Enter Valid Email" />
        )}

        <Text
          style={{
            fontSize: 12,
            fontWeight: 300,
            color: 'white',
            marginTop: 30,
          }}>
          Your One Time Password
        </Text>
        <TextInput
          autoCapitalize="none"
          placeholder="Enter your one time password here"
          style={{
            backgroundColor: 'white',
            borderRadius: 6,
            paddingHorizontal: 16,
            width: '100%',
            marginTop: 11,
            height: 45,
          }}
          onChangeText={text => {
            setOneTimePassword(text.trim());
            setError(prev => ({...prev, oneTimePassword: !text}));
          }}
          keyboardType="email-address"
        />
        {error.oneTimePassword && (
          <RenderError message="Enter your one time password" />
        )}

        <Text
          style={{
            fontSize: 12,
            fontWeight: 300,
            color: 'white',
            marginTop: 30,
          }}>
          Your New Password
        </Text>
        <TextInput
          autoCapitalize="none"
          placeholder="Enter your new password here"
          style={{
            backgroundColor: 'white',
            borderRadius: 6,
            paddingHorizontal: 16,
            width: '100%',
            marginTop: 11,
            height: 45,
          }}
          onChangeText={text => {
            setPassword(text.trim());
            setError(prev => ({...prev, password: !text}));
          }}
          keyboardType="email-address"
        />
        {error.password && <RenderError message="Enter your new password" />}
      </View>

      <TouchableOpacity
        style={{
          paddingVertical: 15,
          width: '60%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: disable ? '#C4C4C4' : '#6989CC',
          alignSelf: 'center',
          borderRadius: 10,
          marginTop: 80,
        }}
        onPress={() => {
          newLogin();
        }}
        disabled={disable}>
        <Text style={{fontSize: 16, fontWeight: 500, color: 'white'}}>
          Continue
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default NewLogin;
