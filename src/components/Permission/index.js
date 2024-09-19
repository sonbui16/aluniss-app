import { PermissionsAndroid, ToastAndroid } from "react-native";

export async function requestStoragePermission(callback) {
  try {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      callback && callback();
    } else {
      ToastAndroid.show('Ứng dụng cần quyền truy cập file để lưu ảnh!', ToastAndroid.LONG)
    }
  } catch (err) {
    console.warn(err);
  }
}
export async function requestLocationPermission(callback) {
  try {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      callback && callback();
    } else {
      ToastAndroid.show('Ứng dụng cần quyền truy cập vị trí của bạn!', ToastAndroid.LONG)
    }
  } catch (err) {
    console.warn(err);
  }
}
