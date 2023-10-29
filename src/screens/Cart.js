import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    Alert
} from 'react-native';
import {
    HomepageContainer
} from '../components/styles'
import {
    fetchBestLaptop,
    updateCart
} from '../apis/index'
const Cart = ({ navigation, lengthCart, handleChangeLengthCart, userInformation, token }) => {
    const formatter = new Intl.NumberFormat('en-US')
    // const [dataCart, setDataCart] = useState({
    //     "product": [
    //         {
    //             "_id": "650afa0a82ae198eca8a6a0c",
    //             "img": [
    //                 "https://res.cloudinary.com/dolydpat4/image/upload/v1695301949/nifrn7kzljhac6xp70zk.webp",
    //                 "https://res.cloudinary.com/dolydpat4/image/upload/v1695301950/q9y0mdz3fohhsvrsflqg.webp"
    //             ],
    //             quantity: 1,
    //             "nameProduct": "Laptop ASUS Vivobook S 14 Flip TN3402YA LZ192W",
    //             "realPrice": 18999000,
    //             "nowPrice": 17190000,
    //             "collection": "laptop",
    //         },
    //         {
    //             "_id": "650afa0a82ae198eca8a6a0c",
    //             "img": [
    //                 "https://res.cloudinary.com/dolydpat4/image/upload/v1695301949/nifrn7kzljhac6xp70zk.webp",
    //                 "https://res.cloudinary.com/dolydpat4/image/upload/v1695301950/q9y0mdz3fohhsvrsflqg.webp"
    //             ],
    //             quantity: 1,
    //             "nameProduct": "Laptop ASUS Vivobook S 14 Flip TN3402YA LZ192W",
    //             "realPrice": 18999000,
    //             "nowPrice": 17190000,
    //             "collection": "laptop",
    //         },
    //     ],
    // })
    const [dataCart, setDataCart] = useState([])
    useEffect(() => {
        setDataCart(lengthCart)
    }, [lengthCart]);
    const total = dataCart.reduce((accumulator, currentItem) => {
        const productTotal = currentItem.nowPrice * currentItem.quantity;
        return accumulator + productTotal;
    }, 0);
    const handleQuantityChange = (index, newQuantity) => {
        if (newQuantity > 0) {
            const updatedDataCart = [...dataCart]
            updatedDataCart[index].quantity = newQuantity
            updateCart(userInformation.email, updatedDataCart, token)
                .then(result => {
                    setDataCart(updatedDataCart);
                })
                .catch(error => {
                    console.log(error)
                })
        }
    };
    const handleRemoveItem = (index) => {
        const updatedDataCart = [...dataCart]
        updatedDataCart.splice(index, 1)
        updateCart(userInformation.email, updatedDataCart, token)
            .then(result => {
                setDataCart(updatedDataCart);
                Alert.alert('Successful!', `Remove product successful`);
            })
            .catch(error => {
                console.log(error)
            })
        handleChangeLengthCart(updatedDataCart)
    };
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: 'black' }}>
                <HomepageContainer>
                    <Text style={{ color: 'white', textAlign: 'center', flex: 1, fontSize: 20, fontWeight: 'bold' }}>Cart</Text>
                </HomepageContainer>
                {dataCart.map((item, index) => (
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
                <Text style={styles.sum}>Sum: <Text style={{ color: 'red' }}>{formatter.format(total)} VNĐ</Text></Text>
                <TouchableOpacity
                    style={styles.buyButton}
                    onPress={() => {
                        if (dataCart.length > 0) navigation.navigate('Payment')
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
        width: '40%'
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
        backgroundColor: 'black',
        bottom: 90,
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        padding: 25,
        justifyContent: 'center',
    }

});

export default Cart;
