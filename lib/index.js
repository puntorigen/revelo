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
    var fs$1 = require('fs').promises;
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
                            return [4 /*yield*/, fs$1.access(file)];
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
                        case 0: return [4 /*yield*/, fs$1.readFile(file, 'utf-8')];
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
                            return [4 /*yield*/, fs$1.writeFile(file, data, 'utf-8', {
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
            console.log('\n');
            helper_.copyright();
            if (exitcode)
                process.exit(exitcode);
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

    var md = require('markdown-it')();
    var fs = require('fs').promises;
    var path = require('path');
    var promisify = require('util').promisify;
    var sourceFile = '', tmpdir = '';
    var slides = {};
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
                                '!': 'brightRed'
                            });
                            file = '';
                            if (!(this.arg._.length == 0)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.ask("Please enter the filename for the DB backup:")];
                        case 1:
                            file = _b.sent();
                            _b.label = 2;
                        case 2:
                            if (this.arg._.length > 0)
                                file = this.arg._.shift();
                            sourceFile = path.join(process.cwd(), file);
                            _b.label = 3;
                        case 3:
                            _b.trys.push([3, 6, , 7]);
                            return [4 /*yield*/, fs.stat(sourceFile)];
                        case 4:
                            _b.sent();
                            dir = promisify(require('tmp').dir);
                            return [4 /*yield*/, dir()];
                        case 5:
                            tmpdir = _b.sent();
                            console.log('tmpdir', tmpdir);
                            return [2 /*return*/, true];
                        case 6:
                            _b.sent();
                            this.log("Error: the given file doesn't exist");
                            return [2 /*return*/, false];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        Server.prototype.baseReveal = function () {
            return __awaiter(this, void 0, void 0, function () {
                var dl, asPromise, down, extract;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            dl = require('download-file-with-progressbar');
                            asPromise = function () { return new Promise(function (resolve, reject) {
                                dl('https://github.com/hakimel/reveal.js/archive/master.zip', {
                                    dir: tmpdir,
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
                            extract = require('extract-zip');
                            return [4 /*yield*/, extract(down.path, { dir: tmpdir })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, {
                                    path: tmpdir + "/reveal.js-master",
                                    presentation: path.join(tmpdir, 'reveal.js-master', 'index.html'),
                                    file: down.path
                                }];
                    }
                });
            });
        };
        Server.prototype.createPresentation = function (target) {
            return __awaiter(this, void 0, void 0, function () {
                var yaml, extractjs, mdSource, rendered, cheerio, $;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            slides = { slides: [], config: {} };
                            yaml = require('yaml');
                            extractjs = require('extractjs');
                            return [4 /*yield*/, fs.readFile(sourceFile, { encoding: 'utf-8' })];
                        case 1:
                            mdSource = _a.sent();
                            //init markdown plugins
                            md.use(require('markdown-it-front-matter'), function (x) { slides.config = yaml.parse(x); });
                            md.use(require('markdown-it-revealjs'), function () { });
                            md.use(require('markdown-it-task-lists'), function () { return ({ enabled: true }); }); // - [ ] task
                            md.use(require('markdown-it-emoji')); // ;)
                            md.use(require('markdown-it-video')); //@[youtube](codigo)
                            md.use(require('markdown-it-include'), { root: path.dirname(sourceFile) }); // !!!include(file.md)!!!
                            md.use(require('markdown-it-anchor').default);
                            md.use(require('markdown-it-table-of-contents'));
                            rendered = md.render(mdSource);
                            cheerio = require('cheerio');
                            $ = cheerio.load(rendered, { xmlMode: true, decodeEntities: false });
                            $('section section').each(function (idx, item) {
                                var item_ = $(this);
                                var content_ = item_.html();
                                // :::{cmd}
                                var extract = extractjs({ startExtract: "[", endExtract: "]" });
                                var pattern = extract(":::{[command]}[content]:::");
                                var ex = pattern.extract(content_);
                                if (ex.command) {
                                    if (ex.command == 'incremental') {
                                        item_.html(content_.replace(pattern.interpolate(ex), ex.content));
                                        item_.find('*').each(function (idx, item) {
                                            var item2_ = $(this);
                                            item2_.addClass('fragment');
                                        });
                                    }
                                }
                                //->[background](happy people)
                                extract = extractjs();
                                pattern = extract("-&gt;{command}({content})");
                                ex = pattern.extract(content_);
                                if (ex.command) {
                                    item_.html(content_.replace(pattern.interpolate(ex), '')); //erase directive
                                    if (ex.command == 'background') {
                                        if (ex.content.indexOf('http') == -1) {
                                            var encode = require('querystring').escape;
                                            item_.attr('data-background-image', "https://source.unsplash.com/random?".concat(encode(ex.content), "/1024x768"));
                                        }
                                        else {
                                            item_.attr('data-background-image', ex.content);
                                        }
                                    }
                                    else if (ex.command == 'background-color') {
                                        item_.attr('data-background-color', ex.content);
                                    }
                                }
                                //console.log('extraction',ex);
                            });
                            rendered = $.html();
                            this.x_console.out({ message: 'md rendered', data: { rendered: rendered, slides: slides } });
                            return [2 /*return*/];
                    }
                });
            });
        };
        Server.prototype.process = function () {
            return __awaiter(this, void 0, void 0, function () {
                var reveal;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            reveal = { presentation: 'x' };
                            return [4 /*yield*/, this.createPresentation(reveal.presentation)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return Server;
    }(Command));

    //generated a PDF file from the given text presentation
    var PDF = /** @class */ (function (_super) {
        __extends(PDF, _super);
        function PDF() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PDF.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    //@todo read this values from a theme.json file
                    this.setColorTokens({
                        '*': 'yellow',
                        '#': 'cyan',
                        '@': 'green',
                        '!': 'brightRed'
                    });
                    return [2 /*return*/, true];
                });
            });
        };
        PDF.prototype.process = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this.arg._.length == 0)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.ask("Please enter the filename for the DB backup:")];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            if (this.arg._.length > 0)
                                this.arg._.shift();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return PDF;
    }(Command));

    var cmds = {
        Server: Server,
        PDF: PDF
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
        revelo.prototype.pdf = function (arg) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (new cmds.PDF(arg)).run()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        __decorate([
            command("Creates a browser based presentation and starts a local web server", [], '[file]')
        ], revelo.prototype, "server", null);
        __decorate([
            command("Generates a PDF presentation", [], '[file]\t')
        ], revelo.prototype, "pdf", null);
        revelo = __decorate([
            cli
        ], revelo);
        return revelo;
    }());

    return revelo;

}));
