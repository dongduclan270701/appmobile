import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    RefreshControl
} from 'react-native';
import {
    HomepageContainer
} from '../components/styles'

import {
    fetchUpdateNotice
} from '../apis/index'
import Toast from 'react-native-toast-message';
const Notification = ({ navigation, lengthNotice, token, userInformation, handleReadNotice, refreshing, onRefresh }) => {
    const [listNotice, setListNotice] = useState(null)
    useEffect(() => {
        if (token === null) return navigation.navigate('Login')
        if (lengthNotice === null) return navigation.navigate('Login')
        lengthNotice.sort((a, b) => {
            const dateA = new Date(`${a.date} ${a.time}`);
            const dateB = new Date(`${b.date} ${b.time}`);
            return dateB - dateA;
        });
        setListNotice(lengthNotice)

    }, [lengthNotice, token]);

    const handleReadNoticeCus = (id, isReadCus) => {
        if (!isReadCus) {
            fetchUpdateNotice(userInformation.email, { id: id }, token)
                .then(result => {
                    handleReadNotice(id)
                })
                .catch(error => {

                    Toast.show({
                        type: 'error',
                        text1: error.message,
                        position: 'bottom'
                    });
                })
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>

            <HomepageContainer>
                <Text style={{ color: 'white', textAlign: 'center', flex: 1, fontSize: 20, fontWeight: 'bold' }}>Notification</Text>
            </HomepageContainer>
            {token !== null && <ScrollView style={{ backgroundColor: 'black' }} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}
                    tintColor="white"
                />}>
                {listNotice && listNotice.map((item, index) => (
                    <TouchableOpacity onPress={() => {
                        handleReadNoticeCus(item._id, item.isReadCus)
                        navigation.navigate('OrderDetail', { orderId: item.orderId, token: token })
                    }} key={index} style={{ backgroundColor: item.isReadCus ? 'black' : '#282828', marginBottom: index === listNotice.length - 1 && 100 }}>
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

            </ScrollView>}
            <Toast />
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
