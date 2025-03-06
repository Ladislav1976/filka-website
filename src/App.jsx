
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import Foods from "./components/Foods";
import FoodsLayout from "./page/FoodsLayout";
import AdminLayout from "./page/AdminLayout";
import NewFood from "./components/NewFood";
import EditFood from "./components/EditFood";
import ViewFood from "./components/ViewFood";
import SubmitFood from "./components/SubmitFood";
import Reset from "./page/Reset";
import Reset_password from "./page/Resetpassword";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import RequireAuth from "./components/RequireAuth";
import RequireAuthUserEdit from "./components/RequireAuthUserEdit";
import PersistLogin from "./page/PersistLogin";
import Layout from "./page/Layout";
import Layout2 from "./page/Layout2";
import RegisterNewAccount from "./page/Registernewaccount";
import Login from "./page/Login";
import Unauthorized from "./page/Unauthorized";
import Admin from "./page/Admin";




function App() {

  const ROLES = {
    User_edit: "User_edit",
    Editor: "Editor",
    Admin: "Admin",
    User_readOnly: "User_readOnly",
  }


  return (
    <>


      {/* Un-Protected  */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />

          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="reset" element={<Reset />} />
          <Route path="reset_password/:token/" element={<Reset_password />} />

          {/* Protected  */}
          <Route element={<PersistLogin />}>
            <Route element={<Layout2 />}>
              <Route element={<RequireAuth allowedRoles={[ROLES.User_edit, ROLES.User_readOnly, ROLES.Editor, ROLES.Admin]} />}>
                <Route path="/" element={<Home />}></Route>
                <Route path="/recepty" element={<FoodsLayout />}>
                  <Route index element={<Foods />}></Route>
                  <Route path=":id/" element={< ViewFood />}></Route>
                  <Route path=":id/email" element={<SubmitFood />}></Route>
                  <Route path="novy_recept/" element={<NewFood />}></Route>
                  <Route path="search/:search/" element={<Foods />}></Route>
                  <Route element={<RequireAuthUserEdit allowedRoles={[ROLES.User_edit, ROLES.Editor, ROLES.Admin]} />}>
                    <Route path="/recepty/:id/edit" element={< EditFood />}></Route>
                  </Route>

                </Route>
              </Route>
              <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                <Route path="/admin" element={<AdminLayout />} >
                  <Route path="users" element={<Admin />} />
                  <Route path="register" element={<RegisterNewAccount />} />
                </Route>
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>


      </Routes>
    </>
  );
}

export default App;
