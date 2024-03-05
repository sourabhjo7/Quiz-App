import React, {useState, useEffect, useContext} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import QuizCard from '../Components/QuizCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {QuestionContext} from '../Constants/ApiContext';
import {getAllQuizzes} from '../Services/Quiz';
import {useNavigation} from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

const AllQuizzesScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState({});

  const {quizzes, setQuizzes} = useContext(QuestionContext);

  const fetchAllQuizzes = async () => {
    try {
      const response = await getAllQuizzes();

      setQuizzes(response);
    } catch (error) {
      console.error('Error fetching API data', error);
    }
  };

  const openQuizByID = id => {
    navigation.navigate('QuizScreen', {quizId: id});
  };

  useEffect(() => {
    fetchAllQuizzes();
  }, []);
  return (
    <View>
      <FlatList
        data={quizzes}
        keyExtractor={item => item._id}
        renderItem={({item}) => {
          // console.log(item)
          return (
            <QuizCard
              title={item.name}
              createdAt={item.created_at}
              onPress={() => openQuizByID(item._id)}
            />
          );
        }}
      />
    </View>
  );
};

const QuizCompletedScreen = () => {
  const [data, setData] = useState({});

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const url =
        'http://yesquiz-stage.eba-gwufjrqj.ap-south-1.elasticbeanstalk.com/api/v1/quiz';
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response.data)
      setData(response.data);
    } catch (error) {
      console.error('Error fetching API data', error);
    }
    // console.log(data && data)
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={item => item._id}
        renderItem={({item}) => {
          // console.log(item)
          return <QuizCard title={item.name} createdAt={item.created_at} />;
        }}
      />
    </View>
  );
};

const Header = ({onPress}) => (
  <View
    style={{paddingHorizontal: 20, paddingTop: 20, backgroundColor: 'white'}}>
    <TouchableOpacity onPress={onPress}>
      <Text style={{fontSize: 20, fontWeight: 500, color: '#374259'}}>
        {'< Quiz'}
      </Text>
    </TouchableOpacity>
  </View>
);

const AllQuizes = ({navigation}) => {
  return (
    <>
      <Header onPress={() => navigation.navigate('HomePage')} />
      <Tab.Navigator
        screenOptions={{
          labelStyle: {fontSize: 14, fontWeight: 500},
          indicatorStyle: {borderBottomColor: '#374259', borderBottomWidth: 4},
          activeTintColor: '#374259',
          inactiveTintColor: 'grey',
        }}>
        <Tab.Screen name="Quiz" component={AllQuizzesScreen} />
        <Tab.Screen name="Quiz Completed" component={QuizCompletedScreen} />
      </Tab.Navigator>
    </>
  );
};

export default AllQuizes;
