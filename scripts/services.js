var _KnowdlServiceManager = (function () {
    var _data = {}
    _data.CompletionStatus = "Inprogress";
    var _globals = {}

    //var _knowdlPostUrl = "http://dev.knowdl.com/diinteraction/process";
    var _knowdlPostUrl = window.location.protocol + "//stage1.knowdl.com/diinteraction/process"
    //var _knowdlPostUrl = "http://localhost:59541/diinteraction/process"

    var _levelstarttime = new Date();

    return {
        InitLaunch: function (_ldata, _settings) {
            if (_ldata.Mode.trim().toLowerCase() == LaunchModes.do) {
                _levelstarttime = _startTime;                
                _globals.DI_Id = _ldata.TargetId;
                _globals.DITitle = _ldata.TargetTitle;
                _globals.Assignment_Id = _ldata.ResourceId;
                _globals.AssignmentLocation = window.location.hostname;
                _globals.AssignmentTitle =_ldata.ResourceTitle;
                _globals.Student_Id = _ldata.Student_Id
                _globals.Session_Id = _ldata.SessionId;
                _globals.StudentName = _ldata.StudentFirstName + " " + _ldata.StudentLastName;
                _globals.Role = _ldata.Roles
                _globals.NumberOfAttempts = _ldata.AllowedAttempts;
                _globals.TargetPoints = _ldata.TargetPoints;
                _globals.LevelsAssigned = _settings;
                _globals.Mode = _ldata.Mode;

                this.PostLaunchData();
            }
        },
        InitLevel: function (lid) {
            if (_globals.Mode.trim().toLowerCase() == LaunchModes.do) {
                //init current level incomplete, set start time 
                _levelstarttime = new Date();
                _data.Level_Id = lid;
                _data.LevelStatus = "Inprogress";
            }
        },
        CompleteLevel: function (lid) {
            if (_globals.Mode.trim().toLowerCase() == LaunchModes.do) {
                //mark Prev level Complete and post data.
                if (_data.Level_Id != undefined && _data.Level_Id != "") {
                    if (_data.Level_Id == lid) {
                        _data.LevelStatus = "Complete";
                        _data.QDetails = {};
                        this.PostData();
                        _data.Level_Id = "";
                        _data.QDetails = {};
                    }
                }
            }
        },
        SendPageData: function (qObj) {
            //this method is called in UpdateAttemptMaxScore->UpdateUserAttempts to post question data
            //Need to call on pages where UpdateAttemptMaxScore is not called.
            if (_globals.Mode.trim().toLowerCase() == LaunchModes.do) {
                QDetails = {};
                if (qObj != undefined && qObj != null) {
                    QDetails.QId = qObj.QId;
                    QDetails.QText = qObj.QText;
                    QDetails.QTotal = qObj.QTotal;
                    QDetails.QPoints = qObj.QPoints;
                    if (QDetails.QTotal == undefined) {
                        QDetails.QTotal = 1;
                    }

                    QDetails.QScore = (Number(QDetails.QPoints) / Number(QDetails.QTotal)) * 100;
                    if (QDetails.QScore == undefined || QDetails.QScore == null) {
                        QDetails.QScore = 0;
                        QDetails.QPoints = 0;
                    } else {
                        QDetails.QScore = Number(Number(QDetails.QScore).toFixed(2));
                    }
                }
                _data.QDetails = QDetails;
                this.PostData();
            }
        },
        SetCompletion: function () {
            if (_globals.Mode.trim().toLowerCase() == LaunchModes.do) {
                _data.QDetails = {};
                _data.CompletionStatus = "Complete";
                this.PostData(false);
            }
        },
        InitBookmarking: function (kBookmarking) {
            if (_globals.Mode.trim().toLowerCase() == LaunchModes.do) {
                if (kBookmarking != undefined) {
                    _data.Level_Id = kBookmarking.Level_Id;
                    _data.LevelStatus = kBookmarking.LevelStatus;
                }
            }
        },
        GetBookmarking: function () {
            var bookmarkData = {};
            bookmarkData.Level_Id = _data.Level_Id;
            bookmarkData.LevelStatus = _data.LevelStatus;
            return bookmarkData;
        },
        GetLevelIndexFromId: function (levelid) {
            var idx = 0;
            switch (levelid) {
                case "Level1":
                    idx = 1;
                    break;
                case "Level2":
                    idx = 2;
                    break;
                case "Level3":
                    idx = 3;
                    break;
            }
            return idx;
        },
        PostLaunchData: function (p_async) {
            var _async = true;
            if (_globals.Mode.trim().toLowerCase() == LaunchModes.do) {
                if (p_async != undefined && p_async == false) {
                    _async = false;
                }
                var jsonSerialized = JSON.stringify(_globals);
                //replace special characters.
                jsonSerialized = jsonSerialized.replace(/[^a-zA-Z ',"<>!~@#$%&*.+-=|\?()\[\]_{}\\ ]/g, "");
                var servcUrl = _knowdlPostUrl + "?command=launch";
                $.ajax({
                    type: "POST",
                    async: _async,
                    url: servcUrl,
                    data: {
                        jsondata: jsonSerialized
                    },
                    success: function (result) {
                        //Data posted successfully
                    },
                    error: function (error) {

                    }
                });
            }
        },
        PostData: function (p_async) {
            var _async = true;
            if (_globals.Mode.trim().toLowerCase() == LaunchModes.do) {
                if (p_async != undefined && p_async == false) {
                    _async = false;
                }
                _data.DI_Id = _globals.DI_Id;
                _data.Assignment_Id = _globals.Assignment_Id;
                _data.Student_Id = _globals.Student_Id;
                _data.AssignmentLocation = _globals.AssignmentLocation;

                var currTime = new Date();
                _data.LevelTimeSpent = parseInt((currTime.getTime() - _levelstarttime.getTime()) / 1000);
                if (_data.QDetails != undefined) {
                    if (_data.QDetails.QId != undefined) {
                        _data.QDetails.QTimeSpent = parseInt((currTime.getTime() - _levelstarttime.getTime()) / 1000);
                    }
                }

                //Reset level start time 
                _levelstarttime = currTime;

                //Get Level Points
                var idx = this.GetLevelIndexFromId(_data.Level_Id)
                _data.LevelPoints = g_userScore.GetLevelScore(idx)

                //Calculate level score
                var l_allLevels = _LevelAccess.GetAllLevelsArray();
                _data.LevelScore = (g_userScore.GetLevelScore(idx) / l_allLevels[idx].totQs) * 100;

                _data.OverallTimeSpent = parseInt((new Date().getTime() - _startTime.getTime()) / 1000) + g_TPIDuration;
                _data.OverallScore = g_userScore.GetTotalScore();
                //calculate overall points
                var arrScore = g_userScore.GetScoreArray();
                var total = 0;
                for (var i = 0; i < arrScore.length; i++) {
                    total += arrScore[i];
                }
                _data.OverallPoints = total;
                //end

                if (_data.LevelScore == undefined || _data.LevelScore == null || isNaN(parseFloat(_data.LevelScore))) {
                    _data.LevelScore = 0;
                    _data.LevelPoints = 0;
                } else {
                    _data.LevelScore = Number(Number(_data.LevelScore).toFixed(2));
                }

                var jsonSerialized = JSON.stringify(_data);
                //replace special characters.
                jsonSerialized = jsonSerialized.replace(/[^a-zA-Z ',"<>!~@#$%&*.+-=|\?()\[\]_{}\\ ]/g, "").replace(/&/g, '%26');
                var servcUrl = _knowdlPostUrl + "?command=updateleveldata";
                $.ajax({
                    type: "POST",
                    async: _async,
                    url: servcUrl,
                    data: {
                        jsondata: jsonSerialized
                    },
                    success: function (result) {
                        //Data posted successfully
                    },
                    error: function (error) {

                    }
                });

                //reset Q Details
                _data.QDetails = {}
            }
        }
    };
})();

var _EconLabServiceManager = (function () {
    var _serviceurl = window.location.origin + "/econservice";
    var _settingsData = JSON.parse('{}');
    var _launchData = {
        SessionId: '',
        Student_Id: '',      
        StudentFirstName:'',
        StudentLastName:'',
        Mode: 'do',
        Roles: '',
        CurrentQuestion: '',
        TargetId: '',
        TargetTitle:'',
        ResourceId: '',
        ResourceTitle:'',
        TargetPoints: 1,
        AllowedAttempts: 0
    }
      
    var _sessionState = {}
    //Private functions
    function _grade_problem_and_report(_data) {
        if (_launchData.Mode.trim().toLowerCase() == LaunchModes.do) {
            var jsonSerialized = JSON.stringify(_data);
            var servcUrl = _serviceurl + "/gldata/grade_problem_and_report/" + _launchData.SessionId + "/" + _launchData.TargetId + "/";
            $.ajax({
                type: "POST",
                url: servcUrl,
                data: jsonSerialized,
                success: function (result) {
                    console.log("post grade success")
                },
                error: function (error) {
                    console.log("post grade failed: error - - status:" + error.status + " statusText:" + error.statusText)
                }
            });
        }
    }
    function _get_settings() {        
        var obj = {};
        obj.knowdlresourceid = _launchData.ResourceId;
        obj.knowdltargetapp = _launchData.TargetId;

        var jsonSerialized = JSON.stringify(obj);
        var servcUrl = _serviceurl + "/data/econ/inflation/getInflationSettings/";
        $.ajax({
            type: "POST",
            url: servcUrl,
            async: false,
            data: jsonSerialized,
            success: function (result) {
                console.log("get settings success")   
                _EconLabServiceManager.GetSettingsSuccessCallback(result);                
            },
            error: function (error) {
                console.log("get settings failed: error - status:" + error.status + " statusText:" + error.statusText);
            }
        });        
    }    
    function _get_session_data() {
        var servcUrl = _serviceurl + "/gldata/get_session_data/" + _launchData.SessionId + "/";
        $.ajax({
            type: "GET",
            url: servcUrl,
            dataType: "json",
            async: false,
            cache: false,
            success: function (result) {
                console.log("get session data success")
                _EconLabServiceManager.GetSessionDataSuccessCallback(result)                                
            },
            error: function (error) {
                console.log("get session data failed: error - status:" + error.status + " statusText:" + error.statusText);
            }
        });
    }
    function _put_session_state_data(_data) {
        if (_launchData.Mode.trim().toLowerCase() == LaunchModes.do) {
            var jsonSerialized = JSON.stringify(_data);
            //replace special characters.
            jsonSerialized = jsonSerialized.replace(/[^a-zA-Z ',"<>!~@#$%&*.+-=|\?()\[\]_{}\\ ]/g, "");
            var servcUrl = _serviceurl + "/gldata/put_session_state_data/" + _launchData.SessionId + "/";
            $.ajax({
                type: "POST",
                url: servcUrl,
                data: jsonSerialized,
                success: function (result) {
                    console.log("post session data success")
                },
                error: function (error) {
                    console.log("post session data failed: error- status:" + error.status + " statusText:" + error.statusText);
                }
            });
        }
    }    
    //end Private Functions

    return {        
        InitLaunch: function () {
            _get_session_data();
        },
        InitSettings: function(){
            _get_settings();
        },   
        SetSessionId: function(sid) {
            _launchData.SessionId = sid;
        },
        GetSessionDataSuccessCallback: function(_data){
            if(typeof _data != "undefined"){
                if(typeof _data == "string" && $.trim(_data)!=""){
                    _data = JSON.parse(_data);
                }
                if(_data.launch_data!=undefined){
                    //Init Launch Data  
                    _launchData.Student_Id  = _data.launch_data.user_id            
                    _launchData.StudentFirstName = _data.launch_data.custom_firstname;
                    _launchData.StudentLastName = _data.launch_data.custom_lastname;
                    _launchData.Mode = _data.launch_data.custom_mode;
                    _launchData.Roles = _data.launch_data.roles;          
                    _launchData.CurrentQuestion = _data.launch_data.custom_currentquestion;            
                    _launchData.ResourceId = _data.launch_data.custom_resource_id;
                    _launchData.ResourceTitle = _data.launch_data.custom_assignmenttitle;
                    _launchData.AllowedAttempts = _data.launch_data.custom_attemptsallowed;
                    _launchData.TargetId = _data.launch_data['custom_target_' + _data.launch_data.custom_currentquestion];
                    _launchData.TargetTitle = _data.launch_data['custom_questiontitle_' + _data.launch_data.custom_currentquestion];
                    _launchData.TargetPoints = _data.launch_data['custom_points_' + _data.launch_data.custom_currentquestion];
                    _sessionState = _data.session_state;
                }
            }
        },
        GetSettingsSuccessCallback: function(_data){
            if(typeof _data != "undefined"){
                if(typeof _data == "string" && $.trim(_data)!=""){
                    _data = JSON.parse(_data);
                }
                _settingsData = _data;
            }
        },        
        SaveSessionData: function(_data){            
            if (_launchData.Mode.trim().toLowerCase() == LaunchModes.do) {  
                _put_session_state_data(_data); 
            }
        },
        PostFinalGrade: function (_p_totalPoints,_p_duration) {
            if (_launchData.Mode.trim().toLowerCase() == LaunchModes.do) {  
                var studentdata = {};
                studentdata.score = (Number(_p_totalPoints) * Number(_launchData.TargetPoints)).toFixed(2);
                studentdata.duration = Number(_p_duration);
                studentdata.submissionCount = 1;
                studentdata.nAttempts = 1;
                studentdata.answers = "1";
                studentdata.problemNumber = _launchData.CurrentQuestion;
                _grade_problem_and_report(studentdata);
            }
        },
        get_Url: function () {
            return _serviceurl;
        },
        GetSettings: function () {
            return _settingsData;
        },
        GetLaunchData: function () {
            return _launchData;
        },
        GetSessionData: function () {
            return _sessionState;
        }
    }
})();