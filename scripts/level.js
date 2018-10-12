//1. Level Access
var _LevelAccess = (function() {
  var visibleLevels = JSON.parse(
    '{"0": true, "1": true, "2": false, "3": false, "4": false}'
  );
  var tempVisLvls = [
    {
      level: "0",
      pgid: "l1p1",
      isLevel: false
    },
    {
      level: "1",
      pgid: "l1p2",
      isLevel: true
    },
    {
      level: "2",
      pgid: "l2p1",
      isLevel: true
    },
    {
      level: "3",
      pgid: "l3p1",
      isLevel: true
    },
    {
      level: "4",
      id: 4,
      pgid: "l4p1",
      isLevel: true
    },
    {
      level: "5",
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
      if(typeof visLev != undefined && !_Common.IsEmptyObject(visLev)) {
        if(typeof visLev.intro != undefined) {
          delete visLev["intro"];
          delete visLev["level5"];
        }
        for(var i=0,j=Object.keys(visLev).length;i<=j;i++) {
          if(i == 0) {
            visLev[i] = true;
          } else if(typeof visLev["level" + i] !== 'undefined') {
            visLev[i] =  visLev["level" + i];
          }
          delete visLev["level" + i];
        }
      }
      
      visibleLevels = _Common.IsEmptyObject(visLev) ? visibleLevels : visLev;
    },
    // check level visibility according to settings
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
    // check if level attempt exided 
    IsLevelAttempted: function(_indx) {
      var pyes = false;
      var sessionData = _Module.Get();
      var launchData = _EconLabServiceManager.GetLaunchData();
      if (tempVisLvls[_indx].isLevel) {
        if (launchData.Mode != LaunchModes.review) {
          if (launchData.AllowedAttempts > 0 &&
              sessionData.attempts[sessionData.attempts.length-1].levels[tempVisLvls[_indx].level].attempted != undefined &&
              sessionData.attempts[sessionData.attempts.length-1].levels[tempVisLvls[_indx].level].attempted >= launchData.AllowedAttempts) {
            pyes = true;
          }
        }
      }
      return pyes;
    },
    // check if all levels attempted with visible levels
    IsAllLevelsAttempted: function() {
      var result = true;
      var _this = this;
      var Attempted = function(tmp) {
        for (var i = 1; i <= tmp.length - 1; i++) {
          if (_this.IsLevelVisible(tmp[i])) {
            if (!_this.IsLevelAttempted(i)) {
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
        for (var i = tmp.length - 1; i > 0; i--) {
          if (tmp[i].level === key+'') {
            do {
              i--;
            } while (i > 0 && _this.IsLevelVisible(tmp[i]) == false);
            var lvl = Number(tmp[i].level);
            gotopageid = _this.GetLevelPageId(lvl);
            break;
          }
        }
      };
      previous(tempVisLvls, thisLevel);
      return gotopageid;
    },
    JumpToNextAccessibleLevel: function(thisLevel) {
      debugger;
      var gotopageid = 0;
      var _this = this;
      var next = function(tmp, key) {
        for (var i = 0; i < tmp.length - 1; i++) {
          if (tmp[i].level === key) {
            do {
              i++;
            } while ((_this.IsLevelVisible(tmp[i]) == false || _this.IsLevelAttempted(i)) && i < tmp.length - 1);
            var lvl = tmp[i].level;
            gotopageid = _this.GetLevelPageId(lvl, true);
            break;
          }
        }
      };
      next(tempVisLvls, thisLevel+'');
      return gotopageid;
    },
    InitLevels: function() {
      debugger;
      var levelObject = visibleLevels;
      for (var i = 0; i < Object.keys(levelObject).length; i++) {
        //if (Object.keys(levelObject)[i] === i+'') {
        {
          //if (levelObject[Object.keys(levelObject)[i]] === false) {
          if (levelObject[i] === false) {
            $('.pgBgItem[data-level="' + i + '"]').addClass("l_disabled").attr({ "aria-disabled": "true" });
          } else {
            $('.pgBgItem[data-level="' + i + '"]').removeClass("l_disabled").removeAttr("aria-disabled");
          }
          if (levelObject[i] === false || this.IsLevelAttempted(i)) {
            $('.levelbtnretry[data-level="' + i + '"]').addClass("l_disabled").attr({ "aria-disabled": "true" });
          } else {
            $('.levelbtnretry[data-level="' + i + '"]').removeClass("l_disabled").removeAttr("aria-disabled");
          }
        }
      }
    }
  };
})();
