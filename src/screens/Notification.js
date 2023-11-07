import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    TextInput,
    Alert
} from 'react-native';
import {
    HomepageContainer,
    LinePayment
} from '../components/styles'
import {
    EvilIcons,
    MaterialCommunityIcons,
} from '@expo/vector-icons'

const Notification = ({ navigation, lengthNotice, token }) => {
    const formatter = new Intl.NumberFormat('en-US')
    const [listNotice, setListNotice] = useState(null)
    useEffect(() => {
        setListNotice(lengthNotice)
    }, [lengthNotice]);
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: 'black' }}>
                <HomepageContainer>
                    <Text style={{ color: 'white', textAlign: 'center', flex: 1, fontSize: 20, fontWeight: 'bold' }}>Notification</Text>
                </HomepageContainer>

                {listNotice && listNotice.map((item, index) => (
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('OrderDetail', { orderId: item.orderId, token: token })
                    }} key={index} style={{ backgroundColor: item.isReadCus ? 'black' : '#282828', marginBottom: index === listNotice.length - 1 && 100  }}>
                        <View style={styles.cartItems} key={index}>
                            <View style={styles.cartItem}>
                                <Image source={{ uri: item.product.img[0] }} style={styles.productImage} />
                                <View style={styles.productInfo}>
                                    <Text style={styles.productName}>{item.status}</Text>
                                    <Text style={styles.contentNotice}>{item.content}</Text>
                                    <Text style={styles.time}>{item.time} {item.date}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ height: 5, width: '100%', backgroundColor: '#282828' }} />
                    </TouchableOpacity>
                ))}

            </ScrollView>
            
        </View>
    );
}

const styles = StyleSheet.create({
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        position: 'relative'
    },
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    cartItems: {
        marginBottom: 0,
    },
    productImage: {
        width: 80,
        height: 80,
        marginRight: 0,
    },
    productInfo: {
        textAlign: 'left'
    },
    productName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        width: 310
    },
    productPrice: {
        fontSize: 14,
        color: 'red',
        marginTop: 8,
    },
    time: {
        fontSize: 12,
        color: 'grey',
        width: 310
    },
    contentNotice: {
        fontSize: 14,
        color: 'white',
        width: 310
    },
})

export default Notification;
