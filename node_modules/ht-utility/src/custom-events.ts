export class HtCustomEvent {
  private topics = {};
  private hOP = this.topics.hasOwnProperty;

  next(topic: string, info: any) {
    // If the topic doesn't exist, or there's no listeners in queue, just leave
    if(!this.hOP.call(this.topics, topic)) return;

    // Cycle through topics queue, fire!
    this.topics[topic].forEach(function(item) {
      item(info != undefined ? info : {});
    });
  }

  subscribe(topic: string, listener: (...args: any[]) => void): IEventSub {
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

export interface IEventSub {
  unsubscribe: () => void
}