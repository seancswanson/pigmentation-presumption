(function() {
  // ----------
  var colorSquares = document.querySelectorAll(".color-square-tile");
  colorSquares = Array.prototype.slice.call(colorSquares);

  var colors = [];

  var targetColorHeading = document.querySelector(".rgb-to-guess");
  var targetColor;

  var menuTop = document.querySelector('.menu-top');
  var menuMessage = document.querySelector('.menu-message');
  var gameArea = document.querySelector('.game-area');

  var App = {
    initGame: function() {
      this.makeRGBString();
      this.setHandlers();
    },

    setSquareColors: function(rgbString) {
      var self = this;
      colorSquares.forEach(function(colorSquare, i) {
        colorSquare.style.backgroundColor = colors[i];
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
      if (this.style.backgroundColor === targetColor) {
        menuTop.style.backgroundColor = this.style.backgroundColor;
        menuMessage.textContent = 'Correct!';
        this.style.pointerEvents = 'none';
        App.winningTileAnimation();
      } else {
        this.style.backgroundColor = '#232323';
        this.style.pointerEvents = 'none';
        menuMessage.textContent = 'Try again!';
      }
      console.log(this.style.backgroundColor);
    },

    winningTileAnimation: function() {
      var i = 0;
      (function delayedAnimation() {
        colorSquares[i].style.backgroundColor = targetColor;
        i++;
        if (i < colorSquares.length) {
          setTimeout(delayedAnimation, 130);
        }
      })();
    },

    setHandlers: function() {
      for (var i = 0; i <= colorSquares.length - 1; i++) {
        colorSquares[i].addEventListener('mouseover', function() {
          this.classList.add('tile-hover');
        });
        colorSquares[i].addEventListener('mouseout', function() {
          this.classList.remove('tile-hover');
        });
        colorSquares[i].addEventListener('click', this.checkMatch);
      }
    }
  };

  App.initGame();
})();
