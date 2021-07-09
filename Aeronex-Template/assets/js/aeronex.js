
const mouseCursor = document.querySelector('.cursor');
const hoverItems = document.querySelectorAll('.hoverItems');

window.addEventListener('mousemove', cursor);

function cursor(e){
    mouseCursor.setAttribute("style", "top: " + e.pageY + 'px; left: ' + e.pageX + 'px;');
    //mouseCursor.style.top = e.pageY + "px";
    //mouseCursor.style.left = e.pageX + "px";
    //mouseCursor.style.transform = "translate3D(" + e.pageX + "px, " + e.pageY + "px, " +", 0px)"
}

hoverItems.forEach(hoverItem => {
    hoverItem.addEventListener('mouseover', ()=>{
        mouseCursor.classList.add('hover');
        hoverItem.classList.add('hoveredLink');
    });
    
    hoverItem.addEventListener('mouseleave', ()=>{
        mouseCursor.classList.remove('hover');
        hoverItem.classList.remove('hoveredLink');
    });
});



document.querySelector('body').classList.add('-cursor');