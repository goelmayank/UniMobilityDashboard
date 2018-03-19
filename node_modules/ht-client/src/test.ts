import { applyMixins } from "./helpers/mix";

export const listF = () => {
  const state = {
    name: "list",
    hi: () => {}
  };

  return {
    ...state,
    ...sayHi(state),
    ...setName(state),
    ...excl(state)
  };
};

export const sayHi = state => ({
  hi: () => {
    return "hi " + state.name;
  }
});
export const setName = state => ({
  set: name => {
    state.name = name;
  }
});
export const excl = state => ({
  ex: () => {
    // console.log(state);
    return `${state.hi()}!`;
  }
});

export class Main implements Base, Ex, Ex2 {
  name = "test";
  say;
  exc;
  comp;
  log;
}

export class Base {
  name: string;
  say() {
    return this.name;
  }
}

export class Ex {
  say;
  exc() {
    return this.say() + "!";
  }
  comp() {
    return "Hi";
  }
}

export class Ex2 {
  comp() {
    return "So hi";
  }
  say;
  log(name) {
    return name + " Say " + this.comp() + this.say();
  }
}

applyMixins(Main, [Ex, Base, Ex2]);

export class Sup extends Main {
  name = "hoho";
}
