import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    ActivityIndicator
} from 'react-native';
import {
    HomepageContainer
} from '../components/styles'
import {
    updateCart
} from '../apis/index'
import Toast from 'react-native-toast-message';
import Modal from "react-native-modal";
const Cart = ({ navigation, cartData, handleChangeDataCart, userInformation, token }) => {
    const formatter = new Intl.NumberFormat('en-US')
    const [dataCart, setDataCart] = useState([])
    const [isDelete, setIsDelete] = useState(false)
    useEffect(() => {
        setDataCart(cartData)
    }, [cartData]);
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
                    
                Toast.show({
                    type: 'error',
                    text1: error.message,
                    position: 'bottom'
                });
                })
        }
    };
    const handleRemoveItem = (index) => {
        setIsDelete(true)
        const updatedDataCart = [...dataCart]
        updatedDataCart.splice(index, 1)
        updateCart(userInformation.email, updatedDataCart, token)
            .then(result => {
                setDataCart(updatedDataCart);
                setIsDelete(false)
                Toast.show({
                    type: 'success',
                    text1: 'Remove product successful',
                    position: 'bottom'
                });
            })
            .catch(error => {
                Toast.show({
                    type: 'error',
                    text1: error.message,
                    position: 'bottom'
                });
            })
        handleChangeDataCart(updatedDataCart)
    };
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <ScrollView >
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
                    <Text style={styles.buyButtonText}>Payment</Text>
                </TouchableOpacity>
            </View>
            {isDelete && <Modal isVisible={isDelete}>
                <ActivityIndicator size='large' color='white' />
            </Modal>
            }
            <Toast/>
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
        bottom: 60,
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
        color: 'white',
        fontSize: 16,
        bottom: 60,
        fontWeight: 'bold',
        padding: 25,
        justifyContent: 'center',
    }

});

export default Cart;
