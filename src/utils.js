/*=============================================================================*/
/* Class utils 
/*=============================================================================*/
export default class utils {
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
    };
  }

  /*=============================================================================*/
  /* generate random number within a range (min included and max excluded)
  /*=============================================================================*/
  static getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  /*=============================================================================*/
  /* generate random number
  /*=============================================================================*/
  static rnd(mean, stdev) {
    return Math.round(this.rnd_snd() * stdev + mean);
  }

  /*=============================================================================*/
  /* generate random number
  /*=============================================================================*/
  static rnd_snd() {
    return (
      Math.random() * 2 - 1 + (Math.random() * 2 - 1) + (Math.random() * 2 - 1)
    );
  }

  /*=============================================================================*/
  /* returns the suffled array
  /*=============================================================================*/
  static shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}
