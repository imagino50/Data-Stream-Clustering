import Event from "@/event.js";
import Utils from "@/utils.js";
import Cluster from "@/cluster.js";
import Canvas from "@/canvas.js";

/*=============================================================================*/
/* Class Canvas Events
/*=============================================================================*/
export default class CanvasEvents {
  /*=============================================================================*/
  /* Constructor
  /*=============================================================================*/
  constructor(canvas1, canvas2, canvas3) {
    this.eventList = [];
    this.eventFilteredList = [];
    this.ctx1 = canvas1.getContext("2d");
    this.ctx2 = canvas2.getContext("2d");
    this.ctx3 = canvas3.getContext("2d");
    this.canvasHeight = canvas1.height;
    this.canvasWidth = canvas1.width;
  }

  /*=============================================================================*/
  /* Render events on canvas1
  /*=============================================================================*/
  refreshCanvas1(ctx1, canvas1, intensityMin, incRadius, incIntensity) {
    Canvas.clearCanvas(ctx1, canvas1);
    this.removeWeakEvents(intensityMin);
    this.updateEventsShape(incRadius, incIntensity);
    this.renderEvents();
  }

  /*=============================================================================*/
  /* Remove Events with intensity lower than intensityMin
  /*=============================================================================*/
  removeWeakEvents(intensityMin) {
    this.eventList = this.eventList.filter(function(item) {
      return item.intensity > intensityMin;
    });
  }

  /*=============================================================================*/
  /* Remove all Events
  /*=============================================================================*/
  removeAllEvents() {
    this.eventList = [];
  }

  /*=============================================================================*/
  /* Update Events shape
  /*=============================================================================*/
  updateEventsShape(incRadius, incIntensity) {
    {
      // loop over each event to update it
      for (let i = 0; i < this.eventList.length; i++) {
        this.eventList[i].updateShape(incRadius, incIntensity);
      }
    }
  }

  /*=============================================================================*/
  /* Render Events
  /*=============================================================================*/
  renderEvents() {
    // loop over each event to draw it
    for (let i = 0; i < this.eventList.length; i++) {
      this.eventList[i].render(this.ctx1, this.canvasWidth, this.canvasHeight);
    }
  }

  /*=============================================================================*/
  /* Filter Events using a threshold intensity
  /*=============================================================================*/
  filterEvents(redThreshold) {
    var imgData = this.ctx1.getImageData(
      0,
      0,
      this.canvasWidth,
      this.canvasHeight
    );

    this.eventFilteredList = [];
    for (let i = 0; i < this.eventList.length; i++) {
      if (
        imgData.data[
          this.eventList[i].y * (imgData.width * 4) + this.eventList[i].x * 4
        ] >= redThreshold
      ) {
        this.eventFilteredList.push(this.eventList[i].clone());
      }
    }

    return this.eventFilteredList;
  }

  /*=============================================================================*/
  /* Set clusters of Filtered Events 
  /*=============================================================================*/
  setClustersEvents(clusterList) {
    // reset clusterId of all events
    this.eventFilteredList.map(event => (event.clusterId = -1));

    for (let i = 0; i < clusterList.length; i++) {
      let cluster = clusterList[i];
      for (let j = 0; j < cluster.length; j++) {
        let index = cluster[j];
        this.eventFilteredList[index].setCluster(i);
      }
    }

    /*if (clusters.length > 2) {
      console.log("this.eventFilteredList", this.eventFilteredList, clusters);
    }*/

    return this.eventFilteredList;
  }

  /*=============================================================================*/
  /* Render Filtered Events
  /*=============================================================================*/
  renderFilteredEvents(clusterColors) {
    var i = this.eventFilteredList.length;
    while (i--) {
      var colorValue = "rgb(255,255,255)";
      if (this.eventFilteredList[i].clusterId != -1) {
        var colorKey = clusterColors[this.eventFilteredList[i].clusterId];
        colorValue = Cluster.ColorsPalette[colorKey];
      }
      //console.log("colorValue", colorValue);
      this.eventFilteredList[i].drawColoredCircle(
        colorValue,
        this.ctx2,
        this.canvasWidth,
        this.canvasHeight
      );
    }
  }

  /*=============================================================================*/
  /* Create Event at ramdom position
  /*=============================================================================*/
  createRandomEvent(centerIntensity) {
    this.createEvent(
      Utils.random(0, this.canvasWidth),
      Utils.random(0, this.canvasHeight),
      centerIntensity
    );
  }

  /*=============================================================================*/
  /* Create Event from click mouse event
  /*=============================================================================*/
  createEventFromClick(e, centerIntensity) {
    var eventLocation = Utils.getPosition(e);
    this.createEvent(eventLocation.x, eventLocation.y, centerIntensity);
  }

  /*=============================================================================*/
  /* Add Event
  /*=============================================================================*/
  addEvent(event) {
    this.eventList.push(event);
  }

  /*=============================================================================*/
  /* Add new Event at position (x,y)
  /*=============================================================================*/
  createEvent(x, y, centerIntensity) {
    this.eventList.push(
      new Event(Math.round(x), Math.round(y), centerIntensity)
    );
  }
  /*=============================================================================*/
  /* Add Click Event Listener Canvas
  /*=============================================================================*/
  /* addClickListenerCanvas(canvas, centerIntensity) {
    canvas.addEventListener(
      "click",
      function(e) {
        var eventLocation = Utils.getPosition(e);
        this.createEvent(eventLocation.x, eventLocation.y, centerIntensity);
      },
      false
    );
  }*/
}
