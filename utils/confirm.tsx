import { Alert } from "react-native";

export const confirm = ({
  message,
  onCancel,
  cancelText = "Cancel",
  confirmText = "Confirm",
  onConfirm,
}: {
  message: string;
  cancelText?: string;
  confirmText?: string;
  onCancel?: () => void;
  onConfirm: () => void;
}) => {
  Alert.alert(message, "", [
    {
      text: cancelText,
      style: "cancel",
      onPress: onCancel,
    },
    {
      text: confirmText,
      onPress: onConfirm,
    },
  ]);
};
