# Clustering particules diffusion

Generate (random or clustered) events as input (First Canvas). 
Each intensity decreases while the radius increases.  
For events close enough, intensities overlappe.
Hdbscan is applied to detect clusters (Second Canvas).  
Then ConvexHullGrahamScan is used to draw clusters shapes (Third Canvas).  

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
