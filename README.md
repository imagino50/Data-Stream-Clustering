# Clustering events diffusion

- First Canvas :   
Generate (random or clustered) events as input .   
Each event intensity decreases while its radius increases.    
For events which overlap, theirs intensities cumulate.   
- Second Canvas :  
Hdbscan is applied to detect clusters. 
- Third Canvas :
Then ConvexHullGrahamScan is used to draw clusters shapes.    

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
