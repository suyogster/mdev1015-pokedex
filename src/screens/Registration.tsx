/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../theme/theme';
import AuthHeader from '../components/AuthHeader';
import CustomTextInput from '../components/CustomTextInput';
import {signUp} from '../controller/authController';

interface RegistrationScreenProps {
  navigation: any;
}

export default function Registration(props: RegistrationScreenProps) {
  const {navigation} = props;

  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    try {
      signUp(email, password);
      navigation.navigate('Login');
      Alert.alert(
        'Congratulations!',
        'User has successfully registered ! Please Login !',
      );
    } catch (error) {
      console.log('Error while signing up::>>>', error);
      Alert.alert('Sorry!', 'There was a problem in registration !');
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <AuthHeader />

      <View style={{flex: 1 / 2}}>
        <CustomTextInput
          label={'Username'}
          value={username}
          onChange={setUserName}
        />
        <CustomTextInput label={'Email'} value={email} onChange={setEmail} />
        <CustomTextInput
          label={'Password'}
          value={password}
          onChange={setPassword}
          secureTextEntry
        />
        <CustomTextInput
          label={'Confirm Password'}
          value={confirmPassword}
          onChange={setConfirmPassword}
          secureTextEntry
        />

        <View style={{marginVertical: 50}}>
          <TouchableOpacity style={style.button} onPress={() => handleSignUp()}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 16,
                color: 'white',
              }}>
              REGISTER
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              textAlign: 'center',
              marginTop: 24,
              fontWeight: '400',
              fontSize: 13,
            }}>
            Already a trainer?{' '}
            <Text
              onPress={() => navigation.navigate('Login')}
              style={{
                textDecorationLine: 'underline',
                color: colors.primary,
                fontWeight: 'bold',
              }}>
              Signin
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
