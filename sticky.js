{/* <div class="sticky">
        <div class="sticky-header">
            <div class="minimize"></div>
            <div class="close"></div>
        </div>
        <div class="sticky-content">
            <textarea name="" id="" cols="30" rows="10"></textarea>
        </div>
    </div>  */}

    let sticky = document.querySelector("#sticky");



    sticky.addEventListener("click" , function(){
        
        let textArea = document.createElement("textarea");  // <textarea> </textarea>
        textArea.setAttribute("rows" , "10");
        textArea.setAttribute("cols" , "26");
        textArea.setAttribute("height" , "160px");
        textArea.setAttribute("width" , "233px");
        let stickyContent = createSticky();
        stickyContent.appendChild(textArea);
    })