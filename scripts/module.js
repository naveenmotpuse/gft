jQuery.fn.extend({
    k_enable: function () {
        return this.removeClass('disabled').attr("aria-disabled", "false").removeAttr("disabled");
    },
    k_disable: function () {
        return this.addClass('disabled').attr("aria-disabled", "true").attr("disabled", "disabled");
    },
    k_IsDisabled: function () {
        if (this.hasClass('disabled')) { return true; } else { return false; }
    }
});


$(document).ready(function () {
    
    //always first in ready. should be called only once.
    _Navigator.UpdateDefaultNData();

    _Template.LoadTopSlider();
    _Navigator.Start();
    $("h1:first").focus();

    if (_Settings.enableCache) {
        _Caching.InitAssetsCaching();
        _Caching.InitPageCaching();
    }
    _Scenario.ShuffleScenario();
    _Scenario.updateQuestionData();
    
    var isIE11version = !!navigator.userAgent.match(/Trident.*rv\:11\./);
    if (/Edge/.test(navigator.userAgent) || isIE11version) {
        $('head').append('<link rel="stylesheet" href="styles/IE.css" type="text/css" />');
    }
    else if ((/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))) {
        $('head').append('<link rel="stylesheet" href="styles/firefox.css" type="text/css" />');
    }
    else{
        $('head').append('<link rel="stylesheet" href="styles/mainslider.css" type="text/css" />');
    }
});