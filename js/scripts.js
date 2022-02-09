var w = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;


$(window).load(function() {});

$(window).resize(function() {});

$(document).scroll(function() {});

$(document).ready(function() {

    $(".dropdown_title").on("click", function(e) {
      e.preventDefault();
      parent = $(this).closest(".dropdown_box");
      if(parent.hasClass("active")) {
        parent.removeClass("active");
      } else {
        $(".dropdown_box").removeClass("active");
        parent.addClass("active");
      }
    });

    $(".val").on("click", function(e) {
      e.preventDefault();
      parent = $(this).closest(".dropdown_box");
      activeVal = parent.find(".active_val");
      parent.find(".hide_val").val($(this).html());
      activeVal.html($(this).html());
      parent.removeClass("active");
      parent.find(".val").removeClass("hidden");
      parent.find(".val").each(function() {
        if($(this).text() == parent.find(".active_val").text()) {
          $(this).addClass("hidden");
        }
      });
    });

    $(this).keydown(function(eventObject){
      if (eventObject.which == 27) {
        $(".dropdown_box").removeClass("active");
      }
    });

    $(document).on("mouseup", function(e) {
        e.preventDefault();
        hide_element = $(".dropdown_box");
        if (!hide_element.is(e.target)
            && hide_element.has(e.target).length === 0
            && hide_element.hasClass("active")) {
          hide_element.removeClass("active")
        }
    });

    // ---------------

    $(document).on("click", "[data-popup-link]",  function(e) {
      e.preventDefault();
      popupName = $(this).attr("data-popup-link");
      div = document.createElement('div');
      div.style.overflowY = 'scroll';
      div.style.width = '50px';
      div.style.height = '50px';
      div.style.visibility = 'hidden';
      document.body.appendChild(div);
      scrollWidth = div.offsetWidth - div.clientWidth;
      document.body.removeChild(div);
      $("body").addClass("fixed");
      $("body").css({
          "position" : "fixed",
          "top" :  -$(document).scrollTop() + "px",
          "overflow" : "hidden",
          "right" : 0,
          "left" : 0,
          "bottom" : 0,
          "padding-right" : scrollWidth + "px"
      });
      $(".popup_bg").fadeIn(300);
      $("[data-popup = '"+ popupName +"']").fadeIn(300);
    });
    $(document).on("click", ".close_popup, .popup_bg, .close_pill", function(e) {
      e.preventDefault();
      curTop = $("body").css("top");
      curTop = Math.abs(parseInt(curTop, 10));
      $("body").attr("style", "");
      if (curTop !== 0) {
          $("html").scrollTop(curTop);
      }
      $("body").removeClass("fixed");
      $(".popup_bg").fadeOut(300);
      $("[data-popup]").fadeOut(300);
    });
    $(this).keydown(function(eventObject){
      if (eventObject.which == 27 && $("body").hasClass("fixed")) {
        curTop = $("body").css("top");
        curTop = Math.abs(parseInt(curTop, 10));
        $("body").attr("style", "");
        if (curTop !== 0) {
            $("html").scrollTop(curTop);
        }
        $("body").removeClass("fixed");
        $(".popup_bg").fadeOut(300);
        $("[data-popup]").fadeOut(300);
      }
    });
    $(document).on("mouseup", function(e) {
      if($(".popup").is(":visible")) {
        e.preventDefault();
        hide_element = $(".popup_content");
        if (!hide_element.is(e.target)
            && hide_element.has(e.target).length === 0) {
            curTop = $("body").css("top");
            curTop = Math.abs(parseInt(curTop, 10));
            $("body").attr("style", "");
            if (curTop !== 0) {
                $("html").scrollTop(curTop);
            }
            $("body").removeClass("fixed");
            $(".popup_bg").fadeOut(300);
            $("[data-popup]").fadeOut(300);
        }
      }
    });

});