import Utils from "@/utils.js";

/*=============================================================================*/
/* Class Canvas 
/*=============================================================================*/
export default class Canvas {
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
  static clearCanvas(ctx, canvasWidth, canvasHeight) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  }
}
