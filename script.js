let color = 'rainbow'

window.onload = () => {
    setup_canvas(4, color);
    add_slider_listener();
    add_color_listeners();
};

function setup_canvas(dimension, color) {
    let canvas = document.getElementById("canvas");
    let pixel_size = (100/dimension).toString()+'%';

    //if there are already pixels on the canvas replace it with an empty one
    if(canvas.firstChild){
        empty_canvas = document.createElement("div");
        empty_canvas.id="canvas";
        const container = document.querySelector("#container");
        container.replaceChild(empty_canvas, canvas)
        canvas = document.getElementById("canvas")
    }

    //populate the canvas with pixels according to the given dimension
    for(let n = 0; n<(dimension**2); n++){
        console.log("Populating" + dimension)
        let pixel = document.createElement("div");
        pixel.className = "pixel";
        pixel.style.height = pixel_size;
        pixel.style.width = pixel_size;
        //pixel.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        canvas.appendChild(pixel);
    }

    add_hover_listener(color);
}

function add_hover_listener() {
    const pixels = document.querySelectorAll(".pixel");
    console.log('hover_listener added')
    pixels.forEach(pixel => {
        pixel.addEventListener("mouseover", function hover_handler(){
            if(color == 'black'){
                pixel.style.backgroundColor = '#000000';
            }
            else if(color == 'rainbow'){
                pixel.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);
            }
            else if(color == 'white'){
                pixel.style.backgroundColor = '#FFFFFF';
            }
        });
    });
}

function add_slider_listener() {
    const slider = document.querySelector("#resolution_slider");
    const resolution = document.querySelector("#resolution");
    slider.value = 4;
    resolution.innerHTML = slider.value + ' x ' + slider.value;
    slider.oninput = () => {
        resolution.innerHTML = slider.value + ' x ' + slider.value;
        setup_canvas(slider.value);
        add_hover_listener(color);
    };
}

function add_color_listeners() {
    const rainbow_button = document.querySelector('#rainbow');
    const black_button = document.querySelector('#black');
    const eraser_button = document.querySelector('#eraser');

    rainbow_button.addEventListener("click", () => {
        console.log('rainbow_listener');
        color = 'rainbow';
        add_hover_listener();
    });

    black_button.addEventListener("click", () => {
        color = 'black';
        add_hover_listener();
    });

    eraser_button.addEventListener("click", () => {
        color = 'white';
        add_hover_listener();
    })
}