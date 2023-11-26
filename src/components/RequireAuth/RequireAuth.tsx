export default null;

// import React, { FC, useContext } from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import { Context } from "../..";

// export interface Props {
//   children: JSX.Element;
// }

// export const RequireAuth: FC<Props> = (props: Props) => {
//   const location = useLocation();
//   const { store } = useContext(Context);

//   if (!store.isAuth) {
//     return <Navigate to="/Login" state={{ from: location }} />;
//   }
//   return props.children;
// };
