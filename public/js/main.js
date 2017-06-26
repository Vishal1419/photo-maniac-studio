var pageRefreshed = false;

$(window).on("load", function() {
    pageRefreshed = true;
});

$(document).ready(function () {

    var selectedolditem = localStorage.getItem('selectedolditem');

    if (selectedolditem != null) {
        $(".nav").find(".active").removeClass("active");
        console.log(selectedolditem);
        $('#' + selectedolditem).parent().addClass("active");
    }

    $(".nav a").on("click", function(){
        var id = $(this).attr("id");
        $(".nav").find(".active").removeClass("active");
        $(this).parent().addClass("active");
        localStorage.setItem("selectedolditem", id);
    });

    $(document).on("click", ".navbar-brand", function() {
        var id = 'home';
        $(".nav").find(".active").removeClass("active");
        $('#home').parent().addClass("active");
        localStorage.setItem("selectedolditem", id);
    });

    $(document).on("click", ".triangle-left a", function(){
        var leftPos = $('.scrollable-container').scrollLeft();
        $(".scrollable-container").animate({scrollLeft: leftPos - 400}, 400);
    });

    $(document).on("click", ".triangle-right a", function(){
        console.log('click fired');
        var leftPos = $('.scrollable-container').scrollLeft();
        $(".scrollable-container").animate({scrollLeft: leftPos + 400}, 400);
    });

    $(document).on("mouseenter", ".t .wrap .triangle a", function(){
        var value = $(".t .wrap:hover .triangle p").text();
        $(".t-wrapper + div p.detail").text(value);
    });

    $(document).on("mouseleave", ".t .wrap .triangle a", function(){
        $(".t-wrapper + div p.detail").text('');
    });

});