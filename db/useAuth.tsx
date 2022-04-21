import { useEffect, useState } from "react";
import { getAuth, User } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(getAuth().currentUser);
  const [isUserLoaded, setIsUserLoaded] = useState(!!user);
  const navigation = useNavigation();

  const logOut = () => {
    getAuth().signOut();

    navigation.navigate("Login" as any);
  };

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      setUser(user);

      if (!isUserLoaded) {
        setIsUserLoaded(true);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { user, isUserLoaded, logOut };
};
