# Data stream 'Density-based Clustering' in real time   

![alt text](https://github.com/imagino50/ParticlesProject/blob/master/public/image.png   "Home page")

## Project purpose  
Detect 'density-based clustering' of a continuous (infinite) stream of 'Events'.  
'Event' attributes : posX, posY, intensity, radius, clusterId.

The classification of these 'events' is done accordingly to these 4 conditions :
- Events are sent one by one to the stream input
- Each event intensity decreases while its radius increases over time.  
- Events with weak intensity are filtered
- To emphase the 'density-based clustering', events accumulate theirs intensities when they are close enough.

## Steps Process  
1. Generates continously 'events' as 2D input : Randomly or from a standard deviation around a moving center. 
2. Draws and refresh 'events' on the first Canvas.
3. Draws colored 'events' according to the density-based clustering on the second Canvas.
4. Draws ConvexHull (GrahamScan) clusters shapes on the third Canvas.

## How to run  
```
https://density-clustering.netlify.com/
```

Or

```
git clone https://github.com/imagino50/Data-Stream-Clustering.git
```
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
- JSON files for the default settings
- 'density-clustering' librairy
- BootstrapVue

## Deployed on Netlify
[![Netlify Status](https://api.netlify.com/api/v1/badges/7519058e-538b-46ec-afb2-345c220f5d9d/deploy-status)](https://app.netlify.com/sites/density-clustering/deploys)
