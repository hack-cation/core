# .hack//voter

use node v22.14.0

borrowed from [react router template](https://github.com/remix-run/react-router-templates/blob/main/default/README.md)

## development steps

```bash
## initiate local development server and watch changes
npm run dev
## deploys http://localhost:5173/
```

## production deployment step

deployment is based on two npm scripts:

```bash
## build scripts for node server to do SSR
npm run build

## run node server based on the build/ output
npm run start
## deploys http://localhost:3000/
```
