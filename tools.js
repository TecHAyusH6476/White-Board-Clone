let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");
let undo = document.querySelector("#undo");
let redo = document.querySelector("#redo");
let pencilOptions = document.querySelector("#pencil-options");
let eraserOptions = document.querySelector("#eraser-options"); 
let black = document.querySelector(".black");
let blue = document.querySelector(".blue");
let yellow = document.querySelector(".yellow");
let red = document.querySelector(".red");
let pencilSlider = document.querySelector("#pencil-slider");
let eraserSlider = document.querySelector("#eraser-slider");


let activeTool = "pencil";
let pencilWidth = ctx.lineWidth;
let eraserWidth = ctx.lineWidth;

pencil.addEventListener("click" , function(){
    activeTool = "pencil";

    if(pencil.classList.contains("active-tool")){
        if(pencilOptions.classList.contains("tool-options-active")){
            pencilOptions.classList.remove("tool-options-active");
        }
        else{
            pencilOptions.classList.add("tool-options-active");
        }
    }
    else{
        eraser.classList.remove("active-tool");    
        eraserOptions.classList.remove("tool-options-active");
        pencil.classList.add("active-tool");
        ctx.strokeStyle = "black";
        ctx.lineWidth = pencilWidth;
    }
})

eraser.addEventListener("click" , function(){
    activeTool = "eraser";

    if(eraser.classList.contains("active-tool")){
        if(eraserOptions.classList.contains("tool-options-active")){
            eraserOptions.classList.remove("tool-options-active");
        }else{
            eraserOptions.classList.add("tool-options-active");
        }
    }
    else{
        pencil.classList.remove("active-tool");
        pencilOptions.classList.remove("tool-options-active");
        eraser.classList.add("active-tool");
        ctx.strokeStyle = "white";
        ctx.lineWidth = eraserWidth;
    }

})


undo.addEventListener("click" , function(){
    //1. Remove last line from points
    removeLastLine();
    //2. UI clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //3. reDraw line using points 
    reDraw();
})


redo.addEventListener("click" , function(){
    // console.log("redo clicked");
    // console.log(redoPoints);
    if(redoPoints.length>=1){
        let lastLine = redoPoints.pop();
        for(let i=0 ; i<lastLine.length ; i++){
            points.push(lastLine[i]);
            if(lastLine[i].id=="md"){
                ctx.strokeStyle = lastLine[i].color;
                ctx.lineWidth = lastLine[i].width;
                ctx.beginPath();
                ctx.moveTo(lastLine[i].x , lastLine[i].y);
            }
            else{
                ctx.strokeStyle = lastLine[i].color;
                ctx.lineWidth = lastLine[i].width;
                ctx.lineTo(lastLine[i].x , lastLine[i].y);
                ctx.stroke();
            }
        }
    }
})


function removeLastLine(){
    if(points.length == 0){
        return;
    }
    let linePoints=[];
    let idx = points.length-1;
    if(idx >= 0){
        while(points[idx].id != "md" ){
           // pop from points and addFirst to point
            linePoints.unshift(points.pop());
            idx--;
        }
        linePoints.unshift(points.pop());
        redoPoints.push(linePoints);
    }
}


function reDraw(){
    for(let i = 0 ; i<points.length ; i++){
        if(points[i].id =="md"){
            ctx.strokeStyle = points[i].color;
            ctx.lineWidth = points[i].width;
            ctx.beginPath();
            ctx.moveTo(points[i].x , points[i].y);
        }
        else{
            ctx.strokeStyle = points[i].color;
            ctx.lineWidth = points[i].width;
            ctx.lineTo(points[i].x , points[i].y);
            ctx.stroke();
        }
    }
}

black.addEventListener("click" , function(){
    ctx.strokeStyle = "black";
})
red.addEventListener("click" , function(){
    ctx.strokeStyle = "red";
})
blue.addEventListener("click" , function(){
    ctx.strokeStyle = "blue";
})
yellow.addEventListener("click" , function(){
    ctx.strokeStyle = "yellow";
})



pencilSlider.addEventListener("change" , function(){
    // console.log(pencilSlider.value);
    pencilWidth = pencilSlider.value;
    ctx.lineWidth = pencilWidth;
})


eraserSlider.addEventListener("change" , function(){
    eraserWidth = eraserSlider.value;
    ctx.lineWidth = eraserWidth;
})