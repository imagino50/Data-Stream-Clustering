/*=============================================================================*/
/* Class Event
/*=============================================================================*/
export default class Event {
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
  /* update Event shape
  /*=============================================================================*/
  updateShape(incRadius, incIntensity) {
    // decrease the intensity
    this.intensity -= incIntensity;

    // increase the radius
    this.radius += incRadius;
  }

  /*=============================================================================*/
  /* set Event's cluster
  /*=============================================================================*/
  setCluster(id) {
    this.clusterId = id;
  }

  /*=============================================================================*/
  /* render Event
  /*=============================================================================*/
  render(ctx, canvas_w, canvas_h) {
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
  /* draw colored circle around the Event
  /*=============================================================================*/
  drawColoredCircle(color, ctx, canvas_w, canvas_h) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillRect(0, 0, canvas_w, canvas_h);
  }

  /*=============================================================================*/
  /* Return True if the event is included in a cluster
  /*=============================================================================*/
  static isInCluster(events, clusters) {
    for (let i = 0; i < clusters.length; i++) {
      let cluster = clusters[i];
      for (let j = 0; j < cluster.length; j++) {
        let index = cluster[j];
        if (this.x == events[index].x && this.y == events[index].y) {
          return true;
        }
      }
    }
    return false;
  }

  /*=============================================================================*/
  /* clone Event 
  /*=============================================================================*/
  clone() {
    var eventCloned = new Event(this.x, this.y, this.intensity);
    eventCloned.radius = this.radius;
    eventCloned.clusterId = this.clusterId;
    return eventCloned;
  }
}
