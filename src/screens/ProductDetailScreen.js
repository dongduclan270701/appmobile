import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import {
    HomepageContainer,
} from '../components/styles'
import { fetchGoodsByName } from '../apis/index'
import Ionicons from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get('window');
const ProductDetailScreen = ({ navigation, route }) => {
    const formatter = new Intl.NumberFormat('en-US')
    const data = route.params
    const [product, setProduct] = useState()
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    useEffect(() => {
        fetchGoodsByName(data.src, data.collection)
            .then(result => {
                setProduct(result)
            })
            .catch(error => {
                console.log(error)
            })
    }, [route])

    const renderTextWithSpan = (text) => {
        const splitText = text.split(/<br\s*\/?>/i)
        return splitText.map((textPart, index) => {
            if (index === splitText.length - 1) {
                return textPart;
            }
            return textPart + '\n'
        })
    }
    const handleScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const imageIndex = Math.floor(contentOffsetX / 300)
        setCurrentImageIndex(imageIndex);
    }
    const sumStarProduct = () => {
        const sum = product && product.rating.reduce((accumulator, item) => {
            return accumulator + item.star;
        }, 0)
        return sum
    }
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            const starIcon = i <= Math.round(sumStarProduct() / product.sold) ? 'yellow' : 'white';
            stars.push(
                <Ionicons
                    key={i}
                    name={'ios-star'}
                    size={15}
                    style={{ paddingHorizontal: 5, color: starIcon }}
                />
            );
        }
        return stars;
    };

    return (
        <View style={styles.container}>
            <ScrollView style={{ flex: 1 }}
                contentContainerStyle={styles.contentContainer}>
                <HomepageContainer>
                </HomepageContainer>
                {product ? (
                    <View style={{ padding: 10, paddingBottom: 150 }}>
                        <ScrollView
                            horizontal
                            pagingEnabled // Enable paging to scroll image by image
                            onScroll={handleScroll} // Call handleScroll when scrolling
                            showsHorizontalScrollIndicator={false} // Hide scroll indicator
                        >
                            {product.img.map((imgUrl, index) => (

                                <Image
                                    key={index}
                                    source={{ uri: imgUrl }}
                                    style={{ width: 400, height: 400, marginRight: 10 }}
                                />
                                //                                     <ImageModal
                                //     resizeMode="contain"
                                //     imageBackgroundColor="#000000"
                                //     style={{
                                //       width: 250,
                                //       height: 250,
                                //     }}
                                //     source={{
                                //       uri: 'https://cdn.pixabay.com/photo/2019/07/25/18/58/church-4363258_960_720.jpg',
                                //     }}
                                //   />
                            ))}
                        </ScrollView>
                        <Text style={{ color: 'white', textAlign: 'center' }}>

                            {product.img.map((item, index) => {
                                if (currentImageIndex === index) {
                                    return <Ionicons key={index} name='radio-button-on' />
                                }
                                else {
                                    return <Ionicons key={index} name='radio-button-off' />
                                }
                            })}
                        </Text>
                        <Text style={styles.productName}>{product.nameProduct}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            {renderStars()}
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingBottom: 20 }}>
                            <Text style={{ fontSize: 15, color: 'white' }}>
                                {product.rating.length} reviews - {product.sold} sold - {product.view} views
                            </Text>
                        </View>
                        <Text style={styles.productPrice}>
                            {formatter.format(product.nowPrice)} VNĐ&ensp;
                            <View>
                                <Text style={styles.grayText}> - {formatter.format(product.percent)} %</Text>
                            </View>
                        </Text>
                        <Text style={styles.productRealPrice}>
                            <Text style={styles.strikeThrough}>{formatter.format(product.realPrice)} VNĐ</Text>
                        </Text>
                        <Text style={styles.sectionTitle}>PRESENT:</Text>
                        {product.gift.map((gift, index) => (
                            <Text style={styles.giftText} key={index}>
                                ⭐ - {gift}
                            </Text>
                        ))}
                        <Text style={styles.sectionTitle}>PROMOTION WHEN BUYING INCLUDED:</Text>
                        {product.gift_buy.map((gift, index) => (
                            <Text style={styles.giftText} key={index}>
                                🎁 - {gift}
                            </Text>
                        ))}
                        <Text style={styles.sectionTitle}>Đặc điểm kỹ thuật:</Text>
                        <ScrollView>
                            {product.description_table.map((item, index) => (
                                <View style={styles.specRow} key={index}>
                                    <Text style={styles.specName}>{item[0]}</Text>
                                    <Text style={styles.specValue}>{renderTextWithSpan(item[1])}</Text>
                                </View>
                            ))}
                        </ScrollView>
                        <Text style={styles.sectionTitle}>Mô tả sản phẩm:</Text>
                        {product.description.map((paragraph, index) => (
                            <View style={styles.specColumn} key={index}>
                                <Text style={styles.descName}>{paragraph[0]}</Text>
                                <Text style={styles.descValue}>{renderTextWithSpan(paragraph[1])}</Text>
                                {product.img[index] ? <Image
                                    key={index}
                                    source={{ uri: product.img[index] }}
                                    style={{ width: 400, height: 400, marginRight: 10 }}
                                /> : null}
                            </View>
                        ))}

                    </View>
                ) : (
                    <View style={[styles.loading, { width, height }]}>
                        <ActivityIndicator size='large' color='white' />
                    </View>
                )}
            </ScrollView>
            <TouchableOpacity
                style={styles.buyButton}
                onPress={() => {
                    navigation.navigate('Cart')
                }}
            >
                <Text style={styles.buyButtonText}>Buy</Text>
            </TouchableOpacity>
        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    contentContainer: {
        flexGrow: 1,
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 10,
    },
    productPrice: {
        fontSize: 20,
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: 'bold'
    },
    productRealPrice: {
        fontSize: 18,
        textAlign: 'center'
    },
    grayText: {
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 10,
        paddingHorizontal: 10,
        color: 'red',
    },
    strikeThrough: {
        textDecorationLine: 'line-through',
        color: 'gray',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red',
        marginTop: 20,
    },
    descriptionText: {
        fontSize: 16,
        color: 'white',
        marginTop: 10,
    },
    specRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    specColumn: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    descName: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    descValue: {
        width: '100%',
        fontSize: 16,
        color: 'white',
    },
    specName: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    specValue: {
        width: '70%',
        fontSize: 16,
        color: 'white',
    },
    giftText: {
        fontSize: 16,
        color: 'white',
        marginTop: 10,
        fontWeight: 'bold',
    },
    loading: {
        flex: 1,
        backgroundColor: 'black',
        paddingHorizontal: 16,
        paddingTop: 16,
        alignItems: 'center',
        justifyContent: 'center',
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
    },
});


export default ProductDetailScreen;
