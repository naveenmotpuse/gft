var KnowdlTracking = (function () {
    var _data = {}
    _data.CompletionStatus = "Inprogress";
    var _globals = {}

    //var _knowdlPostUrl = "http://dev.knowdl.com/diinteraction/process";
    var _knowdlPostUrl = window.location.protocol + "//stage1.knowdl.com/diinteraction/process"
    //var _knowdlPostUrl = "http://localhost:59541/diinteraction/process"

    var _levelstarttime = new Date();

    return {
        InitLaunch: function () {
            if (TPIData.Mode.trim().toLowerCase() == LaunchMode.do) {
                _levelstarttime = _startTime;

                //_globals.DI_Id = TPIData.SessionData.launch_data["context_id"];
                _globals.DI_Id = TPIData.SessionData.launch_data['custom_target_' + TPIData.SessionData.launch_data.custom_currentquestion];
                _globals.DITitle = TPIData.SessionData.launch_data["custom_questiontitle_" + TPIData.SessionData.launch_data.custom_currentquestion];
                _globals.Assignment_Id = TPIData.SessionData.launch_data["custom_resource_id"];
                _globals.AssignmentLocation = window.location.hostname;
                _globals.AssignmentTitle = TPIData.SessionData.launch_data["custom_assignmenttitle"];
                _globals.Student_Id = TPIData.SessionData.launch_data["user_id"];
                _globals.Session_Id = TPIData.SessionId;
                _globals.StudentName = TPIData.SessionData.launch_data["custom_firstname"] + " " + TPIData.SessionData.launch_data["custom_lastname"];
                _globals.Role = TPIData.SessionData.launch_data["roles"];
                _globals.NumberOfAttempts = TPIData.SessionData.launch_data["custom_attemptsallowed"];
                _globals.TargetPoints = TPIData.SessionData.launch_data["custom_points_" + TPIData.SessionData.launch_data.custom_currentquestion];
                _globals.LevelsAssigned = visibleLevels;

                this.PostLaunchData();
            }
        },
        InitDefaultLaunch: function () {
            _globals.DI_Id = "knowdl_local_DS";
            _globals.DITitle = "Demand and Supply";
            _globals.Assignment_Id = "Assignment_Local_DS";
            _globals.AssignmentLocation = window.location.hostname;
            _globals.AssignmentTitle = "Knowdl Test";
            _globals.Student_Id = "Student_Local";
            _globals.StudentName = "Knowdl User";
            _globals.Role = "Student";
            _globals.Session_Id = TPIData.SessionId;
            _globals.NumberOfAttempts = 0
            _globals.TargetPoints = 1
            _globals.LevelsAssigned = visibleLevels;

            this.PostLaunchData();
        },
        InitLevel: function (lid) {
            if (TPIData.Mode.trim().toLowerCase() == LaunchMode.do) {
                //init current level incomplete, set start time 
                _levelstarttime = new Date();
                _data.Level_Id = lid;
                _data.LevelStatus = "Inprogress";
            }
        },
        CompleteLevel: function (lid) {
            if (TPIData.Mode.trim().toLowerCase() == LaunchMode.do) {
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
            if (TPIData.Mode.trim().toLowerCase() == LaunchMode.do) {
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
            if (TPIData.Mode.trim().toLowerCase() == LaunchMode.do) {
                _data.QDetails = {};
                _data.CompletionStatus = "Complete";
                this.PostData(false);
            }
        },
        InitBookmarking: function () {
            if (TPIData.Mode.trim().toLowerCase() == LaunchMode.do) {
                if (TPIAttempts.Attempts[TPIAttempts.Attempts.length - 1].kBookmarking != undefined) {
                    _data.Level_Id = TPIAttempts.Attempts[TPIAttempts.Attempts.length - 1].kBookmarking.Level_Id;
                    _data.LevelStatus = TPIAttempts.Attempts[TPIAttempts.Attempts.length - 1].kBookmarking.LevelStatus;
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
            if (TPIData.Mode.trim().toLowerCase() == LaunchMode.do) {
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
            if (TPIData.Mode.trim().toLowerCase() == LaunchMode.do) {
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
                var l_allLevels = LevelAccess.GetAllLevelsArray();
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