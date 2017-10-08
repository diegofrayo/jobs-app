import App from './src/screens';

import { NativeModules, Platform } from 'react-native';

if (__DEV__ && Platform.OS === 'ios') {
  NativeModules.DevSettings.setIsDebuggingRemotely(true);
}

export default App;
