var _CustomQuestion = (function () {
    return {
        OnCheckAnswer: function(){
            debugger;
            var _currentQuestionObj = _Question.GetCurrentQuestion();
            if(_currentQuestionObj.Id == "Q1"){
                _ModuleCharts.AddPointToPPFChart("userppfser",[0, 3000])
                $(".userppftable tbody tr:nth-child(1) td:nth-child(3)").text(0)
                $(".userppftable tbody tr:nth-child(1) td:nth-child(4)").text(3000)
            }
            else if(_currentQuestionObj.Id == "Q2"){
                _ModuleCharts.AddPointToPPFChart("userppfser",[96, 0])
                $(".userppftable tbody tr:nth-child(13) td:nth-child(3)").text(96)
                $(".userppftable tbody tr:nth-child(13) td:nth-child(4)").text(0)
            }
            else if(_currentQuestionObj.Id == "Q3"){
                debugger;
                _ModuleCharts.UpdatePPFChartSeries("userppfser",_currentQuestionObj.correctData)                
                for(var i=0;i<_currentQuestionObj.correctData.length;i++){
                    var point = _currentQuestionObj.correctData[i];
                    $(".userppftable tbody tr:nth-child("+ (i+1)+") td:nth-child(3)").text(point[0])
                    $(".userppftable tbody tr:nth-child("+ (i+1)+") td:nth-child(4)").text(point[1])
                }                
            }
            else if(_currentQuestionObj.Id == "Q5"){
                $(".fridayppftable").closest(".tablewrapper").show();
                _ModuleCharts.AddPointToPPFChart("fridayppfser",[0, 6000])
                $(".fridayppftable tbody tr:nth-child(1) td:nth-child(3)").text(0)
                $(".fridayppftable tbody tr:nth-child(1) td:nth-child(4)").text(6000)                
            }
            else if(_currentQuestionObj.Id == "Q6"){
                _ModuleCharts.AddPointToPPFChart("fridayppfser",[48, 0])                
                $(".fridayppftable tbody tr:nth-child(13) td:nth-child(3)").text(48)
                $(".fridayppftable tbody tr:nth-child(13) td:nth-child(4)").text(0)     
            }
            else if(_currentQuestionObj.Id == "Q7"){
                _ModuleCharts.UpdatePPFChartSeries("fridayppfser",_currentQuestionObj.correctData)
                var j = _currentQuestionObj.correctData.length;
                for(var i=0;i<_currentQuestionObj.correctData.length;i++){
                    var point = _currentQuestionObj.correctData[i];
                    $(".fridayppftable tbody tr:nth-child("+ (i+1)+") td:nth-child(3)").text(point[0])
                    $(".fridayppftable tbody tr:nth-child("+ (i+1)+") td:nth-child(4)").text(point[1])
                }              
            }
        },
        OnQuestionLoad: function(){
            var qObj = _Question.GetCurrentQuestion();
            if (qObj.type != undefined && qObj.type == "graph") {
                _ModuleCharts.DrawQuestionChart(qObj.graphData);
                $(".graphbtncheckanswer").k_disable();
            }
        }
    };
})();

var _CustomPage = (function(){
    return {
        OnPageLoad: function(){
            pageobj = _Navigator.GetCurrentPage();
            if(pageobj.pageId == "l2p2"){
                _ModuleCharts.DrawL2P2QuestionChart();
            }
            if(pageobj.hasTimeSlider!=undefined && pageobj.hasTimeSlider){
                _Template.LoadRangeSlider();
            }
            if(pageobj.hasAnimation != undefined && pageobj.hasAnimation){
                _Template.LoadAnimateArea();
            }
            if(pageobj.isFriday!=undefined && pageobj.isFriday){
                AnimConfig.isFriday = true;
            }
            else{
                AnimConfig.isFriday = false;
            }
        }
    };
})();
function AddGraphPoints(wood, fish, valPoints) {
    debugger;
    if ($.trim(fish) != "" && $.trim(wood) != "") {
        if (isNaN(fish) || isNaN(wood)) {
            //Validation failed.
        }
        else {
            //Add Point                    
            var chart = $('#questionchart').highcharts();
            var series = chart.get("new_series");
			//NM: Need to show feedback when user add same point twice.
			//Point will not get added if the same point is added.			
			for (var i = 0; i < series.data.length; i++) {
                if((series.data[i]['x']==wood) && (series.data[i]['y']==fish))
                {
                    return;                    
                }
            }
            if (series.data.length < valPoints) {
                series.addPoint([Number(wood), Number(fish)]);
                if(series.data.length>=valPoints){
                    
                }
                else{
                    $("#addpointbtn").k_enable();
                }
                //point grap
                var allliesonline = true;
                for (var i = 0; i < series.length; i++) {
                    var currPoint = { x: series[i][0], y: series[i][1] };
                    var isonline = IsPointOnLine(currPoint, [Number(wood), Number(fish)])
                    if (!isonline) {
                        allliesonline = false;
                        break;
                    }
                }
                $(".graphbtncheckanswer").k_disable();
                $("#woodlogtools").val("");
                $("#fishlogtools").val("");
                if (series.data.length >= valPoints) {
                    $("#addpointbtn").k_disable()
                    $("#woodlogtools").k_disable()
                    $("#fishlogtools").k_disable()                    
                    $(".graphbtncheckanswer").k_enable()
                    //$("html, body").animate({ scrollTop: $(document).height() }, 1000);
                }
            }
            else {                
                $("#addpointbtn").k_disable()
                $("#woodlogtools").k_enable()
                $("#fishlogtools").k_enable()                
                $(".graphbtncheckanswer").k_enable()
                //$("html, body").animate({ scrollTop: $(document).height() }, 1000);
            }
        }
    }
}

function IsPointOnLine(currPoint, point1, point2) {
    dxc = currPoint.x - point1.x;
    dyc = currPoint.y - point1.y;
    dxl = point2.x - point1.x;
    dyl = point2.y - point1.y;
    cross = dxc * dyl - dyc * dxl;
    if (cross != 0)
        return false;
    else
        return true;
}

function CheckGraphAnswer(valPoints) {
    debugger;
    $(".graphbtncheckanswer").k_disable();
    var point1 = {}
    var _currentQuestionObj = _Question.GetCurrentQuestion();
    point1.x = _currentQuestionObj.graphData[0][0];
    point1.y = _currentQuestionObj.graphData[0][1];
    var point2 = {}
    point2.x = _currentQuestionObj.graphData[1][0];
    point2.y = _currentQuestionObj.graphData[1][1];

    var chart = $('#questionchart').highcharts();
    var newSerData = chart.get('new_series').options.data;
    if (newSerData.length < valPoints) {
        //Alert Feedback
        _Question.LoadAlertFeedback();
        return;
    }
    _currentQuestionObj.selectedAnswer=[newSerData[0],newSerData[1]];
    var allliesonline = true;
    var crrcount = 0;
    for (var i = 0; i < newSerData.length; i++) {
        var currPoint = { x: newSerData[i][0], y: newSerData[i][1] };
        var isonline = IsPointOnLine(currPoint, point1, point2)
        if (!isonline) {
            allliesonline = false;
        }
        else {
            crrcount++;
        }
    }

    if (allliesonline) {
        //Show Correct Feedback
        fNo = 0;
        _Question.Loadfeedback(fNo);
        _currentQuestionObj.points = crrcount / valPoints;
        _currentQuestionObj.isAnswered = true;
        _currentQuestionObj.fNo = fNo;
        //Need to think on generic logic.
        UpdateGraphSubmitStatus();
        _CustomQuestion.OnCheckAnswer();
        _Navigator.UpdateScore();
    }
    else {
        _currentQuestionObj.tryCount += 1;
        var fNo = _currentQuestionObj.tryCount;
        //Incorrect Feedback
        if (_currentQuestionObj.tryCount < _currentQuestionObj.totalTry) {
            //Show tryCount incorrect feedback
            _Question.Loadfeedback(fNo);
        }
        else {
            _Question.Loadfeedback(fNo);
            _currentQuestionObj.points = crrcount / valPoints;
            _currentQuestionObj.isAnswered = true;
            _currentQuestionObj.fNo = fNo;
            $("#linknext").k_enable();
            UpdateGraphSubmitStatus();
            //Need to think on generic logic.
            _CustomQuestion.OnCheckAnswer();
            _Navigator.UpdateScore();
        }
    }
    $("#linknext").k_enable();
}
function PrevGraphAnswer() {
    debugger;
    var point1 = {}
    var _currentQuestionObj = _Question.GetCurrentQuestion();
    point1.x = _currentQuestionObj.graphData[0][0];
    point1.y = _currentQuestionObj.graphData[0][1];
    var point2 = {}
    point2.x = _currentQuestionObj.graphData[1][0];
    point2.y = _currentQuestionObj.graphData[1][1];
    
    var selectedAnswer_point1 = {}
    selectedAnswer_point1.x = _currentQuestionObj.selectedAnswer[0][0];
    selectedAnswer_point1.y = _currentQuestionObj.selectedAnswer[0][1];
    var selectedAnswer_point2 = {}
    selectedAnswer_point2.x = _currentQuestionObj.selectedAnswer[1][0];
    selectedAnswer_point2.y = _currentQuestionObj.selectedAnswer[1][1];

    //AddGraphPoints(wood, fish, 2); 
    AddGraphPoints(selectedAnswer_point1.x,selectedAnswer_point1.y,2);
    AddGraphPoints(selectedAnswer_point2.x,selectedAnswer_point2.y,2);   
    _Question.Loadfeedback(_currentQuestionObj.fNo);            
    UpdateGraphSubmitStatus();    
    $("#linknext").k_enable();
}
function FindOutComplete(jsonObj) {
    var _currentQuestionObj = _Question.GetCurrentQuestion();
    
    if (jsonObj.IsAlive) {
        _currentQuestionObj.isAnswered = true;
        _currentQuestionObj.points = parseFloat(_currentQuestionObj.totalPoints);
        _Question.Loadfeedback(0);
    }
    else if (jsonObj.DiedReason == "less_fish") {
        _currentQuestionObj.isAnswered = true;
        _currentQuestionObj.points = 0.0;
        _Question.Loadfeedback(1);
    }
    else if (jsonObj.DiedReason == "less_wood") {
        _currentQuestionObj.isAnswered = true;
        _currentQuestionObj.points = 0.0;
        _Question.Loadfeedback(2);
    }
}

function UpdateGraphSubmitStatus() {
    var _currentQuestionObj = _Question.GetCurrentQuestion();
    var chart = $('#questionchart').highcharts();
    chart.get('defaultSeries').setData(_currentQuestionObj.correctData)
    chart.get('defaultSeries').update({
        color: ColorCodes.green
    });
    var point1 = {}    
    point1.x = _currentQuestionObj.graphData[0][0];
    point1.y = _currentQuestionObj.graphData[0][1];
    var point2 = {}
    point2.x = _currentQuestionObj.graphData[1][0];
    point2.y = _currentQuestionObj.graphData[1][1];

    
    var newSerData = chart.get('new_series').options.data;
    var refArray = [];
    for (var i = 0; i < newSerData.length; i++) {
        var currPoint = { x: newSerData[i][0], y: newSerData[i][1] };
        var isonline = IsPointOnLine(currPoint, point1, point2)
        if (!isonline) {
            chart.get('new_series').data[i].graphic.attr({ fill: ColorCodes.red });
        }
    }    
}

function GraphRetry() {
    _Question.UnloadFeedback();
    $("#div_question").find("input[type='number']").val("");    
    $("#addpointbtn").k_enable()
    $("#woodlogtools").k_enable()
    $("#fishlogtools").k_enable()
    $(".graphbtncheckanswer").k_disable();
    var point1 = {}
    var _currentQuestionObj = _Question.GetCurrentQuestion();
    point1.x = _currentQuestionObj.graphData[0][0];
    point1.y = _currentQuestionObj.graphData[0][1];
    var point2 = {}
    point2.x = _currentQuestionObj.graphData[1][0];
    point2.y = _currentQuestionObj.graphData[1][1];

    var chart = $('#questionchart').highcharts();
    var newSerData = chart.get('new_series').options.data;
    var refArray = [];
    for (var i = 0; i < newSerData.length; i++) {
        var currPoint = { x: newSerData[i][0], y: newSerData[i][1] };
        var isonline = IsPointOnLine(currPoint, point1, point2)
        if (!isonline) {
            refArray.push(chart.get('new_series').data[i]);
        }
    }
    for (var i = 0; i < refArray.length; i++) {
        refArray[i].remove(true);
    }
    chart.redraw();
}
$(document).on("click", "#addpointbtn", function (event) {
    if ($(this).k_IsDisabled()) return;
    var fish = $('#fishlogtools').val();
    var wood = $('#woodlogtools').val();
    AddGraphPoints(wood, fish, 2);
});
$(document).on("click", ".graphbtncheckanswer", function (event) {
    debugger;
    if ($(this).k_IsDisabled()) return;
    CheckGraphAnswer(2);
});
$(document).on("click", ".graphbtnretry", function (event) {
    debugger;
    if ($(this).k_IsDisabled()) return;
    GraphRetry();
});
$(document).on("click", ".activitybtnretry", function (event) {
    debugger;
    if ($(this).k_IsDisabled()) return;
    EventManager.OnTryAgain();
});
$(document).on("click", "#btnfindout", function (event) {
    debugger;
    if ($(this).k_IsDisabled()) return;
    EventManager.onFind();
});