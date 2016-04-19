$(document).ready( function() {
	$('#delete').click( function() {
        if(canvas.getActiveGroup()){
            canvas.getActiveGroup().forEachObject(function (o) { canvas.remove(o) });
            canvas.discardActiveGroup().renderAll();
        } else {
            canvas.remove(canvas.getActiveObject());
        }      
    });

    $('#deselect').click( function() {
        canvas.deactivateAll().renderAll();       
    });

    $('#flip-vertical').click( function() {
        if(canvas.getActiveGroup()){
            canvas.getActiveGroup().scale(-0.4, 0.4);
        } else {
            canvas.getActiveObject().scale(-0.4, 0.4);
        }  

        canvas.renderAll();
    });

	$('#save').click( function() {
        canvas.deactivateAll().renderAll();
        var img = canvas.toDataURL('image/png');
        this.href = img;
	});   

    $(canvas.wrapperEl).on('mousewheel', function(e) {
        var target = canvas.findTarget(e);
        var delta = e.originalEvent.wheelDelta / 3000;
    
        if (target) {
            target.scaleX += delta;
            target.scaleY += delta;
        
            // constrain
            if (target.scaleX < 0.05) {
                target.scaleX = 0.05;
                target.scaleY = 0.05;
            }
            // constrain
            if (target.scaleX > 10) {
                target.scaleX = 10;
                target.scaleY = 10;
            }

            target.setCoords();
            canvas.renderAll();
            return false;
        }
    });

    canvas.on('mouse:down', function(e) {
        if ((typeof (e.target) !== 'undefined')) {
            canvas.bringToFront(e.target);
        } 
    });
});