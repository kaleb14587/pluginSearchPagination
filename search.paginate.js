(function($){
    $.fn.search = function(options) {
        var formSearch = $(this);
        var serializableForm = formSearch.serialize();
        var defaults = {
            id_form:'',
            paginate:{
              variable:'nextPage',
              onPaginate:true
            },
            loadingElement: $('div', {
                'id': 'loading',
                'class': 'loading-search-results ng-hide'
            }),
            data:function(){
                return $(formSearch).serialize(); 
            },
            validateForm:function(){
               return true;
            },
            searchStart: function () {
                return false;
            },
            resultSearch: function () {
                return false;
            },
            showIn: '',
            hide: ''
        };
        var last;

        var settings = $.extend({}, defaults, options);
        var elementShowIn = $(settings.showIn);
        var elementHide = $(settings.hide);
        var inAjax = false;
        var current=0;
        var getMorePages= function(){
            if(settings.paginate.onPaginate){
                var inWorkScroll= false;
            $(window).scroll(function() {
                if(inWorkScroll)
                    return false;
                if(last===current){
                    last=0;
                    current=0;
                    $(window).unbind('scroll');
                }

                if ($(window).scrollTop() > ($(document).height() - $('#moreItems').height() - 900) && current <= last) {
                    inWorkScroll= true;
                    $('#moreItems').remove();
                    $('#loading-next-page').remove();
                    elementShowIn.append('<div   class="loading-search-results " id="loading-next-page" ></div>');
                    ajaxGetSearchResult(settings.paginate.variable+'='+(current+1));
                }
            });
                elementShowIn.find('#lista-filmes').append('<div id="moreItems"></div>');
            }
        };
        var ajaxGetSearchResult = function(dataNextPage){
            if(!inAjax ){
                inAjax= true;

                serializableForm = $(settings.id_form).serialize();
                $.ajax({
                    type: formSearch.attr('method') ,
                    data: $(settings.id_form).serialize()+(dataNextPage ?'&'+dataNextPage:''),//formSearch.serialize()+'',
                    url: formSearch.attr('action') ,
                    cache: false ,
                    datatype: "json" ,
                    success: function (response) {
                        $('#loading-next-page').remove();

                        last = response.last;
                        var currentResponse = response.current;
                        if (response.current > current && (response.current <= response.last ||response.last === 0) ){

                            if(dataNextPage){
                                elementShowIn.find('#lista-filmes').append(response.body);
                            }else{
                                elementShowIn.html(response.body);
                            }

                            if( last  >  currentResponse){
                                getMorePages();
                            }


                        }

                        inAjax = false;
                        current= response.current;
                    },error:function(){
                        $('#loading-next-page').remove();
                        inAjax = false;
                    }
                });
            }
        };

        $.fn.searchStart = function (){
            if(serializableForm ===  $(settings.id_form).serialize())
                return false;


            if(settings.validateForm()){
                last=0;
                current=0;
                elementHide.hide();
                elementShowIn.show();
                $('#loading-next-page').remove();
                elementShowIn.html('<div   class="loading-search-results " id="loading-next-page" ></div>');
                ajaxGetSearchResult();
            }else{
                serializableForm = $(settings.id_form).serialize();
                last=0;
                current=0;
                elementHide.show();
                elementShowIn.hide();
            }

        };
    }
})(jQuery);