$(function () {
    var appsMenuItems = document.querySelectorAll('#appmenu > li');
    var subMenuItems = document.querySelectorAll('#appmenu > li li');
    var keys = {
        tab: 9,
        enter: 13,
        esc: 27,
        space: 32,
        left: 37,
        up: 38,
        right: 39,
        down: 40
    };
    var currentIndex, subIndex;

    var gotoIndex = function (idx) {
        if (idx == appsMenuItems.length) {
            idx = 0;
        } else if (idx < 0) {
            idx = appsMenuItems.length - 1;
        }
        appsMenuItems[idx].focus();
        currentIndex = idx;
    };

    var gotoSubIndex = function (menu, idx) {
        var items = menu.querySelectorAll('li');
        if (idx == items.length) {
            idx = 0;
        } else if (idx < 0) {
            idx = items.length - 1;
        }
        items[idx].focus();
        subIndex = idx;
    }

    Array.prototype.forEach.call(appsMenuItems, function (el, i) {
        if (0 == i) {
            //el.setAttribute('tabindex', '0');
            el.addEventListener("focus", function () {
                console.log("focus1:appsMenuItems");
                currentIndex = 0;
            });
        } else {
            //el.setAttribute('tabindex', '-1');
        }
        el.addEventListener("focus", function () {
            console.log("focus2:appsMenuItems");
            subIndex = 0;
            Array.prototype.forEach.call(appsMenuItems, function (el, i) {
                el.setAttribute('aria-expanded', "false");
                $(el).css({ 'background': '#045C42' })
                $(el).children('img').attr("src", "scripts/external/menu/menu-icon.png");

            });
        });
        
        el.setAttribute('tabindex', '1');
        el.addEventListener("click", function (event) {
            console.log("click:appsMenuItems");
            if (this.getAttribute('aria-expanded') == 'false' || this.getAttribute('aria-expanded') == null) {
                this.setAttribute('aria-expanded', "true");
                $(this).parent().find('li').css({ 'background': '#FFF' });
                $("#appmenu").children('li:first').css({ "border": "2px solid #045C42", "border-bottom": "0px", "border-top-left-radius": "5px", "border-top-right-radius": "5px" });
                $(this).children('img').attr("src", "scripts/external/menu/menu-icon-rollover-v1.png");
                $('#appmenulist').find('li:nth-child(1)').focus();
            } else {
                this.setAttribute('aria-expanded', "false");
                $(this).parent().find('li').css({ 'background': '#045C42' })
                $(this).children('img').attr("src", "scripts/external/menu/menu-icon.png");
            }
            event.preventDefault();
            return false;
        });
        el.addEventListener("keydown", function (event) {
            console.log("keydown:appsMenuItems");
            var prevdef = false;
            switch (event.keyCode) {
                case keys.right:
                    gotoIndex(currentIndex + 1);
                    prevdef = true;
                    break;
                case keys.left:
                    gotoIndex(currentIndex - 1);
                    prevdef = true;
                    break;
                case keys.tab:
                    break;
                case keys.enter:
                case keys.down:
                    this.click();
                    subindex = 0;
                    gotoSubIndex(this.querySelector('ul'), 0);
                    prevdef = true;
                    break;
                case keys.up:
                    this.click();
                    var submenu = this.querySelector('ul');
                    subindex = submenu.querySelectorAll('li').length - 1;
                    gotoSubIndex(submenu, subindex);
                    prevdef = true;
                    break;
                case keys.esc:
                    document.querySelector('#appmenulibar').setAttribute('tabindex', '-1');
                    document.querySelector('#appmenulibar').focus();
                    prevdef = true;
            }
            if (prevdef) {
                event.preventDefault();
            }
        });
    });

    Array.prototype.forEach.call(subMenuItems, function (el, i) {
        el.setAttribute('tabindex', '-1');
        el.addEventListener("keydown", function (event) {
            console.log("keydown:subMenuItems");
            if(event.target.id === "appmenulibar") return;
            
            var prevdef = false;
            switch (event.keyCode) {
                case keys.tab:
                    if (event.shiftKey) {
                        gotoIndex(currentIndex - 1);
                    } else {
                        gotoIndex(currentIndex + 1);
                    }
                    prevdef = true;
                    break;
                case keys.right:
                    gotoIndex(currentIndex + 1);
                    prevdef = true;
                    break;
                case keys.left:
                    gotoIndex(currentIndex - 1);
                    prevdef = true;
                    break;
                case keys.esc:
                    gotoIndex(0);
                    prevdef = true;
                    break;
                case keys.down:
                    gotoSubIndex(this.parentNode, subIndex + 1);
                    prevdef = true;
                    break;
                case keys.up:
                    gotoSubIndex(this.parentNode, subIndex - 1);
                    prevdef = true;
                    break;
                case keys.enter:
                    var levelPageId = $(event.target).find(".menuitem").attr("data-id");
                    _Navigator.LoadPage(levelPageId);
                    $("#appmenu li").attr("aria-expanded", false).css({ 'background': '#045C42' });
                    $("#appmenu li img").attr("src", "scripts/external/menu/menu-icon.png");
                case keys.space:
                    prevdef = true;
                    break;
            }
            if (prevdef) {
                event.preventDefault();
                event.stopPropagation();
            }
            return false;
        });
        el.addEventListener("click", function (event) {
            console.log("click:subMenuItems");
            var levelPageId = event.target.getAttribute("data-id");
            var jsonObj = {};
            jsonObj.isMenuVisit = true;
            jsonObj.pageId = levelPageId;
            _Navigator.LoadPage(levelPageId, jsonObj);
            $("#appmenu li").attr("aria-expanded", false).css({ 'background': '#045C42' });
            $("#appmenu li img").attr("src", "scripts/external/menu/menu-icon.png");
            event.preventDefault();
            event.stopPropagation();
            return false;
        });
    });
    
/*

    //other
    var $otherTrigger = $('.other-trigger'),
      $otherTriggerWord = $('.other-trigger-status'),
      $otherMenu = $('.other-primary-navigation');

  function toggleOtherTriggerClass() {
    if (!$otherTrigger.hasClass('is-active')) {
      $otherTrigger.addClass('is-active');
      $otherTrigger.attr("aria-expanded","true");
    } else {
      $otherTrigger.removeClass('is-active');
      $otherTrigger.attr("aria-expanded","false");
    }
  };

  function toggleOtherTriggerWord() {
    if ($otherTriggerWord.hasClass('closed')) {
      $otherTriggerWord.removeClass('closed');
      $otherTriggerWord.addClass('open');
      $otherTrigger.children('img').attr("src", "scripts/external/menu/menu-icon-rollover-v1.png");
    } else {
      $otherTriggerWord.removeClass('open');
      $otherTriggerWord.addClass('closed');
      $otherTrigger.children('img').attr("src", "scripts/external/menu/menu-icon.png");
    }
  };

  function toggleOtherMenuClass() {
    if (!$otherMenu.hasClass('is-visible')) {
      $otherMenu.addClass('is-visible');
      $otherMenu.focus();
    } else {
      $otherMenu.removeClass('is-visible');
    }
  };

  function toggleOtherMenu() {
    $otherTrigger.on("click", function(e){
        debugger;
      toggleOtherTriggerClass();
      toggleOtherMenuClass();
      toggleOtherTriggerWord();
      $otherMenu.slideToggle("fast");
    });
  };

  function resetOtherMenu() {
    if (!$otherMenu.hasClass('is-visible')) {
      $otherMenu.removeAttr('style');
    } else {
      $otherMenu.removeClass('is-visible').removeAttr('style');
    }
  };

  function resetOtherMenuTrigger() {
    if (!$otherTrigger.hasClass('is-active')) {
      return
    } else {
      $otherTrigger.removeClass('is-active');
    }
  };
  debugger;
  toggleOtherMenu();
*/  
})