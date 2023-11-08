import { createContext, useContext, useState } from "react";
import supabase from "../../../supabase";
import Landing from "../components/LandingPage";
import Header from "../components/Header";

const AuthContext = createContext({});

export const AuthContextProvider = async ({ children, switchTheme, label }) => {
  const [user, setUser] = useState(null);

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    user ? setUser(user) : "";
  } catch (error) {
    console.log(error);
  }

  return (
    <AuthContext.Provider value={{ user }}>
      <Header switchTheme={switchTheme} label={label} user={user} />
      {user ? children : <Landing />}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const { user, signout } = useContext(AuthContext);
  return { user, signout };
};
