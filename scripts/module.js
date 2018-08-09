var _Template = (function(){
    return{
        LoadTopSlider: function(){
            var pageUrl = "templates/topslider.htm" +  _Caching.GetUrlExtension();
            $(".top-slider").load(pageUrl, function () {
                //onload callback
                _ModuleCharts.DrawSurplusChart();
                _ModuleCharts.DrawPPFChart();    
            });             
        },
        LoadAnimateArea: function(){
            var pageUrl = "templates/animate.htm" +  _Caching.GetUrlExtension();
            $(".t_animation_c").load(pageUrl, function () { 
                //onload callback                
                _Animation.MngAnimationEle();
            });             
        },
        LoadRangeSlider: function(){
            var pageUrl = "templates/slider.htm" +  _Caching.GetUrlExtension();
            $(".t_range-slider_c").load(pageUrl, function () {  
                _Slider.InitSelectTimeSlider();
            });                       
        },
        LoadDaytimeScheduler: function(){
            var pageUrl = "templates/daytimescheduler.htm" +  _Caching.GetUrlExtension();
            $(".daytime_scheduler").load(pageUrl, function () {                
            });
        }, 
        LoadNighttimeScheduler: function(){
            var pageUrl = "templates/nighttimescheduler.htm" +  _Caching.GetUrlExtension();
            $(".nighttime_scheduler").load(pageUrl, function () {                 
            });
        },        
        LoadTradeSlider: function(){
            var pageUrl = "templates/tradeslider.htm" +  _Caching.GetUrlExtension();
            $(".trade_slider_wrapper").load(pageUrl, function () {                 
                TradeSlider.InitSlider();  
                _ModuleCharts.DrawTradeCharts();             
            }); 
        }
    }
})();


jQuery.fn.extend({
    k_enable: function() {
        return this.removeClass('disabled').attr("aria-disabled","false").removeAttr("disabled");
    },
    k_disable: function() {
        return this.addClass('disabled').attr("aria-disabled","true").attr("disabled", "disabled");
    },
    k_IsDisabled: function(){
       if( this.hasClass('disabled')){return true;}else{return false;}
    }
  });


$(document).ready(function () {
    debugger;
    _Template.LoadTopSlider();
    _Navigator.Start();    
    $("h1:first").focus();

    if(_Settings.enableCache)
    {
        _Caching.InitAssetsCaching();
        _Caching.InitPageCaching();
    }
});