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

$(init);

function init() {
  buildTypes();
  buildListeners();
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
    const type = $('#type').val();
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

// this.tasks = [...Array(5)].map(() => {
//   const index = Math.floor(Math.random() * TASKS.length);
//   return TASKS[index];
// });