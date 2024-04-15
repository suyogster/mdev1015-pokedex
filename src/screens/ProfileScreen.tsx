/* eslint-disable react-native/no-inline-styles */
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { colors } from '../theme/theme';
import { user1 } from '../data/mockedUser';
import { useUser } from '../context/UserContext';
import auth from '@react-native-firebase/auth';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { logout } from '../controller/authController';

const SettingList = [
  // {
  //   icon: require('../../assets/Profile_Transparent_Icon.png'),
  //   title: 'Edit Profile',
  // },
  {
    icon: require('../../assets/Heart_Transparent_Icon.png'),
    title: 'Favorite Pokemon',
  },
  {
    icon: require('../../assets/LockIcon.png'),
    title: 'Logout',
  },
];

interface ProfileScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
  const { currentUser, userId, fetchCurrentUser } = useUser();

  useEffect(() => {
    const fetchUser = async () => {
      console.log('Fetching user');
      if (userId) {
        // Check if userId is not null or undefined
        try {
          await fetchCurrentUser(userId);
          console.log('after fetch', currentUser);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          // Handle the error (e.g., set error state, show notification)
        }
      }
    };
    fetchUser();
  }, [userId]);

  const handleNavigation = async (index: number) => {
    if (index === 0) {
      navigation.navigate('Favorite');
    } else if (index === 1) {
      await logout();
      navigation.navigate('Login');
    }
  };
  return (
    <View style={styles.container}>
      <Image
        style={{ top: 50, zIndex: 2 }}
        source={require('../../assets/UserProfile.png')}
      />
      <View style={styles.outerLayer}>
        <Text
          style={{
            textAlign: 'center',
            color: '#495767',
            fontWeight: '500',
            fontSize: 18,
            paddingBottom: 10,
          }}
        >
          {currentUser?.username}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: '#495767',
            fontWeight: '500',
            fontSize: 18,
            paddingBottom: 10,
          }}
        >
          {currentUser?.email}
        </Text>
        <View style={styles.innerLayer}>
          {SettingList.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.settingList}
              onPress={() => handleNavigation(index)}
            >
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <Image source={item.icon} style={{}} />
                <Text
                  style={{
                    marginLeft: 15,
                    color: '#495767',
                    fontWeight: '600',
                  }}
                >
                  {item.title}
                </Text>
              </View>

              <Image
                style={{ tintColor: 'gray' }}
                source={require('../../assets/Right_Icon.png')}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
  },
  outerLayer: {
    flex: 1 / 2,
    backgroundColor: colors.primary,
    borderRadius: 16,
    width: '95%',
    height: '40%',
    paddingTop: 70,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  innerLayer: {
    flex: 1,
    backgroundColor: '#FBDD6E',
    borderRadius: 16,
    paddingTop: 30,
    paddingHorizontal: 15,
    width: '100%',
  },
  settingList: {
    flex: 1 / 2,
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'space-between',
  },
});
