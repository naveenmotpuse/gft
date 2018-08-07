var _TopSlider = (function () {
    function toggleImage(_this, _type) {
        if ($(_this).find("img").length > 0) {
            if ($(_this).find("img").attr("src").indexOf("down-chevron.png") > 0) {
                $(_this).find("img").attr("src", "assets/images/up-chevron.png")
                $('html,body').animate({ scrollTop: 0 }, 1000);
            }
            else {
                $(_this).find("img").attr("src", "assets/images/down-chevron.png")
            }
        }
        if (_type == "ppf") {
            hideOtherChart("surplus")
            $("#ppfchart").slideToggle("slow", function () {
                if ($(this).is(":visible")) {
                    console.log("ppf visible")
                    setTimeout(function () {
                        $("#linkppf").focus();
                    }, 100);
                }
                else {
                    setTimeout(function () {
                        $(".questionband .headinglevel2div").focus();
                    }, 100);
                }
            });
        }
        else if (_type == "surplus") {
            hideOtherChart("ppf")
            $("#surpluschart").slideToggle("slow", function () {
                if ($(this).is(":visible")) {
                    console.log("surplus visible")
                    setTimeout(function () {
                        $("#linksurplus").focus();
                    }, 100);
                }
            });
        }
    }
    function hideOtherChart(_type) {
        if (_type == "ppf") {
            if ($("#ppfchart:visible").length <= 0) return;
            _this = $("#linkppf")
            $("#ppfchart").hide();
        }
        else {
            if ($("#surpluschart:visible").length <= 0) return;
            _this = $("#linksurplus")
            $("#surpluschart").hide();
        }
        if ($(_this).find("img").length > 0) {
            if ($(_this).find("img").attr("src").indexOf("down-chevron.png") > 0) {
                $(_this).find("img").attr("src", "assets/images/up-chevron.png");
            }
            else {
                $(_this).find("img").attr("src", "assets/images/down-chevron.png");
            }
        }
    }
    return {
        OnLoad: function () {
            if ($("#ppfchart").is(":visible")) {
                this.TogglePPf($("#linkppf"));
            }
            if ($("#surpluschart").is(":visible")) {
                this.ToggleSurplus($("#linksurplus"));
            }
        },
        TogglePPf: function (_this) {
            toggleImage(_this, "ppf");
        },
        ToggleSurplus: function (_this) {
            toggleImage(_this, "surplus");
        }
    };
})();

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
$(document).on("keyup", "#ppfchart .imgtable, #ppfchart .imggraph", function (event) {
    if (window.event) {
        key = window.event.keyCode;
    } else if (event) {
        key = event.keyCode;
    }
    if (key == 13) {
        $(this).trigger('click');
    }
});

$(document).on("click", "#linkppf", function (event) {
    debugger
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
