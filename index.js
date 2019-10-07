const TYPES = {
  UNIPEDAL: 'Unipedal',
  BIPEDAL: 'Bipedal',
  QUADRUPEDAL: 'Quadrupedal',
  ARACHNID: 'Arachnid',
  RADIAL: 'Radial',
  AERONAUTICAL: 'Aeronautical'
};

const TASKS = [
  {
    description: 'do the dishes',
    eta: 1000,
  }, {
    description: 'sweep the house',
    eta: 3000,
  }, {
    description: 'do the laundry',
    eta: 10000,
  }, {
    description: 'take out the recycling',
    eta: 4000,
  }, {
    description: 'make a sammich',
    eta: 7000,
  }, {
    description: 'mow the lawn',
    eta: 20000,
  }, {
    description: 'rake the leaves',
    eta: 18000,
  }, {
    description: 'give the dog a bath',
    eta: 14500,
  }, {
    description: 'bake some cookies',
    eta: 8000,
  }, {
    description: 'wash the car',
    eta: 20000,
  },
];

const robots = [];
const names = [];
let botSection;

const ready = function(fn) {
  // If document is already loaded, run method
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    return fn();
  }

  // Otherwise, wait until document is loaded
  document.addEventListener('DOMContentLoaded', fn, false);
};

ready(init);

function init() {
  botSection = document.querySelector('.js-bots');
  buildTypes();
  buildListeners();
  setInterval(() => renderBots(), 100);
}

function buildTypes() {
  const dropBox = document.querySelector('select');
  for (let type of Object.keys(TYPES)) {
    const option = document.createElement('option');
    option.classList.add(type);
    option.innerHTML = TYPES[type];
    // const option = `<option value="${type}">${TYPES[type]}</option>`;
    dropBox.appendChild(option);
  }
}

function buildListeners() {
  document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.querySelector('#name').value;
    let type = document.querySelector('#type').value;
    if (type === 'RANDOM') {
      const index = Math.floor(Math.random() * Object.keys(TYPES).length);
      type = Object.keys(TYPES)[index];
    }
    buildNewBot(name, type);
  });

  document.querySelector('.js-assign').addEventListener('click', assignTasks);
}

function buildNewBot(name, type) {
  //Check to see if bot of same name already exists
  if (names.includes(name)) {
    console.error('Robot Already Exists');
    return;
  }

  const newBot = new Robot(name, TYPES[type]);
  robots.push(newBot);
  names.push(name);
}

function assignTasks() {
  event.preventDefault();
  for (let robot of robots) {
    const index = Math.floor(Math.random() * TASKS.length);
    robot.assignTask(TASKS[index]);
  }
}

function renderBots() {
  const renderList = [];

  for (let robot of robots) {
    let timeLeft = Math.floor(robot.timeLeft);
    let classNames = 'bot';
    if (robot.isActive) {
      classNames += ' active'
    } else {
      timeLeft = '';
    }

    const botDiv = (`
    <div class="${classNames}">
      <div class="bot_info">
        <h3>${robot.name}</h3>
        <h5>${robot.type}</h5>
      </div>
      <p class="bot_task">${timeLeft} ${robot.currentTask()} </p>
      <p class= "bot_completed">
        ${robot.completed.length} / ${robot.completed.length + robot.tasks.length}
      </p>
    </div>
      `);
    renderList.push(botDiv);
  }

  botSection.innerHTML = renderList.join('');
}
