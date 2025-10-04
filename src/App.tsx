import { Authenticated, Refine, CanAccess } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import routerProvider, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import "./App.css";
import authProvider from "./authProvider";
import { accessControlProvider } from "./accessControlProvider";
import { PendingApproval } from "@/components/refine-ui/layout/pending-approval";
import { ErrorComponent } from "./components/refine-ui/layout/error-component";
import { Layout } from "./components/refine-ui/layout/layout";
import { Toaster } from "./components/refine-ui/notification/toaster";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
import {
  ArchiveCreate,
  ArchiveEdit,
  ArchiveList,
  ArchiveShow,
} from "./pages/archive";
import {
  FilmCreate,
  FilmEdit,
  FilmList,
  FilmShow,
} from "./pages/film";
import { ForgotPassword } from "./pages/forgot-password";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { supabaseClient } from "./utility";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ThemeProvider>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider(supabaseClient)}
              liveProvider={liveProvider(supabaseClient)}
              authProvider={authProvider}
              accessControlProvider={accessControlProvider}
              routerProvider={routerProvider}
              notificationProvider={useNotificationProvider()}
              resources={[
                {
                  name: "archive",
                  list: "/archive",
                  create: "/archive/create",
                  edit: "/archive/edit/:id",
                  show: "/archive/show/:id",
                  meta: {
                    canDelete: true,
                  },
                },
                {
                  name: "film",
                  list: "/film",
                  create: "/film/create",
                  edit: "/film/edit/:id",
                  show: "/film/show/:id",
                  meta: {
                    canDelete: true,
                  },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "FwcHda-sGwijK-lfKUdS",
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-inner"
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      <CanAccess resource="app" action="enter" fallback={<PendingApproval />}>
                        <Layout>
                          <Outlet />
                        </Layout>
                      </CanAccess>
                    </Authenticated>
                  }
                >
                  <Route
                    index
                    element={<NavigateToResource resource="archive" />}
                  />
                  <Route path="/archive">
                    <Route index element={<ArchiveList />} />
                    <Route path="create" element={<ArchiveCreate />} />
                    <Route path="edit/:id" element={<ArchiveEdit />} />
                    <Route path="show/:id" element={<ArchiveShow />} />
                  </Route>
                  <Route path="/film">
                    <Route index element={<FilmList />} />
                    <Route path="create" element={<FilmCreate />} />
                    <Route path="edit/:id" element={<FilmEdit />} />
                    <Route path="show/:id" element={<FilmShow />} />
                  </Route>
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-outer"
                      fallback={<Outlet />}
                    >
                      <NavigateToResource />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                </Route>
              </Routes>

              <Toaster />
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </ThemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
