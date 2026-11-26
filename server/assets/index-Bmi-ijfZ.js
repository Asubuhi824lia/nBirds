import { useEffect, useRef, useLayoutEffect, useMemo, useState, useCallback, useInsertionEffect, createContext, memo, forwardRef, startTransition, useImperativeHandle, useContext } from "react";
import { computed as computed$1, effect, untracked, batch, signal } from "@preact/signals-core";
import { Position as Position$1, Rectangle, Axes, Point as Point$1, exceedsDistance } from "@dnd-kit/geometry";
import { defaultCollisionDetection as defaultCollisionDetection$1 } from "@dnd-kit/collision";
import { flushSync } from "react-dom";
import { jsxs, jsx } from "react/jsx-runtime";
var __create$3 = Object.create;
var __defProp$3 = Object.defineProperty;
var __defProps$3 = Object.defineProperties;
var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs$3 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$3 = Object.getOwnPropertySymbols;
var __hasOwnProp$3 = Object.prototype.hasOwnProperty;
var __propIsEnum$3 = Object.prototype.propertyIsEnumerable;
var __knownSymbol$3 = (name, symbol) => (symbol = Symbol[name]) ? symbol : /* @__PURE__ */ Symbol.for("Symbol." + name);
var __typeError$4 = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$3 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$3.call(b, prop))
      __defNormalProp$3(a, prop, b[prop]);
  if (__getOwnPropSymbols$3)
    for (var prop of __getOwnPropSymbols$3(b)) {
      if (__propIsEnum$3.call(b, prop))
        __defNormalProp$3(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$3 = (a, b) => __defProps$3(a, __getOwnPropDescs$3(b));
var __name$2 = (target, value) => __defProp$3(target, "name", { value, configurable: true });
var __decoratorStart$3 = (base) => {
  var _a22;
  return [, , , __create$3((_a22 = void 0) != null ? _a22 : null)];
};
var __decoratorStrings$3 = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"];
var __expectFn$3 = (fn) => fn !== void 0 && typeof fn !== "function" ? __typeError$4("Function expected") : fn;
var __decoratorContext$3 = (kind, name, done, metadata, fns) => ({ kind: __decoratorStrings$3[kind], name, metadata, addInitializer: (fn) => done._ ? __typeError$4("Already initialized") : fns.push(__expectFn$3(fn || null)) });
var __decoratorMetadata$3 = (array, target) => __defNormalProp$3(target, __knownSymbol$3("metadata"), array[3]);
var __runInitializers$3 = (array, flags, self, value) => {
  for (var i = 0, fns = array[flags >> 1], n = fns && fns.length; i < n; i++) flags & 1 ? fns[i].call(self) : value = fns[i].call(self, value);
  return value;
};
var __decorateElement$3 = (array, flags, name, decorators, target, extra) => {
  var fn, it, done, ctx, access, k = flags & 7, s = !!(flags & 8), p = !!(flags & 16);
  var j = k > 3 ? array.length + 1 : k ? s ? 1 : 2 : 0, key = __decoratorStrings$3[k + 5];
  var initializers = k > 3 && (array[j - 1] = []), extraInitializers = array[j] || (array[j] = []);
  var desc = k && (!p && !s && (target = target.prototype), k < 5 && (k > 3 || !p) && __getOwnPropDesc$3(k < 4 ? target : { get [name]() {
    return __privateGet$4(this, extra);
  }, set [name](x) {
    return __privateSet$4(this, extra, x);
  } }, name));
  k ? p && k < 4 && __name$2(extra, (k > 2 ? "set " : k > 1 ? "get " : "") + name) : __name$2(target, name);
  for (var i = decorators.length - 1; i >= 0; i--) {
    ctx = __decoratorContext$3(k, name, done = {}, array[3], extraInitializers);
    if (k) {
      ctx.static = s, ctx.private = p, access = ctx.access = { has: p ? (x) => __privateIn$2(target, x) : (x) => name in x };
      if (k ^ 3) access.get = p ? (x) => (k ^ 1 ? __privateGet$4 : __privateMethod$3)(x, target, k ^ 4 ? extra : desc.get) : (x) => x[name];
      if (k > 2) access.set = p ? (x, y) => __privateSet$4(x, target, y, k ^ 4 ? extra : desc.set) : (x, y) => x[name] = y;
    }
    it = (0, decorators[i])(k ? k < 4 ? p ? extra : desc[key] : k > 4 ? void 0 : { get: desc.get, set: desc.set } : target, ctx), done._ = 1;
    if (k ^ 4 || it === void 0) __expectFn$3(it) && (k > 4 ? initializers.unshift(it) : k ? p ? extra = it : desc[key] = it : target = it);
    else if (typeof it !== "object" || it === null) __typeError$4("Object expected");
    else __expectFn$3(fn = it.get) && (desc.get = fn), __expectFn$3(fn = it.set) && (desc.set = fn), __expectFn$3(fn = it.init) && initializers.unshift(fn);
  }
  return k || __decoratorMetadata$3(array, target), desc && __defProp$3(target, name, desc), p ? k ^ 4 ? extra : desc : target;
};
var __accessCheck$4 = (obj, member, msg) => member.has(obj) || __typeError$4("Cannot " + msg);
var __privateIn$2 = (member, obj) => Object(obj) !== obj ? __typeError$4('Cannot use the "in" operator on this value') : member.has(obj);
var __privateGet$4 = (obj, member, getter) => (__accessCheck$4(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd$4 = (obj, member, value) => member.has(obj) ? __typeError$4("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet$4 = (obj, member, value, setter) => (__accessCheck$4(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod$3 = (obj, member, method) => (__accessCheck$4(obj, member, "access private method"), method);
function computed(compute, comparator) {
  if (comparator) {
    let previousValue;
    return computed$1(() => {
      const value = compute();
      if (value && previousValue && comparator(previousValue, value)) {
        return previousValue;
      }
      previousValue = value;
      return value;
    });
  }
  return computed$1(compute);
}
function deepEqual(a, b) {
  if (Object.is(a, b)) {
    return true;
  }
  if (a === null || b === null) return false;
  if (typeof a === "function" && typeof b === "function") {
    return a === b;
  }
  if (a instanceof Set && b instanceof Set) {
    if (a.size !== b.size) {
      return false;
    }
    for (const value of a) {
      if (!b.has(value)) {
        return false;
      }
    }
    return true;
  }
  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) {
      return false;
    }
    const hasDifferentValues = a.some(
      (value, index) => !deepEqual(value, b[index])
    );
    return !hasDifferentValues;
  }
  if (typeof a === "object" && typeof b === "object") {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;
    const hasDifferentValues = aKeys.some(
      (key) => !deepEqual(a[key], b[key])
    );
    return !hasDifferentValues;
  }
  return false;
}
function reactive({ get }, _) {
  return {
    init(value) {
      return signal(value);
    },
    get() {
      const current = get.call(this);
      return current.value;
    },
    set(newValue) {
      const current = get.call(this);
      if (current.peek() === newValue) {
        return;
      }
      current.value = newValue;
    }
  };
}
function derived(target, _) {
  const map = /* @__PURE__ */ new WeakMap();
  return function() {
    let result = map.get(this);
    if (!result) {
      result = computed(target.bind(this));
      map.set(this, result);
    }
    return result.value;
  };
}
function enumerable(enumerable2 = true) {
  return function(_value2, context) {
    context.addInitializer(function() {
      const host = context.kind === "field" ? this : context.static ? this : Object.getPrototypeOf(this);
      const descriptor2 = Object.getOwnPropertyDescriptor(host, context.name);
      if (descriptor2) {
        Object.defineProperty(host, context.name, __spreadProps$3(__spreadValues$3({}, descriptor2), { enumerable: enumerable2 }));
      }
    });
  };
}
function effects(...entries) {
  const effects2 = entries.map((fn) => effect(fn));
  return () => effects2.forEach((cleanup) => cleanup());
}
var _previous_dec, _initial_dec, _current_dec$1, _current_dec2, _previous_dec2, _initial_dec2, _init$3, _initial, _a$2, initial_get, initial_set, _ValueHistory_instances, _previous, _b$1, previous_get, previous_set, _current, _c$2, current_get, current_set;
_initial_dec2 = [reactive], _previous_dec2 = [reactive], _current_dec2 = [reactive], _current_dec$1 = [enumerable()], _initial_dec = [enumerable()], _previous_dec = [enumerable()];
var ValueHistory = class {
  constructor(defaultValue, equals = Object.is) {
    this.defaultValue = defaultValue;
    this.equals = equals;
    __runInitializers$3(_init$3, 5, this);
    __privateAdd$4(this, _ValueHistory_instances);
    __privateAdd$4(this, _initial, __runInitializers$3(_init$3, 8, this)), __runInitializers$3(_init$3, 11, this);
    __privateAdd$4(this, _previous, __runInitializers$3(_init$3, 12, this)), __runInitializers$3(_init$3, 15, this);
    __privateAdd$4(this, _current, __runInitializers$3(_init$3, 16, this)), __runInitializers$3(_init$3, 19, this);
    this.reset = this.reset.bind(this);
    this.reset();
  }
  get current() {
    return __privateGet$4(this, _ValueHistory_instances, current_get);
  }
  get initial() {
    return __privateGet$4(this, _ValueHistory_instances, initial_get);
  }
  get previous() {
    return __privateGet$4(this, _ValueHistory_instances, previous_get);
  }
  /** Set the current value */
  set current(value) {
    const current = untracked(() => __privateGet$4(this, _ValueHistory_instances, current_get));
    if (value && current && this.equals(current, value)) {
      return;
    }
    batch(() => {
      if (!__privateGet$4(this, _ValueHistory_instances, initial_get)) {
        __privateSet$4(this, _ValueHistory_instances, value, initial_set);
      }
      __privateSet$4(this, _ValueHistory_instances, current, previous_set);
      __privateSet$4(this, _ValueHistory_instances, value, current_set);
    });
  }
  /** Reset the state to the initial value */
  reset(value = this.defaultValue) {
    batch(() => {
      __privateSet$4(this, _ValueHistory_instances, void 0, previous_set);
      __privateSet$4(this, _ValueHistory_instances, value, initial_set);
      __privateSet$4(this, _ValueHistory_instances, value, current_set);
    });
  }
};
_init$3 = __decoratorStart$3();
_initial = /* @__PURE__ */ new WeakMap();
_ValueHistory_instances = /* @__PURE__ */ new WeakSet();
_previous = /* @__PURE__ */ new WeakMap();
_current = /* @__PURE__ */ new WeakMap();
_a$2 = __decorateElement$3(_init$3, 20, "#initial", _initial_dec2, _ValueHistory_instances, _initial), initial_get = _a$2.get, initial_set = _a$2.set;
_b$1 = __decorateElement$3(_init$3, 20, "#previous", _previous_dec2, _ValueHistory_instances, _previous), previous_get = _b$1.get, previous_set = _b$1.set;
_c$2 = __decorateElement$3(_init$3, 20, "#current", _current_dec2, _ValueHistory_instances, _current), current_get = _c$2.get, current_set = _c$2.set;
__decorateElement$3(_init$3, 2, "current", _current_dec$1, ValueHistory);
__decorateElement$3(_init$3, 2, "initial", _initial_dec, ValueHistory);
__decorateElement$3(_init$3, 2, "previous", _previous_dec, ValueHistory);
__decoratorMetadata$3(_init$3, ValueHistory);
function snapshot(value) {
  return untracked(() => {
    const output = {};
    for (const key in value) {
      output[key] = value[key];
    }
    return output;
  });
}
var __create$2 = Object.create;
var __defProp$2 = Object.defineProperty;
var __defProps$2 = Object.defineProperties;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs$2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$2 = Object.getOwnPropertySymbols;
var __hasOwnProp$2 = Object.prototype.hasOwnProperty;
var __propIsEnum$2 = Object.prototype.propertyIsEnumerable;
var __knownSymbol$2 = (name, symbol) => (symbol = Symbol[name]) ? symbol : /* @__PURE__ */ Symbol.for("Symbol." + name);
var __typeError$3 = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$2.call(b, prop))
      __defNormalProp$2(a, prop, b[prop]);
  if (__getOwnPropSymbols$2)
    for (var prop of __getOwnPropSymbols$2(b)) {
      if (__propIsEnum$2.call(b, prop))
        __defNormalProp$2(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$2 = (a, b) => __defProps$2(a, __getOwnPropDescs$2(b));
var __name$1 = (target, value) => __defProp$2(target, "name", { value, configurable: true });
var __objRest$2 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$2.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$2)
    for (var prop of __getOwnPropSymbols$2(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$2.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __decoratorStart$2 = (base) => {
  var _a5;
  return [, , , __create$2((_a5 = base == null ? void 0 : base[__knownSymbol$2("metadata")]) != null ? _a5 : null)];
};
var __decoratorStrings$2 = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"];
var __expectFn$2 = (fn) => fn !== void 0 && typeof fn !== "function" ? __typeError$3("Function expected") : fn;
var __decoratorContext$2 = (kind, name, done, metadata, fns) => ({ kind: __decoratorStrings$2[kind], name, metadata, addInitializer: (fn) => done._ ? __typeError$3("Already initialized") : fns.push(__expectFn$2(fn || null)) });
var __decoratorMetadata$2 = (array, target) => __defNormalProp$2(target, __knownSymbol$2("metadata"), array[3]);
var __runInitializers$2 = (array, flags, self, value) => {
  for (var i = 0, fns = array[flags >> 1], n = fns && fns.length; i < n; i++) flags & 1 ? fns[i].call(self) : value = fns[i].call(self, value);
  return value;
};
var __decorateElement$2 = (array, flags, name, decorators, target, extra) => {
  var fn, it, done, ctx, access, k = flags & 7, s = !!(flags & 8), p = !!(flags & 16);
  var j = k > 3 ? array.length + 1 : k ? s ? 1 : 2 : 0, key = __decoratorStrings$2[k + 5];
  var initializers = k > 3 && (array[j - 1] = []), extraInitializers = array[j] || (array[j] = []);
  var desc = k && (!p && !s && (target = target.prototype), k < 5 && (k > 3 || !p) && __getOwnPropDesc$2(k < 4 ? target : { get [name]() {
    return __privateGet$3(this, extra);
  }, set [name](x) {
    return __privateSet$3(this, extra, x);
  } }, name));
  k ? p && k < 4 && __name$1(extra, (k > 2 ? "set " : k > 1 ? "get " : "") + name) : __name$1(target, name);
  for (var i = decorators.length - 1; i >= 0; i--) {
    ctx = __decoratorContext$2(k, name, done = {}, array[3], extraInitializers);
    if (k) {
      ctx.static = s, ctx.private = p, access = ctx.access = { has: p ? (x) => __privateIn$1(target, x) : (x) => name in x };
      if (k ^ 3) access.get = p ? (x) => (k ^ 1 ? __privateGet$3 : __privateMethod$2)(x, target, k ^ 4 ? extra : desc.get) : (x) => x[name];
      if (k > 2) access.set = p ? (x, y) => __privateSet$3(x, target, y, k ^ 4 ? extra : desc.set) : (x, y) => x[name] = y;
    }
    it = (0, decorators[i])(k ? k < 4 ? p ? extra : desc[key] : k > 4 ? void 0 : { get: desc.get, set: desc.set } : target, ctx), done._ = 1;
    if (k ^ 4 || it === void 0) __expectFn$2(it) && (k > 4 ? initializers.unshift(it) : k ? p ? extra = it : desc[key] = it : target = it);
    else if (typeof it !== "object" || it === null) __typeError$3("Object expected");
    else __expectFn$2(fn = it.get) && (desc.get = fn), __expectFn$2(fn = it.set) && (desc.set = fn), __expectFn$2(fn = it.init) && initializers.unshift(fn);
  }
  return k || __decoratorMetadata$2(array, target), desc && __defProp$2(target, name, desc), p ? k ^ 4 ? extra : desc : target;
};
var __accessCheck$3 = (obj, member, msg) => member.has(obj) || __typeError$3("Cannot " + msg);
var __privateIn$1 = (member, obj) => Object(obj) !== obj ? __typeError$3('Cannot use the "in" operator on this value') : member.has(obj);
var __privateGet$3 = (obj, member, getter) => (__accessCheck$3(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd$3 = (obj, member, value) => member.has(obj) ? __typeError$3("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet$3 = (obj, member, value, setter) => (__accessCheck$3(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod$2 = (obj, member, method) => (__accessCheck$3(obj, member, "access private method"), method);
function configure(plugin, options2) {
  return {
    plugin,
    options: options2
  };
}
function configurator(plugin) {
  return (options2) => {
    return configure(plugin, options2);
  };
}
function descriptor(plugin) {
  if (typeof plugin === "function") {
    return {
      plugin,
      options: void 0
    };
  }
  return plugin;
}
var _disabled_dec, _init$2, _disabled, _cleanupFunctions$1;
_disabled_dec = [reactive];
var Plugin = class {
  /**
   * Creates a new plugin instance.
   *
   * @param manager - The drag and drop manager that owns this plugin
   * @param options - Optional configuration for the plugin
   */
  constructor(manager, options2) {
    this.manager = manager;
    this.options = options2;
    __privateAdd$3(this, _disabled, __runInitializers$2(_init$2, 8, this, false)), __runInitializers$2(_init$2, 11, this);
    __privateAdd$3(this, _cleanupFunctions$1, /* @__PURE__ */ new Set());
  }
  /**
   * Enables a disabled plugin instance.
   *
   * @remarks
   * This method triggers effects when called.
   */
  enable() {
    this.disabled = false;
  }
  /**
   * Disables an enabled plugin instance.
   *
   * @remarks
   * This method triggers effects when called.
   */
  disable() {
    this.disabled = true;
  }
  /**
   * Checks if the plugin instance is disabled.
   *
   * @returns true if the plugin is disabled
   * @remarks
   * This method does not trigger effects when accessed.
   */
  isDisabled() {
    return untracked(() => {
      return this.disabled;
    });
  }
  /**
   * Configures a plugin instance with new options.
   *
   * @param options - The new options to apply
   */
  configure(options2) {
    this.options = options2;
  }
  /**
   * Registers an effect that will be cleaned up when the plugin is destroyed.
   *
   * @param callback - The effect callback to register
   * @returns A function to dispose of the effect
   */
  registerEffect(callback) {
    const dispose = effect(callback.bind(this));
    __privateGet$3(this, _cleanupFunctions$1).add(dispose);
    return dispose;
  }
  /**
   * Destroys a plugin instance and cleans up its resources.
   *
   * @remarks
   * This method:
   * - Calls all registered cleanup functions
   * - Should be overridden by subclasses to clean up additional resources
   */
  destroy() {
    __privateGet$3(this, _cleanupFunctions$1).forEach((cleanup) => cleanup());
  }
  /**
   * Configures a plugin constructor with options.
   *
   * @param options - The options to configure the constructor with
   * @returns The configured plugin constructor
   *
   * @remarks
   * This method is used to configure the options that the
   * plugin constructor will use to create plugin instances.
   */
  static configure(options2) {
    return configure(this, options2);
  }
};
_init$2 = __decoratorStart$2(null);
_disabled = /* @__PURE__ */ new WeakMap();
_cleanupFunctions$1 = /* @__PURE__ */ new WeakMap();
__decorateElement$2(_init$2, 4, "disabled", _disabled_dec, Plugin, _disabled);
__decoratorMetadata$2(_init$2, Plugin);
var CorePlugin = class extends Plugin {
};
var _previousValues;
var PluginRegistry = class {
  /**
   * Creates a new plugin registry.
   *
   * @param manager - The drag and drop manager that owns this registry
   */
  constructor(manager) {
    this.manager = manager;
    this.instances = /* @__PURE__ */ new Map();
    __privateAdd$3(this, _previousValues, []);
  }
  /**
   * Gets all registered plugin instances.
   *
   * @returns An array of all active plugin instances
   */
  get values() {
    return Array.from(this.instances.values());
  }
  /**
   * Sets the list of plugins to be used by the registry.
   *
   * @param entries - Array of plugin constructors or descriptors
   * @remarks
   * This method:
   * - Filters out duplicate plugins
   * - Unregisters plugins that are no longer in use
   * - Registers new plugins with their options
   */
  set values(entries) {
    const descriptors = entries.map(descriptor).reduce((acc, descriptor2) => {
      const existing = acc.find(({ plugin }) => plugin === descriptor2.plugin);
      if (existing) {
        existing.options = descriptor2.options;
        return acc;
      }
      return [...acc, descriptor2];
    }, []);
    const constructors = descriptors.map(({ plugin }) => plugin);
    for (const plugin of __privateGet$3(this, _previousValues)) {
      if (!constructors.includes(plugin)) {
        if (plugin.prototype instanceof CorePlugin) {
          continue;
        }
        this.unregister(plugin);
      }
    }
    for (const { plugin, options: options2 } of descriptors) {
      this.register(plugin, options2);
    }
    __privateSet$3(this, _previousValues, constructors);
  }
  /**
   * Gets a plugin instance by its constructor.
   *
   * @param plugin - The plugin constructor to look up
   * @returns The plugin instance or undefined if not found
   */
  get(plugin) {
    const instance = this.instances.get(plugin);
    return instance;
  }
  /**
   * Registers a new plugin instance.
   *
   * @param plugin - The plugin constructor to register
   * @param options - Optional configuration for the plugin
   * @returns The registered plugin instance
   * @remarks
   * If the plugin is already registered, its options will be updated
   * and the existing instance will be returned.
   */
  register(plugin, options2) {
    const existingInstance = this.instances.get(plugin);
    if (existingInstance) {
      if (existingInstance.options !== options2) {
        existingInstance.options = options2;
      }
      return existingInstance;
    }
    const instance = new plugin(this.manager, options2);
    this.instances.set(plugin, instance);
    return instance;
  }
  /**
   * Unregisters a plugin instance.
   *
   * @param plugin - The plugin constructor to unregister
   * @remarks
   * This method:
   * - Destroys the plugin instance
   * - Removes it from the registry
   */
  unregister(plugin) {
    const instance = this.instances.get(plugin);
    if (instance) {
      instance.destroy();
      this.instances.delete(plugin);
    }
  }
  /**
   * Destroys all registered plugin instances.
   *
   * @remarks
   * This method:
   * - Calls destroy() on all plugin instances
   * - Clears the registry
   */
  destroy() {
    for (const plugin of this.instances.values()) {
      plugin.destroy();
    }
    this.instances.clear();
  }
};
_previousValues = /* @__PURE__ */ new WeakMap();
function sortCollisions(a, b) {
  if (a.priority === b.priority) {
    if (a.type === b.type) {
      return b.value - a.value;
    }
    return b.type - a.type;
  }
  return b.priority - a.priority;
}
var DEFAULT_VALUE = [];
var _previousCoordinates, _collisions;
var CollisionObserver = class extends Plugin {
  /**
   * Creates a new CollisionObserver instance.
   *
   * @param manager - The drag drop manager instance
   */
  constructor(manager) {
    super(manager);
    __privateAdd$3(this, _previousCoordinates);
    __privateAdd$3(this, _collisions);
    this.computeCollisions = this.computeCollisions.bind(this);
    __privateSet$3(this, _collisions, signal(DEFAULT_VALUE));
    this.destroy = effects(
      () => {
        const collisions = this.computeCollisions();
        const coordinates = untracked(
          () => this.manager.dragOperation.position.current
        );
        if (collisions !== DEFAULT_VALUE) {
          const previousCoordinates = __privateGet$3(this, _previousCoordinates);
          __privateSet$3(this, _previousCoordinates, coordinates);
          if (previousCoordinates && coordinates.x == previousCoordinates.x && coordinates.y == previousCoordinates.y) {
            return;
          }
        } else {
          __privateSet$3(this, _previousCoordinates, void 0);
        }
        __privateGet$3(this, _collisions).value = collisions;
      },
      () => {
        const { dragOperation } = this.manager;
        if (dragOperation.status.initialized) {
          this.forceUpdate();
        }
      }
    );
  }
  /**
   * Forces an immediate update of collision detection.
   *
   * @param immediate - If true, updates collisions immediately. If false, resets previous coordinates.
   */
  forceUpdate(immediate = true) {
    untracked(() => {
      if (immediate) {
        __privateGet$3(this, _collisions).value = this.computeCollisions();
      } else {
        __privateSet$3(this, _previousCoordinates, void 0);
      }
    });
  }
  /**
   * Computes collisions between draggable and droppable elements.
   *
   * @param entries - Optional array of droppable elements to check. If not provided, uses all registered droppables.
   * @param collisionDetector - Optional custom collision detector function
   * @returns Array of detected collisions, sorted by priority
   */
  computeCollisions(entries, collisionDetector) {
    const { registry, dragOperation } = this.manager;
    const { source, shape, status } = dragOperation;
    if (!status.initialized || !shape) {
      return DEFAULT_VALUE;
    }
    const collisions = [];
    const potentialTargets = [];
    for (const entry of entries != null ? entries : registry.droppables) {
      if (entry.disabled) {
        continue;
      }
      if (source && !entry.accepts(source)) {
        continue;
      }
      const detectCollision = collisionDetector != null ? collisionDetector : entry.collisionDetector;
      if (!detectCollision) {
        continue;
      }
      potentialTargets.push(entry);
      void entry.shape;
      const collision = untracked(
        () => detectCollision({
          droppable: entry,
          dragOperation
        })
      );
      if (collision) {
        if (entry.collisionPriority != null) {
          collision.priority = entry.collisionPriority;
        }
        collisions.push(collision);
      }
    }
    if (potentialTargets.length === 0) {
      return DEFAULT_VALUE;
    }
    collisions.sort(sortCollisions);
    return collisions;
  }
  /**
   * Gets the current collisions signal value.
   */
  get collisions() {
    return __privateGet$3(this, _collisions).value;
  }
};
_previousCoordinates = /* @__PURE__ */ new WeakMap();
_collisions = /* @__PURE__ */ new WeakMap();
var _disabled_dec2, _data_dec, _manager_dec, _Entity_static, flushIdChanges_fn, _init2$1, _manager, _idSignal, _data, _disabled2;
_manager_dec = [reactive], _data_dec = [reactive], _disabled_dec2 = [reactive];
var _Entity = class _Entity2 {
  /**
   * Creates a new instance of the `Entity` class.
   *
   * @param input - An object containing the initial properties of the entity.
   * @param manager - The manager that controls the drag and drop operations.
   */
  constructor(input, manager) {
    __privateAdd$3(this, _manager, __runInitializers$2(_init2$1, 8, this)), __runInitializers$2(_init2$1, 11, this);
    __privateAdd$3(this, _idSignal);
    __privateAdd$3(this, _data, __runInitializers$2(_init2$1, 12, this)), __runInitializers$2(_init2$1, 15, this);
    __privateAdd$3(this, _disabled2, __runInitializers$2(_init2$1, 16, this)), __runInitializers$2(_init2$1, 19, this);
    const { effects: effects6, id, data = {}, disabled = false, register = true } = input;
    let previousId = id;
    __privateSet$3(this, _idSignal, signal(id));
    this.manager = manager;
    this.data = data;
    this.disabled = disabled;
    this.effects = () => {
      var _a5;
      return [
        () => {
          const { id: id2, manager: manager2 } = this;
          if (id2 === previousId) {
            return;
          }
          previousId = id2;
          manager2 == null ? void 0 : manager2.registry.register(this);
          return () => manager2 == null ? void 0 : manager2.registry.unregister(this);
        },
        ...(_a5 = effects6 == null ? void 0 : effects6()) != null ? _a5 : []
      ];
    };
    this.register = this.register.bind(this);
    this.unregister = this.unregister.bind(this);
    this.destroy = this.destroy.bind(this);
    if (manager && register) {
      queueMicrotask(this.register);
    }
  }
  get id() {
    var _a5, _b2;
    const signalValue = __privateGet$3(this, _idSignal).value;
    return (_b2 = (_a5 = _Entity2.pendingIdChanges) == null ? void 0 : _a5.get(this)) != null ? _b2 : signalValue;
  }
  set id(value) {
    var _a5, _b2;
    const current = (_b2 = (_a5 = _Entity2.pendingIdChanges) == null ? void 0 : _a5.get(this)) != null ? _b2 : __privateGet$3(this, _idSignal).peek();
    if (value === current) return;
    if (!_Entity2.pendingIdChanges) {
      _Entity2.pendingIdChanges = /* @__PURE__ */ new Map();
      queueMicrotask(() => {
        var _a22;
        return __privateMethod$2(_a22 = _Entity2, _Entity_static, flushIdChanges_fn).call(_a22);
      });
    }
    _Entity2.pendingIdChanges.set(this, value);
  }
  /**
   * A method that registers the entity with the manager.
   * @returns CleanupFunction | void
   */
  register() {
    var _a5;
    return (_a5 = this.manager) == null ? void 0 : _a5.registry.register(this);
  }
  /**
   * A method that unregisters the entity from the manager.
   * @returns void
   */
  unregister() {
    var _a5;
    (_a5 = this.manager) == null ? void 0 : _a5.registry.unregister(this);
  }
  /**
   * A method that cleans up the entity when it is no longer needed.
   * @returns void
   */
  destroy() {
    var _a5;
    (_a5 = this.manager) == null ? void 0 : _a5.registry.unregister(this);
  }
};
_init2$1 = __decoratorStart$2(null);
_Entity_static = /* @__PURE__ */ new WeakSet();
flushIdChanges_fn = function() {
  const changes = _Entity.pendingIdChanges;
  _Entity.pendingIdChanges = null;
  if (changes) {
    batch(() => {
      for (const [entity, id] of changes) {
        __privateGet$3(entity, _idSignal).value = id;
      }
    });
  }
};
_manager = /* @__PURE__ */ new WeakMap();
_idSignal = /* @__PURE__ */ new WeakMap();
_data = /* @__PURE__ */ new WeakMap();
_disabled2 = /* @__PURE__ */ new WeakMap();
__decorateElement$2(_init2$1, 4, "manager", _manager_dec, _Entity, _manager);
__decorateElement$2(_init2$1, 4, "data", _data_dec, _Entity, _data);
__decorateElement$2(_init2$1, 4, "disabled", _disabled_dec2, _Entity, _disabled2);
__privateAdd$3(_Entity, _Entity_static);
__decoratorMetadata$2(_init2$1, _Entity);
_Entity.pendingIdChanges = null;
var Entity = _Entity;
var EntityRegistry = class {
  constructor() {
    this.map = signal(/* @__PURE__ */ new Map());
    this.cleanupFunctions = /* @__PURE__ */ new WeakMap();
    this.register = (key, value) => {
      const current = this.map.peek();
      const currentValue2 = current.get(key);
      const unregister = () => this.unregister(key, value);
      if (currentValue2 === value) return unregister;
      if (currentValue2) {
        if (currentValue2.id === key) {
          const cleanup2 = this.cleanupFunctions.get(currentValue2);
          cleanup2 == null ? void 0 : cleanup2();
          this.cleanupFunctions.delete(currentValue2);
        }
      }
      const updatedMap = new Map(current);
      for (const [existingKey, existingValue] of current) {
        if (existingValue === value && existingKey !== key) {
          updatedMap.delete(existingKey);
          break;
        }
      }
      updatedMap.set(key, value);
      this.map.value = updatedMap;
      const cleanup = effects(...value.effects());
      this.cleanupFunctions.set(value, cleanup);
      return unregister;
    };
    this.unregister = (key, value) => {
      const current = this.map.peek();
      if (current.get(key) !== value) {
        return;
      }
      const cleanup = this.cleanupFunctions.get(value);
      cleanup == null ? void 0 : cleanup();
      this.cleanupFunctions.delete(value);
      const updatedMap = new Map(current);
      updatedMap.delete(key);
      this.map.value = updatedMap;
    };
  }
  /**
   * Iterator for the EntityRegistry class.
   * @returns An iterator for the values in the map.
   */
  [Symbol.iterator]() {
    return this.map.peek().values();
  }
  get value() {
    return this.map.value.values();
  }
  /**
   * Checks if a entity with the given identifier exists in the registry.
   * @param identifier - The unique identifier of the entity.
   * @returns True if the entity exists, false otherwise.
   */
  has(identifier) {
    return this.map.value.has(identifier);
  }
  /**
   * Retrieves a entity from the registry using its identifier.
   * @param identifier - The unique identifier of the entity.
   * @returns The entity if it exists, undefined otherwise.
   */
  get(identifier) {
    return this.map.value.get(identifier);
  }
  /**
   * Destroys all entries in the registry and clears the registry.
   */
  destroy() {
    for (const entry of this) {
      const cleanup = this.cleanupFunctions.get(entry);
      cleanup == null ? void 0 : cleanup();
      entry.destroy();
    }
    this.map.value = /* @__PURE__ */ new Map();
  }
};
var _isDragSource_dec, _isDragging_dec, _isDropping_dec, _status_dec, _modifiers_dec, _type_dec, _c$1, _init3$1, _type, _modifiers, _status;
var Draggable$1 = class Draggable extends (_c$1 = Entity, _type_dec = [reactive], _modifiers_dec = [reactive], _status_dec = [reactive], _isDropping_dec = [derived], _isDragging_dec = [derived], _isDragSource_dec = [derived], _c$1) {
  constructor(_a5, manager) {
    var _b2 = _a5, { modifiers, type, sensors, plugins, effects: effects6 } = _b2, input = __objRest$2(_b2, ["modifiers", "type", "sensors", "plugins", "effects"]);
    super(
      __spreadProps$2(__spreadValues$2({}, input), {
        effects: () => {
          var _a22;
          return [
            ...(_a22 = effects6 == null ? void 0 : effects6()) != null ? _a22 : [],
            () => {
              const { manager: manager2, plugins: plugins2 } = this;
              if (!manager2 || !plugins2) return;
              for (const entry of plugins2) {
                const { plugin } = descriptor(entry);
                manager2.registry.plugins.register(plugin);
              }
            }
          ];
        }
      }),
      manager
    );
    __runInitializers$2(_init3$1, 5, this);
    __privateAdd$3(this, _type, __runInitializers$2(_init3$1, 8, this)), __runInitializers$2(_init3$1, 11, this);
    __privateAdd$3(this, _modifiers, __runInitializers$2(_init3$1, 12, this)), __runInitializers$2(_init3$1, 15, this);
    __privateAdd$3(this, _status, __runInitializers$2(_init3$1, 16, this, this.isDragSource ? "dragging" : "idle")), __runInitializers$2(_init3$1, 19, this);
    this.type = type;
    this.sensors = sensors;
    this.modifiers = modifiers;
    this.alignment = input.alignment;
    this.plugins = plugins;
  }
  /**
   * Look up per-entity options for a given plugin constructor.
   */
  pluginConfig(plugin) {
    if (!this.plugins) return void 0;
    for (const entry of this.plugins) {
      const desc = descriptor(entry);
      if (desc.plugin === plugin) return desc.options;
    }
    return void 0;
  }
  get isDropping() {
    return this.status === "dropping" && this.isDragSource;
  }
  get isDragging() {
    return this.status === "dragging" && this.isDragSource;
  }
  get isDragSource() {
    var _a5, _b2;
    return ((_b2 = (_a5 = this.manager) == null ? void 0 : _a5.dragOperation.source) == null ? void 0 : _b2.id) === this.id;
  }
};
_init3$1 = __decoratorStart$2(_c$1);
_type = /* @__PURE__ */ new WeakMap();
_modifiers = /* @__PURE__ */ new WeakMap();
_status = /* @__PURE__ */ new WeakMap();
__decorateElement$2(_init3$1, 4, "type", _type_dec, Draggable$1, _type);
__decorateElement$2(_init3$1, 4, "modifiers", _modifiers_dec, Draggable$1, _modifiers);
__decorateElement$2(_init3$1, 4, "status", _status_dec, Draggable$1, _status);
__decorateElement$2(_init3$1, 2, "isDropping", _isDropping_dec, Draggable$1);
__decorateElement$2(_init3$1, 2, "isDragging", _isDragging_dec, Draggable$1);
__decorateElement$2(_init3$1, 2, "isDragSource", _isDragSource_dec, Draggable$1);
__decoratorMetadata$2(_init3$1, Draggable$1);
var _isDropTarget_dec, _shape_dec, _collisionPriority_dec, _collisionDetector_dec, _type_dec2, _accept_dec, _c2$1, _init4$1, _accept, _type2, _collisionDetector, _collisionPriority, _shape;
var Droppable$1 = class Droppable extends (_c2$1 = Entity, _accept_dec = [reactive], _type_dec2 = [reactive], _collisionDetector_dec = [reactive], _collisionPriority_dec = [reactive], _shape_dec = [reactive], _isDropTarget_dec = [derived], _c2$1) {
  constructor(_a5, manager) {
    var _b2 = _a5, { accept, collisionDetector, collisionPriority, type } = _b2, input = __objRest$2(_b2, ["accept", "collisionDetector", "collisionPriority", "type"]);
    super(input, manager);
    __runInitializers$2(_init4$1, 5, this);
    __privateAdd$3(this, _accept, __runInitializers$2(_init4$1, 8, this)), __runInitializers$2(_init4$1, 11, this);
    __privateAdd$3(this, _type2, __runInitializers$2(_init4$1, 12, this)), __runInitializers$2(_init4$1, 15, this);
    __privateAdd$3(this, _collisionDetector, __runInitializers$2(_init4$1, 16, this)), __runInitializers$2(_init4$1, 19, this);
    __privateAdd$3(this, _collisionPriority, __runInitializers$2(_init4$1, 20, this)), __runInitializers$2(_init4$1, 23, this);
    __privateAdd$3(this, _shape, __runInitializers$2(_init4$1, 24, this)), __runInitializers$2(_init4$1, 27, this);
    this.accept = accept;
    this.collisionDetector = collisionDetector;
    this.collisionPriority = collisionPriority;
    this.type = type;
  }
  /**
   * Checks whether or not the droppable accepts a given draggable.
   *
   * @param draggable - The draggable to check
   * @returns true if the draggable can be dropped here
   */
  accepts(draggable) {
    const { accept } = this;
    if (!accept) {
      return true;
    }
    if (typeof accept === "function") {
      return accept(draggable);
    }
    if (!draggable.type) {
      return false;
    }
    if (Array.isArray(accept)) {
      return accept.includes(draggable.type);
    }
    return draggable.type === accept;
  }
  get isDropTarget() {
    var _a5, _b2;
    return ((_b2 = (_a5 = this.manager) == null ? void 0 : _a5.dragOperation.target) == null ? void 0 : _b2.id) === this.id;
  }
};
_init4$1 = __decoratorStart$2(_c2$1);
_accept = /* @__PURE__ */ new WeakMap();
_type2 = /* @__PURE__ */ new WeakMap();
_collisionDetector = /* @__PURE__ */ new WeakMap();
_collisionPriority = /* @__PURE__ */ new WeakMap();
_shape = /* @__PURE__ */ new WeakMap();
__decorateElement$2(_init4$1, 4, "accept", _accept_dec, Droppable$1, _accept);
__decorateElement$2(_init4$1, 4, "type", _type_dec2, Droppable$1, _type2);
__decorateElement$2(_init4$1, 4, "collisionDetector", _collisionDetector_dec, Droppable$1, _collisionDetector);
__decorateElement$2(_init4$1, 4, "collisionPriority", _collisionPriority_dec, Droppable$1, _collisionPriority);
__decorateElement$2(_init4$1, 4, "shape", _shape_dec, Droppable$1, _shape);
__decorateElement$2(_init4$1, 2, "isDropTarget", _isDropTarget_dec, Droppable$1);
__decoratorMetadata$2(_init4$1, Droppable$1);
var Monitor = class {
  constructor() {
    this.registry = /* @__PURE__ */ new Map();
  }
  /**
   * Adds an event listener for the specified event type.
   *
   * @param name - The name of the event to listen for
   * @param handler - The function to call when the event occurs
   * @returns A function to remove the event listener
   */
  addEventListener(name, handler) {
    const { registry } = this;
    const listeners = new Set(registry.get(name));
    listeners.add(handler);
    registry.set(name, listeners);
    return () => this.removeEventListener(name, handler);
  }
  /**
   * Removes an event listener for the specified event type.
   *
   * @param name - The name of the event
   * @param handler - The function to remove
   */
  removeEventListener(name, handler) {
    const { registry } = this;
    const listeners = new Set(registry.get(name));
    listeners.delete(handler);
    registry.set(name, listeners);
  }
  /**
   * Dispatches an event to all registered listeners.
   *
   * @param name - The name of the event to dispatch
   * @param args - Arguments to pass to the event handlers
   */
  dispatch(name, ...args) {
    const { registry } = this;
    const listeners = registry.get(name);
    if (!listeners) {
      return;
    }
    for (const listener of listeners) {
      listener(...args);
    }
  }
};
var DragDropMonitor = class extends Monitor {
  /**
   * Creates a new drag and drop monitor.
   *
   * @param manager - The drag and drop manager to monitor
   */
  constructor(manager) {
    super();
    this.manager = manager;
  }
  /**
   * Dispatches a drag and drop event.
   *
   * @param type - The type of event to dispatch
   * @param event - The event data to dispatch
   */
  dispatch(type, event) {
    const args = [event, this.manager];
    super.dispatch(type, ...args);
  }
};
function defaultPreventable(event, cancelable = true) {
  let defaultPrevented = false;
  return __spreadProps$2(__spreadValues$2({}, event), {
    cancelable,
    get defaultPrevented() {
      return defaultPrevented;
    },
    preventDefault() {
      if (!cancelable) {
        return;
      }
      defaultPrevented = true;
    }
  });
}
var CollisionNotifier = class extends CorePlugin {
  constructor(manager) {
    super(manager);
    const isEqual = (a, b) => a.map(({ id }) => id).join("") === b.map(({ id }) => id).join("");
    let previousCollisions = [];
    this.destroy = effects(
      () => {
        const { dragOperation, collisionObserver } = manager;
        if (dragOperation.status.initializing) {
          previousCollisions = [];
          collisionObserver.enable();
        }
      },
      () => {
        const { collisionObserver, monitor } = manager;
        const { collisions } = collisionObserver;
        if (collisionObserver.isDisabled()) {
          return;
        }
        if (Entity.pendingIdChanges) {
          return;
        }
        const event = defaultPreventable({
          collisions
        });
        monitor.dispatch("collision", event);
        if (event.defaultPrevented) {
          return;
        }
        if (isEqual(collisions, previousCollisions)) {
          return;
        } else {
          previousCollisions = collisions;
        }
        const [firstCollision] = collisions;
        untracked(() => {
          var _a5;
          if ((firstCollision == null ? void 0 : firstCollision.id) !== ((_a5 = manager.dragOperation.target) == null ? void 0 : _a5.id)) {
            collisionObserver.disable();
            manager.actions.setDropTarget(firstCollision == null ? void 0 : firstCollision.id).then(() => {
              collisionObserver.enable();
            });
          }
        });
      }
    );
  }
};
var CollisionPriority = /* @__PURE__ */ ((CollisionPriority2) => {
  CollisionPriority2[CollisionPriority2["Lowest"] = 0] = "Lowest";
  CollisionPriority2[CollisionPriority2["Low"] = 1] = "Low";
  CollisionPriority2[CollisionPriority2["Normal"] = 2] = "Normal";
  CollisionPriority2[CollisionPriority2["High"] = 3] = "High";
  CollisionPriority2[CollisionPriority2["Highest"] = 4] = "Highest";
  return CollisionPriority2;
})(CollisionPriority || {});
var CollisionType = /* @__PURE__ */ ((CollisionType2) => {
  CollisionType2[CollisionType2["Collision"] = 0] = "Collision";
  CollisionType2[CollisionType2["ShapeIntersection"] = 1] = "ShapeIntersection";
  CollisionType2[CollisionType2["PointerIntersection"] = 2] = "PointerIntersection";
  return CollisionType2;
})(CollisionType || {});
var _dropped_dec, _dragging_dec, _initialized_dec, _initializing_dec, _initializationPending_dec, _idle_dec, _current_dec, _value_dec, _init5$1, _value;
_value_dec = [reactive], _current_dec = [derived], _idle_dec = [derived], _initializationPending_dec = [derived], _initializing_dec = [derived], _initialized_dec = [derived], _dragging_dec = [derived], _dropped_dec = [derived];
var Status = class {
  constructor() {
    __runInitializers$2(_init5$1, 5, this);
    __privateAdd$3(this, _value, __runInitializers$2(
      _init5$1,
      8,
      this,
      "idle"
      /* Idle */
    )), __runInitializers$2(_init5$1, 11, this);
  }
  get current() {
    return this.value;
  }
  get idle() {
    return this.value === "idle";
  }
  get initializationPending() {
    return this.value === "initialization-pending";
  }
  get initializing() {
    return this.value === "initializing";
  }
  get initialized() {
    const { value } = this;
    return value !== "idle" && value !== "initialization-pending";
  }
  get dragging() {
    return this.value === "dragging";
  }
  get dropped() {
    return this.value === "dropped";
  }
  /**
   * Sets the current status value.
   *
   * @param value - The new status value
   */
  set(value) {
    this.value = value;
  }
};
_init5$1 = __decoratorStart$2(null);
_value = /* @__PURE__ */ new WeakMap();
__decorateElement$2(_init5$1, 4, "value", _value_dec, Status, _value);
__decorateElement$2(_init5$1, 2, "current", _current_dec, Status);
__decorateElement$2(_init5$1, 2, "idle", _idle_dec, Status);
__decorateElement$2(_init5$1, 2, "initializationPending", _initializationPending_dec, Status);
__decorateElement$2(_init5$1, 2, "initializing", _initializing_dec, Status);
__decorateElement$2(_init5$1, 2, "initialized", _initialized_dec, Status);
__decorateElement$2(_init5$1, 2, "dragging", _dragging_dec, Status);
__decorateElement$2(_init5$1, 2, "dropped", _dropped_dec, Status);
__decoratorMetadata$2(_init5$1, Status);
var DragActions = class {
  /**
   * Creates a new instance of drag actions.
   *
   * @param manager - The drag and drop manager instance
   */
  constructor(manager) {
    this.manager = manager;
  }
  /**
   * Sets the source of the drag operation.
   *
   * @param source - The draggable entity or its unique identifier
   */
  setDragSource(source) {
    const { dragOperation } = this.manager;
    dragOperation.sourceIdentifier = typeof source === "string" || typeof source === "number" ? source : source.id;
  }
  /**
   * Sets the target of the drop operation.
   *
   * @param identifier - The unique identifier of the droppable entity or null/undefined
   * @returns A promise that resolves to true if the drop was prevented
   */
  setDropTarget(identifier) {
    return untracked(() => {
      const { dragOperation } = this.manager;
      const id = identifier != null ? identifier : null;
      if (dragOperation.targetIdentifier === id) {
        return Promise.resolve(false);
      }
      dragOperation.targetIdentifier = id;
      const event = defaultPreventable({
        operation: dragOperation.snapshot()
      });
      if (dragOperation.status.dragging) {
        this.manager.monitor.dispatch("dragover", event);
      }
      return this.manager.renderer.rendering.then(() => event.defaultPrevented);
    });
  }
  /**
   * Starts a new drag operation.
   *
   * @param args - Configuration for the drag operation
   * @param args.event - The event that initiated the drag
   * @param args.source - The source draggable entity or its identifier
   * @param args.coordinates - The initial coordinates of the drag
   * @returns true if the drag operation started successfully
   * @throws {Error} If there is no drag source or another operation is active
   */
  start(args) {
    return untracked(() => {
      const { dragOperation } = this.manager;
      if (args.source != null) {
        this.setDragSource(args.source);
      }
      const sourceInstance = dragOperation.source;
      if (!sourceInstance) {
        throw new Error("Cannot start a drag operation without a drag source");
      }
      if (!dragOperation.status.idle) {
        throw new Error(
          "Cannot start a drag operation while another is active"
        );
      }
      const controller = new AbortController();
      const { event: nativeEvent, coordinates } = args;
      batch(() => {
        dragOperation.status.set(
          "initialization-pending"
          /* InitializationPending */
        );
        dragOperation.shape = null;
        dragOperation.canceled = false;
        dragOperation.activatorEvent = nativeEvent != null ? nativeEvent : null;
        dragOperation.position.reset(coordinates);
      });
      const beforeStartEvent = defaultPreventable({
        operation: dragOperation.snapshot()
      });
      this.manager.monitor.dispatch("beforedragstart", beforeStartEvent);
      if (beforeStartEvent.defaultPrevented) {
        dragOperation.reset();
        controller.abort();
        return controller;
      }
      dragOperation.status.set(
        "initializing"
        /* Initializing */
      );
      dragOperation.controller = controller;
      this.manager.renderer.rendering.then(() => {
        if (controller.signal.aborted) return;
        const { status } = dragOperation;
        if (status.current !== "initializing") return;
        batch(() => {
          dragOperation.status.set(
            "dragging"
            /* Dragging */
          );
          this.manager.monitor.dispatch("dragstart", {
            nativeEvent,
            operation: dragOperation.snapshot(),
            cancelable: false
          });
        });
      });
      return controller;
    });
  }
  /**
   * Moves the dragged entity to a new position.
   *
   * @param args - Configuration for the move operation
   * @param args.by - Relative coordinates to move by
   * @param args.to - Absolute coordinates to move to
   * @param args.event - The event that triggered the move
   * @param args.cancelable - Whether the move can be canceled
   * @param args.propagate - Whether to dispatch dragmove events
   */
  move(args) {
    return untracked(() => {
      var _a5, _b2;
      const { dragOperation } = this.manager;
      const { status, controller } = dragOperation;
      if (!status.dragging || !controller || controller.signal.aborted) {
        return;
      }
      const event = defaultPreventable(
        {
          nativeEvent: args.event,
          operation: dragOperation.snapshot(),
          by: args.by,
          to: args.to
        },
        (_a5 = args.cancelable) != null ? _a5 : true
      );
      if ((_b2 = args.propagate) != null ? _b2 : true) {
        this.manager.monitor.dispatch("dragmove", event);
      }
      queueMicrotask(() => {
        var _a22, _b22, _c3, _d2, _e;
        if (event.defaultPrevented) {
          return;
        }
        const coordinates = (_e = args.to) != null ? _e : {
          x: dragOperation.position.current.x + ((_b22 = (_a22 = args.by) == null ? void 0 : _a22.x) != null ? _b22 : 0),
          y: dragOperation.position.current.y + ((_d2 = (_c3 = args.by) == null ? void 0 : _c3.y) != null ? _d2 : 0)
        };
        dragOperation.position.current = coordinates;
      });
    });
  }
  /**
   * Stops the current drag operation.
   *
   * @param args - Configuration for stopping the operation
   * @param args.event - The event that triggered the stop
   * @param args.canceled - Whether the operation was canceled
   * @remarks
   * This method:
   * - Dispatches a dragend event
   * - Allows suspension of the operation
   * - Handles cleanup of the operation state
   */
  stop(args = {}) {
    return untracked(() => {
      var _a5, _b2;
      const { dragOperation } = this.manager;
      const { controller } = dragOperation;
      if (!controller || controller.signal.aborted) return;
      let promise;
      const suspend = () => {
        const output = {
          resume: () => {
          },
          abort: () => {
          }
        };
        promise = new Promise((resolve, reject) => {
          output.resume = resolve;
          output.abort = reject;
        });
        return output;
      };
      controller.abort();
      const end = () => {
        this.manager.renderer.rendering.then(() => {
          dragOperation.status.set(
            "dropped"
            /* Dropped */
          );
          const dropping = untracked(
            () => {
              var _a22;
              return ((_a22 = dragOperation.source) == null ? void 0 : _a22.status) === "dropping";
            }
          );
          const cleanup = () => {
            if (dragOperation.controller === controller) {
              dragOperation.controller = void 0;
            }
            dragOperation.reset();
          };
          if (dropping) {
            const { source } = dragOperation;
            const dispose = effect(() => {
              if ((source == null ? void 0 : source.status) === "idle") {
                dispose();
                cleanup();
              }
            });
          } else {
            this.manager.renderer.rendering.then(cleanup);
          }
        });
      };
      dragOperation.canceled = (_a5 = args.canceled) != null ? _a5 : false;
      this.manager.monitor.dispatch("dragend", {
        nativeEvent: args.event,
        operation: dragOperation.snapshot(),
        canceled: (_b2 = args.canceled) != null ? _b2 : false,
        suspend
      });
      if (promise) {
        promise.then(end).catch(() => dragOperation.reset());
      } else {
        end();
      }
    });
  }
};
var Sensor = class extends Plugin {
  /**
   * Creates a new sensor instance.
   *
   * @param manager - The drag drop manager instance
   * @param options - Optional sensor configuration
   */
  constructor(manager, options2) {
    super(manager, options2);
    this.manager = manager;
    this.options = options2;
  }
};
var ActivationController = class extends AbortController {
  constructor(constraints, onActivate) {
    super();
    this.constraints = constraints;
    this.onActivate = onActivate;
    this.activated = false;
    for (const constraint of constraints != null ? constraints : []) {
      constraint.controller = this;
    }
  }
  onEvent(event) {
    var _a5;
    if (this.activated) return;
    if ((_a5 = this.constraints) == null ? void 0 : _a5.length) {
      for (const constraint of this.constraints) {
        constraint.onEvent(event);
      }
    } else {
      this.activate(event);
    }
  }
  activate(event) {
    if (this.activated) return;
    this.activated = true;
    this.onActivate(event);
  }
  abort(event) {
    this.activated = false;
    super.abort(event);
  }
};
var _controller;
var ActivationConstraint = class {
  constructor(options2) {
    this.options = options2;
    __privateAdd$3(this, _controller);
  }
  set controller(controller) {
    __privateSet$3(this, _controller, controller);
    controller.signal.addEventListener("abort", () => this.abort());
  }
  /**
   * Called when the activation is triggered.
   */
  activate(event) {
    var _a5;
    (_a5 = __privateGet$3(this, _controller)) == null ? void 0 : _a5.activate(event);
  }
};
_controller = /* @__PURE__ */ new WeakMap();
var Modifier = class extends Plugin {
  /**
   * Creates a new modifier instance.
   *
   * @param manager - The drag and drop manager that owns this modifier
   * @param options - Optional configuration for the modifier
   */
  constructor(manager, options2) {
    super(manager, options2);
    this.manager = manager;
    this.options = options2;
  }
  /**
   * Applies the modifier to the current drag operation.
   *
   * @param operation - The current state of the drag operation
   * @returns The transformed coordinates
   *
   * @remarks
   * Override this method to implement custom transformation logic.
   * The default implementation returns the original transform unchanged.
   */
  apply(operation) {
    return operation.transform;
  }
};
var DragDropRegistry = class {
  /**
   * Creates a new registry instance.
   *
   * @param manager - The drag and drop manager that owns this registry
   */
  constructor(manager) {
    this.draggables = new EntityRegistry();
    this.droppables = new EntityRegistry();
    this.plugins = new PluginRegistry(manager);
    this.sensors = new PluginRegistry(manager);
    this.modifiers = new PluginRegistry(manager);
  }
  register(input, options2) {
    if (input instanceof Draggable$1) {
      return this.draggables.register(input.id, input);
    }
    if (input instanceof Droppable$1) {
      return this.droppables.register(input.id, input);
    }
    if (input.prototype instanceof Modifier) {
      return this.modifiers.register(input, options2);
    }
    if (input.prototype instanceof Sensor) {
      return this.sensors.register(input, options2);
    }
    if (input.prototype instanceof Plugin) {
      return this.plugins.register(input, options2);
    }
    throw new Error("Invalid instance type");
  }
  unregister(input) {
    if (input instanceof Entity) {
      if (input instanceof Draggable$1) {
        return this.draggables.unregister(input.id, input);
      }
      if (input instanceof Droppable$1) {
        return this.droppables.unregister(input.id, input);
      }
      return () => {
      };
    }
    if (input.prototype instanceof Modifier) {
      return this.modifiers.unregister(input);
    }
    if (input.prototype instanceof Sensor) {
      return this.sensors.unregister(input);
    }
    if (input.prototype instanceof Plugin) {
      return this.plugins.unregister(input);
    }
    throw new Error("Invalid instance type");
  }
  /**
   * Destroys all registered entities and cleans up resources.
   *
   * @remarks
   * This method:
   * - Destroys all draggable and droppable entities
   * - Destroys all plugins, sensors, and modifiers
   * - Cleans up any associated resources
   */
  destroy() {
    this.draggables.destroy();
    this.droppables.destroy();
    this.plugins.destroy();
    this.sensors.destroy();
    this.modifiers.destroy();
  }
};
var _transform_dec, _target_dec, _source_dec, _modifiers_dec2, _targetIdentifier_dec, _sourceIdentifier_dec, _activatorEvent_dec, _canceled_dec, _shape_dec2, _manager2, _previousSource, _shape2, _init6$1, _canceled, _activatorEvent, _sourceIdentifier, _targetIdentifier, _modifiers2, _transform;
_shape_dec2 = [derived], _canceled_dec = [reactive], _activatorEvent_dec = [reactive], _sourceIdentifier_dec = [reactive], _targetIdentifier_dec = [reactive], _modifiers_dec2 = [reactive], _source_dec = [derived], _target_dec = [derived], _transform_dec = [derived];
var DragOperation = class {
  /**
   * Creates a new drag operation instance.
   *
   * @param manager - The drag and drop manager that owns this operation
   */
  constructor(manager) {
    __runInitializers$2(_init6$1, 5, this);
    __privateAdd$3(this, _manager2);
    __privateAdd$3(this, _previousSource);
    __privateAdd$3(this, _shape2, new ValueHistory(
      void 0,
      (a, b) => a && b ? a.equals(b) : a === b
    ));
    this.status = new Status();
    __privateAdd$3(this, _canceled, __runInitializers$2(_init6$1, 8, this, false)), __runInitializers$2(_init6$1, 11, this);
    __privateAdd$3(this, _activatorEvent, __runInitializers$2(_init6$1, 12, this, null)), __runInitializers$2(_init6$1, 15, this);
    __privateAdd$3(this, _sourceIdentifier, __runInitializers$2(_init6$1, 16, this, null)), __runInitializers$2(_init6$1, 19, this);
    __privateAdd$3(this, _targetIdentifier, __runInitializers$2(_init6$1, 20, this, null)), __runInitializers$2(_init6$1, 23, this);
    __privateAdd$3(this, _modifiers2, __runInitializers$2(_init6$1, 24, this, [])), __runInitializers$2(_init6$1, 27, this);
    this.position = new Position$1({ x: 0, y: 0 });
    __privateAdd$3(this, _transform, { x: 0, y: 0 });
    __privateSet$3(this, _manager2, manager);
  }
  get shape() {
    const { current, initial, previous } = __privateGet$3(this, _shape2);
    if (!current || !initial) {
      return null;
    }
    return { current, initial, previous };
  }
  /**
   * Sets the shape of the dragged entity.
   *
   * @param value - The new shape or null to reset
   */
  set shape(value) {
    if (!value) {
      __privateGet$3(this, _shape2).reset();
    } else {
      __privateGet$3(this, _shape2).current = value;
    }
  }
  get source() {
    var _a5;
    const identifier = this.sourceIdentifier;
    if (identifier == null) return null;
    const value = __privateGet$3(this, _manager2).registry.draggables.get(identifier);
    if (value) {
      __privateSet$3(this, _previousSource, value);
    }
    return (_a5 = value != null ? value : __privateGet$3(this, _previousSource)) != null ? _a5 : null;
  }
  get target() {
    var _a5;
    const identifier = this.targetIdentifier;
    return identifier != null ? (_a5 = __privateGet$3(this, _manager2).registry.droppables.get(identifier)) != null ? _a5 : null : null;
  }
  get transform() {
    const { x, y } = this.position.delta;
    let transform = { x, y };
    for (const modifier of this.modifiers) {
      transform = modifier.apply(__spreadProps$2(__spreadValues$2({}, this.snapshot()), {
        transform
      }));
    }
    __privateSet$3(this, _transform, transform);
    return transform;
  }
  /**
   * Creates a snapshot of the current drag operation state.
   *
   * @returns An immutable snapshot of the current operation state
   */
  snapshot() {
    return untracked(() => ({
      source: this.source,
      target: this.target,
      activatorEvent: this.activatorEvent,
      transform: __privateGet$3(this, _transform),
      shape: this.shape ? snapshot(this.shape) : null,
      position: snapshot(this.position),
      status: snapshot(this.status),
      canceled: this.canceled
    }));
  }
  /**
   * Resets the drag operation to its initial state.
   *
   * @remarks
   * This method:
   * - Sets status to idle
   * - Clears source and target identifiers
   * - Resets shape history
   * - Resets position and transform
   * - Clears modifiers
   */
  reset() {
    batch(() => {
      this.status.set(
        "idle"
        /* Idle */
      );
      this.sourceIdentifier = null;
      this.targetIdentifier = null;
      __privateGet$3(this, _shape2).reset();
      this.position.reset({ x: 0, y: 0 });
      __privateSet$3(this, _transform, { x: 0, y: 0 });
      this.modifiers = [];
    });
  }
};
_init6$1 = __decoratorStart$2(null);
_manager2 = /* @__PURE__ */ new WeakMap();
_previousSource = /* @__PURE__ */ new WeakMap();
_shape2 = /* @__PURE__ */ new WeakMap();
_canceled = /* @__PURE__ */ new WeakMap();
_activatorEvent = /* @__PURE__ */ new WeakMap();
_sourceIdentifier = /* @__PURE__ */ new WeakMap();
_targetIdentifier = /* @__PURE__ */ new WeakMap();
_modifiers2 = /* @__PURE__ */ new WeakMap();
_transform = /* @__PURE__ */ new WeakMap();
__decorateElement$2(_init6$1, 2, "shape", _shape_dec2, DragOperation);
__decorateElement$2(_init6$1, 4, "canceled", _canceled_dec, DragOperation, _canceled);
__decorateElement$2(_init6$1, 4, "activatorEvent", _activatorEvent_dec, DragOperation, _activatorEvent);
__decorateElement$2(_init6$1, 4, "sourceIdentifier", _sourceIdentifier_dec, DragOperation, _sourceIdentifier);
__decorateElement$2(_init6$1, 4, "targetIdentifier", _targetIdentifier_dec, DragOperation, _targetIdentifier);
__decorateElement$2(_init6$1, 4, "modifiers", _modifiers_dec2, DragOperation, _modifiers2);
__decorateElement$2(_init6$1, 2, "source", _source_dec, DragOperation);
__decorateElement$2(_init6$1, 2, "target", _target_dec, DragOperation);
__decorateElement$2(_init6$1, 2, "transform", _transform_dec, DragOperation);
__decoratorMetadata$2(_init6$1, DragOperation);
var defaultRenderer = {
  get rendering() {
    return Promise.resolve();
  }
};
function resolveCustomizable(value, defaults3) {
  if (typeof value === "function") {
    return value(defaults3);
  }
  return value != null ? value : defaults3;
}
var DragDropManager$1 = class DragDropManager {
  /**
   * Creates a new drag and drop manager instance.
   *
   * @param config - Optional configuration for plugins, sensors, modifiers, and renderer
   */
  constructor(config) {
    this.destroy = () => {
      if (!this.dragOperation.status.idle) {
        this.actions.stop({ canceled: true });
      }
      this.dragOperation.modifiers.forEach((modifier) => modifier.destroy());
      this.registry.destroy();
      this.collisionObserver.destroy();
    };
    var _a5;
    const raw = config != null ? config : {};
    const plugins = resolveCustomizable(raw.plugins, []);
    const sensors = resolveCustomizable(raw.sensors, []);
    const modifiers = resolveCustomizable(raw.modifiers, []);
    const renderer = (_a5 = raw.renderer) != null ? _a5 : defaultRenderer;
    const monitor = new DragDropMonitor(this);
    const registry = new DragDropRegistry(this);
    this.registry = registry;
    this.monitor = monitor;
    this.renderer = renderer;
    this.actions = new DragActions(this);
    this.dragOperation = new DragOperation(this);
    this.collisionObserver = new CollisionObserver(this);
    this.plugins = [CollisionNotifier, ...plugins];
    this.modifiers = modifiers;
    this.sensors = sensors;
    const { destroy } = this;
    const cleanup = effects(() => {
      var _a22, _b2, _c3;
      const currentModifiers = untracked(() => this.dragOperation.modifiers);
      const managerModifiers = this.modifiers;
      for (const modifier of currentModifiers) {
        if (!managerModifiers.includes(modifier)) {
          modifier.destroy();
        }
      }
      this.dragOperation.modifiers = (_c3 = (_b2 = (_a22 = this.dragOperation.source) == null ? void 0 : _a22.modifiers) == null ? void 0 : _b2.map((modifier) => {
        const { plugin, options: options2 } = descriptor(modifier);
        return new plugin(this, options2);
      })) != null ? _c3 : managerModifiers;
    });
    this.destroy = () => {
      cleanup();
      destroy();
    };
  }
  /**
   * Gets the list of active plugins.
   *
   * @returns Array of active plugin instances
   */
  get plugins() {
    return this.registry.plugins.values;
  }
  /**
   * Sets the list of plugins to be used by the manager.
   *
   * @param plugins - Array of plugin constructors or instances
   */
  set plugins(plugins) {
    this.registry.plugins.values = plugins;
  }
  /**
   * Gets the list of active modifiers.
   *
   * @returns Array of active modifier instances
   */
  get modifiers() {
    return this.registry.modifiers.values;
  }
  /**
   * Sets the list of modifiers to be used by the manager.
   *
   * @param modifiers - Array of modifier constructors or instances
   */
  set modifiers(modifiers) {
    this.registry.modifiers.values = modifiers;
  }
  /**
   * Gets the list of active sensors.
   *
   * @returns Array of active sensor instances
   */
  get sensors() {
    return this.registry.sensors.values;
  }
  /**
   * Sets the list of sensors to be used by the manager.
   *
   * @param sensors - Array of sensor constructors or instances
   */
  set sensors(sensors) {
    this.registry.sensors.values = sensors;
  }
};
var __typeError$2 = (msg) => {
  throw TypeError(msg);
};
var __accessCheck$2 = (obj, member, msg) => member.has(obj) || __typeError$2("Cannot " + msg);
var __privateGet$2 = (obj, member, getter) => (__accessCheck$2(obj, member, "read from private field"), member.get(obj));
var __privateAdd$2 = (obj, member, value) => member.has(obj) ? __typeError$2("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet$2 = (obj, member, value, setter) => (__accessCheck$2(obj, member, "write to private field"), member.set(obj, value), value);
var __privateMethod$1 = (obj, member, method) => (__accessCheck$2(obj, member, "access private method"), method);
function isKeyframeEffect(effect2) {
  if (!effect2) return false;
  if (effect2 instanceof KeyframeEffect) return true;
  return "getKeyframes" in effect2 && typeof effect2.getKeyframes === "function";
}
function getFinalKeyframe(element, match) {
  const animations2 = element.getAnimations();
  let result = null;
  for (const animation of animations2) {
    if (animation.playState !== "running") continue;
    const { effect: effect2 } = animation;
    const keyframes = isKeyframeEffect(effect2) ? effect2.getKeyframes() : [];
    const matchedKeyframes = keyframes.filter(match);
    if (matchedKeyframes.length > 0) {
      result = [matchedKeyframes[matchedKeyframes.length - 1], animation];
    }
  }
  return result;
}
function getBoundingRectangle(element) {
  const { width, height, top, left, bottom, right } = element.getBoundingClientRect();
  return { width, height, top, left, bottom, right };
}
function isWindow(element) {
  const elementString = Object.prototype.toString.call(element);
  return elementString === "[object Window]" || // In Electron context the Window object serializes to [object global]
  elementString === "[object global]";
}
function isNode(node) {
  return "nodeType" in node;
}
function getWindow(target) {
  var _a5, _b2, _c3;
  if (!target) {
    return window;
  }
  if (isWindow(target)) {
    return target;
  }
  if (!isNode(target)) {
    return window;
  }
  if ("defaultView" in target) {
    return (_a5 = target.defaultView) != null ? _a5 : window;
  }
  return (_c3 = (_b2 = target.ownerDocument) == null ? void 0 : _b2.defaultView) != null ? _c3 : window;
}
function isDocument(node) {
  const { Document: Document2 } = getWindow(node);
  return node instanceof Document2 || "nodeType" in node && node.nodeType === Node.DOCUMENT_NODE;
}
function isHTMLElement(node) {
  if (!node || isWindow(node)) return false;
  return node instanceof getWindow(node).HTMLElement || "namespaceURI" in node && typeof node.namespaceURI === "string" && node.namespaceURI.endsWith("html");
}
function isSVGElement(node) {
  return node instanceof getWindow(node).SVGElement || "namespaceURI" in node && typeof node.namespaceURI === "string" && node.namespaceURI.endsWith("svg");
}
function getDocument(target) {
  if (!target) {
    return document;
  }
  if (isWindow(target)) {
    return target.document;
  }
  if (!isNode(target)) {
    return document;
  }
  if (isDocument(target)) {
    return target;
  }
  if (isHTMLElement(target) || isSVGElement(target)) {
    return target.ownerDocument;
  }
  return document;
}
function getViewportBoundingRectangle(element) {
  var _a5, _b2, _c3, _d2;
  const { documentElement } = getDocument(element);
  const vv = getWindow(element).visualViewport;
  const width = (_a5 = vv == null ? void 0 : vv.width) != null ? _a5 : documentElement.clientWidth;
  const height = (_b2 = vv == null ? void 0 : vv.height) != null ? _b2 : documentElement.clientHeight;
  const top = (_c3 = vv == null ? void 0 : vv.offsetTop) != null ? _c3 : 0;
  const left = (_d2 = vv == null ? void 0 : vv.offsetLeft) != null ? _d2 : 0;
  return {
    top,
    left,
    right: left + width,
    bottom: top + height,
    width,
    height
  };
}
function isOverflowVisible(element, style) {
  if (isDetailsElement(element) && element.open === false) {
    return false;
  }
  const { overflow, overflowX, overflowY } = getComputedStyle(element);
  return overflow === "visible" && overflowX === "visible" && overflowY === "visible";
}
function isDetailsElement(element) {
  return element.tagName === "DETAILS";
}
function getVisibleBoundingRectangle(element, boundingClientRect = element.getBoundingClientRect(), margin = 0) {
  var _a5, _b2, _c3, _d2, _e;
  let rect = boundingClientRect;
  const { ownerDocument } = element;
  const ownerWindow = (_a5 = ownerDocument.defaultView) != null ? _a5 : window;
  let ancestor = element.parentElement;
  while (ancestor && ancestor !== ownerDocument.documentElement) {
    if (!isOverflowVisible(ancestor)) {
      const ancestorRect = ancestor.getBoundingClientRect();
      const marginTop = margin * (ancestorRect.bottom - ancestorRect.top);
      const marginRight = margin * (ancestorRect.right - ancestorRect.left);
      const marginBottom = margin * (ancestorRect.bottom - ancestorRect.top);
      const marginLeft = margin * (ancestorRect.right - ancestorRect.left);
      rect = {
        top: Math.max(rect.top, ancestorRect.top - marginTop),
        right: Math.min(rect.right, ancestorRect.right + marginRight),
        bottom: Math.min(rect.bottom, ancestorRect.bottom + marginBottom),
        left: Math.max(rect.left, ancestorRect.left - marginLeft),
        width: 0,
        // Will be calculated next
        height: 0
        // Will be calculated next
      };
      rect.width = rect.right - rect.left;
      rect.height = rect.bottom - rect.top;
    }
    ancestor = ancestor.parentElement;
  }
  const vv = ownerWindow.visualViewport;
  const viewportTop = (_b2 = vv == null ? void 0 : vv.offsetTop) != null ? _b2 : 0;
  const viewportLeft = (_c3 = vv == null ? void 0 : vv.offsetLeft) != null ? _c3 : 0;
  const viewportWidth = (_d2 = vv == null ? void 0 : vv.width) != null ? _d2 : ownerWindow.innerWidth;
  const viewportHeight = (_e = vv == null ? void 0 : vv.height) != null ? _e : ownerWindow.innerHeight;
  const viewportMarginY = margin * viewportHeight;
  const viewportMarginX = margin * viewportWidth;
  rect = {
    top: Math.max(rect.top, viewportTop - viewportMarginY),
    right: Math.min(
      rect.right,
      viewportLeft + viewportWidth + viewportMarginX
    ),
    bottom: Math.min(
      rect.bottom,
      viewportTop + viewportHeight + viewportMarginY
    ),
    left: Math.max(rect.left, viewportLeft - viewportMarginX),
    width: 0,
    // Will be calculated next
    height: 0
    // Will be calculated next
  };
  rect.width = rect.right - rect.left;
  rect.height = rect.bottom - rect.top;
  if (rect.width < 0) {
    rect.width = 0;
  }
  if (rect.height < 0) {
    rect.height = 0;
  }
  return rect;
}
function getEventCoordinates(event) {
  return {
    x: event.clientX,
    y: event.clientY
  };
}
var canUseDOM$1 = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
function getDocuments(rootDoc = document, seen = /* @__PURE__ */ new Set()) {
  if (seen.has(rootDoc)) return [];
  seen.add(rootDoc);
  const docs = [rootDoc];
  for (const frame of Array.from(
    rootDoc.querySelectorAll("iframe, frame")
  )) {
    try {
      const childDoc = frame.contentDocument;
      if (childDoc && !seen.has(childDoc)) {
        docs.push(...getDocuments(childDoc, seen));
      }
    } catch (e) {
    }
  }
  try {
    const win = rootDoc.defaultView;
    if (win && win !== window.top) {
      const parentWin = win.parent;
      if (parentWin && parentWin.document && parentWin.document !== rootDoc) {
        docs.push(...getDocuments(parentWin.document, seen));
      }
    }
  } catch (e) {
  }
  return docs;
}
function isSafari() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}
function getFixedPositionOffset() {
  var _a5, _b2;
  const vv = isSafari() ? window.visualViewport : null;
  return {
    x: (_a5 = vv == null ? void 0 : vv.offsetLeft) != null ? _a5 : 0,
    y: (_b2 = vv == null ? void 0 : vv.offsetTop) != null ? _b2 : 0
  };
}
function isShadowRoot(target) {
  if (!target || !isNode(target)) return false;
  return target instanceof getWindow(target).ShadowRoot;
}
function getRoot(target) {
  if (target && isNode(target)) {
    let root = target.getRootNode();
    if (isShadowRoot(root)) {
      return root;
    } else if (root instanceof Document) {
      return root;
    }
  }
  return getDocument(target);
}
function prefersReducedMotion(window2) {
  return window2.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function cloneElement(element) {
  const selector = "input, textarea, select, canvas, [contenteditable]";
  const clonedElement = element.cloneNode(true);
  const fields = Array.from(element.querySelectorAll(selector));
  const clonedFields = Array.from(clonedElement.querySelectorAll(selector));
  clonedFields.forEach((field, index) => {
    const originalField = fields[index];
    if (isField(field) && isField(originalField)) {
      if (field.type !== "file") {
        field.value = originalField.value;
      }
      if (field.type === "radio" && field.name) {
        field.name = `Cloned__${field.name}`;
      }
    }
    if (isCanvasElement(field) && isCanvasElement(originalField) && originalField.width > 0 && originalField.height > 0) {
      const destCtx = field.getContext("2d");
      destCtx == null ? void 0 : destCtx.drawImage(originalField, 0, 0);
    }
  });
  return clonedElement;
}
function isField(element) {
  return "value" in element;
}
function isCanvasElement(element) {
  return element.tagName === "CANVAS";
}
function getElementFromPoint(root, { x, y }) {
  const element = root.elementFromPoint(x, y);
  if (isIFrameElement(element)) {
    const { contentDocument } = element;
    if (contentDocument) {
      const { left, top } = element.getBoundingClientRect();
      return getElementFromPoint(contentDocument, {
        x: x - left,
        y: y - top
      });
    }
  }
  return element;
}
function isIFrameElement(element) {
  return (element == null ? void 0 : element.tagName) === "IFRAME";
}
var ProxiedElements = /* @__PURE__ */ new WeakMap();
function getInteractiveElement(element) {
  return element.closest(`
    input:not([disabled]),
    select:not([disabled]),
    textarea:not([disabled]),
    button:not([disabled]),
    a[href],
    [contenteditable]:not([contenteditable="false"])
  `);
}
var Listeners = class {
  constructor() {
    this.entries = /* @__PURE__ */ new Set();
    this.clear = () => {
      for (const entry of this.entries) {
        const [target, { type, listener, options: options2 }] = entry;
        target.removeEventListener(type, listener, options2);
      }
      this.entries.clear();
    };
  }
  bind(target, input) {
    const eventTargets = Array.isArray(target) ? target : [target];
    const listeners = Array.isArray(input) ? input : [input];
    const entries = [];
    for (const target2 of eventTargets) {
      for (const descriptor2 of listeners) {
        const { type, listener, options: options2 } = descriptor2;
        const entry = [target2, descriptor2];
        target2.addEventListener(type, listener, options2);
        this.entries.add(entry);
        entries.push(entry);
      }
    }
    const allEntries = this.entries;
    return function cleanup() {
      for (const entry of entries) {
        const [target2, { type, listener, options: options2 }] = entry;
        target2.removeEventListener(type, listener, options2);
        allEntries.delete(entry);
      }
    };
  }
};
function getFrameElement(el) {
  const refWindow = el == null ? void 0 : el.ownerDocument.defaultView;
  if (refWindow && refWindow.self !== refWindow.parent) {
    return refWindow.frameElement;
  }
}
function getFrameElements(el) {
  const frames = /* @__PURE__ */ new Set();
  let frame = getFrameElement(el);
  while (frame) {
    frames.add(frame);
    frame = getFrameElement(frame);
  }
  return frames;
}
function timeout(callback, duration) {
  const id = setTimeout(callback, duration);
  return () => clearTimeout(id);
}
function throttle(func, limit) {
  const time = () => performance.now();
  let cancel;
  let lastRan;
  return function(...args) {
    const context = this;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = time();
    } else {
      cancel == null ? void 0 : cancel();
      cancel = timeout(
        () => {
          func.apply(context, args);
          lastRan = time();
        },
        limit - (time() - lastRan)
      );
    }
  };
}
function isRectEqual(a, b) {
  if (a === b) return true;
  if (!a || !b) return false;
  return a.top == b.top && a.left == b.left && a.right == b.right && a.bottom == b.bottom;
}
function isVisible(element, boundingClientRect = element.getBoundingClientRect()) {
  const { width, height } = getVisibleBoundingRectangle(
    element,
    boundingClientRect
  );
  return width > 0 && height > 0;
}
var Observer = typeof ResizeObserver !== "undefined" ? ResizeObserver : class MockResizeObserver {
  observe() {
  }
  unobserve() {
  }
  disconnect() {
  }
};
var _initialized;
var ResizeNotifier = class extends Observer {
  constructor(callback) {
    super((entries) => {
      if (!__privateGet$2(this, _initialized)) {
        __privateSet$2(this, _initialized, true);
        return;
      }
      callback(entries, this);
    });
    __privateAdd$2(this, _initialized, false);
  }
};
_initialized = /* @__PURE__ */ new WeakMap();
var threshold = Array.from({ length: 100 }, (_, index) => index / 100);
var THROTTLE_INTERVAL = 75;
var _visible, _previousBoundingClientRect, _resizeObserver, _positionObserver, _visibilityObserver, _debug, _disconnected, _observePosition, _PositionObserver_instances, notify_fn, updateDebug_fn;
var PositionObserver = class {
  constructor(element, callback, options2 = {
    debug: false,
    skipInitial: false
  }) {
    this.element = element;
    this.callback = callback;
    __privateAdd$2(this, _PositionObserver_instances);
    this.disconnect = () => {
      var _a5, _b2, _c3;
      __privateSet$2(this, _disconnected, true);
      (_a5 = __privateGet$2(this, _resizeObserver)) == null ? void 0 : _a5.disconnect();
      (_b2 = __privateGet$2(this, _positionObserver)) == null ? void 0 : _b2.disconnect();
      __privateGet$2(this, _visibilityObserver).disconnect();
      (_c3 = __privateGet$2(this, _debug)) == null ? void 0 : _c3.remove();
    };
    __privateAdd$2(this, _visible, true);
    __privateAdd$2(this, _previousBoundingClientRect);
    __privateAdd$2(this, _resizeObserver);
    __privateAdd$2(this, _positionObserver);
    __privateAdd$2(this, _visibilityObserver);
    __privateAdd$2(this, _debug);
    __privateAdd$2(this, _disconnected, false);
    __privateAdd$2(this, _observePosition, throttle(() => {
      var _a5, _b2, _c3;
      const { element: element2 } = this;
      (_a5 = __privateGet$2(this, _positionObserver)) == null ? void 0 : _a5.disconnect();
      if (__privateGet$2(this, _disconnected) || !__privateGet$2(this, _visible) || !element2.isConnected) {
        return;
      }
      const root2 = (_b2 = element2.ownerDocument) != null ? _b2 : document;
      const { innerHeight, innerWidth } = (_c3 = root2.defaultView) != null ? _c3 : window;
      const clientRect = element2.getBoundingClientRect();
      const visibleRect = getVisibleBoundingRectangle(element2, clientRect);
      const { top, left, bottom, right } = visibleRect;
      const insetTop = -Math.floor(top);
      const insetLeft = -Math.floor(left);
      const insetRight = -Math.floor(innerWidth - right);
      const insetBottom = -Math.floor(innerHeight - bottom);
      const rootMargin = `${insetTop}px ${insetRight}px ${insetBottom}px ${insetLeft}px`;
      this.boundingClientRect = clientRect;
      __privateSet$2(this, _positionObserver, new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          const { intersectionRect } = entry;
          const intersectionRatio = entry.intersectionRatio !== 1 ? entry.intersectionRatio : Rectangle.intersectionRatio(
            intersectionRect,
            getVisibleBoundingRectangle(element2)
          );
          if (intersectionRatio !== 1) {
            __privateGet$2(this, _observePosition).call(this);
          }
        },
        {
          threshold,
          rootMargin,
          root: root2
        }
      ));
      __privateGet$2(this, _positionObserver).observe(element2);
      __privateMethod$1(this, _PositionObserver_instances, notify_fn).call(this);
    }, THROTTLE_INTERVAL));
    this.boundingClientRect = element.getBoundingClientRect();
    __privateSet$2(this, _visible, isVisible(element, this.boundingClientRect));
    let initial = true;
    this.callback = (boundingClientRect) => {
      if (initial) {
        initial = false;
        if (options2.skipInitial) return;
      }
      callback(boundingClientRect);
    };
    const root = element.ownerDocument;
    if (options2 == null ? void 0 : options2.debug) {
      __privateSet$2(this, _debug, document.createElement("div"));
      __privateGet$2(this, _debug).style.background = "rgba(0,0,0,0.15)";
      __privateGet$2(this, _debug).style.position = "fixed";
      __privateGet$2(this, _debug).style.pointerEvents = "none";
      root.body.appendChild(__privateGet$2(this, _debug));
    }
    __privateSet$2(this, _visibilityObserver, new IntersectionObserver(
      (entries) => {
        var _a5, _b2;
        const entry = entries[entries.length - 1];
        const { boundingClientRect, isIntersecting: visible } = entry;
        const { width, height } = boundingClientRect;
        const previousVisible = __privateGet$2(this, _visible);
        __privateSet$2(this, _visible, visible);
        if (!width && !height) return;
        if (previousVisible && !visible) {
          (_a5 = __privateGet$2(this, _positionObserver)) == null ? void 0 : _a5.disconnect();
          this.callback(null);
          (_b2 = __privateGet$2(this, _resizeObserver)) == null ? void 0 : _b2.disconnect();
          __privateSet$2(this, _resizeObserver, void 0);
          if (__privateGet$2(this, _debug)) __privateGet$2(this, _debug).style.visibility = "hidden";
        } else {
          __privateGet$2(this, _observePosition).call(this);
        }
        if (visible && !__privateGet$2(this, _resizeObserver)) {
          __privateSet$2(this, _resizeObserver, new ResizeNotifier(__privateGet$2(this, _observePosition)));
          __privateGet$2(this, _resizeObserver).observe(element);
        }
      },
      {
        threshold,
        root
      }
    ));
    if (__privateGet$2(this, _visible) && !options2.skipInitial) {
      this.callback(this.boundingClientRect);
    }
    __privateGet$2(this, _visibilityObserver).observe(element);
  }
};
_visible = /* @__PURE__ */ new WeakMap();
_previousBoundingClientRect = /* @__PURE__ */ new WeakMap();
_resizeObserver = /* @__PURE__ */ new WeakMap();
_positionObserver = /* @__PURE__ */ new WeakMap();
_visibilityObserver = /* @__PURE__ */ new WeakMap();
_debug = /* @__PURE__ */ new WeakMap();
_disconnected = /* @__PURE__ */ new WeakMap();
_observePosition = /* @__PURE__ */ new WeakMap();
_PositionObserver_instances = /* @__PURE__ */ new WeakSet();
notify_fn = function() {
  if (__privateGet$2(this, _disconnected)) return;
  __privateMethod$1(this, _PositionObserver_instances, updateDebug_fn).call(this);
  if (isRectEqual(this.boundingClientRect, __privateGet$2(this, _previousBoundingClientRect)))
    return;
  this.callback(this.boundingClientRect);
  __privateSet$2(this, _previousBoundingClientRect, this.boundingClientRect);
};
updateDebug_fn = function() {
  if (__privateGet$2(this, _debug)) {
    const { top, left, width, height } = getVisibleBoundingRectangle(
      this.element
    );
    __privateGet$2(this, _debug).style.overflow = "hidden";
    __privateGet$2(this, _debug).style.visibility = "visible";
    __privateGet$2(this, _debug).style.top = `${Math.floor(top)}px`;
    __privateGet$2(this, _debug).style.left = `${Math.floor(left)}px`;
    __privateGet$2(this, _debug).style.width = `${Math.floor(width)}px`;
    __privateGet$2(this, _debug).style.height = `${Math.floor(height)}px`;
  }
};
var framePositionObservers = /* @__PURE__ */ new WeakMap();
var scrollListeners = /* @__PURE__ */ new WeakMap();
function addFrameListener(frame, callback) {
  let cached = framePositionObservers.get(frame);
  if (!cached) {
    const observer = new PositionObserver(
      frame,
      (boundingClientRect) => {
        const cached2 = framePositionObservers.get(frame);
        if (!cached2) return;
        cached2.callbacks.forEach((callback2) => callback2(boundingClientRect));
      },
      { skipInitial: true }
    );
    cached = { disconnect: observer.disconnect, callbacks: /* @__PURE__ */ new Set() };
  }
  cached.callbacks.add(callback);
  framePositionObservers.set(frame, cached);
  return () => {
    cached.callbacks.delete(callback);
    if (cached.callbacks.size === 0) {
      framePositionObservers.delete(frame);
      cached.disconnect();
    }
  };
}
function observeParentFrames(frames, callback) {
  const cleanup = /* @__PURE__ */ new Set();
  for (const frame of frames) {
    const remove = addFrameListener(frame, callback);
    cleanup.add(remove);
  }
  return () => cleanup.forEach((remove) => remove());
}
function addScrollListener(element, callback) {
  var _a5;
  const doc = element.ownerDocument;
  if (!scrollListeners.has(doc)) {
    const controller = new AbortController();
    const listeners2 = /* @__PURE__ */ new Set();
    document.addEventListener(
      "scroll",
      (event) => listeners2.forEach((listener) => listener(event)),
      {
        capture: true,
        passive: true,
        signal: controller.signal
      }
    );
    scrollListeners.set(doc, { disconnect: () => controller.abort(), listeners: listeners2 });
  }
  const { listeners, disconnect } = (_a5 = scrollListeners.get(doc)) != null ? _a5 : {};
  if (!listeners || !disconnect) return () => {
  };
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
    if (listeners.size === 0) {
      disconnect();
      scrollListeners.delete(doc);
    }
  };
}
var _elementObserver, _disconnected2, _frames, _handleScroll;
var FrameObserver = class {
  constructor(element, callback, options2) {
    this.callback = callback;
    __privateAdd$2(this, _elementObserver);
    __privateAdd$2(this, _disconnected2, false);
    __privateAdd$2(this, _frames);
    __privateAdd$2(this, _handleScroll, throttle((event) => {
      if (__privateGet$2(this, _disconnected2)) return;
      if (!event.target) return;
      if ("contains" in event.target && typeof event.target.contains === "function") {
        for (const frame of __privateGet$2(this, _frames)) {
          if (event.target.contains(frame)) {
            this.callback(__privateGet$2(this, _elementObserver).boundingClientRect);
            break;
          }
        }
      }
    }, THROTTLE_INTERVAL));
    const frames = getFrameElements(element);
    const unobserveParentFrames = observeParentFrames(frames, callback);
    const removeScrollListener = addScrollListener(element, __privateGet$2(this, _handleScroll));
    __privateSet$2(this, _frames, frames);
    __privateSet$2(this, _elementObserver, new PositionObserver(element, callback, options2));
    this.disconnect = () => {
      if (__privateGet$2(this, _disconnected2)) return;
      __privateSet$2(this, _disconnected2, true);
      unobserveParentFrames();
      removeScrollListener();
      __privateGet$2(this, _elementObserver).disconnect();
    };
  }
};
_elementObserver = /* @__PURE__ */ new WeakMap();
_disconnected2 = /* @__PURE__ */ new WeakMap();
_frames = /* @__PURE__ */ new WeakMap();
_handleScroll = /* @__PURE__ */ new WeakMap();
function supportsPopover(element) {
  return "showPopover" in element && "hidePopover" in element && typeof element.showPopover === "function" && typeof element.hidePopover === "function";
}
function showPopover(element) {
  try {
    if (supportsPopover(element) && element.isConnected && element.hasAttribute("popover") && // This selector can throw an error in browsers that don't support it
    !element.matches(":popover-open")) {
      element.showPopover();
    }
  } catch (error) {
  }
}
function isDocumentScrollingElement(element) {
  if (!canUseDOM$1 || !element) {
    return false;
  }
  return element === getDocument(element).scrollingElement;
}
function getScrollPosition(scrollableElement) {
  var _a5, _b2;
  const window2 = getWindow(scrollableElement);
  const rect = isDocumentScrollingElement(scrollableElement) ? getViewportBoundingRectangle(scrollableElement) : getBoundingRectangle(scrollableElement);
  const vv = window2.visualViewport;
  const dimensions = isDocumentScrollingElement(scrollableElement) ? {
    height: (_a5 = vv == null ? void 0 : vv.height) != null ? _a5 : window2.innerHeight,
    width: (_b2 = vv == null ? void 0 : vv.width) != null ? _b2 : window2.innerWidth
  } : {
    height: scrollableElement.clientHeight,
    width: scrollableElement.clientWidth
  };
  const position = {
    current: {
      x: scrollableElement.scrollLeft,
      y: scrollableElement.scrollTop
    },
    max: {
      x: scrollableElement.scrollWidth - dimensions.width,
      y: scrollableElement.scrollHeight - dimensions.height
    }
  };
  const isTop = position.current.y <= 0;
  const isLeft = position.current.x <= 0;
  const isBottom = position.current.y >= position.max.y;
  const isRight = position.current.x >= position.max.x;
  return {
    rect,
    position,
    isTop,
    isLeft,
    isBottom,
    isRight
  };
}
function canScroll(scrollableElement, by, scrollPosition = getScrollPosition(scrollableElement)) {
  const { isTop, isBottom, isLeft, isRight, position } = scrollPosition;
  const { x, y } = by != null ? by : { x: 0, y: 0 };
  const top = !isTop && position.current.y + y > 0;
  const bottom = !isBottom && position.current.y + y < position.max.y;
  const left = !isLeft && position.current.x + x > 0;
  const right = !isRight && position.current.x + x < position.max.x;
  return {
    top,
    bottom,
    left,
    right,
    x: left || right,
    y: top || bottom
  };
}
var Scheduler$1 = class Scheduler {
  constructor(scheduler4) {
    this.scheduler = scheduler4;
    this.pending = false;
    this.tasks = /* @__PURE__ */ new Set();
    this.resolvers = /* @__PURE__ */ new Set();
    this.flush = () => {
      const { tasks, resolvers } = this;
      this.pending = false;
      this.tasks = /* @__PURE__ */ new Set();
      this.resolvers = /* @__PURE__ */ new Set();
      for (const task of tasks) {
        task();
      }
      for (const resolve of resolvers) {
        resolve();
      }
    };
  }
  schedule(task) {
    this.tasks.add(task);
    if (!this.pending) {
      this.pending = true;
      this.scheduler(this.flush);
    }
    return new Promise((resolve) => this.resolvers.add(resolve));
  }
};
var scheduler = new Scheduler$1((callback) => {
  if (typeof requestAnimationFrame === "function") {
    requestAnimationFrame(callback);
  } else {
    callback();
  }
});
var scheduler2 = new Scheduler$1((callback) => setTimeout(callback, 50));
var cachedStyles = /* @__PURE__ */ new Map();
var clear = cachedStyles.clear.bind(cachedStyles);
function getComputedStyles(element, cached = false) {
  if (!cached) return computeStyles(element);
  let styles = cachedStyles.get(element);
  if (styles) return styles;
  styles = computeStyles(element);
  cachedStyles.set(element, styles);
  scheduler2.schedule(clear);
  return styles;
}
function computeStyles(element) {
  return getWindow(element).getComputedStyle(element);
}
function isFixed(node, computedStyle = getComputedStyles(node, true)) {
  return computedStyle.position === "fixed" || computedStyle.position === "sticky";
}
function isScrollable(element, computedStyle = getComputedStyles(element, true)) {
  const overflowRegex = /(auto|scroll|overlay)/;
  const properties = ["overflow", "overflowX", "overflowY"];
  return properties.some((property) => {
    const value = computedStyle[property];
    return typeof value === "string" ? overflowRegex.test(value) : false;
  });
}
var defaultOptions = {
  excludeElement: true,
  escapeShadowDOM: true
};
function getScrollableAncestors(element, options2 = defaultOptions) {
  const { limit, excludeElement, escapeShadowDOM } = options2;
  const scrollParents = /* @__PURE__ */ new Set();
  function findScrollableAncestors(node) {
    if (limit != null && scrollParents.size >= limit) {
      return scrollParents;
    }
    if (!node) {
      return scrollParents;
    }
    if (isDocument(node) && node.scrollingElement != null && !scrollParents.has(node.scrollingElement)) {
      scrollParents.add(node.scrollingElement);
      return scrollParents;
    }
    if (escapeShadowDOM && isShadowRoot(node)) {
      return findScrollableAncestors(node.host);
    }
    if (!isHTMLElement(node)) {
      if (isSVGElement(node)) {
        return findScrollableAncestors(node.parentElement);
      }
      return scrollParents;
    }
    if (scrollParents.has(node)) {
      return scrollParents;
    }
    const computedStyle = getComputedStyles(node, true);
    if (excludeElement && node === element) ;
    else if (isScrollable(node, computedStyle)) {
      scrollParents.add(node);
    }
    if (isFixed(node, computedStyle)) {
      const { scrollingElement } = node.ownerDocument;
      if (scrollingElement) scrollParents.add(scrollingElement);
      return scrollParents;
    }
    return findScrollableAncestors(node.parentNode);
  }
  if (!element) {
    return scrollParents;
  }
  return findScrollableAncestors(element);
}
function getFrameTransform(el, boundary = window.frameElement) {
  const transform = {
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1
  };
  if (!el) return transform;
  let frame = getFrameElement(el);
  while (frame) {
    if (frame === boundary) {
      return transform;
    }
    const rect = getBoundingRectangle(frame);
    const { x: scaleX, y: scaleY } = getScale(frame, rect);
    transform.x = transform.x + rect.left;
    transform.y = transform.y + rect.top;
    transform.scaleX = transform.scaleX * scaleX;
    transform.scaleY = transform.scaleY * scaleY;
    frame = getFrameElement(frame);
  }
  return transform;
}
function getScale(element, boundingRectangle = getBoundingRectangle(element)) {
  const width = Math.round(boundingRectangle.width);
  const height = Math.round(boundingRectangle.height);
  if (isHTMLElement(element)) {
    return {
      x: width / element.offsetWidth,
      y: height / element.offsetHeight
    };
  }
  const styles = getComputedStyles(element, true);
  return {
    x: (parseFloat(styles.width) || width) / width,
    y: (parseFloat(styles.height) || height) / height
  };
}
function parseScale(scale) {
  if (!scale || scale === "none") {
    return null;
  }
  const values = scale.split(" ");
  const x = parseFloat(values[0]);
  const y = parseFloat(values[1]);
  if (isNaN(x) && isNaN(y)) {
    return null;
  }
  return {
    x: isNaN(x) ? y : x,
    y: isNaN(y) ? x : y
  };
}
function parseTranslate(translate) {
  if (!translate || translate === "none") {
    return null;
  }
  const [x, y, z = "0"] = translate.split(" ");
  const output = { x: parseFloat(x), y: parseFloat(y), z: parseInt(z, 10) };
  if (isNaN(output.x) && isNaN(output.y)) {
    return null;
  }
  return {
    x: isNaN(output.x) ? 0 : output.x,
    y: isNaN(output.y) ? 0 : output.y,
    z: isNaN(output.z) ? 0 : output.z
  };
}
function parseTransform(computedStyles) {
  var _a5, _b2, _c3, _d2, _e, _f, _g, _h, _i;
  const { scale, transform, translate } = computedStyles;
  const parsedScale = parseScale(scale);
  const parsedTranslate = parseTranslate(translate);
  const parsedMatrix = parseTransformMatrix(transform);
  if (!parsedMatrix && !parsedScale && !parsedTranslate) {
    return null;
  }
  const normalizedScale = {
    x: (_a5 = parsedScale == null ? void 0 : parsedScale.x) != null ? _a5 : 1,
    y: (_b2 = parsedScale == null ? void 0 : parsedScale.y) != null ? _b2 : 1
  };
  const normalizedTranslate = {
    x: (_c3 = parsedTranslate == null ? void 0 : parsedTranslate.x) != null ? _c3 : 0,
    y: (_d2 = parsedTranslate == null ? void 0 : parsedTranslate.y) != null ? _d2 : 0
  };
  const normalizedMatrix = {
    x: (_e = parsedMatrix == null ? void 0 : parsedMatrix.x) != null ? _e : 0,
    y: (_f = parsedMatrix == null ? void 0 : parsedMatrix.y) != null ? _f : 0,
    scaleX: (_g = parsedMatrix == null ? void 0 : parsedMatrix.scaleX) != null ? _g : 1,
    scaleY: (_h = parsedMatrix == null ? void 0 : parsedMatrix.scaleY) != null ? _h : 1
  };
  return {
    x: normalizedTranslate.x + normalizedMatrix.x,
    y: normalizedTranslate.y + normalizedMatrix.y,
    z: (_i = parsedTranslate == null ? void 0 : parsedTranslate.z) != null ? _i : 0,
    scaleX: normalizedScale.x * normalizedMatrix.scaleX,
    scaleY: normalizedScale.y * normalizedMatrix.scaleY
  };
}
function parseTransformMatrix(transform) {
  if (transform.startsWith("matrix3d(")) {
    const transformArray = transform.slice(9, -1).split(/, /);
    return {
      x: +transformArray[12],
      y: +transformArray[13],
      scaleX: +transformArray[0],
      scaleY: +transformArray[5]
    };
  } else if (transform.startsWith("matrix(")) {
    const transformArray = transform.slice(7, -1).split(/, /);
    return {
      x: +transformArray[4],
      y: +transformArray[5],
      scaleX: +transformArray[0],
      scaleY: +transformArray[3]
    };
  }
  return null;
}
var ScrollDirection = /* @__PURE__ */ ((ScrollDirection2) => {
  ScrollDirection2[ScrollDirection2["Idle"] = 0] = "Idle";
  ScrollDirection2[ScrollDirection2["Forward"] = 1] = "Forward";
  ScrollDirection2[ScrollDirection2["Reverse"] = -1] = "Reverse";
  return ScrollDirection2;
})(ScrollDirection || {});
var defaultThreshold = {
  x: 0.2,
  y: 0.2
};
var defaultTolerance = {
  x: 10,
  y: 10
};
function detectScrollIntent(scrollableElement, coordinates, intent, acceleration = 25, thresholdPercentage = defaultThreshold, tolerance = defaultTolerance, scrollPosition = getScrollPosition(scrollableElement)) {
  const { x, y } = coordinates;
  const { rect, isTop, isBottom, isLeft, isRight } = scrollPosition;
  const frameTransform = getFrameTransform(scrollableElement);
  const computedStyles = getComputedStyles(scrollableElement, true);
  const parsedTransform = parseTransform(computedStyles);
  const isXAxisInverted = parsedTransform !== null ? (parsedTransform == null ? void 0 : parsedTransform.scaleX) < 0 : false;
  const isYAxisInverted = parsedTransform !== null ? (parsedTransform == null ? void 0 : parsedTransform.scaleY) < 0 : false;
  const scrollContainerRect = new Rectangle(
    rect.left * frameTransform.scaleX + frameTransform.x,
    rect.top * frameTransform.scaleY + frameTransform.y,
    rect.width * frameTransform.scaleX,
    rect.height * frameTransform.scaleY
  );
  const direction = {
    x: 0,
    y: 0
    /* Idle */
  };
  const speed = {
    x: 0,
    y: 0
  };
  const threshold2 = {
    height: scrollContainerRect.height * thresholdPercentage.y,
    width: scrollContainerRect.width * thresholdPercentage.x
  };
  if (threshold2.height > 0 && (!isTop || isYAxisInverted && !isBottom) && y <= scrollContainerRect.top + threshold2.height && (intent == null ? void 0 : intent.y) !== 1 && x >= scrollContainerRect.left - tolerance.x && x <= scrollContainerRect.right + tolerance.x) {
    direction.y = isYAxisInverted ? 1 : -1;
    speed.y = acceleration * Math.abs(
      (scrollContainerRect.top + threshold2.height - y) / threshold2.height
    );
  } else if (threshold2.height > 0 && (!isBottom || isYAxisInverted && !isTop) && y >= scrollContainerRect.bottom - threshold2.height && (intent == null ? void 0 : intent.y) !== -1 && x >= scrollContainerRect.left - tolerance.x && x <= scrollContainerRect.right + tolerance.x) {
    direction.y = isYAxisInverted ? -1 : 1;
    speed.y = acceleration * Math.abs(
      (scrollContainerRect.bottom - threshold2.height - y) / threshold2.height
    );
  }
  if (threshold2.width > 0 && (!isRight || isXAxisInverted && !isLeft) && x >= scrollContainerRect.right - threshold2.width && (intent == null ? void 0 : intent.x) !== -1 && y >= scrollContainerRect.top - tolerance.y && y <= scrollContainerRect.bottom + tolerance.y) {
    direction.x = isXAxisInverted ? -1 : 1;
    speed.x = acceleration * Math.abs(
      (scrollContainerRect.right - threshold2.width - x) / threshold2.width
    );
  } else if (threshold2.width > 0 && (!isLeft || isXAxisInverted && !isRight) && x <= scrollContainerRect.left + threshold2.width && (intent == null ? void 0 : intent.x) !== 1 && y >= scrollContainerRect.top - tolerance.y && y <= scrollContainerRect.bottom + tolerance.y) {
    direction.x = isXAxisInverted ? 1 : -1;
    speed.x = acceleration * Math.abs(
      (scrollContainerRect.left + threshold2.width - x) / threshold2.width
    );
  }
  return {
    direction,
    speed
  };
}
function scrollIntoViewIfNeeded(el, { block = "nearest", inline = "nearest" } = {}) {
  if (!isHTMLElement(el)) {
    return;
  }
  const scrollableAncestors = getScrollableAncestors(el);
  const processedAncestors = [];
  for (const ancestor of scrollableAncestors) {
    if (!isHTMLElement(ancestor)) {
      continue;
    }
    const { top, left } = getOffsetRelativeTo(el, ancestor);
    let adjustedTop = top;
    let adjustedLeft = left;
    for (const inner of processedAncestors) {
      adjustedTop -= inner.scrollTop;
      adjustedLeft -= inner.scrollLeft;
    }
    if (block !== "none") {
      const overTop = adjustedTop < ancestor.scrollTop;
      const overBottom = adjustedTop + el.offsetHeight > ancestor.scrollTop + ancestor.clientHeight;
      if (overTop !== overBottom) {
        if (block === "center") {
          ancestor.scrollTop = adjustedTop - ancestor.clientHeight / 2 + el.offsetHeight / 2;
        } else if (overTop) {
          ancestor.scrollTop = adjustedTop;
        } else {
          ancestor.scrollTop = adjustedTop + el.offsetHeight - ancestor.clientHeight;
        }
      }
    }
    if (inline !== "none") {
      const overLeft = adjustedLeft < ancestor.scrollLeft;
      const overRight = adjustedLeft + el.offsetWidth > ancestor.scrollLeft + ancestor.clientWidth;
      if (overLeft !== overRight) {
        if (inline === "center") {
          ancestor.scrollLeft = adjustedLeft - ancestor.clientWidth / 2 + el.offsetWidth / 2;
        } else if (overLeft) {
          ancestor.scrollLeft = adjustedLeft;
        } else {
          ancestor.scrollLeft = adjustedLeft + el.offsetWidth - ancestor.clientWidth;
        }
      }
    }
    processedAncestors.push(ancestor);
  }
}
function getDocumentOffset(element) {
  let top = 0;
  let left = 0;
  let current = element;
  while (current) {
    top += current.offsetTop;
    left += current.offsetLeft;
    const offsetParent = current.offsetParent;
    if (!isHTMLElement(offsetParent)) {
      break;
    }
    top += offsetParent.clientTop;
    left += offsetParent.clientLeft;
    current = offsetParent;
  }
  return { top, left };
}
function getOffsetRelativeTo(element, ancestor) {
  const elOffset = getDocumentOffset(element);
  const ancestorOffset = getDocumentOffset(ancestor);
  return {
    top: elOffset.top - ancestorOffset.top - ancestor.clientTop,
    left: elOffset.left - ancestorOffset.left - ancestor.clientLeft
  };
}
function applyTransform(rect, parsedTransform, transformOrigin) {
  const { scaleX, scaleY, x: translateX, y: translateY } = parsedTransform;
  const x = rect.left + translateX + (1 - scaleX) * parseFloat(transformOrigin);
  const y = rect.top + translateY + (1 - scaleY) * parseFloat(transformOrigin.slice(transformOrigin.indexOf(" ") + 1));
  const w = scaleX ? rect.width * scaleX : rect.width;
  const h = scaleY ? rect.height * scaleY : rect.height;
  return {
    width: w,
    height: h,
    top: y,
    right: x + w,
    bottom: y + h,
    left: x
  };
}
function inverseTransform(rect, parsedTransform, transformOrigin) {
  const { scaleX, scaleY, x: translateX, y: translateY } = parsedTransform;
  const x = rect.left - translateX - (1 - scaleX) * parseFloat(transformOrigin);
  const y = rect.top - translateY - (1 - scaleY) * parseFloat(transformOrigin.slice(transformOrigin.indexOf(" ") + 1));
  const w = scaleX ? rect.width / scaleX : rect.width;
  const h = scaleY ? rect.height / scaleY : rect.height;
  return {
    width: w,
    height: h,
    top: y,
    right: x + w,
    bottom: y + h,
    left: x
  };
}
function animateTransform({ element, keyframes, options: options2 }) {
  return element.animate(keyframes, options2).finished;
}
var scheduler3$1 = new Scheduler$1((callback) => setTimeout(callback, 0));
var animations = /* @__PURE__ */ new Map();
var clear2 = animations.clear.bind(animations);
function getDocumentAnimations(element) {
  const document2 = element.ownerDocument;
  let documentAnimations = animations.get(document2);
  if (documentAnimations) return documentAnimations;
  documentAnimations = document2.getAnimations();
  animations.set(document2, documentAnimations);
  scheduler3$1.schedule(clear2);
  const elementAnimations = documentAnimations.filter(
    (animation) => isKeyframeEffect(animation.effect) && animation.effect.target === element
  );
  animations.set(element, elementAnimations);
  return documentAnimations;
}
function forceFinishAnimations(element, options2) {
  const animations2 = getDocumentAnimations(element).filter((animation) => {
    var _a5, _b2;
    if (isKeyframeEffect(animation.effect)) {
      const { target } = animation.effect;
      const isValidTarget = (_b2 = target && ((_a5 = options2.isValidTarget) == null ? void 0 : _a5.call(options2, target))) != null ? _b2 : true;
      if (isValidTarget) {
        return animation.effect.getKeyframes().some((keyframe) => {
          for (const property of options2.properties) {
            if (keyframe[property]) return true;
          }
        });
      }
    }
  }).map((animation) => {
    const { effect: effect2, currentTime } = animation;
    const duration = effect2 == null ? void 0 : effect2.getComputedTiming().duration;
    if (animation.pending || animation.playState === "finished") return;
    if (typeof duration == "number" && typeof currentTime == "number" && currentTime < duration) {
      animation.currentTime = duration;
      return () => {
        animation.currentTime = currentTime;
      };
    }
  });
  if (animations2.length > 0) {
    return () => animations2.forEach((reset) => reset == null ? void 0 : reset());
  }
}
var DOMRectangle = class extends Rectangle {
  constructor(element, options2 = {}) {
    var _a5, _b2, _c3, _d2;
    const {
      frameTransform = getFrameTransform(element),
      ignoreTransforms,
      getBoundingClientRect = getBoundingRectangle
    } = options2;
    const resetAnimations = forceFinishAnimations(element, {
      properties: ["transform", "translate", "scale", "width", "height"],
      isValidTarget: (target) => (target !== element || isSafari()) && target.contains(element)
    });
    const boundingRectangle = getBoundingClientRect(element);
    let { top, left, width, height } = boundingRectangle;
    let updated;
    const computedStyles = getComputedStyles(element);
    const parsedTransform = parseTransform(computedStyles);
    const scale = {
      x: (_a5 = parsedTransform == null ? void 0 : parsedTransform.scaleX) != null ? _a5 : 1,
      y: (_b2 = parsedTransform == null ? void 0 : parsedTransform.scaleY) != null ? _b2 : 1
    };
    const projectedTransform = getProjectedTransform(element, computedStyles);
    resetAnimations == null ? void 0 : resetAnimations();
    if (parsedTransform) {
      updated = inverseTransform(
        boundingRectangle,
        parsedTransform,
        computedStyles.transformOrigin
      );
      if (ignoreTransforms || projectedTransform) {
        top = updated.top;
        left = updated.left;
        width = updated.width;
        height = updated.height;
      }
    }
    const intrinsic = {
      width: (_c3 = updated == null ? void 0 : updated.width) != null ? _c3 : width,
      height: (_d2 = updated == null ? void 0 : updated.height) != null ? _d2 : height
    };
    if (projectedTransform && !ignoreTransforms && updated) {
      const projected = applyTransform(
        updated,
        projectedTransform,
        computedStyles.transformOrigin
      );
      top = projected.top;
      left = projected.left;
      width = projected.width;
      height = projected.height;
      scale.x = projectedTransform.scaleX;
      scale.y = projectedTransform.scaleY;
    }
    if (frameTransform) {
      if (!ignoreTransforms) {
        left *= frameTransform.scaleX;
        width *= frameTransform.scaleX;
        top *= frameTransform.scaleY;
        height *= frameTransform.scaleY;
      }
      left += frameTransform.x;
      top += frameTransform.y;
    }
    super(left, top, width, height);
    this.scale = scale;
    this.intrinsicWidth = intrinsic.width;
    this.intrinsicHeight = intrinsic.height;
  }
};
function getProjectedTransform(element, computedStyles) {
  const animations2 = element.getAnimations();
  if (!animations2.length) return null;
  let latestTransform;
  let latestTranslate;
  let latestScale;
  let hasAnimatedProperty = false;
  for (const animation of animations2) {
    if (animation.playState !== "running") continue;
    const keyframes = isKeyframeEffect(animation.effect) ? animation.effect.getKeyframes() : [];
    const keyframe = keyframes[keyframes.length - 1];
    if (!keyframe) continue;
    const { transform, translate, scale } = keyframe;
    if (typeof transform === "string" && transform) {
      latestTransform = transform;
      hasAnimatedProperty = true;
    }
    if (typeof translate === "string" && translate) {
      latestTranslate = translate;
      hasAnimatedProperty = true;
    }
    if (typeof scale === "string" && scale) {
      latestScale = scale;
      hasAnimatedProperty = true;
    }
  }
  if (!hasAnimatedProperty) return null;
  return parseTransform({
    transform: latestTransform != null ? latestTransform : computedStyles.transform,
    translate: latestTranslate != null ? latestTranslate : computedStyles.translate,
    scale: latestScale != null ? latestScale : computedStyles.scale
  });
}
function supportsStyle(element) {
  return "style" in element && typeof element.style === "object" && element.style !== null && "setProperty" in element.style && "removeProperty" in element.style && typeof element.style.setProperty === "function" && typeof element.style.removeProperty === "function";
}
var Styles = class {
  constructor(element) {
    this.element = element;
    this.initial = /* @__PURE__ */ new Map();
  }
  set(properties, prefix = "") {
    const { element } = this;
    if (!supportsStyle(element)) {
      return;
    }
    for (const [key, value] of Object.entries(properties)) {
      const property = `${prefix}${key}`;
      if (!this.initial.has(property)) {
        this.initial.set(property, element.style.getPropertyValue(property));
      }
      element.style.setProperty(
        property,
        typeof value === "string" ? value : `${value}px`
      );
    }
  }
  remove(properties, prefix = "") {
    const { element } = this;
    if (!supportsStyle(element)) {
      return;
    }
    for (const key of properties) {
      const property = `${prefix}${key}`;
      element.style.removeProperty(property);
    }
  }
  reset() {
    const { element } = this;
    if (!supportsStyle(element)) {
      return;
    }
    for (const [key, value] of this.initial) {
      element.style.setProperty(key, value);
    }
    if (element.getAttribute("style") === "") {
      element.removeAttribute("style");
    }
  }
};
function isElement(target) {
  if (!target) return false;
  return target instanceof getWindow(target).Element || isNode(target) && target.nodeType === Node.ELEMENT_NODE;
}
function isKeyboardEvent(event) {
  if (!event) return false;
  const { KeyboardEvent } = getWindow(event.target);
  return event instanceof KeyboardEvent;
}
function isPointerEvent(event) {
  if (!event) return false;
  const { PointerEvent } = getWindow(event.target);
  return event instanceof PointerEvent;
}
function isTextInput(target) {
  if (!isElement(target)) return false;
  const { tagName } = target;
  return tagName === "INPUT" || tagName === "TEXTAREA" || isContentEditable(target);
}
function isContentEditable(element) {
  return element.hasAttribute("contenteditable") && element.getAttribute("contenteditable") !== "false";
}
var ids = {};
function generateUniqueId(prefix) {
  const id = ids[prefix] == null ? 0 : ids[prefix] + 1;
  ids[prefix] = id;
  return `${prefix}-${id}`;
}
var __create$1 = Object.create;
var __defProp$1 = Object.defineProperty;
var __defProps$1 = Object.defineProperties;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs$1 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$1 = Object.prototype.propertyIsEnumerable;
var __knownSymbol$1 = (name, symbol) => (symbol = Symbol[name]) ? symbol : /* @__PURE__ */ Symbol.for("Symbol." + name);
var __typeError$1 = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$1 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$1.call(b, prop))
      __defNormalProp$1(a, prop, b[prop]);
  if (__getOwnPropSymbols$1)
    for (var prop of __getOwnPropSymbols$1(b)) {
      if (__propIsEnum$1.call(b, prop))
        __defNormalProp$1(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$1 = (a, b) => __defProps$1(a, __getOwnPropDescs$1(b));
var __name = (target, value) => __defProp$1(target, "name", { value, configurable: true });
var __objRest$1 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$1.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$1)
    for (var prop of __getOwnPropSymbols$1(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$1.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __decoratorStart$1 = (base) => {
  var _a5;
  return [, , , __create$1((_a5 = base == null ? void 0 : base[__knownSymbol$1("metadata")]) != null ? _a5 : null)];
};
var __decoratorStrings$1 = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"];
var __expectFn$1 = (fn) => fn !== void 0 && typeof fn !== "function" ? __typeError$1("Function expected") : fn;
var __decoratorContext$1 = (kind, name, done, metadata, fns) => ({ kind: __decoratorStrings$1[kind], name, metadata, addInitializer: (fn) => done._ ? __typeError$1("Already initialized") : fns.push(__expectFn$1(fn || null)) });
var __decoratorMetadata$1 = (array, target) => __defNormalProp$1(target, __knownSymbol$1("metadata"), array[3]);
var __runInitializers$1 = (array, flags, self, value) => {
  for (var i = 0, fns = array[flags >> 1], n = fns && fns.length; i < n; i++) flags & 1 ? fns[i].call(self) : value = fns[i].call(self, value);
  return value;
};
var __decorateElement$1 = (array, flags, name, decorators, target, extra) => {
  var fn, it, done, ctx, access, k = flags & 7, s = !!(flags & 8), p = !!(flags & 16);
  var j = k > 3 ? array.length + 1 : k ? s ? 1 : 2 : 0, key = __decoratorStrings$1[k + 5];
  var initializers = k > 3 && (array[j - 1] = []), extraInitializers = array[j] || (array[j] = []);
  var desc = k && (!p && !s && (target = target.prototype), k < 5 && (k > 3 || !p) && __getOwnPropDesc$1(k < 4 ? target : { get [name]() {
    return __privateGet$1(this, extra);
  }, set [name](x) {
    return __privateSet$1(this, extra, x);
  } }, name));
  k ? p && k < 4 && __name(extra, (k > 2 ? "set " : k > 1 ? "get " : "") + name) : __name(target, name);
  for (var i = decorators.length - 1; i >= 0; i--) {
    ctx = __decoratorContext$1(k, name, done = {}, array[3], extraInitializers);
    if (k) {
      ctx.static = s, ctx.private = p, access = ctx.access = { has: p ? (x) => __privateIn(target, x) : (x) => name in x };
      if (k ^ 3) access.get = p ? (x) => (k ^ 1 ? __privateGet$1 : __privateMethod)(x, target, k ^ 4 ? extra : desc.get) : (x) => x[name];
      if (k > 2) access.set = p ? (x, y) => __privateSet$1(x, target, y, k ^ 4 ? extra : desc.set) : (x, y) => x[name] = y;
    }
    it = (0, decorators[i])(k ? k < 4 ? p ? extra : desc[key] : k > 4 ? void 0 : { get: desc.get, set: desc.set } : target, ctx), done._ = 1;
    if (k ^ 4 || it === void 0) __expectFn$1(it) && (k > 4 ? initializers.unshift(it) : k ? p ? extra = it : desc[key] = it : target = it);
    else if (typeof it !== "object" || it === null) __typeError$1("Object expected");
    else __expectFn$1(fn = it.get) && (desc.get = fn), __expectFn$1(fn = it.set) && (desc.set = fn), __expectFn$1(fn = it.init) && initializers.unshift(fn);
  }
  return k || __decoratorMetadata$1(array, target), desc && __defProp$1(target, name, desc), p ? k ^ 4 ? extra : desc : target;
};
var __accessCheck$1 = (obj, member, msg) => member.has(obj) || __typeError$1("Cannot " + msg);
var __privateIn = (member, obj) => Object(obj) !== obj ? __typeError$1('Cannot use the "in" operator on this value') : member.has(obj);
var __privateGet$1 = (obj, member, getter) => (__accessCheck$1(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd$1 = (obj, member, value) => member.has(obj) ? __typeError$1("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet$1 = (obj, member, value, setter) => (__accessCheck$1(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck$1(obj, member, "access private method"), method);
var defaultAttributes = {
  role: "button",
  roleDescription: "draggable"
};
var defaultDescriptionIdPrefix = `dnd-kit-description`;
var defaultAnnouncementIdPrefix = `dnd-kit-announcement`;
var defaultScreenReaderInstructions = {
  draggable: `To pick up a draggable item, press the space bar. While dragging, use the arrow keys to move the item in a given direction. Press space again to drop the item in its new position, or press escape to cancel.`
};
var defaultAnnouncements = {
  dragstart({ operation: { source } }) {
    if (!source) return;
    return `Picked up draggable item ${source.id}.`;
  },
  dragover({ operation: { source, target } }) {
    if (!source || source.id === (target == null ? void 0 : target.id)) return;
    if (target) {
      return `Draggable item ${source.id} was moved over droppable target ${target.id}.`;
    }
    return `Draggable item ${source.id} is no longer over a droppable target.`;
  },
  dragend({ operation: { source, target }, canceled }) {
    if (!source) return;
    if (canceled) {
      return `Dragging was cancelled. Draggable item ${source.id} was dropped.`;
    }
    if (target) {
      return `Draggable item ${source.id} was dropped over droppable target ${target.id}`;
    }
    return `Draggable item ${source.id} was dropped.`;
  }
};
function isFocusable(element) {
  const tagName = element.tagName.toLowerCase();
  return ["input", "select", "textarea", "a", "button"].includes(tagName);
}
function supportsPressedState(element) {
  var _a5;
  return ((_a5 = element.getAttribute("role")) != null ? _a5 : "button") === "button";
}
function createHiddenText(id, value) {
  const element = document.createElement("div");
  element.id = id;
  element.style.setProperty("display", "none");
  element.textContent = value;
  return element;
}
function createLiveRegion(id) {
  const element = document.createElement("div");
  element.id = id;
  element.setAttribute("role", "status");
  element.setAttribute("aria-live", "polite");
  element.setAttribute("aria-atomic", "true");
  element.style.setProperty("position", "fixed");
  element.style.setProperty("width", "1px");
  element.style.setProperty("height", "1px");
  element.style.setProperty("margin", "-1px");
  element.style.setProperty("border", "0");
  element.style.setProperty("padding", "0");
  element.style.setProperty("overflow", "hidden");
  element.style.setProperty("clip", "rect(0 0 0 0)");
  element.style.setProperty("clip-path", "inset(100%)");
  element.style.setProperty("white-space", "nowrap");
  return element;
}
var debouncedEvents = ["dragover", "dragmove"];
var Accessibility = class extends Plugin {
  constructor(manager, options2) {
    super(manager);
    const {
      id,
      idPrefix: {
        description: descriptionPrefix = defaultDescriptionIdPrefix,
        announcement: announcementPrefix = defaultAnnouncementIdPrefix
      } = {},
      announcements = defaultAnnouncements,
      screenReaderInstructions = defaultScreenReaderInstructions,
      debounce: debounceMs = 500
    } = options2 != null ? options2 : {};
    const descriptionId = id ? `${descriptionPrefix}-${id}` : generateUniqueId(descriptionPrefix);
    const announcementId = id ? `${announcementPrefix}-${id}` : generateUniqueId(announcementPrefix);
    let hiddenTextElement;
    let liveRegionElement;
    let liveRegionTextNode;
    let latestAnnouncement;
    const updateAnnouncement = (value = latestAnnouncement) => {
      if (!liveRegionTextNode || !value) return;
      if ((liveRegionTextNode == null ? void 0 : liveRegionTextNode.nodeValue) !== value) {
        liveRegionTextNode.nodeValue = value;
      }
    };
    const scheduleUpdateAnnouncement = () => scheduler.schedule(updateAnnouncement);
    const debouncedUpdateAnnouncement = debounce(
      scheduleUpdateAnnouncement,
      debounceMs
    );
    const eventListeners = Object.entries(announcements).map(
      ([eventName, getAnnouncement]) => {
        return this.manager.monitor.addEventListener(
          eventName,
          (event, manager2) => {
            const element = liveRegionTextNode;
            if (!element) return;
            const announcement = getAnnouncement == null ? void 0 : getAnnouncement(event, manager2);
            if (announcement && element.nodeValue !== announcement) {
              latestAnnouncement = announcement;
              if (debouncedEvents.includes(eventName)) {
                debouncedUpdateAnnouncement();
              } else {
                scheduleUpdateAnnouncement();
                debouncedUpdateAnnouncement.cancel();
              }
            }
          }
        );
      }
    );
    const initialize = () => {
      let elements = [];
      if (!(hiddenTextElement == null ? void 0 : hiddenTextElement.isConnected)) {
        hiddenTextElement = createHiddenText(
          descriptionId,
          screenReaderInstructions.draggable
        );
        elements.push(hiddenTextElement);
      }
      if (!(liveRegionElement == null ? void 0 : liveRegionElement.isConnected)) {
        liveRegionElement = createLiveRegion(announcementId);
        liveRegionTextNode = document.createTextNode("");
        liveRegionElement.appendChild(liveRegionTextNode);
        elements.push(liveRegionElement);
      }
      if (elements.length > 0) {
        document.body.append(...elements);
      }
    };
    const mutations = /* @__PURE__ */ new Set();
    function executeMutations() {
      for (const operation of mutations) {
        operation();
      }
    }
    this.registerEffect(() => {
      var _a5;
      mutations.clear();
      for (const draggable of this.manager.registry.draggables.value) {
        const activator = (_a5 = draggable.handle) != null ? _a5 : draggable.element;
        if (activator) {
          if (!hiddenTextElement || !liveRegionElement) {
            mutations.add(initialize);
          }
          if ((!isFocusable(activator) || isSafari()) && !activator.hasAttribute("tabindex")) {
            mutations.add(() => activator.setAttribute("tabindex", "0"));
          }
          if (!activator.hasAttribute("role") && !(activator.tagName.toLowerCase() === "button")) {
            mutations.add(
              () => activator.setAttribute("role", defaultAttributes.role)
            );
          }
          if (!activator.hasAttribute("aria-roledescription")) {
            mutations.add(
              () => activator.setAttribute(
                "aria-roledescription",
                defaultAttributes.roleDescription
              )
            );
          }
          if (!activator.hasAttribute("aria-describedby")) {
            mutations.add(
              () => activator.setAttribute("aria-describedby", descriptionId)
            );
          }
          const stateAttributes = supportsPressedState(activator) ? ["aria-pressed", "aria-grabbed"] : ["aria-grabbed"];
          for (const key of stateAttributes) {
            const value = String(draggable.isDragging);
            if (activator.getAttribute(key) !== value) {
              mutations.add(() => activator.setAttribute(key, value));
            }
          }
          const disabled = String(draggable.disabled);
          if (activator.getAttribute("aria-disabled") !== disabled) {
            mutations.add(
              () => activator.setAttribute("aria-disabled", disabled)
            );
          }
        }
      }
      if (mutations.size > 0) {
        scheduler.schedule(executeMutations);
      }
    });
    this.destroy = () => {
      super.destroy();
      hiddenTextElement == null ? void 0 : hiddenTextElement.remove();
      liveRegionElement == null ? void 0 : liveRegionElement.remove();
      eventListeners.forEach((unsubscribe) => unsubscribe());
    };
  }
};
function debounce(fn, wait) {
  let timeout2;
  const debounced = () => {
    clearTimeout(timeout2);
    timeout2 = setTimeout(fn, wait);
  };
  debounced.cancel = () => clearTimeout(timeout2);
  return debounced;
}
var styleRegistry = /* @__PURE__ */ new Map();
function isAttached(root) {
  return isShadowRoot(root) ? root.host.isConnected : root.defaultView != null;
}
var _roots_dec, _targetRoot_dec, _sourceRoot_dec, _additionalRoots_dec, _registeredRules_dec, _a$1, _init$1, _registeredRules, _additionalRoots, _retainedRoots, _injections, _StyleInjector_instances, syncStyles_fn, inject_fn, injectStyleElement_fn, injectAdoptedSheet_fn;
var _StyleInjector = class _StyleInjector2 extends (_a$1 = CorePlugin, _registeredRules_dec = [reactive], _additionalRoots_dec = [reactive], _sourceRoot_dec = [derived], _targetRoot_dec = [derived], _roots_dec = [derived], _a$1) {
  constructor(manager, options2) {
    super(manager, options2);
    __runInitializers$1(_init$1, 5, this);
    __privateAdd$1(this, _StyleInjector_instances);
    __privateAdd$1(this, _registeredRules, __runInitializers$1(_init$1, 8, this, /* @__PURE__ */ new Map())), __runInitializers$1(_init$1, 11, this);
    __privateAdd$1(this, _additionalRoots, __runInitializers$1(_init$1, 12, this, /* @__PURE__ */ new Set())), __runInitializers$1(_init$1, 15, this);
    __privateAdd$1(this, _retainedRoots, /* @__PURE__ */ new Set());
    __privateAdd$1(this, _injections, /* @__PURE__ */ new Map());
    this.registerEffect(__privateMethod(this, _StyleInjector_instances, syncStyles_fn));
  }
  /**
   * Registers CSS rules to be injected into the active drag operation's
   * document and shadow roots. The StyleInjector handles tracking
   * which roots need the styles and cleaning up when they're no longer needed.
   *
   * Returns a cleanup function that unregisters the rules.
   */
  register(cssRules, options2) {
    untracked(() => {
      var _a5;
      const rules = new Map(this.registeredRules);
      rules.set(cssRules, (_a5 = options2 == null ? void 0 : options2.retain) != null ? _a5 : false);
      this.registeredRules = rules;
    });
    return () => {
      untracked(() => {
        const rules = new Map(this.registeredRules);
        rules.delete(cssRules);
        this.registeredRules = rules;
      });
    };
  }
  /**
   * Adds an additional root to track for style injection.
   * Returns a cleanup function that removes the root.
   */
  addRoot(root) {
    untracked(() => {
      const roots = new Set(this.additionalRoots);
      roots.add(root);
      this.additionalRoots = roots;
    });
    return () => {
      untracked(() => {
        const roots = new Set(this.additionalRoots);
        roots.delete(root);
        this.additionalRoots = roots;
      });
    };
  }
  get sourceRoot() {
    var _a5;
    const { source } = this.manager.dragOperation;
    return getRoot((_a5 = source == null ? void 0 : source.element) != null ? _a5 : null);
  }
  get targetRoot() {
    var _a5;
    const { target } = this.manager.dragOperation;
    return getRoot((_a5 = target == null ? void 0 : target.element) != null ? _a5 : null);
  }
  get roots() {
    const { status } = this.manager.dragOperation;
    if (status.initializing || status.initialized) {
      const roots = [this.sourceRoot, this.targetRoot].filter(
        (root) => root != null
      );
      return /* @__PURE__ */ new Set([...roots, ...this.additionalRoots]);
    }
    return /* @__PURE__ */ new Set();
  }
  destroy() {
    for (const injected of __privateGet$1(this, _injections).values()) {
      for (const cleanup of injected.values()) {
        cleanup();
      }
    }
    __privateGet$1(this, _injections).clear();
    __privateGet$1(this, _retainedRoots).clear();
    super.destroy();
  }
};
_init$1 = __decoratorStart$1(_a$1);
_registeredRules = /* @__PURE__ */ new WeakMap();
_additionalRoots = /* @__PURE__ */ new WeakMap();
_retainedRoots = /* @__PURE__ */ new WeakMap();
_injections = /* @__PURE__ */ new WeakMap();
_StyleInjector_instances = /* @__PURE__ */ new WeakSet();
syncStyles_fn = function() {
  const { roots, registeredRules } = this;
  for (const root of roots) {
    __privateGet$1(this, _retainedRoots).add(root);
  }
  const wanted = /* @__PURE__ */ new Map();
  for (const root of __privateGet$1(this, _retainedRoots)) {
    const active = roots.has(root);
    if (!active && !isAttached(root)) {
      __privateGet$1(this, _retainedRoots).delete(root);
      continue;
    }
    for (const [cssRules, retain] of registeredRules) {
      if (!active && !retain) continue;
      let rules = wanted.get(root);
      if (!rules) {
        rules = /* @__PURE__ */ new Set();
        wanted.set(root, rules);
      }
      rules.add(cssRules);
    }
  }
  for (const [root, injected] of __privateGet$1(this, _injections)) {
    const rules = wanted.get(root);
    for (const [cssRules, cleanup] of injected) {
      if (rules == null ? void 0 : rules.has(cssRules)) continue;
      cleanup();
      injected.delete(cssRules);
    }
    if (injected.size === 0) {
      __privateGet$1(this, _injections).delete(root);
    }
  }
  for (const [root, rules] of wanted) {
    let injected = __privateGet$1(this, _injections).get(root);
    if (!injected) {
      injected = /* @__PURE__ */ new Map();
      __privateGet$1(this, _injections).set(root, injected);
    }
    for (const cssRules of rules) {
      if (!injected.has(cssRules)) {
        injected.set(cssRules, __privateMethod(this, _StyleInjector_instances, inject_fn).call(this, root, cssRules));
      }
    }
  }
};
inject_fn = function(root, cssRules) {
  let rootStyles = styleRegistry.get(root);
  if (!rootStyles) {
    rootStyles = /* @__PURE__ */ new Map();
    styleRegistry.set(root, rootStyles);
  }
  let registration = rootStyles.get(cssRules);
  if (!registration) {
    const created = isDocument(root) ? __privateMethod(this, _StyleInjector_instances, injectStyleElement_fn).call(this, root, rootStyles, cssRules) : __privateMethod(this, _StyleInjector_instances, injectAdoptedSheet_fn).call(this, root, rootStyles, cssRules);
    if (!created) {
      return () => {
      };
    }
    registration = created;
    rootStyles.set(cssRules, registration);
  }
  registration.refCount++;
  let disposed = false;
  return () => {
    if (disposed) return;
    disposed = true;
    registration.refCount--;
    if (registration.refCount === 0) {
      registration.cleanup();
    }
  };
};
injectStyleElement_fn = function(root, rootStyles, cssRules) {
  var _a5;
  const style = root.createElement("style");
  const { nonce } = (_a5 = this.options) != null ? _a5 : {};
  if (nonce) {
    style.setAttribute("nonce", nonce);
  }
  style.textContent = cssRules;
  root.head.prepend(style);
  const observer = new MutationObserver((entries) => {
    for (const entry of entries) {
      for (const node of Array.from(entry.removedNodes)) {
        if (node === style) {
          root.head.prepend(style);
          return;
        }
      }
    }
  });
  observer.observe(root.head, { childList: true });
  return {
    refCount: 0,
    cleanup: () => {
      observer.disconnect();
      style.remove();
      rootStyles.delete(cssRules);
      if (rootStyles.size === 0) {
        styleRegistry.delete(root);
      }
    }
  };
};
injectAdoptedSheet_fn = function(root, rootStyles, cssRules) {
  if (!("adoptedStyleSheets" in root && Array.isArray(root.adoptedStyleSheets)) && process.env.NODE_ENV !== "production") {
    console.error(
      "Cannot inject styles: This browser doesn't support adoptedStyleSheets"
    );
  }
  const targetWindow = root.ownerDocument.defaultView;
  const { CSSStyleSheet } = targetWindow != null ? targetWindow : {};
  if (!CSSStyleSheet) {
    if (process.env.NODE_ENV !== "production") {
      console.error(
        "Cannot inject styles: CSSStyleSheet constructor not available"
      );
    }
    return null;
  }
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(cssRules);
  root.adoptedStyleSheets.push(sheet);
  return {
    refCount: 0,
    cleanup: () => {
      var _a5;
      if (isShadowRoot(root) && ((_a5 = root.host) == null ? void 0 : _a5.isConnected)) {
        const index = root.adoptedStyleSheets.indexOf(sheet);
        if (index !== -1) {
          root.adoptedStyleSheets.splice(index, 1);
        }
      }
      rootStyles.delete(cssRules);
      if (rootStyles.size === 0) {
        styleRegistry.delete(root);
      }
    }
  };
};
__decorateElement$1(_init$1, 4, "registeredRules", _registeredRules_dec, _StyleInjector, _registeredRules);
__decorateElement$1(_init$1, 4, "additionalRoots", _additionalRoots_dec, _StyleInjector, _additionalRoots);
__decorateElement$1(_init$1, 2, "sourceRoot", _sourceRoot_dec, _StyleInjector);
__decorateElement$1(_init$1, 2, "targetRoot", _targetRoot_dec, _StyleInjector);
__decorateElement$1(_init$1, 2, "roots", _roots_dec, _StyleInjector);
__decoratorMetadata$1(_init$1, _StyleInjector);
_StyleInjector.configure = configurator(_StyleInjector);
var StyleInjector = _StyleInjector;
var Cursor = class extends Plugin {
  constructor(manager, options2) {
    super(manager, options2);
    this.manager = manager;
    const { cursor = "grabbing" } = options2 != null ? options2 : {};
    const styleInjector = manager.registry.plugins.get(
      StyleInjector
    );
    const unregisterStyles = styleInjector == null ? void 0 : styleInjector.register(
      `* { cursor: ${cursor} !important; }`
    );
    if (unregisterStyles) {
      const originalDestroy = this.destroy.bind(this);
      this.destroy = () => {
        unregisterStyles();
        originalDestroy();
      };
    }
  }
};
var ATTR_PREFIX = "data-dnd-";
var DROPPING_ATTRIBUTE = `${ATTR_PREFIX}dropping`;
var CSS_PREFIX = "--dnd-";
var ATTRIBUTE = `${ATTR_PREFIX}dragging`;
var PLACEHOLDER_ATTRIBUTE = `${ATTR_PREFIX}placeholder`;
var IGNORED_ATTRIBUTES = [
  ATTRIBUTE,
  PLACEHOLDER_ATTRIBUTE,
  "popover",
  "aria-pressed",
  "aria-grabbing"
];
var IGNORED_STYLES = ["view-transition-name"];
var CSS_RULES = `
  :is(:root,:host) [${ATTRIBUTE}] {
    position: fixed !important;
    pointer-events: none !important;
    touch-action: none;
    z-index: calc(infinity);
    will-change: translate;
    top: var(${CSS_PREFIX}top, 0px) !important;
    left: var(${CSS_PREFIX}left, 0px) !important;
    right: unset !important;
    bottom: unset !important;
    width: var(${CSS_PREFIX}width, auto);
    max-width: var(${CSS_PREFIX}width, auto);
    height: var(${CSS_PREFIX}height, auto);
    max-height: var(${CSS_PREFIX}height, auto);
    transform: var(${CSS_PREFIX}transform, none) !important;
    transition: var(${CSS_PREFIX}transition) !important;
  }

  :is(:root,:host) [${PLACEHOLDER_ATTRIBUTE}] {
    transition: none;
  }

  :is(:root,:host) [${PLACEHOLDER_ATTRIBUTE}='hidden'] {
    visibility: hidden;
  }

  [${ATTRIBUTE}] * {
    pointer-events: none !important;
  }

  [${ATTRIBUTE}]:not([${DROPPING_ATTRIBUTE}]) {
    translate: var(${CSS_PREFIX}translate) !important;
  }

  [${ATTRIBUTE}][style*='${CSS_PREFIX}scale'] {
    scale: var(${CSS_PREFIX}scale) !important;
    transform-origin: var(${CSS_PREFIX}transform-origin) !important;
  }

  @layer dnd-kit {
    :where([${ATTRIBUTE}][popover]) {
      overflow: visible;
      background: unset;
      border: unset;
      margin: unset;
      padding: unset;
      color: inherit;

      &:is(input, button) {
        border: revert;
        background: revert;
      }
    }
  }
  [${ATTRIBUTE}]::backdrop, [${ATTR_PREFIX}overlay]:not([${ATTRIBUTE}]) {
    display: none;
    visibility: hidden;
  }
`.replace(/\n+/g, " ").replace(/\s+/g, " ").trim();
function createPlaceholder(source, type = "hidden") {
  return untracked(() => {
    const { element, manager } = source;
    if (!element || !manager) return;
    const containedDroppables = findContainedDroppables(
      element,
      manager.registry.droppables
    );
    const cleanup = [];
    const placeholder = cloneElement(element);
    const { remove } = placeholder;
    proxyDroppableElements(containedDroppables, placeholder, cleanup);
    configurePlaceholder(placeholder, type);
    placeholder.remove = () => {
      cleanup.forEach((fn) => fn());
      remove.call(placeholder);
    };
    return placeholder;
  });
}
function findContainedDroppables(element, droppables) {
  const containedDroppables = /* @__PURE__ */ new Map();
  for (const droppable of droppables) {
    if (!droppable.element) continue;
    if (element === droppable.element || element.contains(droppable.element)) {
      const identifierAttribute = `${ATTR_PREFIX}${generateUniqueId("dom-id")}`;
      droppable.element.setAttribute(identifierAttribute, "");
      containedDroppables.set(droppable, identifierAttribute);
    }
  }
  return containedDroppables;
}
function proxyDroppableElements(containedDroppables, placeholder, cleanup) {
  for (const [droppable, identifierAttribute] of containedDroppables) {
    if (!droppable.element) continue;
    const selector = `[${identifierAttribute}]`;
    const clonedElement = placeholder.matches(selector) ? placeholder : placeholder.querySelector(selector);
    droppable.element.removeAttribute(identifierAttribute);
    if (!clonedElement) continue;
    const originalElement = droppable.element;
    droppable.proxy = clonedElement;
    clonedElement.removeAttribute(identifierAttribute);
    ProxiedElements.set(originalElement, clonedElement);
    cleanup.push(() => {
      ProxiedElements.delete(originalElement);
      droppable.proxy = void 0;
    });
  }
}
function configurePlaceholder(placeholder, type = "hidden") {
  placeholder.setAttribute("inert", "true");
  placeholder.setAttribute("tab-index", "-1");
  placeholder.setAttribute("aria-hidden", "true");
  placeholder.setAttribute(PLACEHOLDER_ATTRIBUTE, type);
}
function isSameFrame(element, target) {
  if (element === target) return true;
  return getFrameElement(element) === getFrameElement(target);
}
function preventPopoverClose(event) {
  const { target } = event;
  if ("newState" in event && event.newState === "closed" && isElement(target) && target.hasAttribute("popover")) {
    requestAnimationFrame(() => showPopover(target));
  }
}
function isTableRow(element) {
  return element.tagName === "TR";
}
function createElementMutationObserver(element, placeholder, clone) {
  const observer = new MutationObserver((mutations) => {
    let hasChildrenMutations = false;
    for (const mutation of mutations) {
      if (mutation.target !== element) {
        hasChildrenMutations = true;
        continue;
      }
      if (mutation.type !== "attributes") {
        continue;
      }
      const attributeName = mutation.attributeName;
      if (attributeName.startsWith("aria-") || IGNORED_ATTRIBUTES.includes(attributeName)) {
        continue;
      }
      const attributeValue = element.getAttribute(attributeName);
      if (attributeName === "style") {
        if (supportsStyle(element) && supportsStyle(placeholder)) {
          const styles = element.style;
          for (const key of Array.from(placeholder.style)) {
            if (styles.getPropertyValue(key) === "") {
              placeholder.style.removeProperty(key);
            }
          }
          for (const key of Array.from(styles)) {
            if (IGNORED_STYLES.includes(key) || key.startsWith(CSS_PREFIX)) {
              continue;
            }
            const value = styles.getPropertyValue(key);
            placeholder.style.setProperty(key, value);
          }
        }
      } else if (attributeValue !== null) {
        placeholder.setAttribute(attributeName, attributeValue);
      } else {
        placeholder.removeAttribute(attributeName);
      }
    }
    if (hasChildrenMutations && clone) {
      placeholder.replaceChildren(...element.cloneNode(true).childNodes);
    }
  });
  observer.observe(element, {
    attributes: true,
    subtree: true,
    childList: true
  });
  return observer;
}
function createDocumentMutationObserver(element, placeholder, feedbackElement) {
  const observer = new MutationObserver((entries) => {
    for (const entry of entries) {
      if (entry.addedNodes.length === 0) continue;
      for (const node of Array.from(entry.addedNodes)) {
        if (node.contains(element) && element.nextElementSibling !== placeholder) {
          element.insertAdjacentElement("afterend", placeholder);
          showPopover(feedbackElement);
          return;
        }
        if (node.contains(placeholder) && placeholder.previousElementSibling !== element) {
          placeholder.insertAdjacentElement("beforebegin", element);
          showPopover(feedbackElement);
          return;
        }
      }
    }
    if (element.isConnected && placeholder.isConnected && element.nextElementSibling !== placeholder) {
      element.insertAdjacentElement("afterend", placeholder);
      showPopover(feedbackElement);
    }
  });
  observer.observe(element.ownerDocument.body, {
    childList: true,
    subtree: true
  });
  return observer;
}
function createResizeObserver(ctx) {
  return new ResizeObserver(() => {
    var _a5, _b2, _c3;
    const placeholderShape = new DOMRectangle(ctx.placeholder, {
      frameTransform: ctx.frameTransform,
      ignoreTransforms: true
    });
    const origin = (_a5 = ctx.transformOrigin) != null ? _a5 : { x: 1, y: 1 };
    const dX = (ctx.width - placeholderShape.width) * origin.x + ctx.delta.x;
    const dY = (ctx.height - placeholderShape.height) * origin.y + ctx.delta.y;
    const fixedOffset = getFixedPositionOffset();
    ctx.styles.set(
      {
        width: placeholderShape.width - ctx.widthOffset,
        height: placeholderShape.height - ctx.heightOffset,
        top: ctx.top + dY + fixedOffset.y,
        left: ctx.left + dX + fixedOffset.x
      },
      CSS_PREFIX
    );
    (_b2 = ctx.getElementMutationObserver()) == null ? void 0 : _b2.takeRecords();
    if (isTableRow(ctx.element) && isTableRow(ctx.placeholder)) {
      const cells = Array.from(ctx.element.cells);
      const placeholderCells = Array.from(ctx.placeholder.cells);
      if (!ctx.getSavedCellWidths()) {
        ctx.setSavedCellWidths(cells.map((cell) => cell.style.width));
      }
      for (const [index, cell] of cells.entries()) {
        const placeholderCell = placeholderCells[index];
        cell.style.width = `${placeholderCell.getBoundingClientRect().width}px`;
      }
    }
    const translate = (_c3 = ctx.getTranslate()) != null ? _c3 : { x: 0, y: 0 };
    const shapeLeft = ctx.left + dX + fixedOffset.x + translate.x;
    const shapeTop = ctx.top + dY + fixedOffset.y + translate.y;
    const shapeWidth = placeholderShape.width - ctx.widthOffset;
    const shapeHeight = placeholderShape.height - ctx.heightOffset;
    const ft = ctx.frameTransform;
    ctx.dragOperation.shape = new Rectangle(
      shapeLeft * ft.scaleX + ft.x,
      shapeTop * ft.scaleY + ft.y,
      shapeWidth * ft.scaleX,
      shapeHeight * ft.scaleY
    );
  });
}
var DEFAULT_DURATION = 250;
var DEFAULT_EASING = "ease";
function runDropAnimation(ctx) {
  var _a5, _b2, _c3, _d2;
  const { animation } = ctx;
  if (typeof animation === "function") {
    const result = animation({
      source: ctx.source,
      element: ctx.element,
      feedbackElement: ctx.feedbackElement,
      placeholder: ctx.placeholder,
      translate: ctx.translate,
      moved: ctx.moved
    });
    Promise.resolve(result).then(() => {
      ctx.cleanup();
      requestAnimationFrame(ctx.restoreFocus);
    });
    return;
  }
  const {
    duration = DEFAULT_DURATION,
    easing = DEFAULT_EASING
  } = animation != null ? animation : {};
  showPopover(ctx.feedbackElement);
  const [, runningAnimation] = (_a5 = getFinalKeyframe(
    ctx.feedbackElement,
    (keyframe) => "translate" in keyframe
  )) != null ? _a5 : [];
  runningAnimation == null ? void 0 : runningAnimation.pause();
  const target = (_b2 = ctx.placeholder) != null ? _b2 : ctx.element;
  const options2 = {
    frameTransform: isSameFrame(ctx.feedbackElement, target) ? null : void 0
  };
  const current = new DOMRectangle(ctx.feedbackElement, options2);
  const currentTranslate = (_c3 = parseTranslate(getComputedStyles(ctx.feedbackElement).translate)) != null ? _c3 : ctx.translate;
  const final = new DOMRectangle(target, options2);
  const delta = Rectangle.delta(current, final, ctx.alignment);
  const finalTranslate = {
    x: currentTranslate.x - delta.x,
    y: currentTranslate.y - delta.y
  };
  const heightKeyframes = Math.round(current.intrinsicHeight) !== Math.round(final.intrinsicHeight) ? {
    minHeight: [
      `${current.intrinsicHeight}px`,
      `${final.intrinsicHeight}px`
    ],
    maxHeight: [
      `${current.intrinsicHeight}px`,
      `${final.intrinsicHeight}px`
    ]
  } : {};
  const widthKeyframes = Math.round(current.intrinsicWidth) !== Math.round(final.intrinsicWidth) ? {
    minWidth: [
      `${current.intrinsicWidth}px`,
      `${final.intrinsicWidth}px`
    ],
    maxWidth: [
      `${current.intrinsicWidth}px`,
      `${final.intrinsicWidth}px`
    ]
  } : {};
  ctx.styles.set({ transition: ctx.transition }, CSS_PREFIX);
  ctx.feedbackElement.setAttribute(DROPPING_ATTRIBUTE, "");
  (_d2 = ctx.getElementMutationObserver()) == null ? void 0 : _d2.takeRecords();
  animateTransform({
    element: ctx.feedbackElement,
    keyframes: __spreadProps$1(__spreadValues$1(__spreadValues$1({}, heightKeyframes), widthKeyframes), {
      translate: [
        `${currentTranslate.x}px ${currentTranslate.y}px 0`,
        `${finalTranslate.x}px ${finalTranslate.y}px 0`
      ]
    }),
    options: {
      duration: prefersReducedMotion(getWindow(ctx.feedbackElement)) ? 0 : ctx.moved || ctx.feedbackElement !== ctx.element ? duration : 0,
      easing
    }
  }).then(() => {
    ctx.feedbackElement.removeAttribute(DROPPING_ATTRIBUTE);
    runningAnimation == null ? void 0 : runningAnimation.finish();
    ctx.cleanup();
    requestAnimationFrame(ctx.restoreFocus);
  });
}
var _overlay_dec, _a2, _init2, _overlay, _Feedback_instances, trackOverlayRoot_fn, render_fn;
var _Feedback = class _Feedback2 extends (_a2 = Plugin, _overlay_dec = [reactive], _a2) {
  constructor(manager, options2) {
    super(manager, options2);
    __privateAdd$1(this, _Feedback_instances);
    __privateAdd$1(this, _overlay, __runInitializers$1(_init2, 8, this)), __runInitializers$1(_init2, 11, this);
    this.state = {
      initial: {},
      current: {}
    };
    const styleInjector = manager.registry.plugins.get(StyleInjector);
    const unregisterStyles = styleInjector == null ? void 0 : styleInjector.register(CSS_RULES, { retain: true });
    if (unregisterStyles) {
      const originalDestroy = this.destroy.bind(this);
      this.destroy = () => {
        unregisterStyles();
        originalDestroy();
      };
    }
    this.registerEffect(__privateMethod(this, _Feedback_instances, trackOverlayRoot_fn).bind(this, styleInjector));
    this.registerEffect(__privateMethod(this, _Feedback_instances, render_fn));
  }
};
_init2 = __decoratorStart$1(_a2);
_overlay = /* @__PURE__ */ new WeakMap();
_Feedback_instances = /* @__PURE__ */ new WeakSet();
trackOverlayRoot_fn = function(styleInjector) {
  const { overlay } = this;
  if (!overlay || !styleInjector) return;
  const root = getRoot(overlay);
  if (!root) return;
  return styleInjector.addRoot(root);
};
render_fn = function() {
  var _a5, _b2, _c3, _d2, _e, _f, _g;
  const { state, manager, options: options2 } = this;
  const { dragOperation } = manager;
  const { position, source, status } = dragOperation;
  if (status.idle) {
    state.current = {};
    state.initial = {};
    return;
  }
  if (!source) return;
  const { element } = source;
  const entityOptions = source.pluginConfig(_Feedback);
  const feedbackOption = (_b2 = (_a5 = entityOptions == null ? void 0 : entityOptions.feedback) != null ? _a5 : options2 == null ? void 0 : options2.feedback) != null ? _b2 : "default";
  const feedback = typeof feedbackOption === "function" ? feedbackOption(source, manager) : feedbackOption;
  if (!element || feedback === "none" || !status.initialized || status.initializing) {
    return;
  }
  const { initial } = state;
  const feedbackElement = (_c3 = this.overlay) != null ? _c3 : element;
  const frameTransform = getFrameTransform(feedbackElement);
  const elementFrameTransform = getFrameTransform(element);
  const crossFrame = !isSameFrame(element, feedbackElement);
  const shape = new DOMRectangle(element, {
    frameTransform: crossFrame ? elementFrameTransform : null,
    ignoreTransforms: !crossFrame
  });
  const scaleDelta = {
    x: elementFrameTransform.scaleX / frameTransform.scaleX,
    y: elementFrameTransform.scaleY / frameTransform.scaleY
  };
  let { width, height, top, left } = shape;
  if (crossFrame) {
    width = width / scaleDelta.x;
    height = height / scaleDelta.y;
  }
  const styles = new Styles(feedbackElement);
  const elementStyles = getComputedStyles(element);
  const {
    transition,
    translate,
    boxSizing,
    paddingBlockStart,
    paddingBlockEnd,
    paddingInlineStart,
    paddingInlineEnd,
    borderInlineStartWidth,
    borderInlineEndWidth,
    borderBlockStartWidth,
    borderBlockEndWidth
  } = elementStyles;
  const feedbackTransition = transition.split(",").filter((t) => !/^\s*(transform|translate|scale)\b/.test(t)).join(",");
  const parsedTransform = parseTransform(elementStyles);
  const initialTransformStyle = elementStyles.transform;
  const clone = feedback === "clone";
  const contentBox = boxSizing === "content-box";
  const widthOffset = contentBox ? parseInt(paddingInlineStart) + parseInt(paddingInlineEnd) + parseInt(borderInlineStartWidth) + parseInt(borderInlineEndWidth) : 0;
  const heightOffset = contentBox ? parseInt(paddingBlockStart) + parseInt(paddingBlockEnd) + parseInt(borderBlockStartWidth) + parseInt(borderBlockEndWidth) : 0;
  const placeholder = feedback !== "move" && !this.overlay ? createPlaceholder(source, clone ? "clone" : "hidden") : null;
  const isKeyboardOperation = untracked(
    () => isKeyboardEvent(manager.dragOperation.activatorEvent)
  );
  if (!initial.translate) {
    if (this.overlay && parsedTransform) {
      initial.translate = { x: parsedTransform.x, y: parsedTransform.y };
    } else if (translate !== "none") {
      const parsedTranslate = parseTranslate(translate);
      if (parsedTranslate) {
        initial.translate = parsedTranslate;
      }
    }
  }
  if (!initial.transformOrigin) {
    const current = untracked(() => position.current);
    const visualLeft = left + ((_d2 = parsedTransform == null ? void 0 : parsedTransform.x) != null ? _d2 : 0);
    const visualTop = top + ((_e = parsedTransform == null ? void 0 : parsedTransform.y) != null ? _e : 0);
    initial.transformOrigin = {
      x: (current.x - visualLeft * frameTransform.scaleX - frameTransform.x) / (width * frameTransform.scaleX),
      y: (current.y - visualTop * frameTransform.scaleY - frameTransform.y) / (height * frameTransform.scaleY)
    };
  }
  const { transformOrigin } = initial;
  const relativeTop = top * frameTransform.scaleY + frameTransform.y;
  const relativeLeft = left * frameTransform.scaleX + frameTransform.x;
  if (!initial.coordinates) {
    initial.coordinates = {
      x: relativeLeft,
      y: relativeTop
    };
    if (scaleDelta.x !== 1 || scaleDelta.y !== 1) {
      const { scaleX, scaleY } = elementFrameTransform;
      const { x: tX2, y: tY2 } = transformOrigin;
      initial.coordinates.x += (width * scaleX - width) * tX2;
      initial.coordinates.y += (height * scaleY - height) * tY2;
    }
  }
  if (!initial.dimensions) {
    initial.dimensions = { width, height };
  }
  if (!initial.frameTransform) {
    initial.frameTransform = frameTransform;
  }
  const coordinatesDelta = {
    x: initial.coordinates.x - relativeLeft,
    y: initial.coordinates.y - relativeTop
  };
  const sizeDelta = {
    width: (initial.dimensions.width * initial.frameTransform.scaleX - width * frameTransform.scaleX) * transformOrigin.x,
    height: (initial.dimensions.height * initial.frameTransform.scaleY - height * frameTransform.scaleY) * transformOrigin.y
  };
  const delta = {
    x: coordinatesDelta.x / frameTransform.scaleX + sizeDelta.width,
    y: coordinatesDelta.y / frameTransform.scaleY + sizeDelta.height
  };
  const projected = {
    left: left + delta.x,
    top: top + delta.y
  };
  feedbackElement.setAttribute(ATTRIBUTE, "true");
  const transform = untracked(() => dragOperation.transform);
  const initialTranslate = (_f = initial.translate) != null ? _f : { x: 0, y: 0 };
  const tX = transform.x * frameTransform.scaleX + initialTranslate.x;
  const tY = transform.y * frameTransform.scaleY + initialTranslate.y;
  const fixedOffset = getFixedPositionOffset();
  styles.set(
    {
      width: width - widthOffset,
      height: height - heightOffset,
      top: projected.top + fixedOffset.y,
      left: projected.left + fixedOffset.x,
      translate: `${tX}px ${tY}px 0`,
      transform: this.overlay ? "none" : initialTransformStyle,
      transition: feedbackTransition ? `${feedbackTransition}, translate 0ms linear` : "translate 0ms linear",
      scale: crossFrame ? `${scaleDelta.x} ${scaleDelta.y}` : "",
      "transform-origin": `${transformOrigin.x * 100}% ${transformOrigin.y * 100}%`
    },
    CSS_PREFIX
  );
  if (placeholder) {
    element.insertAdjacentElement("afterend", placeholder);
    if (options2 == null ? void 0 : options2.rootElement) {
      const root = typeof options2.rootElement === "function" ? options2.rootElement(source) : options2.rootElement;
      root.appendChild(element);
    }
  }
  if (supportsPopover(feedbackElement)) {
    if (!feedbackElement.hasAttribute("popover")) {
      feedbackElement.setAttribute("popover", "manual");
    }
    showPopover(feedbackElement);
    feedbackElement.addEventListener("beforetoggle", preventPopoverClose);
  }
  let elementMutationObserver;
  let documentMutationObserver;
  let savedCellWidths;
  const resizeObserver = createResizeObserver({
    placeholder,
    element,
    feedbackElement,
    frameTransform,
    transformOrigin,
    width,
    height,
    top,
    left,
    widthOffset,
    heightOffset,
    delta,
    styles,
    dragOperation,
    getTranslate: () => state.current.translate,
    getElementMutationObserver: () => elementMutationObserver,
    getSavedCellWidths: () => savedCellWidths,
    setSavedCellWidths: (widths) => {
      savedCellWidths = widths;
    }
  });
  const initialShape = new DOMRectangle(feedbackElement);
  untracked(() => dragOperation.shape = initialShape);
  const feedbackWindow = getWindow(feedbackElement);
  const handleWindowResize = (event) => {
    this.manager.actions.stop({ event });
  };
  const reducedMotion = prefersReducedMotion(feedbackWindow);
  if (isKeyboardOperation) {
    feedbackWindow.addEventListener("resize", handleWindowResize);
  }
  if (untracked(() => source.status) === "idle") {
    requestAnimationFrame(() => source.status = "dragging");
  }
  if (placeholder) {
    resizeObserver.observe(placeholder);
    elementMutationObserver = createElementMutationObserver(
      element,
      placeholder,
      clone
    );
    documentMutationObserver = createDocumentMutationObserver(
      element,
      placeholder,
      feedbackElement
    );
  }
  const id = (_g = manager.dragOperation.source) == null ? void 0 : _g.id;
  const restoreFocus = () => {
    var _a6;
    if (!isKeyboardOperation || id == null) return;
    const draggable = manager.registry.draggables.get(id);
    const focusTarget = (_a6 = draggable == null ? void 0 : draggable.handle) != null ? _a6 : draggable == null ? void 0 : draggable.element;
    if (isHTMLElement(focusTarget)) {
      focusTarget.focus();
    }
  };
  const cleanup = () => {
    elementMutationObserver == null ? void 0 : elementMutationObserver.disconnect();
    documentMutationObserver == null ? void 0 : documentMutationObserver.disconnect();
    resizeObserver.disconnect();
    feedbackWindow.removeEventListener("resize", handleWindowResize);
    if (supportsPopover(feedbackElement)) {
      feedbackElement.removeEventListener(
        "beforetoggle",
        preventPopoverClose
      );
      feedbackElement.removeAttribute("popover");
    }
    feedbackElement.removeAttribute(ATTRIBUTE);
    styles.reset();
    const finalize = () => {
      var _a6;
      if (savedCellWidths && isTableRow(element)) {
        const cells = Array.from(element.cells);
        for (const [index, cell] of cells.entries()) {
          cell.style.width = (_a6 = savedCellWidths[index]) != null ? _a6 : "";
        }
      }
      source.status = "idle";
      const moved = state.current.translate != null;
      const isDragging = dragOperation.status.dragging;
      if (placeholder && (!isDragging && moved || placeholder.parentElement !== feedbackElement.parentElement) && feedbackElement.isConnected) {
        placeholder.replaceWith(feedbackElement);
      }
      placeholder == null ? void 0 : placeholder.remove();
    };
    if (feedbackElement === this.overlay) {
      setTimeout(finalize, 0);
    } else {
      finalize();
    }
  };
  const optionsDropAnimation = options2 == null ? void 0 : options2.dropAnimation;
  const feedbackPlugin = this;
  const cleanupEffects = effects(
    // Update transform on move
    () => {
      var _a6, _b3, _c4;
      const { transform: transform2, status: status2 } = dragOperation;
      if (!transform2.x && !transform2.y && !state.current.translate) {
        return;
      }
      if (status2.dragging) {
        const initialTranslate2 = (_a6 = initial.translate) != null ? _a6 : { x: 0, y: 0 };
        const translate2 = {
          x: transform2.x / frameTransform.scaleX + initialTranslate2.x,
          y: transform2.y / frameTransform.scaleY + initialTranslate2.y
        };
        const previousTranslate = state.current.translate;
        const modifiers = untracked(() => dragOperation.modifiers);
        const currentShape = untracked(() => {
          var _a7;
          return (_a7 = dragOperation.shape) == null ? void 0 : _a7.current;
        });
        const keyboardTransition = options2 == null ? void 0 : options2.keyboardTransition;
        const translateTransition = isKeyboardOperation && !reducedMotion && keyboardTransition !== null ? `${(_b3 = keyboardTransition == null ? void 0 : keyboardTransition.duration) != null ? _b3 : 250}ms ${(_c4 = keyboardTransition == null ? void 0 : keyboardTransition.easing) != null ? _c4 : "cubic-bezier(0.25, 1, 0.5, 1)"}` : "0ms linear";
        styles.set(
          {
            transition: feedbackTransition ? `${feedbackTransition}, translate ${translateTransition}` : `translate ${translateTransition}`,
            translate: `${translate2.x}px ${translate2.y}px 0`
          },
          CSS_PREFIX
        );
        elementMutationObserver == null ? void 0 : elementMutationObserver.takeRecords();
        if (currentShape && currentShape !== initialShape && previousTranslate && !modifiers.length) {
          const delta2 = Point$1.delta(translate2, previousTranslate);
          dragOperation.shape = Rectangle.from(
            currentShape.boundingRectangle
          ).translate(
            delta2.x * frameTransform.scaleX,
            delta2.y * frameTransform.scaleY
          );
        } else {
          dragOperation.shape = new DOMRectangle(feedbackElement);
        }
        state.current.translate = translate2;
      }
    },
    // Drop animation
    function() {
      if (dragOperation.status.dropped) {
        this.dispose();
        source.status = "dropping";
        const dropAnimationConfig = (entityOptions == null ? void 0 : entityOptions.dropAnimation) !== void 0 ? entityOptions.dropAnimation : feedbackPlugin.dropAnimation !== void 0 ? feedbackPlugin.dropAnimation : optionsDropAnimation;
        let translate2 = state.current.translate;
        const moved = translate2 != null;
        if (!translate2 && element !== feedbackElement) {
          translate2 = { x: 0, y: 0 };
        }
        if (!translate2 || dropAnimationConfig === null) {
          cleanup();
          return;
        }
        manager.renderer.rendering.then(() => {
          runDropAnimation({
            source,
            element,
            feedbackElement,
            placeholder,
            translate: translate2,
            moved,
            transition,
            alignment: source.alignment,
            styles,
            animation: dropAnimationConfig != null ? dropAnimationConfig : void 0,
            getElementMutationObserver: () => elementMutationObserver,
            cleanup,
            restoreFocus
          });
        });
      }
    }
  );
  return () => {
    cleanup();
    cleanupEffects();
  };
};
__decorateElement$1(_init2, 4, "overlay", _overlay_dec, _Feedback, _overlay);
__decoratorMetadata$1(_init2, _Feedback);
_Feedback.configure = configurator(_Feedback);
var Feedback = _Feedback;
var LOCKED = true;
var UNLOCKED = false;
var _dec, _a3, _dec2, _b, _init3, __b, __a;
_b = (_dec2 = [reactive], ScrollDirection.Forward), _a3 = (_dec = [reactive], ScrollDirection.Reverse);
var ScrollLock = class {
  constructor() {
    __privateAdd$1(this, __b, __runInitializers$1(_init3, 8, this, LOCKED)), __runInitializers$1(_init3, 11, this);
    __privateAdd$1(this, __a, __runInitializers$1(_init3, 12, this, LOCKED)), __runInitializers$1(_init3, 15, this);
  }
  isLocked(direction) {
    if (direction === ScrollDirection.Idle) {
      return false;
    }
    if (direction == null) {
      return this[ScrollDirection.Forward] === LOCKED && this[ScrollDirection.Reverse] === LOCKED;
    }
    return this[direction] === LOCKED;
  }
  unlock(direction) {
    if (direction === ScrollDirection.Idle) {
      return;
    }
    this[direction] = UNLOCKED;
  }
};
_init3 = __decoratorStart$1(null);
__b = /* @__PURE__ */ new WeakMap();
__a = /* @__PURE__ */ new WeakMap();
__decorateElement$1(_init3, 4, _b, _dec2, ScrollLock, __b);
__decorateElement$1(_init3, 4, _a3, _dec, ScrollLock, __a);
__decoratorMetadata$1(_init3, ScrollLock);
var DIRECTIONS = [ScrollDirection.Forward, ScrollDirection.Reverse];
var ScrollIntent = class {
  constructor() {
    this.x = new ScrollLock();
    this.y = new ScrollLock();
  }
  isLocked() {
    return this.x.isLocked() && this.y.isLocked();
  }
};
var ScrollIntentTracker = class extends Plugin {
  constructor(manager) {
    super(manager);
    const scrollIntent = signal(new ScrollIntent());
    let previousDelta = null;
    this.signal = scrollIntent;
    effect(() => {
      const { status } = manager.dragOperation;
      if (!status.initialized) {
        previousDelta = null;
        scrollIntent.value = new ScrollIntent();
        return;
      }
      const { delta } = manager.dragOperation.position;
      if (previousDelta) {
        const directions = {
          x: getDirection(delta.x, previousDelta.x),
          y: getDirection(delta.y, previousDelta.y)
        };
        const intent = scrollIntent.peek();
        batch(() => {
          for (const axis of Axes) {
            for (const direction of DIRECTIONS) {
              if (directions[axis] === direction) {
                intent[axis].unlock(direction);
              }
            }
          }
          scrollIntent.value = intent;
        });
      }
      previousDelta = delta;
    });
  }
  get current() {
    return this.signal.peek();
  }
};
function getDirection(a, b) {
  return Math.sign(a - b);
}
var _autoScrolling_dec, _a4, _init4, _autoScrolling, _meta, _scroll;
var Scroller = class extends (_a4 = CorePlugin, _autoScrolling_dec = [reactive], _a4) {
  constructor(manager) {
    super(manager);
    __privateAdd$1(this, _autoScrolling, __runInitializers$1(_init4, 8, this, false)), __runInitializers$1(_init4, 11, this);
    __privateAdd$1(this, _meta);
    __privateAdd$1(this, _scroll, () => {
      if (!__privateGet$1(this, _meta)) {
        return;
      }
      const { element, by } = __privateGet$1(this, _meta);
      if (by.y) element.scrollTop += by.y;
      if (by.x) element.scrollLeft += by.x;
    });
    this.scroll = (options2, scrollOptions) => {
      var _a5;
      if (this.disabled) {
        return false;
      }
      const elements = this.getScrollableElements();
      if (!elements) {
        __privateSet$1(this, _meta, void 0);
        return false;
      }
      const { position } = this.manager.dragOperation;
      const currentPosition = position == null ? void 0 : position.current;
      if (currentPosition) {
        const { by } = options2 != null ? options2 : {};
        const intent = by ? {
          x: getScrollIntent(by.x),
          y: getScrollIntent(by.y)
        } : void 0;
        const scrollIntent = intent ? void 0 : this.scrollIntentTracker.current;
        if (scrollIntent == null ? void 0 : scrollIntent.isLocked()) {
          return false;
        }
        for (const scrollableElement of elements) {
          const scrollPosition = getScrollPosition(scrollableElement);
          const elementCanScroll = canScroll(
            scrollableElement,
            by,
            scrollPosition
          );
          if (elementCanScroll.x || elementCanScroll.y) {
            const { speed, direction } = detectScrollIntent(
              scrollableElement,
              currentPosition,
              intent,
              scrollOptions == null ? void 0 : scrollOptions.acceleration,
              scrollOptions == null ? void 0 : scrollOptions.threshold,
              void 0,
              scrollPosition
            );
            if (scrollIntent) {
              for (const axis of Axes) {
                if (scrollIntent[axis].isLocked(direction[axis])) {
                  speed[axis] = 0;
                  direction[axis] = 0;
                }
              }
            }
            if (direction.x || direction.y) {
              const { x, y } = by != null ? by : direction;
              const scrollLeftBy = x * speed.x;
              const scrollTopBy = y * speed.y;
              if (scrollLeftBy || scrollTopBy) {
                const previousScrollBy = (_a5 = __privateGet$1(this, _meta)) == null ? void 0 : _a5.by;
                if (this.autoScrolling && previousScrollBy) {
                  const scrollIntentMismatch = previousScrollBy.x && !scrollLeftBy || previousScrollBy.y && !scrollTopBy;
                  if (scrollIntentMismatch) continue;
                }
                __privateSet$1(this, _meta, {
                  element: scrollableElement,
                  by: {
                    x: scrollLeftBy,
                    y: scrollTopBy
                  }
                });
                scheduler.schedule(__privateGet$1(this, _scroll));
                return true;
              }
            }
          }
        }
      }
      __privateSet$1(this, _meta, void 0);
      return false;
    };
    let previousElementFromPoint = null;
    let previousScrollableElements = null;
    const elementFromPoint = computed(() => {
      const { position, source } = manager.dragOperation;
      if (!position) {
        return null;
      }
      const element = getElementFromPoint(
        getRoot(source == null ? void 0 : source.element),
        position.current
      );
      if (element) {
        previousElementFromPoint = element;
      }
      return element != null ? element : previousElementFromPoint;
    });
    const scrollableElements = computed(() => {
      const element = elementFromPoint.value;
      const { documentElement } = getDocument(element);
      if (!element || element === documentElement) {
        const { target } = manager.dragOperation;
        const targetElement = target == null ? void 0 : target.element;
        if (targetElement) {
          const elements = getScrollableAncestors(targetElement, {
            excludeElement: false
          });
          previousScrollableElements = elements;
          return elements;
        }
      }
      if (element) {
        const elements = getScrollableAncestors(element, {
          excludeElement: false
        });
        if (this.autoScrolling && previousScrollableElements && elements.size < (previousScrollableElements == null ? void 0 : previousScrollableElements.size)) {
          return previousScrollableElements;
        }
        previousScrollableElements = elements;
        return elements;
      }
      previousScrollableElements = null;
      return null;
    }, deepEqual);
    this.getScrollableElements = () => {
      return scrollableElements.value;
    };
    this.scrollIntentTracker = new ScrollIntentTracker(manager);
    this.destroy = manager.monitor.addEventListener("dragmove", (event) => {
      if (this.disabled || event.defaultPrevented || !isKeyboardEvent(manager.dragOperation.activatorEvent) || !event.by) {
        return;
      }
      if (this.scroll({ by: event.by })) {
        event.preventDefault();
      }
    });
  }
};
_init4 = __decoratorStart$1(_a4);
_autoScrolling = /* @__PURE__ */ new WeakMap();
_meta = /* @__PURE__ */ new WeakMap();
_scroll = /* @__PURE__ */ new WeakMap();
__decorateElement$1(_init4, 4, "autoScrolling", _autoScrolling_dec, Scroller, _autoScrolling);
__decoratorMetadata$1(_init4, Scroller);
function getScrollIntent(value) {
  if (value > 0) {
    return ScrollDirection.Forward;
  }
  if (value < 0) {
    return ScrollDirection.Reverse;
  }
  return ScrollDirection.Idle;
}
var Scheduler2 = class {
  constructor(scheduler5) {
    this.scheduler = scheduler5;
    this.pending = false;
    this.tasks = /* @__PURE__ */ new Set();
    this.resolvers = /* @__PURE__ */ new Set();
    this.flush = () => {
      const { tasks, resolvers } = this;
      this.pending = false;
      this.tasks = /* @__PURE__ */ new Set();
      this.resolvers = /* @__PURE__ */ new Set();
      for (const task of tasks) {
        task();
      }
      for (const resolve of resolvers) {
        resolve();
      }
    };
  }
  schedule(task) {
    this.tasks.add(task);
    if (!this.pending) {
      this.pending = true;
      this.scheduler(this.flush);
    }
    return new Promise((resolve) => this.resolvers.add(resolve));
  }
};
var scheduler3 = new Scheduler2((callback) => {
  if (typeof requestAnimationFrame === "function") {
    requestAnimationFrame(callback);
  } else {
    callback();
  }
});
var AUTOSCROLL_INTERVAL = 10;
var _AutoScroller = class _AutoScroller2 extends Plugin {
  constructor(manager, options2) {
    super(manager, options2);
    const scroller = manager.registry.plugins.get(Scroller);
    if (!scroller) {
      throw new Error("AutoScroller plugin depends on Scroller plugin");
    }
    this.destroy = effect(() => {
      var _a5, _b2, _c3;
      if (this.disabled) {
        return;
      }
      const { position: _, status } = manager.dragOperation;
      if (status.dragging) {
        const scrollOptions = {
          acceleration: (_a5 = this.options) == null ? void 0 : _a5.acceleration,
          threshold: typeof ((_b2 = this.options) == null ? void 0 : _b2.threshold) === "number" ? { x: this.options.threshold, y: this.options.threshold } : (_c3 = this.options) == null ? void 0 : _c3.threshold
        };
        const canScroll2 = scroller.scroll(void 0, scrollOptions);
        if (canScroll2) {
          scroller.autoScrolling = true;
          const interval = setInterval(
            () => scheduler3.schedule(
              () => scroller.scroll(void 0, scrollOptions)
            ),
            AUTOSCROLL_INTERVAL
          );
          return () => {
            clearInterval(interval);
          };
        } else {
          scroller.autoScrolling = false;
        }
      }
    });
  }
};
_AutoScroller.configure = configurator(_AutoScroller);
var AutoScroller = _AutoScroller;
var listenerOptions = {
  capture: true,
  passive: true
};
var _timeout;
var ScrollListener = class extends CorePlugin {
  constructor(manager) {
    super(manager);
    __privateAdd$1(this, _timeout);
    this.handleScroll = () => {
      if (__privateGet$1(this, _timeout) == null) {
        __privateSet$1(this, _timeout, setTimeout(() => {
          this.manager.collisionObserver.forceUpdate(false);
          __privateSet$1(this, _timeout, void 0);
        }, 50));
      }
    };
    const { dragOperation } = this.manager;
    this.destroy = effect(() => {
      var _a5, _b2, _c3;
      const enabled = dragOperation.status.dragging;
      if (enabled) {
        const root = (_c3 = (_b2 = (_a5 = dragOperation.source) == null ? void 0 : _a5.element) == null ? void 0 : _b2.ownerDocument) != null ? _c3 : document;
        root.addEventListener("scroll", this.handleScroll, listenerOptions);
        return () => {
          root.removeEventListener(
            "scroll",
            this.handleScroll,
            listenerOptions
          );
        };
      }
    });
  }
};
_timeout = /* @__PURE__ */ new WeakMap();
var CSS_RULES2 = "* { user-select: none !important; -webkit-user-select: none !important; }";
var PreventSelection = class extends Plugin {
  constructor(manager) {
    super(manager);
    this.manager = manager;
    const styleInjector = manager.registry.plugins.get(
      StyleInjector
    );
    const unregisterStyles = styleInjector == null ? void 0 : styleInjector.register(CSS_RULES2);
    this.destroy = effect(() => {
      const { dragOperation } = this.manager;
      if (dragOperation.status.initialized) {
        removeSelection();
        document.addEventListener("selectionchange", removeSelection, {
          capture: true
        });
        return () => {
          document.removeEventListener("selectionchange", removeSelection, {
            capture: true
          });
        };
      }
    });
    if (unregisterStyles) {
      const originalDestroy = this.destroy.bind(this);
      this.destroy = () => {
        unregisterStyles();
        originalDestroy();
      };
    }
  }
};
function removeSelection() {
  var _a5;
  (_a5 = document.getSelection()) == null ? void 0 : _a5.removeAllRanges();
}
function isKeyboardKey(event, codes) {
  const eventKey = normalizeKey(event.key);
  return codes.some((code) => normalizeKey(code) === eventKey);
}
var namedKeys = /* @__PURE__ */ new Set([
  "alt",
  "altgraph",
  "backspace",
  "capslock",
  "control",
  "delete",
  "end",
  "enter",
  "escape",
  "home",
  "insert",
  "meta",
  "pagedown",
  "pageup",
  "pause",
  "printscreen",
  "shift",
  "space",
  "tab",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowup",
  "f1",
  "f2",
  "f3",
  "f4",
  "f5",
  "f6",
  "f7",
  "f8",
  "f9",
  "f10",
  "f11",
  "f12"
]);
function normalizeKey(key) {
  if (key === " " || key === "Spacebar") {
    return "space";
  }
  if (/^Key[A-Z]$/.test(key)) {
    return key.slice(3).toLowerCase();
  }
  if (/^Digit[0-9]$/.test(key)) {
    return key.slice(5);
  }
  if (key.length === 1) {
    return key.toLowerCase();
  }
  const lowerCaseKey = key.toLowerCase();
  return namedKeys.has(lowerCaseKey) ? lowerCaseKey : key;
}
var defaults = Object.freeze({
  offset: 10,
  keyboardCodes: {
    start: ["Space", "Enter"],
    cancel: ["Escape"],
    end: ["Space", "Enter", "Tab"],
    up: ["ArrowUp"],
    down: ["ArrowDown"],
    left: ["ArrowLeft"],
    right: ["ArrowRight"]
  },
  preventActivation(event, source) {
    var _a5;
    const target = (_a5 = source.handle) != null ? _a5 : source.element;
    return event.target !== target;
  }
});
var _cleanupFunctions;
var _KeyboardSensor = class _KeyboardSensor2 extends Sensor {
  constructor(manager, options2) {
    super(manager);
    this.manager = manager;
    this.options = options2;
    __privateAdd$1(this, _cleanupFunctions, []);
    this.listeners = new Listeners();
    this.handleSourceKeyDown = (event, source, options3) => {
      if (this.disabled || event.defaultPrevented) {
        return;
      }
      if (!isElement(event.target)) {
        return;
      }
      if (source.disabled) {
        return;
      }
      const {
        keyboardCodes = defaults.keyboardCodes,
        preventActivation = defaults.preventActivation
      } = options3 != null ? options3 : {};
      if (!isKeyboardKey(event, keyboardCodes.start)) {
        return;
      }
      if (!this.manager.dragOperation.status.idle) {
        return;
      }
      if (preventActivation == null ? void 0 : preventActivation(event, source)) return;
      this.handleStart(event, source, options3);
    };
  }
  bind(source, options2 = this.options) {
    const unbind = effect(() => {
      var _a5;
      const target = (_a5 = source.handle) != null ? _a5 : source.element;
      const listener = (event) => {
        if (isKeyboardEvent(event)) {
          this.handleSourceKeyDown(event, source, options2);
        }
      };
      if (target) {
        target.addEventListener("keydown", listener);
        return () => {
          target.removeEventListener("keydown", listener);
        };
      }
    });
    return unbind;
  }
  handleStart(event, source, options2) {
    const { element } = source;
    if (!element) {
      throw new Error("Source draggable does not have an associated element");
    }
    event.preventDefault();
    event.stopImmediatePropagation();
    scrollIntoViewIfNeeded(element);
    const { center } = new DOMRectangle(element);
    const controller = this.manager.actions.start({
      event,
      coordinates: {
        x: center.x,
        y: center.y
      },
      source
    });
    if (controller.signal.aborted) return this.cleanup();
    this.sideEffects();
    const sourceDocument = getDocument(element);
    const listeners = [
      this.listeners.bind(sourceDocument, [
        {
          type: "keydown",
          listener: (event2) => this.handleKeyDown(event2, source, options2),
          options: { capture: true }
        }
      ])
    ];
    __privateGet$1(this, _cleanupFunctions).push(...listeners);
  }
  handleKeyDown(event, _source, options2) {
    const { keyboardCodes = defaults.keyboardCodes } = options2 != null ? options2 : {};
    if (isKeyboardKey(event, [...keyboardCodes.end, ...keyboardCodes.cancel])) {
      event.preventDefault();
      const canceled = isKeyboardKey(event, keyboardCodes.cancel);
      this.handleEnd(event, canceled);
      return;
    }
    if (isKeyboardKey(event, keyboardCodes.up)) {
      this.handleMove("up", event);
    } else if (isKeyboardKey(event, keyboardCodes.down)) {
      this.handleMove("down", event);
    }
    if (isKeyboardKey(event, keyboardCodes.left)) {
      this.handleMove("left", event);
    } else if (isKeyboardKey(event, keyboardCodes.right)) {
      this.handleMove("right", event);
    }
  }
  handleEnd(event, canceled) {
    this.manager.actions.stop({
      event,
      canceled
    });
    this.cleanup();
  }
  handleMove(direction, event) {
    var _a5, _b2;
    const { shape } = this.manager.dragOperation;
    const factor = event.shiftKey ? 5 : 1;
    let by = {
      x: 0,
      y: 0
    };
    let offset = (_b2 = (_a5 = this.options) == null ? void 0 : _a5.offset) != null ? _b2 : defaults.offset;
    if (typeof offset === "number") {
      offset = { x: offset, y: offset };
    }
    if (!shape) {
      return;
    }
    switch (direction) {
      case "up":
        by = { x: 0, y: -offset.y * factor };
        break;
      case "down":
        by = { x: 0, y: offset.y * factor };
        break;
      case "left":
        by = { x: -offset.x * factor, y: 0 };
        break;
      case "right":
        by = { x: offset.x * factor, y: 0 };
        break;
    }
    if (by.x || by.y) {
      event.preventDefault();
      this.manager.actions.move({
        event,
        by
      });
    }
  }
  sideEffects() {
    const autoScroller = this.manager.registry.plugins.get(AutoScroller);
    if ((autoScroller == null ? void 0 : autoScroller.disabled) === false) {
      autoScroller.disable();
      __privateGet$1(this, _cleanupFunctions).push(() => {
        autoScroller.enable();
      });
    }
  }
  cleanup() {
    __privateGet$1(this, _cleanupFunctions).forEach((cleanup) => cleanup());
    __privateSet$1(this, _cleanupFunctions, []);
  }
  destroy() {
    this.cleanup();
    this.listeners.clear();
  }
};
_cleanupFunctions = /* @__PURE__ */ new WeakMap();
_KeyboardSensor.configure = configurator(_KeyboardSensor);
_KeyboardSensor.defaults = defaults;
var KeyboardSensor = _KeyboardSensor;
var _coordinates;
var DistanceConstraint = class extends ActivationConstraint {
  constructor() {
    super(...arguments);
    __privateAdd$1(this, _coordinates);
  }
  onEvent(event) {
    switch (event.type) {
      case "pointerdown":
        __privateSet$1(this, _coordinates, getEventCoordinates(event));
        break;
      case "pointermove":
        if (!__privateGet$1(this, _coordinates)) return;
        const { x, y } = getEventCoordinates(event);
        const delta = {
          x: x - __privateGet$1(this, _coordinates).x,
          y: y - __privateGet$1(this, _coordinates).y
        };
        const { tolerance } = this.options;
        if (tolerance && exceedsDistance(delta, tolerance)) {
          this.abort();
          return;
        }
        if (exceedsDistance(delta, this.options.value)) {
          this.activate(event);
        }
        break;
      case "pointerup":
        this.abort();
        break;
    }
  }
  abort() {
    __privateSet$1(this, _coordinates, void 0);
  }
};
_coordinates = /* @__PURE__ */ new WeakMap();
var _timeout2, _coordinates2;
var DelayConstraint = class extends ActivationConstraint {
  constructor() {
    super(...arguments);
    __privateAdd$1(this, _timeout2);
    __privateAdd$1(this, _coordinates2);
  }
  onEvent(event) {
    switch (event.type) {
      case "pointerdown":
        __privateSet$1(this, _coordinates2, getEventCoordinates(event));
        __privateSet$1(this, _timeout2, setTimeout(
          () => this.activate(event),
          this.options.value
        ));
        break;
      case "pointermove":
        if (!__privateGet$1(this, _coordinates2)) return;
        const { x, y } = getEventCoordinates(event);
        const delta = {
          x: x - __privateGet$1(this, _coordinates2).x,
          y: y - __privateGet$1(this, _coordinates2).y
        };
        if (exceedsDistance(delta, this.options.tolerance)) {
          this.abort();
        }
        break;
      case "pointerup":
        this.abort();
        break;
    }
  }
  abort() {
    if (__privateGet$1(this, _timeout2)) {
      clearTimeout(__privateGet$1(this, _timeout2));
      __privateSet$1(this, _coordinates2, void 0);
      __privateSet$1(this, _timeout2, void 0);
    }
  }
};
_timeout2 = /* @__PURE__ */ new WeakMap();
_coordinates2 = /* @__PURE__ */ new WeakMap();
var PointerActivationConstraints = class {
};
PointerActivationConstraints.Delay = DelayConstraint;
PointerActivationConstraints.Distance = DistanceConstraint;
var defaults2 = Object.freeze({
  activationConstraints(event, source) {
    var _a5;
    const { pointerType, target } = event;
    if (pointerType === "mouse" && isElement(target) && (source.handle === target || ((_a5 = source.handle) == null ? void 0 : _a5.contains(target)))) {
      return void 0;
    }
    if (pointerType === "touch") {
      return [
        new PointerActivationConstraints.Delay({ value: 250, tolerance: 5 })
      ];
    }
    if (isTextInput(target) && !event.defaultPrevented) {
      return [
        new PointerActivationConstraints.Delay({ value: 200, tolerance: 0 })
      ];
    }
    return [
      new PointerActivationConstraints.Delay({ value: 200, tolerance: 10 }),
      new PointerActivationConstraints.Distance({ value: 5 })
    ];
  },
  preventActivation(event, source) {
    var _a5;
    const { target } = event;
    if (target === source.element) return false;
    if (target === source.handle) return false;
    if (!isElement(target)) return false;
    if ((_a5 = source.handle) == null ? void 0 : _a5.contains(target)) return false;
    const interactiveElement = getInteractiveElement(target);
    if (interactiveElement === source.element) return false;
    return Boolean(interactiveElement);
  }
});
var _cleanup;
var _PointerSensor = class _PointerSensor2 extends Sensor {
  constructor(manager, options2) {
    super(manager);
    this.manager = manager;
    this.options = options2;
    __privateAdd$1(this, _cleanup, /* @__PURE__ */ new Set());
    this.listeners = new Listeners();
    this.latest = {
      event: void 0,
      coordinates: void 0
    };
    this.handleMove = () => {
      const { event, coordinates: to } = this.latest;
      if (!event || !to) {
        return;
      }
      this.manager.actions.move({ event, to });
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handlePointerUp = this.handlePointerUp.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  activationConstraints(event, source, options2 = this.options) {
    const { activationConstraints = defaults2.activationConstraints } = options2 != null ? options2 : {};
    const constraints = typeof activationConstraints === "function" ? activationConstraints(event, source) : activationConstraints;
    return constraints;
  }
  bind(source, options2 = this.options) {
    const unbind = effect(() => {
      var _a5;
      const controller = new AbortController();
      const { signal: signal3 } = controller;
      const listener = (event) => {
        if (isPointerEvent(event)) {
          this.handlePointerDown(event, source, options2);
        }
      };
      let targets = [(_a5 = source.handle) != null ? _a5 : source.element];
      if (options2 == null ? void 0 : options2.activatorElements) {
        if (Array.isArray(options2.activatorElements)) {
          targets = options2.activatorElements;
        } else {
          targets = options2.activatorElements(source);
        }
      }
      for (const target of targets) {
        if (!target) continue;
        patchWindow(target.ownerDocument.defaultView);
        target.addEventListener("pointerdown", listener, { signal: signal3 });
      }
      return () => controller.abort();
    });
    return unbind;
  }
  handlePointerDown(event, source, options2) {
    if (this.disabled || !event.isPrimary || event.button !== 0 || !isElement(event.target) || source.disabled || isCapturedBySensor(event) || !this.manager.dragOperation.status.idle) {
      return;
    }
    const { preventActivation = defaults2.preventActivation } = options2 != null ? options2 : {};
    if (preventActivation == null ? void 0 : preventActivation(event, source)) {
      return;
    }
    const { target } = event;
    const isNativeDraggable = isHTMLElement(target) && target.draggable && target.getAttribute("draggable") === "true";
    const offset = getFrameTransform(source.element);
    const { x, y } = getEventCoordinates(event);
    this.initialCoordinates = {
      x: x * offset.scaleX + offset.x,
      y: y * offset.scaleY + offset.y
    };
    const constraints = this.activationConstraints(event, source, options2);
    event.sensor = this;
    const controller = new ActivationController(
      constraints,
      (event2) => this.handleStart(source, event2)
    );
    controller.signal.onabort = () => this.handleCancel(event);
    controller.onEvent(event);
    this.controller = controller;
    const documents = getDocuments();
    const unbindListeners = this.listeners.bind(documents, [
      {
        type: "pointermove",
        listener: (event2) => this.handlePointerMove(event2, source)
      },
      {
        type: "pointerup",
        listener: this.handlePointerUp,
        options: {
          capture: true
        }
      },
      {
        type: "pointercancel",
        listener: this.handleCancel
      },
      {
        // Cancel activation if there is a competing Drag and Drop interaction
        type: "dragstart",
        listener: isNativeDraggable ? this.handleCancel : preventDefault,
        options: {
          capture: true
        }
      }
    ]);
    const cleanup = () => {
      unbindListeners();
      this.initialCoordinates = void 0;
    };
    __privateGet$1(this, _cleanup).add(cleanup);
  }
  handlePointerMove(event, source) {
    var _a5, _b2;
    if (((_a5 = this.controller) == null ? void 0 : _a5.activated) === false) {
      (_b2 = this.controller) == null ? void 0 : _b2.onEvent(event);
    }
    const { status } = this.manager.dragOperation;
    if (status.initializing || status.dragging) {
      const coordinates = getEventCoordinates(event);
      const offset = getFrameTransform(source.element);
      coordinates.x = coordinates.x * offset.scaleX + offset.x;
      coordinates.y = coordinates.y * offset.scaleY + offset.y;
      event.preventDefault();
      event.stopPropagation();
      this.latest.event = event;
      this.latest.coordinates = coordinates;
      if (status.dragging) {
        scheduler.schedule(this.handleMove);
      }
    }
  }
  handlePointerUp(event) {
    const { status } = this.manager.dragOperation;
    if (!status.idle) {
      event.preventDefault();
      event.stopPropagation();
      const canceled = !status.initialized;
      const ownerDocument = getDocument(event.target);
      const ownerWindow = ownerDocument.defaultView;
      if (!canceled && ownerWindow) {
        const suppressClick = (clickEvent) => {
          if (clickEvent.target === ownerDocument.body && clickEvent.detail > 0) {
            clickEvent.preventDefault();
            clickEvent.stopImmediatePropagation();
          }
        };
        ownerWindow.addEventListener("click", suppressClick, true);
        ownerWindow.setTimeout(() => {
          ownerWindow.removeEventListener("click", suppressClick, true);
        }, 0);
      }
      this.manager.actions.stop({ event, canceled });
    }
    this.cleanup();
  }
  handleKeyDown(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      this.handleCancel(event);
    }
  }
  handleStart(source, event) {
    const { manager, initialCoordinates } = this;
    if (!initialCoordinates || !manager.dragOperation.status.idle) {
      return;
    }
    if (event.defaultPrevented) {
      return;
    }
    const controller = manager.actions.start({
      coordinates: initialCoordinates,
      event,
      source
    });
    if (controller.signal.aborted) return this.cleanup();
    event.preventDefault();
    const ownerDocument = getDocument(event.target);
    const pointerCaptureTarget = ownerDocument.body;
    try {
      pointerCaptureTarget.setPointerCapture(event.pointerId);
    } catch (e) {
      this.handleCancel(event);
      return;
    }
    const listenerTargets = isElement(event.target) ? [event.target, pointerCaptureTarget] : pointerCaptureTarget;
    const unbind = this.listeners.bind(listenerTargets, [
      {
        // Prevent scrolling on touch devices
        type: "touchmove",
        listener: preventDefault,
        options: {
          passive: false
        }
      },
      {
        // Prevent click events
        type: "click",
        listener: preventDefault
      },
      {
        type: "contextmenu",
        listener: preventDefault
      },
      {
        type: "keydown",
        listener: this.handleKeyDown
      }
    ]);
    __privateGet$1(this, _cleanup).add(unbind);
    manager.renderer.rendering.then(() => {
      if (!controller.signal.aborted && manager.dragOperation.status.dragging) {
        scheduler.schedule(this.handleMove);
      }
    });
  }
  handleCancel(event) {
    const { dragOperation } = this.manager;
    if (dragOperation.status.initialized) {
      this.manager.actions.stop({ event, canceled: true });
    }
    this.cleanup();
  }
  cleanup() {
    const { controller } = this;
    this.controller = void 0;
    if (controller && !controller.signal.aborted) {
      controller.abort();
    }
    this.latest = {
      event: void 0,
      coordinates: void 0
    };
    __privateGet$1(this, _cleanup).forEach((cleanup) => cleanup());
    __privateGet$1(this, _cleanup).clear();
  }
  destroy() {
    this.cleanup();
    this.listeners.clear();
  }
};
_cleanup = /* @__PURE__ */ new WeakMap();
_PointerSensor.configure = configurator(_PointerSensor);
_PointerSensor.defaults = defaults2;
var PointerSensor = _PointerSensor;
function isCapturedBySensor(event) {
  return "sensor" in event;
}
function preventDefault(event) {
  event.preventDefault();
}
function noop() {
}
var windows = /* @__PURE__ */ new WeakSet();
function patchWindow(window2) {
  if (!window2 || windows.has(window2)) {
    return;
  }
  window2.addEventListener("touchmove", noop, {
    capture: false,
    passive: false
  });
  windows.add(window2);
}
var defaultPreset = {
  modifiers: [],
  plugins: [Accessibility, AutoScroller, Cursor, Feedback, PreventSelection],
  sensors: [PointerSensor, KeyboardSensor]
};
var DragDropManager2 = class extends DragDropManager$1 {
  constructor(input = {}) {
    const plugins = resolveCustomizable(input.plugins, defaultPreset.plugins);
    const sensors = resolveCustomizable(input.sensors, defaultPreset.sensors);
    const modifiers = resolveCustomizable(
      input.modifiers,
      defaultPreset.modifiers
    );
    super(__spreadProps$1(__spreadValues$1({}, input), {
      plugins: [ScrollListener, Scroller, StyleInjector, ...plugins],
      sensors,
      modifiers
    }));
  }
};
var _element_dec, _handle_dec, _c, _init5, _handle, _element;
var Draggable2 = class extends (_c = Draggable$1, _handle_dec = [reactive], _element_dec = [reactive], _c) {
  constructor(_a5, manager) {
    var _b2 = _a5, {
      element,
      effects: effects2 = () => [],
      handle
    } = _b2, input = __objRest$1(_b2, [
      "element",
      "effects",
      "handle"
    ]);
    super(
      __spreadValues$1({
        effects: () => [
          ...effects2(),
          () => {
            var _a6, _b3;
            const { manager: manager2 } = this;
            if (!manager2) return;
            const sensors = (_b3 = (_a6 = this.sensors) == null ? void 0 : _a6.map(descriptor)) != null ? _b3 : [
              ...manager2.sensors
            ];
            const unbindFunctions = sensors.map((entry) => {
              const sensorInstance = entry instanceof Sensor ? entry : manager2.registry.register(entry.plugin);
              const options2 = entry instanceof Sensor ? void 0 : entry.options;
              const unbind = sensorInstance.bind(this, options2);
              return unbind;
            });
            return function cleanup() {
              unbindFunctions.forEach((unbind) => unbind());
            };
          }
        ]
      }, input),
      manager
    );
    __privateAdd$1(this, _handle, __runInitializers$1(_init5, 8, this)), __runInitializers$1(_init5, 11, this);
    __privateAdd$1(this, _element, __runInitializers$1(_init5, 12, this)), __runInitializers$1(_init5, 15, this);
    this.element = element;
    this.handle = handle;
  }
};
_init5 = __decoratorStart$1(_c);
_handle = /* @__PURE__ */ new WeakMap();
_element = /* @__PURE__ */ new WeakMap();
__decorateElement$1(_init5, 4, "handle", _handle_dec, Draggable2, _handle);
__decorateElement$1(_init5, 4, "element", _element_dec, Draggable2, _element);
__decoratorMetadata$1(_init5, Draggable2);
var _proxy_dec, _element_dec2, _c2, _init6, _element2, _d, element_get, element_set, _Droppable_instances, _proxy;
var Droppable2 = class extends (_c2 = Droppable$1, _element_dec2 = [reactive], _proxy_dec = [reactive], _c2) {
  constructor(_a5, manager) {
    var _b2 = _a5, { element, effects: effects2 = () => [] } = _b2, input = __objRest$1(_b2, ["element", "effects"]);
    const { collisionDetector = defaultCollisionDetection$1 } = input;
    const updateShape = (boundingClientRect) => {
      const { manager: manager2, element: element2 } = this;
      if (!element2 || boundingClientRect === null) {
        this.shape = void 0;
        return void 0;
      }
      if (!manager2) return;
      const updatedShape = new DOMRectangle(element2);
      const shape = untracked(() => this.shape);
      if (updatedShape && (shape == null ? void 0 : shape.equals(updatedShape))) {
        return shape;
      }
      this.shape = updatedShape;
      return updatedShape;
    };
    const observePosition = signal(false);
    super(
      __spreadProps$1(__spreadValues$1({}, input), {
        collisionDetector,
        effects: () => [
          ...effects2(),
          () => {
            const { element: element2, manager: manager2 } = this;
            if (!manager2) return;
            const { dragOperation } = manager2;
            const { source } = dragOperation;
            observePosition.value = Boolean(
              source && dragOperation.status.initialized && element2 && !this.disabled && this.accepts(source)
            );
          },
          () => {
            const { element: element2 } = this;
            if (observePosition.value && element2) {
              const positionObserver = new FrameObserver(
                element2,
                updateShape
              );
              return () => {
                positionObserver.disconnect();
                this.shape = void 0;
              };
            }
          },
          () => {
            var _a6;
            if ((_a6 = this.manager) == null ? void 0 : _a6.dragOperation.status.initialized) {
              return () => {
                this.shape = void 0;
              };
            }
          }
        ]
      }),
      manager
    );
    __privateAdd$1(this, _Droppable_instances);
    __privateAdd$1(this, _element2, __runInitializers$1(_init6, 8, this)), __runInitializers$1(_init6, 11, this);
    __privateAdd$1(this, _proxy, __runInitializers$1(_init6, 12, this)), __runInitializers$1(_init6, 15, this);
    this.element = element;
    this.refreshShape = () => updateShape();
  }
  set element(element) {
    __privateSet$1(this, _Droppable_instances, element, element_set);
  }
  get element() {
    var _a5;
    return (_a5 = this.proxy) != null ? _a5 : __privateGet$1(this, _Droppable_instances, element_get);
  }
};
_init6 = __decoratorStart$1(_c2);
_element2 = /* @__PURE__ */ new WeakMap();
_Droppable_instances = /* @__PURE__ */ new WeakSet();
_proxy = /* @__PURE__ */ new WeakMap();
_d = __decorateElement$1(_init6, 20, "#element", _element_dec2, _Droppable_instances, _element2), element_get = _d.get, element_set = _d.set;
__decorateElement$1(_init6, 4, "proxy", _proxy_dec, Droppable2, _proxy);
__decoratorMetadata$1(_init6, Droppable2);
function isRef(value) {
  return value != null && typeof value === "object" && "current" in value;
}
function currentValue(value) {
  var _a5;
  if (value == null) {
    return void 0;
  }
  if (isRef(value)) {
    return (_a5 = value.current) != null ? _a5 : void 0;
  }
  return value;
}
var canUseDOM = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
var useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;
function useForceUpdate() {
  const setState = useState(0)[1];
  return useCallback(() => {
    setState((value) => value + 1);
  }, [setState]);
}
function useSignal(signal2, sync = false) {
  const previous = useRef(signal2.peek());
  const read = useRef(false);
  const forceUpdate = useForceUpdate();
  useIsomorphicLayoutEffect(
    () => effect(() => {
      const previousValue = previous.current;
      const currentValue2 = signal2.value;
      if (previousValue !== currentValue2) {
        previous.current = currentValue2;
        if (!read.current) return;
        if (sync) {
          flushSync(forceUpdate);
        } else {
          forceUpdate();
        }
      }
    }),
    [signal2, sync, forceUpdate]
  );
  return {
    get value() {
      read.current = true;
      return signal2.peek();
    }
  };
}
function useComputed(compute, dependencies = [], sync = false) {
  const $compute = useRef(compute);
  $compute.current = compute;
  return useSignal(
    useMemo(() => computed(() => $compute.current()), dependencies),
    sync
  );
}
function useLatest(value) {
  const valueRef = useRef(value);
  useIsomorphicLayoutEffect(() => {
    valueRef.current = value;
  }, [value]);
  return valueRef;
}
function useDeepSignal(target, synchronous) {
  const forceUpdate = useForceUpdate();
  const synchronousRef = useLatest(synchronous);
  const tracker = useMemo(() => {
    const tracked = /* @__PURE__ */ new Map();
    return {
      tracked,
      propertyCount: signal(0),
      active: false,
      proxy: target ? new Proxy(target, {
        get(target2, key) {
          const value = target2[key];
          if (!tracked.has(key)) tracked.set(key, value);
          return value;
        }
      }) : target
    };
  }, [target]);
  useIsomorphicLayoutEffect(() => {
    tracker.propertyCount.value = tracker.tracked.size;
  });
  useIsomorphicLayoutEffect(() => {
    if (!target) return;
    const { tracked, propertyCount } = tracker;
    tracker.active = true;
    const dispose = effect(() => {
      propertyCount.value;
      let stale = false;
      let sync = false;
      for (const [key, value] of tracked) {
        const latestValue = target[key];
        if (!Object.is(value, latestValue)) {
          stale = true;
          tracked.set(key, latestValue);
          sync = untracked(
            () => {
              var _a5;
              return (_a5 = synchronousRef.current) == null ? void 0 : _a5.call(synchronousRef, key, value, latestValue);
            }
          ) === true || sync;
        }
      }
      if (stale) {
        if (sync) {
          queueMicrotask(() => {
            if (tracker.active) flushSync(forceUpdate);
          });
        } else {
          forceUpdate();
        }
      }
    });
    return () => {
      tracker.active = false;
      dispose();
    };
  }, [target, tracker, forceUpdate, synchronousRef]);
  return tracker.proxy;
}
function useOnValueChange(value, onChange, effect3 = useEffect, compare = Object.is) {
  const tracked = useRef(value);
  effect3(() => {
    const oldValue = tracked.current;
    if (!compare(value, oldValue)) {
      tracked.current = value;
      onChange(value, oldValue);
    }
  }, [onChange, value]);
}
function useOnElementChange(value, onChange) {
  const previous = useRef(currentValue(value));
  useIsomorphicLayoutEffect(() => {
    const current = currentValue(value);
    if (current !== previous.current) {
      previous.current = current;
      onChange(current);
    }
  });
}
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var defaultManager = new DragDropManager2();
var DragDropContext = createContext(
  defaultManager
);
var Renderer = memo(
  forwardRef(({ children }, ref) => {
    const [transitionCount, setTransitionCount] = useState(0);
    const rendering = useRef(null);
    const resolver = useRef(null);
    const renderer = useMemo(
      () => ({
        renderer: {
          get rendering() {
            var _a22;
            return (_a22 = rendering.current) != null ? _a22 : Promise.resolve();
          }
        },
        trackRendering(callback) {
          if (!rendering.current) {
            rendering.current = new Promise((resolve) => {
              resolver.current = resolve;
            });
          }
          startTransition(() => {
            callback();
            setTransitionCount((count) => count + 1);
          });
        }
      }),
      []
    );
    useIsomorphicLayoutEffect(() => {
      var _a22;
      (_a22 = resolver.current) == null ? void 0 : _a22.call(resolver);
      rendering.current = null;
    }, [children, transitionCount]);
    useImperativeHandle(ref, () => renderer);
    return null;
  })
);
var options = [void 0, deepEqual];
function DragDropProvider(_a22) {
  var _b2 = _a22, {
    children,
    onCollision,
    onBeforeDragStart,
    onDragStart,
    onDragMove,
    onDragOver,
    onDragEnd
  } = _b2, input = __objRest(_b2, [
    "children",
    "onCollision",
    "onBeforeDragStart",
    "onDragStart",
    "onDragMove",
    "onDragOver",
    "onDragEnd"
  ]);
  const rendererRef = useRef(null);
  const {
    plugins: pluginsInput,
    modifiers: modifiersInput,
    sensors: sensorsInput
  } = input;
  const plugins = resolveCustomizable(pluginsInput, defaultPreset.plugins);
  const sensors = resolveCustomizable(sensorsInput, defaultPreset.sensors);
  const modifiers = resolveCustomizable(
    modifiersInput,
    defaultPreset.modifiers
  );
  const handleBeforeDragStart = useLatest(onBeforeDragStart);
  const handleDragStart = useLatest(onDragStart);
  const handleDragOver = useLatest(onDragOver);
  const handleDragMove = useLatest(onDragMove);
  const handleDragEnd = useLatest(onDragEnd);
  const handleCollision = useLatest(onCollision);
  const manager = useStableInstance(() => {
    var _a32;
    return (_a32 = input.manager) != null ? _a32 : new DragDropManager2(input);
  });
  useEffect(() => {
    if (!rendererRef.current) throw new Error("Renderer not found");
    const { renderer, trackRendering } = rendererRef.current;
    const { monitor } = manager;
    manager.renderer = renderer;
    const listeners = [
      monitor.addEventListener("beforedragstart", (event) => {
        const callback = handleBeforeDragStart.current;
        if (callback) {
          trackRendering(() => callback(event, manager));
        }
      }),
      monitor.addEventListener(
        "dragstart",
        (event) => {
          var _a32;
          return (_a32 = handleDragStart.current) == null ? void 0 : _a32.call(handleDragStart, event, manager);
        }
      ),
      monitor.addEventListener("dragover", (event) => {
        const callback = handleDragOver.current;
        if (callback) {
          trackRendering(() => callback(event, manager));
        }
      }),
      monitor.addEventListener("dragmove", (event) => {
        const callback = handleDragMove.current;
        if (callback) {
          trackRendering(() => callback(event, manager));
        }
      }),
      monitor.addEventListener("dragend", (event) => {
        const callback = handleDragEnd.current;
        if (callback) {
          trackRendering(() => callback(event, manager));
        }
      }),
      monitor.addEventListener(
        "collision",
        (event) => {
          var _a32;
          return (_a32 = handleCollision.current) == null ? void 0 : _a32.call(handleCollision, event, manager);
        }
      )
    ];
    return () => listeners.forEach((dispose) => dispose());
  }, [manager]);
  useOnValueChange(
    plugins,
    () => manager && (manager.plugins = plugins),
    ...options
  );
  useOnValueChange(
    sensors,
    () => manager && (manager.sensors = sensors),
    ...options
  );
  useOnValueChange(
    modifiers,
    () => manager && (manager.modifiers = modifiers),
    ...options
  );
  return /* @__PURE__ */ jsxs(DragDropContext.Provider, { value: manager, children: [
    /* @__PURE__ */ jsx(Renderer, { ref: rendererRef, children }),
    children
  ] });
}
function useStableInstance(create) {
  const ref = useRef(null);
  if (!ref.current) {
    ref.current = create();
  }
  useInsertionEffect(() => {
    return () => {
      var _a22;
      return (_a22 = ref.current) == null ? void 0 : _a22.destroy();
    };
  }, []);
  return ref.current;
}
function useDragDropManager() {
  return useContext(DragDropContext);
}
function useInstance(initializer) {
  var _a22;
  const manager = (_a22 = useDragDropManager()) != null ? _a22 : void 0;
  const [instance] = useState(() => initializer(manager));
  if (instance.manager !== manager) {
    instance.manager = manager;
  }
  useIsomorphicLayoutEffect(instance.register, [manager, instance]);
  return instance;
}
function useDraggable(input) {
  const { disabled, data, element, handle, id, modifiers, sensors, plugins } = input;
  const draggable = useInstance(
    (manager) => new Draggable2(
      __spreadProps(__spreadValues({}, input), {
        register: false,
        handle: currentValue(handle),
        element: currentValue(element)
      }),
      manager
    )
  );
  const trackedDraggable = useDeepSignal(draggable, shouldUpdateSynchronously);
  useOnValueChange(id, () => draggable.id = id);
  useOnElementChange(handle, (handle2) => draggable.handle = handle2);
  useOnElementChange(element, (element2) => draggable.element = element2);
  useOnValueChange(data, () => data && (draggable.data = data));
  useOnValueChange(disabled, () => draggable.disabled = disabled === true);
  useOnValueChange(
    sensors,
    () => draggable.sensors = sensors,
    void 0,
    deepEqual
  );
  useOnValueChange(
    modifiers,
    () => draggable.modifiers = modifiers,
    void 0,
    deepEqual
  );
  useOnValueChange(
    plugins,
    () => draggable.plugins = plugins,
    void 0,
    deepEqual
  );
  useOnValueChange(
    input.alignment,
    () => draggable.alignment = input.alignment
  );
  return {
    draggable: trackedDraggable,
    get isDragging() {
      return trackedDraggable.isDragging;
    },
    get isDropping() {
      return trackedDraggable.isDropping;
    },
    get isDragSource() {
      return trackedDraggable.isDragSource;
    },
    handleRef: useCallback(
      (element2) => {
        draggable.handle = element2 != null ? element2 : void 0;
      },
      [draggable]
    ),
    ref: useCallback(
      (element2) => {
        var _a22, _b2;
        if (!element2 && ((_a22 = draggable.element) == null ? void 0 : _a22.isConnected) && !((_b2 = draggable.manager) == null ? void 0 : _b2.dragOperation.status.idle)) {
          return;
        }
        draggable.element = element2 != null ? element2 : void 0;
      },
      [draggable]
    )
  };
}
function shouldUpdateSynchronously(key, oldValue, newValue) {
  if (key === "isDragSource" && !newValue && oldValue) return true;
  return false;
}
var __create = Object.create;
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __knownSymbol = (name, symbol) => (symbol = Symbol[name]) ? symbol : /* @__PURE__ */ Symbol.for("Symbol." + name);
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __decoratorStart = (base) => {
  var _a22;
  return [, , , __create((_a22 = base == null ? void 0 : base[__knownSymbol("metadata")]) != null ? _a22 : null)];
};
var __decoratorStrings = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"];
var __expectFn = (fn) => fn !== void 0 && typeof fn !== "function" ? __typeError("Function expected") : fn;
var __decoratorContext = (kind, name, done, metadata, fns) => ({ kind: __decoratorStrings[kind], name, metadata, addInitializer: (fn) => done._ ? __typeError("Already initialized") : fns.push(__expectFn(fn || null)) });
var __decoratorMetadata = (array, target) => __defNormalProp2(target, __knownSymbol("metadata"), array[3]);
var __runInitializers = (array, flags, self, value) => {
  for (var i = 0, fns = array[flags >> 1], n = fns && fns.length; i < n; i++) fns[i].call(self);
  return value;
};
var __decorateElement = (array, flags, name, decorators, target, extra) => {
  var it, done, ctx, access, k = flags & 7, s = false, p = false;
  var j = 2, key = __decoratorStrings[k + 5];
  var extraInitializers = array[j] || (array[j] = []);
  var desc = (target = target.prototype, __getOwnPropDesc(target, name));
  for (var i = decorators.length - 1; i >= 0; i--) {
    ctx = __decoratorContext(k, name, done = {}, array[3], extraInitializers);
    {
      ctx.static = s, ctx.private = p, access = ctx.access = { has: (x) => name in x };
      access.get = (x) => x[name];
    }
    it = (0, decorators[i])(desc[key], ctx), done._ = 1;
    __expectFn(it) && (desc[key] = it);
  }
  return desc && __defProp2(target, name, desc), target;
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), member.set(obj, value), value);
var Point = class _Point {
  /**
   * @param {number} Coordinate of the point on the horizontal axis
   * @param {number} Coordinate of the point on the vertical axis
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  /**
   * Returns the delta between this point and another point.
   *
   * @param {Point} a - A point
   * @param {Point} b - Another point
   */
  static delta(a, b) {
    return new _Point(a.x - b.x, a.y - b.y);
  }
  /**
   * Returns the distance (hypotenuse) between this point and another point.
   *
   * @param {Point} a - A point
   * @param {Point} b - Another point
   */
  static distance(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
  }
  /**
   * Returns true if both points are equal.
   *
   * @param {Point} a - A point
   * @param {Point} b - Another point
   */
  static equals(a, b) {
    return a.x === b.x && a.y === b.y;
  }
  static from({ x, y }) {
    return new _Point(x, y);
  }
};
var _direction_dec;
var _delta_dec;
var _a;
var _timestamp;
var _init;
var Position = class extends (_a = ValueHistory, _delta_dec = [derived], _direction_dec = [derived], _a) {
  constructor(initialValue) {
    const point = Point.from(initialValue);
    super(point, (a, b) => Point.equals(a, b));
    __runInitializers(_init, 5, this);
    __privateAdd(this, _timestamp, 0);
    this.velocity = { x: 0, y: 0 };
  }
  get delta() {
    return Point.delta(this.current, this.initial);
  }
  get direction() {
    const { current, previous } = this;
    if (!previous) return null;
    const delta = {
      x: current.x - previous.x,
      y: current.y - previous.y
    };
    if (!delta.x && !delta.y) {
      return null;
    }
    if (Math.abs(delta.x) > Math.abs(delta.y)) {
      return delta.x > 0 ? "right" : "left";
    }
    return delta.y > 0 ? "down" : "up";
  }
  get current() {
    return super.current;
  }
  set current(coordinates) {
    const { current } = this;
    const point = Point.from(coordinates);
    const delta = {
      x: point.x - current.x,
      y: point.y - current.y
    };
    const timestamp = Date.now();
    const timeDelta = timestamp - __privateGet(this, _timestamp);
    const velocity = (delta2) => Math.round(delta2 / timeDelta * 100);
    batch(() => {
      __privateSet(this, _timestamp, timestamp);
      this.velocity = {
        x: velocity(delta.x),
        y: velocity(delta.y)
      };
      super.current = point;
    });
  }
  reset(coordinates = this.defaultValue) {
    super.reset(Point.from(coordinates));
    this.velocity = { x: 0, y: 0 };
  }
};
_init = __decoratorStart(_a);
_timestamp = /* @__PURE__ */ new WeakMap();
__decorateElement(_init, 2, "delta", _delta_dec, Position);
__decorateElement(_init, 2, "direction", _direction_dec, Position);
__decoratorMetadata(_init, Position);
var Axis = /* @__PURE__ */ ((Axis2) => {
  Axis2["Horizontal"] = "x";
  Axis2["Vertical"] = "y";
  return Axis2;
})(Axis || {});
Object.values(Axis);
var pointerIntersection = ({
  dragOperation,
  droppable
}) => {
  const pointerCoordinates = dragOperation.position.current;
  if (!pointerCoordinates) {
    return null;
  }
  const { id } = droppable;
  if (!droppable.shape) {
    return null;
  }
  if (droppable.shape.containsPoint(pointerCoordinates)) {
    const distance = Point.distance(droppable.shape.center, pointerCoordinates);
    return {
      id,
      value: 1 / distance,
      type: CollisionType.PointerIntersection,
      priority: CollisionPriority.High
    };
  }
  return null;
};
var shapeIntersection = ({
  dragOperation,
  droppable
}) => {
  const { shape } = dragOperation;
  if (!droppable.shape || !(shape == null ? void 0 : shape.current)) {
    return null;
  }
  const intersectionArea = shape.current.intersectionArea(droppable.shape);
  if (intersectionArea) {
    const { position } = dragOperation;
    const distance = Point.distance(droppable.shape.center, position.current);
    const intersectionRatio = intersectionArea / (shape.current.area + droppable.shape.area - intersectionArea);
    const value = intersectionRatio / distance;
    return {
      id: droppable.id,
      value,
      type: CollisionType.ShapeIntersection,
      priority: CollisionPriority.Normal
    };
  }
  return null;
};
var defaultCollisionDetection = (args) => {
  var _a22;
  return (_a22 = pointerIntersection(args)) != null ? _a22 : shapeIntersection(args);
};
function useDroppable(input) {
  const { collisionDetector, data, disabled, element, id, accept, type } = input;
  const droppable = useInstance(
    (manager) => new Droppable2(
      __spreadProps(__spreadValues({}, input), {
        register: false,
        element: currentValue(element)
      }),
      manager
    )
  );
  const trackedDroppalbe = useDeepSignal(droppable);
  useOnValueChange(id, () => droppable.id = id);
  useOnElementChange(element, (element2) => droppable.element = element2);
  useOnValueChange(
    accept,
    () => droppable.accept = accept,
    void 0,
    deepEqual
  );
  useOnValueChange(
    collisionDetector,
    () => droppable.collisionDetector = collisionDetector != null ? collisionDetector : defaultCollisionDetection
  );
  useOnValueChange(data, () => data && (droppable.data = data));
  useOnValueChange(disabled, () => droppable.disabled = disabled === true);
  useOnValueChange(type, () => droppable.type = type);
  return {
    droppable: trackedDroppalbe,
    get isDropTarget() {
      return trackedDroppalbe.isDropTarget;
    },
    ref: useCallback(
      (element2) => {
        var _a22, _b2;
        if (!element2 && ((_a22 = droppable.element) == null ? void 0 : _a22.isConnected) && !((_b2 = droppable.manager) == null ? void 0 : _b2.dragOperation.status.idle)) {
          return;
        }
        droppable.element = element2 != null ? element2 : void 0;
      },
      [droppable]
    )
  };
}
function useDragOperation() {
  const manager = useDragDropManager();
  const source = useComputed(() => manager == null ? void 0 : manager.dragOperation.source, [manager]);
  const target = useComputed(() => manager == null ? void 0 : manager.dragOperation.target, [manager]);
  return {
    get source() {
      return source.value;
    },
    get target() {
      return target.value;
    }
  };
}
export {
  DragDropProvider as D,
  useDroppable as a,
  useDragOperation as b,
  useDraggable as u
};
