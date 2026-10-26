/**
 * Simple queue implementation to replace the abandoned js-queue package.
 * Ensures tasks execute sequentially, one at a time.
 */
export class Queue {
  private tasks: Array<() => void> = [];
  private running = false;

  /**
   * Add a task to the queue. If the queue is idle, start processing.
   */
  add(task: () => void): void {
    this.tasks.push(task);
    if (!this.running) {
      this.next();
    }
  }

  /**
   * Process the next task in the queue.
   * Called internally and also by tasks when they complete (via `this.next()`).
   */
  next(): void {
    const task = this.tasks.shift();
    if (!task) {
      this.running = false;
      return;
    }

    this.running = true;
    task();
  }
}
