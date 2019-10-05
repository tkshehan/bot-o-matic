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
let $bots;

$(init);

function init() {
  $bots = $('.js-bots');
  buildTypes();
  buildListeners();
  setInterval(() => renderBots(), 100);
}

function buildTypes() {
  const $dropBox = $('select');
  for (let type of Object.keys(TYPES)) {
    const $option = $('<option>', {
      value: type,
      text: TYPES[type],
    });
    $dropBox.append($option);
  }
}

function buildListeners() {
  $('form').submit(function(event) {
    event.preventDefault();
    const name = $('#name').val();
    let type = $('#type').val();
    if (type === 'RANDOM') {
      const index = Math.floor(Math.random() * Object.keys(TYPES).length);
      type = Object.keys(TYPES)[index];
    }
    buildNewBot(name, type);
  });

  $('.js-assign').on('click', assignTasks);
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

  let timeLeft = Math.floor(robot.timeLeft);
  for (let robot of robots) {
    let classes = 'bot';
    if (robot.isActive) {
      classes += ' active'
    } else {
      timeLeft = '';
    }

    const botDiv = $('<div>', {
      class: classes,
      html: [
        $('<div>', {
          class: 'bot_info',
          html: [
            $('<h3>', {
              text: `${robot.name}`,
            }),
            $('<h5>', {
              text: `${robot.type}`,
            }),
          ]
        }),
        $('<p>', {
          class: 'bot_task',
          text: `${timeLeft} ${robot.currentTask()}`,
        }),
        $('<p>', {
          class: 'bot_completed',
          text: `${robot.completed.length} / ${robot.completed.length + robot.tasks.length}`
        }),
      ],
    });
    renderList.push(botDiv);
  }

  $bots.html(renderList);
}
