import Filter from "./filter.js";

/*=============================================================================*/
/* Class Canvas 
/*=============================================================================*/
export default class Canvas {
  /*=============================================================================*/
  /* Check Canvas Support
  /*=============================================================================*/
  static isCanvasSupported() {
    var elem = document.createElement("canvas");
    return !!(elem.getContext && elem.getContext("2d"));
  }

  /*=============================================================================*/
  /* Initialize Canvas2
  /*=============================================================================*/
  static initCanvas1(canvas) {
    canvas.style.border = "solid 1px black";
    canvas.style.background = "black";
    canvas.width = 300;
    canvas.height = 300;
    var ctx = canvas.getContext("2d");
    // lighter creates bright highlight points as the fireworks overlap each other
    ctx.globalCompositeOperation = "lighter";
  }

  /*=============================================================================*/
  /* Initialize Canvas2
  /*=============================================================================*/
  static initCanvas2(canvas) {
    canvas.style.border = "solid 1px black";
    canvas.style.background = "black";
    canvas.width = 300;
    canvas.height = 300;
    var ctx = canvas.getContext("2d");
    // lighter creates bright highlight points as the fireworks overlap each other
    ctx.globalCompositeOperation = "lighter";
  }
  /*=============================================================================*/
  /* Filter Canvas
  /*=============================================================================*/
  static filterCanvas(ctx1, ctx2, canvas2, filterThreshold) {
    var imgData = ctx1.getImageData(0, 0, canvas2.width, canvas2.height);
    var imgDataFiltered = Filter.redFilter(imgData, filterThreshold);
    ctx2.putImageData(imgDataFiltered, 0, 0);
  }

  /*=============================================================================*/
  /* Clear Canvas
  /*=============================================================================*/
  static clearCanvas(ctx, canvas) {
    // clean canvas before redrawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}
