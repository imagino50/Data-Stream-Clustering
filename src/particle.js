/*=============================================================================*/
/* Class Particle
/*=============================================================================*/
export default class Particle {
  /*=============================================================================*/
  /* Constructor
  /*=============================================================================*/
  constructor(center_x, center_y, centerIntensity) {
    this.x = center_x;
    this.y = center_y;
    this.intensity = centerIntensity;
    this.radius = 0;
    this.clusterId = -1;
  }

  /*=============================================================================*/
  /* update Particle shape
  /*=============================================================================*/
  updateShape(incRadius, incIntensity) {
    // decrease the intensity
    this.intensity -= incIntensity;

    // increase the radius
    this.radius += incRadius;
  }

  /*=============================================================================*/
  /* update Particle cluster
  /*=============================================================================*/
  updateCluster(id) {
    this.clusterId = id;
  }

  /*=============================================================================*/
  /* draw Particle
  /*=============================================================================*/
  draw(ctx, canvas_w, canvas_h) {
    var rgr = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.radius
    );
    rgr.addColorStop(0, "rgba(" + this.intensity + ",0,0,1)");
    rgr.addColorStop(1, "black");
    // lighter creates bright highlight points as the fireworks overlap each other
    ctx.globalCompositeOperation = "lighter";
    ctx.fillStyle = rgr;
    ctx.fillRect(0, 0, canvas_w, canvas_h);
  }

  /*=============================================================================*/
  /* draw colored circle around the Particle
  /*=============================================================================*/
  drawCenters(color, ctx, canvas_w, canvas_h) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillRect(0, 0, canvas_w, canvas_h);
  }

  /*=============================================================================*/
  /* Return True if the particle is included in a cluster
  /*=============================================================================*/
  static isInCluster(particules, clusters) {
    for (let i = 0; i < clusters.length; i++) {
      let cluster = clusters[i];
      for (let j = 0; j < cluster.length; j++) {
        let index = cluster[j];
        if (this.x == particules[index].x && this.y == particules[index].y) {
          return true;
        }
      }
    }
    return false;
  }

  /*=============================================================================*/
  /* clone Particle 
  /*=============================================================================*/
  clone() {
    var particleCloned = new Particle(this.x, this.y, this.intensity);
    particleCloned.radius = this.radius;
    particleCloned.clusterId = this.clusterId;
    return particleCloned;
  }
}
