import React, { useState, useRef } from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet,
    ScrollView, Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
    HomepageContainer, Logo
} from '../components/styles'

import { } from '../apis/index'
const Payment = ({ navigation }) => {
    const formatter = new Intl.NumberFormat('en-US')
    const [dataCart, setDataCart] = useState({
        "product": [
            {
                "_id": "650afa0a82ae198eca8a6a0c",
                "img": [
                    "https://res.cloudinary.com/dolydpat4/image/upload/v1695301949/nifrn7kzljhac6xp70zk.webp",
                    "https://res.cloudinary.com/dolydpat4/image/upload/v1695301950/q9y0mdz3fohhsvrsflqg.webp"
                ],
                quantity: 1,
                "nameProduct": "Laptop ASUS Vivobook S 14 Flip TN3402YA LZ192W",
                "realPrice": 18999000,
                "nowPrice": 17190000,
                "collection": "laptop",
            },
            {
                "_id": "650afa0a82ae198eca8a6a0c",
                "img": [
                    "https://res.cloudinary.com/dolydpat4/image/upload/v1695301949/nifrn7kzljhac6xp70zk.webp",
                    "https://res.cloudinary.com/dolydpat4/image/upload/v1695301950/q9y0mdz3fohhsvrsflqg.webp"
                ],
                quantity: 1,
                "nameProduct": "Laptop ASUS Vivobook S 14 Flip TN3402YA LZ192W",
                "realPrice": 18999000,
                "nowPrice": 17190000,
                "collection": "laptop",
            },
        ],
    })
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: 'black' }}>
                <HomepageContainer>
                    <Text style={{ color: 'white', textAlign: 'center', flex: 1, fontSize: 20, fontWeight: 'bold' }}>Payment</Text>
                </HomepageContainer>
                {dataCart.product.map((item, index) => (
                    <ScrollView horizontal={true} style={styles.cartItems} key={index}>
                        <View style={styles.cartItem}>
                            <Image source={{ uri: item.img[0] }} style={styles.productImage} />
                            <View style={styles.productInfo}>
                                <Text style={styles.productName}>{item.nameProduct}</Text>
                                <Text style={styles.productPrice}>{formatter.format(item.nowPrice)} VNĐ</Text>
                            </View>
                            <View style={styles.quantityContainer}>
                                <Text style={styles.quantityText}>x {item.quantity}</Text>
                            </View>
                        </View>
                    </ScrollView>
                ))}
            </ScrollView>
            <TouchableOpacity
                style={styles.buyButton}
                onPress={() => {
                    // navigation.navigate('Cart')
                }}
            >
                <Text style={styles.buyButtonText}>Create Order</Text>
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: 'black',
        position: 'relative'
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 40,
    },
    quantityButton: {
        backgroundColor: 'unset',
        padding: 0,
        borderRadius: 5,
    },
    quantityButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 28,
    },
    quantityText: {
        fontSize: 16,
        marginHorizontal: 10,
        color: 'white'
    },
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    cartItems: {
        marginBottom: 16,
    },
    productImage: {
        width: 80,
        height: 80,
        marginRight: 16,
    },
    productInfo: {
        textAlign: 'left'
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        width: 210
    },
    productPrice: {
        fontSize: 14,
        color: 'red',
        marginTop: 8,
    },
    buyButton: {
        position: 'absolute',
        left: 100,
        right: 100,
        bottom: 30,
        backgroundColor: 'red',
        padding: 10,
        alignItems: 'center',
        borderRadius: 30,
    },
    buyButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default Payment;
