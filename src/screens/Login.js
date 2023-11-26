import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    Text,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik'
import { Octicons, Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CommonActions } from '@react-navigation/native';
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
import { fetchUserDetails } from '../apis/index'
const { brand, darkLight, primary } = Colors
const Login = ({ navigation, handleSetLogged }) => {
    const [hidePassword, setHidePassword] = useState(true)
    const [message, setMessage] = useState()
    const [messageType, setMessageType] = useState()
    const handleLogin = async (values, setSubmitting) => {
        fetchUserDetails(values.email, values.password)
            .then(result => {
                setSubmitting(false)
                if (result === 'Email does not exist') {
                    setMessage(result)
                    setMessageType(type)
                } else if (result === 'incorrect password') {
                    setMessage(result)
                    setMessageType(type)
                } else {
                    try {
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
                        );
                    } catch (error) {
                        console.error('Lỗi khi lưu trữ:', error);
                    }
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
                <SubTitle>Account Login</SubTitle>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={(values, { setSubmitting }) => {
                        if (values.email === '' || values.password === '') {
                            handleMessage('Please fill all the fields')
                            setSubmitting(false)
                        } else {
                            handleLogin(values, setSubmitting)
                        }
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
                        <StyledFormArea>
                            <MyTextInput
                                label='Email'
                                icon='mail'
                                placeholder='Email'
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

                            <MsgBox type={messageType}>
                                {message}
                            </MsgBox>
                            {!isSubmitting && <StyledButton onPress={handleSubmit}>
                                <ButtonText>
                                    Login
                                </ButtonText>
                            </StyledButton>}
                            {isSubmitting && <StyledButton disabled={true}>
                                <ActivityIndicator size='large' color={'white'} />
                            </StyledButton>}
                            <Line />
                            <ExtraView>
                                <Text style={{ color: 'white' }}> Don't have an account already?</Text>
                                <TextLink onPress={() => navigation.navigate('Signup')}>
                                    <TextLinkContent>
                                        Signup
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

export default Login;
