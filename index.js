/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Firebase} from '@react-native-firebase/app';
import {firebaseConfig} from './firebaseConfig';

Firebase.initializeApp(firebaseConfig);

AppRegistry.registerComponent(appName, () => App);
