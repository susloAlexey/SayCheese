$(document).ready( function() {
	var canvas = new fabric.Canvas('canvas')
    window.canvas = canvas;

    /////////////////////////////////////////////////////////////////////////
    //////////////////////////IMAGE LOADERS//////////////////////////////////
    /////////////////////////////////////////////////////////////////////////
	$('#bg-loader').change( function (e) {
    	var reader = new FileReader();

    	reader.onload = function (event) {
        	var imgObj = new Image();
        	imgObj.src = event.target.result;       

        	imgObj.onload = function () {          	
            	var image = new fabric.Image(imgObj);
                var prop = image.width/$('#canvas-drop-area').width();
                image.width = $('#canvas-drop-area').width();
                image.height /= prop;    
                console.log(image.width + " " + image.height);        
    	        canvas.backgroundImage = image;
                canvas.setHeight(image.height);
                canvas.setWidth(image.width);
    	        canvas.renderAll();    	        	    
    	    };
        
	    };
	    reader.readAsDataURL(e.target.files[0]);

	    $('.tools-container').show();
        $('#canvas-drop-area').show();
	});

	$('#img-loader').change( function (e) {
    	var reader = new FileReader();

    	reader.onload = function (event) {
            var image = event.target.result;
        	img_to_canvas(image);        
	    };

	    reader.readAsDataURL(e.target.files[0]);
        $('#img-loader').val('');
	});

    var img_to_canvas = function(img) {
        fabric.Image.fromURL(img, function(imgObj) {
            imgObj.scale(0.4);
            canvas.add(imgObj).renderAll();       
        }, { crossOrigin: 'Anonymous' });
    };

    /////////////////////////////////////////////////////////////////////////
    //////////////////////////DRAG N DROP////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////
    var $drop = $('#canvas-drop-area'),
        $gallery = $('.draggable-image');

    $gallery.draggable({
        helper: 'clone'
    });

    $drop.droppable({
        drop: function (event, ui) {
            var image = event.originalEvent.target.src;
            img_to_canvas(image);
        }
    });    
});