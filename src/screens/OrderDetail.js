import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
} from 'react-native';
import {
    HomepageContainer,
    LinePayment
} from '../components/styles'

import { } from '../apis/index'
import {
    Octicons,
    EvilIcons,
    Ionicons,
    Entypo,
    AntDesign,
    MaterialCommunityIcons,
    Feather,
    MaterialIcons
} from '@expo/vector-icons'
const OrderDetail = ({ navigation }) => {
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
                    <Text style={{ color: 'white', textAlign: 'center', flex: 1, fontSize: 20, fontWeight: 'bold' }}>Order Detail</Text>
                </HomepageContainer>
                <View style={[styles.information, { backgroundColor: 'green', padding: 15, marginVertical: 10 }]}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ color: 'white', fontSize: 15, paddingVertical: 5, fontWeight: 'bold' }}>Đơn đã hoàn thành</Text>
                            <Text style={{ color: 'white', fontSize: 15 }}>Cảm ơn đã sử dụng dịch vụ của chúng tôi</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.information, { paddingHorizontal: 10, marginBottom: 10 }]}>
                    <Text style={{ color: 'white', fontSize: 18, paddingVertical: 5, fontWeight: 'bold' }}>ID:</Text>
                    <Text style={{ color: 'white', fontSize: 18, padding: 5, fontWeight: 'bold' }}>1239014csafjj123adsf123</Text>
                </View>
                <View style={[styles.information, { marginBottom: 10 }]}>
                    <MaterialIcons name="payment" style={{ color: 'white', paddingHorizontal: 10, fontSize: 24 }} />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ color: 'white', fontSize: 15, paddingVertical: 5, fontWeight: 'bold' }}>Payment method</Text>
                            <Text style={{ color: 'white', fontSize: 15, paddingVertical: 2 }}>Thanh toán khi nhận hàng</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.information, { marginBottom: 10 }]}>
                    <Ionicons name='location-outline' style={{ color: 'red', paddingHorizontal: 10, fontSize: 24 }}></Ionicons>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ color: 'white', fontSize: 15, paddingVertical: 5, fontWeight: 'bold' }}>Địa chỉ nhận hàng</Text>
                            <Text style={{ color: 'white', fontSize: 15, paddingVertical: 2 }}>Đồng Đức Lân </Text>
                            <Text style={{ color: 'white', fontSize: 15, paddingVertical: 2 }}>0379382992</Text>
                            <Text style={{ color: 'white', fontSize: 15, paddingRight: 50 }}>Số 37, Ngõ 358 Bùi Xương Trạch Phường Khương Đình, quận thanh xuân, hà nội</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.information]}>
                    <MaterialCommunityIcons name='truck-delivery-outline' style={{ color: 'white', paddingHorizontal: 10, fontSize: 24 }}></MaterialCommunityIcons>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ color: 'white', fontSize: 15, paddingVertical: 5, fontWeight: 'bold' }}>Thông tin vận chuyển</Text>
                            <Text style={{ color: 'white', fontSize: 15, paddingVertical: 5 }}><Entypo name="dot-single" size={16} color="white" /> 2023-09-14 16:30 - Delivery successful</Text>
                            <Text style={{ color: 'white', fontSize: 15, paddingVertical: 5 }}><Entypo name="dot-single" size={16} color="white" /> 2023-09-14 16:30 - Being transported</Text>
                            <Text style={{ color: 'white', fontSize: 15, paddingVertical: 5 }}><Entypo name="dot-single" size={16} color="white" /> 2023-09-14 16:30 - Delivered to the carrier</Text>
                            <Text style={{ color: 'white', fontSize: 15, paddingVertical: 5 }}><Entypo name="dot-single" size={16} color="white" /> 2023-09-14 16:30 - Payment information confirmed</Text>
                            <Text style={{ color: 'white', fontSize: 15, paddingVertical: 5 }}><Entypo name="dot-single" size={16} color="white" /> 2023-09-14 16:30 - Ordered</Text>
                        </View>
                    </View>
                </View>
                <LinePayment style={{ flexDirection: 'row' }} />
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
                <LinePayment style={{ flexDirection: 'row' }} />
                <View style={[styles.information, { justifyContent: 'space-between', padding: 10 }]}>
                    <Text style={{ color: 'white', paddingHorizontal: 10, fontSize: 16 }}>Total amount ( 3 goods)</Text>
                    <Text style={{ color: 'red', paddingHorizontal: 10, fontSize: 16 }}>240,000,000 VNĐ</Text>
                </View>
                <LinePayment style={{ flexDirection: 'row' }} />
                <View style={[styles.information, { justifyContent: 'space-between', padding: 10 }]}>
                    <Entypo name='ticket' style={{ color: 'red', paddingHorizontal: 10, fontSize: 24 }}></Entypo>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: 'red', fontSize: 15, paddingVertical: 5 }} >- 24,000 VNĐ</Text>
                    </View>
                </View>
                <LinePayment style={{ flexDirection: 'row' }} />
                <View style={[styles.information, { justifyContent: 'space-between', padding: 10 }]}>
                    <Text style={{ color: 'white', paddingHorizontal: 10, fontSize: 16 }}>Ship fee</Text>
                    <Text style={{ color: 'red', paddingHorizontal: 10, fontSize: 16 }}>30,000 VNĐ</Text>
                </View>
                <LinePayment style={{ flexDirection: 'row' }} />
                <View style={[styles.information, { justifyContent: 'space-between', padding: 10 }]}>
                    <Text style={{ color: 'white', paddingHorizontal: 10, fontSize: 16 }}>Payment method</Text>
                    <Text style={{ color: 'white', paddingHorizontal: 10, fontSize: 16 }}>Payment upon delivery</Text>
                </View>
                <LinePayment style={{ flexDirection: 'row' }} />
                <View style={[styles.information, { justifyContent: 'space-between', padding: 10, paddingBottom: 100 }]}>
                    <Text style={{ color: 'white', paddingHorizontal: 10, fontSize: 16 }}>Total </Text>
                    <Text style={{ color: 'red', paddingHorizontal: 10, fontSize: 16 }}>240,000,000 VNĐ</Text>
                </View>
            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    information: {
        flexDirection: 'row',
    },
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

export default OrderDetail;
