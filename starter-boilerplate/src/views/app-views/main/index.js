import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import CatalogProducts from "./CatalogProducts";
import CatalogCategories from "./CatalogCategories";
import CatalogCollections from "./CatalogCollections";
import CatalogCombo from "./CatalogCombo";
import Orders from "./Orders";
import ClientList from "./ClientList";
import ClientGroups from "./ClientGroups";
import EditProfile from "./EditProfile";
import Banners from "./Banners";
import Promo from "./Promo";
import OfflineAddresses from "./OfflineAddresses";
import OfflineGeozones from "./OfflineGeozones";
import Employees from "./Employees";
import Spam from "./Spam";

const MainViews = () => {
  return (
    <Switch>
      <Route path="/app/main/dashboards" component={Dashboard} />
      <Route path="/app/main/catalog/products" component={CatalogProducts} />
      <Route path="/app/main/catalog/categories" component={CatalogCategories} />
      <Route path="/app/main/catalog/collections" component={CatalogCollections} />
      <Route path="/app/main/catalog/combo" component={CatalogCombo} />
      <Route path="/app/main/orders" component={Orders} />
      <Route path="/app/main/clients/list" component={ClientList} />
      <Route path="/app/main/clients/groups" component={ClientGroups} />
      <Route path="/app/main/clients/edit/:id" component={EditProfile} />
      <Route path="/app/main/banners" component={Banners} />
      <Route path="/app/main/promo" component={Promo} />
      <Route path="/app/main/offline/addresses" component={OfflineAddresses} />
      <Route path="/app/main/offline/geozones" component={OfflineGeozones} />
      <Route path="/app/main/employees" component={Employees} />
      <Route path="/app/main/spam" component={Spam} />
    </Switch>
  );
};

export default MainViews;
