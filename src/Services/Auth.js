import axios from 'axios';
import {api} from './Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL =
  'http://yesquiz-stage.eba-gwufjrqj.ap-south-1.elasticbeanstalk.com/api/v1';

export const redirectToLogin = async () => {
  await AsyncStorage.removeItem('token');
  //Navigate to the login page in react native using Navigate
  navigation.navigate('Login');
  //   window.location.replace(
  //     `https://auth.cs.yesquiz.in/login?client_id=${
  //       import.meta.env.VITE_APP_COGNITO_APP_CLIENT_ID
  //     }&response_type=code&redirect_uri=${
  //       import.meta.env.VITE_APP_COGNITO_REDIRECT_URI
  //     }`,
  //   );
};

export const getToken = async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    return token;
  }
  return null;
};

export const checkToken = async () => {
  try {
    const response = await api.get('/auth/');
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    // console.log(error);
  }
  return false;
};

export const logout = async () => {
  try {
    const response = await api.get('/auth/logout');
    if (response.status === 200) {
      localStorage.removeItem('token');
      //   window.location.replace(
      //     `https://auth.cs.yesquiz.in/logout?response_type=code&client_id=${
      //       import.meta.env.VITE_APP_COGNITO_APP_CLIENT_ID
      //     }&redirect_uri=${import.meta.env.VITE_APP_COGNITO_REDIRECT_URI}`,
      //   );
      return true;
    }
  } catch (error) {
    // console.log(error);
  }
  return false;
};
export const login = async (
  email,
  password,
  isNewLogin = false,
  new_password,
) => {
  try {
    const body = isNewLogin
      ? {
          email: email,
          password: password,
          new_password: new_password,
        }
      : {
          email: email,
          password: password,
        };
    const response = await axios.post(`${BASE_URL}/auth`, body);
    console.log(response.data);
    if (response.data.token) {
      await AsyncStorage.setItem('token', response.data.token);
      // navigation.navigate("HomePage");
    }
    return response.data;
  } catch (error) {
    // console.log(error);
  }
};
export const signup = async (
  firstName,
  lastName,
  email,
  mobileNumber,
  programme,
  yesAcademy,
  enrollNumber,
) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signup`, {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: mobileNumber,
      programme: programme,
      batch: 'January',
      yes_academy: yesAcademy,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
  return null;
};
export const addTeachers = async requestBody => {
  try {
    const response = await api.post(
      `${VITE_API_BASE_URL}/api/v1/teachers/`,
      requestBody,
    );
    if (response) {
      return response;
    }
  } catch (Error) {
    throw new Error(Error.status.toString());
  }
};
