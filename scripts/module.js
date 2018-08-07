var _Template = (function(){
    return{
        LoadTopSlider: function(){
            var pageUrl = "templates/topslider.htm?npage=" + Math.random();
            $(".top-slider").load(pageUrl, function () {
                //onload callback
                _ModuleCharts.DrawSurplusChart();
                _ModuleCharts.DrawPPFChart();    
            });             
        },
        LoadAnimateArea: function(){
            var pageUrl = "templates/animate.htm?npage=" + Math.random();
            $(".t_animation_c").load(pageUrl, function () { 
                //onload callback                
                _Animation.MngAnimationEle();
            });             
        },
        LoadRangeSlider: function(){
            var pageUrl = "templates/slider.htm?npage=" + Math.random();
            $(".t_range-slider_c").load(pageUrl, function () {  
                _Slider.InitSelectTimeSlider();
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
});

function twoDecims(){
    
}