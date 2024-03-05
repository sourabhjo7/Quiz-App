import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import ratingStar from '../../assets/rating-star.png';
// import OptionsCard from '../Components/OptionsCard';
import {quizScreenStyles} from '../Styles/QuizScreenStyles';
import {QuestionContext} from '../Constants/ApiContext';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const QuizScreen = () => {
  const {navigation, route} = useNavigation();
  const quizId = route.params.quizId;
  console.log(quizId);
  const [timeLeft, setTimeLeft] = useState(59);
  const [timeTaken, settimeTaken] = useState(0);
  const [disable, setDisable] = useState(false);
  const [randOption1, setRandOption1] = useState();
  const [randOption2, setRandOption2] = useState();
  const [fiftyFifty, setFiftyFifty] = useState(false);
  const [disableFifty, setDisableFifty] = useState(false);

  const {
    getCurrentQuestion,
    getCurrentOptions,
    handleNextQuestion,
    currentQuestionIndex,
    questions,
    setCorrectOption,
    quizName,
  } = useContext(QuestionContext);

  const getCurrentQuiz = async () => {
    const quiz = await getQuizbyID(quizId);
  };

  const onPressOption = value => {
    setCorrectOption(value);
    // console.log(questions);
    setDisable(true);
  };
  const onPress50 = () => {
    setFiftyFifty(true);
    setDisableFifty(true);
    setRandOption1(Math.floor(Math.random() * 4));
    setRandOption2(Math.floor(Math.random() * 4));
  };
  const onQuizSubmit = () => {
    let quizData = {};
    for (let i = 0; i < questions.length; i++) {
      if (questions[i]) {
        const key = questions[i].key;
        if (!quizData[key]) {
          quizData[key] = [];
        }
        quizData[key].push({
          answer: questions[i].answer,
          question: questions[i].question,
          options: questions[i].options,
        });
      }
    }

    console.log(quizData);
    navigation.navigate('Result');
  };
  // console.log(questions)

  const startTimer = () => {
    timer = setTimeout(() => {
      if (timeLeft <= 0) {
        clearTimeout(timer);
        return false;
      }
      setTimeLeft(timeLeft - 1);
      settimeTaken(timeTaken + 1);
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    if (timeLeft === 0) {
      handleNextQuestion();
      setTimeLeft(59);
    }
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    setDisable(false);
    setFiftyFifty(false);
  }, [currentQuestionIndex]);

  const data = [
    {
      id: 1,
      option: 'Sustainable',
      correct: true,
    },
    {
      id: 2,
      option: 'Economical',
      correct: false,
    },
    {
      id: 3,
      option: 'Social',
      correct: false,
    },
    {
      id: 4,
      option: 'None of the above',
      correct: false,
    },
  ];

  return (
    <View style={{...quizScreenStyles.quizContainer}}>
      <View>
        <View style={quizScreenStyles.headingContainer}>
          <Text style={quizScreenStyles.heading}>{quizName}</Text>
          <View style={quizScreenStyles.currentScoreContainer}>
            <Image source={ratingStar} style={{width: 17, height: 17}} />
            <Text style={quizScreenStyles.currentScore}>00</Text>
          </View>
        </View>
        <View style={quizScreenStyles.questionsContainer}>
          <View style={quizScreenStyles.timerContainer}>
            <Text style={quizScreenStyles.timer}>00:{timeLeft}</Text>
          </View>
          <Text style={quizScreenStyles.questionNumber}>
            Question - {currentQuestionIndex + 1} / {questions.length}
          </Text>
          <Text style={quizScreenStyles.questionText}>
            {getCurrentQuestion()}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '70%',
          alignSelf: 'center',
        }}>
        <View
          style={{
            width: 70,
            height: 70,
            backgroundColor: '#6EDBA9',
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{rotate: '45deg'}],
            transformOrigin: {x: 0, y: 0},
            overflow: 'hidden',
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#ffffff',
            elevation: 10,
          }}>
          <TouchableOpacity
            style={{
              transform: [{rotate: '-45deg'}],
            }}>
            <Ionicon name="people" size={30} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            width: 70,
            height: 70,
            backgroundColor: disableFifty ? '#0000001A' : '#6EDBA9',
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{rotate: '45deg'}],
            transformOrigin: {x: 0, y: 0},
            overflow: 'hidden',
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#ffffff',
            elevation: 10,
          }}
          onPress={onPress50}
          disabled={disableFifty}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 500,
              color: '#ffffff',
              transform: [{rotate: '-45deg'}],
            }}>
            50:50
          </Text>
        </TouchableOpacity>
      </View>
      <View style={quizScreenStyles.optionsContainer}>
        <FlatList
          data={getCurrentOptions()}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            // console.log(item)
            return fiftyFifty ? (
              item === questions[currentQuestionIndex].options[randOption1] ||
              item === questions[currentQuestionIndex].options[randOption2] ? (
                <></>
              ) : (
                <OptionsCard
                  option={item}
                  answer={item}
                  onPress={onPressOption}
                  disabled={disable}
                  questionIndex={currentQuestionIndex}
                />
              )
            ) : (
              <OptionsCard
                option={item}
                answer={item}
                onPress={onPressOption}
                disabled={disable}
                questionIndex={currentQuestionIndex}
              />
            );
          }}
          ListFooterComponent={() => (
            <TouchableOpacity
              style={{
                ...quizScreenStyles.nextButton,
                backgroundColor: disable ? '#222336' : 'grey',
              }}
              disabled={disable ? false : true}
              onPress={() => {
                if (currentQuestionIndex + 1 < questions.length) {
                  handleNextQuestion();
                } else {
                  onQuizSubmit();
                }
                setTimeLeft(59);
              }}>
              <Text style={quizScreenStyles.nextText}>
                {currentQuestionIndex + 1 === questions.length
                  ? 'Submit'
                  : 'Next'}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const OptionsCard = ({disabled, option, answer, onPress, questionIndex}) => {
  const value = answer;
  const [optionSelect, setOptionSelect] = useState(false);
  const onPressOption = () => {
    setOptionSelect(true);
    onPress(value);
  };
  useEffect(() => {
    setOptionSelect(false);
  }, [questionIndex]);

  const optionColor = optionSelect ? (value ? '#C3EDBF' : 'red') : '#F2F2F2';
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 12,
        paddingLeft: 12,
        backgroundColor: optionColor,
        marginBottom: 15,
        borderRadius: 10,
      }}
      onPress={onPressOption}
      disabled={disabled}>
      <Text style={{fontSize: 12, fontWeight: 500, color: '#42003F'}}>
        {option}
      </Text>
    </TouchableOpacity>
  );
};

export default QuizScreen;
