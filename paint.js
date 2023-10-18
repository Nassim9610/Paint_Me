let x0 = 0;
let y0 = 0;
let x1 = 0;
let y1 = 0;
let modifx =0;
let modify =0;
let distx = 0;
let disty = 0;
let dist = 0;
let W = 0;
let H = 0;
let mode = 0;
let drawing = false;
let form = 0;
var linetable=[];
var circletable=[];
var recttable=[];
var circletableFill=[];
var recttableFill=[];
let nbline = 0;
let nbcircle = 0;
let nbrect = 0;
let fill = false;
let color = "";

const button1 = document.createElement('button')
button1.id = 'mainButton1'
button1.addEventListener('click', () => {
    mode = 1;
  })
document.body.appendChild(button1)

const button2 = document.createElement('button')
button2.id = 'mainButton2'
button2.addEventListener('click', () => {
    mode = 2;
})
document.body.appendChild(button2)

const button3 = document.createElement('button')
button3.id = 'mainButton3'
button3.addEventListener('click', () => {
    mode = 3;
})
document.body.appendChild(button3)

const button4 = document.createElement('button')
button4.id = 'mainButton4'
button4.addEventListener('click', () => {
    mode = 4;
})
document.body.appendChild(button4)

const nofill = document.createElement('button')
nofill.id = 'nofill'
nofill.addEventListener('click', () => {
    fill = false;
})
document.body.appendChild(nofill)

const red = document.createElement('button')
red.id = 'red'
red.addEventListener('click', () => {
    fill = true;
    color = "red";
})
document.body.appendChild(red)

const blue = document.createElement('button')
blue.id = 'blue'
blue.addEventListener('click', () => {
    fill = true;
    color = "blue";
})
document.body.appendChild(blue)

const green = document.createElement('button')
green.id = 'green'
green.addEventListener('click', () => {
    fill = true;
    color = "green";
})
document.body.appendChild(green)

const buttonclear = document.createElement('button')
buttonclear.id = 'mainButtonclear'
buttonclear.addEventListener('click', () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    linetable = [];
    circletable = [];
    circletableFill = [];
    recttable = [];
    recttableFill = [];
})
document.body.appendChild(buttonclear)

const save = document.createElement('button')
save.id = 'save'
save.addEventListener('click', () => {
    saveaspng();
})
document.body.appendChild(save)

const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');
reset();



myCanvas.addEventListener('mousedown', e => {
    if (mode == 4){
        modifx = e.clientX;
        modify = e.clientY;
    }
    else { 
    reset();
    x0 = e.clientX;
    y0 = e.clientY;
    drawing = true;
    }
    });
        
myCanvas.addEventListener('mouseup', e => {
    if (fill == false){
        if (mode == 1){
            x1 = e.clientX;
            y1 = e.clientY;
            line(context, x0, y0, x1, y1);
            linetable.push(x0, y0, x1, y1);
            form = 1;
        }

        else if (mode == 2) {
            x1 = e.clientX;
            y1 = e.clientY;
            dist = Math.sqrt((Math.pow((x1 - x0), 2))+(Math.pow((y1 - y0), 2)));
            circle(context, x0, y0, dist);
            circletable.push(x0, y0, dist)
            form = 2;
        }

        else if (mode == 3) {
            x1 = e.clientX;
            y1 = e.clientY;
            W = x1 - x0;
            H = y1 - y0;
            square(context, x0, y0, W, H);
            recttable.push(x0, y0, x1, y1, W, H);
            form = 3;
        }

        else if (mode == 4) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            if (form == 1){
                x0 = linetable[linetable.length-4] - (modifx - e.clientX);
                y0 = linetable[linetable.length-3] - (modify - e.clientY);
                x1 = linetable[linetable.length-2] - (modifx - e.clientX);
                y1 = linetable[linetable.length-1] - (modify - e.clientY);
                linetable[linetable.length-4] = x0;
                linetable[linetable.length-3] = y0;
                linetable[linetable.length-2] = x1;
                linetable[linetable.length-1] = y1;
            }
            else if (form == 2){
                x0 = circletable[circletable.length-3] - (modifx - e.clientX);
                y0 = circletable[circletable.length-2] - (modify - e.clientY);
                circletable[circletable.length-3] = x0;
                circletable[circletable.length-2] = y0;
            }
            else if (form == 3){
                x0 = recttable[recttable.length-6] - (modifx - e.clientX);
                y0 = recttable[recttable.length-5] - (modify - e.clientY);
                x1 = recttable[recttable.length-4] - (modifx - e.clientX);
                y1 = recttable[recttable.length-3] - (modify - e.clientY);
                recttable[recttable.length-6] = x0;
                recttable[recttable.length-5] = y0;
            }
            for (i = 0; i < (linetable.length / 4); i++){
                x0 = linetable[i*4];
                y0 = linetable[1+i*4];
                x1 = linetable[2+i*4];
                y1 = linetable[3+i*4];
                line(context, x0, y0, x1, y1);
                
            }
            for (i = 0; i < (circletable.length / 3); i++){
                x0 = circletable[i*3];
                y0 = circletable[1+i*3];
                dist = circletable[2+i*3];
                circle(context, x0, y0, dist);
            }
            for (i = 0; i < (recttable.length / 6); i++){
                x0 = recttable[i*6];
                y0 = recttable[1+i*6];
                W = recttable[4+i*6];
                H = recttable[5+i*6];
                square(context, x0, y0, W, H);
            }
            for (i = 0; i < (circletableFill.length / 4); i++){
                x0 = circletableFill[i*4];
                y0 = circletableFill[1+i*4];
                dist = circletableFill[2+i*4];
                color = circletableFill[3+i*4];
                circleFill(context, x0, y0, dist, color);
            }
            for (i = 0; i < (recttableFill.length / 7); i++){
                x0 = recttableFill[i*7];
                y0 = recttableFill[1+i*7];
                W = recttableFill[4+i*7];
                H = recttableFill[5+i*7];
                color = recttableFill[6+i*7];
                squareFill(context, x0, y0, W, H, color);
            }

        }
    }
    else {
        if (mode == 1){
            x1 = e.clientX;
            y1 = e.clientY;
            line(context, x0, y0, x1, y1);
            linetable.push(x0, y0, x1, y1);
            form = 1;            
        }

        else if (mode == 2) {
            x1 = e.clientX;
            y1 = e.clientY;
            dist = Math.sqrt((Math.pow((x1 - x0), 2))+(Math.pow((y1 - y0), 2)));
            circleFill(context, x0, y0, dist, color);
            circletableFill.push(x0, y0, dist, color)
            form = 2;
        }

        else if (mode == 3) {
            x1 = e.clientX;
            y1 = e.clientY;
            W = x1 - x0;
            H = y1 - y0;
            squareFill(context, x0, y0, W, H, color);
            recttableFill.push(x0, y0, x1, y1, W, H, color);
            form = 3;
        }

        else if (mode == 4) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            if (form == 1){
                x0 = linetable[linetable.length-4] - (modifx - e.clientX);
                y0 = linetable[linetable.length-3] - (modify - e.clientY);
                x1 = linetable[linetable.length-2] - (modifx - e.clientX);
                y1 = linetable[linetable.length-1] - (modify - e.clientY);
                linetable[linetable.length-4] = x0;
                linetable[linetable.length-3] = y0;
                linetable[linetable.length-2] = x1;
                linetable[linetable.length-1] = y1;
            }
            else if (form == 2){
                x0 = circletableFill[circletableFill.length-4] - (modifx - e.clientX);
                y0 = circletableFill[circletableFill.length-3] - (modify - e.clientY);
                circletableFill[circletableFill.length-4] = x0;
                circletableFill[circletableFill.length-3] = y0;
            }
            else if (form == 3){
                x0 = recttableFill[recttableFill.length-7] - (modifx - e.clientX);
                y0 = recttableFill[recttableFill.length-6] - (modify - e.clientY);
                x1 = recttableFill[recttableFill.length-5] - (modifx - e.clientX);
                y1 = recttableFill[recttableFill.length-4] - (modify - e.clientY);
                recttableFill[recttableFill.length-7] = x0;
                recttableFill[recttableFill.length-6] = y0;
            }
            for (i = 0; i < (linetable.length / 4); i++){
                x0 = linetable[i*4];
                y0 = linetable[1+i*4];
                x1 = linetable[2+i*4];
                y1 = linetable[3+i*4];
                line(context, x0, y0, x1, y1);
            }
            for (i = 0; i < (circletable.length / 3); i++){
                x0 = circletable[i*3];
                y0 = circletable[1+i*3];
                dist = circletable[2+i*3];
                circle(context, x0, y0, dist);
            }
            for (i = 0; i < (recttable.length / 6); i++){
                x0 = recttable[i*6];
                y0 = recttable[1+i*6];
                W = recttable[4+i*6];
                H = recttable[5+i*6];
                square(context, x0, y0, W, H);
            }
            for (i = 0; i < (circletableFill.length / 4); i++){
                x0 = circletableFill[i*4];
                y0 = circletableFill[1+i*4];
                dist = circletableFill[2+i*4];
                color = circletableFill[3+i*4];
                circleFill(context, x0, y0, dist, color);
            }
            for (i = 0; i < (recttableFill.length / 7); i++){
                x0 = recttableFill[i*7];
                y0 = recttableFill[1+i*7];
                W = recttableFill[4+i*7];
                H = recttableFill[5+i*7];
                color = recttableFill[6+i*7];
                squareFill(context, x0, y0, W, H, color);
            }

        }
    }
});

function line(context, x0, y0, x1, y1){
if (canvas.getContext) 
 {
  context.beginPath(); 
  context.moveTo(x0, y0);
  context.lineTo(x1, y1);
  context.stroke();
   }}

function circle (context, x0, y0, dist){
    if (canvas.getContext)
    {
        var c = document.getElementById("myCanvas");
        var context = c.getContext("2d");
        context.beginPath();
        context.arc(x0, y0, dist, 0, 2 * Math.PI);
        context.stroke();
    }
}

function square(context, x0, y0, W, H){
    if (canvas.getContext){
        var c = document.getElementById("myCanvas");
        var context = c.getContext("2d");
        context.beginPath();
        context.rect(x0, y0, W, H);
        context.stroke();
        canvas.width = 550;
canvas.height = 300;
drawScreen();

formElement = document.getElementById("height");
formElement.addEventListener('change', heightCanged, true);

formElement = document.getElementById("width");
formElement.addEventListener('change', widthCanged, false);

function widthChanged(e) {
  var target = e.target;
  canvas.width = target.value;
  drawScreen();
}

function heightChanged(e) {
  var target = e.target;
  canvas.height = target.value;
  drawScreen();
}
    }
}
function circleFill (context, x0, y0, dist, color){
    if (canvas.getContext)
    {
        var c = document.getElementById("myCanvas");
        var context = c.getContext("2d");
        context.fillStyle = color;
        context.beginPath();
        context.arc(x0, y0, dist, 0, 2 * Math.PI);
        context.fill();
        canvas.width = 550;
canvas.height = 300;
drawScreen();

formElement = document.getElementById("height");
formElement.addEventListener('change', heightCanged, true);

formElement = document.getElementById("width");
formElement.addEventListener('change', widthCanged, false);

function widthChanged(e) {
  var target = e.target;
  canvas.width = target.value;
  drawScreen();
}

function heightChanged(e) {
  var target = e.target;
  canvas.height = target.value;
  drawScreen();
}
    }
    }
    
function squareFill(context, x0, y0, W, H, color){
    if (canvas.getContext){
        var c = document.getElementById("myCanvas");
        var context = c.getContext("2d");
        context.fillStyle = color;
        context.beginPath();
        context.fillRect(x0, y0, W, H);
        context.fill();
        canvas.width = 550;
canvas.height = 300;
drawScreen();

formElement = document.getElementById("height");
formElement.addEventListener('change', heightCanged, true);

formElement = document.getElementById("width");
formElement.addEventListener('change', widthCanged, false);

function widthChanged(e) {
  var target = e.target;
  canvas.width = target.value;
  drawScreen();
}

function heightChanged(e) {
  var target = e.target;
  canvas.height = target.value;
  drawScreen();
}
    }
}


function reset(){
    x0 = 0;
    y0 = 0;
    x1 = 0;
    y1 = 0;
    dist = 0;
    W = 0;
    H = 0;
    drawing = false;
    form = 0;
}
function saveaspng() {
	let div = document.getElementById('draw');
	html2canvas(div).then(canvas => {
    const image = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.setAttribute('download', 'draw.png')
    a.setAttribute('href', image)
    a.click()
    canvas.remove()
	})
}
function export_pdf(){
    html2canvas(document.querySelector("#myCanvas")).then(canvas => {
    canvas.toBlob(function(blob) {
    window.saveAs(blob, 'canva.pdf');

    });
    });
}
function export_jpeg(){
    html2canvas(document.querySelector("#myCanvas")).then(canvas => {
    canvas.toBlob(function(blob) {
    window.saveAs(blob, 'canva.jpg');
    });
    });
}

