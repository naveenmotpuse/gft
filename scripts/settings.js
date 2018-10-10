var _problem_guid = "";
var _resourceId = "";
var _interactivesesstings = {};
var _serviceurl = window.location.origin + "/econservice";

var Utility = function () {
    return {
        shuffle: function (e) {
            for (var t, n, r = e.length; 0 !== r;) n = Math.floor(Math.random() * r), r -= 1, t = e[r], e[r] = e[n], e[n] = t;
            return e
        },
        getParameterByName: function (e, t) {
            e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var n = new RegExp("[\\?&]" + e + "=([^&#]*)"),
                r = n.exec(t);
            return null === r ? "" : decodeURIComponent(r[1].replace(/\+/g, " "))
        },
    }
}();

$(document).ready(function () {
    //debugger;
    _problem_guid = Utility.getParameterByName("pid", window.location.href);
    _resourceId = Utility.getParameterByName("resid", window.location.href);
    getInflationSettings();

    // attach handlers here
    $("#savebtn").on("click", function () {
        //debugger;
        if ($(this).closest(".savebtn").hasClass("k_disable"))
            return;
    
        var valid = true;
    
        if (valid) {
            check_for_active_users();
        }
    });
})


function getInflationSettings() {
    var obj = {};
    obj.knowdlresourceid = _resourceId;
    obj.knowdltargetapp = _problem_guid;

    var jsonSerialized = JSON.stringify(obj);
    var servcUrl = _serviceurl + "/data/econ/inflation/getInflationSettings/";
    $.ajax({
        type: "POST",
        url: servcUrl,
        data: jsonSerialized,
        success: function (result) {
            _interactivesesstings = JSON.parse(JSON.stringify(result));
            //debugger;
            if (_interactivesesstings.level1 == true) {
                $("#checkoxlevel1").attr("checked", "checked")
            }
            else {
                $("#checkoxlevel1").removeAttr("checked")
            }
            if (_interactivesesstings.level2 == true) {
                $("#checkoxlevel2").attr("checked", "checked")
            }
            else {
                $("#checkoxlevel2").removeAttr("checked")
            }
            if (_interactivesesstings.level3 == true) {
                $("#checkoxlevel3").attr("checked", "checked")
            }
            else {
                $("#checkoxlevel3").removeAttr("checked")
            }
            if (_interactivesesstings.level4 == true) {
                $("#checkoxlevel4").attr("checked", "checked")
            }
            else {
                $("#checkoxlevel4").removeAttr("checked")
            }
            $("#statusdiv").removeClass("error").html("")
            $("#savebtn").closest(".savebtn").removeClass("k_disable")
        },
        error: function (error) {
            $("#statusdiv").addClass("error").html("Error while fetching default settings.")
        }
    });
}

function saveInflationSettings() {
    _interactivesesstings = {};
    _interactivesesstings.level1 = $("#checkoxlevel1").prop("checked");
    _interactivesesstings.level2 = $("#checkoxlevel2").prop("checked");
    _interactivesesstings.level3 = $("#checkoxlevel3").prop("checked");
    _interactivesesstings.level4 = $("#checkoxlevel4").prop("checked");

    var obj = {};
    obj.knowdlresourceid = _resourceId;
    obj.knowdltargetapp = _problem_guid;
    obj.settings = _interactivesesstings;

    var jsonSerialized = JSON.stringify(obj);
    var servcUrl = _serviceurl + "/data/econ/inflation/saveInflationSettings/";
    $.ajax({
        type: "POST",
        url: servcUrl,
        data: jsonSerialized,
        success: function (result) {
            $("#statusdiv").removeClass("error").html("Settings saved successfully.");
        },
        error: function (error) {
            $("#statusdiv").addClass("error").html("Error while saving settings..");
        }
    });
}

function check_for_active_users() {
    var obj = {};
    obj.knowdlresourceid = _resourceId;
    obj.knowdltargetapp = _problem_guid;

    var jsonSerialized = JSON.stringify(obj);
    var servcUrl = _serviceurl + "/data/econ/inflation/check_for_active_users/";
    $.ajax({
        type: "POST",
        url: servcUrl,
        data: jsonSerialized,
        success: function (result) {
            if (parseInt(JSON.stringify(result)) > 0) {
                $("#statusdiv").removeClass("error").html("One or more students have results for this interactive. Changes to the interactive's settings will not affect these users. You cannot edit these changes");
            }
            else {
                saveInflationSettings();
            }
        },
        error: function (error) {
            $("#statusdiv").addClass("error").html("Error while checking for existing interactive sessions.")
        }
    });
}