import Particle from "@/particle.js";
import Utils from "@/utils.js";
import Cluster from "@/cluster.js";
import Canvas from "@/canvas.js";

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
  /* Draw Particles on canvas1
  /*=============================================================================*/
  refreshCanvas1(ctx1, canvas1, intensityMin, incRadius, incIntensity) {
    Canvas.clearCanvas(ctx1, canvas1);
    this.removeWeakParticles(intensityMin);
    this.updateParticlesShape(incRadius, incIntensity);
    this.renderParticles();
  }

  /*=============================================================================*/
  /* Remove Particles with intensity lower than intensityMin
  /*=============================================================================*/
  removeWeakParticles(intensityMin) {
    this.particles = this.particles.filter(function(item) {
      return item.intensity > intensityMin;
    });
  }

  /*=============================================================================*/
  /* Remove all Particles
  /*=============================================================================*/
  removeAllParticles() {
    this.particles = [];
  }

  /*=============================================================================*/
  /* Create Particles at ramdom position
  /*=============================================================================*/
  createRandomParticle(centerIntensity) {
    this.createParticle(
      Utils.random(0, this.canvasWidth),
      Utils.random(0, this.canvasHeight),
      centerIntensity
    );
  }

  /*=============================================================================*/
  /* Create Particles from click mouse event
  /*=============================================================================*/
  createParticleFromEvent(e, centerIntensity) {
    var eventLocation = Utils.getPosition(e);
    this.createParticle(eventLocation.x, eventLocation.y, centerIntensity);
  }

  /*=============================================================================*/
  /* Create Particles from dataset
  /*=============================================================================*/
  createParticleFromDataset(particle) {
    this.particles.push(particle);
  }

  /*=============================================================================*/
  /* Create Particles at position (x,y)
  /*=============================================================================*/
  createParticle(x, y, centerIntensity) {
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
    // loop over each particle to draw it
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
    // reset clusterId of all particles
    this.particlesFiltered.map(particule => (particule.clusterId = -1));

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
    canvas.addEventListener(
      "click",
      function(e) {
        var eventLocation = Utils.getPosition(e);
        this.createParticle(eventLocation.x, eventLocation.y, centerIntensity);
      },
      false
    );
  }
}
