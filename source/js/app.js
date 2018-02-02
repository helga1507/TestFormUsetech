//валидация почты
function validEmail(email) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

//валидация пароля (не меньше 5 символов)
function validName(pass) {
    return String(pass).length >= 5;
}

//поля для ввода логина и пароля
let name_obj = $('#index__form__name'), email_obj = $('#index__form__email'), phone_obj = $('#index__form__phone'),
    button_obj = $('#index__form__button');

//изменение статуса кнопки
function state_button(state) {
    if (state && button_obj.attr('disabled') !== undefined) {
        button_obj.removeAttr('disabled');
    }
    else if (!state && button_obj.attr('disabled') === undefined) {
        button_obj.attr('disabled', 'true');
    }
    return state;

}
//проверка валидности поля; входные параметры - поле и функция для валидации
function checkInput(input,nameFunction) {
    let state = false;

    if (nameFunction(input.val())) {
        //если поле валидно и у него нет класса valid - добавляем его
        if (!input.hasClass('valid')) {
            input.addClass('valid');
        }
        state = true;
    }
    else {
        //если поле не валидно и у него есть класс valid - удаляем его
        if (input.hasClass('valid')) {
            input.removeClass('valid');
        }
    }

    //возвращаем состояние поля
    return state;
}

//валидация формы
function validForm(name, email) {

    let state_email = checkInput(email,validEmail);
    let state_name = checkInput(name,validName);

    if (state_email && state_name) {
        return state_button(true);
    }

    return state_button(false);

}
//установка позиции каретки
function setCaretPosition(ctrl, start, end) {
    if (end === undefined) {
        end = start;
    }
    // IE >= 9 and other browsers
    if(ctrl.setSelectionRange)
    {
        ctrl.focus();
        ctrl.setSelectionRange(start, end);
    }
    // IE < 9
    else if (ctrl.createTextRange) {
        var range = ctrl.createTextRange();
        range.collapse(true);
        range.moveEnd('character', end);
        range.moveStart('character', start);
        range.select();
    }
}
//получение позиции каретки
function getCaretPosition (ctrl) {
    // IE < 9 Support
    if (document.selection) {
        ctrl.focus();
        var range = document.selection.createRange();
        var rangelen = range.text.length;
        range.moveStart ('character', -ctrl.value.length);
        var start = range.text.length - rangelen;
        return {'start': start, 'end': start + rangelen };
    }
    // IE >=9 and other browsers
    else if (ctrl.selectionStart || ctrl.selectionStart == '0') {
        return {'start': ctrl.selectionStart, 'end': ctrl.selectionEnd };
    } else {
        return {'start': 0, 'end': 0};
    }
}

$(phone_obj).mask("+7 (999) 999-9999");
//проверка для полей с номером телефона;
// если уставливается курсор в строку и до курсора нет символов  "_" - можно редактировать
//если до курсора есть "_" - курсор переходит к первому такому символу
$(phone_obj).on('click input',function () {
    var val = $(this).val();
    var n = val.indexOf('_');
    var str = val.substring(0,getCaretPosition(this).start);

    if(n != '-1' && str.indexOf('_') != -1)  setCaretPosition(this,n);

});



$(name_obj).on('input', function () {
    validForm(name_obj, email_obj);
});
$(email_obj).on('input', function () {
    validForm(name_obj,  email_obj);
});


$('#index__form').submit(function (e) {
    e.preventDefault();

    if (!validForm(name_obj, email_obj)) {
        return false;
    }
    /*
    var m_method=$(this).attr('method');
    var m_action=$(this).attr('action');
    var m_data=$(this).serialize();

    //отправляем форму по action
    $.ajax({
        type: m_method,
        url: m_action,
        data: m_data,
        success: function(result){
            this.reset();
            $('.modal').modal('hide');
            $('#senk').modal('show');
        }
    });*/
    //очищаем форму, закрываем модальные окна и открываем окно о успешном входе
    this.reset();

    console.log('Form valid');
});

