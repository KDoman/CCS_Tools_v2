import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "./styles/global.css";
import "./styles/colors.css";
import { NextUIProvider } from "@nextui-org/react";
import { Measurements } from "./views/Measurements.jsx";
import { IconAndThumbnail } from "./views/IconAndThumbnail.jsx";
import { JpgToPng } from "./views/JpgToPng.jsx";
import { Ghost } from "./views/Ghost.jsx";
import { StaticView } from "./components/StaticView.jsx";
import { HomePage } from "./views/HomePage.jsx";
import { TransformImporter } from "./views/TransformImporter.jsx";
import { SiloshotGenerator } from "./views/SiloshotGenerator.jsx";
import { ChoicesScrapper } from "./views/ChoicesScrapper.jsx";
import { KravetSiloshot } from "./views/KravetSiloshot.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StaticView />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "Measurements", element: <Measurements /> },
      { path: "Icon_&_thumbnail", element: <IconAndThumbnail /> },
      { path: "Jpg_to_png", element: <JpgToPng /> },
      { path: "Ghost", element: <Ghost /> },
      { path: "Transform_importer", element: <TransformImporter /> },
      { path: "Siloshot_generator", element: <SiloshotGenerator /> },
      { path: "Choices_scrapper", element: <ChoicesScrapper /> },
      { path: "Siloshot_kravet_generator", element: <KravetSiloshot /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </React.StrictMode>
);
