import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    RefreshControl,
    SafeAreaView
} from 'react-native';
import {
    Octicons,
    Ionicons,
    AntDesign,
    MaterialCommunityIcons
} from '@expo/vector-icons'
const User = ({ navigation, token, userInformation, handleSetLogged, countOrder, handleChangeStepDefault, refreshing, onRefresh }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
            <ScrollView style={{ backgroundColor: 'black' }} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}
                    tintColor="white"
                />
            }>
                {userInformation && token ? <View style={styles.information}>
                    <Image style={styles.logo} source={{ uri: userInformation.image }} />
                    <View style={styles.textContainer}>
                        <Text style={styles.name}>{userInformation.username}</Text>
                        <Text style={styles.email}>{userInformation.email}</Text>
                    </View>
                    <TouchableOpacity style={styles.logoutButton} onPress={() => {
                        handleSetLogged({ token: null, user: null })
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
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 15, marginTop: 15 }}>
                    <TouchableOpacity onPress={() => {
                        handleChangeStepDefault(0)
                        navigation.navigate('Order')
                    }}>
                        <View style={styles.column}>
                            <Ionicons name='newspaper-outline' style={styles.process}></Ionicons>
                            <Text style={[styles.listItemText, { textAlign: 'center' }]}>Processing</Text>
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{countOrder.processing}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.space} />
                    <TouchableOpacity onPress={() => {
                        handleChangeStepDefault(1)
                        navigation.navigate('Order')
                    }}>
                        <View style={styles.column}>
                            <MaterialCommunityIcons name='truck-delivery-outline' style={styles.process}></MaterialCommunityIcons>
                            <Text style={[styles.listItemText, { textAlign: 'center' }]}>Delivery</Text>
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{countOrder.delivery}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.space} />
                    <TouchableOpacity onPress={() => {
                        handleChangeStepDefault(2)
                        navigation.navigate('Order')
                    }}>
                        <View style={styles.column}>
                            <MaterialCommunityIcons name='truck-check-outline' style={styles.process}></MaterialCommunityIcons>
                            <Text style={[styles.listItemText, { textAlign: 'center' }]}>Successful</Text>
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{countOrder.successful}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.space} />
                    <TouchableOpacity onPress={() => {
                        handleChangeStepDefault(3)
                        navigation.navigate('Order')
                    }}>
                        <View style={styles.column}>
                            <MaterialCommunityIcons name='cancel' style={styles.process}></MaterialCommunityIcons>
                            <Text style={[styles.listItemText, { textAlign: 'center' }]}>Cancel</Text>
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{countOrder.cancel}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
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
                    handleChangeStepDefault(0)
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    badge: {
        backgroundColor: '#e33c4b',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 0,
        top: 0,
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
    },
    column: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    space: {
        width: 25,
    },
    process: {
        color: 'grey',
        padding: 15,
        fontSize: 24,
        textAlign: 'center',
    },
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
