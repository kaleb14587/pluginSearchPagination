# pluginSearchPagination
plugin para componente de busca e paginação

# exemplo de uso

```javascript
var form_sync = $('#form-async-search-filter');
    form_sync.search({
        id_form: '#form-async-search-filter',
        showIn: '#lista-search',
        hide: '.box-filmes-listas',
        data: function () {
            return form_sync.serialize();
        },
        loadingElement: $('div', {
            'id': 'loading',
            'class': 'loading-search-results ng-hide'
        }),
        validateForm: function () {
            var isValidForm = false;
            $(form_sync).find('select,input').each(function (index, obj) {
                if ($(obj).val().trim() !== '') {
                    isValidForm = true;
                }
            });
            return isValidForm;
        }
    });
    $('#ano').on('change', function () {
        form_sync.searchStart();
    });
    form_sync.find('input[name="name"]').on('keyup blur', function () {
        form_sync.searchStart();
    });
    form_sync.find('select').on('change', function () {
        form_sync.searchStart();
    });
    form_sync.submit(function (event) {
        form_sync.searchStart();
    });
    $('.options-filters .faixa-etaria').click(function () {
        removeClassActive($(this));
        form_sync.searchStart();
    });
    var removeClassActive = function (where) {
        var obj = $(where);
        obj.parent().parent().find('.badge').removeClass('badge');
        obj.addClass('badge');
        $(obj.attr('href')).val(obj.attr('value'));
    };
```

| config        | type           | Func  |
| ------------- |:-------------:| -----:|
| id_form     | string  | id do formulario  ou classe|
