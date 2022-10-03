# Warehouse Frontend

## Basic configuration

### Proxy configuration

In the file `src/vite.config.js`, you can change the proxy configuration to the backend server.
It uses the `localhost` with port `7000` by default.
API is going to be available at `http://localhost:PORT/api`.

## Run / Test / Build

### Basics

To run the project, you need to install the dependencies with `yarn` or `npm install`.

### Development

```bash
yarn dev
```

### Build

```bash
yarn build
```

### Test

```bash
yarn test
```

## Structure

````
src
    - components
      - ProductList
    - constants
    - hooks
    - pages
    - router
    - models
    - styles
    - urls
````

## Components
    ProductList
## Hooks
    useFetchProducts
## Pages
    Home

## Technical Decisions
    - usgin styles components
    - using react hooks
    - retry approach for fetch products
    - using axios

I have used the primary and fast approach for this project, and
in some parts, I have different ideas on the implementation and improvements.

I have used the hook to make the central component cleaner, and the primary goal is the separation of concern.

I did my best to make a clean structure ready for long-term development.

## Improvements / TODO
    - add tests
    - remove any types
    - only load if slide shows in view
    - caching approach
    - useMutation hook for post data
    - make product components more generic
       - add configuration
       - add renderProp for elemetns
       - internanalize
       - add more a11y support
###

### Vite

I decided to use Vite as the build tool, which is more customizable, light, clean, and way faster than CRA.


### styled-components

I decided to use styled-components as the styling library, which gives the encapsulated style and cleaner JSX form for nodes in the development process. 

## License

This project is licensed under the terms of the MIT license.
