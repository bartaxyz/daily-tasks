import CheckBox from "expo-checkbox";
import { useState } from "react";

export const Task: React.FC = () => {
  const [checked, setChecked] = useState(false);

  const onChangeHandler = () => {
    setChecked(!checked);
  };

  return <CheckBox value={checked} onChange={onChangeHandler} onValueChange={onChangeHandler} />;
};
