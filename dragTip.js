function makeSlider(id,min, max,tippyPlc,hv) {
    var currentValue = {
        from: min,
        to: max
    }

    var slider = $('#'+id).dragslider({
        orientation: hv, // vertical / horizontal
        range: true,
        min: min,
        max: max,
        rangeDrag: true,
        values: [
            currentValue.from, currentValue.to
        ],
        create: function (event, ui) {
            var $slider = $(this);
            var $sliderWrapper = $slider.closest('.store-slider-wrapper');
            var $sliderHandlers = $slider.find('.ui-slider-handle');
            var $sliderHandlersMin = (hv=="vertical") ? $sliderHandlers.eq(1) :$sliderHandlers.eq(0);
            var $sliderHandlersMax = (hv=="vertical") ? $sliderHandlers.eq(0) : $sliderHandlers.eq(1);
            var $sliderRange = $slider.find('.ui-slider-range');
            var values = {
                from: currentValue.from,
                to: currentValue.to
            }
            
            $sliderHandlersMin.attr('title', values.from);
            $sliderHandlersMax.attr('title', values.to);
       
            var tippyOptions = {
                trigger: 'manual',
                sticky: true,
                dynamicTitle: true,
                hideOnClick: false,
                arrow: true,
                arrowType: 'round',
                animation: 'fade',
                placement: tippyPlc,
                livePlacement: false,
                flipBehavior: [],
                createPopperInstanceOnInit: true,
                
            };


            tippy($sliderHandlersMin[0], tippyOptions);
            tippy($sliderHandlersMax[0], tippyOptions);
   
            updateSliderTooltip($slider, values,hv);
        },
        slide: function (event, ui) {
            var $slider = $(this);
            var $sliderWrapper = $slider.closest('.store-slider-wrapper');
            var values = {
                from: ui.values[0],
                to: ui.values[1]
            }
            

            updateSliderTooltip($slider, values, hv);
        }
    });
}

function updateSliderTooltip($slider, values, hv) {
    console.log(hv);
    var $sliderWrapper = $slider.closest('.store-slider-wrapper');
    var $sliderHandlers = $slider.find('.ui-slider-handle');
    var $sliderHandlersMin = $sliderHandlers.eq(0);
    var $sliderHandlersMax = $sliderHandlers.eq(1);
    //var $sliderRange = $slider.find('.ui-slider-range');

    console.log(getCoords($sliderHandlersMin[0]));
    console.log(getCoords($sliderHandlersMax[0]));
    $sliderHandlersMin.attr('title', values.from);
    $sliderHandlersMax.attr('title', values.to);

    setInterval(function () {
        var tooltipMinLeft = getCoords($sliderHandlersMin[0]).left;
        var tooltipMaxLeft = getCoords($sliderHandlersMax[0]).left;

        var tooltipRange = tooltipMaxLeft - tooltipMinLeft;
        var singleTooltip = (hv=="vertical") ? false : tooltipRange < 80;

        if (!singleTooltip) {
            //console.log("singleTooltip");
            if (!$sliderHandlersMin[0]._tippy.state.visible) 
                $sliderHandlersMin[0]
                    ._tippy
                    .show(0);
            if (!$sliderHandlersMax[0]._tippy.state.visible) 
                $sliderHandlersMax[0]
                    ._tippy
                    .show(0);
            }
       
        }, 1);
}

function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top = box.top + scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return {top: Math.round(top), left: Math.round(left)};
}