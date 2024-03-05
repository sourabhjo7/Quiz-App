import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { resultStyles } from '../Styles/ResultStyles'
import profilePicture from '../../assets/profile-pic.png'
import Star from '../../assets/rating-star.png'
import Home from '../../assets/home-icon.png'
import Share from '../../assets/share-icon.png'

const Result = ({ navigation }) => {
    return (
        <View style={{ ...resultStyles.resultContainer }}>
            <TouchableOpacity onPress={() => navigation.navigate('AllQuizes')}>
                <Text style={{ ...resultStyles.headerText }}>
                    {`<`}   RESULT
                </Text>
            </TouchableOpacity>
            <View style={{ ...resultStyles.imageContainer }}>
                <Image
                    source={profilePicture}
                    style={{ ...resultStyles.imageStyle }}
                />
                <Text style={{ ...resultStyles.userText }}>
                    Krishna Sharma
                </Text>
                <Text style={{ ...resultStyles.congratsText }}>
                    CONGRATES
                </Text>
                <Text style={{ ...resultStyles.congratsSubText }}>
                    Keep It Up Champ
                </Text>
            </View>
            <View style={{ ...resultStyles.pointsView }}>
                <Text style={{ ...resultStyles.pointsText }}>
                    Points- 200
                </Text>
                <Image
                    source={Star}
                    style={{ height: 24, width: 24 }}
                />
            </View>
            <View style={{ ...resultStyles.accuracyView }}>
                <Text style={{ ...resultStyles.accuracyText }}>
                    86% Accuracy
                </Text>
            </View>
            <Text style={resultStyles.timeText}>
                Time Taken - 23Min 3 Sec
            </Text>
            <Text style={resultStyles.correctText}>
                Correct Answers - 60/64
            </Text>
            <View style={resultStyles.bottomIcons}>
                <View style={resultStyles.bottomContainer}>
                    <TouchableOpacity
                        style={resultStyles.homeIconContainer}
                        onPress={() => navigation.navigate('HomePage')}
                    >
                        <Image
                            source={Home}
                        />
                    </TouchableOpacity>
                    <Text style={resultStyles.bottomText}>
                        Home
                    </Text>
                </View>
                <View style={resultStyles.bottomContainer}>
                    <TouchableOpacity style={resultStyles.shareIconContainer}>
                        <Image
                            source={Share}
                        />
                    </TouchableOpacity>
                    <Text style={resultStyles.bottomText}>
                        Share
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default Result