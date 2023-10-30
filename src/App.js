import { Routes } from "react-router";
import { Route } from "react-router";
import ResponsiveDrawerAdmin from "./Admin/UserNav";
import ResponsiveDrawer from "./User/UserNav";
import LoginForm from "./LoginForm";
function App() {
  return (
    <div className="App"  style={{textAlign:"center"}}>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <ResponsiveDrawerAdmin
              // setshowform={setshowform}
              // unsetshowform={unsetshowform}
            />
          }
        />
        <Route
          path="/login"
          element={
            <LoginForm
              // open={loginOpen}
              // onClose={handleLoginClose}
              // onLogin={handleLogin}
              admin={false}
            />
          }
        />
        <Route
          path="/*"
          element={
            <ResponsiveDrawer
              // setshowform={setshowform}
              // unsetshowform={unsetshowform}
              // updateuserdata={updateuserdata}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
