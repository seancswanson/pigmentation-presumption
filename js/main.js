(function() {
  // ----------
  var colorSquareEl;
  var colorSquareEls;

  var colors = [];
  var numberOfColors;

  var targetColorHeading = document.querySelector(".rgb-to-guess");
  var targetColor;

  var menuTop = document.querySelector(".menu-top");
  var menuMessage = document.querySelector(".menu-message");
  var newGameButton = document.querySelector(".new-game");
  var easyButton = document.querySelector(".easy-button");
  var hardButton = document.querySelector(".hard-button");
  var gameArea = document.querySelector(".game-area");
  var colorSquareContainer = document.querySelector(".color-square-container");

  var score = 0;
  var difficulty = "easy";

  window.App = {
    initGame: function() {
      colors = [];
      console.log(colors);
      this.setDifficulty(difficulty);
      this.makeRGBStrings();
      this.makeSquares();
      this.setSquareColors();
      this.setTargetColor();
      this.setHandlers();
    },

    // ----------
    makeSquares: function() {
      while (colorSquareContainer.firstChild) {
        colorSquareContainer.removeChild(colorSquareContainer.firstChild);
      }
      for (var i = 0; i <= colors.length - 1; i++) {
        console.log(colors.length);
        colorSquareEl = document.createElement("div");
        colorSquareEl.classList = "color-square-tile";
        colorSquareContainer.appendChild(colorSquareEl);
      }
      colorSquareEls = document.querySelectorAll(".color-square-tile");
      colorSquareEls = Array.prototype.slice.call(colorSquareEls);
      console.log(colorSquareEls);
    },

    // ----------
    setDifficulty: function(difficulty) {
      if (difficulty === "easy") {
        numberOfColors = 2;
      } else if (difficulty === "hard") {
        numberOfColors = 5;
      }
    },

    // ----------
    setSquareColors: function() {
      var self = this;
      colorSquareEls.forEach(function(colorSquare, i) {
        colorSquare.style.backgroundColor = colors[i];
        colorSquare.style.pointerEvents = "initial";
      });
    },

    // ----------
    makeRGBStrings: function() {
      var r, g, b, rgbString;
      for (var i = 0; i <= numberOfColors; i++) {
        console.log(i);
        r = this.getRandomColor();
        g = this.getRandomColor();
        b = this.getRandomColor();
        rgbString = "rgb(" + r + ", " + g + ", " + b + ")";
        colors.push(rgbString);
      }
    },

    // ----------
    setTargetColor: function() {
      targetColor = colors[Math.floor(Math.random() * colors.length)];
      targetColorHeading.textContent = this.capitalizeRGBString();
    },

    // ----------
    getRandomColor: function() {
      return Math.floor(Math.random() * 256);
    },

    // ----------
    capitalizeRGBString: function() {
      var cleanTargetColorRGB =
        (targetColor ? targetColor.slice(0, 3).toUpperCase() : "failed") +
        (targetColor ? targetColor.slice(3, 18) : "failed");
      return cleanTargetColorRGB;
    },

    // ----------
    checkMatch: function() {
      if (this.style.backgroundColor === targetColor) {
        menuTop.style.backgroundColor = this.style.backgroundColor;
        menuMessage.textContent = "Correct!";
        newGameButton.textContent = "Play again?";
        this.style.pointerEvents = "none";
        score++;
        App.winningTileAnimation();
      } else {
        this.style.backgroundColor = "#232323";
        this.style.pointerEvents = "none";
        score--;
        menuMessage.textContent = "Try again!";
      }
      console.log(this.style.backgroundColor);
    },

    // ----------
    winningTileAnimation: function() {
      var i = 0;
      (function delayedAnimation() {
        colorSquareEls[i].style.backgroundColor = targetColor;
        colorSquareEls[i].style.border = "2px solid white";
        i++;
        if (i < colorSquareEls.length) {
          setTimeout(delayedAnimation, 130);
        }
      })();
    },

    // ----------
    setHandlers: function() {
      var self = this;
      for (var i = 0; i <= colorSquareEls.length - 1; i++) {
        colorSquareEls[i].addEventListener("mouseover", function() {
          this.classList.add("tile-hover");
        });
        colorSquareEls[i].addEventListener("mouseout", function() {
          this.classList.remove("tile-hover");
        });
        colorSquareEls[i].addEventListener("click", this.checkMatch);
      }
      easyButton.addEventListener('click', function() {
        difficulty = 'easy';
        easyButton.classList.add('selected-menu-button');
        hardButton.classList.remove('selected-menu-button');
        self.initGame();
      });
      hardButton.addEventListener('click', function() {
        difficulty = 'hard';
        easyButton.classList.remove('selected-menu-button');
        hardButton.classList.add('selected-menu-button');
        self.initGame();
      });
      newGameButton.addEventListener("click", function() {
        menuTop.style.backgroundColor = "rgb(83,132,179)";
        menuMessage.textContent = "";
        newGameButton.textContent = 'NEW COLORS';
        self.initGame();
      });
    }
  };

  App.initGame();
})();
