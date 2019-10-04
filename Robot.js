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

class Robot {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    console.log(`New Bot Created: ${name} the ${type}`);
    this.initializeTasks();
  }

  async initializeTasks() {
    this.tasks = [...Array(5)].map(() => {
      const index = Math.floor(Math.random() * TASKS.length);
      return TASKS[index];
    });

    for (let task of this.tasks) {
      task.completed = false;
      console.log(
        `${this.name} has begun: ${task.description}, eta: ${task.eta / 1000} seconds `
      );
      await this.startTask(task);
      task.completed = true;
      console.log(`${this.name} has completed: ${task.description}`);
    }
  }

  startTask(task) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(task);
      }, task.eta);
    });
  }

}