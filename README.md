# Data stream 'Density-based Clustering' on real time   

![alt text](https://github.com/imagino50/ParticlesProject/blob/master/public/image.png   "Home page")

## Project purpose  
Detect 'density-based clustering' according to these 3 conditions :
- Each 'event' intensity decreases while its radius increases over time.  
- Each 'event' with a weak intensity are filtered
- To emphase the 'density clustering', 'events' accumulate theirs intensities when they are close enough .

## Steps Process  
1. Generates 'events' as 2D input : Randomly or from a standard deviation around a moving center. 
2. Draws 'events' on the first Canvas.
3. Draws colored 'events' according to the Hdbscan clustering on the second Canvas.
4. Draws ConvexHullGrahamScan clusters shapes on the third Canvas.

## How to run  
```
npm install
```
```
npm run serve
```
```
http://localhost:8080/
```

## Dependency
- Vue js
- Vue.observable as a State Store
- density-clustering
- BootstrapVue

## Deployed on Netlify
[![Netlify Status](https://api.netlify.com/api/v1/badges/7519058e-538b-46ec-afb2-345c220f5d9d/deploy-status)](https://app.netlify.com/sites/density-clustering/deploys)
