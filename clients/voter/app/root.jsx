import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

import './app.css';
import FourOFour from './404';

export const links = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap'
  }
];

export function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
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

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }) {
  let message = 'OH NO';
  let details = 'unexpected!';
  let stack;

  if (isRouteErrorResponse(error)) {
    details = error.status === 404 ? 'no found' : error.statusText || details;
    message = error.status || 'Error';
    stack = error.stack;
  }

  return (
    <main>
      <FourOFour />
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && <code>{stack}</code>}
    </main>
  );
}
