import React from "react";
import Loadable from "react-loadable";

import DefaultLayout from "./containers/DefaultLayout";

function Loading() {
  return <div>Loading...</div>;
}

const Dashboard = Loadable({
  loader: () => import("./views/Dashboard"),
  loading: Loading
});

const AdminMember = Loadable({
  loader: () => import("./views/Member/Admin"),
  loading: Loading
});

const OwnerMember = Loadable({
  loader: () => import("./views/Member/Owner"),
  loading: Loading
});

const UserMember = Loadable({
  loader: () => import("./views/Member/User"),
  loading: Loading
});

const BusinessRequest = Loadable({
  loader: () => import("./views/Business/Request"),
  loading: Loading
});

const BusinessRequestLog = Loadable({
  loader: () => import("./views/Business/RequestLog"),
  loading: Loading
});

const BusinessShopList = Loadable({
  loader: () => import("./views/Business/ShopList"),
  loading: Loading
});

const BusinessServiceRequest = Loadable({
  loader: () => import("./views/Business/ServiceRequest"),
  loading: Loading
});

const CrawlerDashbaord = Loadable({
  loader: () => import("./views/Crawler/Dashboard"),
  loading: Loading
});

const CrawlerConfig = Loadable({
  loader: () => import("./views/Crawler/Config"),
  loading: Loading
});

const CrawlerContents = Loadable({
  loader: () => import("./views/Crawler/Contents"),
  loading: Loading
});

const CrawlerShops = Loadable({
  loader: () => import("./views/Crawler/Shop"),
  loading: Loading
});

const Keyword = Loadable({
  loader: () => import("./views/Crawler/Keyword"),
  loading: Loading
});

const Working = Loadable({
  loader: () => import("./views/Crawler/Working"),
  loading: Loading
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Home", component: DefaultLayout },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },

  { path: "/member/admin/:page?", name: "Admin Member", component: AdminMember },
  { path: "/member/owner/:page?", name: "Owner Member", component: OwnerMember },
  { path: "/member/user/:page?", name: "User Member", component: UserMember },

  { path: "/business/request/log/:page?", name: "Business Request Log", component: BusinessRequestLog },
  { path: "/business/request/:page?", name: "Business Request", component: BusinessRequest },
  { path: "/business/shop/:page?/:mode?/:keyword?", name: "Business Shop List", component: BusinessShopList },
  { path: "/business/shop/:page?", name: "Business Shop List", component: BusinessShopList },
  { path: "/business/service/:page?", name: "Business Service Request List", component: BusinessServiceRequest },

  { path: "/crawler/dashboard", exact: true, name: "Crawler Dashboard", component: CrawlerDashbaord },
  { path: "/crawler/config", exact: true, name: "Crawler Configuration", component: CrawlerConfig },
  { path: "/crawler/contents/:page?", exact: true, name: "Crawler Contents", component: CrawlerContents },
  { path: "/crawler/shops/:page?", exact: true, name: "Crawler Shops", component: CrawlerShops },
  { path: "/crawler/keywords/:page?", exact: true, name: "Crawler Keyword", component: Keyword },
  { path: "/crawler/working/:page?", exact: true, name: "Crawler Working", component: Working }
];

export default routes;
