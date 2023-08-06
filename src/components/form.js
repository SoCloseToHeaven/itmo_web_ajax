import * as graph from "./graph.js";

const FORM_BLOCK_CLASS = 'params-and-map-block';
const MAP_WIDTH = 300;
const MAP_HEIGHT = 300;
const PARAM_LABEL_CLASS = 'param-label';
const CHOOSE_PARAM_ELEMENT_CLASS = 'choose-param-elem';
const CANVAS_NOT_SUPPORTED = {
    imgPath: './static/areas.png',
    message: 'Canvas is not supported in your browser!',
    imgID: 'map-img'
};
const X_NAME = 'x';
const Y_NAME = 'y';
const R_NAME = 'r';


function createForm() {
    // semantic section
    const section = document.createElement('section');

    // form
    const form = document.createElement('form');
    
    section.append(form);

    // create divs
    const blockX = document.createElement('div');
    const blockY = document.createElement('div');
    const blockR = document.createElement('div');
    const blockMap = document.createElement('div');

    [blockX, blockY, blockR, blockMap].forEach((block) => {
        block.classList.add(FORM_BLOCK_CLASS);
        form.append(block);
    });

    // select
    const selectX = document.createElement('select');
    selectX.name = X_NAME;
    selectX.classList.add(CHOOSE_PARAM_ELEMENT_CLASS);
    for (let i = -5; i <= 3; ++i) {
        const selectOption = document.createElement('option');
        selectOption.value = i;
        selectOption.textContent = i;
        selectX.append(selectOption);
    }

    blockX.append(selectX);

    // text
    const textY = document.createElement('input');
    textY.type = 'text';
    textY.name = Y_NAME;
    textY.classList.add(CHOOSE_PARAM_ELEMENT_CLASS);

    blockY.append(textY);
    // buttons
    
    for (let i = 1; i <= 5; i++) {
        const button = document.createElement('button');
        button.classList.add(CHOOSE_PARAM_ELEMENT_CLASS);
        button.value = i;
        button.textContent = i;
        button.name = R_NAME;
        blockR.append(button);
    }


    // labels
    const labelX = document.createElement('label');
    const labelY = document.createElement('label');
    const labelR = document.createElement('label');

    labelX.htmlFor = X_NAME;
    labelY.htmlFor = Y_NAME;
    labelR.htmlFor = R_NAME;

    [labelX, labelY, labelR].forEach((label) => label.classList.add(PARAM_LABEL_CLASS));

    labelX.textContent = 'Select X value';
    labelY.textContent = 'Type Y value';
    labelR.textContent = 'Choose R value';

    blockX.append(labelX);
    blockY.append(labelY);
    blockR.append(labelR);

    // canvas
    const mapCanvas = document.createElement('canvas');
    const imgInsteadMap = document.createElement('img');
    const imgInsteadMapLabel = document.createElement('label');
    
    imgInsteadMap.src = CANVAS_NOT_SUPPORTED.imgPath;
    imgInsteadMap.id = CANVAS_NOT_SUPPORTED.imgID;
    imgInsteadMapLabel.htmlFor = CANVAS_NOT_SUPPORTED.imgID;

    imgInsteadMap.width = MAP_WIDTH;
    imgInsteadMap.height = MAP_HEIGHT;
    mapCanvas.width = MAP_WIDTH;
    mapCanvas.height = MAP_HEIGHT;

    graph.drawGraph(mapCanvas);

    mapCanvas.append(imgInsteadMap);
    mapCanvas.append(imgInsteadMapLabel);
    blockMap.append(mapCanvas);

    return section;
}

export default form;