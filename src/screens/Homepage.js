import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    ImageBackground,
    FlatList,
    TouchableOpacity,
    Image,
    ActivityIndicator
} from 'react-native';
import {
    HomepageContainer,
    Logo,
    LineHomePage
} from '../components/styles'
import {
    fetchBestLaptop
} from '../apis/index'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Homepage = ({ navigation, route, lengthCart }) => {
    const formatter = new Intl.NumberFormat('en-US')
    const [laptop, setLaptop] = useState(null)
    const [laptopGaming, setLaptopGaming] = useState(null)
    const [pcGaming, setPcGaming] = useState(null)
    const [pcCreator, setPcCreator] = useState(null)
    const [pcCompany, setPcCompany] = useState(null)
    const [apple, setApple] = useState(null)
    const data = route.params
    const data2 = [
        { id: '1', src: require('../../assets/banner-ads4.png') },
        { id: '2', src: require('../../assets/banner-ads5.png') },
        { id: '3', src: require('../../assets/banner-ads6.png') },
    ];
    const data3 = [
        { id: '1', src: require('../../assets/banner-ads7.webp') },
        { id: '2', src: require('../../assets/banner-ads8.webp') },
        { id: '3', src: require('../../assets/banner-ads9.webp') },
    ];
    const data4 = [
        { id: '1', src: require('../../assets/banner-ads1.webp') },
        { id: '2', src: require('../../assets/banner-ads2.webp') },
        { id: '3', src: require('../../assets/banner-ads3.webp') },
    ];

    useEffect(() => {
        fetchBestLaptop()
            .then(result => {
                setLaptopGaming(result.resultBestLaptopGaming)
                setLaptop(result.resultBestLaptop)
                setPcGaming(result.resultBestPcGaming)
                setPcCreator(result.resultBestPcCreator)
                setPcCompany(result.resultBestPcCompany)
                setApple(result.resultBestApple)
            })
            .catch(error => {
                console.log(error)
            })
    }, []);

    return (
        <ScrollView style={{ backgroundColor: 'black' }}>
            <HomepageContainer>
                <Logo source={require('../../assets/logo-brand1.png')} />
                {/* <TouchableOpacity onPress={() => {
                    navigation.navigate('Product')
                }}>
                    <Logo source={require('../../assets/search.png')} style={{ width: 25, height: 25, tintColor: 'white', marginTop: 25 }} />
                    <Ionicons name="cart" style={{ color: 'white', marginTop: 25 }} size={26} />
                </TouchableOpacity> */}
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Cart')
                }}>
                    {/* <View style={{ color: 'grey', marginTop: 25 }}>
                        <Text style={{ color: 'white' }}>
                            <Ionicons name="cart" style={{ color: 'grey' }} size={26} />{lengthCart.length}
                        </Text>
                    </View> */}
                    <View style={styles.column}>
                    <Ionicons name="cart" style={{ color: 'grey' }} size={26} />
                        <Text style={[styles.listItemText, { textAlign: 'center' }]}>Successful</Text>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{lengthCart.length}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </HomepageContainer>
            <View style={styles.category}>
                <ImageBackground
                    source={require('../../assets/laptopGaming.jpg')}
                    style={styles.imageBackground1}
                    borderRadius={15}
                >
                    <Text style={styles.text1}>Laptop Gaming</Text>
                </ImageBackground>
                <ImageBackground
                    source={require('../../assets/laptop.jpg')}
                    style={styles.imageBackground2}
                    borderRadius={15}
                >
                    <Text style={styles.text2}>Laptop</Text>
                </ImageBackground>
            </View>
            <View style={styles.category}>
                <ImageBackground
                    source={require('../../assets/PC.jpg')}
                    style={styles.imageBackground3}
                    borderRadius={15}
                >
                    <Text style={styles.text2}>PC Creator</Text>
                </ImageBackground>
                <ImageBackground
                    source={require('../../assets/PC.jpg')}
                    style={styles.imageBackground4}
                    borderRadius={15}
                >
                    <Text style={styles.text3}>PC Company</Text>
                </ImageBackground>
                <ImageBackground
                    source={require('../../assets/PC.jpg')}
                    style={styles.imageBackground5}
                    borderRadius={15}
                >
                    <Text style={styles.text4}>PC Gaming</Text>
                </ImageBackground>
            </View>
            <View style={styles.category}>
                <ImageBackground
                    source={require('../../assets/Apple.png')}
                    style={styles.imageBackground6}
                    borderRadius={15}
                >
                    <Text style={styles.text5}>Apple</Text>
                </ImageBackground>
            </View>
            <View style={styles.container}>
                <LineHomePage />
                <Text style={{ color: 'white', paddingLeft: 10, paddingBottom: 10, fontSize: 16, fontWeight: 'bold' }}>Laptop Gaming Best Selling</Text>
                {laptopGaming ?
                    <FlatList
                        data={laptopGaming}
                        keyExtractor={(item, index) => index}
                        horizontal={true} // Đặt thuộc tính horizontal thành true để lướt ngang
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => {
                                navigation.navigate("ProductDetailScreen", item)
                            }}>
                                <View style={styles.item}>
                                    <Image source={{ uri: item.img[0] }} style={{ width: '100%', height: '50%' }} />
                                    <Text style={styles.text}>{item.nameProduct}</Text>
                                    <Text style={styles.text}>{formatter.format(item.nowPrice)} VNĐ</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                    :
                    <View style={[styles.loading]}>
                        <ActivityIndicator size='large' color='white' />
                    </View>
                }
            </View>
            <View style={styles.container}>
                <LineHomePage />
                <Text style={{ color: 'white', paddingLeft: 10, paddingBottom: 10, fontSize: 16, fontWeight: 'bold' }}>Laptop Company Best Selling</Text>
                {laptop ?
                    <FlatList
                        data={laptop}
                        keyExtractor={(item, index) => index}
                        horizontal={true} // Đặt thuộc tính horizontal thành true để lướt ngang
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                                <Image source={{ uri: item.img[0] }} style={{ width: '100%', height: '50%' }} />
                                <Text style={styles.text}>{item.nameProduct}</Text>
                                <Text style={styles.text}>{formatter.format(item.nowPrice)} VNĐ</Text>
                            </View>
                        )}
                    /> :
                    <View style={[styles.loading]}>
                        <ActivityIndicator size='large' color='white' />
                    </View>
                }
            </View>
            <View style={styles.container}>
                <Text style={{ color: 'white', paddingLeft: 10, paddingBottom: 10, fontSize: 16, fontWeight: 'bold' }}>Special offer</Text>
                <FlatList
                    data={data2}
                    keyExtractor={(item, index) => index}
                    horizontal={true}
                    renderItem={({ item }) => (
                        <View style={styles.banner}>
                            <Image source={item.src} style={{ width: '100%', height: '100%', borderRadius: 15 }} />
                        </View>
                    )}
                />
            </View>
            <View style={styles.container}>
                <LineHomePage />
                <Text style={{ color: 'white', paddingLeft: 10, paddingBottom: 10, fontSize: 16, fontWeight: 'bold' }}>Pc Gaming Best Selling</Text>
                {pcGaming ?
                    <FlatList
                        data={pcGaming}
                        keyExtractor={(item, index) => index}
                        horizontal={true} // Đặt thuộc tính horizontal thành true để lướt ngang
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                                <Image source={{ uri: item.img[0] }} style={{ width: '100%', height: '50%' }} />
                                <Text style={styles.text}>{item.nameProduct}</Text>
                                <Text style={styles.text}>{formatter.format(item.nowPrice)} VNĐ</Text>
                            </View>
                        )}
                    /> :
                    <View style={[styles.loading]}>
                        <ActivityIndicator size='large' color='white' />
                    </View>
                }
            </View>
            <View style={styles.container}>
                <LineHomePage />
                <Text style={{ color: 'white', paddingLeft: 10, paddingBottom: 10, fontSize: 16, fontWeight: 'bold' }}>Pc Creator Best Selling</Text>
                {pcCreator ?
                    <FlatList
                        data={pcCreator}
                        keyExtractor={(item, index) => index}
                        horizontal={true} // Đặt thuộc tính horizontal thành true để lướt ngang
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                                <Image source={{ uri: item.img[0] }} style={{ width: '100%', height: '50%' }} />
                                <Text style={styles.text}>{item.nameProduct}</Text>
                                <Text style={styles.text}>{formatter.format(item.nowPrice)} VNĐ</Text>
                            </View>
                        )}
                    /> :
                    <View style={[styles.loading]}>
                        <ActivityIndicator size='large' color='white' />
                    </View>
                }
            </View>
            <View style={styles.container}>
                <Text style={{ color: 'white', paddingLeft: 10, paddingBottom: 10, fontSize: 16, fontWeight: 'bold' }}>Special activities</Text>
                <FlatList
                    data={data3}
                    keyExtractor={(item, index) => index}
                    horizontal={true}
                    renderItem={({ item }) => (
                        <View style={styles.banner}>
                            <Image source={item.src} style={{ width: '100%', height: '100%', borderRadius: 15 }} />
                        </View>
                    )}
                />
            </View>
            <View style={styles.container}>
                <LineHomePage />
                <Text style={{ color: 'white', paddingLeft: 10, paddingBottom: 10, fontSize: 16, fontWeight: 'bold' }}>Pc Company Best Selling</Text>
                {pcCompany ?
                    <FlatList
                        data={pcCompany}
                        keyExtractor={(item, index) => index}
                        horizontal={true} // Đặt thuộc tính horizontal thành true để lướt ngang
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                                <Image source={{ uri: item.img[0] }} style={{ width: '100%', height: '50%' }} />
                                <Text style={styles.text}>{item.nameProduct}</Text>
                                <Text style={styles.text}>{formatter.format(item.nowPrice)} VNĐ</Text>
                            </View>
                        )}
                    /> :
                    <View style={[styles.loading]}>
                        <ActivityIndicator size='large' color='white' />
                    </View>
                }
            </View>
            <View style={styles.container}>
                <LineHomePage />
                <Text style={{ color: 'white', paddingLeft: 10, paddingBottom: 10, fontSize: 16, fontWeight: 'bold' }}>Apple Best Selling</Text>
                {apple ?
                    <FlatList
                        data={apple}
                        keyExtractor={(item, index) => index}
                        horizontal={true} // Đặt thuộc tính horizontal thành true để lướt ngang
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                                <Image source={{ uri: item.img[0] }} style={{ width: '100%', height: '50%' }} />
                                <Text style={styles.text}>{item.nameProduct}</Text>
                                <Text style={styles.text}>{formatter.format(item.nowPrice)} VNĐ</Text>
                            </View>
                        )}
                    /> :
                    <View style={[styles.loading]}>
                        <ActivityIndicator size='large' color='white' />
                    </View>
                }
            </View>
            <View style={styles.containerBottom}>
                <Text style={{ color: 'white', paddingLeft: 10, paddingBottom: 10, fontSize: 16, fontWeight: 'bold' }}>Secret Notification</Text>
                <FlatList
                    data={data4}
                    keyExtractor={(item, index) => index}
                    horizontal={true}
                    renderItem={({ item }) => (
                        <View style={styles.banner}>
                            <Image source={item.src} style={{ width: '100%', height: '100%', borderRadius: 15 }} />
                        </View>
                    )}
                />
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    process: {
        color: 'grey',
        padding: 10,
        fontSize: 24,
        textAlign: 'center',
    },
    badge: {
        backgroundColor: '#e33c4b',
        borderRadius: 10,
        width: 15,
        height: 15,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 10,
        top: 0,
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
    },
    column: {
        marginTop:25,
        flexDirection: 'column',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: 'black',
        padding: 10
    },
    containerBottom: {
        flex: 1,
        backgroundColor: 'black',
        padding: 10,
        paddingBottom: 100
    },
    category: {
        backgroundColor: 'black',
        flexDirection: 'row', // Sắp xếp các view theo chiều ngang
    },
    item: {
        width: 200,
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0a0a0ae0',
        borderWidth: 1,
        borderColor: '#535353',
        margin: 8,
        borderRadius: 15,
    },
    banner: {
        width: 400,
        height: 200,
        borderWidth: 1,
        borderColor: '#535353',
        margin: 8,
        borderRadius: 15,
    },
    text: {
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        paddingTop: 10
    },
    imageBackground1: {
        margin: 10,
        height: 100,
        borderColor: 'white',
        flex: 2,
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
});
export default Homepage;
