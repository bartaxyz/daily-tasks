const nativeConfirm = window.confirm;

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
  if (nativeConfirm(message)) {
    console.log("REMOVING");
    onConfirm();
  } else {
    onCancel && onCancel();
  }
};
