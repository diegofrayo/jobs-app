import { NativeModules, Platform } from 'react-native';

import App from './src/screens';

if (__DEV__ && Platform.OS === 'ios') {
  NativeModules.DevSettings.setIsDebuggingRemotely(true);
}

export default App;
