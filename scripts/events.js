$(document).on("click", "#ppfchart .imggraph", function (event) {
    var _this = $(this);
    $("#ppfcharttable_c").hide(function () {
        $(".imgtable").css({
            "opacity": "1.1"
        });
    });
    $("#ppfchart_c").show(function () {
        _this.css({
            "opacity": "0.4"
        });
    });
});
$(document).on("click", "#ppfchart .imgtable", function (event) {
    var _this = $(this);
    $("#ppfcharttable_c").show(function () {
        _this.css({
            "opacity": "0.4"
        });
    });
    $("#ppfchart_c").hide(function () {
        $(".imggraph").css({
            "opacity": "1.1"
        });
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

$(document).on("click", "#btnstartslider", function (event) {
    $('html,body').animate({
        scrollTop: $(".t_animation_c").position().top - _Settings.topMargin
    }, 200);
    $(".questionband").hide();
    $('.castawaySprites1, .fridaycastawaySprites').hide();
    _Slider.setDefaultValue();
    _Slider.StartScheduler();
});
$(document).on("click", "#btntradestartslider", function (event) {
    $('html,body').animate({
        scrollTop: $(".t_animation_c").position().top - _Settings.topMargin
    }, 200);
    $('.friday-raftSprites').removeClass('friday-raftSprites').addClass('friday-raftSprites2');
    $('.fridaySprites').removeClass('fridaySprites').addClass('fridaySprites2');
    $('.castawaySprites1').removeClass('castawaySprites1').addClass('castawaySprites');
    $(".runtimeslider").show();
    $(".selecttimeslider").hide();
    $(".startbtnpanel").hide();
    setTimeout(function () {
        $('.castawaySprites').removeClass('castawaySprites').addClass('castawaySprites1');
        $('.castawaySprites1').hide();
        _Slider.setDefaultValue();
        _Slider.StartScheduler();
    }, 2500)
});