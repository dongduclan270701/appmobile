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
    ActivityIndicator,
    Dimensions
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
    Colors, HomepageContainer, Logo, LineHomePage, Loading
} from '../components/styles'
import { fetchProductCollection } from '../apis/index'
const { width, height } = Dimensions.get('window');
const ProductListScreen = ({ navigation, route }) => {
    const formatter = new Intl.NumberFormat('en-US')
    const data = route.params
    const [goods, setGoods] = useState(null)
    const [filter, setFilter] = useState({ sort: 'none', collection: '', category: ['', '', '', '', ''], minPrice: 0, maxPrice: 90000000 })
    useEffect(() => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            collection: data.category,
        }));
        fetchProductCollection({ category: filter.category, collection: data.category }, 1)
            .then(result => {
                setGoods(result.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [data]);
    return (
        <View style={{ backgroundColor: 'black', flex: 1 }}>
            <HomepageContainer>
            </HomepageContainer>
            <View style={{ paddingBottom: 100 }}>
                {goods ? <FlatList data={goods}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={[styles.productContainer]} onPress={() => {
                            navigation.navigate('ProductDetailScreen', item)
                        }}>
                            <Image source={{ uri: item.img[0] }} style={{ width: '100%', height: '50%' }} />
                            <Text style={styles.text}>{item.nameProduct}</Text>
                            <Text style={styles.text}>{formatter.format(item.nowPrice)} VNĐ</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index}
                    numColumns={2}
                    contentContainerStyle={styles.container}
                /> : <View style={[styles.loading, { width, height }]}>
                    <ActivityIndicator size='large' color='white' />
                </View>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    loading: {
        flex: 1,
        backgroundColor: 'black',
        paddingHorizontal: 16,
        paddingTop: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    productContainer: {
        width: "46%",
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0a0a0ae0',
        borderWidth: 1,
        borderColor: '#535353',
        margin: 8,
        borderRadius: 30,
    },
    productName: {
        fontSize: 16,
    },
    text: {
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        paddingTop: 10
    },
})

export default ProductListScreen;