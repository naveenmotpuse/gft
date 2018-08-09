$(document).on("click", "#ppfchart .imggraph", function (event) {
    var _this = $(this);
    $("#ppfcharttable_c").hide(function () {
        $(".imgtable").css({ "opacity": "1.1" });
    });
    $("#ppfchart_c").show(function () {
        _this.css({ "opacity": "0.4" });
    });
});
$(document).on("click", "#ppfchart .imgtable", function (event) {
    var _this = $(this);
    $("#ppfcharttable_c").show(function () {
        _this.css({ "opacity": "0.4" });
    });
    $("#ppfchart_c").hide(function () {
        $(".imggraph").css({ "opacity": "1.1" });
    });
});

$(document).on("click", "#linkppf", function (event) {
    
    if ($(this).k_IsDisabled()) {
        return false;
    } else {
        _TopSlider.TogglePPf($(this));
    }
});
$(document).on("click", "#inlinePPFLink", function (event) {
    if ($(this).k_IsDisabled()) {
        return false;
    } else {
        _TopSlider.TogglePPf($("#linkppf"));
    }
});
$(document).on("click", "#ppfchart .btnclose", function (event) {
    if ($(this).k_IsDisabled()) {
        return false;
    } else {
        _TopSlider.TogglePPf($("#linkppf"));
    }
});

$(document).on("click", "#linksurplus", function (event) {
    if ($(this).k_IsDisabled()) {
        return false;
    } else {
        _TopSlider.ToggleSurplus($("#linksurplus"));
    }
});
$(document).on("click", "#inlineSurplusLink", function (event) {
    if ($(this).k_IsDisabled()) {
        return false;
    } else {
        _TopSlider.ToggleSurplus($("#linksurplus"));
    }
});
$(document).on("click", "#surpluschart .btnclose", function (event) {
    if ($(this).k_IsDisabled()) {
        return false;
    } else {
        _TopSlider.ToggleSurplus($("#linksurplus"));
    }
});

$(document).on("click", "#addpointbtn", function (event) {
    if ($(this).k_IsDisabled()) return;
    var fish = $('#fishlogtools').val();
    var wood = $('#woodlogtools').val();
    _CustomQuestion.AddGraphPoints(wood, fish, 2);
});
$(document).on("click", ".graphbtncheckanswer", function (event) {
    
    if ($(this).k_IsDisabled()) return;
    _CustomQuestion.CheckGraphAnswer(2);
});
$(document).on("click", ".graphbtnretry", function (event) {
    
    if ($(this).k_IsDisabled()) return;
    _CustomQuestion.GraphRetry();
});
$(document).on("click", ".activitybtnretry", function (event) {
    
    if ($(this).k_IsDisabled()) return;
    EventManager.OnTryAgain();
});
$(document).on("click", "#btnfindout", function (event) {
    
    if ($(this).k_IsDisabled()) return;
    EventManager.onFind();
});
$(document).on("click", ".ToolPropsRadio", function (event) {   
    var tool = $(this).val();
    _TradeSlider.UpdateToolProps(tool);
});