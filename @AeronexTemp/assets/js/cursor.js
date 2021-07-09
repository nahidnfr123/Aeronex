$("body").append('<div class="aeronex-cursor shrinkCursor"><div class="cursor-dot"></div><div class="cursor-follower"></div></div>');
document.body.style.cursor = "none";
document.body.style.overflowX = "hidden";


// Custom Cursor ...
var cursor = $(".cursor-dot"), follower = $(".cursor-follower");
var posX = 0, posY = 0;
var mouseX = 0, mouseY = 0;

// Hide Mouse ...
var cur = document.querySelector('.aeronex-cursor');
var body = document.body, html = document.documentElement;

// Window sizes ...
let winsize;
const calcWinsize = () => winsize = {width: Math.max(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth), 
    height: Math.max(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)};
calcWinsize();
// Recalculate window sizes on resize ...
window.addEventListener('resize', calcWinsize);

TweenMax.to({}, 0.016, {
    repeat: -1,
    onRepeat: function() {
        posX += (mouseX - posX) / 5;
        posY += (mouseY - posY) / 5;
        
        TweenMax.set(follower, {
            css: {    
            left: posX - 14,
            top: posY - 14
            }
        });
        
        TweenMax.set(cursor, {
            css: {    
            left: mouseX - 3,
            top: mouseY - 3
            }
        });
    }
});

$(document).on("mousemove", function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if( mouseX <= 4 || mouseY <= 4 || mouseX >= (winsize.width - 4) || mouseY >= (winsize.height - 4) ){
        if(!cur.classList.contains('shrinkCursor')){
            cur.classList.add('shrinkCursor');
        }
    }else{
        if(cur.classList.contains('shrinkCursor')){
            cur.classList.remove('shrinkCursor');
        }
    }
});

$("[data-hover]").on("mouseenter", function() {
    cursor.addClass("active");
    follower.addClass("active");
});
$("[data-hover]").on("mouseleave", function() {
    cursor.removeClass("active");
    follower.removeClass("active");
});





// Move Link while hover ....
const animateit = function (e) {
    const span = this.querySelector('.hoverMove');
    if(span != null){
        const { offsetX: x, offsetY: y } = e,
        { offsetWidth: width, offsetHeight: height } = this,
        move = 25,
        xMove = x / width * (move * 2) - move,
        yMove = y / height * (move * 2) - move;

        span.style.transform = `translate(${xMove}px, ${yMove}px)`;

        if (e.type === 'mouseleave') span.style.transform = '';
    }
};

const link = document.querySelectorAll('[data-hover]');
link.forEach(b => b.addEventListener('mousemove', animateit));
link.forEach(b => b.addEventListener('mouseleave', animateit));































// // ---------------------------- Cursor ---------------------------------- //
// {
//     // Some help functions.
//     const shuffleArray = arr => arr.sort(() => Math.random() - 0.5);
//     const lineEq = (y2, y1, x2, x1, currentVal) => {
//         let m = (y2 - y1) / (x2 - x1); 
//         let b = y1 - m * x1;
//         return m * currentVal + b;
//     };
//     const lerp = (a, b, n) => (1 - n) * a + n * b;
//     const body = document.body;
//     const bodyColor = getComputedStyle(body).getPropertyValue('--color-bg').trim() || 'white';
//     const getMousePos = (e) => {
//         let posx = 0;
//         let posy = 0;
//         if (!e) e = window.event;
//         if (e.pageX || e.pageY) {
//             posx = e.pageX;
//             posy = e.pageY;
//         }
//         else if (e.clientX || e.clientY) 	{
//             posx = e.clientX + body.scrollLeft + document.documentElement.scrollLeft;
//             posy = e.clientY + body.scrollTop + document.documentElement.scrollTop;
//         }
//         return { x : posx, y : posy }
//     }

//     // Window sizes.
//     let winsize;
//     const calcWinsize = () => winsize = {width: window.innerWidth, height: window.innerHeight};
//     calcWinsize();
//     // Recalculate window sizes on resize.
//     window.addEventListener('resize', calcWinsize);

//     // Custom mouse cursor.
//     class CursorFx {
//         constructor(el) {
//             this.DOM = {el: el};
//             this.DOM.dot = this.DOM.el.querySelector('.cursor__inner--dot');
//             this.DOM.circle = this.DOM.el.querySelector('.cursor__inner--circle');
//             this.DOM.moveableLink = this.DOM.el.querySelectorAll('span');
//             this.bounds = {dot: this.DOM.dot.getBoundingClientRect(), circle: this.DOM.circle.getBoundingClientRect()};
//             this.scale = 1;
//             this.opacity = 1;
//             this.mousePos = {x:-40, y:-40};
//             this.lastMousePos = {dot: {x:0, y:0}, circle: {x:0, y:0}};
//             this.lastScale = 1;
//             this.lastOpacity = 1;
//             this.transform = '';
//             this.offsetWidth = this.DOM.offsetWidth;
//             this.offsetHeight = this.DOM.offsetHeight;
            
//             this.initEvents();
//             requestAnimationFrame(() => this.render());
//         }
//         initEvents() {
//             // window.addEventListener('mousemove', ev => this.mousePos = getMousePos(ev));
//             window.addEventListener('mousemove', ev => this.mousePos = getMousePos(ev));
//             window.addEventListener('mousemove', (ev)=>{
//                 let cur = document.querySelector('.cursor');
//                 var body = document.body, html = document.documentElement;
//                 var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
//                 //var windowWidth = Math.max( body.scrollWidth, body.offsetWidth, html.clientHeight, html.scrollWidth, html.offsetWidth );
//                 var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
//                 //var windowHeight = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );

//                 if( this.mousePos.x <= 2 || this.mousePos.y <= 4 || this.mousePos.x >= (windowWidth - 2) || this.mousePos.y >= (windowHeight - 4) ){
//                     if(!cur.classList.contains('shrinkCursor')){
//                         cur.classList.add('shrinkCursor');
//                     }
//                 }else{
//                     if(cur.classList.contains('shrinkCursor')){
//                         cur.classList.remove('shrinkCursor');
//                     }
//                 }
//             });
            
//         }
//         render() {
//             this.lastMousePos.dot.x = lerp(this.lastMousePos.dot.x, this.mousePos.x - this.bounds.dot.width/2, 1);
//             this.lastMousePos.dot.y = lerp(this.lastMousePos.dot.y, this.mousePos.y - this.bounds.dot.height/2, 1);
//             this.lastMousePos.circle.x = lerp(this.lastMousePos.circle.x, this.mousePos.x - this.bounds.circle.width/2, 0.15);
//             this.lastMousePos.circle.y = lerp(this.lastMousePos.circle.y, this.mousePos.y - this.bounds.circle.height/2, 0.15);
//             this.lastScale = lerp(this.lastScale, this.scale, 0.15);
//             this.lastOpacity = lerp(this.lastOpacity, this.opacity, 0.1);
//             this.DOM.dot.style.transform = `translateX(${(this.lastMousePos.dot.x)}px) translateY(${this.lastMousePos.dot.y}px)`;
//             this.DOM.circle.style.transform = `translateX(${(this.lastMousePos.circle.x)}px) translateY(${this.lastMousePos.circle.y}px) scale(${this.lastScale})`;
//             this.DOM.circle.style.opacity = this.lastOpacity
            
//             requestAnimationFrame(() => this.render());
//         }
//         enter() {
//             cursor.scale = 2.8;
//         }
//         leave() {
//             cursor.scale = 1;
//         }
//         click() {
//             this.lastScale = 1;
//             cursor.scale = 2;
//             this.lastOpacity = 0;
//         }
//     }
    
//     const cursor = new CursorFx(document.querySelector('.cursor'));

//     // Custom cursor chnages state when hovering on elements with 'data-hover'.
//     [...document.querySelectorAll('[data-hover]')].forEach((link) => {
//         link.addEventListener('mouseenter', () => cursor.enter() );
//         link.addEventListener('mouseleave', () => cursor.leave() );
//         link.addEventListener('click', () => cursor.click() );
//     });
// }



// //document.body.style.cursor = "none";
// document.body.style.overflowX = "hidden";


// // window.onload = init;
// // function init() {
// // 	if (window.Event) {
// // 	document.captureEvents(Event.MOUSEMOVE);
// // 	}
// // 	document.onmousemove = getCursorXY;
// // }

// // function getCursorXY(e) {
// // 	document.getElementById('cursorX').value = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
// // 	document.getElementById('cursorY').value = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
// // }


