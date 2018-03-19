export class ReplayPlayer {
  constructor(options) {}

  jumpTo(timePercent: number) {
    if (timePercent < 0) timePercent = 0;
    if (timePercent > 100) timePercent = 100;
  }

  jumpToTime(time: string) {}
}
