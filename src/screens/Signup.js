import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik'
import { Octicons, Ionicons } from '@expo/vector-icons'
import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    RightIcon,
    StyledInputLabel,
    StyledTextInput,
    StyledButton,
    ButtonText,
    Colors,
    MsgBox,
    Line,
    ExtraView,
    TextLink,
    TextLinkContent
} from '../components/styles'
import { createNewUsers } from '../apis/index'
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
const { brand, darkLight } = Colors
const Signup = ({ navigation, handleSetLogged }) => {
    const [hidePassword, setHidePassword] = useState(true)
    const [message, setMessage] = useState()
    const [messageType, setMessageType] = useState()

    const handleRegister = (values, setSubmitting) => {
        const date = new Date();
        const minutes = date.getMinutes();
        const hours = date.getHours();
        const time = `${hours}:${minutes}`;
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const today = `${year}-${month}-${day}`;
        const { rePassword, ...newData } = values
        const newDate = { ...newData, createdDate: today, lastLogin: { time: time, date: today } }
        createNewUsers(newDate)
            .then(result => {
                setSubmitting(false)
                if (result === 'Email already exists') {
                    setMessage(result)
                    setMessageType(type)
                } else {
                    AsyncStorage.setItem('token', result.token);
                    AsyncStorage.setItem('userInformation', JSON.stringify(result.user));
                    handleSetLogged(result)
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 1,
                            routes: [
                                { name: 'HomeDrawer' },
                            ],
                        })
                    )
                }
            })
            .catch(error => {
                console.log(error.response)
                setSubmitting(false)
            })
    }

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message)
        setMessageType(type)
    }
    return (
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageLogo resizeMode="cover" source={require('../../assets/logo-brand1.png')} />
                <PageTitle>KTech</PageTitle>
                <SubTitle>Account Signup</SubTitle>
                <Formik
                    initialValues={{ username: '', email: '', password: '', rePassword: '' }}
                    onSubmit={(values, { setSubmitting }) => {
                        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (values.email === '' || values.password === '' || values.username === '' || values.rePassword === '') {
                            handleMessage('Please fill all the fields')
                            setSubmitting(false)
                        } else if (values.password !== values.rePassword) {
                            handleMessage('Confirm password incorrect')
                            setSubmitting(false)
                        } else if (re.test(values.email) === false) {
                            handleMessage('Email incorrect format')
                            setSubmitting(false)
                        } else if (values.password.length < 8 || /[A-Z]/.test(values.password) === false) {
                            handleMessage('Password requires 8 characters or more and has capital letters')
                            setSubmitting(false)
                        } else {
                            handleRegister(values, setSubmitting)
                            handleMessage('Waiting....')
                        }
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <StyledFormArea>
                            <MyTextInput
                                label='Username'
                                icon='person'
                                placeholder='kass'
                                placeholderTextColor={'grey'}
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                            />
                            <MyTextInput
                                label='Email'
                                icon='mail'
                                placeholder='kass@gmail.com'
                                placeholderTextColor={'grey'}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                            <MyTextInput
                                label='Password'
                                icon='lock'
                                placeholder='*******'
                                placeholderTextColor={'grey'}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry={hidePassword}
                                isPassword={true}
                                hidePassword={hidePassword}
                                setHidePassword={setHidePassword}
                            />
                            <MyTextInput
                                label='Confirm Password'
                                icon='lock'
                                placeholder='*******'
                                placeholderTextColor={'grey'}
                                onChangeText={handleChange('rePassword')}
                                onBlur={handleBlur('rePassword')}
                                value={values.rePassword}
                                secureTextEntry={hidePassword}
                                isPassword={true}
                                hidePassword={hidePassword}
                                setHidePassword={setHidePassword}
                            />
                            <MsgBox type={messageType}>
                                {message}
                            </MsgBox>
                            <StyledButton onPress={handleSubmit}>
                                <ButtonText>
                                    Signup
                                </ButtonText>
                            </StyledButton>
                            <Line />
                            <ExtraView>
                                <Text style={{ color: 'white' }}> Already have an account?</Text>
                                <TextLink onPress={() => navigation.navigate('Login')}>
                                    <TextLinkContent>
                                        Sign in
                                    </TextLinkContent>
                                </TextLink>
                            </ExtraView>
                        </StyledFormArea>
                    )}
                </Formik>
            </InnerContainer>
        </StyledContainer>
    );
}

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={'white'} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    )
}

export default Signup;
