$(document).ready( function() {
	var filters = ['grayscale', 'invert', 'remove-white', 'sepia', 'sepia2',
                   'brightness', 'noise', 'gradient-transparency', 'pixelate',
                   'blur', 'sharpen', 'emboss', 'tint', 'multiply', 'blend'];
    var f = fabric.Image.filters;

    var applyFilter = function(index, filter) {
        var obj;
        if (canvas.getActiveObject()) { obj = canvas.getActiveObject(); } 
        else { obj = canvas.backgroundImage; } 
        obj.filters[index] = filter;
        obj.applyFilters(canvas.renderAll.bind(canvas));            
    };

    var applyFilterValue = function(index, prop, value) {
        var obj;
        if (canvas.getActiveObject()) { obj = canvas.getActiveObject(); } 
        else { obj = canvas.backgroundImage; } 
        obj.filters[index][prop] = value;
        obj.applyFilters(canvas.renderAll.bind(canvas));         
    };

    var removeFilters = function () {
        var obj;
        if (canvas.getActiveObject()) { obj = canvas.getActiveObject(); } 
        else { obj = canvas.backgroundImage; }
        obj.filters = [];
        obj.applyFilters(canvas.renderAll.bind(canvas));
    };


    $('#grayscale').click( function() {
        applyFilter(0, this.checked && new f.Grayscale());
    });
    $('#invert').click( function() {
        applyFilter(1, this.checked && new f.Invert());
    });
    $('#remove-white').click( function () {
        applyFilter(2, this.checked && new f.RemoveWhite({
            threshold: $('#remove-white-threshold').val(),
            distance: $('#remove-white-distance').val()
        }));
    });
    $('#remove-white-threshold').change( function() {
        applyFilterValue(2, 'threshold', this.value);
    });
    $('#remove-white-distance').change( function() {
        applyFilterValue(2, 'distance', this.value);
    });
    $('#sepia').click( function() {
        applyFilter(3, this.checked && new f.Sepia());
    });
    $('#sepia2').click( function() {
        applyFilter(4, this.checked && new f.Sepia2());
    });
    $('#brightness').click( function () {
        applyFilter(5, this.checked && new f.Brightness({
            brightness: parseInt($('#brightness-value').val(), 10)
        }));
    });
    $('#brightness-value').change( function() {
        applyFilterValue(5, 'brightness', parseInt(this.value, 10));
    });
    $('#noise').click( function () {
        applyFilter(6, this.checked && new f.Noise({
            noise: parseInt($('#noise-value').val(), 10)
        }));
    });
    $('#noise-value').change( function() {
        applyFilterValue(6, 'noise', parseInt(this.value, 10));
    });
    $('#gradient-transparency').click( function () {
        applyFilter(7, this.checked && new f.GradientTransparency({
            threshold: parseInt($('#gradient-transparency-value').val(), 10)
        }));
    });
    $('#gradient-transparency-value').change( function() {
        applyFilterValue(7, 'threshold', parseInt(this.value, 10));
    });
    $('#pixelate').click( function() {
        applyFilter(8, this.checked && new f.Pixelate({
            blocksize: parseInt($('#pixelate-value').val(), 10)
        }));
    });
    $('#pixelate-value').change( function() {
        applyFilterValue(8, 'blocksize', parseInt(this.value, 10));
    });
    $('#blur').click( function() {
        applyFilter(9, this.checked && new f.Convolute({
            matrix: [ 1/8, 1/8, 1/8,
                      1/8, 1/8, 1/8,
                      1/8, 1/8, 1/8 ]
        }));
    });
    $('#sharpen').click( function() {
        applyFilter(10, this.checked && new f.Convolute({
            matrix: [  0, -1,  0,
                      -1,  5, -1,
                       0, -1,  0 ]
        }));
    });
    $('#emboss').click( function() {
        applyFilter(11, this.checked && new f.Convolute({
            matrix: [ 1,   1,  1,
                      1, 0.7, -1,
                     -1,  -1, -1 ]
        }));
    });
    $('#tint').click( function() {
        applyFilter(12, this.checked && new f.Tint({
            color: $('#tint-color').val(),
            opacity: parseFloat($('#tint-opacity').val())
        }));
    });
    $('#tint-color').change( function() {
        applyFilterValue(12, 'color', this.value);
    });
    $('#tint-opacity').change( function() {
        applyFilterValue(12, 'opacity', parseFloat(this.value));
    });

    $('#remove-filters').click( function() {
        removeFilters();
    });
});