import { StyleSheet } from "react-native";

const quizScreenStyles = StyleSheet.create({
    quizContainer: {
        flex: 1,
        backgroundColor: '#0000001A',
        justifyContent: 'space-between'
    },
    headingContainer: {
        backgroundColor: '#374259',
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    heading: {
        fontSize: 20,
        fontWeight: 500,
        color: '#ffffff'
    },
    currentScoreContainer: {
        marginVertical: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    currentScore: {
        fontSize: 17,
        fontWeight: 500,
        color: '#ffffff',
        marginLeft: 7
    },
    questionsContainer: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    timerContainer: {
        alignSelf: 'center',
        paddingHorizontal: 33,
        paddingVertical: 8,
        backgroundColor: '#394257',
        borderRadius: 10
    },
    timer: {
        fontSize: 13,
        color: '#ffffff',
        fontWeight: 500
    },
    questionNumber: {
        marginTop: 25,
        fontSize: 13,
        fontWeight: 600,
        color: '#000000'
    },
    questionText: {
        fontSize: 12,
        marginTop: 10,
        color: "#222336",
        fontWeight: 400,
        lineHeight: 22
    },
    optionsContainer: {
        paddingVertical: 35,
        paddingHorizontal: 50,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    nextButton: {
        paddingVertical: 10, width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 50,
        borderRadius: 5
    },
    nextText: {
        fontSize: 13,
        fontWeight: 500,
        color: '#ffffff'
    }
})

export { quizScreenStyles }