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

jQuery.fn.extend({
    k_hide: function () {
        return this.attr("aria-hidden", "true").hide();
    },
    k_show: function () {
        return this.attr("aria-hidden", "false").show();
    }
});

var userAgentCustom = window.navigator.userAgent;
var ua = navigator.userAgent.toLowerCase();
var isAndroid = ua.indexOf("android") > -1;
var isIE11version = !!navigator.userAgent.match(/Trident.*rv\:11\./);
var isIOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var CurClientWidth = window.innerWidth;
var Macbrowser = navigator.userAgent.indexOf('Chrome');
var Macos = navigator.userAgent.indexOf('Mac');
var isIpad = userAgentCustom.match(/iPad/i)
var IsIphone = (navigator.userAgent.match(/iPhone/i))
var isIEEdge = /Edge/.test(navigator.userAgent)
var Firefox = /Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)

var AttemptStatus = {
    "new":"new",
    "inprogress":"inprogress",
    "complete":"complete"
}

var LaunchModes = {
    "do": "do",
    "review": "review",
    "setup": "setup",    
    "preview": "preview"
}
var UserRoles = {
    "learner": "learner",
    "educator": "educator",
    "presenter": "presenter"    
}

var _Common = (function () {
    return{
        GetParameterByName: function(name){
            name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },
        IsEmptyObject: function (obj) {
            return JSON.stringify(obj) === JSON.stringify({});
        },
        SetReader: function (hiddenAnchor, idToStartReading, isLoaded) {
            $(hiddenAnchor).attr("href", "#" + idToStartReading);
            if(isLoaded != undefined && isLoaded) {
                $(hiddenAnchor)[0].click();
            }
        },
        ValidateDecimal:function (evt, obj) {
            var charCode = (evt.which) ? evt.which : event.keyCode
            var value = obj.val();
            var dotcontains = value.indexOf(".") != -1;
            if (dotcontains)
                if (charCode == 46) return false;
            if (charCode == 46) return true;
            if (charCode > 31 && (charCode < 48 || charCode > 57))
                return false;
            return true;
        },
        Remove: function(_arr, _prop, _val) {
            _arr = $.grep(_arr, function(e){ 
              return e[_prop] != _val; 
            });
            return _arr;
        },
        ordinalInWord: function(t){var e=["zeroth","first","second","third","fourth","fifth","sixth","seventh","eighth","ninth","tenth","eleventh","twelfth","thirteenth","fourteenth","fifteenth","sixteenth","seventeenth","eighteenth","nineteenth","twentieth"];return t<=20?e[t]:t%10==0?{30:"thirtieth",40:"fortieth",50:"fiftieth",60:"sixtieth",70:"seventieth",80:"eightieth",90:"ninetieth",100:"hundredth"}[t]:{20:"twenty ",30:"thirty ",40:"forty ",50:"fifty ",60:"sixty ",70:"seventy ",80:"eighty ",90:"ninety ",100:"hundred "}[t-t%10]+e[t%10]},
    }
})();


