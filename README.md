# Data stream 'Density Clustering' on real time 

![alt text](https://github.com/imagino50/ParticlesProject/blob/master/public/image.png   "Home page")

## Project purpose
Detect 'density clusters' according to these 3 conditions :
- Each 'event' intensity decreases while its radius increases over time.  
- Each 'event' with a weak intensity are filtered
- To emphase the 'density clustering', 'events' accumulate theirs intensities when they are closes enough .

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

## Dependency

- Vue js
- Vue.observable as a State Store
- density-clustering
- BootstrapVue
