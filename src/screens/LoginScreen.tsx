/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../theme/theme';
import AuthHeader from '../components/AuthHeader';
import CustomTextInput from '../components/CustomTextInput';
import {signIn} from '../controller/authController';

interface LoginScreenProps {
  navigation: any;
}

export default function LoginScreen(props: LoginScreenProps) {
  const {navigation} = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      signIn(email, password);
      navigation.navigate('Onboard');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <AuthHeader />

      <View style={{flex: 1 / 2}}>
        <CustomTextInput label={'Username'} onChange={() => setEmail} />
        <CustomTextInput
          label={'Password'}
          onChange={() => setPassword}
          secureTextEntry={true}
        />

        <View style={{marginVertical: 50}}>
          <TouchableOpacity style={style.button} onPress={() => handleLogin()}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 16,
                color: 'white',
              }}>
              LOGIN
            </Text>
          </TouchableOpacity>
          {/*<Text
            style={{
              textAlign: 'center',
              marginTop: 24,
              fontWeight: '400',
              fontSize: 13,
            }}
          >
            Are you a new trainer?{' '}
            <Text
              onPress={() => navigation.navigate('Registration')}
              style={{
                textDecorationLine: 'underline',
                color: colors.primary,
                fontWeight: 'bold',
              }}
            >
              Register
            </Text>
          </Text>*/}
        </View>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '',
    alignItems: 'center',
    marginVertical: 50,
  },

  button: {
    backgroundColor: colors.button,
    borderRadius: 20,
    height: 50,
    minWidth: '80%',
    justifyContent: 'center',
  },
});
