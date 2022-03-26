import { useEffect, useState } from "react";
import { getAuth, User } from "firebase/auth";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(getAuth().currentUser);

  const logOut = () => {
    getAuth().signOut();
  }

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { user, logOut };
};
