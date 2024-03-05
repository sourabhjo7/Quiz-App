import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import { Modalize } from 'react-native-modalize'
import ratingStar from '../../assets/rating-star.png'
import Science from '../../assets/science-image.png'

const QuizCard = ({ onPress, title, createdAt, questionNumber }) => {

    const modalRef = useRef(null)

    const openModal = () => {
        if (modalRef.current) {
            modalRef.current.open();
        }
    }

    const closeModal = () => {
        if (modalRef.current) {
            modalRef.current.close();
        }
    }

    return (
        <View style={{ marginHorizontal: 8, marginTop: 10, padding: 15, backgroundColor: 'white', borderRadius: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <Text style={{ fontSize: 12, fontWeight: 500, color: '#374259' }}>
                    {title}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 18, color: '#394257', fontWeight: 700, marginRight: 10 }}>
                        500
                    </Text>
                    <Image
                        source={ratingStar}
                        style={{ width: 25, height: 25 }}
                    />
                </View>
            </View>
            <View style={{ backgroundColor: 'lightgrey', height: 2, width: '100%', borderRadius: 5, marginTop: 10 }} />
            <View style={{ marginTop: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image
                        source={Science}
                        style={{ borderRadius: 10, marginRight: 12 }}
                    />
                    <View style={{ marginTop: 12 }}>
                        <Text style={{ fontSize: 10, fontWeight: 400 }}>
                            Question - {questionNumber}
                        </Text>
                        <Text style={{ fontSize: 10, fontWeight: 400 }}>
                            {createdAt}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={{ paddingHorizontal: 20, backgroundColor: '#93AADA', justifyContent: 'center', alignItems: 'center', height: 25, borderRadius: 5, marginTop: 15 }}
                    onPress={onPress}
                >
                    <Text style={{ fontSize: 12, color: 'white' }}>
                        Play Now
                    </Text>
                </TouchableOpacity>
            </View>
            <Modalize
                ref={modalRef}
                scrollViewProps={{ showsVerticalScrollIndicator: false }}
                modalHeight={500}
                handlePosition="hidden"
            >
                <View style={{ padding: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                        Quiz Rules
                    </Text>
                    {/* Add your quiz rules or content here */}
                    <Text style={{ marginTop: 10 }}>
                        These are the rules for the quiz...
                    </Text>
                </View>
            </Modalize>
        </View>
    )
}

export default QuizCard