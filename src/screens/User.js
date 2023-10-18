import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    Image
} from 'react-native';
import {
    HomepageContainer
} from '../components/styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    Octicons,
    Ionicons,
    Entypo,
    AntDesign,
    MaterialCommunityIcons
} from '@expo/vector-icons'
const User = ({ navigation, token, userInformation, handleSetLogged }) => {
    useEffect(() => {
        // const getData = async () => {
        //     try {
        //         const value = await AsyncStorage.getItem('token');
        //         return value
        //     } catch (error) {
        //     }
        // };
        // getData()
    }, []);
    return (
        <ScrollView style={{ backgroundColor: 'black' }}>
            <HomepageContainer>
            </HomepageContainer>
            {userInformation && token ? <View style={styles.information}>
                <Image style={styles.logo} source={{ uri: userInformation.image }} />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{userInformation.username}</Text>
                    <Text style={styles.email}>{userInformation.email}</Text>
                </View>
                <TouchableOpacity style={styles.logoutButton} onPress={() => { 
                    handleSetLogged({token:null, user: null})
                }}>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
            </View>
                :
                <View style={[styles.information]}>
                    <TouchableOpacity style={styles.logoutButton} onPress={() => {
                        navigation.navigate('Login')
                    }}>
                        <Text style={styles.logoutButtonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            }

            {/* Danh sách các mục */}
            <TouchableOpacity style={styles.listItem} onPress={() => {
                navigation.navigate('AccountSecurity')
            }}>
                <View style={{ flexDirection: 'row' }}>
                    <Ionicons name='person-outline' style={{ color: 'grey', paddingHorizontal: 10, fontSize: 24 }}></Ionicons>
                    <Text style={styles.listItemText}>Account & Security</Text>
                </View>
                <Ionicons name='chevron-forward' style={{ color: 'white', fontSize: 24 }}></Ionicons>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.listItem}>
                <View style={{ flexDirection: 'row' }}>
                    <Entypo name='ticket' style={{ color: 'grey', paddingHorizontal: 10, fontSize: 24 }}></Entypo>
                    <Text style={styles.listItemText}>Voucher</Text>
                </View>
                <Ionicons name='chevron-forward' style={{ color: 'white', fontSize: 24 }}></Ionicons>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.listItem} onPress={() => {
                navigation.navigate('Order')
            }}>
                <View style={{ flexDirection: 'row' }}>
                    <Octicons name='checklist' style={{ color: 'grey', paddingHorizontal: 10, fontSize: 24 }}></Octicons>
                    <Text style={styles.listItemText}>Order</Text>
                </View>
                <Ionicons name='chevron-forward' style={{ color: 'white', fontSize: 24 }}></Ionicons>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listItem}>
                <View style={{ flexDirection: 'row' }}>
                    <AntDesign name='infocirlceo' style={{ color: 'grey', paddingHorizontal: 10, fontSize: 24 }}></AntDesign>
                    <Text style={styles.listItemText}>About us</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listItem}>
                <View style={{ flexDirection: 'row' }}>
                    <MaterialCommunityIcons name='help' style={{ color: 'grey', paddingHorizontal: 10, fontSize: 24 }}></MaterialCommunityIcons>
                    <Text style={styles.listItemText}>Help</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    information: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        alignContent: 'center',
        width: '100%',
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'white',
    },
    textContainer: {
        alignItems: 'center',
    },
    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        paddingVertical: 5,
    },
    email: {
        color: 'white',
        fontSize: 15,
    },
    listItem: {
        backgroundColor: '#0b0b0b',
        padding: 10,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    listItemText: {
        color: 'white',
        fontSize: 16,
        paddingTop: 3
    },
    logoutButton: {
        backgroundColor: 'black',
        borderWidth: 1,
        borderColor: 'red',
        padding: 10,
        marginTop: 20,
        borderRadius: 15,
        alignItems: 'center',
    },
    logoutButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default User;
