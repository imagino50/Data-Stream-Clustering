/*=============================================================================*/
/* Class Pixel location
/*=============================================================================*/
export default class PixelLocation {
  /*=============================================================================*/
  /* read relative pixel position
  /*=============================================================================*/
 static getPosition(e) {
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    return {
      x,
      y
    }
  }

}