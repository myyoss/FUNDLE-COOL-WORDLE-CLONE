"use strict";

var _this = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var WORD_LENGTH = 5;
var FLIP_ANIMATION_DURATION = 250;
var DANCE_ANIMATION_DURATION = 500;
var keyboard = document.querySelector("[data-keyboard]");
var guessGrid = document.querySelector("[data-guess-grid]");
var alertContainer = document.querySelector("[data-alert-container]");
var attempts = 0;
var storeUserName = '';
var targetWord = '';
var i = ''; // const dayOffset = Math.floor(Math.random() * 2315)

handleLoad();
handleLoadAllUsers();

function handleLoadAllUsers() {
  return __awaiter(this, void 0, void 0,
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var _ref, data, usersStats, numbering, lightness, html;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return axios.get("users/load-all-users");

          case 2:
            _ref = _context.sent;
            data = _ref.data;
            usersStats = [];
            data.forEach(function (element) {
              var name = element.username;
              var wins = element.wins;
              var played = element.played;
              usersStats.push({
                name: name,
                played: played,
                wins: wins
              });
            });
            usersStats.sort(function (a, b) {
              return b.wins - a.wins;
            });
            numbering = 0;
            lightness = 50;
            html = '';
            usersStats.forEach(function (user) {
              numbering += 1;
              lightness += 5;
              html += " <div>\n        <div class=\"usersStats\" style=\"background-color: hsl(46, 70%, ".concat(lightness, "%);\"><span style=\"color: #135e7c; font-weight: bold;\">").concat(numbering, ". ").concat(user.name, "</span> ").concat(user.wins, "/").concat(user.played, " (").concat((user.wins / user.played * 100).toFixed(1), ")%</div></br>\n        </div>");
            });
            document.getElementById('userRoot').innerHTML = html;

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
}

function handleLoad() {
  return __awaiter(this, void 0, void 0,
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var _ref2, data, greetings, logOutDisply, _greetings;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return axios.get("users/load-user");

          case 2:
            _ref2 = _context2.sent;
            data = _ref2.data;

            if (data.username !== 'Guest') {
              storeUserName = data.username;
              renderStats(storeUserName);
              greetings = timeOfDay();
              document.querySelector(".hello").innerHTML = "&nbsp;&nbsp;".concat(greetings, " <span style=\"color: green;\">&nbsp;").concat(storeUserName, "</span>");
              logOutDisply = document.querySelector("#logOutDisply");
              logOutDisply.style.display = 'block';
              getNewWord();
            } else {
              _greetings = timeOfDay();
              document.querySelector(".hello").innerHTML = "&nbsp;&nbsp;".concat(_greetings, " <span style=\"color: green;\">&nbsp;", 'Guest', "</span>");
              handleShowWindow('logreg');
            } //consol log user statistics (document.cookie defined down)
            // console.log('handleLoad-cookies', document.cookie)


          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
}

function getNewWord() {
  return __awaiter(this, void 0, void 0,
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var lettersOn, keysOn, offsetFromDate, msOffset, dayOffset, _ref3, data;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            showAlert("Let's Start !");
            lettersOn = document.querySelectorAll(".letterbox");
            lettersOn.forEach(function (element) {
              element.removeAttribute('data-state');
              element.removeAttribute('data-letter');
              element.innerHTML = "";
            });
            keysOn = document.querySelectorAll("#keyOn");
            keysOn.forEach(function (element) {
              element.className = "key";
            });
            offsetFromDate = new Date(2022, 0, i++);
            msOffset = Date.now() - offsetFromDate;
            dayOffset = Math.floor(msOffset / 1000 / 60 / 60 / 24);
            console.log(dayOffset); // dayOffset++

            document.cookie = "wordInfo= ".concat(targetWord);
            _context3.next = 12;
            return axios.get("words/get-word?dayOffset=".concat(dayOffset));

          case 12:
            _ref3 = _context3.sent;
            data = _ref3.data;
            targetWord = data[0].word;
            console.log("today's word is: " + targetWord);

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
} // async function handleNewGame(event){
//     dayOffset++
//     const { data } = await axios.get(`words/get-word?dayOffset=${dayOffset}`)
//     targetWord = data[0].word
//     console.log(dayOffset)
//     console.log("new word is: " + targetWord)
// }


function tabIndex() {
  var eyeImg = document.querySelectorAll('#eyeImg');
  eyeImg.forEach(function (img) {
    img.tabIndex = -2;
  });
}

tabIndex();

function handlePassToggle() {
  var password = document.querySelectorAll('.passip');
  password.forEach(function (input) {
    if (input.type === 'password') {
      input.type = "text";
    } else {
      input.type = "password";
    }
  });
}

function timeOfDay() {
  var realtoday = new Date();
  var realtime = realtoday.getHours();

  if (realtime >= 0 && realtime <= 5 || realtime >= 22 && realtime <= 24) {
    return 'Good Night';
  }

  if (realtime >= 6 && realtime <= 11) {
    return 'Good Morning';
  }

  if (realtime >= 12 && realtime <= 16) {
    return 'Good Afternoon';
  }

  if (realtime >= 17 && realtime <= 21) {
    return 'Good Evening';
  }
}

startInteraction();

function startInteraction() {
  document.addEventListener("click", handleMouseClick);
  document.addEventListener("keydown", handleKeyPress);
}

function stopInteraction() {
  document.removeEventListener("click", handleMouseClick);
  document.removeEventListener("keydown", handleKeyPress);
}

function handleMouseClick(ev) {
  if (ev.target.matches("[data-key]")) {
    pressKey(ev.target.dataset.key);
    return;
  }

  if (ev.target.matches("[data-enter]")) {
    submitGuess();
    return;
  }

  if (ev.target.matches("[data-delete]")) {
    deleteKey();
    return;
  }
}

function handleKeyPress(ev) {
  if (ev.key === "Enter") {
    submitGuess();
    return;
  }

  if (ev.key === "Backspace" || ev.key === "Delete") {
    deleteKey();
    return;
  }

  if (ev.key) {
    if (ev.key.match(/^[a-z]$/)) {
      pressKey(ev.key);
      return;
    }
  }
}

function pressKey(key) {
  var activeTiles = getActiveTiles();
  if (activeTiles.length >= WORD_LENGTH) return;
  var nextTile = guessGrid.querySelector(":not([data-letter])");
  nextTile.dataset.letter = key.toLowerCase();
  nextTile.textContent = key.toUpperCase();
  nextTile.dataset.state = 'active';
}

function getActiveTiles() {
  return guessGrid.querySelectorAll('[data-state="active"]');
}

function getSubmittedTiles() {
  return guessGrid.querySelectorAll('[data-state="wrong"],[data-state="wrong-location"],[data-state="correct"]');
}

function deleteKey() {
  var activeTiles = getActiveTiles();
  var lastTile = activeTiles[activeTiles.length - 1];

  if (lastTile) {
    lastTile.removeAttribute("data-state");
    lastTile.removeAttribute("data-letter");
    lastTile.textContent = '';
  } else {
    return;
  }
}

function submitGuess() {
  return __awaiter(this, void 0, void 0,
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4() {
    var activeTiles, guess, _ref4, data;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            activeTiles = _toConsumableArray(getActiveTiles());

            if (!(activeTiles.length !== WORD_LENGTH)) {
              _context4.next = 5;
              break;
            }

            showAlert('Not enough letters');
            shakeTiles(activeTiles);
            return _context4.abrupt("return");

          case 5:
            guess = activeTiles.reduce(function (word, tile) {
              return word + tile.dataset.letter;
            }, "");
            _context4.next = 8;
            return axios.get("words/get-guessCheck?guess=".concat(guess));

          case 8:
            _ref4 = _context4.sent;
            data = _ref4.data;

            if (data.found) {
              _context4.next = 14;
              break;
            }

            showAlert("Not in word list");
            shakeTiles(activeTiles);
            return _context4.abrupt("return");

          case 14:
            stopInteraction();
            activeTiles.forEach(function () {
              for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
                params[_key] = arguments[_key];
              }

              return flipTile.apply(void 0, params.concat([guess]));
            });
            attempts++;

          case 17:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
}

function flipTile(tile, index, array, guess) {
  var letter = tile.dataset.letter;
  var key = keyboard.querySelector("[data-key=\"".concat(letter.toUpperCase(), "\"]"));
  setTimeout(function () {
    var audio = new Audio('./sound/ding.mp3');
    audio.volume = 0.2;
    audio.play();
    tile.classList.add("flip");
  }, index * FLIP_ANIMATION_DURATION);
  tile.addEventListener("transitionend", function () {
    tile.classList.remove("flip");

    if (targetWord[index] === letter) {
      tile.dataset.state = 'correct';
      key.classList.add("correct");
    } else if (targetWord.includes(letter)) {
      tile.dataset.state = 'wrong-location';
      key.classList.add("wrong-location");
    } else {
      tile.dataset.state = 'wrong';
      key.classList.add("wrong");
    }

    if (index === array.length - 1) {
      tile.addEventListener("transitionend", function () {
        startInteraction();
        checkWinLose(guess, array);
      }, {
        once: true
      });
    }
  }, {
    once: true
  });
}

function checkWinLose(guess, tiles) {
  return __awaiter(this, void 0, void 0,
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5() {
    var username, win, storeLetterArray, storeStateArray, SubmittedTiles, audio, _ref5, data, remainingTiles, _ref6, _data;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            username = storeUserName;
            //collecting user statistics
            storeLetterArray = [];
            storeStateArray = [];
            SubmittedTiles = _toConsumableArray(getSubmittedTiles());
            SubmittedTiles.forEach(function (tile) {
              storeLetterArray.push(tile.dataset.letter);
              storeStateArray.push(tile.dataset.state);
            });
            document.cookie = "letters= ".concat(storeLetterArray);
            document.cookie = "states= ".concat(storeStateArray);
            document.cookie = "submitted = ".concat(SubmittedTiles); //collecting user statistics

            if (!(guess === targetWord)) {
              _context5.next = 21;
              break;
            }

            showAlert("You win!", 5000);
            audio = new Audio('./sound/win.mp3');
            audio.play();
            danceTiles(tiles);
            stopInteraction();
            win = true;
            _context5.next = 17;
            return axios.patch('users/update-user', {
              win: win,
              attempts: attempts,
              username: username
            });

          case 17:
            _ref5 = _context5.sent;
            data = _ref5.data;
            setTimeout(function () {
              handleShowWindow('stats');
            }, 1500);
            return _context5.abrupt("return");

          case 21:
            remainingTiles = guessGrid.querySelectorAll(":not([data-letter])");

            if (!(remainingTiles.length === 0)) {
              _context5.next = 31;
              break;
            }

            showAlert("Word is:   " + targetWord.toUpperCase(), 7000);
            stopInteraction();
            win = false;
            _context5.next = 28;
            return axios.patch('users/update-user', {
              win: win,
              attempts: attempts,
              username: username
            });

          case 28:
            _ref6 = _context5.sent;
            _data = _ref6.data;
            setTimeout(function () {
              handleShowWindow('stats');
            }, 1500);

          case 31:
            renderStats(storeUserName);

          case 32:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
}

function danceTiles(tiles) {
  tiles.forEach(function (tile, index) {
    setTimeout(function () {
      tile.classList.add("dance");
      tile.addEventListener("animationend", function () {
        tile.classList.remove("dance");
      }, {
        once: true
      });
    }, index * DANCE_ANIMATION_DURATION / 5);
  });
}

function shakeTiles(tiles) {
  tiles.forEach(function (tile) {
    tile.classList.add("shake");
    tile.addEventListener("animationend", function () {
      tile.classList.remove("shake");
    }, {
      once: true
    });
  });
}

function showAlert(message) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
  var alert = document.createElement('div');
  alert.textContent = message;
  alert.classList.add("alert");
  alertContainer.prepend(alert);
  setTimeout(function () {
    alert.classList.add("alert-hide");
    alert.addEventListener("transitionend", function () {
      alert.remove();
    });
  }, duration);
}

function handleShowWindow(window) {
  handleLoadAllUsers();
  getNewWord();
  var stats = document.querySelector("#".concat(window));

  if (stats.style.display === "none") {
    stats.style.display = "block";
    stopInteraction();
  } else {
    stats.style.display = "none";
    startInteraction();
  }
}

function handleNotAMember() {
  var register = document.querySelector(".registerwrapper");
  var login = document.querySelector(".loginwrapper");
  register.style.display = 'block';
  login.style.display = 'none';
}

function handleAlreadyAMember() {
  var register = document.querySelector(".registerwrapper");
  var login = document.querySelector(".loginwrapper");
  register.style.display = 'none';
  login.style.display = 'block';
}

function handleRegister(ev) {
  return __awaiter(this, void 0, void 0,
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6() {
    var _ev$target$elements, username, password, confirmPassword, email, confirmEmail, _ref7, data;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            ev.preventDefault();
            _ev$target$elements = ev.target.elements, username = _ev$target$elements.username, password = _ev$target$elements.password, confirmPassword = _ev$target$elements.confirmPassword, email = _ev$target$elements.email, confirmEmail = _ev$target$elements.confirmEmail;
            username = username.value;
            password = password.value;
            confirmPassword = confirmPassword.value;
            email = email.value;
            confirmEmail = confirmEmail.value;

            if (password !== confirmPassword) {
              window.alert('passwords dont match');
            }

            if (email !== confirmEmail) {
              window.alert('emails dont match');
            }

            if (!(password === confirmPassword && email === confirmEmail)) {
              _context6.next = 17;
              break;
            }

            _context6.next = 13;
            return axios.post('users/add-user', {
              username: username,
              password: password,
              email: email
            });

          case 13:
            _ref7 = _context6.sent;
            data = _ref7.data;
            console.log(data);

            if (data === 'AlreadyUser') {
              showAlert('Username already taken');
            } else {
              ev.target.reset();
              loginPractice(username, password);
            }

          case 17:
            _context6.next = 22;
            break;

          case 19:
            _context6.prev = 19;
            _context6.t0 = _context6["catch"](0);
            console.log(_context6.t0);

          case 22:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 19]]);
  }));
}

function handleLogin(ev) {
  ev.preventDefault();
  var _ev$target$elements2 = ev.target.elements,
      username = _ev$target$elements2.username,
      password = _ev$target$elements2.password;
  username = username.value;
  password = password.value;
  ev.target.reset();
  loginPractice(username, password);
  var logOutDisply = document.querySelector("#logOutDisply");
  logOutDisply.style.display = 'block'; //  handleLoad()
}

function loginPractice(username, password) {
  return __awaiter(this, void 0, void 0,
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7() {
    var _ref8, data, greetings;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return axios.get("users/get-user?username=".concat(username, "&password=").concat(password));

          case 2:
            _ref8 = _context7.sent;
            data = _ref8.data;
            greetings = timeOfDay();

            if (data.user) {
              document.querySelector(".hello").innerHTML = "&nbsp;&nbsp;".concat(greetings, " <span style=\"color: green; font-weight: bolder;\">&nbsp;").concat(username, "</span>");
              handleShowWindow('logreg');
              storeUserName = username;
            } else if (data === 'nouser') {
              window.alert('Username doesnt exist');
            } else if (data.msg === 'nopass') {
              window.alert('Password doesnt match');
            }

            renderStats(storeUserName);

          case 7:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
}

function handleLogOut(username, password) {
  return __awaiter(this, void 0, void 0,
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8() {
    var _ref9, data, greetings;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            username = 'Guest';
            _context8.next = 3;
            return axios.get("users/get-out-user?username=".concat(username, "&password=").concat(password));

          case 3:
            _ref9 = _context8.sent;
            data = _ref9.data;
            greetings = timeOfDay();
            document.querySelector(".hello").innerHTML = "&nbsp;&nbsp;".concat(greetings, " <span style=\"color: green; font-weight: bolder;\">&nbsp;").concat(username, "</span>");
            window.location.reload();

          case 8:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
} // START countDownDate:


var today = new Date();
var tomorrow = new Date(today);
var tomorrowMidnight = tomorrow.setHours(24, 0, 0, 0);
var countDownDate = new Date(tomorrowMidnight).getTime();
var x = setInterval(function () {
  var now = new Date().getTime();
  var distance = countDownDate - now;
  var hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
  var minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
  var seconds = Math.floor(distance % (1000 * 60) / 1000);
  var twoDigitsHours = ("0" + hours).slice(-2);
  var twoDigitsMinutes = ("0" + minutes).slice(-2);
  var twoDigitsSeconds = ("0" + seconds).slice(-2);
  document.querySelector("#countdown").innerHTML = twoDigitsHours + ": " + twoDigitsMinutes + ": " + twoDigitsSeconds;
  return distance;
}, 1000); // END countDownDate
// START SHARE:

var shareData = {
  title: 'MY FUNDLE STATISTICS!',
  url: ''
};
var btn = document.querySelector('#share');
var resultPara = document.querySelector('.result');
btn.addEventListener('click', function () {
  return __awaiter(_this, void 0, void 0,
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9() {
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return navigator.share(shareData);

          case 3:
            resultPara.textContent = 'shared successfully';
            _context9.next = 9;
            break;

          case 6:
            _context9.prev = 6;
            _context9.t0 = _context9["catch"](0);
            resultPara.textContent = 'Error: ' + _context9.t0;

          case 9:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 6]]);
  }));
}); //   END SHARE

function renderStats(username) {
  return __awaiter(this, void 0, void 0,
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee10() {
    var _ref10, data, user, userPlayed, userWins, oneAttempt, twoAttempt, threeAttempt, fourAttempt, fiveAttempt, sixAttempt, average1, average2, average3, average4, average5, average6, winPerc, played, wins, current, max, oneattempt, twoattempts, threeattempts, fourattempts, fiveattempts, sixattempts;

    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            if (!username) {
              _context10.next = 47;
              break;
            }

            _context10.next = 3;
            return axios.get("users/get-user?username=".concat(username));

          case 3:
            _ref10 = _context10.sent;
            data = _ref10.data;
            user = data.user[0];
            userPlayed = user.played;
            userWins = user.wins;
            oneAttempt = user.oneattempt;
            twoAttempt = user.twoattempts;
            threeAttempt = user.threeattempts;
            fourAttempt = user.fourattempts;
            fiveAttempt = user.fiveattempts;
            sixAttempt = user.sixattempts;
            average1 = Math.floor(oneAttempt / userWins * 100);
            average2 = twoAttempt / userWins * 100;
            average3 = threeAttempt / userWins * 100;
            average4 = fourAttempt / userWins * 100;
            average5 = fiveAttempt / userWins * 100;
            average6 = sixAttempt / userWins * 100;
            winPerc = Math.floor(userWins / userPlayed * 100);
            played = document.querySelector("#played");
            wins = document.querySelector("#wins");
            current = document.querySelector("#current");
            max = document.querySelector("#max");
            played.innerHTML = "".concat(user.played);

            if (winPerc) {
              wins.innerHTML = "".concat(winPerc);
            } else wins.innerHTML = '0';

            current.innerHTML = "".concat(user.current_streak);
            max.innerHTML = "".concat(user.max_streak);
            oneattempt = document.querySelector("#oneattempt");
            twoattempts = document.querySelector("#twoattempts");
            threeattempts = document.querySelector("#threeattempts");
            fourattempts = document.querySelector("#fourattempts");
            fiveattempts = document.querySelector("#fiveattempts");
            sixattempts = document.querySelector("#sixattempts");
            oneattempt.style.width = "".concat(average1, "%");
            oneattempt.innerHTML = "".concat(oneAttempt);
            twoattempts.style.width = "".concat(average2, "%");
            twoattempts.innerHTML = "".concat(twoAttempt);
            threeattempts.style.width = "".concat(average3, "%");
            threeattempts.innerHTML = "".concat(threeAttempt);
            fourattempts.style.width = "".concat(average4, "%");
            fourattempts.innerHTML = "".concat(fourAttempt);
            fiveattempts.style.width = "".concat(average5, "%");
            fiveattempts.innerHTML = "".concat(fiveAttempt);
            sixattempts.style.width = "".concat(average6, "%");
            sixattempts.innerHTML = "".concat(sixAttempt);

          case 47:
            renderStats(storeUserName);

          case 48:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
}