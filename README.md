# Data stream clustering with energy diffusion of event input (intensity spreads and decreases over time). 

- **First Canvas** :   
Generate (random or clustered) events continuously as input.
Each event intensity decreases while its radius increases over time  
For events which overlap, theirs intensities cumulate each others.   
- **Second Canvas** :  
Hdbscan is applied to detect clusters on real time.
- **Third Canvas** :  
Then ConvexHullGrahamScan draw clusters polygons on real time.    

## Built With

- Vue js
- Vue.observable as a State Store
- BootstrapVue

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Authors
Arnaud PAUMARD
