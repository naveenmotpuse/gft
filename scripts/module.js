var _Module = (function () {
    var _sessionData = {}
    var _attempt = {
        status:AttemptStatus.new, 
        bookmarkData:{}, 
        navigationData:{},
        levels: [{}, {}, {}, {}, {}],
    }   
    function save_session_data (_param_status) {
        var lastAttIndex = _sessionData.attempts.length-1;                
        _sessionData.attempts[lastAttIndex].status = _param_status;
        _sessionData.attempts[lastAttIndex].bookmarkData = _Navigator.GetBookmarkData();
        _sessionData.attempts[lastAttIndex].navigationData = _Navigator.GetNavigationData();
        _sessionData.attempts[lastAttIndex].ScenarioIndex = _Scenario.GetScenarioIndex();
        _sessionData.attempts[lastAttIndex].k_bookmarkData = _KnowdlServiceManager.GetBookmarking();
        _EconLabServiceManager.SaveSessionData(_sessionData)
    }
    return {
        Get: function() { 
            return _sessionData;
        },
        Init: function(){
            debugger;
            //Init Econ service launch and GetSettings
            //It calls webservice call to get launchdata, statedata and settings
            _EconLabServiceManager.InitLaunch();
            _EconLabServiceManager.InitSettings();
            _LevelAccess.SetVisibleLevels(_EconLabServiceManager.GetSettings());
            //Get SessionData from service manager.
            _sessionData = _EconLabServiceManager.GetSessionData()

            //Init Session Data
            if((typeof _sessionData == "undefined") || (typeof _sessionData == "string" && $.trim(_sessionData)=="")){
                _sessionData.attempts = [];
                _sessionData.attempts.push(_attempt)                        
            } else if(typeof _sessionData == "string"){
                _sessionData = JSON.parse(_sessionData);
                if(_sessionData.attempts == undefined || _sessionData.attempts.length<=0){
                    _sessionData.attempts = [];
                    _sessionData.attempts.push(_attempt)
                }
            } else if(_Common.IsEmptyObject(_sessionData)){
                _sessionData.attempts = [];
                _sessionData.attempts.push(_attempt)                
            } else {  
                var lastAttIndex = _sessionData.attempts.length-1                    
                _KnowdlServiceManager.InitLaunch(_EconLabServiceManager.GetLaunchData());
                _KnowdlServiceManager.InitBookmarking( _sessionData.attempts[lastAttIndex].k_bookmarkData)                
                _Navigator.InitBookmarkData(_sessionData.attempts[lastAttIndex].bookmarkData)
                _Navigator.InitNavigationData(_sessionData.attempts[lastAttIndex].navigationData);
                _Scenario.SetScenarioIndex(_sessionData.attempts[lastAttIndex].ScenarioIndex);                
            }
            if (_Settings.enableCache) {
                _Caching.InitAssetsCaching();
                _Caching.InitPageCaching();
            }
            _Scenario.ShuffleScenario();
            _Scenario.UpdateQuestionData();

            // to disable the levels on init
            _LevelAccess.InitLevels();
        },
        SaveSessionData: function(){                       
            if (_sessionData.attempts[_sessionData.attempts.length-1].status != AttemptStatus.complete) {
                save_session_data(AttemptStatus.inprogress);
            } 
        },
        PostFinalGrade: function () {            
            if (_sessionData.attempts[_sessionData.attempts.length-1].status != AttemptStatus.complete) {
                save_session_data(AttemptStatus.complete);
                var totalPoints = _Navigator.GetTotalScore()/100;
                var duration = _Navigator.GetTotalDuration();
                _EconLabServiceManager.PostFinalGrade(totalPoints, duration);
            }            
        },
        IncrementAttempted: function (levelNo) {
            //if (TPIData.Mode != LaunchModes.review) {
              var cLevel = _sessionData.attempts[_sessionData.attempts.length-1].levels[levelNo];
              if (cLevel.attempted === undefined) {
                cLevel.attempted = 0;
              }
              cLevel.attempted++;
            //}
        },
        EndLevel: function (level) {
            //if(!ReviewMode.isOn()){
              this.IncreamentAttempted(level);
              _KnowdlServiceManager.CompleteLevel("Level" + level);
            //}
          },
    };
})();


$(document).ready(function () {
    debugger;
    //always first in ready. should be called only once.
    var isIE11version = !!navigator.userAgent.match(/Trident.*rv\:11\./);
    if (/Edge/.test(navigator.userAgent) || isIE11version) {
        $('head').append('<link rel="stylesheet" href="styles/IE.css" type="text/css" />');
    }
    else if ((/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))) {
        $('head').append('<link rel="stylesheet" href="styles/firefox.css" type="text/css" />');
    }
    else {
        $('head').append('<link rel="stylesheet" href="styles/mainslider.css" type="text/css" />');
    }
    var arr = window.location.href.split("/");
    _EconLabServiceManager.SetSessionId(arr[arr.length - 2]);

    _Navigator.UpdateDefaultNData();
    _Template.LoadTopSlider();
    _Module.Init();
    //NM: Need to check
    var bookmarkdata = _Navigator.GetBookmarkData();
    var jsonObj = {};
    if (!_Common.IsEmptyObject(bookmarkdata) && bookmarkdata.pageId!=undefined) {
        jsonObj.isBookMark = true;
        jsonObj.bookmarkdata = bookmarkdata;
    }
    _Navigator.Start(jsonObj);
});