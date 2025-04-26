import IRoutes from "./IRoutes";

const routesDash: IRoutes[] = [
  {
    path: "/dashboard",
    component: ()=>(<></>),
    visibleInDisplay: false,
    displayName: "Home",
    protected: true,
    adminOnly: true,
  },
];

export default routesDash;
