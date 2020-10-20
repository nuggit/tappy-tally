var listener = new window.keypress.Listener();

var tallies = [];
var lastTally;

listener.simple_combo("num_7", () => increment(0));
listener.simple_combo("num_8", () => increment(1));
listener.simple_combo("num_9", () => increment(2));
listener.simple_combo("num_4", () => increment(3));
listener.simple_combo("num_5", () => increment(4));
listener.simple_combo("num_6", () => increment(5));

listener.simple_combo("u", () => undo());

function loadTallies() {
  tallies.forEach(item => load(item))
}
function load(tally)  {
    document.getElementById(tally.name).querySelector('.count').innerHTML = tally.count;
    document.getElementById(tally.name).querySelector('.name').innerHTML = tally.display;
}
function increment(index) {
  document.getElementById(tallies[index].name).querySelector('.count').innerHTML = ++tallies[index].count;
  post(index);
  lastTally = index;
}
function undo() {
  var index = lastTally;
  if (typeof index == 'undefined') return;
  document.getElementById(tallies[index].name).querySelector('.count').innerHTML = --tallies[index].count;
  post(index);
  lastTally = undefined;
}
function post(index) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", '/tally', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
      index, count: tallies[index].count
  }));
}

fetch("/tallies")
  .then(response => response.json())
  .then(result => {
    tallies = result;
    loadTallies();
  });
