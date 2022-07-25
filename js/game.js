var plays = 0;

var initGame = () => filterCards(howMany());

var howMany = () => prompt("With how many cards you wish to play with?");

var filterCards = number =>
    (number % 2 === 0 && (number >= 4 && number <= 14)) ?
    createCards(number) :
    initGame();

var querier = (e) => document.querySelector(e);
var populateWith = (e) => (li) => e.appendChild(li.cloneNode(true));
var addTime = () => {
    var span = querier("span");
    var time =parseFloat(span.textContent);
    time = time + 1;
    span.innerHTML = time;
};

var initTimer = () => setInterval(addTime,1000);

var ul = querier('ul');
let li = document.createElement('li');
var querierAll = s => document.querySelectorAll(s);

var populate = (number) => {
    for (var i = 0; i < number; i++) {
        populateWith(ul)(li);
        if (i === number - 1) {
            var cards = querierAll("li");
            var assignId = e => identity => e.id = `card${identity}`;
            var assignIdAll = (number) => {
                let indexArray = Array.from(Array(number / 2).keys());
                let indexShuffled = shuffleArray(indexArray);
                for (var i = 0; i < number / 2; i++) {
                    assignId(cards[i])(indexShuffled[i]);
                }
                indexShuffled = shuffleArray(indexShuffled);
                for (var j = number / 2; j < number; j++) {
                    assignId(cards[j])(indexShuffled[j - number / 2]);
                }
            };
            assignIdAll(number);
            initTimer();
        }
    }
};


// Snippet from https://www.w3docs.com/snippets/javascript/how-to-randomize-shuffle-a-javascript-array.html
function shuffleArray(array) {
    let curId = array.length;
    // There remain elements to shuffle
    while (0 !== curId) {
        // Pick a remaining element
        let randId = Math.floor(Math.random() * curId);
        curId -= 1;
        // Swap it with the current element.
        let tmp = array[curId];
        array[curId] = array[randId];
        array[randId] = tmp;
    }
    return array;
}

var createCards = (number) => populate(number);
initGame();
const cards = querierAll("li");
var remover = e => c => e.classList.remove(c);
var cons = e => c => e.classList.add(c);

function countPlay(){
    plays += 1;
}

var twoActiveP = (active) => {
    cards.forEach((card) => {
	if (active.length === 2) {
	    permanentP(active);
	    active.forEach(a => remover(a)("active"));
	};
    });
};

function select(e) {
    let active = querierAll(".active");
    setTimeout(twoActiveP(active), 30000);
    cons(this)("active");
    active = querierAll(".active");   
    if (endP()) {
        alert("You did it, with " + (plays+2)/2 + " plays!");
        againP();
    }
    var unturnP = () => twoActiveP(active);
    setTimeout(unturnP, 1000);
    countPlay();
};

var endInteration = () => {
    cards.forEach((card) => {
        card.removeEventListener("click", select);
    });
};

var beginInteration = () => {
    cards.forEach((card) => {
        card.addEventListener("click", select);
    });
};

beginInteration();

var test_changeActive = property => query =>
    (query[0].id === query[1].id ?
     query.forEach(q => cons(q)(property)) :
     query.forEach(q => remover(q)(property)));

var permanentP = test_changeActive("permanent");
var endP = () => (cards.length === querierAll(".permanent").length + 2);
var againP = () =>
    (prompt("Wanna play again? (yes/no)") === "yes") ?
    location.reload() :
    endInterationAlert("Ok. You will be on stand by! Or refesh the browser to play again.");

var endInterationAlert = message => {
    alert(message);
    endInteration();
};
