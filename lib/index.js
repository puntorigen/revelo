(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.hola = factory());
})(this, (function () { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    /* global Reflect, Promise */
    var _extendStatics = function extendStatics(d, b) {
      _extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        }
      };

      return _extendStatics(d, b);
    };

    function __extends(d, b) {
      if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

      _extendStatics(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var _assign = function __assign() {
      _assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
        }

        return t;
      };

      return _assign.apply(this, arguments);
    };
    function __decorate(decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      }
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __awaiter(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
          resolve(value);
        });
      }

      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }

        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }

        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }

        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    }
    function __generator(thisArg, body) {
      var _ = {
        label: 0,
        sent: function sent() {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      },
          f,
          y,
          t,
          g;
      return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
      }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
      }), g;

      function verb(n) {
        return function (v) {
          return step([n, v]);
        };
      }

      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");

        while (_) {
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];

            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;

              case 4:
                _.label++;
                return {
                  value: op[1],
                  done: false
                };

              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;

              case 7:
                op = _.ops.pop();

                _.trys.pop();

                continue;

              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }

                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }

                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }

                if (t && _.label < t[2]) {
                  _.label = t[2];

                  _.ops.push(op);

                  break;
                }

                if (t[2]) _.ops.pop();

                _.trys.pop();

                continue;
            }

            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        }

        if (op[0] & 5) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    }

    var root = (require('find-root'))(__dirname);
    var pkg = require(root + '/package.json');
    var fs$4 = require('fs').promises;
    var helper = /** @class */ (function () {
        function helper() {
            this.x_console = new (require('@concepto/console'))();
        }
        helper.prototype.copyright = function () {
            this.x_console.out({
                message: "\nCrafted with passion @ 2022 by ".concat(pkg.author, "."),
                color: 'dim'
            });
        };
        helper.prototype.fileExists = function (file) {
            return __awaiter(this, void 0, void 0, function () {
                var resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            resp = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, fs$4.access(file)];
                        case 2:
                            resp = _a.sent();
                            resp = true;
                            return [3 /*break*/, 4];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/, resp];
                    }
                });
            });
        };
        helper.prototype.readFile = function (file, json) {
            if (json === void 0) { json = true; }
            return __awaiter(this, void 0, void 0, function () {
                var resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fs$4.readFile(file, 'utf-8')];
                        case 1:
                            resp = _a.sent();
                            if (json)
                                return [2 /*return*/, JSON.parse(resp)];
                            return [2 /*return*/, resp];
                    }
                });
            });
        };
        helper.prototype.writeFile = function (file, data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, fs$4.writeFile(file, data, 'utf-8', {
                                    encoding: 'utf8',
                                    flag: 'w'
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, true];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, false];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        helper.prototype.isObjEmpty = function (obj) {
            //fastest algorithm
            for (var x in obj)
                return false;
            return true;
        };
        return helper;
    }());

    var helper_$1 = new helper();
    var prompts$1 = require('prompts');
    var x_console = new (require('@concepto/console'))();
    require('dotenv').config();
    var ref = {};
    //@todo read this from a theme.json file
    x_console.setColorTokens({
        '*': 'yellow',
        '#': 'cyan',
        '@': 'green'
    });
    var finish = function (exitcode) {
        // closing script
        console.log('\n');
        helper_$1.copyright();
        if (exitcode)
            process.exit(exitcode);
        process.exit();
    };
    var command = function (desc, usage, signature) {
        if (signature === void 0) { signature = ''; }
        return function (target, key, descriptor) {
            var original = descriptor.value;
            descriptor.value = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return __awaiter(this, void 0, void 0, function () {
                    var norm, _a, usage_1, option, aliases, short, main, ori, _b, _c, _d, req, other_, _e, _f, err_1, other_, _g, _h, _j, _k, _l, _m, _o, _p;
                    return __generator(this, function (_q) {
                        switch (_q.label) {
                            case 0:
                                //let usage = target[key+'_usage']();
                                if (!this.usage)
                                    this.usage = {};
                                if (!this.commands)
                                    this.commands = {};
                                if (!this.signatures)
                                    this.signatures = {};
                                this.usage[key] = usage; //declare it for CLI knowledge
                                this.commands[key] = desc; //declare it for CLI knowledge
                                this.usage[key + ':validation'] = {}; //declare it for CLI knowledge
                                ref[key] = {};
                                if (signature == '' && usage && usage.length > 0) {
                                    this.signatures[key] = '[options]'; //default value when there are options
                                }
                                else {
                                    this.signatures[key] = signature; //assigned given value
                                }
                                norm = args[0] //cmdline args
                                ;
                                (norm._) ? norm._[0] : "";
                                if (!!('_init' in norm)) return [3 /*break*/, 22];
                                norm._.shift(); // remove command name
                                for (_a = 0, usage_1 = usage; _a < usage_1.length; _a++) {
                                    option = usage_1[_a];
                                    aliases = option;
                                    short = option[0][1] //first char
                                    ;
                                    //console.log('deco '+key+' dump',{aliases,short,usage,option});
                                    if (short != '-') {
                                        aliases.shift(); // remove short from aliases
                                        main = aliases.shift().replace('--', '');
                                        aliases.shift(); // remove desc
                                        if (aliases.length > 0 && typeof aliases[0] === 'object') {
                                            ref[key][main] = aliases[0];
                                            //console.log('deco dump '+key+' usage',{ option, aliases });
                                            aliases.pop(); // remove validation
                                        }
                                        if (norm[short]) {
                                            norm[main] = norm[short]; // assign value to 'main' property name
                                            delete norm[short]; //erases short type
                                        }
                                        // assign all posible combinations to main from norm
                                        for (ori in norm) {
                                            if (ori != '_' && aliases.includes(ori)) {
                                                if (norm[ori]) {
                                                    norm[main] = norm[ori];
                                                    delete norm[ori];
                                                }
                                            }
                                        }
                                    }
                                }
                                _b = [];
                                for (_c in ref[key])
                                    _b.push(_c);
                                _d = 0;
                                _q.label = 1;
                            case 1:
                                if (!(_d < _b.length)) return [3 /*break*/, 21];
                                req = _b[_d];
                                if (!!(req in norm)) return [3 /*break*/, 20];
                                if (!(ref[key][req].error && ref[key][req].error != '')) return [3 /*break*/, 2];
                                //required file was not given and error message specified to halt process
                                if (ref[key][req].arg && norm[ref[key][req].arg]) {
                                    other_ = norm[ref[key][req].arg];
                                    if (ref[key][req].arg == '_') {
                                        if (other_.length > 0) {
                                            norm[req] = other_[0];
                                        }
                                        else {
                                            x_console.out({
                                                message: x_console.colorize(ref[key][req].error),
                                                color: 'brightRed'
                                            });
                                            finish(20);
                                        }
                                    }
                                    else {
                                        norm[req] = other_;
                                    }
                                }
                                else if (ref[key][req].arg) {
                                    x_console.out({
                                        message: x_console.colorize(ref[key][req].error),
                                        color: 'brightRed'
                                    });
                                    finish(20);
                                }
                                return [3 /*break*/, 20];
                            case 2:
                                if (!(ref[key][req].prompt && ref[key][req].prompt != '')) return [3 /*break*/, 8];
                                _q.label = 3;
                            case 3:
                                _q.trys.push([3, 6, , 7]);
                                if (!!norm[req]) return [3 /*break*/, 5];
                                _e = norm;
                                _f = req;
                                return [4 /*yield*/, prompts$1({
                                        type: (ref[key][req].type) ? ref[key][req].type : 'text',
                                        name: 'value',
                                        message: x_console.colorize(ref[key][req].prompt)
                                    })];
                            case 4:
                                _e[_f] = (_q.sent()).value;
                                if (!norm[req] && ref[key][req].default && ref[key][req].default != '')
                                    norm[req] = ref[key][req].default;
                                _q.label = 5;
                            case 5: return [3 /*break*/, 7];
                            case 6:
                                err_1 = _q.sent();
                                x_console.out({ message: 'error prompt', data: err_1 });
                                return [3 /*break*/, 7];
                            case 7: return [3 /*break*/, 20];
                            case 8:
                                if (!(ref[key][req].required && ref[key][req].required != '')) return [3 /*break*/, 20];
                                if (!(ref[key][req].arg && norm[ref[key][req].arg])) return [3 /*break*/, 14];
                                other_ = norm[ref[key][req].arg];
                                if (!(ref[key][req].arg == '_')) return [3 /*break*/, 12];
                                if (!(other_.length > 0)) return [3 /*break*/, 9];
                                norm[req] = other_[0];
                                return [3 /*break*/, 11];
                            case 9:
                                _g = norm;
                                _h = req;
                                return [4 /*yield*/, prompts$1({
                                        type: (ref[key][req].type) ? ref[key][req].type : 'text',
                                        name: 'value',
                                        message: x_console.colorize(ref[key][req].required)
                                    })];
                            case 10:
                                _g[_h] = (_q.sent()).value;
                                if (!norm[req])
                                    finish(20);
                                _q.label = 11;
                            case 11: return [3 /*break*/, 13];
                            case 12:
                                norm[req] = other_;
                                _q.label = 13;
                            case 13: return [3 /*break*/, 16];
                            case 14:
                                if (!ref[key][req].arg) return [3 /*break*/, 16];
                                _j = norm;
                                _k = req;
                                return [4 /*yield*/, prompts$1({
                                        type: (ref[key][req].type) ? ref[key][req].type : 'text',
                                        name: 'value',
                                        message: x_console.colorize(ref[key][req].required)
                                    })];
                            case 15:
                                _j[_k] = (_q.sent()).value;
                                if (!norm[req])
                                    finish(20);
                                _q.label = 16;
                            case 16:
                                //test if ENV key is defined; if so assign it
                                if (ref[key][req].env && process.env[ref[key][req].env]) {
                                    norm[req] = process.env[ref[key][req].env];
                                }
                                if (!(!(req in norm) && !ref[key][req].options)) return [3 /*break*/, 18];
                                _l = norm;
                                _m = req;
                                return [4 /*yield*/, prompts$1({
                                        type: (ref[key][req].type) ? ref[key][req].type : 'text',
                                        name: 'value',
                                        message: x_console.colorize(ref[key][req].required)
                                    })];
                            case 17:
                                _l[_m] = (_q.sent()).value;
                                if (!norm[req])
                                    finish(20);
                                _q.label = 18;
                            case 18:
                                if (!(!(req in norm) && ref[key][req].options)) return [3 /*break*/, 20];
                                _o = norm;
                                _p = req;
                                return [4 /*yield*/, prompts$1({
                                        type: 'select',
                                        name: 'value',
                                        message: x_console.colorize(ref[key][req].required),
                                        choices: ref[key][req].options
                                    })];
                            case 19:
                                _o[_p] = (_q.sent()).value;
                                if (!norm[req])
                                    finish(20);
                                _q.label = 20;
                            case 20:
                                _d++;
                                return [3 /*break*/, 1];
                            case 21:
                                //console.log('new args',norm);
                                //console.log('');
                                //call original method (only if not from constructor initialization)
                                original.apply(this, [norm]);
                                _q.label = 22;
                            case 22: return [2 /*return*/];
                        }
                    });
                });
            };
        };
    };
    var cli = function (constructor) {
        constructor.prototype.usage = {};
        constructor.prototype.commands = {};
        for (var method in constructor.prototype) {
            if (!['usage', 'commands'].includes(method)) {
                constructor.prototype[method]({ _init: true });
            }
        }
    };

    var prompts = require('prompts');
    var helper_ = new helper();
    var Command = /** @class */ (function () {
        function Command(arg) {
            if (arg.silent) { // --silent
                this.x_console = new (require('@concepto/console'))({ silent: true });
            }
            else {
                this.x_console = new (require('@concepto/console'))();
            }
            if (arg.debug) {
                this.debug_ = true; // --debug
                this.x_console.out = this.x_console.outT;
            }
            this.arg = _assign(_assign({}, arg), { cmd_: '' }); //cmd_ is the 
            if (arg._ && arg._.length > 0)
                this.arg.cmd_ = arg._[0].toLowerCase();
            this.helper_ = helper_;
        }
        Command.prototype.run = function () {
            return __awaiter(this, void 0, void 0, function () {
                var a, b;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.init()];
                        case 1:
                            a = _a.sent();
                            if (a == false)
                                this.finish(1);
                            return [4 /*yield*/, this.process()];
                        case 2:
                            b = _a.sent();
                            if (b == false)
                                this.finish(2);
                            this.finish();
                            return [2 /*return*/];
                    }
                });
            });
        };
        Command.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, true];
                });
            });
        };
        Command.prototype.process = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    //this is for the command instance to overwrite
                    return [2 /*return*/, true];
                });
            });
        };
        Command.prototype.finish = function (exitcode) {
            // closing script
            if (exitcode) {
                console.log('\n');
                helper_.copyright();
                process.exit(exitcode);
            }
        };
        Command.prototype.ask = function (question, validation) {
            return __awaiter(this, void 0, void 0, function () {
                var resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, prompts({
                                type: 'text',
                                name: 'value',
                                message: this.x_console.colorize(question),
                                validate: function (value) {
                                    if (validation)
                                        return validation(value);
                                    return true;
                                }
                            })];
                        case 1:
                            resp = (_a.sent()).value;
                            return [2 /*return*/, resp];
                    }
                });
            });
        };
        Command.prototype.choose = function (question, options, selected) {
            if (selected === void 0) { selected = 0; }
            return __awaiter(this, void 0, void 0, function () {
                var resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, prompts({
                                type: 'select',
                                name: 'value',
                                message: this.x_console.colorize(question),
                                choices: options,
                                initial: selected
                            })];
                        case 1:
                            resp = (_a.sent()).value;
                            return [2 /*return*/, resp];
                    }
                });
            });
        };
        Command.prototype.multi = function (question, options, max, hint) {
            if (max === void 0) { max = 0; }
            return __awaiter(this, void 0, void 0, function () {
                var resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, prompts({
                                type: 'multiselect',
                                name: 'value',
                                message: this.x_console.colorize(question),
                                choices: options,
                                max: max,
                                hint: (hint) ? hint : '- Space to select. Return to submit'
                            })];
                        case 1:
                            resp = (_a.sent()).value;
                            return [2 /*return*/, resp];
                    }
                });
            });
        };
        Command.prototype.logPrefix = function (prefix, color) {
            if (color === void 0) { color = 'yellow'; }
            var params = { prefix: prefix, color: color };
            this.x_console.setPrefix(params);
        };
        Command.prototype.log = function (message, color, data) {
            var params = { message: message };
            var test = message.toLowerCase();
            if (test.indexOf('error:') != -1 || test.indexOf('error:') != -1)
                params.color = 'brightRed';
            if (data)
                params.data = data;
            if (color)
                params.color = color;
            params.message = this.x_console.colorize(params.message);
            this.x_console.out(params);
        };
        Command.prototype.debug = function (message, data) {
            var params = { prefix: 'debug:' + this.x_console.config.prefix, message: message, color: 'dim' };
            var test = message.toLowerCase();
            if (test.indexOf('error:') != -1 || test.indexOf('error:') != -1)
                params.color = 'brightRed';
            if (data)
                params.data = data;
            this.x_console.out(params);
        };
        Command.prototype.title = function (title, color, borderColor) {
            var params = { title: title };
            if (color)
                params.titleColor = color;
            this.x_console.title(params);
        };
        Command.prototype.spinner = function (color) {
            var params = {};
            if (color)
                params.color = color;
            return this.x_console.spinner(params);
        };
        Command.prototype.setColorTokens = function (colorTokens) {
            this.x_console.setColorTokens(colorTokens);
        };
        return Command;
    }());

    var firstReveal = '';
    var fs$3 = require('fs').promises;
    var path$3 = require('path');
    var random = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    var presentation = /** @class */ (function () {
        function presentation(sourcefile) {
            this.x_console = new (require('@concepto/console'))();
            this.sourceFile = sourcefile;
        }
        presentation.prototype.downloadFile = function (url, directory) {
            return __awaiter(this, void 0, void 0, function () {
                var dl, asPromise, down;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            dl = require('download-file-with-progressbar');
                            asPromise = function () { return new Promise(function (resolve, reject) {
                                dl(url, {
                                    dir: directory,
                                    onDone: function (info) {
                                        resolve(info);
                                    },
                                    onProgress: function (x) {
                                    },
                                    onError: function (err) {
                                        reject(err);
                                    }
                                });
                            }); };
                            return [4 /*yield*/, asPromise()];
                        case 1:
                            down = _a.sent();
                            return [2 /*return*/, down];
                    }
                });
            });
        };
        presentation.prototype.baseReveal = function (directory) {
            return __awaiter(this, void 0, void 0, function () {
                var down, extract;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.downloadFile('https://github.com/hakimel/reveal.js/archive/master.zip', directory)];
                        case 1:
                            down = _a.sent();
                            extract = require('extract-zip');
                            return [4 /*yield*/, extract(down.path, { dir: directory })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, {
                                    path: directory + "/reveal.js-master",
                                    presentation: path$3.join(directory, 'reveal.js-master', 'index.html'),
                                    file: down.path
                                }];
                    }
                });
            });
        };
        presentation.prototype.convertToWebm = function (mp4, output, fps) {
            if (fps === void 0) { fps = 25; }
            return __awaiter(this, void 0, void 0, function () {
                var ffmpeg, ffmpeg_bin, asPromise, down;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            ffmpeg = require('fluent-ffmpeg');
                            ffmpeg_bin = require('ffmpeg-static');
                            ffmpeg.setFfmpegPath(ffmpeg_bin);
                            asPromise = function () { return new Promise(function (resolve, reject) {
                                ffmpeg(mp4).videoCodec('libvpx-vp9') //libvpx
                                    .videoBitrate(1000, true) //700
                                    .size('30%')
                                    .withFps(fps)
                                    .outputOptions('-minrate', '1000', //700
                                '-maxrate', '1000', '-threads', '8', '-flags', '+global_header', '-psnr', '-lossless', '1' //1
                                ).on('error', function (err, stdout, stderr) {
                                    reject(err);
                                }).on('progress', function (progress) {
                                    //console.log(`${progress.percent}% done`);
                                }).on('end', function (err, stdout, stderr) {
                                    resolve(stdout);
                                }).save(output);
                            }); };
                            return [4 /*yield*/, asPromise()];
                        case 1:
                            down = _a.sent();
                            return [2 /*return*/, down];
                    }
                });
            });
        };
        presentation.prototype.createPresentation = function (serverUrl, target, options, spinner) {
            return __awaiter(this, void 0, void 0, function () {
                var md, yaml, extractjs, mdSource, replies, meta, config, tokens, rendered, cheerio, $, sections, timeToRead, videos_, i, item_, metaSlide, slideTime, x, content_, extract, pattern, ex, $2, encode, chosen, pexels, encryptor, apiKey, pexelClient, videos, mp4, just_file, new_mp4, new_webm, fps_, $_1, last_script, codes_, usesMermaid_1, body_, head_, decode_, to_render;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            md = require('markdown-it')();
                            yaml = require('yaml');
                            extractjs = require('extractjs');
                            return [4 /*yield*/, fs$3.readFile(this.sourceFile, { encoding: 'utf-8' })];
                        case 1:
                            mdSource = _a.sent();
                            replies = [], meta = { numSlides: 0, slides: [], totalTime: 0 };
                            config = _assign({}, options);
                            //init markdown plugins
                            md.use(require('markdown-it-front-matter'), function (x) { config = _assign(_assign({}, yaml.parse(x)), options); delete config.downloadAssets; });
                            md.use(require('markdown-it-revealjs'), function () { });
                            md.use(require('markdown-it-task-lists'), function () { return ({ enabled: true }); }); // - [ ] task
                            md.use(require('markdown-it-emoji')); // ;)
                            md.use(require('markdown-it-video')); //@[youtube](codigo)
                            md.use(require('markdown-it-include'), { root: path$3.dirname(this.sourceFile) }); // !!!include(file.md)!!!
                            md.use(require('markdown-it-anchor').default);
                            md.use(require('markdown-it-table-of-contents'));
                            //md.use(require('markdown-it-multimd-table'));
                            md.use(require('markdown-it-attrs'), {
                                leftDelimiter: '<(',
                                rightDelimiter: ')>'
                            });
                            tokens = md.parse(mdSource, {});
                            rendered = md.renderer.render(tokens, md.options);
                            cheerio = require('cheerio');
                            $ = cheerio.load(rendered, { xmlMode: true, decodeEntities: false });
                            sections = $('section section').toArray();
                            meta.numSlides = sections.length; //number of slides
                            timeToRead = require('reading-time');
                            videos_ = 0;
                            i = 0;
                            _a.label = 2;
                        case 2:
                            if (!(i < sections.length)) return [3 /*break*/, 17];
                            item_ = $(sections[i]);
                            metaSlide = { time: timeToRead(item_.html(), { wordsPerMinute: 100 }), pictures: 0, videos: 0 };
                            slideTime = 0;
                            x = 0;
                            _a.label = 3;
                        case 3:
                            if (!(x < 10)) return [3 /*break*/, 15];
                            content_ = item_.html();
                            extract = extractjs({ startExtract: "[", endExtract: "]" });
                            pattern = extract(":::{[command]}[content]:::");
                            ex = pattern.extract(content_);
                            if (ex.command) {
                                if (ex.command == 'incremental') {
                                    $2 = cheerio.load(ex.content, { xmlMode: true, decodeEntities: false });
                                    $2('*').each(function (idx, item) {
                                        var item2_ = $(this);
                                        if (item2_[0].name != 'ol' && item2_[0].name != 'ul') {
                                            item2_.addClass('fragment');
                                            item2_.addClass('fade-up');
                                        }
                                    });
                                    item_.html(content_.replace(pattern.interpolate(ex), $2.html()));
                                }
                            }
                            //->[background](happy people)
                            content_ = item_.html();
                            extract = extractjs();
                            pattern = extract("-&gt;{command}[{content}]");
                            ex = pattern.extract(content_);
                            if (!ex.command) return [3 /*break*/, 14];
                            item_.html(content_.replace(pattern.interpolate(ex), '')); //erase directive
                            if (!(ex.command == 'background')) return [3 /*break*/, 4];
                            if (ex.content.indexOf(',') != -1) { //opacity within value
                                item_.attr('data-background-opacity', ex.content.split(',')[1]);
                                ex.content = ex.content.split(',')[0];
                            }
                            if (ex.content.indexOf('http') == -1 && ex.content.indexOf('.jpg') == -1 && ex.content.indexOf('.png') == -1) {
                                encode = require('querystring').escape;
                                item_.attr('data-background-image', "https://source.unsplash.com/random?".concat(encode(ex.content), "/1024x768"));
                            }
                            else if (ex.content.indexOf('.jpg') != -1 || ex.content.indexOf('.png') != -1) ;
                            else {
                                item_.attr('data-background-image', ex.content);
                                metaSlide.pictures += 1;
                            }
                            return [3 /*break*/, 14];
                        case 4:
                            if (!(ex.command == 'background-color')) return [3 /*break*/, 5];
                            item_.attr('data-background-color', ex.content);
                            return [3 /*break*/, 14];
                        case 5:
                            if (!(ex.command == 'background-video')) return [3 /*break*/, 13];
                            metaSlide.videos += 1;
                            if (ex.content.indexOf(',') != -1) { //opacity within value
                                item_.attr('data-background-opacity', ex.content.split(',')[1]);
                                ex.content = ex.content.split(',')[0];
                            }
                            chosen = -1;
                            if (ex.content.indexOf('-') != -1) { //video num specified
                                chosen = parseInt(ex.content.split('-')[1]);
                                ex.content = ex.content.split('-')[0];
                            }
                            if (!(ex.content.indexOf('http') == -1 && ex.content.indexOf('.mp4') == -1 && ex.content.indexOf('.mov') == -1)) return [3 /*break*/, 11];
                            pexels = require('node-pexels').Client;
                            encryptor = require('simple-encryptor')('revelo is a awesome text based presentation tool!');
                            apiKey = 'dc4df714bb25c51ba2676635a56e79137eec6bfec70c50c4a347e96af8bdb554382171bab5e8dbb29c529aa8305327caiSUeI2PXagkEVPuGaQegpArItV7G7WlrDcA1PkopgLMuG1Dt1abPGgLB6EwnSGVzAuskFYA836fZ8OjbM0dFkg==';
                            pexelClient = new pexels({ apiKey: encryptor.decrypt(apiKey) });
                            return [4 /*yield*/, pexelClient.v1.videos.search(ex.content)];
                        case 6:
                            videos = _a.sent();
                            if (chosen == -1 || chosen > videos.videos.length)
                                chosen = random(0, videos.videos.length - 1);
                            if (!(videos.videos.length == 0)) return [3 /*break*/, 7];
                            replies.push({ type: 'warning', text: "there are no background-videos for '".concat(ex.content, "' (omitting, slide:").concat(i + 1, ")") });
                            return [3 /*break*/, 10];
                        case 7:
                            mp4 = videos.videos[chosen].video_files[0].link;
                            if (!(options.downloadAssets && options.downloadAssets != '')) return [3 /*break*/, 9];
                            just_file = random(0, 10000);
                            new_mp4 = path$3.join(options.downloadAssets, 'reveal.js-master', just_file + '.mp4');
                            new_webm = new_mp4.replaceAll('.mp4', '.webm');
                            fps_ = options.fps ? options.fps : 25;
                            videos_ += 1;
                            if (spinner)
                                spinner.text("downloading & converting background-video ".concat(videos_, " (fps:").concat(fps_, ")"));
                            return [4 /*yield*/, this.convertToWebm(mp4, new_webm, fps_)];
                        case 8:
                            _a.sent();
                            mp4 = '/' + just_file + '.webm';
                            _a.label = 9;
                        case 9:
                            //console.log(`pexel video (chosen:${chosen})`,{mp4,raw:videos.videos[chosen].video_files[0]});
                            //console.log(`pexels videos (chosen:${chosen})`,videos.videos[chosen]);
                            mp4 = mp4.replaceAll('https:', 'http:');
                            item_.attr('data-background-video', mp4);
                            item_.attr('data-background-video-muted', true);
                            item_.attr('data-background-video-loop', true);
                            _a.label = 10;
                        case 10: return [3 /*break*/, 12];
                        case 11:
                            // @todo add support for local videos
                            item_.attr('data-background-video', ex.content);
                            _a.label = 12;
                        case 12: return [3 /*break*/, 14];
                        case 13:
                            if (ex.command == 'sleep' || ex.command == 'wait') {
                                item_.attr('data-autoslide', ex.content);
                                slideTime = parseInt(ex.content);
                            }
                            else if (ex.command == 'transition') {
                                item_.attr('data-transition', ex.content);
                            }
                            _a.label = 14;
                        case 14:
                            x++;
                            return [3 /*break*/, 3];
                        case 15:
                            if ((options.video || options.autoSlide) && slideTime == 0) {
                                //if video mode, and slideTime is undefined
                                if (options.tps && options.tps == 'auto') {
                                    //if tfs=auto use metaSlide.time.time arg, if not use value*1000 (secs->ms)
                                    slideTime = Math.max(metaSlide.time.time, 3000); //min 3 secs
                                }
                                else if (options.tps && parseInt(options.tps) > 0) {
                                    //use value*1000
                                    slideTime = parseInt(options.tps) * 1000;
                                }
                                item_.attr('data-autoslide', slideTime);
                            }
                            meta.totalTime = meta.totalTime + slideTime;
                            meta.slides.push(metaSlide);
                            _a.label = 16;
                        case 16:
                            i++;
                            return [3 /*break*/, 2];
                        case 17:
                            rendered = $.html();
                            if (serverUrl.indexOf('loca.lt') == -1 && serverUrl != '') {
                                //if serverUrl is not localtunnel (loca.lt), enable hot-reload
                                rendered += "<script src=\"".concat(serverUrl, "/livereload.js?snipver=1\" async=\"\" defer=\"\"></script>");
                            }
                            if (!(target != '')) return [3 /*break*/, 21];
                            if (!(firstReveal == '')) return [3 /*break*/, 19];
                            return [4 /*yield*/, fs$3.readFile(target, { encoding: 'utf-8' })];
                        case 18:
                            firstReveal = _a.sent();
                            _a.label = 19;
                        case 19:
                            $_1 = cheerio.load(firstReveal);
                            $_1('div[class=reveal]').each(function (idx, item) {
                                $_1(this).replaceWith(rendered);
                            });
                            //add front matter config as Reveal.configure
                            if (!this.isObjEmpty(config)) {
                                last_script = $_1('script').last().html();
                                last_script += "\n\t\t\tReveal.configure(".concat(JSON.stringify(config), ");");
                                last_script += "\nReveal.on( 'slidetransitionend', function(event) {\n                    console.log('slidetransitionend slide indexH:'+event.indexh); //,event.currentSlide\n                } );";
                                $_1('script').last().html(last_script);
                            }
                            codes_ = $_1('code').toArray();
                            usesMermaid_1 = false;
                            codes_.forEach(function (test) {
                                var item = $_1(test);
                                var inner_ = item.html();
                                var class_ = item.attr('class');
                                var type_ = 'LR';
                                if (class_.indexOf('language-diagram') != -1) {
                                    usesMermaid_1 = true;
                                    if (class_.indexOf(',') != -1) {
                                        type_ = class_.split(',')[1].trim();
                                    }
                                }
                                var new_ = "<div class=\"mermaid\">\ngraph ".concat(type_, "\n").concat(inner_, "</div>");
                                item.parent('pre').replaceWith(new_);
                            });
                            body_ = $_1('body').toArray();
                            body_.forEach(function (element) {
                                if (usesMermaid_1) {
                                    var content = $_1(element).html();
                                    content += "<script src=\"https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js\"></script>\n                    <script>\n                        mermaid.initialize({ startOnLoad: true });\n                    </script>";
                                    $_1(element).html(content);
                                }
                            });
                            head_ = $_1('head').toArray();
                            head_.forEach(function (element) {
                                var item = $_1(element);
                                var inner_ = item.html();
                                inner_ += "<link rel=\"stylesheet\" href=\"https://unpkg.com/tachyons@4.12.0/css/tachyons.min.css\"/>\n";
                                if (options.video) {
                                    inner_ += "<style>\n                        .playback {\n                            display: none !important;\n                        }\n                    </style>\n";
                                }
                                item.html(inner_);
                            });
                            decode_ = require('decode-html');
                            to_render = $_1.html();
                            if (usesMermaid_1)
                                to_render = decode_(to_render);
                            return [4 /*yield*/, fs$3.writeFile(target, decode_(to_render), 'utf-8', {
                                    encoding: 'utf8',
                                    flag: 'w'
                                })];
                        case 20:
                            _a.sent();
                            _a.label = 21;
                        case 21: 
                        //debug
                        //this.x_console.out({message:'md rendered',data:{rendered, slides} });
                        return [2 /*return*/, { warnings: replies, meta: meta }];
                    }
                });
            });
        };
        presentation.prototype.isObjEmpty = function (obj) {
            //fastest algorithm
            for (var x in obj)
                return false;
            return true;
        };
        return presentation;
    }());

    var ESC = '\u001B[';
    var OSC = '\u001B]';
    var BEL = '\u0007';
    var SEP = ';';
    var isTerminalApp = process.env.TERM_PROGRAM === 'Apple_Terminal';
    var ansiEscapes = {};

    ansiEscapes.cursorTo = (x, y) => {
      if (typeof x !== 'number') {
        throw new TypeError('The `x` argument is required');
      }

      if (typeof y !== 'number') {
        return ESC + (x + 1) + 'G';
      }

      return ESC + (y + 1) + ';' + (x + 1) + 'H';
    };

    ansiEscapes.cursorMove = (x, y) => {
      if (typeof x !== 'number') {
        throw new TypeError('The `x` argument is required');
      }

      var returnValue = '';

      if (x < 0) {
        returnValue += ESC + -x + 'D';
      } else if (x > 0) {
        returnValue += ESC + x + 'C';
      }

      if (y < 0) {
        returnValue += ESC + -y + 'A';
      } else if (y > 0) {
        returnValue += ESC + y + 'B';
      }

      return returnValue;
    };

    ansiEscapes.cursorUp = function () {
      var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      return ESC + count + 'A';
    };

    ansiEscapes.cursorDown = function () {
      var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      return ESC + count + 'B';
    };

    ansiEscapes.cursorForward = function () {
      var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      return ESC + count + 'C';
    };

    ansiEscapes.cursorBackward = function () {
      var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      return ESC + count + 'D';
    };

    ansiEscapes.cursorLeft = ESC + 'G';
    ansiEscapes.cursorSavePosition = isTerminalApp ? '\u001B7' : ESC + 's';
    ansiEscapes.cursorRestorePosition = isTerminalApp ? '\u001B8' : ESC + 'u';
    ansiEscapes.cursorGetPosition = ESC + '6n';
    ansiEscapes.cursorNextLine = ESC + 'E';
    ansiEscapes.cursorPrevLine = ESC + 'F';
    ansiEscapes.cursorHide = ESC + '?25l';
    ansiEscapes.cursorShow = ESC + '?25h';

    ansiEscapes.eraseLines = count => {
      var clear = '';

      for (var i = 0; i < count; i++) {
        clear += ansiEscapes.eraseLine + (i < count - 1 ? ansiEscapes.cursorUp() : '');
      }

      if (count) {
        clear += ansiEscapes.cursorLeft;
      }

      return clear;
    };

    ansiEscapes.eraseEndLine = ESC + 'K';
    ansiEscapes.eraseStartLine = ESC + '1K';
    ansiEscapes.eraseLine = ESC + '2K';
    ansiEscapes.eraseDown = ESC + 'J';
    ansiEscapes.eraseUp = ESC + '1J';
    ansiEscapes.eraseScreen = ESC + '2J';
    ansiEscapes.scrollUp = ESC + 'S';
    ansiEscapes.scrollDown = ESC + 'T';
    ansiEscapes.clearScreen = '\u001Bc';
    ansiEscapes.clearTerminal = process.platform === 'win32' ? "".concat(ansiEscapes.eraseScreen).concat(ESC, "0f") : // 1. Erases the screen (Only done in case `2` is not supported)
    // 2. Erases the whole screen including scrollback buffer
    // 3. Moves cursor to the top-left position
    // More info: https://www.real-world-systems.com/docs/ANSIcode.html
    "".concat(ansiEscapes.eraseScreen).concat(ESC, "3J").concat(ESC, "H");
    ansiEscapes.beep = BEL;

    ansiEscapes.link = (text, url) => {
      return [OSC, '8', SEP, SEP, url, BEL, text, OSC, '8', SEP, SEP, BEL].join('');
    };

    ansiEscapes.image = function (buffer) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var returnValue = "".concat(OSC, "1337;File=inline=1");

      if (options.width) {
        returnValue += ";width=".concat(options.width);
      }

      if (options.height) {
        returnValue += ";height=".concat(options.height);
      }

      if (options.preserveAspectRatio === false) {
        returnValue += ';preserveAspectRatio=0';
      }

      return returnValue + ':' + buffer.toString('base64') + BEL;
    };

    ansiEscapes.iTerm = {
      setCwd: function setCwd() {
        var cwd = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : process.cwd();
        return "".concat(OSC, "50;CurrentDir=").concat(cwd).concat(BEL);
      },
      annotation: function annotation(message) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var returnValue = "".concat(OSC, "1337;");
        var hasX = typeof options.x !== 'undefined';
        var hasY = typeof options.y !== 'undefined';

        if ((hasX || hasY) && !(hasX && hasY && typeof options.length !== 'undefined')) {
          throw new Error('`x`, `y` and `length` must be defined when `x` or `y` is defined');
        }

        message = message.replace(/\|/g, '');
        returnValue += options.isHidden ? 'AddHiddenAnnotation=' : 'AddAnnotation=';

        if (options.length > 0) {
          returnValue += (hasX ? [message, options.length, options.x, options.y] : [options.length, message]).join('|');
        } else {
          returnValue += message;
        }

        return returnValue + BEL;
      }
    };

    var fs$2 = require('fs').promises;
    var path$2 = require('path');
    var emoji$1 = require('node-emoji');
    var promisify$2 = require('util').promisify;
    var sourceFile$2 = '', tmpdir$2 = '';
    //starts a local web server with the presentation
    var Server = /** @class */ (function (_super) {
        __extends(Server, _super);
        function Server() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Server.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var file, dir;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            //@todo read this values from a theme.json file
                            this.setColorTokens({
                                '*': 'yellow',
                                '#': 'cyan',
                                '@': 'green',
                                '|': 'brightRed'
                            });
                            file = '';
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 4, , 5]);
                            if (!(this.arg._.length == 0)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.ask("Please enter the filename with the presentation:")];
                        case 2:
                            file = _b.sent();
                            _b.label = 3;
                        case 3:
                            if (this.arg._.length > 0)
                                file = this.arg._.shift();
                            sourceFile$2 = path$2.join(process.cwd(), file);
                            return [3 /*break*/, 5];
                        case 4:
                            _b.sent();
                            sourceFile$2 = '';
                            return [3 /*break*/, 5];
                        case 5:
                            if (!(file == '' || sourceFile$2 == '')) return [3 /*break*/, 7];
                            this.x_console.out({ message: "|Error! No file given! Bye bye!|" });
                            return [4 /*yield*/, this.finish(304)];
                        case 6:
                            _b.sent();
                            _b.label = 7;
                        case 7:
                            this.presentation = new presentation(sourceFile$2);
                            _b.label = 8;
                        case 8:
                            _b.trys.push([8, 11, , 12]);
                            return [4 /*yield*/, fs$2.stat(sourceFile$2)];
                        case 9:
                            _b.sent();
                            dir = promisify$2(require('tmp').dir);
                            return [4 /*yield*/, dir()];
                        case 10:
                            tmpdir$2 = _b.sent();
                            //console.log('tmpdir',tmpdir); 
                            return [2 /*return*/, true];
                        case 11:
                            _b.sent();
                            this.log("Error: the given file doesn't exist");
                            return [2 /*return*/, false];
                        case 12: return [2 /*return*/];
                    }
                });
            });
        };
        Server.prototype.process = function () {
            return __awaiter(this, void 0, void 0, function () {
                var spinner, tunnel, server, liveUrl, random, reveal, options_, warnings, errPres_1, live, liveServer, express, app, serverLink, open, watch;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            spinner = this.x_console.spinner();
                            tunnel = require('localtunnel');
                            server = "http://127.0.0.1:3000";
                            liveUrl = "http://127.0.0.1:35729";
                            if (!this.arg.public) return [3 /*break*/, 5];
                            random = function (min, max) {
                                return Math.floor(Math.random() * (max - min + 1) + min);
                            };
                            //starts tunnel
                            spinner.start('preparing public access ..');
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            return [4 /*yield*/, tunnel({ port: 3000, subdomain: 'revelo' + random(100, 999) })];
                        case 2:
                            server = (_a.sent()).url;
                            spinner.text('preparing remote hot-reloading support');
                            return [4 /*yield*/, tunnel({ port: 35729, subdomain: 'revelo' + random(100, 999) })];
                        case 3:
                            liveUrl = (_a.sent()).url;
                            spinner.succeed('public access prepared! (hot-reloading disabled)');
                            return [3 /*break*/, 5];
                        case 4:
                            _a.sent();
                            spinner.fail('public access failed!');
                            return [3 /*break*/, 5];
                        case 5:
                            spinner.start('preparing presentation ..');
                            return [4 /*yield*/, this.presentation.baseReveal(tmpdir$2)];
                        case 6:
                            reveal = _a.sent();
                            //console.log(reveal); //@todo remove
                            spinner.text('generating presentation');
                            options_ = { hideInactiveCursor: true, pdfSeparateFragments: false };
                            _a.label = 7;
                        case 7:
                            _a.trys.push([7, 9, , 10]);
                            if (this.arg.autoplay)
                                options_ = _assign(_assign({}, options_), {
                                    video: true,
                                    autoSlide: true,
                                    progress: false,
                                    loop: true,
                                    controls: false,
                                    tps: this.arg.tps ? this.arg.tps : 'auto'
                                });
                            return [4 /*yield*/, this.presentation.createPresentation(liveUrl, reveal.presentation, options_)];
                        case 8:
                            warnings = _a.sent();
                            if (warnings.warnings.length > 0) {
                                spinner.warn('presentation generated with warnings:');
                                warnings.forEach(function (item) {
                                    _this.x_console.out({ color: 'yellow', message: "".concat(item.type, ": ").concat(item.text) });
                                });
                            }
                            else {
                                spinner.succeed('presentation ready');
                            }
                            return [3 /*break*/, 10];
                        case 9:
                            errPres_1 = _a.sent();
                            spinner.fail('presentation generation failed');
                            console.log(errPres_1);
                            return [3 /*break*/, 10];
                        case 10:
                            //monitor generated files for browser reload
                            spinner.start('starting server');
                            live = require('livereload');
                            liveServer = live.createServer();
                            liveServer.watch(reveal.path); //watch generated folder
                            express = require('express');
                            app = express();
                            app.use(express['static'](reveal.path));
                            app.use(express['static'](path$2.dirname(sourceFile$2))); //add md file within / public path as well
                            app.listen(3000);
                            serverLink = ansiEscapes.link(server, server);
                            spinner.succeed("server listening on #".concat(serverLink, "#"));
                            if (!((this.arg.browser && this.arg.browser == false) || typeof this.arg.browser === 'undefined')) return [3 /*break*/, 12];
                            open = require('open');
                            return [4 /*yield*/, open(server)];
                        case 11:
                            _a.sent();
                            _a.label = 12;
                        case 12:
                            watch = require('node-watch');
                            watch(path$2.dirname(sourceFile$2), {}, function (evt, name) { return __awaiter(_this, void 0, void 0, function () {
                                var err_1;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            spinner.start('file change detected! @updating@');
                                            _a.label = 1;
                                        case 1:
                                            _a.trys.push([1, 3, , 4]);
                                            return [4 /*yield*/, this.presentation.createPresentation(liveUrl, reveal.presentation, options_)];
                                        case 2:
                                            _a.sent();
                                            spinner.succeed('presentation #updated!#');
                                            return [3 /*break*/, 4];
                                        case 3:
                                            err_1 = _a.sent();
                                            spinner.fail('|error rendering update| check source file');
                                            this.debug('fail to update presentation', err_1);
                                            return [3 /*break*/, 4];
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); });
                            //detect abort process by user
                            process.on('SIGINT', function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            spinner.start('|EXIT detected|! Cleaning tmp files ..');
                                            //stops tunnel
                                            if (this.arg.public) ;
                                            //clean tmpdir
                                            return [4 /*yield*/, fs$2.rm(tmpdir$2, { recursive: true })];
                                        case 1:
                                            //clean tmpdir
                                            _a.sent();
                                            spinner.succeed("|exit ready!|, @have a nice day!@ ".concat(emoji$1.get('smile')));
                                            //exit
                                            this.finish(10);
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            return [2 /*return*/];
                    }
                });
            });
        };
        return Server;
    }(Command));

    var fs$1 = require('fs').promises;
    var path$1 = require('path');
    var emoji = require('node-emoji');
    //const helper = new Helper();
    var promisify$1 = require('util').promisify;
    var sleep = function (ms) { return new Promise(function (r) { return setTimeout(r, ms); }); };
    var sourceFile$1 = '', tmpdir$1 = '';
    //generates a Render file (PDF,MP4,GIF) from the given text presentation
    var Render = /** @class */ (function (_super) {
        __extends(Render, _super);
        function Render() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Render.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var file, dir;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            //@todo read this values from a theme.json file
                            this.setColorTokens({
                                '*': 'yellow',
                                '#': 'cyan',
                                '@': 'green',
                                '|': 'brightRed'
                            });
                            file = '';
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 4, , 5]);
                            if (!(this.arg._.length == 0)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.ask("Please enter the filename with the presentation:")];
                        case 2:
                            file = _b.sent();
                            _b.label = 3;
                        case 3:
                            if (this.arg._.length > 0)
                                file = this.arg._.shift();
                            sourceFile$1 = path$1.join(process.cwd(), file);
                            return [3 /*break*/, 5];
                        case 4:
                            _b.sent();
                            sourceFile$1 = '';
                            return [3 /*break*/, 5];
                        case 5:
                            if (this.arg.output && this.arg.output != '') {
                                this.targetFile = path$1.join(process.cwd(), this.arg.output);
                                this.targetFormat = this.arg.output.split('.').pop().toLowerCase().trim();
                            }
                            if (!this.arg.fps)
                                this.arg.fps = 15; //default fps
                            if (!this.arg.tps)
                                this.arg.tps = 'auto'; //default tps (10 secs)
                            if (!(file == '' || sourceFile$1 == '')) return [3 /*break*/, 7];
                            this.x_console.out({ message: "|Error! No file given! Bye bye!|" });
                            return [4 /*yield*/, this.finish(304)];
                        case 6:
                            _b.sent();
                            _b.label = 7;
                        case 7:
                            if (!['mp4', 'gif'].includes(this.targetFormat)) {
                                this.log("Error: the given output file extension (*.".concat(this.targetFormat, "*) is not currently supported (only: @.mp4@)"));
                                return [2 /*return*/, false];
                            }
                            this.presentation = new presentation(sourceFile$1);
                            this.spinner = this.x_console.spinner();
                            _b.label = 8;
                        case 8:
                            _b.trys.push([8, 11, , 12]);
                            return [4 /*yield*/, fs$1.stat(sourceFile$1)];
                        case 9:
                            _b.sent();
                            dir = promisify$1(require('tmp').dir);
                            return [4 /*yield*/, dir()];
                        case 10:
                            tmpdir$1 = _b.sent();
                            //detect abort process by user
                            process.on('SIGINT', function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            this.spinner.start('|EXIT detected|! Cleaning tmp files ..');
                                            //clean tmpdir
                                            return [4 /*yield*/, fs$1.rm(tmpdir$1, { recursive: true })];
                                        case 1:
                                            //clean tmpdir
                                            _a.sent();
                                            this.spinner.succeed("|exit ready!|, @have a nice day!@ ".concat(emoji.get('smile')));
                                            //exit
                                            this.finish(10);
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            //console.log('tmpdir',tmpdir); 
                            return [2 /*return*/, true];
                        case 11:
                            _b.sent();
                            this.log("Error: the given file doesn't exist");
                            return [2 /*return*/, false];
                        case 12: return [2 /*return*/];
                    }
                });
            });
        };
        Render.prototype.createReveal = function () {
            return __awaiter(this, void 0, void 0, function () {
                var reveal, options_, presentation_, errPres_1;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.spinner.start('preparing presentation ..');
                            return [4 /*yield*/, this.presentation.baseReveal(tmpdir$1)];
                        case 1:
                            reveal = _a.sent();
                            //console.log(reveal); //@todo remove
                            this.spinner.text('generating presentation');
                            options_ = { hideInactiveCursor: true, pdfSeparateFragments: false };
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            options_ = _assign(_assign({}, options_), {
                                video: true,
                                autoSlide: true,
                                progress: false,
                                controls: false,
                                loop: false,
                                downloadAssets: tmpdir$1,
                                fps: this.arg.fps,
                                tps: this.arg.tps,
                            });
                            return [4 /*yield*/, this.presentation.createPresentation('', reveal.presentation, options_, this.spinner)];
                        case 3:
                            presentation_ = _a.sent();
                            /*
                            this.presentation.on('convertToWebm:finish',(progress)=>{
                                this.spinner.text(`converting video ${progress.percent}%`);
                            });*/
                            if (presentation_.warnings.length > 0) {
                                this.spinner.warn('presentation generated with warnings:');
                                presentation_.forEach(function (item) {
                                    _this.x_console.out({ color: 'yellow', message: "".concat(item.type, ": ").concat(item.text) });
                                });
                            }
                            else {
                                this.spinner.succeed('presentation ready');
                                //this.debug('presentation debug',presentation_.meta);
                            }
                            return [2 /*return*/, { reveal: reveal, meta: presentation_.meta }];
                        case 4:
                            errPres_1 = _a.sent();
                            this.spinner.fail('presentation generation failed');
                            console.log(errPres_1);
                            return [2 /*return*/, { reveal: reveal }];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        Render.prototype.recordBrowser = function (url, time) {
            return __awaiter(this, void 0, void 0, function () {
                var puppeteer, PuppeteerScreenRecorder, exp_no_wait, browser, page, recorder, treekill;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            puppeteer = require('puppeteer');
                            PuppeteerScreenRecorder = require('puppeteer-screen-recorder').PuppeteerScreenRecorder;
                            exp_no_wait = [
                                '--enable-surface-synchronization',
                                '--run-all-compositor-stages-before-draw',
                                '--disable-threaded-animation',
                                '--disable-threaded-scrolling',
                                '--disable-checker-imaging',
                            ];
                            return [4 /*yield*/, puppeteer.launch({
                                    //args:minimal_args, 
                                    args: exp_no_wait,
                                    headless: true,
                                    //executablePath:codecs
                                })];
                        case 1:
                            browser = _a.sent();
                            return [4 /*yield*/, browser.newPage()];
                        case 2:
                            page = _a.sent();
                            return [4 /*yield*/, page.setViewport({
                                    width: this.arg.width ? this.arg.width : 800,
                                    height: this.arg.height ? this.arg.height : 600,
                                    deviceScaleFactor: 1
                                })];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36')];
                        case 4:
                            _a.sent();
                            recorder = new PuppeteerScreenRecorder(page, {
                                fps: this.arg.fps,
                                videoFrame: {
                                    width: this.arg.width ? this.arg.width : 800,
                                    height: this.arg.height ? this.arg.height : 600,
                                },
                                aspectRatio: this.arg.ratio ? this.arg.ratio : '4:3',
                            });
                            return [4 /*yield*/, sleep(50)];
                        case 5:
                            _a.sent();
                            return [4 /*yield*/, page.goto(url, {
                                    waitUntil: 'networkidle2'
                                })];
                        case 6:
                            _a.sent();
                            return [4 /*yield*/, recorder.start(this.targetFile)];
                        case 7:
                            _a.sent();
                            /*page.on('console', async msg=> {
                                this.debug('PAGE LOG:', {type:msg._type, text:msg._text }); // get console messages (@todo to check when video ends)
                            });*/
                            //idea2: goto next slide every x secs
                            page.bringToFront();
                            return [4 /*yield*/, sleep(time)];
                        case 8:
                            _a.sent(); //wait presentation duration
                            //end video recording
                            return [4 /*yield*/, recorder.stop()];
                        case 9:
                            //end video recording
                            _a.sent();
                            return [4 /*yield*/, browser.close()];
                        case 10:
                            _a.sent();
                            treekill = require('tree-kill');
                            treekill(browser.process().pid, 'SIGKILL');
                            return [2 /*return*/];
                    }
                });
            });
        };
        Render.prototype.convertToGif = function (mp4, output) {
            return __awaiter(this, void 0, void 0, function () {
                var ffmpeg, ffmpeg_bin, asPromise, down;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            ffmpeg = require('fluent-ffmpeg');
                            ffmpeg_bin = require('ffmpeg-static');
                            ffmpeg.setFfmpegPath(ffmpeg_bin);
                            asPromise = function () { return new Promise(function (resolve, reject) {
                                ffmpeg(mp4).outputOption("-filter_complex", "fps=".concat(_this.arg.fps, ",scale=").concat(_this.arg.width, ":-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=256[p];[s1][p]paletteuse=dither=bayer"))
                                    .on('error', function (err, stdout, stderr) {
                                    reject(err);
                                }).on('progress', function (progress) {
                                    //console.log(`${progress.percent}% done`);
                                }).on('end', function (err, stdout, stderr) {
                                    resolve(stdout);
                                }).save(output);
                            }); };
                            return [4 /*yield*/, asPromise()];
                        case 1:
                            down = _a.sent();
                            return [2 /*return*/, down];
                    }
                });
            });
        };
        Render.prototype.process = function () {
            return __awaiter(this, void 0, void 0, function () {
                var reveal_, reveal, express, app, time, kword, targetGIF, resize, buf, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this.targetFormat == 'mp4' || this.targetFormat == 'gif')) return [3 /*break*/, 10];
                            if (this.targetFormat == 'gif') {
                                this.arg.fps = (this.arg.fps) ? Math.max(this.arg.fps, 5) : 5;
                                this.arg.width = this.arg.width ? this.arg.width : 400;
                                this.arg.height = this.arg.height ? this.arg.height : 300;
                                this.targetFile = this.targetFile.replaceAll('.gif', '.mp4');
                            }
                            return [4 /*yield*/, this.createReveal()];
                        case 1:
                            reveal_ = _a.sent();
                            reveal = reveal_.reveal;
                            //start local server
                            this.spinner.start('preparing local server ..');
                            express = require('express'), app = express();
                            app.use(express['static'](reveal.path));
                            app.use(express['static'](path$1.dirname(sourceFile$1))); //add md file within / public path as well (for assets)
                            app.listen(3000);
                            this.spinner.succeed('local server ready');
                            time = (reveal_.meta && reveal_.meta.totalTime) ? reveal_.meta.totalTime : 10000;
                            kword = 'video';
                            if (this.targetFormat == 'gif')
                                kword = 'animation';
                            this.spinner.start("generating ".concat(Math.round(time / 1000), " secs ").concat(kword, " .."));
                            return [4 /*yield*/, this.recordBrowser('http://127.0.0.1:3000', time)];
                        case 2:
                            _a.sent();
                            this.spinner.succeed("generated ".concat(Math.round(time / 1000), " secs ").concat(kword));
                            if (!(this.targetFormat == 'gif')) return [3 /*break*/, 8];
                            this.spinner.start("creating gif animation ..");
                            targetGIF = this.targetFile.replaceAll('.mp4', '.gif');
                            return [4 /*yield*/, this.convertToGif(this.targetFile, targetGIF)];
                        case 3:
                            _a.sent();
                            this.spinner.text("optimizing gif ..");
                            resize = require('@gumlet/gif-resize');
                            return [4 /*yield*/, fs$1.readFile(targetGIF)];
                        case 4:
                            buf = _a.sent();
                            return [4 /*yield*/, resize({ optimizationLevel: 3, interlaced: true })(buf)];
                        case 5:
                            data = _a.sent();
                            //overwrite compressed gif
                            return [4 /*yield*/, fs$1.writeFile(targetGIF, data)];
                        case 6:
                            //overwrite compressed gif
                            _a.sent();
                            //erase original mp4 file
                            return [4 /*yield*/, fs$1.unlink(this.targetFile)];
                        case 7:
                            //erase original mp4 file
                            _a.sent();
                            //
                            this.spinner.succeed("gif ready!");
                            _a.label = 8;
                        case 8:
                            //clean & exit
                            this.spinner.start('|Finished|! Cleaning tmp files ..');
                            return [4 /*yield*/, fs$1.rm(tmpdir$1, { recursive: true })];
                        case 9:
                            _a.sent();
                            this.spinner.succeed("|ready!|, @have a nice day!@ ".concat(emoji.get('smile')));
                            //show meta table
                            if (reveal_.meta) {
                                console.log('\n');
                                this.x_console.table({
                                    title: 'Meta info',
                                    color: 'green',
                                    data: reveal_.meta.slides.map(function (item, idx) { return ({
                                        slide: idx + 1,
                                        secs: (item.time.time / 1000).toFixed(1),
                                        pictures: item.pictures,
                                        videos: item.videos,
                                    }); })
                                });
                            }
                            this.finish(10);
                            _a.label = 10;
                        case 10: return [2 /*return*/];
                    }
                });
            });
        };
        return Render;
    }(Command));

    var fs = require('fs').promises;
    var path = require('path');
    require('node-emoji');
    //const helper = new Helper();
    var promisify = require('util').promisify;
    var sourceFile = '', tmpdir = '';
    //generated a Export file (PPT,keynote etc) from the given text presentation
    var Export = /** @class */ (function (_super) {
        __extends(Export, _super);
        function Export() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Export.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var file, dir;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            //@todo read this values from a theme.json file
                            this.setColorTokens({
                                '*': 'yellow',
                                '#': 'cyan',
                                '@': 'green',
                                '|': 'brightRed'
                            });
                            file = '';
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 4, , 5]);
                            if (!(this.arg._.length == 0)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.ask("Please enter the filename with the presentation:")];
                        case 2:
                            file = _b.sent();
                            _b.label = 3;
                        case 3:
                            if (this.arg._.length > 0)
                                file = this.arg._.shift();
                            sourceFile = path.join(process.cwd(), file);
                            return [3 /*break*/, 5];
                        case 4:
                            _b.sent();
                            sourceFile = '';
                            return [3 /*break*/, 5];
                        case 5:
                            if (this.arg.output && this.arg.output != '') {
                                this.targetFile = path.join(process.cwd(), this.arg.output);
                                this.targetFormat = this.arg.output.split('.').pop().toLowerCase().trim();
                            }
                            if (!(file == '' || sourceFile == '')) return [3 /*break*/, 7];
                            this.x_console.out({ message: "|Error! No file given! Bye bye!|" });
                            return [4 /*yield*/, this.finish(304)];
                        case 6:
                            _b.sent();
                            _b.label = 7;
                        case 7:
                            if (!['mp4'].includes(this.targetFormat)) {
                                this.log("Error: the given output file extension (*.".concat(this.targetFormat, "*) is not currently supported (only: @.mp4@)"));
                                return [2 /*return*/, false];
                            }
                            this.presentation = new presentation(sourceFile);
                            _b.label = 8;
                        case 8:
                            _b.trys.push([8, 11, , 12]);
                            return [4 /*yield*/, fs.stat(sourceFile)];
                        case 9:
                            _b.sent();
                            dir = promisify(require('tmp').dir);
                            return [4 /*yield*/, dir()];
                        case 10:
                            tmpdir = _b.sent();
                            //console.log('tmpdir',tmpdir); 
                            return [2 /*return*/, true];
                        case 11:
                            _b.sent();
                            this.log("Error: the given file doesn't exist");
                            return [2 /*return*/, false];
                        case 12: return [2 /*return*/];
                    }
                });
            });
        };
        Export.prototype.createReveal = function () {
            return __awaiter(this, void 0, void 0, function () {
                var spinner, reveal, options_, warnings, errPres_1;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            spinner = this.x_console.spinner();
                            spinner.start('preparing presentation ..');
                            return [4 /*yield*/, this.presentation.baseReveal(tmpdir)];
                        case 1:
                            reveal = _a.sent();
                            //console.log(reveal); //@todo remove
                            spinner.text('generating presentation');
                            options_ = { hideInactiveCursor: true, pdfSeparateFragments: false };
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            if (this.arg.autoplay)
                                options_ = _assign(_assign({}, options_), {
                                    video: true,
                                    autoSlide: true,
                                    progress: false,
                                    loop: true,
                                    controls: false
                                });
                            return [4 /*yield*/, this.presentation.createPresentation('', reveal.presentation, options_)];
                        case 3:
                            warnings = _a.sent();
                            if (warnings.length > 0) {
                                spinner.warn('presentation generated with warnings:');
                                warnings.forEach(function (item) {
                                    _this.x_console.out({ color: 'yellow', message: "".concat(item.type, ": ").concat(item.text) });
                                });
                            }
                            else {
                                spinner.succeed('presentation ready');
                            }
                            return [3 /*break*/, 5];
                        case 4:
                            errPres_1 = _a.sent();
                            spinner.fail('presentation generation failed');
                            console.log(errPres_1);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/, reveal];
                    }
                });
            });
        };
        Export.prototype.process = function () {
            return __awaiter(this, void 0, void 0, function () {
                var reveal, express, app;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this.targetFormat == 'mp4')) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.createReveal()];
                        case 1:
                            reveal = _a.sent();
                            express = require('express'), app = express();
                            app.use(express['static'](reveal.path));
                            app.use(express['static'](path.dirname(sourceFile))); //add md file within / public path as well (for assets)
                            app.listen(3000);
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        return Export;
    }(Command));

    var cmds = {
        Server: Server,
        Render: Render,
        Export: Export
    };

    require('dotenv').config();
    /**
     * cmds:
     * grow:    search and send friend requests on your behalf (aka grow your network)
     * invite:  search by the given template within your existing network those that matches, and send them a chat message inviting them to a company
     * referr:  collect those of your network who are interested, grab their english PDF resume and send it to the specified referrer (ex. austin)
     * analyze: analyze existing members of your network that match the given template (extract github,age (by pic),chat history,experience,etc.)
     * tui:     terminal user interface, to manage bots and stats
     */
    var revelo = /** @class */ (function () {
        function revelo(arg) {
        }
        revelo.prototype.server = function (arg) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (new cmds.Server(arg)).run()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        revelo.prototype.render = function (arg) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (new cmds.Render(arg)).run()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        revelo.prototype.export = function (arg) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (new cmds.Export(arg)).run()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        __decorate([
            command("Creates a browser based presentation and starts a local web server", [
                ['-w', '--public', 'If defined, gives your machine a public url'],
                ['-q', '--no-browser', "If defined doesn't self open the default browser when ready"],
                ['-a', '--autoplay', "Hides controls and changes slides automatically, looping at the end"],
                ['-t', '--tps', "If --autoplay, define time per slide (in seconds, default: auto)"],
            ], '[file]')
        ], revelo.prototype, "server", null);
        __decorate([
            command("Renders the presentation in the defined output file", [
                ['-o', '--output', "Target output file. Supported extensions: .mp4, .gif (soon: .pdf, .zip)"],
                ['-w', '--width', "Width (default: 1024)"],
                ['-e', '--height', "Height (default: 768)"],
                ['-t', '--tps', "Time per slide (in seconds, default: auto)"],
                ['-f', '--fps', "Frames per second (default: 15)"],
                ['-r', '--ratio', "Aspect ratio (default: 4:3)"],
            ], '[file] [options]')
        ], revelo.prototype, "render", null);
        __decorate([
            command("Exports the presentation in the defined output file", [
                ['-o', '--output', "Target output file. Supported extensions: .ppt (soon: .key)"]
            ], '[file] [options]')
        ], revelo.prototype, "export", null);
        revelo = __decorate([
            cli
        ], revelo);
        return revelo;
    }());

    return revelo;

}));
