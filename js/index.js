"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var arrayglobal = undefined,
    arrayblank = [];
var time = undefined;
var started = 1;

var Cell = function (_React$Component) {
   _inherits(Cell, _React$Component);

   function Cell() {
      _classCallCheck(this, Cell);

      return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
   }

   Cell.prototype.invent = function invent() {
      this.props.update(this);
   };

   Cell.prototype.render = function render() {
      var _this2 = this;

      var alive = this.props.alive == true ? "#3366CC" : "#f8f8ff";
      return React.createElement("td", { onClick: function onClick() {
            return _this2.invent();
         }, className: "cell text-center", style: { background: alive } });
   };

   return Cell;
}(React.Component);

var Body = function (_React$Component2) {
   _inherits(Body, _React$Component2);

   function Body(props) {
      _classCallCheck(this, Body);

      var _this3 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

      _this3.state = {
         rows: 40,
         columns: 40,
         grid: [],
         time: 200,
         run: true,
         generations: 0
      };
      return _this3;
   }

   Body.prototype.componentDidMount = function componentDidMount() {
      var _this4 = this;

      time = setInterval(function () {
         return _this4.nextState();
      }, this.state.time);
   };

   Body.prototype.componentWillMount = function componentWillMount() {
      var local = [];
      for (var x = 0; x < this.state.rows; x++) {
         for (var y = 0; y < this.state.columns; y++) {
            var locale = Math.floor(Math.random() * 3);
            if (locale > 1) {
               local.push(x + ":" + y + ":" + "1");
            } else {
               local.push(x + ":" + y + ":" + "0");
            }
         }
      }
      arrayglobal = local;
      this.updateState();
   };
   //row={(item.split(":"))[0]} col={(item.split(":"))[1]}

   Body.prototype.updateState = function updateState() {
      this.setState({
         grid: arrayglobal
      });
   };

   Body.prototype.toggle = function toggle(i) {
      var qwe = arrayglobal[i].split(":");
      var needed = qwe[2];
      if (needed == "1") {
         arrayglobal[i] = qwe[0] + ":" + qwe[1] + ":0";
         this.updateState();
      } else {
         arrayglobal[i] = qwe[0] + ":" + qwe[1] + ":1";
         this.updateState();
      }
   };

   Body.prototype.log = function log() {
      console.log(this.state.grid);
   };

   Body.prototype.setTime = function setTime(n) {
      var _this5 = this;

      if (this.state.run == true) {
         clearInterval(time);
         this.setState({
            time: n
         });
         time = setInterval(function () {
            return _this5.nextState();
         }, this.state.time);
      } else {
         this.setState({
            time: n
         });
      }
   };

   Body.prototype.togglerun = function togglerun() {
      var _this6 = this;

      if (this.state.run == true) {
         clearInterval(time);
         this.setState({
            run: !this.state.run
         });
         started = 0;
      } else {
         time = setInterval(function () {
            return _this6.nextState();
         }, this.state.time);
         this.setState({
            run: !this.state.run
         });
         started = 1;
      }
   };

   Body.prototype.nextState = function nextState() {
      var dj = arrayglobal;
      var arrayshadow = dj;
      var nextarray = [];
      Object.freeze(arrayglobal);
      for (var i = 0; i < arrayshadow.length; i++) {
         var position = '';
         var nbors = 0;
         if (arrayshadow[i].split(":")[0] == "0" && arrayshadow[i].split(":")[1] == "0") {
            position = "top left";
         } else if (arrayshadow[i].split(":")[0] == "0" && arrayshadow[i].split(":")[1] == "39") {
            position = "top right";
         } else if (arrayshadow[i].split(":")[0] == "39" && arrayshadow[i].split(":")[1] == "0") {
            position = "down left";
         } else if (arrayshadow[i].split(":")[0] == "39" && arrayshadow[i].split(":")[1] == "39") {
            position = "down right";
         } else if (arrayshadow[i].split(":")[1] == "0") {
            position = "left";
         } else if (arrayshadow[i].split(":")[1] == "39") {
            position = "right";
         } else if (arrayshadow[i].split(":")[0] == "0") {
            position = "top";
         } else if (arrayshadow[i].split(":")[0] == "39") {
            position = "bottom";
         } else {
            position = "center";
         }

         switch (position) {
            case "center":
               if (arrayshadow[i + 40].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[i - 40].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[i + 1].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[i - 1].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[i + 39].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[i + 41].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[i - 41].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[i - 39].split(":")[2] == "1") {
                  nbors += 1;
               }
               break;
            case "top left":
               if (arrayshadow[40].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[1].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[41].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[39].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[79].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[1599].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[1560].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[1561].split(":")[2] == "1") {
                  nbors += 1;
               }
               break;
            case "top right":
               if (arrayshadow[38].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[79].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[0].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[1599].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[1598].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[78].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[40].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[1560].split(":")[2] == "1") {
                  nbors += 1;
               }
               break;
            case "down left":
               if (arrayshadow[0].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[1].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[39].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[1599].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[1561].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[1559].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[1520].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[1521].split(":")[2] == "1") {
                  nbors += 1;
               }
               break;
            case "down right":
               if (arrayshadow[1558].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[1559].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[1520].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[1598].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[1560].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[38].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[39].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[0].split(":")[2] == "1") {
                  nbors += 1;
               }
               break;
            case "left":
               if (arrayshadow[i + 40].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[i - 40].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[i + 1].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[i - 1].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[i + 41].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[i + 79].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[i + 39].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[i - 39].split(":")[2] == "1") {
                  nbors += 1;
               }
               break;
            case "right":
               if (arrayshadow[i + 40].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[i - 40].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[i + 1].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[i - 1].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[i - 41].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[i - 79].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[i + 39].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[i - 39].split(":")[2] == "1") {
                  nbors += 1;
               }
               break;
            case "top":
               if (arrayshadow[i + 40].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[i + 41].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[i + 39].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[i - 1].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[i + 1].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[i + 1560].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[i + 1559].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[i + 1561].split(":")[2] == "1") {
                  nbors += 1;
               }
               break;
            case "bottom":
               if (arrayshadow[i - 40].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[i - 41].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[i - 39].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[i - 1].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[i + 1].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[i - 1560].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[i - 1559].split(":")[2] == "1") {
                  nbors += 1;
               }
               if (arrayshadow[i - 1561].split(":")[2] == "1") {
                  nbors += 1;
               }
               break;
         }

         if (arrayshadow[i].split(":")[2] == "1") {
            if (nbors >= 2 && nbors <= 3) {
               nextarray[i] = arrayshadow[i].split(":")[0] + ":" + arrayshadow[i].split(":")[1] + ":" + arrayshadow[i].split(":")[2];
            } else {
               nextarray[i] = arrayshadow[i].split(":")[0] + ":" + arrayshadow[i].split(":")[1] + ":0";
            }
         } else {
            if (nbors == 3) {
               nextarray[i] = arrayshadow[i].split(":")[0] + ":" + arrayshadow[i].split(":")[1] + ":1";
            } else {
               nextarray[i] = arrayshadow[i].split(":")[0] + ":" + arrayshadow[i].split(":")[1] + ":0";
            }
         }
      }
      arrayglobal = nextarray;
      this.setState({
         generations: this.state.generations + 1
      });
      this.updateState();
   };

   Body.prototype.knockdown = function knockdown() {
      started = 0;
      arrayblank = [];
      clearInterval(time);
      var local = [];
      for (var x = 0; x < this.state.rows; x++) {
         for (var y = 0; y < this.state.columns; y++) {
            var locale = Math.floor(Math.random() * 2);
            if (locale > 1) {
               local.push(x + ":" + y + ":" + "1");
            } else {
               local.push(x + ":" + y + ":" + "0");
            }
         }
      }
      arrayglobal = local;
      this.updateState();
      this.setState({
         generations: 0,
         run: false
      });
      this.updateState();
   };

   Body.prototype.randomboard = function randomboard() {
      this.setState({
         run: false,
         generations: 0
      });
      this.knockdown();
      clearInterval(time);
      var local = [];
      for (var x = 0; x < this.state.rows; x++) {
         for (var y = 0; y < this.state.columns; y++) {
            var locale = Math.floor(Math.random() * 3);
            if (locale > 1) {
               local.push(x + ":" + y + ":" + "1");
            } else {
               local.push(x + ":" + y + ":" + "0");
            }
         }
      }

      arrayglobal = local;
      this.updateState();
   };

   Body.prototype.render = function render() {
      var _this7 = this;

      var table = this.state.grid.map(function (item, i) {
         var localneed = item.split(":")[2] == "1" ? true : false;
         return React.createElement(Cell, { alive: localneed, update: function update() {
               return _this7.toggle(i);
            } });
      }, this);
      return React.createElement(
         "div",
         null,
         React.createElement(
            "div",
            { className: "row text-center", id: "title" },
            "Conway's Game of Life by ",
            React.createElement(
               "a",
               { href: "https://www.github.com/zooll8", target: "_blank" },
               "Zooll"
            ),
            React.createElement("br", null),
            React.createElement(
               "a",
               { href: "https://github.com/zooll8/game-of-life", target: "_blank" },
               "See source code"
            )
         ),
         React.createElement(
            "div",
            { className: "board" },
            table
         ),
         React.createElement(
            "div",
            { className: "row text-center", id: "up" },
            React.createElement(
               "strong",
               null,
               "Generations: ",
               this.state.generations
            )
         ),
         React.createElement("br", null),
         React.createElement(
            "div",
            { className: "row text-center" },
            React.createElement(
               "button",
               { className: "btn btn-default", onClick: function onClick() {
                     return _this7.togglerun();
                  } },
               this.state.run ? "Pause" : "Run"
            ),
            "  ",
            React.createElement(
               "div",
               { className: "btn-group" },
               React.createElement(
                  "button",
                  { className: "btn btn-info", onClick: function onClick() {
                        return _this7.setTime(400);
                     } },
                  "Slow"
               ),
               "  ",
               React.createElement(
                  "button",
                  { className: "btn btn-primary", onClick: function onClick() {
                        return _this7.setTime(130);
                     } },
                  "Medium"
               ),
               "  ",
               React.createElement(
                  "button",
                  { className: "btn btn-danger", onClick: function onClick() {
                        return _this7.setTime(30);
                     } },
                  "Lightning"
               )
            ),
            "    ",
            React.createElement(
               "button",
               { className: "btn btn-success", onClick: function onClick() {
                     return _this7.randomboard();
                  } },
               "Seed"
            ),
            " ",
            React.createElement(
               "button",
               { className: "btn btn-warning", onClick: function onClick() {
                     return _this7.knockdown();
                  } },
               "Clear"
            )
         )
      );
   };

   return Body;
}(React.Component);

ReactDOM.render(React.createElement(Body, null), document.querySelector("#root"));