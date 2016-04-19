$(document).ready( function() {
	$('.nav-tabs li').click( function() {
        $('.nav-tabs > li').removeClass('active');   
        $(this).addClass('active'); 
        $('.tools').hide();          
        $('.' + this.id + '-container').show(); 
    });
});