window.onload = () => {
    console.log("LOADED");
    for(let n = 0; n<16; n++){
        let pixel = document.createElement("div");
        pixel.className = "pixel";
        pixel.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        document.body.appendChild(pixel);
        console.log("AA");
    };
};