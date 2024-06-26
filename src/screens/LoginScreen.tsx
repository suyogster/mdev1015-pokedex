/* eslint-disable react-native/no-inline-styles */
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/theme';
import AuthHeader from '../components/AuthHeader';
import CustomTextInput from '../components/CustomTextInput';
import { signIn } from '../controller/authController';
import { useUser } from '../context/UserContext';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

interface LoginScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

export default function LoginScreen(props: LoginScreenProps) {
  const { navigation } = props;

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { setUserId } = useUser();

  const handleLogin = async () => {
    console.log('Check the login credentials::>>', email, password);
    try {
      const uid = await signIn(email, password);
      setUserId(uid);
      navigation.navigate('Onboard');
    } catch (error) {
      Alert.alert('Invalid Credentials');
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <AuthHeader />

      <View style={{ flex: 1 / 2 }}>
        <CustomTextInput label={'Username'} onChange={setEmail} />
        <CustomTextInput
          label={'Password'}
          onChange={setPassword}
          secureTextEntry={true}
        />

        <View style={{ marginVertical: 50 }}>
          <TouchableOpacity style={style.button} onPress={handleLogin}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 16,
                color: 'white',
              }}
            >
              LOGIN
            </Text>
          </TouchableOpacity>
          <Text
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
          </Text>
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
