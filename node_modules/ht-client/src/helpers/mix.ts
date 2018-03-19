export function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      // console.log(derivedCtor.prototype[name], baseCtor.prototype[name], name);
      derivedCtor.prototype[name] =
        derivedCtor.prototype[name] && !name.includes("_")
          ? derivedCtor.prototype[name]
          : baseCtor.prototype[name];
    });
  });
}

export function applyBaseMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    console.log(
      Object.getOwnPropertyNames(derivedCtor),
      Object.getOwnPropertyNames(baseCtor)
    );
    console.log(
      Object.getOwnPropertyNames(derivedCtor.prototype),
      Object.getOwnPropertyNames(baseCtor.prototype)
    );
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      // console.log(derivedCtor.prototype[name], baseCtor.prototype[name], name);
      derivedCtor[name] =
        derivedCtor.prototype[name] && !name.includes("_")
          ? derivedCtor[name]
          : baseCtor.prototype[name];
    });
    // console.log(derivedCtor.prototype, derivedCtor, baseCtor, baseCtor.prototype);
  });
}

export function extend<T, U>(first: T, second: U): T & U {
  let result = <T & U>{};
  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      (<any>result)[id] = (<any>second)[id];
    }
  }
  for (let id in first) {
    (<any>result)[id] = (<any>first)[id];
  }
  return result;
}

// export function extendClass<T, U>(main: T, base: U): T & U {
//   Object.setPrototypeOf(main.prototype, base.prototype);
// }

// export function mix(fn, ...objs) {
//   if (typeof fn !== 'function') {
//     throw 'fn must be a function.';
//   }
//
//   objs.forEach(o => {
//     Object.keys(o).forEach(k => {
//       var descriptor = Object.getOwnPropertyDescriptor(o, k);
//       Object.defineProperty(fn.prototype, k, descriptor);
//     });
//   });
//
//   return fn;
// }

export let mix = superclass => new MixinBuilder(superclass);

export class MixinBuilder {
  constructor(public superclass) {
    // this.superclass = superclass;
  }

  with(...mixins) {
    return mixins.reduce((c, mixin) => mixin(c), this.superclass);
  }
}
