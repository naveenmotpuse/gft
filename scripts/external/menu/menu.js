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
                currentIndex = 0;
            });
        } else {
            //el.setAttribute('tabindex', '-1');
        }
        el.addEventListener("focus", function () {
            subIndex = 0;
            Array.prototype.forEach.call(appsMenuItems, function (el, i) {
                el.setAttribute('aria-expanded', "false");
                $(el).css({ 'background': '#045C42' })
                $(el).children('img').attr("src", "scripts/external/menu/menu-icon.png");

            });
        });
        
        el.setAttribute('tabindex', '1');
        el.addEventListener("click", function (event) {
            if (this.getAttribute('aria-expanded') == 'false' || this.getAttribute('aria-expanded') == null) {
                this.setAttribute('aria-expanded', "true");
                $(this).parent().find('li').css({ 'background': '#FFF' });
                $("#appmenu").children('li:first').css({ "border": "2px solid #045C42", "border-bottom": "0px", "border-top-left-radius": "5px", "border-top-right-radius": "5px" });
                $(this).children('img').attr("src", "scripts/external/menu/menu-icon-rollover-v1.png");

            } else {
                this.setAttribute('aria-expanded', "false");
                $(this).parent().find('li').css({ 'background': '#045C42' })
                $(this).children('img').attr("src", "scripts/external/menu/menu-icon.png");
            }
            event.preventDefault();
            return false;
        });
        el.addEventListener("keydown", function (event) {
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
                    document.querySelector('#escape').setAttribute('tabindex', '-1');
                    document.querySelector('#escape').focus();
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
                    //alert(1);
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
                    //addEventListener();
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
            var levelPageId = event.target.getAttribute("data-id");
            //_Navigator.LoadPage(levelPageId);
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
})