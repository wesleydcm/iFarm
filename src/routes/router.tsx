import { Route, Switch } from "react-router";
import LoginPage from "../pages/login/";
import TestsPage from "../pages/testsPage";
import ProductPage from "../pages/productPage";
import ProfilePage from "../pages/myprofile";
import Home from "../pages/Home";
import MenuMobile from "../Components/Menu/mobile";
import MenuDesktop from "../Components/Menu/desktop";
import { useWindow } from "../Providers/window";
import { useLocation } from "react-router";
import { WINDOW_SIZE_DESKTOP } from "../utils";

const RouterComponent = () => {
  const { pageWidth } = useWindow();
  const { pathname } = useLocation();
  return (
    <>
      {!["/login", "/register"].includes(pathname) &&
        (pageWidth > WINDOW_SIZE_DESKTOP ? <MenuDesktop /> : <MenuMobile />)}

      <Switch>
        <Route exact path="/" component={TestsPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/product/:id" component={ProductPage} />

        <Route exact path="/register">
          <div>Register</div>
        </Route>

        <Route path="/myCart">
          <div>My Cart</div>
        </Route>

        <Route path="/checkout">
          <div>Checkout</div>
        </Route>

        <Route exact path="/myAccount">
          <div>My Account</div>
        </Route>

        <Route exact path="/myAccount/profile" component={ProfilePage} />

        <Route path="/myAccount/edit">
          <div>Edit Profile</div>
        </Route>

        <Route path="/myAccount/history">
          <div>My Purchase History</div>
        </Route>

        <Route path="/myAccount/products">
          <div>Register Products</div>
        </Route>

        <Route path="/myAccount/profile/product">
          <div>Update Product</div>
        </Route>

        <Route path="/product">
          <div>Product</div>
        </Route>

        <Route path="/ownerProfile/:id">
          <div>Owner Profile</div>
        </Route>
      </Switch>
    </>
  );
};

export default RouterComponent;
