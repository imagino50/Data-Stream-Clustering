import Particle from "./particle.js";
import Utils from "./utils.js";
import PixelLocation from "./pixelLocation.js";
import Cluster from "./cluster.js";

/*=============================================================================*/
/* Class Canvas Particles
/*=============================================================================*/
export default class CanvasParticles {
  /*=============================================================================*/
  /* Constructor
  /*=============================================================================*/
  constructor(canvas1, canvas2, canvas3) {
    this.particles = [];
    this.particlesFiltered = [];
    this.ctx1 = canvas1.getContext("2d");
    this.ctx2 = canvas2.getContext("2d");
    this.ctx3 = canvas3.getContext("2d");
    this.canvasHeight = canvas1.height;
    this.canvasWidth = canvas1.width;
  }

  /*=============================================================================*/
  /* Remove Particles with intensity lower than intensityMin
  /*=============================================================================*/
  removeParticles(intensityMin) {
    // remove particles with intensity lower than intensityMin
    this.particles = this.particles.filter(function(item) {
      return item.intensity > intensityMin;
    });
  }

  /*=============================================================================*/
  /* Create Particles at ramdom position
  /*=============================================================================*/
  createRandomParticle(centerIntensity) {
    // add particle at ramdom position
    this.particles.push(
      new Particle(
        Utils.random(0, this.canvasWidth),
        Utils.random(0, this.canvasHeight),
        centerIntensity
      )
    );
  }

  /*=============================================================================*/
  /* Create Particles at a position (x,y)
  /*=============================================================================*/
  createParticle(x, y, centerIntensity) {
    // add particle at a position (x,y)
    this.particles.push(
      new Particle(Math.round(x), Math.round(y), centerIntensity)
    );
  }

  /*=============================================================================*/
  /* Update Particles shape
  /*=============================================================================*/
  updateParticlesShape(incRadius, incIntensity) {
    {
      // loop over each particle to update it
      for (let i = 0; i < this.particles.length; i++) {
        this.particles[i].updateShape(incRadius, incIntensity);
      }
    }
  }

  /*=============================================================================*/
  /* Render Particles
  /*=============================================================================*/
  renderParticles() {
    // loop over each firework to draw it
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].draw(this.ctx1, this.canvasWidth, this.canvasHeight);
    }
  }

  /*=============================================================================*/
  /* Filter Particles using a threshold intensity
  /*=============================================================================*/
  filterParticles(redThreshold) {
    var imgData = this.ctx1.getImageData(
      0,
      0,
      this.canvasWidth,
      this.canvasHeight
    );

    this.particlesFiltered = [];
    for (let i = 0; i < this.particles.length; i++) {
      if (
        imgData.data[
          this.particles[i].y * (imgData.width * 4) + this.particles[i].x * 4
        ] >= redThreshold
      ) {
        this.particlesFiltered.push(this.particles[i].clone());
      }
    }

    return this.particlesFiltered;
  }

  /*=============================================================================*/
  /* Update cluster of Filtered Particles 
  /*=============================================================================*/
  updateParticlesCluster(clusters) {
    for (let i = 0; i < clusters.length; i++) {
      let cluster = clusters[i];
      for (let j = 0; j < cluster.length; j++) {
        let index = cluster[j];
        this.particlesFiltered[index].updateCluster(i);
      }
    }

    /*if (clusters.length > 2) {
      console.log("this.particlesFiltered", this.particlesFiltered, clusters);
    }*/

    return this.particlesFiltered;
  }

  /*=============================================================================*/
  /* Render Filtered Particles
  /*=============================================================================*/
  renderFilteredParticles(clusterColors) {
    var i = this.particlesFiltered.length;
    while (i--) {
      var colorValue = "rgb(255,255,255)";
      if (this.particlesFiltered[i].clusterId != -1) {
        var colorKey = clusterColors[this.particlesFiltered[i].clusterId];
        colorValue = Cluster.ColorsPalette[colorKey];
      }
      //console.log("colorValue", colorValue);
      this.particlesFiltered[i].drawCenters(
        colorValue,
        this.ctx2,
        this.canvasWidth,
        this.canvasHeight
      );
    }
  }

  /*=============================================================================*/
  /* Add Click Event Listener Canvas
  /*=============================================================================*/
  addEventCanvas(canvas, centerIntensity) {
    // add a firework on click event
    canvas.addEventListener(
      "click",
      function(e) {
        var eventLocation = PixelLocation.getPosition(e);
        this.createParticle(eventLocation.x, eventLocation.y, centerIntensity);
      },
      false
    );
  }
}
