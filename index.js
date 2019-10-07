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
  // keep section to be reused regularly
  botSection = document.querySelector('.js-bots');
  buildTypes();
  buildListeners();
  setInterval(() => updateBotInfo(), 200);
}

function buildTypes() {
  const dropBox = document.querySelector('select');
  for (let type of Object.keys(TYPES)) {
    const option = document.createElement('option');
    option.classList.add(type);
    option.innerHTML = TYPES[type];
    dropBox.appendChild(option);
  }
}

function buildListeners() {
  // Add Bot button
  document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.querySelector('#name').value;
    let type = document.querySelector('#type').value;
    if (type === 'RANDOM') {
      const index = Math.floor(Math.random() * Object.keys(TYPES).length);
      type = Object.keys(TYPES)[index];
    }
    buildNewBot(name, type);
    renderBots();
  });

  // AssignAll(1) button
  document.querySelector('.js-assign').addEventListener('click', () => {
    event.preventDefault();
    robots.forEach((robot) => assignTask(robot));
  });

  // Assign(1) button
  botSection.addEventListener('click', (event) => {
    if (event.target.classList.contains('js-single-task-btn')) {
      const targetBot = robots.find(
        (bot) => bot.name === event.target.dataset.name
      );
      assignTask(targetBot);
    }
  });
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
  assignTask(newBot, 5);
}

function assignTask(robot, num = 1) {
  for (let i = 0; i < num; i++) {
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
    <div class="${classNames}" data-name="${robot.name}">
      <div class="bot_info">
        <h3>${robot.name}</h3>
        <h5>${robot.type}</h5>
      </div>
      <p class="bot_task js-time-left">${timeLeft} ${robot.currentTask()} </p>
      <p class= "bot_completed js-tasks-completed">
        ${robot.completed.length} / ${robot.completed.length + robot.tasks.length}
      </p>
      <button class="js-single-task-btn" data-name="${robot.name}">Assign(1)</button>
    </div>
      `);
    renderList.push(botDiv);
  }
  botSection.innerHTML = renderList.join('');
}

function updateBotInfo() {
  const botDivs = document.querySelectorAll('.bot');

  for (let div of botDivs) {
    const robot = robots.find((robot) => robot.name === div.dataset.name);

    // Match div class to robot activity
    if (robot.isActive && !div.classList.contains('active')) {
      div.classList.add('active');
    }
    if (!robot.isActive && div.classList.contains('active')) {
      div.classList.remove('active');
    }

    // Update time left on current task
    div.querySelector('.js-time-left')
      .innerHTML = `${Math.floor(robot.timeLeft)} ${robot.currentTask()}`;

    // Update task completion tracking
    div.querySelector('.js-tasks-completed')
      .innerHTML = `${robot.completed.length} / ${robot.completed.length + robot.tasks.length}`;
  }

}