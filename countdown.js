/**
 * A plugin which enables rendering of a count down clock in
 * reveal.js slides.
 *
 * @author Christer Eriksson
 */
var RevealCountDown =
  window.RevealCountDown ||
  (function() {
    var options = Reveal.getConfig().countdown || {};
    console.log("CountDown ", options);

    var defaultOptions = {
      defaultTime: 300,
      autostart: "no"
    };

    defaults(options, defaultOptions);

    function defaults(options, defaultOptions) {
      for (var i in defaultOptions) {
        if (!options.hasOwnProperty(i)) {
          options[i] = defaultOptions[i];
        }
      }
    }

    var counterRef = null;
    var interval = null;
    var startTime = 0;
    var elapsedTime = 0;
    var running = false;

    Reveal.addEventListener("slidechanged", function(event) {
      initCountDown(event.currentSlide);
    });

    Reveal.addKeyBinding(
      { keyCode: 84, key: "T", description: "Start timer" },
      function() {
        togglePauseTimer();
      }
    );

    function updateTimer(timeLeft) {
      if (counterRef === null) return;
      secondsLeft = timeLeft;
      minutesLeft = Math.floor(secondsLeft / 60);
      secondsLeft = secondsLeft % 60;
      if (minutesLeft > 0) {
        counterRef.innerHTML = minutesLeft + " m " + secondsLeft + " s";
      }
      if (minutesLeft <= 0) {
        counterRef.innerHTML = secondsLeft + " s";
      }
    }

    function togglePauseTimer() {
      running = !running;
    }

    function startTimer() {
      interval = setInterval(function() {
        if (elapsedTime < startTime && running && !Reveal.isPaused()) {
          elapsedTime = elapsedTime + 1;
          updateTimer(startTime - elapsedTime);
        }
      }, 1000);
    }

    function initCountDown(currentSlide) {
      if (interval != null) clearInterval(interval);
      counterRef = currentSlide.getElementsByTagName("countdown")[0];

      if (counterRef === undefined) return;
      time = counterRef.getAttribute("time");§
      autostart = counterRef.getAttribute("autostart");
      elapsedTime = 0;
      startTime = time ? time : options.defaultTime;
      startTimer();
      running = autostart === "yes" ? true : false;
    }

    return {
      init: function() {
        console.log("Init CountDown");
      }
    };
  })();

Reveal.registerPlugin("countdown", RevealCountDown);
