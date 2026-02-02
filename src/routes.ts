import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "./pages/Home";
import About from "./pages/About";
import Locations from "./pages/Locations";
import Cart from "./pages/Cart";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "locations", Component: Locations },
      { path: "cart", Component: Cart },
    ],
  },
], {
  basename: import.meta.env.PROD ? "/CRUNCHBURGERS" : "/",
});
