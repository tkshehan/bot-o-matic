const TYPES = {
  UNIPEDAL: 'Unipedal',
  BIPEDAL: 'Bipedal',
  QUADRUPEDAL: 'Quadrupedal',
  ARACHNID: 'Arachnid',
  RADIAL: 'Radial',
  AERONAUTICAL: 'Aeronautical'
};

const robots = {};

$(init);

function init() {
  buildTypes();
  buildListeners();
}

function buildTypes() {
  const $dropBox = $('select');
  for (type of Object.keys(TYPES)) {
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
}

function buildNewBot(name, type) {
  //Check to see if bot of same name already exists
  if (Object.keys(robots).includes(name)) {
    console.error('Robot Already Exists');
    return;
  }

  const newBot = new Robot(name, TYPES[type]);
  robots[name] = newBot;
}
