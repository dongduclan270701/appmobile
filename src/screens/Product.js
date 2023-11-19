import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import {
    HomepageContainer
} from '../components/styles'
import {
    fetchCollecting,
} from '../apis/index'
const Product = ({ navigation }) => {
    return (
        <ScrollView style={{backgroundColor:'black'}}>
            <HomepageContainer>
            </HomepageContainer>
            <View >
                <TouchableOpacity style={styles.category} onPress={() => {
                    navigation.navigate('ProductListScreen', { category: 'laptop-gaming', nameCategory:'Laptop Gaming' })
                }}>
                    <ImageBackground
                        source={require('../../assets/laptopGaming.jpg')}
                        style={styles.imageBackground1}
                        borderRadius={20}
                    >
                        <Text style={styles.text1}>Laptop Gaming</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>

            <View >
                <TouchableOpacity style={styles.category} onPress={() => {
                    navigation.navigate('ProductListScreen', { category: 'laptop', nameCategory:'Laptop' })
                }}>
                    <ImageBackground
                        source={require('../../assets/laptop.jpg')}
                        style={styles.imageBackground2}
                        borderRadius={20}
                    >
                        <Text style={styles.text2}>Laptop</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity style={styles.category} onPress={() => {
                    navigation.navigate('ProductListScreen', { category: 'pc-creator', nameCategory:'PC Creator' })
                }}>
                    <ImageBackground
                        source={require('../../assets/PC.jpg')}
                        style={styles.imageBackground3}
                        borderRadius={20}
                    >
                        <Text style={styles.text2}>PC Creator</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={styles.category} onPress={() => {
                    navigation.navigate('ProductListScreen', { category: 'pc-company', nameCategory:'PC Company' })
                }}>
                    <ImageBackground
                        source={require('../../assets/PC.jpg')}
                        style={styles.imageBackground4}
                        borderRadius={20}
                    >
                        <Text style={styles.text3}>PC Company</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={styles.category} onPress={() => {
                    navigation.navigate('ProductListScreen', { category: 'pc-gaming', nameCategory:'PC Gaming' })
                }}>
                    <ImageBackground
                        source={require('../../assets/PC.jpg')}
                        style={styles.imageBackground5}
                        borderRadius={20}
                    >
                        <Text style={styles.text4}>PC Gaming</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={styles.category} onPress={() => {
                    navigation.navigate('ProductListScreen', { category: 'apple', nameCategory:'Apple' })
                }}>
                    <ImageBackground
                        source={require('../../assets/Apple.png')}
                        style={styles.imageBackground6}
                        borderRadius={20}
                    >
                        <Text style={styles.text5}>Apple</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    category: {
        backgroundColor: 'black',
        flexDirection: 'row'
    },
    imageBackground1: {
        margin: 10,
        height: 100,
        borderColor: 'white',
        flex: 1,
        justifyContent: 'flex-start',
    },
    imageBackground2: {
        margin: 10,
        height: 100,
        flex: 1,
        justifyContent: 'flex-start',
    },
    imageBackground3: {
        margin: 10,
        height: 100,
        borderColor: 'white',
        flex: 1,
        justifyContent: 'flex-start',
    },
    imageBackground4: {
        margin: 10,
        height: 100,
        flex: 1,
        justifyContent: 'flex-start',
    },
    imageBackground5: {
        margin: 10,
        height: 100,
        borderColor: 'white',
        flex: 1,
        justifyContent: 'flex-start',
    },
    imageBackground6: {
        margin: 10,
        height: 100,
        flex: 1,
        justifyContent: 'flex-start',
        marginBottom: 100
    },
    text1: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: "100%",
        padding: 10,
        fontSize: 16,
        fontWeight: "bold",
        color: 'white',
    },
    text2: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: "100%",
        padding: 10,
        fontSize: 16,
        fontWeight: "bold",
        color: 'white',
    },
    text3: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: "100%",
        padding: 10,
        fontSize: 16,
        fontWeight: "bold",
        color: 'white',
    },
    text4: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: "100%",
        padding: 10,
        fontSize: 16,
        fontWeight: "bold",
        color: 'white',
    },
    text5: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: "100%",
        padding: 10,
        fontSize: 16,
        fontWeight: "bold",
        color: 'white',
    },
    text6: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: "100%",
        padding: 10,
        fontSize: 16,
        fontWeight: "bold",
        color: 'white',
    },
})

export default Product;
