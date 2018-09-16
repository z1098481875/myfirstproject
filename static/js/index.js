var news= document.getElementsByClassName("news-section");
console.log(news);
for(var value of news){
    var text = value.innerHTML.slice(0,50);
    console.log(text);
    value.innerHTML=text;
}
function indexMask(){
    $("#index-mask").css({display:"none"})
    $("#index-inner").css({display:"block"})
}
$("#index-mask img:last-child").on("click",indexMask)
$("#index-mask img:last-child").css({display:"none"})
$("#index-mask img:last-child").fadeIn(1500,"linear");
$(".nav_right>span").hover(
    function(){
        $(".nav_right>span").removeClass("hover");
        $(this).addClass("hover");
        },
    function(){
        $(this).removeClass("hover");
        $(".nav_right>span:first-child").addClass("hover");
    }
)
window.onscroll=function() {
    var scrollTop = document.body.scrollTop
        ||document.documentElement.scrollTop;
    var clientTop = document.documentElement.clientHeight;
    var contents = $(".content");
    for (var i = 0; i < contents.length; i++) {
        if (i == 0 || i == 2) {
            if ((contents[i].offsetTop - clientTop) <= scrollTop) {
                $(contents[i]).children(".title-top").animate({
                    top: 0
                }, 1500)
                if(i == 0){
                    $(contents[i]).find(".scale-img").css({
                        transform:"scale(1)",
                        transition:"all 1.5s linear"
                    })
                }
            }
        } else if (i == 1 || i == 3) {
            if ((contents[i].offsetTop - clientTop) <= scrollTop) {
                $(contents[i]).children(".container").children(".title-top").animate({
                    top: 0
                }, 1500)
            }
        }else if(i==4){
            if ((contents[i].offsetTop - clientTop) <= scrollTop) {
                $(contents[i]).find(".rotate-img").css({
                    transform:"rotate3D(0,1,0,180deg)",
                    transition:"all 2s linear"
                })
            }
        }
    }
}

