const instance: timerWorkerManager | null = null;

export class timerWorkerManager {
  private worker: Worker;

  private constructor() {
    this.worker = new Worker(new URL("./timeWorker.js", import.meta.url));
  }

  static getInstance(): timerWorkerManager {
    if (!instance) {
      return new timerWorkerManager();
    }
    return instance;
  }

  postMessage(message: any) {
    this.worker.postMessage(message);
  }
  onMessage(callback: (event: MessageEvent) => void): void {
    this.worker.onmessage = callback;
  }
  terminate() {
    this.worker.terminate();
    instance = null;
  }
}
