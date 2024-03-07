import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { LinksFunction } from "@remix-run/node";

import rdtStylesheet from "remix-development-tools/index.css?url";

export const links: LinksFunction = () => [
  // export the stylesheet in development only
  ...(process.env.NODE_ENV === "development"
    ? [{ rel: "stylesheet", href: rdtStylesheet }]
    : []),
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function App() {
  return <Outlet />;
}

let AppExport = App;

if (process.env.NODE_ENV === "development") {
  const { withDevTools } = await import("remix-development-tools");
  AppExport = withDevTools(AppExport);
}

export default AppExport;
