// prettier-ignore
import { NativeModules } from 'react-native';

const DemoModule = NativeModules.DemoModule;

export function getCurrentLocation() {
  return DemoModule.getCurrentLocation();
}
