import {Command} from "./Command";

class CommandQueue {
    private queue: Command[] = [];

    add(command: Command): void {
      this.queue.push(command);
      command.execute();
    }

    isAllExecuted(): boolean {
      return this.queue[this.queue.length - 1].isExecuted;
    }
}

const instance = Object.freeze(new CommandQueue());

export default instance;
