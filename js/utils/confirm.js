import { Alert } from 'react-native';

export type ConfirmOptions = {
  okLabel: string,
  cancelLabel: string
};

export default function confirm(
  title: string,
  message: string,
  { okLabel = 'OK', cancelLabel = 'Annuler' }: ConfirmOptions = {}
): Promise {
  return new Promise((resolve, reject) => {
    Alert.alert(title, message, [
      {
        text: okLabel,
        onPress: resolve
      },
      {
        text: cancelLabel,
        style: 'cancel',
        onPress: reject
      }
    ]);
  });
}
