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


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8v0LLQsNC70LjQtNCw0YbQuNGPINC/0L7Rh9GC0YtcclxuZnVuY3Rpb24gdmFsaWRFbWFpbChlbWFpbCkge1xyXG4gICAgbGV0IHJlID0gL14oKFtePD4oKVtcXF1cXFxcLiw7Olxcc0BcXFwiXSsoXFwuW148PigpW1xcXVxcXFwuLDs6XFxzQFxcXCJdKykqKXwoXFxcIi4rXFxcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcXSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC87XHJcbiAgICByZXR1cm4gcmUudGVzdChTdHJpbmcoZW1haWwpLnRvTG93ZXJDYXNlKCkpO1xyXG59XHJcblxyXG4vL9Cy0LDQu9C40LTQsNGG0LjRjyDQv9Cw0YDQvtC70Y8gKNC90LUg0LzQtdC90YzRiNC1IDUg0YHQuNC80LLQvtC70L7QsilcclxuZnVuY3Rpb24gdmFsaWROYW1lKHBhc3MpIHtcclxuICAgIHJldHVybiBTdHJpbmcocGFzcykubGVuZ3RoID49IDU7XHJcbn1cclxuXHJcbi8v0L/QvtC70Y8g0LTQu9GPINCy0LLQvtC00LAg0LvQvtCz0LjQvdCwINC4INC/0LDRgNC+0LvRj1xyXG5sZXQgbmFtZV9vYmogPSAkKCcjaW5kZXhfX2Zvcm1fX25hbWUnKSwgZW1haWxfb2JqID0gJCgnI2luZGV4X19mb3JtX19lbWFpbCcpLCBwaG9uZV9vYmogPSAkKCcjaW5kZXhfX2Zvcm1fX3Bob25lJyksXHJcbiAgICBidXR0b25fb2JqID0gJCgnI2luZGV4X19mb3JtX19idXR0b24nKTtcclxuXHJcbi8v0LjQt9C80LXQvdC10L3QuNC1INGB0YLQsNGC0YPRgdCwINC60L3QvtC/0LrQuFxyXG5mdW5jdGlvbiBzdGF0ZV9idXR0b24oc3RhdGUpIHtcclxuICAgIGlmIChzdGF0ZSAmJiBidXR0b25fb2JqLmF0dHIoJ2Rpc2FibGVkJykgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGJ1dHRvbl9vYmoucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKCFzdGF0ZSAmJiBidXR0b25fb2JqLmF0dHIoJ2Rpc2FibGVkJykgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGJ1dHRvbl9vYmouYXR0cignZGlzYWJsZWQnLCAndHJ1ZScpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0YXRlO1xyXG5cclxufVxyXG4vL9C/0YDQvtCy0LXRgNC60LAg0LLQsNC70LjQtNC90L7RgdGC0Lgg0L/QvtC70Y87INCy0YXQvtC00L3Ri9C1INC/0LDRgNCw0LzQtdGC0YDRiyAtINC/0L7Qu9C1INC4INGE0YPQvdC60YbQuNGPINC00LvRjyDQstCw0LvQuNC00LDRhtC40LhcclxuZnVuY3Rpb24gY2hlY2tJbnB1dChpbnB1dCxuYW1lRnVuY3Rpb24pIHtcclxuICAgIGxldCBzdGF0ZSA9IGZhbHNlO1xyXG5cclxuICAgIGlmIChuYW1lRnVuY3Rpb24oaW5wdXQudmFsKCkpKSB7XHJcbiAgICAgICAgLy/QtdGB0LvQuCDQv9C+0LvQtSDQstCw0LvQuNC00L3QviDQuCDRgyDQvdC10LPQviDQvdC10YIg0LrQu9Cw0YHRgdCwIHZhbGlkIC0g0LTQvtCx0LDQstC70Y/QtdC8INC10LPQvlxyXG4gICAgICAgIGlmICghaW5wdXQuaGFzQ2xhc3MoJ3ZhbGlkJykpIHtcclxuICAgICAgICAgICAgaW5wdXQuYWRkQ2xhc3MoJ3ZhbGlkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0YXRlID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIC8v0LXRgdC70Lgg0L/QvtC70LUg0L3QtSDQstCw0LvQuNC00L3QviDQuCDRgyDQvdC10LPQviDQtdGB0YLRjCDQutC70LDRgdGBIHZhbGlkIC0g0YPQtNCw0LvRj9C10Lwg0LXQs9C+XHJcbiAgICAgICAgaWYgKGlucHV0Lmhhc0NsYXNzKCd2YWxpZCcpKSB7XHJcbiAgICAgICAgICAgIGlucHV0LnJlbW92ZUNsYXNzKCd2YWxpZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL9Cy0L7Qt9Cy0YDQsNGJ0LDQtdC8INGB0L7RgdGC0L7Rj9C90LjQtSDQv9C+0LvRj1xyXG4gICAgcmV0dXJuIHN0YXRlO1xyXG59XHJcblxyXG4vL9Cy0LDQu9C40LTQsNGG0LjRjyDRhNC+0YDQvNGLXHJcbmZ1bmN0aW9uIHZhbGlkRm9ybShuYW1lLCBlbWFpbCkge1xyXG5cclxuICAgIGxldCBzdGF0ZV9lbWFpbCA9IGNoZWNrSW5wdXQoZW1haWwsdmFsaWRFbWFpbCk7XHJcbiAgICBsZXQgc3RhdGVfbmFtZSA9IGNoZWNrSW5wdXQobmFtZSx2YWxpZE5hbWUpO1xyXG5cclxuICAgIGlmIChzdGF0ZV9lbWFpbCAmJiBzdGF0ZV9uYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0YXRlX2J1dHRvbih0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc3RhdGVfYnV0dG9uKGZhbHNlKTtcclxuXHJcbn1cclxuLy/Rg9GB0YLQsNC90L7QstC60LAg0L/QvtC30LjRhtC40Lgg0LrQsNGA0LXRgtC60LhcclxuZnVuY3Rpb24gc2V0Q2FyZXRQb3NpdGlvbihjdHJsLCBzdGFydCwgZW5kKSB7XHJcbiAgICBpZiAoZW5kID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBlbmQgPSBzdGFydDtcclxuICAgIH1cclxuICAgIC8vIElFID49IDkgYW5kIG90aGVyIGJyb3dzZXJzXHJcbiAgICBpZihjdHJsLnNldFNlbGVjdGlvblJhbmdlKVxyXG4gICAge1xyXG4gICAgICAgIGN0cmwuZm9jdXMoKTtcclxuICAgICAgICBjdHJsLnNldFNlbGVjdGlvblJhbmdlKHN0YXJ0LCBlbmQpO1xyXG4gICAgfVxyXG4gICAgLy8gSUUgPCA5XHJcbiAgICBlbHNlIGlmIChjdHJsLmNyZWF0ZVRleHRSYW5nZSkge1xyXG4gICAgICAgIHZhciByYW5nZSA9IGN0cmwuY3JlYXRlVGV4dFJhbmdlKCk7XHJcbiAgICAgICAgcmFuZ2UuY29sbGFwc2UodHJ1ZSk7XHJcbiAgICAgICAgcmFuZ2UubW92ZUVuZCgnY2hhcmFjdGVyJywgZW5kKTtcclxuICAgICAgICByYW5nZS5tb3ZlU3RhcnQoJ2NoYXJhY3RlcicsIHN0YXJ0KTtcclxuICAgICAgICByYW5nZS5zZWxlY3QoKTtcclxuICAgIH1cclxufVxyXG4vL9C/0L7Qu9GD0YfQtdC90LjQtSDQv9C+0LfQuNGG0LjQuCDQutCw0YDQtdGC0LrQuFxyXG5mdW5jdGlvbiBnZXRDYXJldFBvc2l0aW9uIChjdHJsKSB7XHJcbiAgICAvLyBJRSA8IDkgU3VwcG9ydFxyXG4gICAgaWYgKGRvY3VtZW50LnNlbGVjdGlvbikge1xyXG4gICAgICAgIGN0cmwuZm9jdXMoKTtcclxuICAgICAgICB2YXIgcmFuZ2UgPSBkb2N1bWVudC5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKTtcclxuICAgICAgICB2YXIgcmFuZ2VsZW4gPSByYW5nZS50ZXh0Lmxlbmd0aDtcclxuICAgICAgICByYW5nZS5tb3ZlU3RhcnQgKCdjaGFyYWN0ZXInLCAtY3RybC52YWx1ZS5sZW5ndGgpO1xyXG4gICAgICAgIHZhciBzdGFydCA9IHJhbmdlLnRleHQubGVuZ3RoIC0gcmFuZ2VsZW47XHJcbiAgICAgICAgcmV0dXJuIHsnc3RhcnQnOiBzdGFydCwgJ2VuZCc6IHN0YXJ0ICsgcmFuZ2VsZW4gfTtcclxuICAgIH1cclxuICAgIC8vIElFID49OSBhbmQgb3RoZXIgYnJvd3NlcnNcclxuICAgIGVsc2UgaWYgKGN0cmwuc2VsZWN0aW9uU3RhcnQgfHwgY3RybC5zZWxlY3Rpb25TdGFydCA9PSAnMCcpIHtcclxuICAgICAgICByZXR1cm4geydzdGFydCc6IGN0cmwuc2VsZWN0aW9uU3RhcnQsICdlbmQnOiBjdHJsLnNlbGVjdGlvbkVuZCB9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4geydzdGFydCc6IDAsICdlbmQnOiAwfTtcclxuICAgIH1cclxufVxyXG5cclxuJChwaG9uZV9vYmopLm1hc2soXCIrNyAoOTk5KSA5OTktOTk5OVwiKTtcclxuLy/Qv9GA0L7QstC10YDQutCwINC00LvRjyDQv9C+0LvQtdC5INGBINC90L7QvNC10YDQvtC8INGC0LXQu9C10YTQvtC90LA7XHJcbi8vINC10YHQu9C4INGD0YHRgtCw0LLQu9C40LLQsNC10YLRgdGPINC60YPRgNGB0L7RgCDQsiDRgdGC0YDQvtC60YMg0Lgg0LTQviDQutGD0YDRgdC+0YDQsCDQvdC10YIg0YHQuNC80LLQvtC70L7QsiAgXCJfXCIgLSDQvNC+0LbQvdC+INGA0LXQtNCw0LrRgtC40YDQvtCy0LDRgtGMXHJcbi8v0LXRgdC70Lgg0LTQviDQutGD0YDRgdC+0YDQsCDQtdGB0YLRjCBcIl9cIiAtINC60YPRgNGB0L7RgCDQv9C10YDQtdGF0L7QtNC40YIg0Log0L/QtdGA0LLQvtC80YMg0YLQsNC60L7QvNGDINGB0LjQvNCy0L7Qu9GDXHJcbiQocGhvbmVfb2JqKS5vbignY2xpY2sgaW5wdXQnLGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgdmFyIG4gPSB2YWwuaW5kZXhPZignXycpO1xyXG4gICAgdmFyIHN0ciA9IHZhbC5zdWJzdHJpbmcoMCxnZXRDYXJldFBvc2l0aW9uKHRoaXMpLnN0YXJ0KTtcclxuXHJcbiAgICBpZihuICE9ICctMScgJiYgc3RyLmluZGV4T2YoJ18nKSAhPSAtMSkgIHNldENhcmV0UG9zaXRpb24odGhpcyxuKTtcclxuXHJcbn0pO1xyXG5cclxuXHJcblxyXG4kKG5hbWVfb2JqKS5vbignaW5wdXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YWxpZEZvcm0obmFtZV9vYmosIGVtYWlsX29iaik7XHJcbn0pO1xyXG4kKGVtYWlsX29iaikub24oJ2lucHV0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgdmFsaWRGb3JtKG5hbWVfb2JqLCAgZW1haWxfb2JqKTtcclxufSk7XHJcblxyXG5cclxuJCgnI2luZGV4X19mb3JtJykuc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgaWYgKCF2YWxpZEZvcm0obmFtZV9vYmosIGVtYWlsX29iaikpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICAvKlxyXG4gICAgdmFyIG1fbWV0aG9kPSQodGhpcykuYXR0cignbWV0aG9kJyk7XHJcbiAgICB2YXIgbV9hY3Rpb249JCh0aGlzKS5hdHRyKCdhY3Rpb24nKTtcclxuICAgIHZhciBtX2RhdGE9JCh0aGlzKS5zZXJpYWxpemUoKTtcclxuXHJcbiAgICAvL9C+0YLQv9GA0LDQstC70Y/QtdC8INGE0L7RgNC80YMg0L/QviBhY3Rpb25cclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogbV9tZXRob2QsXHJcbiAgICAgICAgdXJsOiBtX2FjdGlvbixcclxuICAgICAgICBkYXRhOiBtX2RhdGEsXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzdWx0KXtcclxuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xyXG4gICAgICAgICAgICAkKCcubW9kYWwnKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAkKCcjc2VuaycpLm1vZGFsKCdzaG93Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7Ki9cclxuICAgIC8v0L7Rh9C40YnQsNC10Lwg0YTQvtGA0LzRgywg0LfQsNC60YDRi9Cy0LDQtdC8INC80L7QtNCw0LvRjNC90YvQtSDQvtC60L3QsCDQuCDQvtGC0LrRgNGL0LLQsNC10Lwg0L7QutC90L4g0L4g0YPRgdC/0LXRiNC90L7QvCDQstGF0L7QtNC1XHJcbiAgICB0aGlzLnJlc2V0KCk7XHJcblxyXG4gICAgY29uc29sZS5sb2coJ0Zvcm0gdmFsaWQnKTtcclxufSk7XHJcblxyXG4iXX0=
