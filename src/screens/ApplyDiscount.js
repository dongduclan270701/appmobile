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
    HomepageContainer
} from '../components/styles'

import { } from '../apis/index'
const ApplyDiscount = ({ navigation }) => {
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
                    <Text style={{ color: 'white', textAlign: 'center', flex: 1, fontSize: 20, fontWeight: 'bold' }}>Discount</Text>
                </HomepageContainer>

                {dataCart.product.map((item, index) => (
                    <ScrollView horizontal={true} style={styles.cartItems} key={index}>
                        <View style={styles.cartItem}>
                            <Image source={{ uri: item.img[0] }} style={styles.productImage} />
                            <View style={styles.productInfo}>
                                <Text style={styles.productName}>Giảm tối đa 300k</Text>
                                <Text style={styles.productPrice}>Giảm 45k</Text>
                                <Text style={styles.productPrice}>HSD: 2023-09-13</Text>
                            </View>
                            <TouchableOpacity style={styles.removeButton} onPress={() => { }}>
                                <Text style={styles.removeButtonText}>Apply</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    removeButton: {
        backgroundColor: 'black',
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 15,
        padding: 10,
    },
    removeButtonText: {
        color: 'white',
        fontWeight: 'bold',
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
    }
});

export default ApplyDiscount;
