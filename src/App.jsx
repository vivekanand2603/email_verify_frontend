import React from "react";
import Home from "./pages/Home";
import SideBar from "./SideBar";
import UploadList from "./pages/UploadList";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <SideBar SideComponent={Home} />,
  },
  {
    path: "/upload-lists",
    element: <SideBar SideComponent={UploadList} />,
  }
]);
export default function App() {
  return (
    <div className="text-zinc-950 antialiased lg:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950 light">
    <RouterProvider router={router} />
    </div>
  );
}