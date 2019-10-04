

class Robot {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.tasks = [];
    this.completed = [];
    this.active = false;

    console.log(`New Bot Created: ${name} the ${type}`);
  }

  assignTask(newTask) {
    this.tasks.push(newTask);
    if (this.active) return;
    this.activate();
  }

  async activate() {
    this.active = true;
    while (this.tasks.length > 0) {
      const task = this.tasks[0];
      console.log(
        `${this.name} has begun: ${task.description}, eta: ${task.eta / 1000} seconds `
      );
      await this.startTask(task);
      // Move the first task in this.tasks to the completed tasks
      console.log(`${this.name} has completed: ${task.description}`);
      this.completed.push(this.tasks.shift());
    }
    this.active = false;
    console.log(`${this.name} the ${this.type} has completed all tasks!`);
  }

  startTask(task) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(task);
      }, task.eta);
    });
  }

}