export default class FunctionLooper {
  protected isTerminating = false;
  private timerId: any;
  private func: any;
  private currentMs: any;
  private ms: any;

  public async loopFunc(func, ms = 5000) {
    this.func = func;
    this.ms = ms;
    this.currentMs = ms;
    const wrap = () => {
      this.loopFunc(this.func, this.ms);
    };

    try {
      if (this.isTerminating) {
        return;
      }

      this.currentMs = (await this.func()) ? 0 : this.ms;

      this.timerId = setTimeout(wrap, this.currentMs);
    } catch (e) {
      this.timerId = setTimeout(wrap, this.currentMs);
    }
  }

  public stop() {
    this.isTerminating = true;
    clearTimeout(this.timerId);
  }
}
