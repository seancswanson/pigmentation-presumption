(function() {
  // ----------
  var colorSquares = document.querySelectorAll(".color-square-tile");
  colorSquares = Array.prototype.slice.call(colorSquares);

  var colors = [];

  var targetColorHeading = document.querySelector(".rgb-to-guess");
  var targetColor;

  var menuTop = document.querySelector('.menu-top');
  var gameArea = document.querySelector('.game-area');

  var App = {
    initGame: function() {
      this.makeRGBString();
      this.setClickHandlers();
    },

    setSquareColors: function(rgbString) {
      var self = this;
      colorSquares.forEach(function(colorSquare, i) {
        colorSquare.style.background = colors[i];
      });
    },

    makeRGBString: function(num) {
      var r, g, b, rgbString;
      for (var i = 0; i <= colorSquares.length - 1; i++) {
        r = this.getRandomNumber();
        g = this.getRandomNumber();
        b = this.getRandomNumber();
        rgbString = "rgb(" + r + ", " + g + ", " + b + ")";
        colors.push(rgbString);
        this.setSquareColors(rgbString);
        targetColor =
          colors[Math.floor(Math.random() * (colorSquares.length - 1))];
        targetColorHeading.textContent = this.capitalizeRGBString();
      }
    },

    getRandomNumber: function() {
      return Math.floor(Math.random() * 255);
    },

    capitalizeRGBString: function() {
      var cleanTargetColorRGB =
        (targetColor ? targetColor.slice(0, 3).toUpperCase() : "failed") +
        (targetColor ? targetColor.slice(3, 18) : "failed");
      return cleanTargetColorRGB;
    },

    checkMatch: function() {
      if (this.style.background === targetColor) {
        menuTop.style.backgroundColor = this.style.background;
        gameArea.style.backgroundColor = this.style.background;
      }
      console.log(this.style.background);
    },

    setClickHandlers: function() {
      for (var i = 0; i <= colorSquares.length - 1; i++) {
        colorSquares[i].addEventListener('click', this.checkMatch);
      }
    }
  };

  App.initGame();
})();
