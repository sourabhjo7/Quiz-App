import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer } from '@react-navigation/native'
import Teacher from '../../assets/teachers/teacher1.jpeg'
import profilePicture from '../../assets/profile-pic.png'
import ratingStar from '../../assets/rating-star.png'
import leaderBoard2 from '../../assets/leaderboard-2.png'
import leaderBoard3 from '../../assets/leaderboard-3.png'
import { leaderboardStyles } from '../Styles/LeaderboardStyles'

const Tab = createMaterialTopTabNavigator()

const Header = ({ onPress }) => (
    <View style={leaderboardStyles.headerContainer}>
        <TouchableOpacity onPress={onPress}>
            <Text style={leaderboardStyles.headerText}>
                {'< quiz'}
            </Text>
        </TouchableOpacity>
    </View>
)

const Card = ({ rank, score }) => (
    <View>
        <View style={leaderboardStyles.cardContainer}>
            <View style={leaderboardStyles.cardInsideView}>
                <Text style={leaderboardStyles.rankText}>
                    {rank}
                </Text>
                <View style={leaderboardStyles.cardDetailsView}>
                    <Image
                        source={Teacher}
                        style={leaderboardStyles.cardDetailsImage}
                    />
                    <Text style={leaderboardStyles.cardDetailsText}>
                        Demo
                    </Text>
                </View>
            </View>
            <Text style={leaderboardStyles.cardScore}>
                {score}
            </Text>
        </View>
    </View>
)

const cardData = {
    'rank': 3,
    'score': 285
}

const AllTime = () => (
    <ScrollView>
        <View style={leaderboardStyles.allTimeRankContainer}>
            <View style={leaderboardStyles.yourRankContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={leaderboardStyles.yourRankText}>
                        3
                    </Text>
                    <View style={leaderboardStyles.yourRankDetailsContainer}>
                        <Image
                            source={Teacher}
                            style={leaderboardStyles.yourRankImage}
                        />
                        <Text style={leaderboardStyles.youText}>
                            You
                        </Text>
                    </View>
                </View>
                <Text style={leaderboardStyles.yourRankScore}>
                    285
                </Text>
            </View>
            <View style={leaderboardStyles.leadersContainer}>
                <View style={leaderboardStyles.leadersInsideView}>
                    <View style={{ marginTop: 10 }}>
                        <Image
                            source={leaderBoard2}
                            style={leaderboardStyles.imageRiya}
                        />
                        <Text style={leaderboardStyles.riyaText}>
                            Riya
                        </Text>
                        <View style={leaderboardStyles.leadersScoreContainer}>
                            <Text style={leaderboardStyles.leadersScore}>
                                500
                            </Text>
                            <Image
                                source={ratingStar}
                                style={{ height: 15, width: 15 }}
                            />
                        </View>
                    </View>
                    <View style={{ top: -12 }}>
                        <Image
                            source={profilePicture}
                            style={leaderboardStyles.kuldeepImage}
                        />
                        <Text style={leaderboardStyles.kuldeepText}>
                            Kuldeep
                        </Text>
                        <View style={leaderboardStyles.leadersScoreContainer}>
                            <Text style={leaderboardStyles.leadersScore}>
                                500
                            </Text>
                            <Image
                                source={ratingStar}
                                style={{ height: 15, width: 15 }}
                            />
                        </View>
                    </View>
                    <View style={{ top: 15 }}>
                        <Image
                            source={leaderBoard3}
                            style={leaderboardStyles.imageKaran}
                        />
                        <Text style={leaderboardStyles.karanText}>
                            Karan
                        </Text>
                        <View style={leaderboardStyles.leadersScoreContainer}>
                            <Text style={leaderboardStyles.leadersScore}>
                                500
                            </Text>
                            <Image
                                source={ratingStar}
                                style={{ height: 15, width: 15 }}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ marginTop: 23 }}>
                {
                    console.log(cardData.rank)
                }
                {Array.from({ length: 10 }).map((_, index) => {

                    cardData.rank = cardData.rank + 1
                    cardData.score = cardData.score - 5
                    return (
                        <Card
                            key={`card-${index}`}
                            rank={cardData.rank}
                            score={cardData.score}
                        />
                    )
                }
                )}
            </View>
        </View>
    </ScrollView>
)

const Weekly = () => (
    <>
    </>
)

const Monthly = () => (
    <>
    </>
)

const Leaderboard = ({ navigation }) => {
    return (
        <>
            <Header onPress={() => navigation.goBack()} />
            <Tab.Navigator
                screenOptions={{
                    labelStyle: { fontSize: 14, fontWeight: 500 },
                    indicatorStyle: { borderBottomColor: '#374259', borderBottomWidth: 4 },
                    activeTintColor: '#374259',
                    inactiveTintColor: 'grey',
                    tabBarStyle: { borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingTop: 20 }
                }}
            >
                <Tab.Screen name="All Time" component={AllTime} />
                <Tab.Screen name="Weekly" component={Weekly} />
                <Tab.Screen name="Monthly" component={Monthly} />
            </Tab.Navigator>
        </>
    )
}

export default Leaderboard