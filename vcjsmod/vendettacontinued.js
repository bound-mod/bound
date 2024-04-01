"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __export = (target, all2) => {
    for (var name in all2)
      __defProp(target, name, { get: all2[name], enumerable: true });
  };

  // src/lib/native.ts
  var nmp, MMKVManager, FileManager, ClientInfoManager, DeviceManager, BundleUpdaterManager;
  var init_native = __esm({
    "src/lib/native.ts"() {
      "use strict";
      nmp = window.nativeModuleProxy;
      MMKVManager = nmp.MMKVManager;
      FileManager = nmp.DCDFileManager ?? nmp.RTNFileManager;
      ClientInfoManager = nmp.InfoDictionaryManager ?? nmp.RTNClientInfoManager;
      DeviceManager = nmp.DCDDeviceManager ?? nmp.RTNDeviceManager;
      BundleUpdaterManager = nmp.BundleUpdaterManager;
    }
  });

  // src/lib/metro/filters.ts
  var filters_exports = {};
  __export(filters_exports, {
    find: () => find,
    findAll: () => findAll,
    findByDisplayName: () => findByDisplayName,
    findByDisplayNameAll: () => findByDisplayNameAll,
    findByName: () => findByName,
    findByNameAll: () => findByNameAll,
    findByProps: () => findByProps,
    findByPropsAll: () => findByPropsAll,
    findByStoreName: () => findByStoreName,
    findByTypeName: () => findByTypeName,
    findByTypeNameAll: () => findByTypeNameAll,
    modules: () => modules
  });
  var originalHandler, blacklist, filterModules, modules, find, findAll, propsFilter, nameFilter, dNameFilter, tNameFilter, storeFilter, findByProps, findByPropsAll, findByName, findByNameAll, findByDisplayName, findByDisplayNameAll, findByTypeName, findByTypeNameAll, findByStoreName;
  var init_filters = __esm({
    "src/lib/metro/filters.ts"() {
      "use strict";
      originalHandler = window.ErrorUtils.getGlobalHandler();
      blacklist = function(id) {
        return Object.defineProperty(window.modules, id, {
          value: window.modules[id],
          enumerable: false,
          configurable: true,
          writable: true
        });
      };
      for (const key in window.modules) {
        const id = Number(key);
        const module = window.modules[id]?.publicModule?.exports;
        if (!module || module === window || module["proxygone"] === null) {
          blacklist(id);
          continue;
        }
      }
      filterModules = function(modules2) {
        let single = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
        return function(filter) {
          const found = [];
          for (const key in modules2) {
            const id = Number(key);
            const module = modules2[id]?.publicModule?.exports;
            if (!modules2[id].isInitialized)
              try {
                window.ErrorUtils.setGlobalHandler(function() {
                });
                __r(id);
                window.ErrorUtils.setGlobalHandler(originalHandler);
              } catch {
              }
            if (!module) {
              blacklist(id);
              continue;
            }
            if (module.default && module.__esModule && filter(module.default)) {
              if (single)
                return module.default;
              found.push(module.default);
            }
            if (filter(module)) {
              if (single)
                return module;
              else
                found.push(module);
            }
          }
          if (!single)
            return found;
        };
      };
      modules = window.modules;
      find = filterModules(modules, true);
      findAll = filterModules(modules);
      propsFilter = function(props) {
        return function(m) {
          return props.every(function(p) {
            return m[p] !== void 0;
          });
        };
      };
      nameFilter = function(name, defaultExp) {
        return defaultExp ? function(m) {
          return m?.name === name;
        } : function(m) {
          return m?.default?.name === name;
        };
      };
      dNameFilter = function(displayName, defaultExp) {
        return defaultExp ? function(m) {
          return m?.displayName === displayName;
        } : function(m) {
          return m?.default?.displayName === displayName;
        };
      };
      tNameFilter = function(typeName, defaultExp) {
        return defaultExp ? function(m) {
          return m?.type?.name === typeName;
        } : function(m) {
          return m?.default?.type?.name === typeName;
        };
      };
      storeFilter = function(name) {
        return function(m) {
          return m.getName && m.getName.length === 0 && m.getName() === name;
        };
      };
      findByProps = function() {
        for (var _len = arguments.length, props = new Array(_len), _key = 0; _key < _len; _key++) {
          props[_key] = arguments[_key];
        }
        return find(propsFilter(props));
      };
      findByPropsAll = function() {
        for (var _len = arguments.length, props = new Array(_len), _key = 0; _key < _len; _key++) {
          props[_key] = arguments[_key];
        }
        return findAll(propsFilter(props));
      };
      findByName = function(name) {
        let defaultExp = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
        return find(nameFilter(name, defaultExp));
      };
      findByNameAll = function(name) {
        let defaultExp = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
        return findAll(nameFilter(name, defaultExp));
      };
      findByDisplayName = function(displayName) {
        let defaultExp = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
        return find(dNameFilter(displayName, defaultExp));
      };
      findByDisplayNameAll = function(displayName) {
        let defaultExp = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
        return findAll(dNameFilter(displayName, defaultExp));
      };
      findByTypeName = function(typeName) {
        let defaultExp = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
        return find(tNameFilter(typeName, defaultExp));
      };
      findByTypeNameAll = function(typeName) {
        let defaultExp = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
        return findAll(tNameFilter(typeName, defaultExp));
      };
      findByStoreName = function(name) {
        return find(storeFilter(name));
      };
    }
  });

  // src/lib/utils/findInReactTree.ts
  function findInReactTree_default(tree, filter) {
    return findInTree_default(tree, filter, {
      walkable: [
        "props",
        "children",
        "child",
        "sibling"
      ]
    });
  }
  var init_findInReactTree = __esm({
    "src/lib/utils/findInReactTree.ts"() {
      "use strict";
      init_utils();
    }
  });

  // src/lib/utils/findInTree.ts
  function treeSearch(tree, filter, opts, depth) {
    if (depth > opts.maxDepth)
      return;
    if (!tree)
      return;
    try {
      if (filter(tree))
        return tree;
    } catch {
    }
    if (Array.isArray(tree)) {
      for (const item of tree) {
        if (typeof item !== "object" || item === null)
          continue;
        try {
          const found = treeSearch(item, filter, opts, depth + 1);
          if (found)
            return found;
        } catch {
        }
      }
    } else if (typeof tree === "object") {
      for (const key of Object.keys(tree)) {
        if (typeof tree[key] !== "object" || tree[key] === null)
          continue;
        if (opts.walkable.length && !opts.walkable.includes(key))
          continue;
        if (opts.ignore.includes(key))
          continue;
        try {
          const found = treeSearch(tree[key], filter, opts, depth + 1);
          if (found)
            return found;
        } catch {
        }
      }
    }
  }
  function findInTree_default(tree, filter) {
    let { walkable = [], ignore = [], maxDepth = 100 } = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return treeSearch(tree, filter, {
      walkable,
      ignore,
      maxDepth
    }, 0);
  }
  var init_findInTree = __esm({
    "src/lib/utils/findInTree.ts"() {
      "use strict";
    }
  });

  // src/lib/utils/safeFetch.ts
  async function safeFetch(input, options) {
    let timeout = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1e4;
    const req = await fetch(input, {
      signal: timeoutSignal(timeout),
      ...options
    });
    if (!req.ok)
      throw new Error("Request returned non-ok");
    return req;
  }
  function timeoutSignal(ms) {
    const controller = new AbortController();
    setTimeout(function() {
      return controller.abort(`Timed out after ${ms}ms`);
    }, ms);
    return controller.signal;
  }
  var init_safeFetch = __esm({
    "src/lib/utils/safeFetch.ts"() {
      "use strict";
    }
  });

  // src/lib/utils/unfreeze.ts
  function unfreeze(obj) {
    if (Object.isFrozen(obj))
      return Object.assign({}, obj);
    return obj;
  }
  var init_unfreeze = __esm({
    "src/lib/utils/unfreeze.ts"() {
      "use strict";
    }
  });

  // src/lib/utils/without.ts
  function without(object) {
    for (var _len = arguments.length, keys = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      keys[_key - 1] = arguments[_key];
    }
    const cloned = {
      ...object
    };
    keys.forEach(function(k) {
      return delete cloned[k];
    });
    return cloned;
  }
  var init_without = __esm({
    "src/lib/utils/without.ts"() {
      "use strict";
    }
  });

  // src/lib/utils/index.ts
  var utils_exports = {};
  __export(utils_exports, {
    findInReactTree: () => findInReactTree_default,
    findInTree: () => findInTree_default,
    safeFetch: () => safeFetch,
    unfreeze: () => unfreeze,
    without: () => without
  });
  var init_utils = __esm({
    "src/lib/utils/index.ts"() {
      "use strict";
      init_findInReactTree();
      init_findInTree();
      init_safeFetch();
      init_unfreeze();
      init_without();
    }
  });

  // node_modules/spitroast/dist/esm/shared.js
  var patchTypes, patchedObjects;
  var init_shared = __esm({
    "node_modules/spitroast/dist/esm/shared.js"() {
      patchTypes = [
        "a",
        "b",
        "i"
      ];
      patchedObjects = /* @__PURE__ */ new Map();
    }
  });

  // node_modules/spitroast/dist/esm/hook.js
  function hook_default(funcName, funcParent, funcArgs, ctxt, isConstruct) {
    const patch = patchedObjects.get(funcParent)?.[funcName];
    if (!patch)
      return isConstruct ? Reflect.construct(funcParent[funcName], funcArgs, ctxt) : funcParent[funcName].apply(ctxt, funcArgs);
    for (const hook of patch.b.values()) {
      const maybefuncArgs = hook.call(ctxt, funcArgs);
      if (Array.isArray(maybefuncArgs))
        funcArgs = maybefuncArgs;
    }
    let workingRetVal = [
      ...patch.i.values()
    ].reduce(
      function(prev, current) {
        return function() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return current.call(ctxt, args, prev);
        };
      },
      // This calls the original function
      function() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        return isConstruct ? Reflect.construct(patch.o, args, ctxt) : patch.o.apply(ctxt, args);
      }
    )(...funcArgs);
    for (const hook of patch.a.values())
      workingRetVal = hook.call(ctxt, funcArgs, workingRetVal) ?? workingRetVal;
    return workingRetVal;
  }
  var init_hook = __esm({
    "node_modules/spitroast/dist/esm/hook.js"() {
      init_shared();
    }
  });

  // node_modules/spitroast/dist/esm/unpatch.js
  function unpatch(funcParent, funcName, hookId, type) {
    const patchedObject = patchedObjects.get(funcParent);
    const patch = patchedObject?.[funcName];
    if (!patch?.[type].has(hookId))
      return false;
    patch[type].delete(hookId);
    if (patchTypes.every(function(t) {
      return patch[t].size === 0;
    })) {
      const success = Reflect.defineProperty(funcParent, funcName, {
        value: patch.o,
        writable: true,
        configurable: true
      });
      if (!success)
        funcParent[funcName] = patch.o;
      delete patchedObject[funcName];
    }
    if (Object.keys(patchedObject).length == 0)
      patchedObjects.delete(funcParent);
    return true;
  }
  function unpatchAll() {
    for (const [parentObject, patchedObject] of patchedObjects.entries())
      for (const funcName in patchedObject)
        for (const hookType of patchTypes)
          for (const hookId of patchedObject[funcName]?.[hookType].keys() ?? [])
            unpatch(parentObject, funcName, hookId, hookType);
  }
  var init_unpatch = __esm({
    "node_modules/spitroast/dist/esm/unpatch.js"() {
      init_shared();
    }
  });

  // node_modules/spitroast/dist/esm/getPatchFunc.js
  function getPatchFunc_default(patchType) {
    return function(funcName, funcParent, callback) {
      let oneTime = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
      if (typeof funcParent[funcName] !== "function")
        throw new Error(`${funcName} is not a function in ${funcParent.constructor.name}`);
      if (!patchedObjects.has(funcParent))
        patchedObjects.set(funcParent, /* @__PURE__ */ Object.create(null));
      const parentInjections = patchedObjects.get(funcParent);
      if (!parentInjections[funcName]) {
        const origFunc = funcParent[funcName];
        parentInjections[funcName] = {
          o: origFunc,
          b: /* @__PURE__ */ new Map(),
          i: /* @__PURE__ */ new Map(),
          a: /* @__PURE__ */ new Map()
        };
        const runHook = function(ctxt, args, construct) {
          const ret = hook_default(funcName, funcParent, args, ctxt, construct);
          if (oneTime)
            unpatchThisPatch();
          return ret;
        };
        const replaceProxy = new Proxy(origFunc, {
          apply: function(_, ctxt, args) {
            return runHook(ctxt, args, false);
          },
          construct: function(_, args) {
            return runHook(origFunc, args, true);
          },
          get: function(target, prop, receiver) {
            return prop == "toString" ? origFunc.toString.bind(origFunc) : Reflect.get(target, prop, receiver);
          }
        });
        const success = Reflect.defineProperty(funcParent, funcName, {
          value: replaceProxy,
          configurable: true,
          writable: true
        });
        if (!success)
          funcParent[funcName] = replaceProxy;
      }
      const hookId = Symbol();
      const unpatchThisPatch = function() {
        return unpatch(funcParent, funcName, hookId, patchType);
      };
      parentInjections[funcName][patchType].set(hookId, callback);
      return unpatchThisPatch;
    };
  }
  var init_getPatchFunc = __esm({
    "node_modules/spitroast/dist/esm/getPatchFunc.js"() {
      init_hook();
      init_shared();
      init_unpatch();
    }
  });

  // node_modules/spitroast/dist/esm/index.js
  var esm_exports = {};
  __export(esm_exports, {
    after: () => after,
    before: () => before,
    instead: () => instead,
    unpatchAll: () => unpatchAll
  });
  var before, instead, after;
  var init_esm = __esm({
    "node_modules/spitroast/dist/esm/index.js"() {
      init_getPatchFunc();
      init_unpatch();
      before = getPatchFunc_default("b");
      instead = getPatchFunc_default("i");
      after = getPatchFunc_default("a");
    }
  });

  // src/lib/patcher.ts
  var patcher_default;
  var init_patcher = __esm({
    "src/lib/patcher.ts"() {
      "use strict";
      init_esm();
      init_esm();
      patcher_default = {
        ...esm_exports
      };
    }
  });

  // src/lib/emitter.ts
  function createEmitter() {
    return {
      listeners: Object.values(Events).reduce(function(acc, val) {
        return acc[val] = /* @__PURE__ */ new Set(), acc;
      }, {}),
      on(event, listener) {
        if (!this.listeners[event].has(listener))
          this.listeners[event].add(listener);
      },
      off(event, listener) {
        this.listeners[event].delete(listener);
      },
      once(event, listener) {
        var _this = this;
        const once = function(event2, data) {
          _this.off(event2, once);
          listener(event2, data);
        };
        this.on(event, once);
      },
      emit(event, data) {
        for (const listener of this.listeners[event])
          listener(event, data);
      }
    };
  }
  var Events;
  var init_emitter = __esm({
    "src/lib/emitter.ts"() {
      "use strict";
      (function(Events2) {
        Events2["GET"] = "GET";
        Events2["SET"] = "SET";
        Events2["DEL"] = "DEL";
      })(Events || (Events = {}));
    }
  });

  // src/lib/storage/backends.ts
  var ILLEGAL_CHARS_REGEX, filePathFixer, getMMKVPath, purgeStorage, createMMKVBackend, createFileBackend;
  var init_backends = __esm({
    "src/lib/storage/backends.ts"() {
      "use strict";
      init_native();
      init_common();
      ILLEGAL_CHARS_REGEX = /[<>:"\/\\|?*]/g;
      filePathFixer = function(file) {
        return ReactNative.Platform.select({
          default: file,
          ios: FileManager.saveFileToGallery ? file : `Documents/${file}`
        });
      };
      getMMKVPath = function(name) {
        if (ILLEGAL_CHARS_REGEX.test(name)) {
          name = name.replace(ILLEGAL_CHARS_REGEX, "-").replace(/-+/g, "-");
        }
        return `vd_mmkv/${name}`;
      };
      purgeStorage = async function(store) {
        if (await MMKVManager.getItem(store)) {
          MMKVManager.removeItem(store);
        }
        const mmkvPath = getMMKVPath(store);
        if (await FileManager.fileExists(`${FileManager.getConstants().DocumentsDirPath}/${mmkvPath}`)) {
          await FileManager.removeFile?.("documents", mmkvPath);
        }
      };
      createMMKVBackend = function(store) {
        const mmkvPath = getMMKVPath(store);
        return createFileBackend(mmkvPath, async function() {
          try {
            const path = `${FileManager.getConstants().DocumentsDirPath}/${mmkvPath}`;
            if (await FileManager.fileExists(path))
              return;
            let oldData = await MMKVManager.getItem(store) ?? "{}";
            if (oldData === "!!LARGE_VALUE!!") {
              const cachePath = `${FileManager.getConstants().CacheDirPath}/mmkv/${store}`;
              if (await FileManager.fileExists(cachePath)) {
                oldData = await FileManager.readFile(cachePath, "utf8");
              } else {
                console.log(`${store}: Experienced data loss :(`);
                oldData = "{}";
              }
            }
            await FileManager.writeFile("documents", filePathFixer(mmkvPath), oldData, "utf8");
            if (await MMKVManager.getItem(store) !== null) {
              MMKVManager.removeItem(store);
              console.log(`Successfully migrated ${store} store from MMKV storage to fs`);
            }
          } catch (err) {
            console.error("Failed to migrate to fs from MMKVManager ", err);
          }
        }());
      };
      createFileBackend = function(file, migratePromise) {
        let created;
        return {
          get: async function() {
            await migratePromise;
            const path = `${FileManager.getConstants().DocumentsDirPath}/${file}`;
            if (!created && !await FileManager.fileExists(path))
              return created = true, FileManager.writeFile("documents", filePathFixer(file), "{}", "utf8");
            return JSON.parse(await FileManager.readFile(path, "utf8"));
          },
          set: async function(data) {
            await migratePromise;
            await FileManager.writeFile("documents", filePathFixer(file), JSON.stringify(data), "utf8");
          }
        };
      };
    }
  });

  // src/lib/storage/index.ts
  var storage_exports = {};
  __export(storage_exports, {
    awaitSyncWrapper: () => awaitSyncWrapper,
    createFileBackend: () => createFileBackend,
    createMMKVBackend: () => createMMKVBackend,
    createProxy: () => createProxy,
    createStorage: () => createStorage,
    purgeStorage: () => purgeStorage,
    useProxy: () => useProxy,
    wrapSync: () => wrapSync
  });
  function createProxy() {
    let target = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const emitter = createEmitter();
    function createProxy2(target2, path) {
      return new Proxy(target2, {
        get(target3, prop) {
          if (prop === emitterSymbol)
            return emitter;
          const newPath = [
            ...path,
            prop
          ];
          const value = target3[prop];
          if (value !== void 0 && value !== null) {
            emitter.emit("GET", {
              path: newPath,
              value
            });
            if (typeof value === "object") {
              return createProxy2(value, newPath);
            }
            return value;
          }
          return value;
        },
        set(target3, prop, value) {
          target3[prop] = value;
          emitter.emit("SET", {
            path: [
              ...path,
              prop
            ],
            value
          });
          return true;
        },
        deleteProperty(target3, prop) {
          const success = delete target3[prop];
          if (success)
            emitter.emit("DEL", {
              path: [
                ...path,
                prop
              ]
            });
          return success;
        }
      });
    }
    return {
      proxy: createProxy2(target, []),
      emitter
    };
  }
  function useProxy(storage) {
    if (storage[storageErrorSymbol])
      throw storage[storageErrorSymbol];
    const emitter = storage[emitterSymbol];
    if (!emitter)
      throw new Error("InvalidArgumentExcpetion - storage[emitterSymbol] is " + typeof emitter);
    const [, forceUpdate] = React.useReducer(function(n) {
      return ~n;
    }, 0);
    React.useEffect(function() {
      const listener = function() {
        return forceUpdate();
      };
      emitter.on("SET", listener);
      emitter.on("DEL", listener);
      return function() {
        emitter.off("SET", listener);
        emitter.off("DEL", listener);
      };
    }, []);
    return storage;
  }
  async function createStorage(backend) {
    const data = await backend.get();
    const { proxy, emitter } = createProxy(data);
    const handler = function() {
      return backend.set(proxy);
    };
    emitter.on("SET", handler);
    emitter.on("DEL", handler);
    return proxy;
  }
  function wrapSync(store) {
    let awaited = void 0;
    let error = void 0;
    const awaitQueue = [];
    const awaitInit = function(cb) {
      return awaited ? cb() : awaitQueue.push(cb);
    };
    store.then(function(v) {
      awaited = v;
      awaitQueue.forEach(function(cb) {
        return cb();
      });
    }).catch(function(e) {
      error = e;
    });
    return new Proxy({}, {
      ...Object.fromEntries(Object.getOwnPropertyNames(Reflect).map(function(k) {
        return [
          k,
          function(t) {
            for (var _len = arguments.length, a = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              a[_key - 1] = arguments[_key];
            }
            return Reflect[k](awaited ?? t, ...a);
          }
        ];
      })),
      get(target, prop, recv) {
        if (prop === storageErrorSymbol)
          return error;
        if (prop === syncAwaitSymbol)
          return awaitInit;
        return Reflect.get(awaited ?? target, prop, recv);
      }
    });
  }
  var emitterSymbol, syncAwaitSymbol, storageErrorSymbol, awaitSyncWrapper;
  var init_storage = __esm({
    "src/lib/storage/index.ts"() {
      "use strict";
      init_emitter();
      init_backends();
      emitterSymbol = Symbol.for("vendetta.storage.emitter");
      syncAwaitSymbol = Symbol.for("vendetta.storage.accessor");
      storageErrorSymbol = Symbol.for("vendetta.storage.error");
      awaitSyncWrapper = function(store) {
        return new Promise(function(res) {
          return store[syncAwaitSymbol](res);
        });
      };
    }
  });

  // src/lib/logger.ts
  var logModule, logger, logger_default;
  var init_logger = __esm({
    "src/lib/logger.ts"() {
      "use strict";
      init_filters();
      logModule = findByProps("setLogFn").default;
      logger = new logModule("Vendetta Continued");
      logger_default = logger;
    }
  });

  // src/lib/themes.ts
  var themes_exports = {};
  __export(themes_exports, {
    color: () => color,
    fetchTheme: () => fetchTheme,
    getCurrentTheme: () => getCurrentTheme,
    initThemes: () => initThemes,
    installTheme: () => installTheme,
    patchChatBackground: () => patchChatBackground,
    removeTheme: () => removeTheme,
    selectTheme: () => selectTheme,
    themes: () => themes,
    updateThemes: () => updateThemes
  });
  async function writeTheme(theme) {
    if (typeof theme !== "object")
      throw new Error("Theme must be an object");
    await createFileBackend("vendetta_theme.json").set(theme);
  }
  function patchChatBackground() {
    const currentBackground = getCurrentTheme()?.data?.background;
    if (!currentBackground)
      return;
    const MessagesWrapperConnected = findByName("MessagesWrapperConnected", false);
    if (!MessagesWrapperConnected)
      return;
    const { MessagesWrapper } = findByProps("MessagesWrapper");
    if (!MessagesWrapper)
      return;
    const patches = [
      after("default", MessagesWrapperConnected, function(_, ret) {
        return React.createElement(ReactNative.ImageBackground, {
          style: {
            flex: 1,
            height: "100%"
          },
          source: {
            uri: currentBackground.url
          },
          blurRadius: typeof currentBackground.blur === "number" ? currentBackground.blur : 0,
          children: ret
        });
      }),
      after("render", MessagesWrapper.prototype, function(_, ret) {
        const Messages = findInReactTree_default(ret, function(x) {
          return "HACK_fixModalInteraction" in x?.props && x?.props?.style;
        });
        if (Messages)
          Messages.props.style = Object.assign(ReactNative.StyleSheet.flatten(Messages.props.style ?? {}), {
            backgroundColor: "#0000"
          });
        else
          logger_default.error("Didn't find Messages when patching MessagesWrapper!");
      })
    ];
    return function() {
      return patches.forEach(function(x) {
        return x();
      });
    };
  }
  function normalizeToHex(colorString) {
    if (chroma.valid(colorString))
      return chroma(colorString).hex();
    const color2 = Number(ReactNative.processColor(colorString));
    return chroma.rgb(
      color2 >> 16 & 255,
      color2 >> 8 & 255,
      color2 & 255,
      color2 >> 24 & 255
      // alpha
    ).hex();
  }
  function processData(data) {
    if (data.semanticColors) {
      const semanticColors2 = data.semanticColors;
      for (const key in semanticColors2) {
        for (const index in semanticColors2[key]) {
          semanticColors2[key][index] &&= normalizeToHex(semanticColors2[key][index]);
        }
      }
    }
    if (data.rawColors) {
      const rawColors2 = data.rawColors;
      for (const key in rawColors2) {
        data.rawColors[key] = normalizeToHex(rawColors2[key]);
      }
      if (ReactNative.Platform.OS === "android")
        applyAndroidAlphaKeys(rawColors2);
    }
    return data;
  }
  function applyAndroidAlphaKeys(rawColors2) {
    const alphaMap = {
      "BLACK_ALPHA_60": [
        "BLACK",
        0.6
      ],
      "BRAND_NEW_360_ALPHA_20": [
        "BRAND_360",
        0.2
      ],
      "BRAND_NEW_360_ALPHA_25": [
        "BRAND_360",
        0.25
      ],
      "BRAND_NEW_500_ALPHA_20": [
        "BRAND_500",
        0.2
      ],
      "PRIMARY_DARK_500_ALPHA_20": [
        "PRIMARY_500",
        0.2
      ],
      "PRIMARY_DARK_700_ALPHA_60": [
        "PRIMARY_700",
        0.6
      ],
      "STATUS_GREEN_500_ALPHA_20": [
        "GREEN_500",
        0.2
      ],
      "STATUS_RED_500_ALPHA_20": [
        "RED_500",
        0.2
      ]
    };
    for (const key in alphaMap) {
      const [colorKey, alpha] = alphaMap[key];
      if (!rawColors2[colorKey])
        continue;
      rawColors2[key] = chroma(rawColors2[colorKey]).alpha(alpha).hex();
    }
  }
  async function fetchTheme(id) {
    let selected = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    let themeJSON;
    try {
      themeJSON = await (await safeFetch(id, {
        cache: "no-store"
      })).json();
    } catch {
      throw new Error(`Failed to fetch theme at ${id}`);
    }
    themes[id] = {
      id,
      selected,
      data: processData(themeJSON)
    };
    if (selected)
      writeTheme(themes[id]);
  }
  async function installTheme(id) {
    if (typeof id !== "string" || id in themes)
      throw new Error("Theme already installed");
    await fetchTheme(id);
  }
  async function selectTheme(id) {
    if (id === "default")
      return await writeTheme({});
    const selectedThemeId = Object.values(themes).find(function(i) {
      return i.selected;
    })?.id;
    if (selectedThemeId)
      themes[selectedThemeId].selected = false;
    themes[id].selected = true;
    await writeTheme(themes[id]);
  }
  async function removeTheme(id) {
    const theme = themes[id];
    if (theme.selected)
      await selectTheme("default");
    delete themes[id];
    return theme.selected;
  }
  function getCurrentTheme() {
    const themeProp = window.__vendetta_loader?.features?.themes?.prop;
    if (!themeProp)
      return null;
    return window[themeProp] || null;
  }
  async function updateThemes() {
    await awaitSyncWrapper(themes);
    const currentTheme = getCurrentTheme();
    await Promise.allSettled(Object.keys(themes).map(function(id) {
      return fetchTheme(id, currentTheme?.id === id);
    }));
  }
  async function initThemes() {
    const selectedTheme = getCurrentTheme();
    if (!selectedTheme)
      return;
    const oldRaw = color.default.unsafe_rawColors;
    color.default.unsafe_rawColors = new Proxy(oldRaw, {
      get: function(_, colorProp) {
        if (!selectedTheme)
          return Reflect.get(oldRaw, colorProp);
        return selectedTheme.data?.rawColors?.[colorProp] ?? Reflect.get(oldRaw, colorProp);
      }
    });
    instead("resolveSemanticColor", color.default.meta ?? color.default.internal, function(args, orig) {
      if (!selectedTheme)
        return orig(...args);
      const [theme, propIndex] = args;
      const [name, colorDef] = extractInfo(theme, propIndex);
      const themeIndex = theme === "amoled" ? 2 : theme === "light" ? 1 : 0;
      const alternativeName = semanticAlternativeMap[name] ?? name;
      const semanticColorVal = (selectedTheme.data?.semanticColors?.[name] ?? selectedTheme.data?.semanticColors?.[alternativeName])?.[themeIndex];
      if (name === "CHAT_BACKGROUND" && typeof selectedTheme.data?.background?.alpha === "number") {
        return chroma(semanticColorVal || "black").alpha(1 - selectedTheme.data.background.alpha).hex();
      }
      if (semanticColorVal)
        return semanticColorVal;
      const rawValue = selectedTheme.data?.rawColors?.[colorDef.raw];
      if (rawValue) {
        return colorDef.opacity === 1 ? rawValue : chroma(rawValue).alpha(colorDef.opacity).hex();
      }
      return orig(...args);
    });
    await updateThemes();
  }
  function extractInfo(themeMode, colorObj) {
    const propName = colorObj[extractInfo._sym ??= Object.getOwnPropertySymbols(colorObj)[0]];
    const colorDef = color.SemanticColor[propName];
    return [
      propName,
      colorDef[themeMode.toLowerCase()]
    ];
  }
  var color, themes, semanticAlternativeMap;
  var init_themes = __esm({
    "src/lib/themes.ts"() {
      "use strict";
      init_common();
      init_utils();
      init_filters();
      init_patcher();
      init_storage();
      init_logger();
      color = findByProps("SemanticColor");
      themes = wrapSync(createStorage(createMMKVBackend("VENDETTA_THEMES")));
      semanticAlternativeMap = {
        "BG_BACKDROP": "BACKGROUND_FLOATING",
        "BG_BASE_PRIMARY": "BACKGROUND_PRIMARY",
        "BG_BASE_SECONDARY": "BACKGROUND_SECONDARY",
        "BG_BASE_TERTIARY": "BACKGROUND_SECONDARY_ALT",
        "BG_MOD_FAINT": "BACKGROUND_MODIFIER_ACCENT",
        "BG_MOD_STRONG": "BACKGROUND_MODIFIER_ACCENT",
        "BG_MOD_SUBTLE": "BACKGROUND_MODIFIER_ACCENT",
        "BG_SURFACE_OVERLAY": "BACKGROUND_FLOATING",
        "BG_SURFACE_OVERLAY_TMP": "BACKGROUND_FLOATING",
        "BG_SURFACE_RAISED": "BACKGROUND_MOBILE_PRIMARY"
      };
    }
  });

  // src/lib/preinit.ts
  var basicFind, requireNativeComponent, ReactNative, chroma;
  var init_preinit = __esm({
    "src/lib/preinit.ts"() {
      "use strict";
      init_themes();
      init_patcher();
      basicFind = function(filter) {
        for (const key in window.modules) {
          const exp = window.modules[key]?.publicModule.exports;
          if (exp && filter(exp))
            return exp;
        }
      };
      requireNativeComponent = basicFind(function(m) {
        return m?.default?.name === "requireNativeComponent";
      });
      if (requireNativeComponent) {
        instead("default", requireNativeComponent, function(args, orig) {
          try {
            return orig(...args);
          } catch {
            return args[0];
          }
        });
      }
      window.React = basicFind(function(m) {
        return m.createElement;
      });
      ReactNative = basicFind(function(m) {
        return m.AppRegistry;
      });
      chroma = basicFind(function(m) {
        return m.brewer;
      });
      if (window.__vendetta_loader?.features.themes) {
        try {
          initThemes();
        } catch (e) {
          console.error("[Bound] Failed to initialize themes...", e);
        }
      }
    }
  });

  // src/lib/metro/common.ts
  var common_exports = {};
  __export(common_exports, {
    Flux: () => Flux,
    FluxDispatcher: () => FluxDispatcher,
    NavigationNative: () => NavigationNative,
    React: () => React2,
    ReactNative: () => ReactNative,
    TextStyleSheet: () => TextStyleSheet,
    assets: () => assets,
    channels: () => channels,
    chroma: () => chroma,
    clipboard: () => clipboard,
    commands: () => commands,
    constants: () => constants,
    i18n: () => i18n,
    invites: () => invites,
    lodash: () => lodash,
    moment: () => moment,
    navigation: () => navigation,
    navigationStack: () => navigationStack,
    stylesheet: () => stylesheet,
    toasts: () => toasts,
    url: () => url,
    util: () => util
  });
  function createThemedStyleSheet(sheet) {
    if (!colorModule)
      return;
    for (const key in sheet) {
      sheet[key] = new Proxy(ReactNative.StyleSheet.flatten(sheet[key]), {
        get(target, prop, receiver) {
          const res = Reflect.get(target, prop, receiver);
          return colorResolver.isSemanticColor(res) ? colorResolver.resolveSemanticColor(ThemeStore.theme, res) : res;
        }
      });
    }
    return sheet;
  }
  var ThemeStore, colorModule, colorResolver, constants, channels, i18n, url, toasts, stylesheet, clipboard, assets, invites, commands, navigation, navigationStack, NavigationNative, TextStyleSheet, Flux, FluxDispatcher, React2, moment, lodash, util;
  var init_common = __esm({
    "src/lib/metro/common.ts"() {
      "use strict";
      init_filters();
      init_preinit();
      init_preinit();
      init_preinit();
      ThemeStore = findByStoreName("ThemeStore");
      colorModule = findByProps("colors", "unsafe_rawColors");
      colorResolver = colorModule?.internal ?? colorModule?.meta;
      constants = findByProps("Fonts", "Permissions");
      channels = findByProps("getVoiceChannelId");
      i18n = findByProps("Messages");
      url = findByProps("openURL", "openDeeplink");
      toasts = find(function(m) {
        return m.open && m.close && !m.startDrag && !m.init && !m.openReplay && !m.setAlwaysOnTop && !m.setAccountFlag;
      });
      stylesheet = {
        ...find(function(m) {
          return m.createStyles && !m.ActionSheet;
        }),
        createThemedStyleSheet,
        ...findByProps("createThemedStyleSheet")
      };
      clipboard = findByProps("setString", "getString", "hasString");
      assets = findByProps("registerAsset");
      invites = findByProps("acceptInviteAndTransitionToInviteChannel");
      commands = findByProps("getBuiltInCommands");
      navigation = findByProps("pushLazy");
      navigationStack = findByProps("createStackNavigator");
      NavigationNative = findByProps("NavigationContainer");
      ({ TextStyleSheet } = findByProps("TextStyleSheet"));
      Flux = findByProps("connectStores");
      FluxDispatcher = findByProps("_currentDispatchActionType");
      React2 = window.React;
      moment = findByProps("isMoment");
      lodash = findByProps("forEachRight");
      util = findByProps("inspect", "isNullOrUndefined");
    }
  });

  // src/ui/assets.ts
  var assets_exports = {};
  __export(assets_exports, {
    all: () => all,
    find: () => find2,
    getAssetByID: () => getAssetByID,
    getAssetByName: () => getAssetByName,
    getAssetIDByName: () => getAssetIDByName,
    patchAssets: () => patchAssets
  });
  function patchAssets() {
    const unpatch2 = after("registerAsset", assets, function(args, id) {
      const asset = args[0];
      all[asset.name] = {
        ...asset,
        id
      };
    });
    for (let id = 1; ; id++) {
      const asset = assets.getAssetByID(id);
      if (!asset)
        break;
      if (all[asset.name])
        continue;
      all[asset.name] = {
        ...asset,
        id
      };
    }
    return unpatch2;
  }
  var all, find2, getAssetByName, getAssetByID, getAssetIDByName;
  var init_assets = __esm({
    "src/ui/assets.ts"() {
      "use strict";
      init_common();
      init_patcher();
      all = {};
      find2 = function(filter) {
        return Object.values(all).find(filter);
      };
      getAssetByName = function(name) {
        return all[name];
      };
      getAssetByID = function(id) {
        return assets.getAssetByID(id);
      };
      getAssetIDByName = function(name) {
        return all[name]?.id;
      };
    }
  });

  // src/ui/toasts.ts
  var toasts_exports = {};
  __export(toasts_exports, {
    showToast: () => showToast
  });
  var uuid4, showToast;
  var init_toasts = __esm({
    "src/ui/toasts.ts"() {
      "use strict";
      init_filters();
      init_common();
      ({ uuid4 } = findByProps("uuid4"));
      showToast = function(content, asset) {
        return toasts.open({
          //? In build 182205/44707, Discord changed their toasts, source is no longer used, rather icon, and a key is needed.
          // TODO: We could probably have the developer specify a key themselves, but this works to fix toasts
          key: `vd-toast-${uuid4()}`,
          content,
          source: asset,
          icon: asset
        });
      };
    }
  });

  // src/lib/settings.ts
  var settings_default, loaderConfig;
  var init_settings = __esm({
    "src/lib/settings.ts"() {
      "use strict";
      init_storage();
      settings_default = wrapSync(createStorage(createMMKVBackend("VENDETTA_SETTINGS")));
      loaderConfig = wrapSync(createStorage(createFileBackend("vendetta_loader.json")));
    }
  });

  // src/lib/debug.ts
  var debug_exports = {};
  __export(debug_exports, {
    connectToDebugger: () => connectToDebugger,
    connectToRDT: () => connectToRDT,
    getDebugInfo: () => getDebugInfo,
    patchLogHook: () => patchLogHook,
    setSafeMode: () => setSafeMode,
    socket: () => socket,
    versionHash: () => versionHash
  });
  function setSafeMode(state) {
    settings_default.safeMode = {
      ...settings_default.safeMode,
      enabled: state
    };
    if (window.__vendetta_loader?.features.themes) {
      if (getCurrentTheme()?.id)
        settings_default.safeMode.currentThemeId = getCurrentTheme().id;
      if (settings_default.safeMode?.enabled) {
        selectTheme("default");
      } else if (settings_default.safeMode?.currentThemeId) {
        selectTheme(settings_default.safeMode?.currentThemeId);
      }
    }
  }
  function connectToDebugger(url2) {
    if (socket !== void 0 && socket.readyState !== WebSocket.CLOSED)
      socket.close();
    if (!url2) {
      showToast("Invalid debugger URL!", getAssetIDByName("Small"));
      return;
    }
    socket = new WebSocket(`ws://${url2}`);
    socket.addEventListener("open", function() {
      return showToast("Connected to debugger.", getAssetIDByName("Check"));
    });
    socket.addEventListener("message", function(message) {
      try {
        (0, eval)(message.data);
      } catch (e) {
        console.error(e);
      }
    });
    socket.addEventListener("error", function(err) {
      console.log(`Debugger error: ${err.message}`);
      showToast("An error occurred with the debugger connection!", getAssetIDByName("Small"));
    });
  }
  function patchLogHook() {
    const unpatch2 = after("nativeLoggingHook", globalThis, function(args) {
      if (socket?.readyState === WebSocket.OPEN)
        socket.send(JSON.stringify({
          message: args[0],
          level: args[1]
        }));
      logger_default.log(args[0]);
    });
    return function() {
      socket && socket.close();
      unpatch2();
    };
  }
  function getDebugInfo() {
    const hermesProps = window.HermesInternal.getRuntimeProperties();
    const hermesVer = hermesProps["OSS Release Version"];
    const padding = "for RN ";
    const PlatformConstants = ReactNative.Platform.constants;
    const rnVer = PlatformConstants.reactNativeVersion;
    return {
      vendetta: {
        version: versionHash,
        loader: window.__vendetta_loader?.name.replaceAll("Vendetta", "Bound") ?? "Unknown"
      },
      discord: {
        version: ClientInfoManager.Version,
        build: ClientInfoManager.Build
      },
      react: {
        version: React.version,
        nativeVersion: hermesVer.startsWith(padding) ? hermesVer.substring(padding.length) : `${rnVer.major}.${rnVer.minor}.${rnVer.patch}`
      },
      hermes: {
        version: hermesVer,
        buildType: hermesProps["Build"],
        bytecodeVersion: hermesProps["Bytecode Version"]
      },
      ...ReactNative.Platform.select({
        android: {
          os: {
            name: "Android",
            version: PlatformConstants.Release,
            sdk: PlatformConstants.Version
          }
        },
        ios: {
          os: {
            name: PlatformConstants.systemName,
            version: PlatformConstants.osVersion
          }
        }
      }),
      ...ReactNative.Platform.select({
        android: {
          device: {
            manufacturer: PlatformConstants.Manufacturer,
            brand: PlatformConstants.Brand,
            model: PlatformConstants.Model,
            codename: DeviceManager.device
          }
        },
        ios: {
          device: {
            manufacturer: DeviceManager.deviceManufacturer,
            brand: DeviceManager.deviceBrand,
            model: DeviceManager.deviceModel,
            codename: DeviceManager.device
          }
        }
      })
    };
  }
  var socket, connectToRDT, versionHash;
  var init_debug = __esm({
    "src/lib/debug.ts"() {
      "use strict";
      init_common();
      init_patcher();
      init_themes();
      init_native();
      init_assets();
      init_toasts();
      init_settings();
      init_logger();
      connectToRDT = function() {
        return window.__vendetta_rdc?.connectToDevTools({
          host: settings_default.debuggerUrl.split(":")?.[0],
          resolveRNStyle: ReactNative.StyleSheet.flatten
        });
      };
      versionHash = "5b98f75";
    }
  });

  // src/def.d.ts
  var ButtonColors, ApplicationCommandInputType, ApplicationCommandOptionType, ApplicationCommandType;
  var init_def_d = __esm({
    "src/def.d.ts"() {
      (function(ButtonColors2) {
        ButtonColors2["BRAND"] = "brand";
        ButtonColors2["RED"] = "red";
        ButtonColors2["GREEN"] = "green";
        ButtonColors2["PRIMARY"] = "primary";
        ButtonColors2["TRANSPARENT"] = "transparent";
        ButtonColors2["GREY"] = "grey";
        ButtonColors2["LIGHTGREY"] = "lightgrey";
        ButtonColors2["WHITE"] = "white";
        ButtonColors2["LINK"] = "link";
      })(ButtonColors || (ButtonColors = {}));
      (function(ApplicationCommandInputType2) {
        ApplicationCommandInputType2[ApplicationCommandInputType2["BUILT_IN"] = 0] = "BUILT_IN";
        ApplicationCommandInputType2[ApplicationCommandInputType2["BUILT_IN_TEXT"] = 1] = "BUILT_IN_TEXT";
        ApplicationCommandInputType2[ApplicationCommandInputType2["BUILT_IN_INTEGRATION"] = 2] = "BUILT_IN_INTEGRATION";
        ApplicationCommandInputType2[ApplicationCommandInputType2["BOT"] = 3] = "BOT";
        ApplicationCommandInputType2[ApplicationCommandInputType2["PLACEHOLDER"] = 4] = "PLACEHOLDER";
      })(ApplicationCommandInputType || (ApplicationCommandInputType = {}));
      (function(ApplicationCommandOptionType2) {
        ApplicationCommandOptionType2[ApplicationCommandOptionType2["SUB_COMMAND"] = 1] = "SUB_COMMAND";
        ApplicationCommandOptionType2[ApplicationCommandOptionType2["SUB_COMMAND_GROUP"] = 2] = "SUB_COMMAND_GROUP";
        ApplicationCommandOptionType2[ApplicationCommandOptionType2["STRING"] = 3] = "STRING";
        ApplicationCommandOptionType2[ApplicationCommandOptionType2["INTEGER"] = 4] = "INTEGER";
        ApplicationCommandOptionType2[ApplicationCommandOptionType2["BOOLEAN"] = 5] = "BOOLEAN";
        ApplicationCommandOptionType2[ApplicationCommandOptionType2["USER"] = 6] = "USER";
        ApplicationCommandOptionType2[ApplicationCommandOptionType2["CHANNEL"] = 7] = "CHANNEL";
        ApplicationCommandOptionType2[ApplicationCommandOptionType2["ROLE"] = 8] = "ROLE";
        ApplicationCommandOptionType2[ApplicationCommandOptionType2["MENTIONABLE"] = 9] = "MENTIONABLE";
        ApplicationCommandOptionType2[ApplicationCommandOptionType2["NUMBER"] = 10] = "NUMBER";
        ApplicationCommandOptionType2[ApplicationCommandOptionType2["ATTACHMENT"] = 11] = "ATTACHMENT";
      })(ApplicationCommandOptionType || (ApplicationCommandOptionType = {}));
      (function(ApplicationCommandType2) {
        ApplicationCommandType2[ApplicationCommandType2["CHAT"] = 1] = "CHAT";
        ApplicationCommandType2[ApplicationCommandType2["USER"] = 2] = "USER";
        ApplicationCommandType2[ApplicationCommandType2["MESSAGE"] = 3] = "MESSAGE";
      })(ApplicationCommandType || (ApplicationCommandType = {}));
    }
  });

  // src/lib/commands.ts
  var commands_exports = {};
  __export(commands_exports, {
    patchCommands: () => patchCommands,
    registerCommand: () => registerCommand
  });
  function patchCommands() {
    const unpatch2 = after("getBuiltInCommands", commands, function(param, res) {
      let [type] = param;
      if (type === ApplicationCommandType.CHAT)
        return res.concat(commands2);
    });
    return function() {
      commands2 = [];
      unpatch2();
    };
  }
  function registerCommand(command) {
    const builtInCommands = commands.getBuiltInCommands(ApplicationCommandType.CHAT, true, false);
    builtInCommands.sort(function(a, b) {
      return parseInt(b.id) - parseInt(a.id);
    });
    const lastCommand = builtInCommands[builtInCommands.length - 1];
    command.id = (parseInt(lastCommand.id, 10) - 1).toString();
    commands2.push(command);
    return function() {
      return commands2 = commands2.filter(function(param) {
        let { id } = param;
        return id !== command.id;
      });
    };
  }
  var commands2;
  var init_commands = __esm({
    "src/lib/commands.ts"() {
      "use strict";
      init_def_d();
      init_common();
      init_patcher();
      commands2 = [];
    }
  });

  // src/lib/polyfills.ts
  var allSettledFulfill, allSettledReject, mapAllSettled, allSettled;
  var init_polyfills = __esm({
    "src/lib/polyfills.ts"() {
      "use strict";
      allSettledFulfill = function(value) {
        return {
          status: "fulfilled",
          value
        };
      };
      allSettledReject = function(reason) {
        return {
          status: "rejected",
          reason
        };
      };
      mapAllSettled = function(item) {
        return Promise.resolve(item).then(allSettledFulfill, allSettledReject);
      };
      allSettled = function(iterator) {
        return Promise.all(Array.from(iterator).map(mapAllSettled));
      };
    }
  });

  // src/lib/plugins.ts
  var plugins_exports = {};
  __export(plugins_exports, {
    evalPlugin: () => evalPlugin,
    fetchPlugin: () => fetchPlugin,
    getSettings: () => getSettings,
    initPlugins: () => initPlugins,
    installPlugin: () => installPlugin,
    plugins: () => plugins,
    removePlugin: () => removePlugin,
    startPlugin: () => startPlugin,
    stopPlugin: () => stopPlugin
  });
  async function fetchPlugin(id) {
    if (!id.endsWith("/"))
      id += "/";
    const existingPlugin = plugins[id];
    let pluginManifest;
    try {
      pluginManifest = await (await safeFetch(id + "manifest.json", {
        cache: "no-store"
      })).json();
    } catch {
      throw new Error(`Failed to fetch manifest for ${id}`);
    }
    let pluginJs;
    if (existingPlugin?.manifest.hash !== pluginManifest.hash) {
      try {
        pluginJs = await (await safeFetch(id + (pluginManifest.main || "index.js"), {
          cache: "no-store"
        })).text();
      } catch {
      }
    }
    if (!pluginJs && !existingPlugin)
      throw new Error(`Failed to fetch JS for ${id}`);
    plugins[id] = {
      id,
      manifest: pluginManifest,
      enabled: existingPlugin?.enabled ?? false,
      update: existingPlugin?.update ?? true,
      js: pluginJs ?? existingPlugin.js
    };
  }
  async function installPlugin(id) {
    let enabled = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    if (!id.endsWith("/"))
      id += "/";
    if (typeof id !== "string" || id in plugins)
      throw new Error("Plugin already installed");
    await fetchPlugin(id);
    if (enabled)
      await startPlugin(id);
  }
  async function evalPlugin(plugin) {
    const vendettaForPlugins = {
      ...window.vendetta,
      plugin: {
        id: plugin.id,
        manifest: plugin.manifest,
        // Wrapping this with wrapSync is NOT an option.
        storage: await createStorage(createMMKVBackend(plugin.id))
      },
      logger: new logModule(`Vendetta \xBB ${plugin.manifest.name}`)
    };
    const pluginString = `vendetta=>{return ${plugin.js}}
//# sourceURL=${plugin.id}`;
    const raw = (0, eval)(pluginString)(vendettaForPlugins);
    const ret = typeof raw == "function" ? raw() : raw;
    return ret?.default ?? ret ?? {};
  }
  async function startPlugin(id) {
    if (!id.endsWith("/"))
      id += "/";
    const plugin = plugins[id];
    if (!plugin)
      throw new Error("Attempted to start non-existent plugin");
    try {
      if (!settings_default.safeMode?.enabled) {
        const pluginRet = await evalPlugin(plugin);
        loadedPlugins[id] = pluginRet;
        pluginRet.onLoad?.();
      }
      plugin.enabled = true;
    } catch (e) {
      logger_default.error(`Plugin ${plugin.id} errored whilst loading, and will be unloaded`, e);
      try {
        loadedPlugins[plugin.id]?.onUnload?.();
      } catch (e2) {
        logger_default.error(`Plugin ${plugin.id} errored whilst unloading`, e2);
      }
      delete loadedPlugins[id];
      plugin.enabled = false;
    }
  }
  function stopPlugin(id) {
    let disable = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    if (!id.endsWith("/"))
      id += "/";
    const plugin = plugins[id];
    const pluginRet = loadedPlugins[id];
    if (!plugin)
      throw new Error("Attempted to stop non-existent plugin");
    if (!settings_default.safeMode?.enabled) {
      try {
        pluginRet?.onUnload?.();
      } catch (e) {
        logger_default.error(`Plugin ${plugin.id} errored whilst unloading`, e);
      }
      delete loadedPlugins[id];
    }
    disable && (plugin.enabled = false);
  }
  async function removePlugin(id) {
    if (!id.endsWith("/"))
      id += "/";
    const plugin = plugins[id];
    if (plugin.enabled)
      stopPlugin(id);
    delete plugins[id];
    await purgeStorage(id);
  }
  async function initPlugins() {
    await awaitSyncWrapper(settings_default);
    await awaitSyncWrapper(plugins);
    const allIds = Object.keys(plugins);
    if (!settings_default.safeMode?.enabled) {
      await allSettled(allIds.filter(function(pl) {
        return plugins[pl].enabled;
      }).map(async function(pl) {
        return plugins[pl].update && await fetchPlugin(pl).catch(function(e) {
          return logger_default.error(e.message);
        }), await startPlugin(pl);
      }));
      allIds.filter(function(pl) {
        return !plugins[pl].enabled && plugins[pl].update;
      }).forEach(function(pl) {
        return fetchPlugin(pl);
      });
    }
    return stopAllPlugins;
  }
  var plugins, loadedPlugins, stopAllPlugins, getSettings;
  var init_plugins = __esm({
    "src/lib/plugins.ts"() {
      "use strict";
      init_utils();
      init_storage();
      init_polyfills();
      init_logger();
      init_settings();
      plugins = wrapSync(createStorage(createMMKVBackend("VENDETTA_PLUGINS")));
      loadedPlugins = {};
      stopAllPlugins = function() {
        return Object.keys(loadedPlugins).forEach(function(p) {
          return stopPlugin(p, false);
        });
      };
      getSettings = function(id) {
        return loadedPlugins[id]?.settings;
      };
    }
  });

  // src/lib/constants.ts
  var constants_exports = {};
  __export(constants_exports, {
    DISCORD_SERVER: () => DISCORD_SERVER,
    DISCORD_SERVER_ID: () => DISCORD_SERVER_ID,
    GITHUB: () => GITHUB,
    HTTP_REGEX: () => HTTP_REGEX,
    HTTP_REGEX_MULTI: () => HTTP_REGEX_MULTI,
    PLUGINS_CHANNEL_ID: () => PLUGINS_CHANNEL_ID,
    PROXY_PREFIX: () => PROXY_PREFIX,
    THEMES_CHANNEL_ID: () => THEMES_CHANNEL_ID
  });
  var DISCORD_SERVER, DISCORD_SERVER_ID, PLUGINS_CHANNEL_ID, THEMES_CHANNEL_ID, GITHUB, PROXY_PREFIX, HTTP_REGEX, HTTP_REGEX_MULTI;
  var init_constants = __esm({
    "src/lib/constants.ts"() {
      "use strict";
      DISCORD_SERVER = "https://discord.gg/n9QQ4XhhJP";
      DISCORD_SERVER_ID = "1015931589865246730";
      PLUGINS_CHANNEL_ID = "1091880384561684561";
      THEMES_CHANNEL_ID = "1091880434939482202";
      GITHUB = "https://github.com/5xdf/Vendetta-Continued";
      PROXY_PREFIX = "https://vd-plugins.github.io/proxy";
      HTTP_REGEX = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
      HTTP_REGEX_MULTI = /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    }
  });

  // src/ui/components/Summary.tsx
  function Summary(param) {
    let { label, icon, noPadding = false, noAnimation = false, children } = param;
    const { FormRow: FormRow5, FormDivider: FormDivider3 } = Forms;
    const [hidden, setHidden] = React.useState(true);
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FormRow5, {
      label,
      leading: icon && /* @__PURE__ */ React.createElement(FormRow5.Icon, {
        source: getAssetIDByName(icon)
      }),
      trailing: /* @__PURE__ */ React.createElement(FormRow5.Arrow, {
        style: {
          transform: [
            {
              rotate: `${hidden ? 180 : 90}deg`
            }
          ]
        }
      }),
      onPress: function() {
        setHidden(!hidden);
        if (!noAnimation)
          ReactNative.LayoutAnimation.configureNext(ReactNative.LayoutAnimation.Presets.easeInEaseOut);
      }
    }), !hidden && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FormDivider3, null), /* @__PURE__ */ React.createElement(ReactNative.View, {
      style: !noPadding && {
        paddingHorizontal: 15
      }
    }, children)));
  }
  var init_Summary = __esm({
    "src/ui/components/Summary.tsx"() {
      "use strict";
      init_common();
      init_assets();
      init_components();
    }
  });

  // node_modules/@swc/helpers/esm/_assert_this_initialized.js
  function _assert_this_initialized(self) {
    if (self === void 0)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return self;
  }
  var init_assert_this_initialized = __esm({
    "node_modules/@swc/helpers/esm/_assert_this_initialized.js"() {
    }
  });

  // node_modules/@swc/helpers/esm/_class_call_check.js
  function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor))
      throw new TypeError("Cannot call a class as a function");
  }
  var init_class_call_check = __esm({
    "node_modules/@swc/helpers/esm/_class_call_check.js"() {
    }
  });

  // node_modules/@swc/helpers/esm/_create_class.js
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties(Constructor, staticProps);
    return Constructor;
  }
  var init_create_class = __esm({
    "node_modules/@swc/helpers/esm/_create_class.js"() {
    }
  });

  // node_modules/@swc/helpers/esm/_define_property.js
  function _define_property(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else
      obj[key] = value;
    return obj;
  }
  var init_define_property = __esm({
    "node_modules/@swc/helpers/esm/_define_property.js"() {
    }
  });

  // node_modules/@swc/helpers/esm/_set_prototype_of.js
  function _set_prototype_of(o, p) {
    _set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o2, p2) {
      o2.__proto__ = p2;
      return o2;
    };
    return _set_prototype_of(o, p);
  }
  var init_set_prototype_of = __esm({
    "node_modules/@swc/helpers/esm/_set_prototype_of.js"() {
    }
  });

  // node_modules/@swc/helpers/esm/_inherits.js
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass)
      _set_prototype_of(subClass, superClass);
  }
  var init_inherits = __esm({
    "node_modules/@swc/helpers/esm/_inherits.js"() {
      init_set_prototype_of();
    }
  });

  // node_modules/@swc/helpers/esm/_get_prototype_of.js
  function _get_prototype_of(o) {
    _get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o2) {
      return o2.__proto__ || Object.getPrototypeOf(o2);
    };
    return _get_prototype_of(o);
  }
  var init_get_prototype_of = __esm({
    "node_modules/@swc/helpers/esm/_get_prototype_of.js"() {
    }
  });

  // node_modules/@swc/helpers/esm/_is_native_reflect_construct.js
  function _is_native_reflect_construct() {
    if (typeof Reflect === "undefined" || !Reflect.construct)
      return false;
    if (Reflect.construct.sham)
      return false;
    if (typeof Proxy === "function")
      return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      }));
      return true;
    } catch (e) {
      return false;
    }
  }
  var init_is_native_reflect_construct = __esm({
    "node_modules/@swc/helpers/esm/_is_native_reflect_construct.js"() {
    }
  });

  // node_modules/@swc/helpers/esm/_type_of.js
  function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
  }
  var init_type_of = __esm({
    "node_modules/@swc/helpers/esm/_type_of.js"() {
    }
  });

  // node_modules/@swc/helpers/esm/_possible_constructor_return.js
  function _possible_constructor_return(self, call) {
    if (call && (_type_of(call) === "object" || typeof call === "function"))
      return call;
    return _assert_this_initialized(self);
  }
  var init_possible_constructor_return = __esm({
    "node_modules/@swc/helpers/esm/_possible_constructor_return.js"() {
      init_assert_this_initialized();
      init_type_of();
    }
  });

  // node_modules/@swc/helpers/esm/_create_super.js
  function _create_super(Derived) {
    var hasNativeReflectConstruct = _is_native_reflect_construct();
    return function _createSuperInternal() {
      var Super = _get_prototype_of(Derived), result;
      if (hasNativeReflectConstruct) {
        var NewTarget = _get_prototype_of(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possible_constructor_return(this, result);
    };
  }
  var init_create_super = __esm({
    "node_modules/@swc/helpers/esm/_create_super.js"() {
      init_get_prototype_of();
      init_is_native_reflect_construct();
      init_possible_constructor_return();
    }
  });

  // src/ui/components/ErrorBoundary.tsx
  var _React_PureComponent, ErrorBoundary;
  var init_ErrorBoundary = __esm({
    "src/ui/components/ErrorBoundary.tsx"() {
      "use strict";
      init_assert_this_initialized();
      init_class_call_check();
      init_create_class();
      init_define_property();
      init_inherits();
      init_create_super();
      init_common();
      init_components();
      ErrorBoundary = /* @__PURE__ */ function(_superClass) {
        "use strict";
        _inherits(ErrorBoundary3, _superClass);
        var _super = _create_super(ErrorBoundary3);
        function ErrorBoundary3() {
          _class_call_check(this, ErrorBoundary3);
          var _this;
          _this = _super.apply(this, arguments);
          _define_property(_assert_this_initialized(_this), "state", {
            hasErr: false
          });
          return _this;
        }
        _create_class(ErrorBoundary3, [
          {
            key: "render",
            value: function render() {
              var _this = this;
              if (!this.state.hasErr)
                return this.props.children;
              return /* @__PURE__ */ React2.createElement(Tabs.Card, {
                style: {
                  margin: 16
                }
              }, /* @__PURE__ */ React2.createElement(Tabs.Stack, null, /* @__PURE__ */ React2.createElement(Forms.FormText, {
                style: TextStyleSheet["heading-lg/bold"]
              }, "Uh oh."), /* @__PURE__ */ React2.createElement(Forms.FormText, {
                style: {
                  ...TextStyleSheet["text-xs/normal"],
                  fontFamily: constants.Fonts.CODE_SEMIBOLD,
                  marginBottom: 8
                }
              }, this.state.errText), /* @__PURE__ */ React2.createElement(Tabs.Button, {
                variant: "destructive",
                text: "Retry Render",
                onPress: function() {
                  return _this.setState({
                    hasErr: false,
                    errText: void 0
                  });
                }
              })));
            }
          }
        ]);
        return ErrorBoundary3;
      }(_React_PureComponent = React2.PureComponent);
      _define_property(ErrorBoundary, "getDerivedStateFromError", function(error) {
        return {
          hasErr: true,
          errText: error.message
        };
      });
    }
  });

  // src/ui/color.ts
  var color_exports = {};
  __export(color_exports, {
    rawColors: () => rawColors,
    semanticColors: () => semanticColors
  });
  var semanticColors, rawColors;
  var init_color = __esm({
    "src/ui/color.ts"() {
      "use strict";
      init_common();
      init_themes();
      semanticColors = color?.default?.colors ?? constants?.ThemeColorMap;
      rawColors = color?.default?.unsafe_rawColors ?? constants?.Colors;
    }
  });

  // src/ui/shared.ts
  var cardStyle;
  var init_shared2 = __esm({
    "src/ui/shared.ts"() {
      "use strict";
      init_color();
      cardStyle = {
        backgroundColor: semanticColors.BACKGROUND_SECONDARY,
        borderRadius: 16,
        paddingVertical: 8,
        paddingHorizontal: 16
      };
    }
  });

  // src/ui/components/Codeblock.tsx
  function Codeblock(param) {
    let { selectable, style, children } = param;
    if (!selectable)
      return /* @__PURE__ */ React.createElement(TextBasedCodeblock, {
        style,
        children
      });
    return ReactNative.Platform.select({
      ios: /* @__PURE__ */ React.createElement(InputBasedCodeblock, {
        style,
        children
      }),
      default: /* @__PURE__ */ React.createElement(TextBasedCodeblock, {
        style,
        children,
        selectable: true
      })
    });
  }
  var styles, InputBasedCodeblock, TextBasedCodeblock;
  var init_Codeblock = __esm({
    "src/ui/components/Codeblock.tsx"() {
      "use strict";
      init_common();
      init_color();
      init_shared2();
      styles = stylesheet.createThemedStyleSheet({
        codeBlock: {
          ...cardStyle,
          color: semanticColors.TEXT_NORMAL,
          fontFamily: constants.Fonts.CODE_SEMIBOLD,
          fontSize: 12,
          textAlignVertical: "center",
          paddingHorizontal: 12
        }
      });
      InputBasedCodeblock = function(param) {
        let { style, children } = param;
        return /* @__PURE__ */ React.createElement(ReactNative.TextInput, {
          editable: false,
          multiline: true,
          style: [
            styles.codeBlock,
            style && style
          ],
          value: children
        });
      };
      TextBasedCodeblock = function(param) {
        let { selectable, style, children } = param;
        return /* @__PURE__ */ React.createElement(ReactNative.Text, {
          selectable,
          style: [
            styles.codeBlock,
            style && style
          ]
        }, children);
      };
    }
  });

  // src/ui/components/Search.tsx
  function Search_default(param) {
    let { onChangeText, placeholder, style } = param;
    const [query, setQuery] = React.useState("");
    const onChange = function(value) {
      setQuery(value);
      onChangeText?.(value);
    };
    return /* @__PURE__ */ React.createElement(ReactNative.View, {
      style
    }, /* @__PURE__ */ React.createElement(Tabs.TextInput, {
      grow: true,
      isClearable: true,
      leadingIcon: SearchIcon,
      placeholder: placeholder ?? "Search",
      onChange,
      returnKeyType: "search",
      size: "md",
      autoCapitalize: "none",
      autoCorrect: false,
      value: query
    }));
  }
  var SearchIcon;
  var init_Search = __esm({
    "src/ui/components/Search.tsx"() {
      "use strict";
      init_common();
      init_assets();
      init_components();
      SearchIcon = function() {
        return /* @__PURE__ */ React.createElement(ReactNative.Image, {
          style: {
            transform: [
              {
                scale: 0.8
              }
            ]
          },
          source: getAssetIDByName("search")
        });
      };
    }
  });

  // src/ui/components/TabulatedScreen.tsx
  function TabulatedScreen_default(param) {
    let { tabs: tabs2 } = param;
    const [activeTab, setActiveTab] = React2.useState(tabs2[0]);
    return /* @__PURE__ */ React2.createElement(ReactNative.View, {
      style: {
        flex: 1
      }
    }, activeTab.render && /* @__PURE__ */ React2.createElement(activeTab.render, null), /* @__PURE__ */ React2.createElement(ReactNative.View, {
      style: {
        marginTop: "auto",
        padding: 16
      }
    }, /* @__PURE__ */ React2.createElement(BadgableTabBar, {
      tabs: tabs2,
      activeTab: activeTab.id,
      onTabSelected: function(id) {
        const tab = tabs2.find(function(t) {
          return t.id === id;
        });
        if (!tab)
          return;
        tab.onPress?.(tab.id);
        tab.render && setActiveTab(tab);
      }
    })));
  }
  var BadgableTabBar;
  var init_TabulatedScreen = __esm({
    "src/ui/components/TabulatedScreen.tsx"() {
      "use strict";
      init_common();
      init_filters();
      ({ BadgableTabBar } = findByProps("BadgableTabBar"));
    }
  });

  // src/ui/components/index.ts
  var components_exports = {};
  __export(components_exports, {
    Alert: () => Alert,
    Button: () => Button,
    Codeblock: () => Codeblock,
    ErrorBoundary: () => ErrorBoundary,
    Forms: () => Forms,
    General: () => General,
    HelpMessage: () => HelpMessage,
    SafeAreaView: () => SafeAreaView,
    Search: () => Search_default,
    Summary: () => Summary,
    Tabs: () => Tabs,
    TabulatedScreen: () => TabulatedScreen_default
  });
  var findSingular, Forms, Tabs, General, Alert, Button, HelpMessage, SafeAreaView;
  var init_components = __esm({
    "src/ui/components/index.ts"() {
      "use strict";
      init_filters();
      init_Summary();
      init_ErrorBoundary();
      init_Codeblock();
      init_Search();
      init_TabulatedScreen();
      findSingular = function(prop) {
        return find(function(m) {
          return m[prop] && Object.keys(m).length === 1;
        })?.[prop];
      };
      Forms = findByProps("Form", "FormSection");
      Tabs = {
        ...findByProps("TableRow", "TableRowGroup"),
        RedesignSwitch: findSingular("FormSwitch"),
        RedesignCheckbox: findSingular("FormCheckbox")
      };
      General = findByProps("Button", "Text", "View");
      Alert = findByDisplayName("FluxContainer(Alert)");
      Button = findByProps("Looks", "Colors", "Sizes");
      HelpMessage = findByName("HelpMessage");
      SafeAreaView = findByProps("useSafeAreaInsets").SafeAreaView;
    }
  });

  // src/ui/quickInstall/forumPost.tsx
  function forumPost_default() {
    return after("default", ForumPostLongPressActionSheet, function(param, res) {
      let [{ thread }] = param;
      if (thread.guild_id !== DISCORD_SERVER_ID)
        return;
      let postType;
      if (thread.parent_id === PLUGINS_CHANNEL_ID) {
        postType = "Plugin";
      } else if (thread.parent_id === THEMES_CHANNEL_ID && window.__vendetta_loader?.features.themes) {
        postType = "Theme";
      } else
        return;
      const { firstMessage } = useFirstForumPostMessage(thread);
      let urls = firstMessage?.content?.match(HTTP_REGEX_MULTI);
      if (!urls)
        return;
      if (postType === "Plugin") {
        urls = urls.filter(function(url3) {
          return url3.startsWith(PROXY_PREFIX);
        });
      } else {
        urls = urls.filter(function(url3) {
          return url3.endsWith(".json");
        });
      }
      const url2 = urls[0];
      if (!url2)
        return;
      const actions = findInReactTree_default(res, function(t) {
        return t?.[0]?.key;
      });
      const ActionsSection = actions[0].type;
      actions.unshift(/* @__PURE__ */ React.createElement(ActionsSection, {
        key: "install"
      }, /* @__PURE__ */ React.createElement(FormRow, {
        leading: /* @__PURE__ */ React.createElement(FormIcon, {
          style: {
            opacity: 1
          },
          source: getAssetIDByName("ic_download_24px")
        }),
        label: `Install ${postType}`,
        onPress: function() {
          return (postType === "Plugin" ? installPlugin : installTheme)(url2).then(function() {
            showToast(`Successfully installed ${thread.name}`, getAssetIDByName("Check"));
          }).catch(function(e) {
            showToast(e.message, getAssetIDByName("Small"));
          }).finally(function() {
            return hideActionSheet();
          });
        }
      })));
    });
  }
  var ForumPostLongPressActionSheet, FormRow, FormIcon, useFirstForumPostMessage, hideActionSheet;
  var init_forumPost = __esm({
    "src/ui/quickInstall/forumPost.tsx"() {
      "use strict";
      init_filters();
      init_constants();
      init_patcher();
      init_plugins();
      init_themes();
      init_utils();
      init_assets();
      init_toasts();
      init_components();
      ForumPostLongPressActionSheet = findByName("ForumPostLongPressActionSheet", false);
      ({ FormRow, FormIcon } = Forms);
      ({ useFirstForumPostMessage } = findByProps("useFirstForumPostMessage"));
      ({ hideActionSheet } = findByProps("openLazy", "hideActionSheet"));
    }
  });

  // src/ui/components/InputAlert.tsx
  function InputAlert(param) {
    let { title, confirmText, confirmColor, onConfirm, cancelText, placeholder, initialValue = "", secureTextEntry } = param;
    const [value, setValue] = React.useState(initialValue);
    const [error, setError] = React.useState("");
    function onConfirmWrapper() {
      const asyncOnConfirm = Promise.resolve(onConfirm(value));
      asyncOnConfirm.then(function() {
        Alerts.close();
      }).catch(function(e) {
        setError(e.message);
      });
    }
    return /* @__PURE__ */ React.createElement(Alert, {
      title,
      confirmText,
      confirmColor,
      isConfirmButtonDisabled: error.length !== 0,
      onConfirm: onConfirmWrapper,
      cancelText,
      onCancel: function() {
        return Alerts.close();
      }
    }, /* @__PURE__ */ React.createElement(FormInput, {
      placeholder,
      value,
      onChange: function(v) {
        setValue(typeof v === "string" ? v : v.text);
        if (error)
          setError("");
      },
      returnKeyType: "done",
      onSubmitEditing: onConfirmWrapper,
      error: error || void 0,
      secureTextEntry,
      autoFocus: true,
      showBorder: true,
      style: {
        paddingVertical: 5,
        alignSelf: "stretch",
        paddingHorizontal: 0
      }
    }));
  }
  var FormInput, Alerts;
  var init_InputAlert = __esm({
    "src/ui/components/InputAlert.tsx"() {
      "use strict";
      init_filters();
      init_components();
      ({ FormInput } = Forms);
      Alerts = findByProps("openLazy", "close");
    }
  });

  // src/ui/alerts.ts
  var alerts_exports = {};
  __export(alerts_exports, {
    showConfirmationAlert: () => showConfirmationAlert,
    showCustomAlert: () => showCustomAlert,
    showInputAlert: () => showInputAlert
  });
  function showConfirmationAlert(options) {
    const internalOptions = options;
    internalOptions.body = options.content;
    delete internalOptions.content;
    internalOptions.isDismissable ??= true;
    return Alerts2.show(internalOptions);
  }
  var Alerts2, showCustomAlert, showInputAlert;
  var init_alerts = __esm({
    "src/ui/alerts.ts"() {
      "use strict";
      init_filters();
      init_InputAlert();
      Alerts2 = findByProps("openLazy", "close");
      showCustomAlert = function(component, props) {
        return Alerts2.openLazy({
          importer: async function() {
            return function() {
              return React.createElement(component, props);
            };
          }
        });
      };
      showInputAlert = function(options) {
        return showCustomAlert(InputAlert, options);
      };
    }
  });

  // src/ui/quickInstall/url.tsx
  function typeFromUrl(url2) {
    if (url2.startsWith(PROXY_PREFIX)) {
      return "Plugin";
    } else if (url2.endsWith(".json") && window.__vendetta_loader?.features.themes) {
      return "Theme";
    } else
      return;
  }
  function installWithToast(type, url2) {
    (type === "Plugin" ? installPlugin : installTheme)(url2).then(function() {
      showToast("Successfully installed", getAssetIDByName("Check"));
    }).catch(function(e) {
      showToast(e.message, getAssetIDByName("Small"));
    });
  }
  function url_default() {
    const patches = new Array();
    patches.push(after("showSimpleActionSheet", showSimpleActionSheet, function(args) {
      if (args[0].key !== "LongPressUrl")
        return;
      const { header: { title: url2 }, options } = args[0];
      const urlType = typeFromUrl(url2);
      if (!urlType)
        return;
      options.push({
        label: `Install ${urlType}`,
        onPress: function() {
          return installWithToast(urlType, url2);
        }
      });
    }));
    patches.push(instead("handleClick", handleClick, async function(args, orig) {
      const { href: url2 } = args[0];
      const urlType = typeFromUrl(url2);
      if (!urlType)
        return orig.apply(this, args);
      if (urlType === "Theme" && getChannel(getChannelId())?.parent_id !== THEMES_CHANNEL_ID)
        return orig.apply(this, args);
      showConfirmationAlert({
        title: "Hold Up",
        content: [
          "This link is a ",
          /* @__PURE__ */ React.createElement(ReactNative.Text, {
            style: TextStyleSheet2["text-md/semibold"]
          }, urlType),
          ", would you like to install it?"
        ],
        onConfirm: function() {
          return installWithToast(urlType, url2);
        },
        confirmText: "Install",
        cancelText: "Cancel",
        secondaryConfirmText: "Open in Browser",
        onConfirmSecondary: function() {
          return openURL(url2);
        }
      });
    }));
    return function() {
      return patches.forEach(function(p) {
        return p();
      });
    };
  }
  var showSimpleActionSheet, handleClick, openURL, getChannelId, getChannel, TextStyleSheet2;
  var init_url = __esm({
    "src/ui/quickInstall/url.tsx"() {
      "use strict";
      init_filters();
      init_common();
      init_constants();
      init_patcher();
      init_plugins();
      init_themes();
      init_alerts();
      init_assets();
      init_toasts();
      showSimpleActionSheet = find(function(m) {
        return m?.showSimpleActionSheet && !Object.getOwnPropertyDescriptor(m, "showSimpleActionSheet")?.get;
      });
      handleClick = findByProps("handleClick");
      ({ openURL } = url);
      ({ getChannelId } = channels);
      ({ getChannel } = findByProps("getChannel"));
      ({ TextStyleSheet: TextStyleSheet2 } = findByProps("TextStyleSheet"));
    }
  });

  // src/ui/quickInstall/index.ts
  function initQuickInstall() {
    const patches = new Array();
    patches.push(forumPost_default());
    patches.push(url_default());
    return function() {
      return patches.forEach(function(p) {
        return p();
      });
    };
  }
  var init_quickInstall = __esm({
    "src/ui/quickInstall/index.ts"() {
      "use strict";
      init_forumPost();
      init_url();
    }
  });

  // src/ui/safeMode.tsx
  function safeMode_default() {
    return after("render", ErrorBoundary2.prototype, function(_, ret) {
      var _this = this;
      if (!(settings_default.errorBoundaryEnabled ?? true))
        return;
      if (!this.state.error)
        return;
      this.state.activeTab ??= "stack";
      const tabData = tabs.find(function(t) {
        return t.id === _this.state.activeTab;
      });
      const errorText = this.state.error[this.state.activeTab];
      const buttons = [
        {
          text: "Restart Discord",
          onPress: this.handleReload
        },
        ...!settings_default.safeMode?.enabled ? [
          {
            text: "Restart in Recovery Mode",
            onPress: setSafeMode
          }
        ] : [],
        {
          variant: "destructive",
          text: "Retry Render",
          onPress: function() {
            return _this.setState({
              info: null,
              error: null
            });
          }
        }
      ];
      return /* @__PURE__ */ React.createElement(ErrorBoundary, null, /* @__PURE__ */ React.createElement(SafeAreaView, {
        style: styles2.container
      }, /* @__PURE__ */ React.createElement(ReactNative.View, {
        style: styles2.header
      }, /* @__PURE__ */ React.createElement(ReactNative.View, {
        style: {
          flex: 2,
          marginRight: 4
        }
      }, /* @__PURE__ */ React.createElement(ReactNative.Text, {
        style: styles2.headerTitle
      }, ret.props.title), /* @__PURE__ */ React.createElement(ReactNative.Text, {
        style: styles2.headerDescription
      }, ret.props.body)), ret.props.Illustration && /* @__PURE__ */ React.createElement(ret.props.Illustration, {
        style: {
          flex: 1,
          resizeMode: "contain",
          maxHeight: 96,
          paddingRight: 4
        }
      })), /* @__PURE__ */ React.createElement(ReactNative.View, {
        style: styles2.body
      }, /* @__PURE__ */ React.createElement(Codeblock, {
        selectable: true,
        style: {
          flex: 1,
          textAlignVertical: "top"
        }
      }, tabData?.trimWhitespace ? errorText?.split("\n").filter(function(i) {
        return i.length !== 0;
      }).map(function(i) {
        return i.trim();
      }).join("\n") : errorText), /* @__PURE__ */ React.createElement(ReactNative.View, {
        style: {
          marginVertical: 16
        }
      }, /* @__PURE__ */ React.createElement(BadgableTabBar2, {
        tabs,
        activeTab: this.state.activeTab,
        onTabSelected: function(tab) {
          _this.setState({
            activeTab: tab
          });
        }
      }))), /* @__PURE__ */ React.createElement(ReactNative.View, {
        style: styles2.footer
      }, buttons.map(function(button) {
        const buttonIndex = buttons.indexOf(button) !== 0 ? 8 : 0;
        return /* @__PURE__ */ React.createElement(Tabs.Button, {
          variant: button.variant ?? "primary",
          size: button.size ?? "sm",
          text: button.text,
          onPress: button.onPress,
          style: DeviceManager.isTablet ? {
            marginLeft: buttonIndex
          } : {
            marginTop: buttonIndex
          }
        });
      }))));
    });
  }
  var ErrorBoundary2, BadgableTabBar2, styles2, tabs;
  var init_safeMode = __esm({
    "src/ui/safeMode.tsx"() {
      "use strict";
      init_common();
      init_filters();
      init_patcher();
      init_debug();
      init_native();
      init_color();
      init_shared2();
      init_components();
      init_settings();
      ErrorBoundary2 = findByName("ErrorBoundary");
      ({ BadgableTabBar: BadgableTabBar2 } = findByProps("BadgableTabBar"));
      styles2 = stylesheet.createThemedStyleSheet({
        container: {
          flex: 1,
          backgroundColor: semanticColors.BACKGROUND_PRIMARY,
          paddingHorizontal: 16
        },
        header: {
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 8,
          marginBottom: 16,
          ...cardStyle
        },
        headerTitle: {
          ...TextStyleSheet["heading-lg/semibold"],
          color: semanticColors.HEADER_PRIMARY,
          marginBottom: 4
        },
        headerDescription: {
          ...TextStyleSheet["text-sm/medium"],
          color: semanticColors.TEXT_MUTED
        },
        body: {
          flex: 6
        },
        footer: {
          flexDirection: DeviceManager.isTablet ? "row" : "column",
          justifyContent: "center",
          marginBottom: 16
        }
      });
      tabs = [
        {
          id: "stack",
          title: "Stack Trace"
        },
        {
          id: "component",
          title: "Component",
          trimWhitespace: true
        }
      ];
    }
  });

  // src/ui/settings/components/InstallButton.tsx
  function InstallButton(param) {
    let { alertTitle, installFunction: fetchFunction } = param;
    return /* @__PURE__ */ React.createElement(ReactNative.TouchableOpacity, {
      onPress: function() {
        return clipboard.getString().then(function(content) {
          return showInputAlert({
            title: alertTitle,
            initialValue: content.match(HTTP_REGEX_MULTI)?.[0] ?? "",
            placeholder: "https://example.com/",
            onConfirm: function(input) {
              return fetchFunction(input);
            },
            confirmText: "Install",
            cancelText: "Cancel"
          });
        });
      }
    }, /* @__PURE__ */ React.createElement(ReactNative.Image, {
      style: styles3.icon,
      source: getAssetIDByName("ic_add_24px")
    }));
  }
  var styles3;
  var init_InstallButton = __esm({
    "src/ui/settings/components/InstallButton.tsx"() {
      "use strict";
      init_common();
      init_constants();
      init_alerts();
      init_assets();
      init_color();
      styles3 = stylesheet.createThemedStyleSheet({
        icon: {
          marginRight: 10,
          tintColor: semanticColors.HEADER_PRIMARY
        }
      });
    }
  });

  // src/ui/settings/components/AssetDisplay.tsx
  function AssetDisplay(param) {
    let { asset } = param;
    return /* @__PURE__ */ React.createElement(FormRow2, {
      label: `${asset.name} - ${asset.id}`,
      trailing: /* @__PURE__ */ React.createElement(ReactNative.Image, {
        source: asset.id,
        style: {
          width: 32,
          height: 32
        }
      }),
      onPress: function() {
        clipboard.setString(asset.name);
        showToast("Copied asset name to clipboard.", getAssetIDByName("toast_copy_link"));
      }
    });
  }
  var FormRow2;
  var init_AssetDisplay = __esm({
    "src/ui/settings/components/AssetDisplay.tsx"() {
      "use strict";
      init_common();
      init_toasts();
      init_assets();
      init_components();
      ({ FormRow: FormRow2 } = Forms);
    }
  });

  // src/ui/settings/pages/AssetBrowser.tsx
  function AssetBrowser() {
    const [search, setSearch] = React.useState("");
    return /* @__PURE__ */ React.createElement(ErrorBoundary, null, /* @__PURE__ */ React.createElement(ReactNative.View, {
      style: {
        flex: 1
      }
    }, /* @__PURE__ */ React.createElement(Search_default, {
      style: {
        margin: 10
      },
      onChangeText: function(v) {
        return setSearch(v);
      },
      placeholder: "Search"
    }), /* @__PURE__ */ React.createElement(ReactNative.FlatList, {
      data: Object.values(all).filter(function(a) {
        return a.name.includes(search) || a.id.toString() === search;
      }),
      renderItem: function(param) {
        let { item } = param;
        return /* @__PURE__ */ React.createElement(AssetDisplay, {
          asset: item
        });
      },
      ItemSeparatorComponent: FormDivider,
      keyExtractor: function(item) {
        return item.name;
      }
    })));
  }
  var FormDivider;
  var init_AssetBrowser = __esm({
    "src/ui/settings/pages/AssetBrowser.tsx"() {
      "use strict";
      init_common();
      init_assets();
      init_components();
      init_AssetDisplay();
      ({ FormDivider } = Forms);
    }
  });

  // src/ui/settings/pages/Secret.tsx
  function General2() {
    return /* @__PURE__ */ React.createElement(ErrorBoundary, null, /* @__PURE__ */ React.createElement(TableRowGroup, null, /* @__PURE__ */ React.createElement(Stack, null, /* @__PURE__ */ React.createElement(TableRow, {
      label: "This page is not finished!",
      icon: /* @__PURE__ */ React.createElement(TableRowIcon, {
        source: getAssetIDByName("ic_notification_settings")
      })
    }))));
  }
  var Stack, TableRow, TableRowIcon, TableSwitchRow, TableRowGroup;
  var init_Secret = __esm({
    "src/ui/settings/pages/Secret.tsx"() {
      "use strict";
      init_components();
      init_assets();
      ({ Stack, TableRow, TableRowIcon, TableSwitchRow, TableRowGroup } = Tabs);
    }
  });

  // src/ui/settings/pages/Developer.tsx
  function Developer() {
    const navigation2 = NavigationNative.useNavigation();
    useProxy(settings_default);
    useProxy(loaderConfig);
    return /* @__PURE__ */ React.createElement(ErrorBoundary, null, /* @__PURE__ */ React.createElement(ReactNative.ScrollView, {
      style: {
        flex: 1
      },
      contentContainerStyle: {
        padding: 16,
        alignItems: "center"
      }
    }, /* @__PURE__ */ React.createElement(Stack2, {
      spacing: 50
    }, /* @__PURE__ */ React.createElement(TableRowGroup2, {
      title: "Debug Bridge"
    }, /* @__PURE__ */ React.createElement(TableSwitchRow2, {
      label: "Enabled",
      subLabel: "Automatically connects to a specified remote debug bridge to allow for code evaluation.",
      value: settings_default.debugBridgeEnabled,
      onValueChange: function(v) {
        settings_default.debugBridgeEnabled = v;
        try {
          v ? connectToDebugger(settings_default.debuggerUrl) : socket.close();
        } catch {
        }
      }
    }), /* @__PURE__ */ React.createElement(ReactNative.View, {
      style: {
        paddingVertical: 8,
        paddingHorizontal: 16
      }
    }, /* @__PURE__ */ React.createElement(TextInput, {
      label: "Debug IP",
      placeholder: "127.0.0.1:9090",
      size: "md",
      defaultValue: settings_default.debuggerUrl,
      onChange: function(v) {
        settings_default.debuggerUrl = v;
      }
    }))), window.__vendetta_loader?.features.loaderConfig && /* @__PURE__ */ React.createElement(TableRowGroup2, {
      title: "Loader"
    }, /* @__PURE__ */ React.createElement(TableSwitchRow2, {
      label: "Enabled",
      subLabel: "Handles the loading of Vendetta Continued. You will need to edit the configuration file to enable the loader again.",
      value: true,
      onValueChange: function() {
        return showToast("i dont know what this is - 5xdf");
      }
    }), /* @__PURE__ */ React.createElement(TableSwitchRow2, {
      label: "React DevTools",
      subLabel: "Enables remote developer tools that can be accessed from a desktop.",
      value: settings_default.rdtEnabled,
      onValueChange: function(v) {
        settings_default.rdtEnabled = v;
        if (v)
          connectToRDT();
      }
    }), /* @__PURE__ */ React.createElement(TableSwitchRow2, {
      label: "Force Update",
      subLabel: "Always fetches and uses the latest version available at the provided URL.",
      value: false,
      onValueChange: function() {
        return showToast("this isnt needed - 5xdf");
      }
    }), /* @__PURE__ */ React.createElement(ReactNative.View, {
      style: {
        paddingVertical: 8,
        paddingHorizontal: 16
      }
    }, /* @__PURE__ */ React.createElement(TextInput, {
      label: "Custom Loader URL",
      placeholder: "http://localhost:4040/bound.js",
      size: "md",
      defaultValue: loaderConfig.customLoadUrl.url,
      onChange: function(v) {
        loaderConfig.customLoadUrl.url = v;
      }
    }))), /* @__PURE__ */ React.createElement(TableRowGroup2, {
      title: "Error Boundary"
    }, /* @__PURE__ */ React.createElement(TableSwitchRow2, {
      label: "Error Boundary",
      subLabel: `Crash recovery module. Do not disable if you are a "consumer".`,
      value: settings_default.errorBoundaryEnabled ?? true,
      onValueChange: function(v) {
        settings_default.errorBoundaryEnabled = v;
      }
    }), /* @__PURE__ */ React.createElement(TableRow2, {
      label: "Trigger ErrorBoundary",
      subLabel: "Trips the error boundary on purpose to visualise the effects of it.",
      onPress: function() {
        return showSimpleActionSheet2({
          key: "ErrorBoundaryTools",
          header: {
            title: "Which ErrorBoundary do you want to trip?",
            icon: /* @__PURE__ */ React.createElement(TableRowIcon2, {
              style: {
                marginRight: 8
              },
              source: getAssetIDByName("ic_warning_24px")
            }),
            onClose: function() {
              return hideActionSheet2();
            }
          },
          options: [
            // @ts-expect-error 
            // Of course, to trigger an error, we need to do something incorrectly. The below will do!
            {
              label: "Vendetta Continued",
              onPress: function() {
                return navigation2.push("VendettaCustomPage", {
                  render: function() {
                    return /* @__PURE__ */ React.createElement("undefined", null);
                  }
                });
              }
            },
            {
              label: "Discord",
              isDestructive: true,
              onPress: function() {
                return navigation2.push("VendettaCustomPage", {
                  noErrorBoundary: true
                });
              }
            }
          ]
        });
      },
      arrow: true
    })), /* @__PURE__ */ React.createElement(TableRowGroup2, {
      title: "Logging"
    }, /* @__PURE__ */ React.createElement(TableRow2, {
      label: "Inspection Depth",
      trailing: /* @__PURE__ */ React.createElement(TableRow2.TrailingText, {
        text: `${settings_default.inspectionDepth ?? 1} nested object(s) deep`
      })
    }), /* @__PURE__ */ React.createElement(ReactNative.View, {
      style: {
        paddingVertical: 4,
        paddingHorizontal: 16
      }
    }, /* @__PURE__ */ React.createElement(Slider, {
      value: settings_default.inspectionDepth ?? 1,
      onValueChange: function(v) {
        settings_default.inspectionDepth = v;
      },
      minimumValue: 1,
      maximumValue: 9999,
      step: 1
    })), /* @__PURE__ */ React.createElement(TableRow2, {
      label: "Debug Logs",
      icon: /* @__PURE__ */ React.createElement(TableRowIcon2, {
        source: getAssetIDByName("debug")
      }),
      onPress: function() {
        return navigation2.push("VendettaCustomPage", {
          render: General2
        });
      },
      arrow: true
    })), /* @__PURE__ */ React.createElement(TableRowGroup2, {
      title: "Misc"
    }, /* @__PURE__ */ React.createElement(TableRow2, {
      label: "Restart",
      icon: /* @__PURE__ */ React.createElement(TableRowIcon2, {
        source: getAssetIDByName("RetryIcon")
      }),
      onPress: function() {
        return BundleUpdaterManager.reload();
      },
      arrow: true
    }), /* @__PURE__ */ React.createElement(TableRow2, {
      label: "Force Garbage Collection",
      icon: /* @__PURE__ */ React.createElement(TableRowIcon2, {
        source: getAssetIDByName("trash")
      }),
      onPress: function() {
        return window.gc?.();
      },
      arrow: true
    }), /* @__PURE__ */ React.createElement(TableRow2, {
      label: "Asset Browser",
      icon: /* @__PURE__ */ React.createElement(TableRowIcon2, {
        source: getAssetIDByName("ImageTextIcon")
      }),
      onPress: function() {
        return navigation2.push("VendettaCustomPage", {
          title: "Asset Browser",
          render: AssetBrowser
        });
      },
      arrow: true
    })))));
  }
  var Stack2, TableRow2, TableRowIcon2, TableSwitchRow2, TableRowGroup2, TextInput, Slider, hideActionSheet2, showSimpleActionSheet2;
  var init_Developer = __esm({
    "src/ui/settings/pages/Developer.tsx"() {
      "use strict";
      init_common();
      init_filters();
      init_debug();
      init_native();
      init_storage();
      init_toasts();
      init_assets();
      init_components();
      init_settings();
      init_AssetBrowser();
      init_Secret();
      ({ Stack: Stack2, TableRow: TableRow2, TableRowIcon: TableRowIcon2, TableSwitchRow: TableSwitchRow2, TableRowGroup: TableRowGroup2, TextInput, Slider } = Tabs);
      ({ hideActionSheet: hideActionSheet2 } = findByProps("openLazy", "hideActionSheet"));
      ({ showSimpleActionSheet: showSimpleActionSheet2 } = findByProps("showSimpleActionSheet"));
    }
  });

  // src/ui/settings/pages/General.tsx
  function General3() {
    const navigation2 = NavigationNative.useNavigation();
    useProxy(settings_default);
    useProxy(plugins);
    useProxy(themes);
    return /* @__PURE__ */ React.createElement(ErrorBoundary, null, /* @__PURE__ */ React.createElement(ReactNative.ScrollView, {
      style: {
        flex: 1
      },
      contentContainerStyle: {
        padding: 16,
        alignItems: "center"
      }
    }, /* @__PURE__ */ React.createElement(Stack3, {
      spacing: 16
    }, /* @__PURE__ */ React.createElement(TableRowGroup3, null, /* @__PURE__ */ React.createElement(TableSwitchRow3, {
      label: "Recovery Mode",
      subLabel: "Avoids loading addons to prevent crashing.",
      icon: /* @__PURE__ */ React.createElement(TableRowIcon3, {
        source: getAssetIDByName("ic_message_retry")
      }),
      value: settings_default.safeMode?.enabled,
      onValueChange: function(v) {
        setSafeMode(v);
        settings_default.safeMode.enabled = v;
      }
    })), /* @__PURE__ */ React.createElement(TableRowGroup3, null, /* @__PURE__ */ React.createElement(TableRow3, {
      label: "Toast Settings",
      icon: /* @__PURE__ */ React.createElement(TableRowIcon3, {
        source: getAssetIDByName("ic_notification_settings")
      }),
      onPress: function() {
        return navigation2.push("VendettaCustomPage", {
          title: "Unfinished Page",
          render: General2
        });
      },
      arrow: true
    }), /* @__PURE__ */ React.createElement(TableRow3, {
      label: "Development Settings",
      icon: /* @__PURE__ */ React.createElement(TableRowIcon3, {
        source: getAssetIDByName("ic_progress_wrench_24px")
      }),
      onPress: function() {
        return navigation2.push("VendettaCustomPage", {
          title: "Development Settings",
          render: Developer
        });
      },
      arrow: true
    })), /* @__PURE__ */ React.createElement(TableRowGroup3, {
      title: "Info"
    }, /* @__PURE__ */ React.createElement(TableRow3, {
      label: "Installed Plugins",
      icon: /* @__PURE__ */ React.createElement(TableRowIcon3, {
        source: getAssetIDByName("ic_wand")
      }),
      trailing: /* @__PURE__ */ React.createElement(TableRow3.TrailingText, {
        text: Object.keys(plugins).length
      })
    }), /* @__PURE__ */ React.createElement(TableRow3, {
      label: "Installed Themes",
      icon: /* @__PURE__ */ React.createElement(TableRowIcon3, {
        source: getAssetIDByName("ic_paint_brush")
      }),
      trailing: /* @__PURE__ */ React.createElement(TableRow3.TrailingText, {
        text: Object.keys(themes).length
      })
    })), /* @__PURE__ */ React.createElement(TableRowGroup3, {
      title: "Links"
    }, /* @__PURE__ */ React.createElement(TableRow3, {
      label: "Discord Server",
      icon: /* @__PURE__ */ React.createElement(TableRowIcon3, {
        source: getAssetIDByName("Discord")
      }),
      onPress: function() {
        return url.openDeeplink(DISCORD_SERVER);
      },
      arrow: true
    }), /* @__PURE__ */ React.createElement(TableRow3, {
      label: "GitHub",
      icon: /* @__PURE__ */ React.createElement(TableRowIcon3, {
        source: getAssetIDByName("img_account_sync_github_white")
      }),
      onPress: function() {
        return url.openURL(GITHUB);
      },
      arrow: true
    }), /* @__PURE__ */ React.createElement(TableRow3, {
      label: "Twitter",
      icon: /* @__PURE__ */ React.createElement(TableRowIcon3, {
        source: getAssetIDByName("img_account_sync_x_white")
      }),
      onPress: function() {
        return showToast("nuh uh");
      },
      arrow: true
    })))));
  }
  var Stack3, TableRow3, TableRowIcon3, TableSwitchRow3, TableRowGroup3;
  var init_General = __esm({
    "src/ui/settings/pages/General.tsx"() {
      "use strict";
      init_common();
      init_constants();
      init_debug();
      init_storage();
      init_plugins();
      init_themes();
      init_toasts();
      init_assets();
      init_components();
      init_settings();
      init_Developer();
      init_Secret();
      ({ Stack: Stack3, TableRow: TableRow3, TableRowIcon: TableRowIcon3, TableSwitchRow: TableSwitchRow3, TableRowGroup: TableRowGroup3 } = Tabs);
    }
  });

  // src/ui/settings/components/AddonPage.tsx
  function AddonPage(param) {
    let { items, safeModeMessage, safeModeExtras, card: CardComponent } = param;
    useProxy(settings_default);
    useProxy(items);
    const [search, setSearch] = React.useState("");
    return /* @__PURE__ */ React.createElement(ErrorBoundary, null, /* @__PURE__ */ React.createElement(ReactNative.FlatList, {
      ListHeaderComponent: /* @__PURE__ */ React.createElement(React.Fragment, null, settings_default.safeMode?.enabled && /* @__PURE__ */ React.createElement(ReactNative.View, {
        style: {
          marginBottom: 12
        }
      }, /* @__PURE__ */ React.createElement(HelpMessage, {
        messageType: 0
      }, safeModeMessage), safeModeExtras), /* @__PURE__ */ React.createElement(Search_default, {
        style: {
          marginBottom: 12
        },
        onChangeText: function(v) {
          return setSearch(v.toLowerCase());
        },
        placeholder: "Search"
      })),
      style: {
        paddingHorizontal: 12,
        paddingTop: 12
      },
      contentContainerStyle: {
        paddingBottom: 20
      },
      data: Object.values(items).filter(function(i) {
        return i.id?.toLowerCase().includes(search);
      }),
      renderItem: function(param2) {
        let { item, index } = param2;
        return /* @__PURE__ */ React.createElement(CardComponent, {
          item,
          index
        });
      }
    }));
  }
  var init_AddonPage = __esm({
    "src/ui/settings/components/AddonPage.tsx"() {
      "use strict";
      init_common();
      init_storage();
      init_components();
      init_settings();
    }
  });

  // src/ui/settings/components/Card.tsx
  function Card(props) {
    let pressableState = props.toggleValue ?? false;
    return /* @__PURE__ */ React.createElement(ReactNative.View, {
      style: [
        styles4.card,
        {
          marginTop: props.index !== 0 ? 12 : 0
        }
      ]
    }, /* @__PURE__ */ React.createElement(FormRow3, {
      style: styles4.header,
      label: props.headerLabel,
      leading: props.headerIcon && /* @__PURE__ */ React.createElement(FormRow3.Icon, {
        source: getAssetIDByName(props.headerIcon)
      }),
      trailing: props.toggleType && (props.toggleType === "switch" ? /* @__PURE__ */ React.createElement(RedesignSwitch, {
        value: props.toggleValue,
        onValueChange: props.onToggleChange
      }) : /* @__PURE__ */ React.createElement(ReactNative.Pressable, {
        onPress: function() {
          pressableState = !pressableState;
          props.onToggleChange?.(pressableState);
        }
      }, /* @__PURE__ */ React.createElement(RedesignCheckbox, {
        checked: props.toggleValue
      })))
    }), /* @__PURE__ */ React.createElement(FormRow3, {
      label: props.descriptionLabel,
      trailing: /* @__PURE__ */ React.createElement(ReactNative.View, {
        style: styles4.actions
      }, props.overflowActions && /* @__PURE__ */ React.createElement(ReactNative.TouchableOpacity, {
        onPress: function() {
          return showSimpleActionSheet3({
            key: "CardOverflow",
            header: {
              title: props.overflowTitle,
              icon: props.headerIcon && /* @__PURE__ */ React.createElement(FormRow3.Icon, {
                style: {
                  marginRight: 8
                },
                source: getAssetIDByName(props.headerIcon)
              }),
              onClose: function() {
                return hideActionSheet3();
              }
            },
            options: props.overflowActions?.map(function(i) {
              return {
                ...i,
                icon: getAssetIDByName(i.icon)
              };
            })
          });
        }
      }, /* @__PURE__ */ React.createElement(ReactNative.Image, {
        style: styles4.icon,
        source: getAssetIDByName("ic_more_24px")
      })), props.actions?.map(function(param) {
        let { icon, onPress } = param;
        return /* @__PURE__ */ React.createElement(ReactNative.TouchableOpacity, {
          onPress
        }, /* @__PURE__ */ React.createElement(ReactNative.Image, {
          style: styles4.icon,
          source: getAssetIDByName(icon)
        }));
      }))
    }));
  }
  var FormRow3, RedesignSwitch, RedesignCheckbox, hideActionSheet3, showSimpleActionSheet3, styles4;
  var init_Card = __esm({
    "src/ui/settings/components/Card.tsx"() {
      "use strict";
      init_common();
      init_filters();
      init_assets();
      init_color();
      init_components();
      ({ FormRow: FormRow3 } = Forms);
      ({ RedesignSwitch, RedesignCheckbox } = Tabs);
      ({ hideActionSheet: hideActionSheet3 } = findByProps("openLazy", "hideActionSheet"));
      ({ showSimpleActionSheet: showSimpleActionSheet3 } = findByProps("showSimpleActionSheet"));
      styles4 = stylesheet.createThemedStyleSheet({
        card: {
          backgroundColor: semanticColors?.BACKGROUND_SECONDARY,
          borderRadius: 0
        },
        header: {
          padding: 0,
          backgroundColor: semanticColors?.BACKGROUND_TERTIARY,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0
        },
        actions: {
          flexDirection: "row-reverse",
          alignItems: "center"
        },
        icon: {
          width: 22,
          height: 22,
          marginLeft: 5,
          tintColor: semanticColors?.INTERACTIVE_NORMAL
        }
      });
    }
  });

  // src/ui/settings/components/PluginCard.tsx
  async function stopThenStart(plugin, callback) {
    if (plugin.enabled)
      stopPlugin(plugin.id, false);
    callback();
    if (plugin.enabled)
      await startPlugin(plugin.id);
  }
  function PluginCard(param) {
    let { item: plugin, index } = param;
    const settings = getSettings(plugin.id);
    const navigation2 = NavigationNative.useNavigation();
    const [removed, setRemoved] = React.useState(false);
    if (removed)
      return null;
    return /* @__PURE__ */ React.createElement(Card, {
      index,
      // TODO: Actually make use of user IDs
      headerLabel: `${plugin.manifest.name} by ${plugin.manifest.authors.map(function(i) {
        return i.name;
      }).join(", ")}`,
      headerIcon: plugin.manifest.vendetta?.icon || "ic_application_command_24px",
      toggleType: "switch",
      toggleValue: plugin.enabled,
      onToggleChange: function(v) {
        try {
          if (v)
            startPlugin(plugin.id);
          else
            stopPlugin(plugin.id);
        } catch (e) {
          showToast(e.message, getAssetIDByName("Small"));
        }
      },
      descriptionLabel: plugin.manifest.description,
      overflowTitle: plugin.manifest.name,
      overflowActions: [
        {
          icon: "ic_sync_24px",
          label: "Refetch",
          onPress: async function() {
            stopThenStart(plugin, function() {
              fetchPlugin(plugin.id).then(async function() {
                showToast("Successfully refetched plugin.", getAssetIDByName("toast_image_saved"));
              }).catch(function() {
                showToast("Failed to refetch plugin!", getAssetIDByName("Small"));
              });
            });
          }
        },
        {
          icon: "copy",
          label: "Copy URL",
          onPress: function() {
            clipboard.setString(plugin.id);
            showToast("Copied plugin URL to clipboard.", getAssetIDByName("toast_copy_link"));
          }
        },
        {
          icon: "ic_download_24px",
          label: plugin.update ? "Disable updates" : "Enable updates",
          onPress: function() {
            plugin.update = !plugin.update;
            showToast(`${plugin.update ? "Enabled" : "Disabled"} updates for ${plugin.manifest.name}.`, getAssetIDByName("toast_image_saved"));
          }
        },
        {
          icon: "ic_duplicate",
          label: "Clear data",
          isDestructive: true,
          onPress: function() {
            return showConfirmationAlert({
              title: "Wait!",
              content: `Are you sure you wish to clear the data of ${plugin.manifest.name}?`,
              confirmText: "Clear",
              cancelText: "Cancel",
              confirmColor: ButtonColors.RED,
              onConfirm: function() {
                stopThenStart(plugin, function() {
                  try {
                    MMKVManager.removeItem(plugin.id);
                    showToast(`Cleared data for ${plugin.manifest.name}.`, getAssetIDByName("trash"));
                  } catch {
                    showToast(`Failed to clear data for ${plugin.manifest.name}!`, getAssetIDByName("Small"));
                  }
                });
              }
            });
          }
        },
        {
          icon: "ic_message_delete",
          label: "Delete",
          isDestructive: true,
          onPress: function() {
            return showConfirmationAlert({
              title: "Wait!",
              content: `Are you sure you wish to delete ${plugin.manifest.name}? This will clear all of the plugin's data.`,
              confirmText: "Delete",
              cancelText: "Cancel",
              confirmColor: ButtonColors.RED,
              onConfirm: function() {
                try {
                  removePlugin(plugin.id);
                  setRemoved(true);
                } catch (e) {
                  showToast(e.message, getAssetIDByName("Small"));
                }
              }
            });
          }
        }
      ],
      actions: [
        ...settings ? [
          {
            icon: "settings",
            onPress: function() {
              return navigation2.push("VendettaCustomPage", {
                title: plugin.manifest.name,
                render: settings
              });
            }
          }
        ] : []
      ]
    });
  }
  var init_PluginCard = __esm({
    "src/ui/settings/components/PluginCard.tsx"() {
      "use strict";
      init_def_d();
      init_common();
      init_plugins();
      init_native();
      init_assets();
      init_toasts();
      init_alerts();
      init_Card();
    }
  });

  // src/ui/settings/pages/Plugins.tsx
  function Plugins() {
    useProxy(settings_default);
    return /* @__PURE__ */ React.createElement(AddonPage, {
      items: plugins,
      safeModeMessage: "You are in Recovery Mode, so plugins cannot be loaded. Disable any misbehaving plugins, then return to Normal Mode from the General settings page.",
      card: PluginCard
    });
  }
  var init_Plugins = __esm({
    "src/ui/settings/pages/Plugins.tsx"() {
      "use strict";
      init_storage();
      init_plugins();
      init_settings();
      init_AddonPage();
      init_PluginCard();
    }
  });

  // src/ui/settings/components/ThemeCard.tsx
  async function selectAndReload(value, id) {
    await selectTheme(value ? id : "default");
    BundleUpdaterManager.reload();
  }
  function ThemeCard(param) {
    let { item: theme, index } = param;
    useProxy(settings_default);
    const [removed, setRemoved] = React.useState(false);
    if (removed)
      return null;
    const authors = theme.data.authors;
    return /* @__PURE__ */ React.createElement(Card, {
      index,
      headerLabel: `${theme.data.name} ${authors ? `by ${authors.map(function(i) {
        return i.name;
      }).join(", ")}` : ""}`,
      descriptionLabel: theme.data.description ?? "No description.",
      toggleType: !settings_default.safeMode?.enabled ? "radio" : void 0,
      toggleValue: theme.selected,
      onToggleChange: function(v) {
        selectAndReload(v, theme.id);
      },
      overflowTitle: theme.data.name,
      overflowActions: [
        {
          icon: "ic_sync_24px",
          label: "Refetch",
          onPress: function() {
            fetchTheme(theme.id, theme.selected).then(function() {
              if (theme.selected) {
                showConfirmationAlert({
                  title: "Theme refetched",
                  content: "A reload is required to see the changes. Do you want to reload now?",
                  confirmText: "Reload",
                  cancelText: "Cancel",
                  confirmColor: ButtonColors.RED,
                  onConfirm: function() {
                    return BundleUpdaterManager.reload();
                  }
                });
              } else {
                showToast("Successfully refetched theme.", getAssetIDByName("toast_image_saved"));
              }
            }).catch(function() {
              showToast("Failed to refetch theme!", getAssetIDByName("Small"));
            });
          }
        },
        {
          icon: "copy",
          label: "Copy URL",
          onPress: function() {
            clipboard.setString(theme.id);
            showToast("Copied theme URL to clipboard.", getAssetIDByName("toast_copy_link"));
          }
        },
        {
          icon: "ic_message_delete",
          label: "Delete",
          isDestructive: true,
          onPress: function() {
            return showConfirmationAlert({
              title: "Wait!",
              content: `Are you sure you wish to delete ${theme.data.name}?`,
              confirmText: "Delete",
              cancelText: "Cancel",
              confirmColor: ButtonColors.RED,
              onConfirm: function() {
                removeTheme(theme.id).then(function(wasSelected) {
                  setRemoved(true);
                  if (wasSelected)
                    selectAndReload(false, theme.id);
                }).catch(function(e) {
                  showToast(e.message, getAssetIDByName("Small"));
                });
              }
            });
          }
        }
      ]
    });
  }
  var init_ThemeCard = __esm({
    "src/ui/settings/components/ThemeCard.tsx"() {
      "use strict";
      init_def_d();
      init_common();
      init_themes();
      init_storage();
      init_native();
      init_assets();
      init_alerts();
      init_toasts();
      init_settings();
      init_Card();
    }
  });

  // src/ui/settings/pages/Themes.tsx
  function Themes() {
    useProxy(settings_default);
    return /* @__PURE__ */ React.createElement(TabulatedScreen_default, {
      tabs: [
        {
          id: "colors",
          title: "Colors",
          render: function() {
            return /* @__PURE__ */ React.createElement(AddonPage, {
              items: themes,
              safeModeMessage: `You are in Recovery Mode, meaning themes have been temporarily disabled.${settings_default.safeMode?.currentThemeId ? " If a theme appears to be causing the issue, you can press below to disable it persistently." : ""}`,
              safeModeExtras: settings_default.safeMode?.currentThemeId ? /* @__PURE__ */ React.createElement(Button, {
                text: "Disable Theme",
                color: ButtonColors.BRAND,
                size: "small",
                onPress: function() {
                  delete settings_default.safeMode?.currentThemeId;
                },
                style: {
                  marginTop: 8
                }
              }) : void 0,
              card: ThemeCard
            });
          }
        },
        {
          id: "icons",
          title: "Icons",
          render: General2
        },
        {
          id: "fonts",
          title: "Fonts",
          render: General2
        }
      ]
    });
  }
  var init_Themes = __esm({
    "src/ui/settings/pages/Themes.tsx"() {
      "use strict";
      init_def_d();
      init_storage();
      init_themes();
      init_components();
      init_settings();
      init_AddonPage();
      init_ThemeCard();
      init_Secret();
    }
  });

  // src/ui/settings/data.tsx
  var styles5, formatKey, keyMap, getScreens, getRenderableScreens, getPanelsScreens, getYouData;
  var init_data = __esm({
    "src/ui/settings/data.tsx"() {
      "use strict";
      init_common();
      init_plugins();
      init_themes();
      init_alerts();
      init_color();
      init_toasts();
      init_utils();
      init_assets();
      init_settings();
      init_ErrorBoundary();
      init_InstallButton();
      init_General();
      init_Plugins();
      init_Themes();
      init_Secret();
      init_constants();
      styles5 = stylesheet.createThemedStyleSheet({
        container: {
          flex: 1,
          backgroundColor: semanticColors.BACKGROUND_MOBILE_PRIMARY
        }
      });
      formatKey = function(key, youKeys) {
        return youKeys ? lodash.snakeCase(key).toUpperCase() : key;
      };
      keyMap = function(screens, data) {
        return Object.fromEntries(screens.map(function(s) {
          return [
            s.key,
            typeof data === "function" ? data(s) : typeof data === "string" ? s[data] : data
          ];
        }));
      };
      getScreens = function() {
        let youKeys = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
        return [
          {
            key: formatKey("VendettaSettings", youKeys),
            title: "Settings",
            icon: "settings",
            render: General3
          },
          {
            key: formatKey("VendettaPlugins", youKeys),
            title: "Plugins",
            icon: "debug",
            options: {
              headerRight: function() {
                return /* @__PURE__ */ React.createElement(InstallButton, {
                  alertTitle: "Install Plugin",
                  installFunction: async function(input) {
                    if (!input.startsWith(PROXY_PREFIX) && !settings_default.developerSettings)
                      setImmediate(function() {
                        return showConfirmationAlert({
                          title: "Unproxied Plugin",
                          content: "The plugin you are trying to install has not been proxied/verified by Bound's staff. Are you sure you want to continue?",
                          confirmText: "Install",
                          onConfirm: function() {
                            return installPlugin(input).then(function() {
                              return showToast("Installed plugin", getAssetIDByName("Check"));
                            }).catch(function(x) {
                              return showToast(x?.message ?? `${x}`, getAssetIDByName("Small"));
                            });
                          },
                          cancelText: "Cancel"
                        });
                      });
                    else
                      return await installPlugin(input);
                  }
                });
              }
            },
            render: Plugins
          },
          {
            key: formatKey("VendettaThemes", youKeys),
            title: "Design",
            icon: "PencilSparkleIcon",
            // TODO: bad
            shouldRender: function() {
              return window.__vendetta_loader?.features.hasOwnProperty("themes") ?? false;
            },
            options: {
              headerRight: function() {
                return !settings_default.safeMode?.enabled && /* @__PURE__ */ React.createElement(InstallButton, {
                  alertTitle: "Install Theme",
                  installFunction: installTheme
                });
              }
            },
            render: Themes
          },
          {
            key: formatKey("BoundUpdater", youKeys),
            title: "Updater",
            icon: "ic_download_24px",
            render: General2
          },
          {
            key: formatKey("VendettaCustomPage", youKeys),
            title: "Bound Page",
            shouldRender: function() {
              return false;
            },
            render: function(param) {
              let { render: PageView, noErrorBoundary, ...options } = param;
              const navigation2 = NavigationNative.useNavigation();
              navigation2.addListener("focus", function() {
                return navigation2.setOptions(without(options, "render", "noErrorBoundary"));
              });
              return noErrorBoundary ? /* @__PURE__ */ React.createElement(PageView, null) : /* @__PURE__ */ React.createElement(ErrorBoundary, null, /* @__PURE__ */ React.createElement(PageView, null));
            }
          }
        ];
      };
      getRenderableScreens = function() {
        let youKeys = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
        return getScreens(youKeys).filter(function(s) {
          return s.shouldRender?.() ?? true;
        });
      };
      getPanelsScreens = function() {
        return keyMap(getScreens(), function(s) {
          return {
            title: s.title,
            render: s.render,
            ...s.options
          };
        });
      };
      getYouData = function() {
        const screens = getScreens(true);
        return {
          getLayout: function() {
            return {
              title: "Vendetta Continued",
              label: "Vendetta Continued",
              // We can't use our keyMap function here since `settings` is an array not an object
              settings: getRenderableScreens(true).map(function(s) {
                return s.key;
              })
            };
          },
          titleConfig: keyMap(screens, "title"),
          relationships: keyMap(screens, null),
          rendererConfigs: keyMap(screens, function(s) {
            const WrappedComponent = React.memo(function(param) {
              let { navigation: navigation2, route } = param;
              navigation2.addListener("focus", function() {
                return navigation2.setOptions(s.options);
              });
              return /* @__PURE__ */ React.createElement(ReactNative.View, {
                style: styles5.container
              }, /* @__PURE__ */ React.createElement(s.render, route.params));
            });
            return {
              type: "route",
              title: function() {
                return s.title;
              },
              icon: s.icon ? getAssetIDByName(s.icon) : null,
              screen: {
                // TODO: This is bad, we should not re-convert the key casing
                // For some context, just using the key here would make the route key be VENDETTA_CUSTOM_PAGE in you tab, which breaks compat with panels UI navigation
                route: lodash.chain(s.key).camelCase().upperFirst().value(),
                getComponent: function() {
                  return WrappedComponent;
                }
              }
            };
          })
        };
      };
    }
  });

  // src/ui/settings/components/SettingsSection.tsx
  function SettingsSection() {
    const navigation2 = NavigationNative.useNavigation();
    useProxy(settings_default);
    const screens = getRenderableScreens();
    return /* @__PURE__ */ React.createElement(ErrorBoundary, null, /* @__PURE__ */ React.createElement(FormSection, {
      key: "Vendetta Continued",
      title: `Vendetta Continued${settings_default.safeMode?.enabled ? " (Recovery Mode)" : ""}`
    }, screens.map(function(s, i) {
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FormRow4, {
        label: s.title,
        leading: /* @__PURE__ */ React.createElement(FormRow4.Icon, {
          source: getAssetIDByName(s.icon)
        }),
        trailing: FormRow4.Arrow,
        onPress: function() {
          return navigation2.push(s.key);
        }
      }), i !== screens.length - 1 && /* @__PURE__ */ React.createElement(FormDivider2, null));
    })));
  }
  var FormRow4, FormSection, FormDivider2;
  var init_SettingsSection = __esm({
    "src/ui/settings/components/SettingsSection.tsx"() {
      "use strict";
      init_common();
      init_storage();
      init_assets();
      init_data();
      init_components();
      init_settings();
      ({ FormRow: FormRow4, FormSection, FormDivider: FormDivider2 } = Forms);
    }
  });

  // src/ui/settings/patches/panels.tsx
  function patchPanels() {
    const patches = new Array();
    patches.push(after("default", screensModule, function(_, existingScreens) {
      return {
        ...existingScreens,
        ...getPanelsScreens()
      };
    }));
    after("default", settingsModule, function(_, ret) {
      const Overview = findInReactTree_default(ret.props.children, function(i) {
        return i.type && i.type.name === "UserSettingsOverview";
      });
      patches.push(after("renderSupportAndAcknowledgements", Overview.type.prototype, function(_2, param) {
        let { props: { children } } = param;
        const index = children.findIndex(function(c) {
          return c?.type?.name === "UploadLogsButton";
        });
        if (index !== -1)
          children.splice(index, 1);
      }));
      patches.push(after("render", Overview.type.prototype, function(_2, param) {
        let { props: { children } } = param;
        const titles = [
          i18n.Messages["BILLING_SETTINGS"],
          i18n.Messages["PREMIUM_SETTINGS"]
        ];
        children = findInReactTree_default(children, function(i) {
          return i.children?.[1].type?.name === "FormSection";
        }).children;
        const index = children.findIndex(function(c) {
          return titles.includes(c?.props.label);
        });
        children.splice(index === -1 ? 4 : index, 0, /* @__PURE__ */ React.createElement(SettingsSection, null));
      }));
    }, true);
    return function() {
      return patches.forEach(function(p) {
        return p();
      });
    };
  }
  var screensModule, settingsModule;
  var init_panels = __esm({
    "src/ui/settings/patches/panels.tsx"() {
      "use strict";
      init_common();
      init_filters();
      init_patcher();
      init_utils();
      init_data();
      init_SettingsSection();
      screensModule = findByName("getScreens", false);
      settingsModule = findByName("UserSettingsOverviewWrapper", false);
    }
  });

  // src/ui/settings/patches/you.tsx
  function patchYou() {
    const patches = new Array();
    newYouPatch(patches) || oldYouPatch(patches);
    return function() {
      return patches.forEach(function(p) {
        return p?.();
      });
    };
  }
  function oldYouPatch(patches) {
    const layoutModule = findByProps("useOverviewSettings");
    const titleConfigModule = findByProps("getSettingTitleConfig");
    const miscModule = findByProps("SETTING_RELATIONSHIPS", "SETTING_RENDERER_CONFIGS");
    const OLD_GETTER_FUNCTION = "getSettingSearchListItems";
    const NEW_GETTER_FUNCTION = "getSettingListItems";
    const oldGettersModule = findByProps(OLD_GETTER_FUNCTION);
    const usingNewGettersModule = !oldGettersModule;
    const getterFunctionName = usingNewGettersModule ? NEW_GETTER_FUNCTION : OLD_GETTER_FUNCTION;
    const gettersModule = oldGettersModule ?? findByProps(NEW_GETTER_FUNCTION);
    if (!gettersModule || !layoutModule)
      return;
    const screens = getScreens(true);
    const renderableScreens = getRenderableScreens(true);
    const data = getYouData();
    patches.push(after("useOverviewSettings", layoutModule, function(_, ret) {
      return manipulateSections(ret, data.getLayout());
    }));
    patches.push(after("getSettingTitleConfig", titleConfigModule, function(_, ret) {
      return {
        ...ret,
        ...data.titleConfig
      };
    }));
    patches.push(after(getterFunctionName, gettersModule, function(param, ret) {
      let [settings] = param;
      return [
        ...renderableScreens.filter(function(s) {
          return settings.includes(s.key);
        }).map(function(s) {
          return {
            type: "setting_search_result",
            ancestorRendererData: data.rendererConfigs[s.key],
            setting: s.key,
            title: data.titleConfig[s.key],
            breadcrumbs: [
              "Bound"
            ],
            icon: data.rendererConfigs[s.key].icon
          };
        }),
        // .filter can be removed when dropping support for 189.3 and below (unless Discord changes things again)
        ...ret.filter(function(i) {
          return usingNewGettersModule || !screens.map(function(s) {
            return s.key;
          }).includes(i.setting);
        })
      ].map(function(item, index, parent) {
        return {
          ...item,
          index,
          total: parent.length
        };
      });
    }));
    const oldRelationships = miscModule.SETTING_RELATIONSHIPS;
    const oldRendererConfigs = miscModule.SETTING_RENDERER_CONFIGS;
    miscModule.SETTING_RELATIONSHIPS = {
      ...oldRelationships,
      ...data.relationships
    };
    miscModule.SETTING_RENDERER_CONFIGS = {
      ...oldRendererConfigs,
      ...data.rendererConfigs
    };
    patches.push(function() {
      miscModule.SETTING_RELATIONSHIPS = oldRelationships;
      miscModule.SETTING_RENDERER_CONFIGS = oldRendererConfigs;
    });
    return true;
  }
  function newYouPatch(patches) {
    const settingsListComponents = findByProps("SearchableSettingsList");
    const settingConstantsModule = findByProps("SETTING_RENDERER_CONFIG");
    const gettersModule = findByProps("getSettingListItems");
    if (!gettersModule || !settingsListComponents || !settingConstantsModule)
      return false;
    const screens = getScreens(true);
    const data = getYouData();
    patches.push(before("type", settingsListComponents.SearchableSettingsList, function(param) {
      let [{ sections }] = param;
      return manipulateSections(sections, data.getLayout());
    }));
    patches.push(after("getSettingListSearchResultItems", gettersModule, function(_, ret) {
      ret.forEach(function(s) {
        return screens.some(function(b) {
          return b.key === s.setting;
        }) && (s.breadcrumbs = [
          "Bound"
        ]);
      });
    }));
    const oldRendererConfig = settingConstantsModule.SETTING_RENDERER_CONFIG;
    settingConstantsModule.SETTING_RENDERER_CONFIG = {
      ...oldRendererConfig,
      ...data.rendererConfigs
    };
    patches.push(function() {
      settingConstantsModule.SETTING_RENDERER_CONFIG = oldRendererConfig;
    });
    return true;
  }
  function manipulateSections(sections, layout) {
    if (!Array.isArray(sections) || sections.find(function(i) {
      return isLabel(i, "Bound");
    }))
      return;
    const accountSettingsIndex = sections.findIndex(function(i) {
      return isLabel(i, i18n.Messages.ACCOUNT_SETTINGS);
    });
    sections.splice(accountSettingsIndex + 1, 0, layout);
    const supportCategory = sections.find(function(i) {
      return isLabel(i, i18n.Messages.SUPPORT);
    });
    if (supportCategory)
      supportCategory.settings = supportCategory.settings.filter(function(s) {
        return s !== "UPLOAD_DEBUG_LOGS";
      });
  }
  var isLabel;
  var init_you = __esm({
    "src/ui/settings/patches/you.tsx"() {
      "use strict";
      init_filters();
      init_patcher();
      init_data();
      init_common();
      isLabel = function(i, name) {
        return i?.label === name || i?.title === name;
      };
    }
  });

  // src/ui/settings/index.ts
  function initSettings() {
    const patches = [
      patchPanels(),
      patchYou()
    ];
    return function() {
      return patches.forEach(function(p) {
        return p?.();
      });
    };
  }
  var init_settings2 = __esm({
    "src/ui/settings/index.ts"() {
      "use strict";
      init_panels();
      init_you();
    }
  });

  // src/lib/fixes.ts
  function onDispatch(param) {
    let { locale } = param;
    try {
      if (ThemeManager) {
        ThemeManager.overrideTheme(ThemeStore2?.theme ?? "dark");
        if (AMOLEDThemeManager && UnsyncedUserSettingsStore.useAMOLEDTheme === 2)
          AMOLEDThemeManager.setAMOLEDThemeEnabled(true);
      }
    } catch (e) {
      logger_default.error("Failed to fix theme...", e);
    }
    try {
      moment.locale(locale.toLowerCase());
    } catch (e) {
      logger_default.error("Failed to fix timestamps...", e);
    }
    FluxDispatcher.unsubscribe("I18N_LOAD_SUCCESS", onDispatch);
  }
  function fixes_default() {
    return FluxDispatcher.subscribe("I18N_LOAD_SUCCESS", onDispatch);
  }
  var ThemeManager, AMOLEDThemeManager, ThemeStore2, UnsyncedUserSettingsStore;
  var init_fixes = __esm({
    "src/lib/fixes.ts"() {
      "use strict";
      init_common();
      init_filters();
      init_logger();
      ThemeManager = findByProps("updateTheme", "overrideTheme");
      AMOLEDThemeManager = findByProps("setAMOLEDThemeEnabled");
      ThemeStore2 = findByStoreName("ThemeStore");
      UnsyncedUserSettingsStore = findByStoreName("UnsyncedUserSettingsStore");
    }
  });

  // src/lib/windowObject.ts
  async function windowObject_default(unloads) {
    return {
      patcher: without(patcher_default, "unpatchAll"),
      metro: {
        ...filters_exports,
        common: {
          ...common_exports
        }
      },
      constants: constants_exports,
      utils: utils_exports,
      debug: without(debug_exports, "versionHash", "patchLogHook", "setSafeMode"),
      ui: {
        components: components_exports,
        toasts: toasts_exports,
        alerts: alerts_exports,
        assets: assets_exports,
        ...color_exports
      },
      plugins: without(plugins_exports, "initPlugins", "evalPlugin"),
      themes: without(themes_exports, "initThemes"),
      commands: without(commands_exports, "patchCommands"),
      storage: storage_exports,
      settings: settings_default,
      loader: {
        identity: window.__vendetta_loader,
        config: loaderConfig
      },
      logger: logger_default,
      version: versionHash,
      unload: function() {
        unloads.filter(function(i) {
          return typeof i === "function";
        }).forEach(function(p) {
          return p();
        });
        delete window.vendetta;
      }
    };
  }
  var init_windowObject = __esm({
    "src/lib/windowObject.ts"() {
      "use strict";
      init_patcher();
      init_logger();
      init_settings();
      init_constants();
      init_debug();
      init_plugins();
      init_themes();
      init_commands();
      init_storage();
      init_filters();
      init_common();
      init_components();
      init_toasts();
      init_alerts();
      init_assets();
      init_color();
      init_utils();
    }
  });

  // src/index.ts
  var src_exports = {};
  __export(src_exports, {
    default: () => src_default
  });
  async function src_default() {
    const unloads = await Promise.all([
      patchLogHook(),
      patchAssets(),
      patchCommands(),
      patchChatBackground(),
      fixes_default(),
      safeMode_default(),
      initSettings(),
      initQuickInstall()
    ]);
    await awaitSyncWrapper(settings_default);
    window.vendetta = await windowObject_default(unloads);
    if (settings_default.debugBridgeEnabled)
      connectToDebugger(settings_default.debuggerUrl);
    if (settings_default.rdtEnabled)
      connectToRDT();
    unloads.push(await initPlugins());
    await ReactNative.Image.prefetch("https://bound-mod.github.io/assets/images/fools.png");
    logger_default.log("Vendetta Continued has been injected into your discord app successfully!");
    showToast("Vendetta Continued Loaded", getAssetIDByName("toast_copy_link"));
  }
  var init_src = __esm({
    "src/index.ts"() {
      "use strict";
      init_common();
      init_debug();
      init_storage();
      init_commands();
      init_plugins();
      init_themes();
      init_assets();
      init_quickInstall();
      init_safeMode();
      init_settings2();
      init_fixes();
      init_logger();
      init_windowObject();
      init_settings();
      init_assets();
      init_toasts();
    }
  });

  // src/entry.ts
  init_native();
  console.log("Loading Vendetta Continued....");
  Object.freeze = Object;
  Object.seal = Object;
  var origToString = Function.prototype.toString;
  Object.defineProperty(Function.prototype, "toString", {
    value: origToString,
    configurable: true,
    writable: false
  });
  Promise.resolve().then(() => (init_src(), src_exports)).then(function(m) {
    return m.default();
  }).catch(function(e) {
    console.log(e?.stack ?? e.toString());
    alert([
      "Failed to inject Vendetta Continued!\n",
      `Build Number: ${ClientInfoManager.Build}`,
      `Vendetta Continued: ${"5b98f75"}`,
      e?.stack || e.toString()
    ].join("\n"));
  });
})();
//# sourceURL=VendettaContinued
