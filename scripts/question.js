var _Question = (function () {
    var _currentQuestionObj = {}

    function OnQuestionLoad(qObj) {
        _CustomQuestion.OnQuestionLoad();
        if (_currentQuestionObj.isAnswered) {
            _Question.PrevAnswer();
        }
        debugger;
        _Question.SetOptionPosition();
    }
    return {
        Load: function (qObj, jsonObj) {
            if (jsonObj == undefined) {
                jsonObj = {};
            }
            var currPage = _Navigator.GetCurrentPage();
            var firstQuestion = "";
            for (var i = 0; i < currPage.questions.length; i++) {
                currPage.questions[i].isCurrent = false;
                // currPage.questions[i].isAnswered = true;
                if (i == 0) {
                    firstQuestion = currPage.questions[i].Id;
                }

            }
            qObj = $.extend(qObj, _QData[qObj.Id]);
            _currentQuestionObj = qObj;
            qObj.isCurrent = true;

            var pageUrl = _Settings.dataRoot + qObj.dataurl + _Caching.GetUrlExtension();
            if (jsonObj.disableEffect != undefined && jsonObj.disableEffect) {
                $("#div_question").load(pageUrl, function () {
                    OnQuestionLoad(qObj);
                    if (firstQuestion == _currentQuestionObj.Qid) {
                        setReader("pageheading");
                    }
                    else {
                        setReader("question");
                    }

                });
            } else {
                $("#div_question").load(pageUrl, function () {
                    $(this).hide().fadeIn("slow", function () {
                        OnQuestionLoad(qObj);
                        $(".progress .background").focus();
                        if (firstQuestion == _currentQuestionObj.Qid) {
                            setReader("pageheading");
                        }
                        else {
                            setReader("question");
                        }
                    })
                });
            }
            if (_currentQuestionObj.isAnswered == undefined || !_currentQuestionObj.isAnswered) {
                $("#linknext").k_disable();
            } else {
                $("#linknext").k_enable();
            }
        },
        SetOptionPosition: function () {
            var widthincr = 0;
            var leftincr = 0;
            var topincr = 0;
            debugger;
            var elmarray = $("input[type='number']");
            if (elmarray.length > 0) {
                for (var i = 0; i <elmarray.length; i++) {
                    var id = $(elmarray[i]).attr("id");
                    $( "#" + id).clone().appendTo( ".question_txt" );
                    $("#" + id).replaceWith("<span id='" + id + "span'></span>");
                    //
                    var d_width = $("#" + id).outerWidth();
                    $("#" + id + "span").css({
                        width: d_width + widthincr,
                        display: "inline-block",
                        height:"18px",
                        padding:"3px 0"
                    })
                    var d_pos = $("#" + id + "span").position();
                    $("#" + id).css({
                        position: "absolute",
                        left: d_pos.left + leftincr,
                        top: d_pos.top + topincr
                    }).k_show();
                    if (_currentQuestionObj.type == "graph"){
                        $("#actionbtndiv").css({
                            position: "absolute",
                            left: d_pos.left + leftincr,
                            top: d_pos.top + topincr + 110
                        });
                    }
                }
            }  
                      
        },
        Next: function () {
            var currPage = _Navigator.GetCurrentPage();
            for (var i = 0; i < currPage.questions.length; i++) {
                if ((_currentQuestionObj.Id == currPage.questions[i].Id) && i < (currPage.questions.length - 1)) {
                    this.UnloadFeedback()
                    $(".btncheckanswer").k_enable();
                    this.Load(currPage.questions[i + 1]);
                    currPage.questions[i + 1].isQuestionVisit = true;
                    break;
                }
            }
        },
        Prev: function () {
            var currPage = _Navigator.GetCurrentPage();
            for (var i = 0; i < currPage.questions.length; i++) {
                if ((_currentQuestionObj.Id == currPage.questions[i].Id) && (i != 0)) {
                    this.Load(currPage.questions[i - 1]);
                    currPage.questions[i].isQuestionVisit = false;
                    $("#linknext").k_enable();
                    break;
                }
            }
        },
        Retry: function () {
            this.UnloadFeedback()
            $(".btncheckanswer").k_enable();
            $("#div_question").find("input[type='text'].incorrect").val("").k_enable();
            $("#div_question").find("input[type='number']").val("").k_enable();
            $(".questionband").find("input[type='radio']").k_enable();
            $(".questionband").find("input[type='radio']").prop('checked', false);
            if (_currentQuestionObj.type == "graph") {
                $("#div_question").find("input.inlineinput").k_enable();
                $("body").animate({
                    scrollTop: $("#div_question").find("input[type='number']:first").position().top - _Settings.topMargin
                }, 1000);
                $("#div_question").find("input.inlineinput:first").focus();
            } else {
                $("body").animate({
                    scrollTop: $("#div_question .question_img").position().top - _Settings.topMargin
                }, 1000);
                $("#div_question").find("input[type='number'].incorrect:first").focus();
            }

            $(".incorrect").removeClass("incorrect");
        },
        UnloadFeedback: function () {
            //$("#div_feedback").empty().hide();
            $("#div_feedback").fadeOut("slow", function () {
                $("#div_feedback").empty();
                $("#div_feedback").attr("aria-hidden", "true")

            })
            $("#div_feedback").css("margin-top", "0px");
        },
        Loadfeedback: function (fId) {
            var fdbkUrl = _Settings.dataRoot + _currentQuestionObj.feedback[fId] + _Caching.GetUrlExtension();
            $("#div_feedback").k_show();
            $("#div_feedback").load(fdbkUrl, function () {
                _Question.SetFeedbackTop()
                _CustomQuestion.OnFeedbackLoad()
                $("body").animate({
                    scrollTop: $(document).height()
                }, 1000);
            });
        },
        LoadAlertFeedback: function () {
            var fdbkUrl = _Settings.dataRoot + "alert.htm" + _Caching.GetUrlExtension();
            $("#div_feedback").k_show();
            $("#div_feedback").load(fdbkUrl, function () {
                _Question.SetFeedbackTop()
                $("body").animate({
                    scrollTop: $(document).height()
                }, 1000);
            });
        },
        SetFeedbackTop: function () {
            var ptop = Number($("#div_feedback").position().top);
            var pheight = Number($("#div_feedback").outerHeight());
            var pdiff = (_Settings.minHeight + _Settings.topMargin) - (ptop + pheight);
            if (pdiff > 0) {
                $("#div_feedback").css("margin-top", (pdiff + 35) + "px");
            }
        },
        PrevAnswer: function () {
            if (_currentQuestionObj.type == "question") {
                var totalOptions = _currentQuestionObj.options.length;
                $(".btncheckanswer").k_disable();
                $(".questionband").find("input").k_disable()
                for (var i = 0; i < totalOptions; i++) {
                    var _optD = _currentQuestionObj.options[i];
                    if (_optD.type == "select") {
                        _boxGrp.val(_optD.selectedAnswer)
                        if (_optD.answer != _optD.selectedAnswer) {
                            _boxGrp.addClass("incorrect");
                        } else {
                            _boxGrp.addClass("correct");
                        }
                    } else if (_optD.type == "radio") {
                        if (_optD.answerId != _optD.selectedId) {
                            $("#" + _optD.selectedId).addClass("incorrect");
                        } else {
                            $("#" + _optD.selectedId).addClass("correct");
                        }
                        $("#" + _optD.selectedId).attr('checked', 'checked');
                    } else if (_optD.type == "input") {

                        var inputval = _optD.selectedAnswer;
                        $("#" + _optD.id).val(_optD.selectedAnswer);
                        if (_optD.answer != _optD.selectedAnswer) {
                            $("#" + _optD.id).addClass("incorrect");
                        } else {
                            $("#" + _optD.id).addClass("correct")
                        }
                    }
                }
                this.Loadfeedback(_currentQuestionObj.feedbackIndex);
                this.SetQuestionStatus();
            } else {
                _CustomQuestion.PrevAnswer();
            }
        },
        CheckAnswer: function () {
            var isWorsen = false;
            var _qPoints = 0.0;
            var isAllCorrect = true;
            var totalOptions = _currentQuestionObj.options.length;
            var feedbackIndex = 0;

            //best score
            var pageId = _Navigator.GetCurrentPage().pageId;
            var Qid = _currentQuestionObj.Qid;
            var attemptCurrentQuestionData = _Navigator.GetQuestionAttemptData(pageId, Qid);

            $(".btncheckanswer").k_disable();
            $(".questionband").find("input").k_disable()
            for (var i = 0; i < totalOptions; i++) {
                var _optD = _currentQuestionObj.options[i];

                var attemptCurrentQuestionData_Options = undefined;
                if (attemptCurrentQuestionData != undefined) {
                    attemptCurrentQuestionData_Options = attemptCurrentQuestionData.options[i];
                }
                if (_optD.type == "select") {
                    var _boxGrp = $("select#" + _optD.id);
                    if (_boxGrp.val() == "") {
                        //Show alert feedback.
                        this.LoadAlertFeedback();
                        return;
                    }
                    _optD.selectedAnswer = _boxGrp.val();
                    if (_optD.answer != _optD.selectedAnswer) {
                        isAllCorrect = false;
                        _optD.points = 0.0;
                        _optD.isCorrect = false;
                        _boxGrp.addClass("incorrect");
                    } else {
                        var optPoints = parseFloat(_currentQuestionObj.totalPoints) / parseFloat(totalOptions)
                        _optD.points = optPoints;
                        _optD.isCorrect = true;
                        _qPoints += optPoints;
                        _boxGrp.addClass("correct");
                    }
                } else if (_optD.type == "radio") {
                    var _boxGrp = $("input:radio[name='" + _optD.group + "']");
                    if (!_boxGrp.is(":checked")) {
                        //Show alert message
                        this.LoadAlertFeedback();
                        return;
                    }
                    _optD.selectedAnswer = _boxGrp.filter(":checked").val();
                    _optD.selectedId = _boxGrp.filter(":checked").attr("id");
                    if (_optD.answerId != _optD.selectedId) {
                        isAllCorrect = false;
                        _optD.points = 0.0;
                        _optD.isCorrect = false;
                        $("#" + _optD.selectedId).addClass("incorrect");
                        if (attemptCurrentQuestionData_Options != undefined && attemptCurrentQuestionData_Options.isCorrect) {
                            _optD.selectedAnswer = attemptCurrentQuestionData_Options.selectedAnswer;
                            _optD.selectedId = attemptCurrentQuestionData_Options.selectedId;
                            var optPoints = parseFloat(_currentQuestionObj.totalPoints) / parseFloat(totalOptions)
                            _optD.points = optPoints;
                            _optD.isCorrect = true;
                            _qPoints += optPoints;
                        }
                    } else {
                        var optPoints = parseFloat(_currentQuestionObj.totalPoints) / parseFloat(totalOptions)
                        _optD.points = optPoints;
                        _optD.isCorrect = true;
                        _qPoints += optPoints
                        $("#" + _optD.selectedId).addClass("correct");
                    }
                } else if (_optD.type == "input") {
                    var inputval = $("#" + _optD.id).val();
                    var _boxGrp = $("#" + _optD.id);
                    if (inputval == "") {
                        //Show alert message 
                        $("#" + _optD.id).addClass("incorrect");
                        this.LoadAlertFeedback();
                        return;
                    }
                    _optD.selectedAnswer = Number(inputval);
                    if (_optD.answer != _optD.selectedAnswer) {
                        isAllCorrect = false;
                        _optD.points = 0.0;
                        _optD.isCorrect = false;
                        $("#" + _optD.id).addClass("incorrect");
                        if (attemptCurrentQuestionData_Options != undefined && attemptCurrentQuestionData_Options.isCorrect) {
                            _optD.selectedAnswer = attemptCurrentQuestionData_Options.selectedAnswer;
                            var optPoints = parseFloat(_currentQuestionObj.totalPoints) / parseFloat(totalOptions)
                            _optD.points = optPoints;
                            _optD.isCorrect = true;
                            _qPoints += optPoints;
                        }
                    } else {
                        var optPoints = parseFloat(_currentQuestionObj.totalPoints) / parseFloat(totalOptions)
                        _optD.points = optPoints;
                        _optD.isCorrect = true;
                        _qPoints += optPoints;
                        $("#" + _optD.id).addClass("correct")
                    }
                }
            }
            if (isAllCorrect) {
                //Show Correct Feedback
                feedbackIndex = 0;
                this.Loadfeedback(feedbackIndex);
                _currentQuestionObj.points = _qPoints;
                _currentQuestionObj.isAnswered = true;
                _currentQuestionObj.feedbackIndex = feedbackIndex;
                $("#linknext").k_enable();
                this.SetQuestionStatus();
                //Need to think on generic logic.
                //Module specific.
                _CustomQuestion.ActionAfterCheckAnswer();

                _Navigator.UpdateScore();
            } else {
                _currentQuestionObj.tryCount += 1;
                feedbackIndex = _currentQuestionObj.tryCount;
                if (_currentQuestionObj.tryCount < _currentQuestionObj.totalTry) {
                    //Show tryCount incorrect feedback
                    this.Loadfeedback(feedbackIndex);
                } else {
                    //Show final incorrect feedback
                    this.Loadfeedback(feedbackIndex);
                    _currentQuestionObj.points = _qPoints;
                    _currentQuestionObj.isAnswered = true;
                    _currentQuestionObj.feedbackIndex = feedbackIndex;
                    $("#linknext").k_enable();
                    this.SetQuestionStatus();
                    //Need to think on generic logic.
                    //Module specific
                    _CustomQuestion.ActionAfterCheckAnswer();
                    _Navigator.UpdateScore();
                }
            }
        },
        GetCurrentQuestion: function () {
            return _currentQuestionObj;
        },
        PositionOptionElements: function () { },
        SetAriaProps: function () {

        },
        lastdummyfunct: function () { },
        SetQuestionStatus: function () {

            for (var i = 0; i < _currentQuestionObj.options.length; i++) {
                var _optD = _currentQuestionObj.options[i];
                if (_optD.type == "select") {
                    if (_optD.isCorrect) {
                        $("#" + _optD.id).css({
                            'color': ColorCodes.green,
                            'font-weight': 'bold'
                        });
                    } else {
                        $("#" + _optD.id).css({
                            "color": ColorCodes.red,
                            "font-weight": "bold"
                        });
                        $("#" + _optD.id + "span").after(' <i class="fa fa-times" style="padding:3px;color:' + ColorCodes.red + '"></i> <span  style="color:' + ColorCodes.green + ';font-weight:bold;font-size:16px;" aria-hidden="true"> ' + _optD.answer + '</span>');
                    }
                } else if (_optD.type == "radio") {

                    if (_optD.isCorrect) {
                        $("label[for='" + _optD.selectedId + "']").css({
                            'color': ColorCodes.green,
                            'font-weight': 'bold'
                        });
                    } else {
                        $("label[for='" + _optD.selectedId + "']").css({
                            "color": ColorCodes.red,
                            "font-weight": "bold"
                        }).append(' <i class="fa fa-times" style="padding:3px;color:' + ColorCodes.red + '"></i> ');

                        $("label[for='" + _optD.answerId + "']").css({
                            'color': ColorCodes.green,
                            'font-weight': 'bold'
                        });
                    }
                } else if (_optD.type == "input") {
                    if (_optD.isCorrect) {
                        $("#" + _optD.id).css({
                            'color': ColorCodes.green,
                            'font-weight': 'bold'
                        });
                    } else {
                        $("#" + _optD.id).css({
                            'color': ColorCodes.red,
                            'font-weight': 'bold'
                        })
                        $("#" + _optD.id + "span").after('<label class="incurrect_label"><i class="fa fa-times" style="padding:3px;color:' + ColorCodes.red + '"></i><span aria-hidden="true" style="color:' + ColorCodes.green + ';font-weight:bold;font-size:16px;"> ' + _optD.answer + '</span> </label>');
                    }
                }
            }

            this.SetOptionPosition();
        }
    };
})();


$(document).on("click", ".btncheckanswer", function (event) {
    if ($(this).k_IsDisabled()) return;
    _Question.CheckAnswer();
});
$(document).on("click", ".btnretry", function (event) {
    if ($(this).k_IsDisabled()) return;
    _Question.Retry();
});