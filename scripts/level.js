//1. Level Access
var _LevelAccess = (function() {
  var visibleLevels = JSON.parse(
    '{"Intro": true, "level1": true, "level2": false, "level3": true, "level4": true }'
  );
  var tempVisLvls = [
    {
      level: "intro",
      pgid: "intro",
      isLevel: false
    },
    {
      level: "level1",
      pgid: "l1p1",
      isLevel: true
    },
    {
      level: "level2",
      pgid: "l2p1",
      isLevel: true
    },
    {
      level: "level3",
      pgid: "l3p1",
      isLevel: true
    },
    {
      level: "level4",
      id: 4,
      pgid: "l4p1",
      isLevel: true
    },
    {
      level: "summary",
      pgid: "summary",
      isLevel: false
    }
  ];

  return {
    GetLevelsData: function() {
      return levels;
    },
    SetLevelsData: function(lvlData) {
      levels = lvlData;
    },
    GetVisibleLevels: function() {
      return visibleLevels;
    },
    SetVisibleLevels: function(visLev) {
      visibleLevels = _Common.IsEmptyObject(visLev) ? visibleLevels : visLev;
    },
    IsLevelVisible: function(lvl) {
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
    IsLevelAttempted: function(_indx) {
      var pyes = false;

      var launchData = _EconLabServiceManager.GetLaunchData();
      if (tempVisLvls[_indx].isLevel) {
        if (launchData.Mode != LaunchModes.review) {
          if (
            launchData.AllowedAttempts > 0 &&
            TPIAttempts.Attempts[attLength - 1].levels[tempVisLvls[_indx].id]
              .attempted != undefined &&
            TPIAttempts.Attempts[attLength - 1].levels[tempVisLvls[_indx].id]
              .attempted >= launchData.AllowedAttempts
          ) {
            pyes = true;
          }
        }
      }
      return pyes;
    },
    IsAllLevelsAttempted: function() {
      var result = true;
      var _this = this;
      var Attempted = function(tmp) {
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
    GetLevelPageId: function(thisLevel, isNext) {
      var _nData = _Navigator.Get(),
        currPageId = 0;
      if (isNext) {
        for (var lvlObj in _nData) {
          if (
            _nData[lvlObj].datalevel == thisLevel &&
            _nData[lvlObj].isLevelStart == true
          ) {
            currPageId = _nData[lvlObj].pageId;
          }
        }
      } else {
        for (var lvlObj in _nData) {
          if (
            _nData[lvlObj].datalevel == thisLevel + 1 &&
            _nData[lvlObj].isLevelStart == true
          ) {
            currPageId = _nData[lvlObj].prevPageId;
          }
        }
      }
      return currPageId;
    },
    JumpToPreviousAvailableLevel: function(thisLevel) {
      var gotopageid = 0;
      var _this = this;
      debugger;
      var previous = function(tmp, key) {
        for (var i = tmp.length - 1; i > 1; i--) {
          if (tmp[i].level === key) {
            do {
              i--;
            } while (i > 0 && _this.IsLevelVisible(tmp[i]) == false);
            var lvl = Number(tmp[i].level.replace("level", ""));
            if (tmp[i].level == "intro") {
              lvl = 0;
            } else {
              gotopageid = _Navigator.GetLevelPageId(lvl);
            }
            break;
          }
        }
      };
      previous(tempVisLvls, thisLevel);

      //return gotopageid;
      _Navigator.LoadPage(gotopageid);
    },
    JumpToNextAccessibleLevel: function(thisLevel) {
      debugger;
      var gotopageid = 0;
      var _this = this;
      var next = function(tmp, key) {
        for (var i = 0; i < tmp.length - 2; i++) {
          if (tmp[i].level === key) {
            do {
              i++;
            } while (
              (_this.IsLevelVisible(tmp[i]) == false ||
                _this.IsLevelAttempted(i)) &&
              i < tmp.length - 2
            );
            var lvl = Number(tmp[i].level.replace("level", ""));
            if (tmp[i].level == "intro") {
              lvl = 0;
            } else {
              gotopageid = _Navigator.GetLevelPageId(lvl, true);
            }
            break;
          }
        }
      };
      next(tempVisLvls, thisLevel);
      //return gotopageid;
      _Navigator.LoadPage(gotopageid);
    },
    InitLevels: function() {
      var levelObject = visibleLevels;
      for (var i = 0; i < Object.keys(levelObject).length; i++) {
        if (Object.keys(levelObject)[i] === "level" + i) {
          if (levelObject[Object.keys(levelObject)[i]] === false) {
            $('div[data-level="' + i + '"]')
              .addClass("l_disabled")
              .attr({ "aria-disabled": "true" });
          } else {
            $('div[data-level="' + i + '"]')
              .removeClass("l_disabled")
              .removeAttr("aria-disabled");
          }
        }
      }
    }
  };
})();
