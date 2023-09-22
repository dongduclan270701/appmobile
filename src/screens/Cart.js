import React, { useState, useRef } from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet,
    ScrollView, Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
    HomepageContainer, Logo
} from '../components/styles'

import { fetchBestLaptop } from '../apis/index'
const Cart = ({ navigation }) => {
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
    const handleQuantityChange = (index, newQuantity) => {
        const updatedDataCart = { ...dataCart }
        updatedDataCart.product[index].quantity = newQuantity
        setDataCart(updatedDataCart);
    };
    const handleRemoveItem = (index) => {
        const updatedDataCart = { ...dataCart }
        updatedDataCart.product.splice(index, 1)
        setDataCart(updatedDataCart)
    };
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: 'black' }}>
                <HomepageContainer>
                    <Text style={{ color: 'white', textAlign: 'center', flex: 1, fontSize: 20, fontWeight: 'bold' }}>Cart</Text>
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
                                <TouchableOpacity
                                    style={styles.quantityButton}
                                    onPress={() => handleQuantityChange(index, item.quantity - 1)}
                                >
                                    <Text style={styles.quantityButtonText}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.quantityText}>{item.quantity}</Text>
                                <TouchableOpacity
                                    style={styles.quantityButton}
                                    onPress={() => handleQuantityChange(index, item.quantity + 1)}
                                >
                                    <Text style={styles.quantityButtonText}>+</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveItem(index)}>
                                <Text style={styles.removeButtonText}>Xóa</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                ))}
            </ScrollView>
            <View style={styles.totalContainer}>
                <Text style={styles.sum}>Sum: <Text style={{ color: 'red' }}>230,123,123 VNĐ</Text></Text>
                <TouchableOpacity
                    style={styles.buyButton}
                    onPress={() => {
                        navigation.navigate('Payment')
                    }}
                >
                    {/*  */}
                    <Text style={styles.buyButtonText}>Payment</Text>
                </TouchableOpacity>
            </View>
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
    removeButton: {
        backgroundColor: 'red',
        padding: 20,
    },
    removeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    checkoutButton: {
        width: '30%',
        backgroundColor: 'red',
        padding: 16,
        borderRadius: 5,
        alignItems: 'center',
    },
    checkoutButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buyButton: {
        bottom: 90,
        backgroundColor: 'red',
        padding: 25,
        justifyContent: 'center',
        width:'40%'
    },
    buyButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    sum: {
        width: '70%',
        borderWidth: 1,
        backgroundColor:'black',
        bottom: 90,
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        padding: 25,
        justifyContent: 'center',
    }

});

export default Cart;