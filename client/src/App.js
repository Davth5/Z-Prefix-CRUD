import React, { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import UserInventory from "./components/UserInventory";
import { UserProvider } from "./components/UserContext";

function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("login"); // either "login" or "register"

  return (
    <UserProvider value={{ user, setUser }}>
      {!user ? (
        <div>
          {view === "login" ? (
            <>
              <Login onUserLoggedIn={setUser} />
              <button onClick={() => setView("register")}>
                Register instead
              </button>
            </>
          ) : (
            <>
              <Register onUserRegistered={setUser} />
              <button onClick={() => setView("login")}>Login instead</button>
            </>
          )}
        </div>
      ) : (
        <UserInventory userId={user.id} />
      )}
    </UserProvider>
  );
}

export default App;
