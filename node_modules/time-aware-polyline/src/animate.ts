import {PolylineUtils} from "./polyline";
import {ITimeAwarePoint, HtPosition} from "ht-models";

export class TimeAwareAnimation {
  polylineUtils: PolylineUtils = new PolylineUtils();
  currentTime: string;
  animationPoll;
  animationSpeed: number = 20;
  animationProps = {speedScale: 1, interval: 20};
  updateEvent =  new CustomEvent();
  constructor() {

  }

  /*
  Update animation from encoded polyline string
  */
  updatePolylineString(timeAwarePolylineString: string) {
    let timeAwarePolyline = this.polylineUtils.encoder.decodeTimeAwarePolyline(timeAwarePolylineString);
    this.update(timeAwarePolyline)
  }

  /*
  Update animation from encoded time aware array [lat, lng, time]
   */
  update(timeAwarePolyline: ITimeAwarePoint[]) {
    if (!timeAwarePolyline) {
      this.clear();
      return true;

    };
    this.polylineUtils.timeAwarePolyline = timeAwarePolyline;
    if(!this.animationPoll) this.handleAnimation(timeAwarePolyline);
  }


  private handleAnimation(timeAwarePolyline: ITimeAwarePoint[]) {
    if (!timeAwarePolyline) return;
    if(this.animationPoll) this.clearAnimationPoll();
    this.updateCurrentTime();
    this.setPathBearing();
    this.animationPoll = setInterval(() => {
      this.updateCurrentTime();
      this.setPathBearing();
    }, this.animationSpeed)
  }

  private updateCurrentTime() {
    if (this.currentTime) {
      let timeToAdd = this.getTimeToAdd();
      this.currentTime = this.addISOTime(this.currentTime, timeToAdd);
    } else {
      let last = this.polylineUtils.getLatestTime();
      const delay = new Date().getTime() - new Date(last).getTime();
      const timeToAdd =  delay > 15*60*1000 ? 0 : -20000;
      this.currentTime = this.addISOTime(last, timeToAdd);
    }
    this.capTime(() => {
      this.clearAnimationPoll()
    });
  }

  private setPathBearing() {
    let {path, bearing} = this.currentTimePolylineData();
    this.updatePathBearing(path, bearing);
    this.updateEvent.publish('update', {path, bearing, time: this.currentTime})
  };

  updatePathBearing(path, bearing) {

  }

  private capTime(callback?): boolean {
    if(new Date(this.currentTime) > new Date(this.polylineUtils.getLatestTime())) {
      this.currentTime = this.polylineUtils.getLatestTime();
      if(callback && typeof callback == 'function') callback();
      return true
    } else {
      return false;
    }
  }

  clearAnimationPoll() {
    clearInterval(this.animationPoll);
    this.animationPoll = null;
  }

  private getTimeToAdd(): number {
    let lastTime = new Date(this.polylineUtils.getLatestTime()).getTime();
    let currentTime = new Date(this.currentTime).getTime();
    let totalDuration = (lastTime - currentTime)/ 1000;
    let factor = 1;
    if(typeof totalDuration == 'number') {
      let mid = 5;
      let power = 2;
      if(totalDuration > mid) {
        factor = Math.pow(totalDuration, power) / Math.pow(mid, power);
      }
    }
    return factor * this.animationProps.interval;
  }

  private currentTimePolylineData(): {path: HtPosition[], bearing: number} {
    let polylineData = this.polylineUtils.getPolylineToTime(this.currentTime);
    let path = polylineData.path.map((array) => {
      return {lat: array[0], lng: array[1]};
    });
    return {path: path, bearing: polylineData.bearing}
  }
  

  clear() {
    this.clearAnimationPoll();
  };

  private addISOTime (time: string, timeToAdd: number): string {
    return new Date(new Date(time).getTime() + timeToAdd).toISOString()
  };
}

export class CustomEvent {
  topics = {};
  hOP = this.topics.hasOwnProperty;

  publish(topic, info) {
    // If the topic doesn't exist, or there's no listeners in queue, just leave
    if(!this.hOP.call(this.topics, topic)) return;

    // Cycle through topics queue, fire!
    this.topics[topic].forEach(function(item) {
      item(info != undefined ? info : {});
    });
  }

  subscribe(topic, listener) {
    // Create the topic's object if not yet created
    if(!this.hOP.call(this.topics, topic)) this.topics[topic] = [];

    // Add the listener to queue
    var index = this.topics[topic].push(listener) -1;

    // Provide handle back for removal of topic
    return {
      unsubscribe: function() {
        delete this.topics[topic][index];
      }
    };
  }
};

// export interface IPathBearing {
//   path: HtPosition[],
//   bearing: number,
// }

