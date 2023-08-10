import drawGraph from "./graph.js";

const FORM_BLOCK_CLASS = 'params-and-map-block';
const PARAM_LABEL_CLASS = 'param-label';
const CHOOSE_PARAM_ELEMENT_CLASS = 'choose-param-elem';
const X_NAME = 'x';
const Y_NAME = 'y';
const R_NAME = 'r';
const buttonRValue = {
    currentValueLabel: document.createElement('label'),
    currentValue: 1,
    text: 'Current R value: '
};

function createForm(sendPoint) {
    // semantic section
    const section = document.createElement('section');

    // form
    const form = document.createElement('form');

    form.style = 'display: grid; grid-template-columns: repeat(4, 25%); grid-template-rows: 1fr 1fr; grid-auto-flow: row dense';
    
    section.append(form);


    // create divs
    const blockX = document.createElement('div');
    const blockY = document.createElement('div');
    const blockR = document.createElement('div');
    const blockMap = document.createElement('div');
    const blockSubmitClear = document.createElement('div');

    blockMap.style = 'grid-row: span 2';


    [blockX, blockY, blockR, blockMap, blockSubmitClear].forEach((block) => {
        block.classList.add(FORM_BLOCK_CLASS);
        form.append(block);
    });

    blockSubmitClear.style = 'grid-column: span 3';
    // Send/Clear

    const sendButton = document.createElement('button');
    const clearButton = document.createElement('button');

    sendButton.type = 'submit';
    clearButton.type = 'button';


    sendButton.textContent = 'Send';
    clearButton.textContent = 'Clear';

    [sendButton, clearButton].forEach((button) => {
        button.classList.add(CHOOSE_PARAM_ELEMENT_CLASS);
        blockSubmitClear.append(button);
    })


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


    buttonRValue.currentValueLabel.classList.add(PARAM_LABEL_CLASS);
    buttonRValue.currentValueLabel.htmlFor = R_NAME;
    buttonRValue.currentValueLabel.textContent = `Current R value: ${buttonRValue.currentValue}`;
    
    for (let i = 1; i <= 5; i++) {
        const button = document.createElement('button');
        button.type = 'button';
        button.classList.add(CHOOSE_PARAM_ELEMENT_CLASS);
        button.value = i;
        button.textContent = i;
        button.name = R_NAME;
        button.addEventListener(
            'click', 
            (event) => buttonRValue.currentValueLabel.textContent = buttonRValue.text + button.value
        );
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
    labelR.textContent = `Choose R value`;

    blockX.prepend(labelX);
    blockY.prepend(labelY);
    blockR.prepend(labelR);
    blockR.append(buttonRValue.currentValueLabel);

    // canvas


    const graphCanvas = drawGraph();

    blockMap.append(graphCanvas.HTMLcanvas);

    // add sendPoint func

    form.addEventListener('submit', (event) => {
        event.preventDefault();
    });

    return section;
}


export default createForm;