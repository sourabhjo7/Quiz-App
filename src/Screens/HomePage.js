import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState, useContext, useEffect, useRef} from 'react';
import headerImage from '../../assets/header-image.png';
import profilePicture from '../../assets/profile-pic.png';
import ratingStar from '../../assets/rating-star.png';
import leaderBoard2 from '../../assets/leaderboard-2.png';
import leaderBoard3 from '../../assets/leaderboard-3.png';
import Teacher from '../../assets/teachers/teacher2.jpeg';
import CountdownTimer from '../Components/CountdownTimer';
import QuizCard from '../Components/QuizCard';
import {homeStyles} from '../Styles/HomeStyles';
import {QuestionContext} from '../Constants/ApiContext';
import axios from 'axios';
import {Modalize} from 'react-native-modalize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicon from 'react-native-vector-icons/Ionicons';

const HomePage = ({navigation}) => {
  const [data, setData] = useState({});
  const bottomsheetRef = useRef(null);
  const {questions, setQuestions, currentQuestionIndex, setQuizName, quizName} =
    useContext(QuestionContext);
  // console.log(await AsyncStorage.getItem('token'));
  const onOpen = () => {
    if (bottomsheetRef.current) {
      bottomsheetRef.current.open();
    }
  };
  // const fetchAllQuizzes = async () => {
  //   try {
  //     const response = await getAllQuizzes();

  //     setQuizzes(response);
  //   } catch (error) {
  //     console.error('Error fetching API data', error);
  //   }
  // };
  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token);
      const url =
        'http://yesquiz-stage.eba-gwufjrqj.ap-south-1.elasticbeanstalk.com/api/v1/quiz';
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQuizName(response.data[0].name);
      // if (response.data) {
      //   console.log(Object.entries(response.data[0].quiz));
      // }

      const extractedQuestions = Object.entries(response.data[0].quiz).flatMap(
        subjectQuestions => {
          return subjectQuestions[1].map(questionObj => ({
            //save Object keys as array
            key: subjectQuestions[0],
            answer: '',
            options: questionObj.options,
            question: questionObj.question,
          }));
        },
        //   subjectQuestions.map(questionObj => ({
        //     //save Object keys as array

        //     answer: '',
        //     options: questionObj.options,
        //     question: questionObj.question,
        //   })),
      );
      // console.log(extractedQuestions);
      setQuestions(extractedQuestions);
    } catch (error) {
      console.error('Error fetching API data', error);
    }
  };
  // console.log(questions.length)

  useEffect(() => {
    fetchData();
  }, []);

  const flag = false;
  // console.log(questions, 'questionssssssssssss')

  return (
    <ScrollView>
      <View style={homeStyles.container}>
        <View style={homeStyles.firstBlock}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ProfileScreen')}>
            <Image source={profilePicture} style={homeStyles.profilePicture} />
          </TouchableOpacity>
          <View style={{marginTop: 30, width: '100%'}}>
            <View style={homeStyles.insideView1}>
              <Text style={homeStyles.beginnerText}>Beginner</Text>
              <View style={{flexDirection: 'row', paddingTop: 10}}>
                <Text style={homeStyles.Text500}>500</Text>
                <Image source={ratingStar} />
              </View>
            </View>
            <View style={homeStyles.blankView1}>
              <View style={homeStyles.blankView2}></View>
            </View>
          </View>
        </View>
        <View style={homeStyles.secondBlock}>
          <View style={{width: '65%'}}>
            <Text style={homeStyles.aboutText}>About Yes Academy</Text>
            <Text style={homeStyles.descriptionText}>
              Adv. Chirag Chotrani is a young yet experienced faculty in the
              field of Law. From being the topper of his batch, to creating many
              All India Rankers in the Field of Company Secretary, Chirag has
              proved his academic capabilities time and again….
            </Text>
          </View>
          <View>
            <Image
              source={Teacher}
              style={{height: 60, width: 50, alignSelf: 'flex-end'}}
            />
            <TouchableOpacity
              style={{
                backgroundColor: '#93AADA',
                paddingVertical: 4,
                paddingHorizontal: 6,
                borderRadius: 5,
                marginTop: 5,
              }}>
              <Text style={{color: '#ffffff', fontWeight: 500}}>
                Learn More
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={homeStyles.thirdBlock}>
          <View style={homeStyles.insideView2}>
            <Text style={homeStyles.mainExamText}>Main Exam</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={homeStyles.Text500}>500</Text>
              <Image source={ratingStar} />
            </View>
          </View>
          <View style={homeStyles.blankView3} />
          <View style={{flexDirection: 'row', paddingHorizontal: 15}}>
            <Text style={homeStyles.liveText}>Going live on</Text>
            <Text style={homeStyles.dateText}>13/072023</Text>
          </View>
          <CountdownTimer
            containerStyle={homeStyles.countdownContainer}
            boxStyle={homeStyles.countdownBox}
            numberStyle={homeStyles.countdownNumber}
            textStyle={homeStyles.countdownText}
          />
          <TouchableOpacity style={homeStyles.reminderButton}>
            <Text style={homeStyles.reminderText}>Set reminder</Text>
          </TouchableOpacity>
        </View>
        <View style={homeStyles.fourthBlock}>
          {flag ? (
            <>
              <View style={homeStyles.headingLeaderboardView}>
                <Text style={homeStyles.headingLeaderboardText}>
                  Leaderboard
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Leaderboard')}>
                  <Text style={homeStyles.fullLeaderboard}>
                    View full {`>`}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={homeStyles.leaderboardCard}>
                <View style={{marginTop: 10}}>
                  <Image source={leaderBoard2} style={homeStyles.imageRiya} />
                  <Text style={homeStyles.riyaText}>Riya</Text>
                </View>
                <View style={{top: -12}}>
                  <Image
                    source={profilePicture}
                    style={homeStyles.imageKuldeep}
                  />
                  <Text style={homeStyles.kuldeepText}>Kuldeep</Text>
                </View>
                <View style={{top: 15}}>
                  <Image source={leaderBoard3} style={homeStyles.imageKaran} />
                  <Text style={homeStyles.karanText}>Karan</Text>
                </View>
              </View>
            </>
          ) : (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: 600, color: '#93AADA'}}>
                LeaderBoard Coming Soon
              </Text>
              <Ionicon name="lock-closed" size={100} color="#93AADA" />
            </View>
          )}
        </View>
        <View style={homeStyles.headingQuizView}>
          <Text style={homeStyles.headingQuizText}>Quizes</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AllQuizes');
            }}>
            <Text style={{fontSize: 12, fontWeight: 400, color: '#374259'}}>
              View All {`>`}
            </Text>
          </TouchableOpacity>
        </View>

        <QuizCard
          onPress={onOpen}
          title={quizName}
          questionNumber={questions.length}
        />

        <Modalize
          ref={bottomsheetRef}
          adjustToContentHeight
          handlePosition="inside"
          onOverlayPress={() => bottomsheetRef.current.close()}>
          <View style={{...homeStyles.bottomSheetContainer}}>
            <Text style={{...homeStyles.bottomSheetHeader}}>QUIZ RULES</Text>
            <View style={{...homeStyles.pointsContainer}}>
              <Image source={ratingStar} />
              <Text style={{...homeStyles.pointsText}}>Points</Text>
            </View>
            <Text style={{...homeStyles.bottomSheetSubText}}>
              For each correct answer you are given 3 points. Point’s add up and
              increase your level.
            </Text>
            <View style={{...homeStyles.lifelinesContainer}}>
              <View style={{...homeStyles.pollsIconContainer}}>
                <Text style={{...homeStyles.lifelineIcon}}>P</Text>
              </View>
              <Text style={{...homeStyles.lifelineText}}>Poll</Text>
            </View>
            <Text style={{...homeStyles.bottomSheetSubText}}>
              Allows you to get hint from the other player poll, allowed once
              per quiz
            </Text>
            <View style={{...homeStyles.lifelinesContainer}}>
              <View style={{...homeStyles.fiftyFiftyIconContainer}}>
                <Text style={{...homeStyles.lifelineIcon}}>F</Text>
              </View>
              <Text style={{...homeStyles.lifelineText}}>50:50</Text>
            </View>
            <Text style={{...homeStyles.bottomSheetSubText}}>
              Removes 2 Wanted Options.
            </Text>
            <TouchableOpacity
              style={{...homeStyles.startButton}}
              onPress={() => {
                navigation.navigate('QuizScreen');
                bottomsheetRef.current.close();
              }}>
              <Text style={{...homeStyles.startText}}>Start</Text>
            </TouchableOpacity>
          </View>
        </Modalize>
        <View style={homeStyles.fifthBlock}>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <Text style={homeStyles.shareText}>Share the app and get</Text>
            <View style={{flexDirection: 'row', top: 1}}>
              <Text
                style={{
                  fontSize: 12,
                  color: '#394257',
                  fontWeight: 700,
                  marginHorizontal: 5,
                }}>
                500
              </Text>
              <Image source={ratingStar} />
            </View>
          </View>
          <TouchableOpacity style={homeStyles.shareButton}>
            <Text style={{fontSize: 12, color: 'white'}}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomePage;
