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
const FORM_ID = 'graph-form';

const FLOAT_PATTERN = /^[+-]?\d+(\.\d+)?$/;
const Y_MAX_VALUE = 5;
const Y_MIN_VALUE = -5;

function createForm(pointsArray) {
    // semantic section
    const section = document.createElement('section');

    // form
    const form = document.createElement('form');

    form.id = FORM_ID;
    
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

    //canvas
    const graphCanvas = drawGraph(pointsArray, buttonRValue.currentValue);

    blockMap.append(graphCanvas.HTMLcanvas);

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
            (event) => {
                buttonRValue.currentValue = button.value;
                buttonRValue.currentValueLabel.textContent = buttonRValue.text + button.value;
                graphCanvas.setR(buttonRValue.currentValue);
            }
        );
        blockR.append(button);
    }


    // labels
    const labelX = document.createElement('label');
    const labelY = document.createElement('label');
    const labelYWarning = document.createElement('label');
    const labelR = document.createElement('label');

    labelX.htmlFor = X_NAME;
    labelY.htmlFor = Y_NAME;
    labelYWarning.htmlFor = Y_NAME;
    labelR.htmlFor = R_NAME;

    [labelX, labelY, labelYWarning, labelR].forEach((label) => label.classList.add(PARAM_LABEL_CLASS));

    labelX.textContent = 'Select X value';
    labelY.textContent = 'Type Y value';
    labelR.textContent = `Choose R value`;

    labelYWarning.style = 'color: red';
    labelYWarning.textContent = `Y value must be a float number between: ${Y_MIN_VALUE} and ${Y_MAX_VALUE} (inclusive)`;

    blockX.prepend(labelX);
    blockY.prepend(labelY);
    blockY.append(labelYWarning);
    blockR.prepend(labelR);
    blockR.append(buttonRValue.currentValueLabel);


    textY.addEventListener('input', event => {
        const text = event.target.value;
        
        if (text === '' ||
            !FLOAT_PATTERN.test(text) || 
            parseFloat(text) < Y_MIN_VALUE || 
            parseFloat(text) > Y_MAX_VALUE
        ) {
            sendButton.disabled = true;
            labelYWarning.textContent = `Y value must be a float number between: ${Y_MIN_VALUE} and ${Y_MAX_VALUE} (inclusive)`;
        } else {
            sendButton.disabled = false;
            labelYWarning.textContent = '';
        }

    });

    const formObject = {
        HTMLsection: section,
        form: form,
        graph: graphCanvas,
        clearButton: clearButton,
        getPointAttempt: function() {
            return {
                x: selectX.options[selectX.selectedIndex].value,
                y: textY.value,
                r: buttonRValue.currentValue
            };
        }
    };

    return formObject;
}


export default createForm;