import Event from "@/event.js";
import Utils from "@/utils.js";
import InputGenerator from "@/inputGenerator.js";
import { inputMutations } from "@/store/inputSettingsStore.js";

/*=============================================================================*/
/* Class Canvas Input Events
/*=============================================================================*/
export default class CanvasInput {
  /*=============================================================================*/
  /* Constructor
  /*=============================================================================*/
  constructor(canvas, width, height) {
    this.eventList = [];
    this.eventFilteredList = [];
    this.ctx = canvas.getContext("2d");
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.initCanvas(canvas);
    var initialNbClusters = 3;
    var marginX = 30;
    var marginY = 30;
    this.inputGenerator = new InputGenerator(
      initialNbClusters,
      width,
      height,
      marginX,
      marginY
    );
  }

  /*=============================================================================*/
  /* Initialize Canvas
  /*=============================================================================*/
  initCanvas(canvas) {
    canvas.style.border = "solid 1px black";
    canvas.style.background = "black";
    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;
    // lighter creates bright highlight points as the events overlap each other
    this.ctx.globalCompositeOperation = "lighter";
  }

  /*=============================================================================*/
  /* Main function : Add an event randomly or from dataset to Canvas
  /*=============================================================================*/
  addEventFromSelection(
    generationMode,
    eventsGenerated,
    eventID,
    centerIntensity
  ) {
    if (generationMode == "Random") {
      this.createRandomEvent(centerIntensity);
    } else if (
      generationMode == "Cluster" &&
      eventID < eventsGenerated.length
    ) {
      this.addEvent(eventsGenerated[eventID]);
      inputMutations.incEventID();
      //console.log("addEventsGenerated");
    } else if (generationMode == "ClusterMoving") {
      var noiseRate = 20;
      var max_x_stdev = 10;
      var max_y_stdev = 10;
      var event = this.inputGenerator.generateEvent(
        noiseRate,
        centerIntensity,
        max_x_stdev,
        max_y_stdev
      );
      //console.log("generatedEvent", test);
      this.addEvent(event);
      var max_centerX_stdev = 3;
      var max_centerY_stdev = 3;
      this.inputGenerator.updateRandomClusterCenter(max_centerX_stdev, max_centerY_stdev);
    }
  }

  /*=============================================================================*/
  /* Main function : Render events on canvas
  /*=============================================================================*/
  refreshCanvas(intensityMin, incRadius, incIntensity) {
    this.clearCanvas();
    this.removeWeakEvents(intensityMin);
    this.updateEventsShape(incRadius, incIntensity);
    this.renderEvents();
  }

  /*=============================================================================*/
  /* Clear Canvas
  /*=============================================================================*/
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
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
      this.eventList[i].render(this.ctx, this.canvasWidth, this.canvasHeight);
    }
  }

  /*=============================================================================*/
  /* Create Event at ramdom position
  /*=============================================================================*/
  createRandomEvent(centerIntensity) {
    this.createEvent(
      Utils.getRandomInt(0, this.canvasWidth),
      Utils.getRandomInt(0, this.canvasHeight),
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
  /* Remove all Events
  /*=============================================================================*/
  removeAllEvents() {
    this.eventList = [];
  }

  /*=============================================================================*/
  /* Return EventList
  /*=============================================================================*/
  getEventList() {
    return this.eventList;
  }

  /*=============================================================================*/
  /* Return ImageData
  /*=============================================================================*/
  getImageData() {
    return this.ctx.getImageData(0, 0, this.canvasWidth, this.canvasHeight);
  }
}
