import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyCode from "../pages/VerifyCode";
import SetNewPassword from "../pages/SetNewPassword";
import SuccessMessage from "../pages/SuccessMessage";
import { routeGenerator } from "../utils/routeGenerator";
import { personPaths } from "./person.routes";
import MyProfile from "../pages/user/MyProfile";
import CompanyFolderOderView from "../pages/user/CompanyFolderOderView";
import Register from "../pages/Register";
import ActivatedUser from "../pages/ActivatedUser";
import EmailScreenPage from "../pages/user/EmailScreenPage";
import MessagePage from "../pages/user/MessagePage";
import SubscriptionPlan from "../pages/user/SubscriptionPlan";
import AllOrders from "../pages/user/AllOrders";
import NotFoundPage from "../pages/user/NotFoundPage";
import SubscriptionPage from "../pages/user/SubscriptionPage";
import MySubscription from "../pages/user/MySubscription";
import PaymentDetails from "../pages/user/PaymentDetails";
import OrderHistory from "../pages/user/OrderHistory";
import IndividualOrderEditBeforeLoading from "../pages/user/IndividualOrder/IndividualOrderEditBeforeLoading";
import IndividualOrderDuplicateBeforeLoading from "../pages/user/IndividualOrder/IndividualOrderDuplicateBeforeLoading";
import IndustryOrderDuplicateBeforeLoading from "../pages/user/industryOrder/IndustryOrderDuplicateBeforeLoading";
import IndustryOrderEditBeforeLoading from "../pages/user/industryOrder/IndustryOrderEditBeforeLoading";
import CreateIndividualOrderBeforeLoading from "../pages/user/IndividualOrder/CreateIndividualOrderBeforeLoading";
import CreateIndustryOrderOrderBeforeLoading from "../pages/user/industryOrder/CreateIndustryOrderOrderBeforeLoading";
import CreateIndividualOrderBeforeLoader from "../pages/user/IndividualOrder/CreateIndividualOrderBeforeLoader";
import CreateIndustryOrderWithCustomBeforeLoading from "../pages/user/industryOrder/CreateIndustryOrderWithCustomBeforeLoading";
import IndividualOrderDetailsBeforeLoading from "../pages/user/customers/IndividualOrderDetailsBeforeLoading";
import IndustryOrderDetailsBeforeLoading from "../pages/user/customers/IndustryOrderDetailsBeforeLoading";

const routes = createBrowserRouter([
  {
    path: "/",
    // element: <App />,
    element: <Navigate to="/admin/dashboard" replace />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },

  {
    path: "/admin",
    element: <App />,
    // children:routeGenerator(personPaths)
    children: [
      ...routeGenerator(personPaths),
      {
        path: "all-orders/:orderName",
        element: <AllOrders />,
      },
      {
        path: "edit-order/:id",
        element: <IndividualOrderEditBeforeLoading />,
      },
      {
        path: "duplicate-order/:id",
        element: <IndividualOrderDuplicateBeforeLoading />,
      },
      {
        path: "edit-industry-order/:id",
        element: <IndustryOrderEditBeforeLoading />,
      },
      {
        path: "duplicate-industry-order/:id",
        element: <IndustryOrderDuplicateBeforeLoading />,
      },
      {
        path: "order-details/:id",
        element: <IndividualOrderDetailsBeforeLoading />,
      },
      {
        path: "order-detail/:id",
        element: <IndustryOrderDetailsBeforeLoading />,
      },
      {
        path: "order-history/:id",
        element: <OrderHistory />,
      },
      {
        path: "order-list-view/:folderName",
        element: <CompanyFolderOderView />,
      },
      {
        path: "my-profile",
        element: <MyProfile />,
        //   children:[
        //     {
        //   path: "account-setting",
        //   element: <AccountSettings />,
        // },
        //   ]
      },

      {
        path: "subscription",
        element: <SubscriptionPage />,
      },
      {
        path: "subscription-plan",
        element: <SubscriptionPlan />,
      },

      {
        path: "my-subscription",
        element: <MySubscription />,
      },
      {
        path: "payment-details",
        element: <PaymentDetails />,
      },

      {
        path: "company-new-order",
        element: <CreateIndustryOrderOrderBeforeLoading />,
      },
      {
        path: "indivisual-new-order",
        element: <CreateIndividualOrderBeforeLoading />,
      },
      {
        path: "individual-order/:id",
        element: <CreateIndividualOrderBeforeLoader />,
      },
      {
        path: "company-new-order/:id",
        element: <CreateIndustryOrderWithCustomBeforeLoading />,
      },

      {
        path: "message-page",
        element: <MessagePage />,
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/sign-up",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/verify-code",
    element: <VerifyCode />,
  },
  {
    path: "/new-password",
    element: <SetNewPassword />,
  },
  {
    path: "/success",
    element: <SuccessMessage />,
  },
  {
    path: "/verify-account",
    element: <EmailScreenPage />,
  },
  {
    path: "/activate/:token",
    element: <ActivatedUser />,
  },
]);

export default routes;
