export default class Filter {
  static redFilter(imgData, redThreshold) {
    var data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      //var r = d[i];
      //var g = d[i+1];
      //var b = d[i+2];
      if (data[i] < redThreshold) {
        data[i] = 0;
      }
    }
    return imgData;
  }
}
