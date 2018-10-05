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
        SetReader: function (hiddenAnchor, idToStartReading) {
            $(hiddenAnchor).attr("href", "#" + idToStartReading);
            $(hiddenAnchor)[0].click();
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
        /*onlyDotsAndNumbers(event, obj) {
            var charCode = (event.which) ? event.which : event.keyCode
            if (charCode == 46) {
                if (obj.value.indexOf(".") < 0)
                    return true;
                else
                    return false;
            }
        
            if (txt.value.indexOf(".") > 0) {
                var txtlen = obj.value.length;
                var dotpos = obj.value.indexOf(".");
                if ((txtlen - dotpos) > 2)
                    return false;
            }
        
            if (charCode > 31 && (charCode < 48 || charCode > 57))
                return false;
        
            return true;
        }*/
         /*isNumberKey(evt) {
            var charCode = (evt.which) ? evt.which : event.keyCode
            if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46)
                return false;
            else {
                var len = document.getElementById("input[type='text']").val().length;
                var index = document.getElementById("input[type='text']").val().indexOf('.');
                
                if (index > 0 && charCode == 46) {
                    return false;
                }
                if (index > 0) {
                    var CharAfterdot = (len + 1) - index;
                    if (CharAfterdot > 3) {
                        return false;
                    }
                }
   
            }
            return true;
         }*/
    }
})();


