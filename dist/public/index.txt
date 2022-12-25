var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const WORD_LENGTH = 5;
const FLIP_ANIMATION_DURATION = 250;
const DANCE_ANIMATION_DURATION = 500;
const keyboard = document.querySelector("[data-keyboard]");
const guessGrid = document.querySelector("[data-guess-grid]");
const alertContainer = document.querySelector("[data-alert-container]");
let attempts = 0;
let storeUserName = '';
let targetWord = '';
let i = '';
// const dayOffset = Math.floor(Math.random() * 2315)
handleLoad();
handleLoadAllUsers();
function handleLoadAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const { data } = yield axios.get(`users/load-all-users`);
        const usersStats = [];
        data.forEach(element => {
            let name = element.username;
            let wins = element.wins;
            let played = element.played;
            usersStats.push({ name, played, wins });
        });
        usersStats.sort(function (a, b) {
            return b.wins - a.wins;
        });
        let numbering = 0;
        let lightness = 50;
        let html = '';
        usersStats.forEach(user => {
            numbering += 1;
            lightness += 5;
            html += ` <div>
        <div class="usersStats" style="background-color: hsl(46, 70%, ${lightness}%);"><span style="color: #135e7c; font-weight: bold;">${numbering}. ${user.name}</span> ${user.wins}/${user.played} (${((user.wins / user.played) * 100).toFixed(1)})%</div></br>
        </div>`;
        });
        document.getElementById('userRoot').innerHTML = html;
    });
}
function handleLoad() {
    return __awaiter(this, void 0, void 0, function* () {
        const { data } = yield axios.get(`users/load-user`);
        if (data.username !== 'Guest') {
            storeUserName = data.username;
            renderStats(storeUserName);
            const greetings = timeOfDay();
            document.querySelector(".hello").innerHTML = `&nbsp;&nbsp;${greetings} <span style="color: green;">&nbsp;${storeUserName}</span>`;
            const logOutDisply = document.querySelector("#logOutDisply");
            logOutDisply.style.display = 'block';
            getNewWord();
        }
        else {
            const greetings = timeOfDay();
            document.querySelector(".hello").innerHTML = `&nbsp;&nbsp;${greetings} <span style="color: green;">&nbsp;${'Guest'}</span>`;
            handleShowWindow('logreg');
        }
        //consol log user statistics (document.cookie defined down)
        // console.log('handleLoad-cookies', document.cookie)
    });
}
function getNewWord() {
    return __awaiter(this, void 0, void 0, function* () {
        showAlert("Let's Start !");
        let lettersOn = document.querySelectorAll(".letterbox");
        lettersOn.forEach(element => {
            element.removeAttribute('data-state');
            element.removeAttribute('data-letter');
            element.innerHTML = "";
        });
        let keysOn = document.querySelectorAll("#keyOn");
        keysOn.forEach(element => {
            element.className = "key";
        });
        let offsetFromDate = new Date(2022, 0, i++);
        let msOffset = Date.now() - offsetFromDate;
        let dayOffset = Math.floor(msOffset / 1000 / 60 / 60 / 24);
        console.log(dayOffset);
        // dayOffset++
        document.cookie = `wordInfo= ${targetWord}`;
        const { data } = yield axios.get(`words/get-word?dayOffset=${dayOffset}`);
        targetWord = data[0].word;
        console.log("today's word is: " + targetWord);
    });
}
// async function handleNewGame(event){
//     dayOffset++
//     const { data } = await axios.get(`words/get-word?dayOffset=${dayOffset}`)
//     targetWord = data[0].word
//     console.log(dayOffset)
//     console.log("new word is: " + targetWord)
// }
function tabIndex() {
    const eyeImg = document.querySelectorAll('#eyeImg');
    eyeImg.forEach((img) => {
        img.tabIndex = -2;
    });
}
tabIndex();
function handlePassToggle() {
    const password = document.querySelectorAll('.passip');
    password.forEach((input) => {
        if (input.type === 'password') {
            input.type = "text";
        }
        else {
            input.type = "password";
        }
    });
}
function timeOfDay() {
    let realtoday = new Date();
    let realtime = realtoday.getHours();
    if ((realtime >= 0 && realtime <= 5) || (realtime >= 22 && realtime <= 24)) {
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
    const activeTiles = getActiveTiles();
    if (activeTiles.length >= WORD_LENGTH)
        return;
    const nextTile = guessGrid.querySelector(":not([data-letter])");
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
    const activeTiles = getActiveTiles();
    const lastTile = activeTiles[activeTiles.length - 1];
    if (lastTile) {
        lastTile.removeAttribute("data-state");
        lastTile.removeAttribute("data-letter");
        lastTile.textContent = '';
    }
    else {
        return;
    }
}
function submitGuess() {
    return __awaiter(this, void 0, void 0, function* () {
        const activeTiles = [...getActiveTiles()];
        if (activeTiles.length !== WORD_LENGTH) {
            showAlert('Not enough letters');
            shakeTiles(activeTiles);
            return;
        }
        const guess = activeTiles.reduce((word, tile) => {
            return word + tile.dataset.letter;
        }, "");
        const { data } = yield axios.get(`words/get-guessCheck?guess=${guess}`);
        if (!data.found) {
            showAlert("Not in word list");
            shakeTiles(activeTiles);
            return;
        }
        stopInteraction();
        activeTiles.forEach((...params) => flipTile(...params, guess));
        attempts++;
    });
}
function flipTile(tile, index, array, guess) {
    const letter = tile.dataset.letter;
    const key = keyboard.querySelector(`[data-key="${letter.toUpperCase()}"]`);
    setTimeout(() => {
        let audio = new Audio('./sound/ding.mp3');
        audio.volume = 0.2;
        audio.play();
        tile.classList.add("flip");
    }, index * FLIP_ANIMATION_DURATION);
    tile.addEventListener("transitionend", () => {
        tile.classList.remove("flip");
        if (targetWord[index] === letter) {
            tile.dataset.state = 'correct';
            key.classList.add("correct");
        }
        else if (targetWord.includes(letter)) {
            tile.dataset.state = 'wrong-location';
            key.classList.add("wrong-location");
        }
        else {
            tile.dataset.state = 'wrong';
            key.classList.add("wrong");
        }
        if (index === array.length - 1) {
            tile.addEventListener("transitionend", () => {
                startInteraction();
                checkWinLose(guess, array);
            }, { once: true });
        }
    }, { once: true });
}
function checkWinLose(guess, tiles) {
    return __awaiter(this, void 0, void 0, function* () {
        let username = storeUserName;
        let win;
        //collecting user statistics
        let storeLetterArray = [];
        let storeStateArray = [];
        const SubmittedTiles = [...getSubmittedTiles()];
        SubmittedTiles.forEach((tile) => {
            storeLetterArray.push(tile.dataset.letter);
            storeStateArray.push(tile.dataset.state);
        });
        document.cookie = `letters= ${storeLetterArray}`;
        document.cookie = `states= ${storeStateArray}`;
        document.cookie = `submitted = ${SubmittedTiles}`;
        //collecting user statistics
        if (guess === targetWord) {
            showAlert("You win!", 5000);
            let audio = new Audio('./sound/win.mp3');
            audio.play();
            danceTiles(tiles);
            stopInteraction();
            win = true;
            const { data } = yield axios.patch('users/update-user', { win, attempts, username });
            setTimeout(() => {
                handleShowWindow('stats');
            }, 1500);
            return;
        }
        const remainingTiles = guessGrid.querySelectorAll(":not([data-letter])");
        if (remainingTiles.length === 0) {
            showAlert("Word is:   " + targetWord.toUpperCase(), 7000);
            stopInteraction();
            win = false;
            const { data } = yield axios.patch('users/update-user', { win, attempts, username });
            setTimeout(() => {
                handleShowWindow('stats');
            }, 1500);
        }
        renderStats(storeUserName);
    });
}
function danceTiles(tiles) {
    tiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add("dance");
            tile.addEventListener("animationend", () => {
                tile.classList.remove("dance");
            }, { once: true });
        }, (index * DANCE_ANIMATION_DURATION) / 5);
    });
}
function shakeTiles(tiles) {
    tiles.forEach((tile) => {
        tile.classList.add("shake");
        tile.addEventListener("animationend", () => {
            tile.classList.remove("shake");
        }, { once: true });
    });
}
function showAlert(message, duration = 1000) {
    const alert = document.createElement('div');
    alert.textContent = message;
    alert.classList.add("alert");
    alertContainer.prepend(alert);
    setTimeout(() => {
        alert.classList.add("alert-hide");
        alert.addEventListener("transitionend", () => {
            alert.remove();
        });
    }, duration);
}
function handleShowWindow(window) {
    handleLoadAllUsers();
    getNewWord();
    const stats = document.querySelector(`#${window}`);
    if (stats.style.display === "none") {
        stats.style.display = "block";
        stopInteraction();
    }
    else {
        stats.style.display = "none";
        startInteraction();
    }
}
function handleNotAMember() {
    const register = document.querySelector(".registerwrapper");
    const login = document.querySelector(".loginwrapper");
    register.style.display = 'block';
    login.style.display = 'none';
}
function handleAlreadyAMember() {
    const register = document.querySelector(".registerwrapper");
    const login = document.querySelector(".loginwrapper");
    register.style.display = 'none';
    login.style.display = 'block';
}
function handleRegister(ev) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            ev.preventDefault();
            let { username, password, confirmPassword, email, confirmEmail } = ev.target.elements;
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
            if (password === confirmPassword && email === confirmEmail) {
                const { data } = yield axios.post('users/add-user', { username, password, email });
                console.log(data);
                if (data === 'AlreadyUser') {
                    showAlert('Username already taken');
                }
                else {
                    ev.target.reset();
                    loginPractice(username, password);
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
function handleLogin(ev) {
    ev.preventDefault();
    let { username, password } = ev.target.elements;
    username = username.value;
    password = password.value;
    ev.target.reset();
    loginPractice(username, password);
    const logOutDisply = document.querySelector("#logOutDisply");
    logOutDisply.style.display = 'block';
    //  handleLoad()
}
function loginPractice(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data } = yield axios.get(`users/get-user?username=${username}&password=${password}`);
        const greetings = timeOfDay();
        if (data.user) {
            document.querySelector(".hello").innerHTML = `&nbsp;&nbsp;${greetings} <span style="color: green; font-weight: bolder;">&nbsp;${username}</span>`;
            handleShowWindow('logreg');
            storeUserName = username;
        }
        else if (data === 'nouser') {
            window.alert('Username doesnt exist');
        }
        else if (data.msg === 'nopass') {
            window.alert('Password doesnt match');
        }
        renderStats(storeUserName);
    });
}
function handleLogOut(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        username = 'Guest';
        const { data } = yield axios.get(`users/get-out-user?username=${username}&password=${password}`);
        const greetings = timeOfDay();
        document.querySelector(".hello").innerHTML = `&nbsp;&nbsp;${greetings} <span style="color: green; font-weight: bolder;">&nbsp;${username}</span>`;
        window.location.reload();
    });
}
// START countDownDate:
let today = new Date();
let tomorrow = new Date(today);
let tomorrowMidnight = tomorrow.setHours(24, 0, 0, 0);
let countDownDate = new Date(tomorrowMidnight).getTime();
let x = setInterval(function () {
    let now = new Date().getTime();
    let distance = countDownDate - now;
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    let twoDigitsHours = ("0" + hours).slice(-2);
    let twoDigitsMinutes = ("0" + minutes).slice(-2);
    let twoDigitsSeconds = ("0" + seconds).slice(-2);
    document.querySelector("#countdown").innerHTML = twoDigitsHours + ": "
        + twoDigitsMinutes + ": " + twoDigitsSeconds;
    return distance;
}, 1000);
// END countDownDate
// START SHARE:
const shareData = {
    title: 'MY FUNDLE STATISTICS!',
    url: ''
};
const btn = document.querySelector('#share');
const resultPara = document.querySelector('.result');
btn.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
    try {
        yield navigator.share(shareData);
        resultPara.textContent = 'shared successfully';
    }
    catch (err) {
        resultPara.textContent = 'Error: ' + err;
    }
}));
//   END SHARE
function renderStats(username) {
    return __awaiter(this, void 0, void 0, function* () {
        if (username) {
            const { data } = yield axios.get(`users/get-user?username=${username}`);
            const user = data.user[0];
            const userPlayed = user.played;
            const userWins = user.wins;
            const oneAttempt = user.oneattempt;
            const twoAttempt = user.twoattempts;
            const threeAttempt = user.threeattempts;
            const fourAttempt = user.fourattempts;
            const fiveAttempt = user.fiveattempts;
            const sixAttempt = user.sixattempts;
            const average1 = Math.floor(oneAttempt / userWins * 100);
            const average2 = twoAttempt / userWins * 100;
            const average3 = threeAttempt / userWins * 100;
            const average4 = fourAttempt / userWins * 100;
            const average5 = fiveAttempt / userWins * 100;
            const average6 = sixAttempt / userWins * 100;
            const winPerc = Math.floor((userWins / userPlayed) * 100);
            const played = document.querySelector("#played");
            const wins = document.querySelector("#wins");
            const current = document.querySelector("#current");
            const max = document.querySelector("#max");
            played.innerHTML = `${user.played}`;
            if (winPerc) {
                wins.innerHTML = `${winPerc}`;
            }
            else
                (wins.innerHTML = '0');
            current.innerHTML = `${user.current_streak}`;
            max.innerHTML = `${user.max_streak}`;
            const oneattempt = document.querySelector("#oneattempt");
            const twoattempts = document.querySelector("#twoattempts");
            const threeattempts = document.querySelector("#threeattempts");
            const fourattempts = document.querySelector("#fourattempts");
            const fiveattempts = document.querySelector("#fiveattempts");
            const sixattempts = document.querySelector("#sixattempts");
            oneattempt.style.width = `${average1}%`;
            oneattempt.innerHTML = `${oneAttempt}`;
            twoattempts.style.width = `${average2}%`;
            twoattempts.innerHTML = `${twoAttempt}`;
            threeattempts.style.width = `${average3}%`;
            threeattempts.innerHTML = `${threeAttempt}`;
            fourattempts.style.width = `${average4}%`;
            fourattempts.innerHTML = `${fourAttempt}`;
            fiveattempts.style.width = `${average5}%`;
            fiveattempts.innerHTML = `${fiveAttempt}`;
            sixattempts.style.width = `${average6}%`;
            sixattempts.innerHTML = `${sixAttempt}`;
        }
        renderStats(storeUserName);
    });
}
//# sourceMappingURL=index.js.map