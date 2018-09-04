$(document).on("click", "#ppfchart .imggraph", function (event) {
    var _this = $(this);
    $("#ppfcharttable_c").hide(function () {        
        $(".imgtable").k_enable();
        $(".imgtable").attr("aria-expanded","false");
        $(".imgtable").attr("aria-current", "false")
    });
    $("#ppfchart_c").show(function () {
        _this.k_disable();
        _this.attr("aria-expanded","true");        
        _this.attr("aria-current", "true")
    });
});
$(document).on("click", "#ppfchart .imgtable", function (event) {
    var _this = $(this);
    $("#ppfcharttable_c").show(function () {
        _this.k_disable();
        _this.attr("aria-expanded","true");        
        _this.attr("aria-current", "true")
    });
    $("#ppfchart_c").hide(function () {
        $(".imggraph").k_enable();
        $(".imggraph").attr("aria-expanded","false");
        $(".imggraph").attr("aria-current", "false")
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
$(document).on("change", ".goalRadio", function (event) {
    var goal = $(this).attr('id');
    _TradeSlider.UpdateTarget(goal);
    _TradeSlider.ToggleGoal(goal);
});
$(document).on("click", "#btnstartslider", function (event) {
    if ($(this).k_IsDisabled()) return;
    EventManager.onStart();    
});

$(document).on("click", ".exambtnretry", function (event) {
    if ($(this).k_IsDisabled()) return;
    _Navigator.ReAttempt();
});

$(document).on("click", ".levelbtnretry", function (event) {
    var datalevel = $(this).attr("data-level");
    _Navigator.ReAttemptLevel(datalevel);
});
$(document).on("click", ".bookmark", function (event) {
    _Navigator.Start();
});
$(document).on("keyup", "input[type='number']", function (event) {
    debugger;
    var max = $(this).attr("max");
    var min = $(this).attr("min");
    if (max != undefined && min != undefined) {
        max = Number(max);
        min = Number(min);
        if ($(this).val() > max) {
            $(this).val(max);
        }
        if ($(this).val() < min) {
            $(this).val(min);
        }
    }
})