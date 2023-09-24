import React from 'react';
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
import {
    Octicons,
    Ionicons,
    Entypo,
    AntDesign,
    MaterialCommunityIcons,
    Feather,
    MaterialIcons
} from '@expo/vector-icons'

const AccountSecurity = ({navigation, userInformation}) => {
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: 'black' }}>
                <HomepageContainer>
                    <Text style={{ color: 'white', textAlign: 'center', flex: 1, fontSize: 20, fontWeight: 'bold' }}>Account & Security</Text>
                </HomepageContainer>
                <TouchableOpacity style={styles.listItem} onPress={() => {
                    navigation.navigate('ChangeInformationAccount')
                }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Ionicons name='person-outline' style={{ color: 'grey', paddingHorizontal: 10, fontSize: 24 }}></Ionicons>
                        <Text style={styles.listItemText}>My profile</Text>
                    </View>
                    <Ionicons name='chevron-forward' style={{ color: 'white', fontSize: 24 }}></Ionicons>
                </TouchableOpacity>
                <TouchableOpacity style={styles.listItem}>
                    <View style={{ flexDirection: 'row' }}>
                        <Ionicons name='person-outline' style={{ color: 'grey', paddingHorizontal: 10, fontSize: 24 }}></Ionicons>
                        <Text style={styles.listItemText}>Email</Text>
                    </View>
                    <Text style={{color:'white', paddingRight:10, fontWeight:'bold'}}>{userInformation.email}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.listItem}>
                    <View style={{ flexDirection: 'row' }}>
                        <Ionicons name='person-outline' style={{ color: 'grey', paddingHorizontal: 10, fontSize: 24 }}></Ionicons>
                        <Text style={styles.listItemText}>Username</Text>
                    </View>
                    <Text style={{color:'white', paddingRight:10, fontWeight:'bold'}}>{userInformation.username}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.listItem}>
                    <View style={{ flexDirection: 'row' }}>
                        <Feather name='phone' style={{ color: 'grey', paddingHorizontal: 10, fontSize: 24 }}></Feather>
                        <Text style={styles.listItemText}>Phone number</Text>
                    </View>
                    <Text style={{color:'white', paddingRight:10, fontWeight:'bold'}}>{userInformation.phoneNumber}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.listItem} onPress={() => {
                    navigation.navigate('ChangePassword')
                }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Octicons name='lock' style={{ color: 'grey', paddingHorizontal: 10, fontSize: 24 }}></Octicons>
                        <Text style={styles.listItemText}>Change password</Text>
                    </View>
                    <Ionicons name='chevron-forward' style={{ color: 'white', fontSize: 24 }}></Ionicons>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
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
})

export default AccountSecurity;
