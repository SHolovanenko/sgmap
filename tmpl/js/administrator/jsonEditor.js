var DATA_TEXTAREA        = '#jform_params_dataJson';
var TEMPLATE_TEXTAREA    = '#jform_params_dataJsonTemplate';

function addSortHandler(classSection, classElement, classElementDrag) {
    if (classSection === undefined) {
        classSection = 'sortable-list';
    }

    if (classElement === undefined) {
        classElement = 'sortable';
    }

    if (classElementDrag === undefined) {
        classElementDrag = 'element-drag';
    }

    $('.' + classSection + ' .' + classElement + ' .' + classElementDrag).off('mousedown');
    $('.' + classSection).off('mousemove');

    $('.' + classSection + ' .' + classElement + ' .' + classElementDrag).on('mousedown', function () {
        let isMouseUp = false;
        let element = $(this).parents(' .' + classElement).first();
        let elementGhost = $(element).clone();

        $(element).after(elementGhost);
        $(elementGhost).css('position', 'absolute').css('zIndex', 2).css('left', $(element).position().left);
        $(element).css('opacity', '0.2');

        $('.' + classSection).on('mousemove', function (event) {
            let posY = event.pageY;
            let posX = event.pageX;
            //$(elementGhost).css({top: (posY - ($(element).height() / 2)), left: (posX - ($(element).width() / 2))});
            $(elementGhost).css({ top: (posY - 20), left: (posX - 20) });

            let elements = $('.' + classSection + ' .' + classElement);
            let numberOfElements = elements.length;
            for (let i = 0; i < numberOfElements; i++) {
                if (($(elements[i]).position().top + ($(elements[i]).height() / 2)) <= posY && ($(elements[i]).position().top + $(elements[i]).height() * 2) >= posY) {
                    $(elements[i]).after(element);

                    $(elementGhost).on('mouseup', function () {
                        $(element).css('opacity', '1');
                        $(elementGhost).off('mouseup');
                        isMouseUp = true;
                        return;
                    });
                }
            }

            if (isMouseUp) {
                $(this).off('mousemove');
                $('.' + classSection + ' .' + classElement).off('mousedown');
                isMouseUp = false;
                addSortHandler(classSection, classElement, classElementDrag);
            }
        });

        $(elementGhost).on('mouseup', function () {
            $(element).css('opacity', '1');
            $(elementGhost).off('mouseup');
            $(elementGhost).remove();
            isMouseUp = true;

            updatePositionValue();
            return;
        });

        $('.' + classSection).mouseleave(function () {
            $(element).css('opacity', '1');
            $(elementGhost).remove();
            isMouseUp = true;

            updatePositionValue();
        });
    });
}

function loadTemplate(templateTextarea) {
    let data = null;
    if ($(templateTextarea).val()) {
        data = JSON.parse($(templateTextarea).val());
    }

    element = '<div class="element sortable">';
    element += '    <div class="element-drag">';
    element += '        <span>';
    element += '            <i class="fa fa-ellipsis-v"></i>';
    element += '        </span>';
    element += '    </div>';
    element += '    <div class="deleteElement">';
    element += '        <span alt="Delete element">';
    element += '            <i class="fa fa-close"></i>';
    element += '        </span>';
    element += '    </div>';
    element += '    <div class="fields">';
    
    if (data) {
        console.log(data.element);
        let numberOfFields = data.element.length;
        for (let i = 0; i < numberOfFields; i++) {

            element += '        <div class="field">';
            if (data.element[i].position) {
                element += '            <div class="div-input-position">';
                element += '                <input type="hidden" value="' + data.element[i].position + '">';
                element += '            </div>';
            } else {
                element += '            <div class="div-input-title">';
                element += '                <input type="text" value="' + data.element[i].title + '">';
                element += '            </div>';
                element += '            <div class="div-input-value">';
                element += '                <input type="text"  value="' + data.element[i].value + '">';
                element += '            </div>';
                element += '            <div class="deleteField">';
                element += '                <span onclick="deleteField(this);updateTemplate();">';
                element += '                    <i class="fa fa-trash"></i>';
                element += '                </span>';
                element += '            </div>';
            }
            element += '        </div>';
        }
    } else {
        element += '        <div class="field">';
        element += '                <input type="hidden" value="">';
        element += '        </div>';
        element += '        <div class="field">';
        element += '            <div class="div-input-title">';
        element += '                <input type="text" value="">';
        element += '            </div>';
        element += '            <div class="div-input-value">';
        element += '                <input type="text"  value="">';
        element += '            </div>';
        element += '            <div class="deleteField">';
        element += '                <span onclick="deleteField(this);updateTemplate();">';
        element += '                    <i class="fa fa-trash"></i>';
        element += '                </span>';
        element += '            </div>';
        element += '        </div>';
    }
    element += '    </div>';
    element += '    <div class="addField">';
    element += '        <span class="btn-button" onclick="addField(this);updateTemplate();">';
    element += '            <i class="fa fa-plus" aria-hidden="true"></i> Add field';
    element += '        </span>';
    element += '    </div>';
    element += '</div>';

    return element;
}

function updateTemplate() {
    let json;

    json = '{"element":[';

    fields = $('#template .element').children('.fields').children('.field');

    numberOfFields = fields.length;
    for (let j = 0; j < numberOfFields; j++) {

        json += '{';

        if ($(fields[j]).children('.div-input-position').val() !== undefined) {
            let position = $(fields[j]).children('.div-input-position').children('input').val();
            json += '"position":' + '"' + position + '"';
        } else {
            if ($(fields[j]).children('.div-input-title').val() !== undefined) {
                let title = $(fields[j]).children('.div-input-title').children('input').val();
                json += '"title":' + '"' + title + '",';
            }
            if ($(fields[j]).children('.div-input-value').val() !== undefined) {
                let value = $(fields[j]).children('.div-input-value').children('input').val();
                json += '"value":' + '"' + value + '"';
            }
        }

        if (j == (numberOfFields - 1)) {
            json += '}';
        } else {
            json += '},';
        }

    }

    json += ']}';

    $(TEMPLATE_TEXTAREA).val(json);
}

function updatePositionValue(elementsListId) {
    if (elementsListId === undefined) {
        elementsListId = 'elements';
    }

    let elements = $('#' + elementsListId + ' .element');
    let numberOfElements = elements.length;
    for (let i = 0; i < numberOfElements; i++) {
        $(elements[i]).find('.div-input-position').children('input').val(i);
    }

    updateTextareaFromElements();
}

function updateElementsFromTextarea(data) {
    let dataParsed = JSON.parse(data);

    numberOfElements = dataParsed.length;
    for (let i = 0; i < numberOfElements; i++) {
        addElement(dataParsed[i].element);
    }
}

function updateTextareaFromElements() {
    let elementsToTextarea = [];
    elements = $('#elements .element');
    numberOfElements = elements.length;
    console.log(numberOfElements);
    for (let i = 0; i < numberOfElements; i++) {
        fields = $(elements[i]).children('.fields').children('.field');
        numberOfFields = fields.length;
        let isPushCounter = 0;
        for (let j = 0; j < numberOfFields; j++) {
            if ($(fields[j]).children('.div-input-position').val() !== undefined) {
                isPushCounter++;
            } else {
                if (
                    ($(fields[j]).children('.div-input-title').children('input').val().trim()) &&
                    ($(fields[j]).children('.div-input-value').children('input').val().trim())
                ) {
                    isPushCounter++;
                }
            }
            if (isPushCounter == numberOfFields) {
                elementsToTextarea.push(elements[i]);
            }
        }
    }

    let json;

    json = '[';

    elements = elementsToTextarea;
    numberOfElements = elements.length;
    for (let i = 0; i < numberOfElements; i++) {

        json += '{"element":[';

        fields = $(elements[i]).children('.fields').children('.field');
        numberOfFields = fields.length;
        for (let j = 0; j < numberOfFields; j++) {

            json += '{';

            if ($(fields[j]).children('.div-input-position').val() !== undefined) {
                let position = $(fields[j]).children('.div-input-position').children('input').val();
                json += '"position":' + '"' + position + '"';
            } else {
                if ($(fields[j]).children('.div-input-title').val() !== undefined) {
                    let title = $(fields[j]).children('.div-input-title').children('input').val();
                    json += '"title":' + '"' + title + '",';
                }
                if ($(fields[j]).children('.div-input-value').val() !== undefined) {
                    let value = $(fields[j]).children('.div-input-value').children('input').val();
                    json += '"value":' + '"' + value + '"';
                }
            }

            if (j == (numberOfFields - 1)) {
                json += '}';
            } else {
                json += '},';
            }

        }

        if (i == (numberOfElements - 1)) {
            json += ']}';
        } else {
            json += ']},';
        }
    }

    json += ']';
    $(DATA_TEXTAREA).val(json);
}

function addElement(data) {
    let element;
    console.log(data);
    if (data) {
        element = '<div class="element sortable" onChange="updateTextareaFromElements()">';
        element += '    <div class="element-drag">';
        element += '        <span>';
        element += '            <i class="fa fa-ellipsis-v"></i>';
        element += '        </span>';
        element += '    </div>';
        element += '    <div class="deleteElement">';
        element += '        <span alt="Delete element" onclick="deleteElement(this)">';
        element += '            <i class="fa fa-close"></i>';
        element += '        </span>';
        element += '    </div>';
        element += '    <div class="fields">';

        let numberOfFields = data.length;
        for (let i = 0; i < numberOfFields; i++) {

            element += '        <div class="field">';
            if (data[i].position) {
                element += '            <div class="div-input-position">';
                element += '                <input type="hidden" value="' + data[i].position + '">';
                element += '            </div>';
            } else {
                element += '            <div class="div-input-title">';
                element += '                <input type="text" value="' + data[i].title + '">';
                element += '            </div>';
                element += '            <div class="div-input-value">';
                element += '                <input type="text"  value="' + data[i].value + '">';
                element += '            </div>';
                element += '            <div class="deleteField">';
                element += '                <span onclick="deleteField(this)">';
                element += '                    <i class="fa fa-trash"></i>';
                element += '                </span>';
                element += '            </div>';
            }
            element += '        </div>';
        }
        element += '    </div>';
        element += '    <div class="addField">';
        element += '        <span class="btn-button" onclick="addField(this)">';
        element += '            <i class="fa fa-plus" aria-hidden="true"></i> Add field';
        element += '        </span>';
        element += '    </div>';
        element += '</div>';
        element = $(element);
    } else {
        let data = JSON.parse($(TEMPLATE_TEXTAREA).val());
        addElement(data.element);
        return;
    }
    element.appendTo('#elements');
    addSortHandler();
    addOnChangeHandlerToFields();
}

function deleteElement(element) {
    $(element).parent().parent().remove();
    updateTextareaFromElements();
}

function deleteField(element) {
    $(element).parent().parent().remove();
    updateTextareaFromElements();
}

function addField(element) {
    let str = '<div class="field">';
    str += '    <div class="div-input-title">';
    str += '        <input type="text">';
    str += '    </div>';
    str += '    <div class="div-input-value">';
    str += '        <input type="text">';
    str += '    </div>';
    str += '    <div class="deleteField">';
    str += '        <span onClick="deleteField(this)">';
    str += '            <i class="fa fa-trash"></i>';
    str += '        </span>';
    str += '    </div>';
    str += '</div>';
    $(element).parent().parent().children('.fields').append(str);
    addOnChangeHandlerToFields();
}

function addOnChangeHandlerToFields() {
    $('.field div input').off('change');
    $('.field div input').on('change', function () {
        updateTextareaFromElements();
    });
}

window.onload = function () {
    var rootElement = '#jform_params_dataJsonTemplate';

    let html = '<div id="edit_area">';
    html += '    <div id="template" onchange="updateTemplate()"></div>';
    html += '    <div id="elements" class="sortable-list"></div>';
    html += '    <div>';
    html += '        <span class="btn-button" onclick="addElement()">';
    html += '            <i class="fa fa-plus" aria-hidden="true"></i> Add element';
    html += '        </span>';
    html += '    </div>';
    html += '</div>';

    $(html).appendTo($(rootElement).parent().parent().parent());

    $('#template').append(loadTemplate(TEMPLATE_TEXTAREA));
    //updateTemplate();

    let data = $(DATA_TEXTAREA).val();
    if (data) {
        updateElementsFromTextarea(data);
    }
    
    addOnChangeHandlerToFields();

    addSortHandler();

    /*$('#json_textarea').change(function () {
        let data = $('#json_textarea').val();
        updateElementsFromTextarea(data);
        addSortHandler();
    });*/

    /*
    let data = $('#json_textarea').val();
    updateElementsFromTextarea(data);

    updateTemplate();
    addOnChangeHandlerToFields();
    addSortHandler();
    */
}