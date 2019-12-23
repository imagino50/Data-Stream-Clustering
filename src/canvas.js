import Utils from "@/utils.js";

/*=============================================================================*/
/* Class Canvas 
/*=============================================================================*/
export default class Canvas {
  /*=============================================================================*/
  /* Initialize Canvas
  /*=============================================================================*/
  static initCanvas(canvas) {
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
  static filterCanvas(ctx1, ctx2, canvas1, filterThreshold) {
    var imgData = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    var imgDataFiltered = Utils.redFilter(imgData, filterThreshold);
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
