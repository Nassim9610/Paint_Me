const el = document.querySelector(".dim");
let isResizing = false;

el.addEventListener("mousedown",mousedown);

function mousedown(e) {
    window.addEventListener("mousemove",mousemove);
    window.addEventListener("mouseup",mouseup);
    
    let prevX = e.clientX;
    let prevY = e.clientY;

    function mousemove(e) {A
        if (!isResizing){
        

        let newX = prevX - e.clientX;
        let newY = prevY - e.clientY;
        const rect = el.getBoundingClientRect();
        el.style.left = rect.left -newX + "px";
        el.style.top = rect.top -newY + "px";
        prevX = e.clientX;
        prevY = e.clientY;
        }
    }
    function mouseup() {
        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
       }
}

const resizers = document.querySelectorAll(".resizer");
let currentResize;
for(let resizer of resizers) {
    resizer.addEventListener('mousedown',mousedown);
    function mousedown(e) {
        currentResizer = e.target;
        isResizing = true;

        let prevX = e.clientX;
        let prevY = e.clientY;


        window.addEventListener('mousemove',mousemove);
        window.addEventListener('mouseup',mouseup);
        
        function mousemove(e) {
            const rect = el.getBoundingClientRect();
            if(currentResizer.classList.contains('bd')){
                el.style.width = rect.width - (prevX - e.clientX) + "px";
                el.style.height = rect.height - (prevY - e.clientY) + "px";
            }
            else if(currentResizer.classList.contains('bg')){
                el.style.width = rect.width + (prevX - e.clientX) + "px";
                el.style.height = rect.height - (prevY - e.clientY) + "px";
                el.style.left = rect.left - (prevX - e.clientX) + "px";
            }
            else if(currentResizer.classList.contains('hd')){
                el.style.width = rect.width - (prevX - e.clientX) + "px";
                el.style.height = rect.height + (prevY - e.clientY) + "px";
                el.style.top = rect.top - (prevY - e.clientY) + "px";  
            }
          
            
            prevX = e.clientX;
            prevY = e.clientY;
        }
        function mouseup() {
            window.removeEventListener('mousemove',mousemove);
            window.removeEventListener('mouseup',mouseup);
            isResizing = false;
        }
    }
}
