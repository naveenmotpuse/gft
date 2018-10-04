//1. Level Access
var LevelAccess = (function () {
  var visibleLevels = JSON.parse('{"Intro": true, "level1": true, "level2": true, "level3": true, "level4": true }');
  var tempVisLvls = [
    {
      level: "intro", //datalevel
      pgid: 'intro',
      isLevel: true,
    }, {
      level: "level1",
      pgid: 'l1p1',
      isLevel: true,
    }, {
      level: "level2",
      pgid: 'l2p1',
      isLevel: true,
    }, {
      level: "level3",
      pgid: 'l3p1',
      isLevel: true,
    }, {
      level: "level4",
      id: 4,
      pgid: 'l4p1',
      isLevel: true,
    }, { 
      level: "summary",
      pgid: 'summary',
      isLevel: false,
    }];

  return {
    GetVisibleLevels: function() {
      return visibleLevels;
    },
    SetVisibleLevels: function(visLev) {
      visibleLevels = _Common.IsEmptyObject( visLev ) ? visibleLevels:visLev;
    },
    IsLevelVisible: function (lvl) {
      for (var key in visibleLevels) {
        if (visibleLevels.hasOwnProperty(key)) {
          if (key == lvl.level) {
            return visibleLevels[key];
            break;
          }
        }
      }
      return false;
    },
  IsLevelAttempted: function (_indx) {
      var pyes = false;
      if (tempVisLvls[_indx].isLevel) {
        if (TPIData.Mode != LaunchMode.review) {
          if (TPIData.AllowedAttempts > 0 &&
              TPIAttempts.Attempts[attLength - 1].levels[tempVisLvls[_indx].id].attempted != undefined &&
              TPIAttempts.Attempts[attLength - 1].levels[tempVisLvls[_indx].id].attempted >= TPIData.AllowedAttempts) {
            pyes = true;
          }
        }
      }
      return pyes;
    },
    IsAllLevelsAttempted: function () {
      var result = true;
      var _this = this;
      var Attempted = function (tmp) {
        for (var i = 1; i <= tmp.length - 1; i++) {
          if (_this.IsLevelVisible(tmp[i])) {
            if (!this.IsLevelAttempted(i)) {
              result = false;
              break;
            }
          }
        }
      };
      Attempted(tempVisLvls);
      return result;
    },
    JumpToPreviousAvailableLevel: function (thisLevel) {
      var gotopageid = 0;
      var _this = this;

      var previous = function (tmp, key) {
        for (var i = tmp.length - 1; i > -1; i--) {
          if (tmp[i].level === key) {
            do {
              i--;
            } while (i > 0 && (_this.IsLevelVisible(tmp[i]) == false));
            var lvl = Number(tmp[i].level.replace("level", ""));
            if (tmp[i].level == "intro") {
              lvl = 0;
            }
            if (tmp[i].level == "start") {
              gotopageid = 3;
            } else {
              gotopageid = this.GetLastPageId(lvl);
            }
            break;
          }
        }
      };
      previous(tempVisLvls, thisLevel);

      return gotopageid;
    },
    JumpToNextAccessibleLevel: function (thisLevel) {
      var gotopageid = 0;
      var _this = this;
      var next = function (tmp, key) {
        for (var i = 0; i < tmp.length - 1; i++) {
          if (tmp[i].level === key) {
            do {
              i++;
            } while ((_this.IsLevelVisible(tmp[i]) == false || this.IsLevelAttempted(i)) && i < tmp.length - 1);
            gotopageid = tmp[i].pgid;
            break;
          }
        }
      };
      next(tempVisLvls, thisLevel);
      return gotopageid;
    },
    
  };

})();