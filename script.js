class Pixel {
    constructor(color, canvas, size) {
        this.element = document.createElement("div");
        this.color = color;
        this.size = size;
             
        this.element.className = "pixel";
        this.element.style.height = size;
        this.element.style.width = size;
        this.add_hover_listener();
        canvas.appendChild(this.element);
    }

    set_color(color) {
        this.color = color;
    }

    add_hover_listener() {
        this.element.addEventListener("mouseover", () => {
            if(this.color == 'black'){
                this.element.style.backgroundColor = '#000000';
            }
            else if(this.color == 'red'){
                let randomized_digits = Math.floor(Math.random()*65535).toString(16);
                let pixel_color = `#FF${randomized_digits}`;
                this.element.style.backgroundColor = pixel_color;
            }
            else if(this.color == 'green'){
                let randomized_digits_one = Math.floor(Math.random()*255).toString(16);
                let randomized_digits_two = Math.floor(Math.random()*255).toString(16);
                let pixel_color = `#${randomized_digits_one}FF${randomized_digits_two}`;
                this.element.style.backgroundColor = pixel_color;
            }
            else if(this.color == 'blue'){
                let randomized_digits = Math.floor(Math.random()*65535).toString(16);
                let pixel_color = `#${randomized_digits}FF`;
                this.element.style.backgroundColor = pixel_color;

            }
            else if(this.color == 'rainbow'){
                console.log('rainbow DETECTED');
                this.element.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);
            }
            else if(this.color == 'white'){
                this.element.style.backgroundColor = '#FFFFFF';
            }
        });
    }
}

class Canvas {
    constructor(resolution, color) {
        this.color = color;
        this.resolution = resolution;
        this.canvas_element = document.getElementById("canvas");
        this.pixel_size = (100/this.resolution).toString()+'%';
        this.pixels = [];
        this.set_resolution(this.resolution);
    }

    set_color(color){
        this.color = color;
        for(let pixel of this.pixels){
            pixel.set_color(this.color)
        }
    }

    set_resolution(resolution){
        this.resolution = resolution;

        //if there are already pixels on the canvas replace it with an empty one
        if(this.canvas_element.firstChild){
            let new_canvas = document.createElement("div");
            new_canvas.id="canvas";
            const container = document.querySelector("#container");
            container.replaceChild(new_canvas, this.canvas_element);
            this.canvas_element = new_canvas;
        }
    
        //populate the canvas with pixels according to the given dimension
        for(let n = 0; n<(this.resolution**2); n++){
            let pixel = new Pixel(this.color, this.canvas_element, this.pixel_size);
            this.pixels.push(pixel);
        }
    }
}

class EtchASketch {

    constructor() {
        this.color = 'rainbow';
        this.resolution = 4;
        this.canvas = new Canvas(this.resolution, this.color);
        this.button_colors = [['red', '#FF0000'],
            ['blue', '#0000FF'],
            ['green', '#00FF00'],
            ['black', '#000000'],
            ['white', '#FFFFFF']];
        this.add_slider_listener();
        this.add_color_listeners();
        this.add_clear_listener();
        this.select_button(document.querySelector('#rainbow'));
        this.color_function = function(c) {
            function random_hex_digits(number){
                let digits = '';
                for(let n =0; n<number; n++){
                    let digit = Math.floor(Math.random()*15).toString(16);
                    digits += digit;
                }
                return digits;
            }
            if(c == 'black'){
                return '#000000';
            }
            else if(c == 'red'){
                let pixel_color = `#FF${random_hex_digits(4)}`;
                return pixel_color;
            }
            else if(c == 'green'){
                let pixel_color = `#${random_hex_digits(2)}FF${random_hex_digits(2)}`;
                return pixel_color;
            }
            else if(c == 'blue'){
                let pixel_color = `#${random_hex_digits(4)}FF`;
                return pixel_color;

            }
            else if(c == 'rainbow'){
                console.log('rainbow DETECTED');
                return `#${random_hex_digits(6)}`;
            }
            else if(c == 'white'){
                return '#FFFFFF';
            }
        };
        console.log('WHAT?' + this.color_function('red') );
    }

    set_canvas_color(color) {
        this.canvas.set_color(color);
    }
    
    add_slider_listener() {
        const slider = document.querySelector("#resolution_slider");
        const resolution_text = document.querySelector("#resolution");
        slider.value = this.resolution;

        resolution_text.innerHTML = slider.value + ' x ' + slider.value;
        slider.oninput = () => {
            this.resolution = slider.value;
            resolution_text.innerHTML = slider.value + ' x ' + slider.value;
            this.canvas = new Canvas(this.resolution, this.color);
        };
    }
    
    add_color_listeners() {
        const rainbow_button = document.querySelector('#rainbow');
        const black_button = document.querySelector('#black');
        const red_button = document.querySelector('#red');
        const blue_button = document.querySelector('#blue');
        const green_button = document.querySelector('#green')
        const eraser_button = document.querySelector('#white');
    
        const button_color_dict = new Map(
            [[rainbow_button, 'rainbow'],
            [black_button, 'black'],
            [red_button, 'red'],
            [blue_button, 'blue'],
            [green_button, 'green'],
            [eraser_button, 'white']
            ]);
    
        button_color_dict.forEach((value, key) => {
            key.addEventListener("click", () => {
                this.select_button(key);

                this.color = value;
                this.set_canvas_color(this.color);
            });
        });
    }

    select_button(button) {
        button.style.filter = "brightness(100%) drop-shadow(0 0 5px grey) contrast(150%";
        
        
        let other_buttons = document.querySelectorAll('.color_button');
        for(let other_button of other_buttons){
            if(other_button != button){
                other_button.style.filter = "grayscale(25%)";
                other_button.style.border = "none";
            }
        }
    }
    
    
    add_clear_listener() {
        const clear_button = document.querySelector('#clear');
        clear_button.addEventListener('click', () => {
            this.canvas = new Canvas(this.resolution, this.color);
        })
    }
}


window.onload = () => {
    etch_a_sketch = new EtchASketch();
};

