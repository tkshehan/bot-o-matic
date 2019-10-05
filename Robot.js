class Robot {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.tasks = [];
    this.completed = [];
    this.isActive = false;
    this.timeLeft = -1;

    console.log(`New Bot Created: ${name} the ${type}`);
  }

  currentTask() {
    if (this.tasks.length === 0) return 'All Tasks Complete';

    return `${this.tasks[0].description}`
  }

  assignTask(newTask) {
    this.tasks.push(newTask);
    console.log(`${this.name} has accepted ${newTask.description}`);
    if (this.isActive) return;
    this.activate();
  }

  async activate() {
    this.isActive = true;
    while (this.tasks.length > 0) {
      const task = this.tasks[0];
      console.log(
        `${this.name} has begun: ${task.description}, eta: ${task.eta / 1000} seconds `
      );
      await this.startTimer(task.eta);
      // Move the first task in this.tasks to the completed tasks
      const numTasks = this.tasks.length - 1;
      console.log(
        `${this.name} has completed: ${task.description}\n ${numTasks} task${numTasks !== 1 ? 's' : ''} left in queue`);
      this.completed.push(this.tasks.shift());
    }

    this.isActive = false;
    console.log(`${this.name} the ${this.type} has completed all tasks!`);
  }

  startTimer(milliseconds) {
    this.timeLeft = milliseconds / 1000;
    return new Promise(resolve => {
      const timer = setInterval(() => {
        this.timeLeft -= 0.1;
        if (this.timeLeft < 0) {
          this.timeLeft = -1;
          clearInterval(timer);
          resolve(true);
        }
      }, 100);

    })
  }

}