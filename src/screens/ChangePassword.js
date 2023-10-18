import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    TextInput,
    Image,
    Alert,
    ActivityIndicator
} from 'react-native';
import {
    updatePasswordUser
} from '../apis/index'
const ChangePassword = ({ navigation, userInformation, token }) => {
    const [values, setValues] = useState({ oldPassword: '', newPassword: '', reNewPassword: '' })
    const [isLoading, setIsLoading] = useState(false)
    const handleChange = (field, text) => {
        setValues((prevValues) => ({
            ...prevValues,
            [field]: text,
        }));
    }
    const handleSubmitChangePassword = () => {
        const re = /[A-Z]/
        if (values.oldPassword === '') {
            Alert.alert('Missing', `You need to fill your password `);
        } else if (values.newPassword === '') {
            Alert.alert('Missing', `You need to fill your new password`);
        } else if (values.reNewPassword === '') {
            Alert.alert('Missing', `You need to fill your renew password`);
        } else if (values.reNewPassword !== values.newPassword) {
            Alert.alert('Incorrect', `Your renew password incorrect`);
        } else if (values.newPassword.length < 8 || !re.test(values.newPassword)) {
            Alert.alert('Incorrect', `New password must be at least 8 characters or more and contain capital letters!`);
        } else {
            updatePasswordUser(userInformation._id, {...userInformation, oldPassword: values.oldPassword, newPassword: values.newPassword}, token)
                .then(result => {
                    if(result === 'Password incorrect'){
                        Alert.alert('Incorrect', `Your password incorrect`);
                    } else {
                        navigation.goBack()
                    }
                    
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: 'black' }}>
                <View style={styles.homeContainer}>
                    <Text style={{ color: 'white', textAlign: 'center', flex: 1, fontSize: 20, fontWeight: 'bold' }}>Change password</Text>
                </View>

                <View style={[styles.information]}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.label}>Password</Text>
                        <MyTextInput
                            placeholder='Password'
                            placeholderTextColor="gray"
                            onChangeText={(text) => handleChange('oldPassword', text)}
                            value={values.username}
                            secureTextEntry={true}
                        />
                        <Text style={styles.label}>New password</Text>
                        <MyTextInput
                            placeholder='New password'
                            placeholderTextColor="gray"
                            onChangeText={(text) => handleChange('newPassword', text)}
                            value={values.username}
                            secureTextEntry={true}
                        />
                        <Text style={styles.label}>Renew password</Text>
                        <MyTextInput
                            placeholder='Renew password'
                            placeholderTextColor="gray"
                            onChangeText={(text) => handleChange('reNewPassword', text)}
                            value={values.username}
                            secureTextEntry={true}
                        />
                        <View style={{ paddingBottom: 100 }} />
                    </View>
                </View>
            </ScrollView>
            {isLoading ?
                <View style={styles.buyButton}>
                    <ActivityIndicator size='large' color={'white'} />
                </View>
                :
                <TouchableOpacity
                    style={styles.buyButton}
                    onPress={() => {
                        handleSubmitChangePassword()
                    }}
                >
                    <Text style={styles.buyButtonText}>Save</Text>
                </TouchableOpacity>
            }
        </View>
    );
}

const MyTextInput = ({ ...props }) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput {...props} style={styles.input} />
        </View>
    )
}

const styles = StyleSheet.create({
    textContainer: {
        alignItems: 'center',
    },
    email: {
        padding: 10,
        fontWeight: 'bold',
        color: 'white',
        fontSize: 15,
    },
    informationLogo: {
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
    homeContainer: {
        padding: 15,
        paddingTop: 60,
        justifyContent: "space-between",
        alignContent: 'center',
        color: 'white',
        overflowY: 'scroll',
        backgroundColor: 'black',
        flexDirection: 'row'
    },
    information: {
        padding: 15,
        backgroundColor: 'black',
    },
    label: {
        color: 'white',
        fontSize: 15,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    inputContainer: {
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        marginBottom: 20,
        marginHorizontal: 10
    },
    input: {
        color: 'white',
        fontSize: 16,
        paddingVertical: 5,
    },
    picker: {
        color: 'blue',
        backgroundColor: 'black',
        borderBottomWidth: 1,
        marginBottom: 20,
    },
    select: {
        position: 'absolute',
        bottom: 100
    }
});

export default ChangePassword;
