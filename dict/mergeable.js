
(function ( $ ) {
 
    $.fn.mergeable = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            
            accept: "*",
            activeClass: false,
            addClasses: true,
            appendTo: "parent",
            axis: false,
            backgroundColor: "white",
            color: "#556b2f",
            connectToSortable: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            delete_handle : false,
            delete_handle_type : false,
            disable_after: false,
            greedy: false,
            grid: false,
            handle: false,
            helper: "original",
            hoverClass: false,
            iframeFix: false,
            opacity: false,
            refreshPositions: false,
            revert: false,
            revertDuration: 500,
            scope: "default",
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: false,
            snapMode: "both",
            snapTolerance: 20,
            stack: false,
            tolerance: "intersect",
            zIndex: false,
            
                       
            
            
            
            
        }, options );
 
  
            $(this).draggable({ 
                
                // zIndex: 100,
                // snap: true,
                // snapMode: "inner",
                // revert: 'invalid',
                // disabled: false,
                // cursor: "move",
                // containment: "window",

                addClasses: settings.addClasses,
                appendTo:settings.appendTo,
                axis: settings.axis,
                connectToSortable: settings.connectToSortable,
                containment: settings.containment,
                cursor: settings.cursor,
                cursorAt: settings.cursorAt,
                grid: settings.grid,
                handle: settings.handle,
                helper: settings.helper,
                iframeFix: settings.iframeFix,
                opacity: settings.opacity,
                refreshPositions: settings.refreshPositions,
                revert: settings.revert,
                revertDuration: settings.revertDuration,
                scope: settings.scope,
                scroll: settings.scroll,
                scrollSensitivity: settings.scrollSensitivity,
                scrollSpeed: settings.scrollSpeed,
                snap: settings.snap,
                snapMode: settings.snapMode,
                snapTolerance: settings.snapTolerance,
                stack: settings.stack,
                zIndex: settings.zIndex,
                stop: function(event, ui){
//                    var w1 = $(ui.helper).width();
//                      var ht = $(ui.helper).height();
//                    $(ui.helper).width(w1+5);
//                   $(ui.helper).height(ht+3);
                    $(this).draggable('option','revert','invalid');
                    $(ui.helper).removeAttr('style');
                },
                start: function(event, ui){
//                     var w1 = $(ui.helper).width();
//                      var ht = $(ui.helper).height();
                   // $(ui.helper).width(w1-8);
                   // $(ui.helper).height(ht-5);
                }
                
  
        });
        
        $(this).disableSelection();
        $(this).droppable({
                accept: "*",
                addClasses: settings.addClasses,
                activeClass: settings.activeClass,
                greedy: settings.greedy,
                hoverClass: settings.hoverClass,
                scope: settings.scope,
                tolerance: settings.tolerance,
                drop: function( event, ui ) {
                    
                    var targetId = $(event.target).attr("id");
                    var sourceId = ui.draggable[0].id;
                    setTimeout(function () {
                        var master_field;
                        var shade;
                            if (!$( '#'+targetId ).hasClass('combo-field-box')) {    //Check if already combined once
                           
                                var code = new Array();
                                if(settings.delete_handle !== false && settings.delete_handle_type=='all') {
                                    $('#'+targetId).find('.'+settings.delete_handle).remove();   
                                }
                                var htm1 = $('#'+targetId)[0].innerHTML;            //Extract html code of target to inject
                                htm1 = "<div class='col-md-12 col-sm-12 col-xs-12 ' id ='"+targetId+"'>"+htm1+"</div>";                         
                                //console.log(sourceId);
                                //console.log(targetId);
                                if(settings.delete_handle !== false) {
                                    $('#'+sourceId).find('.'+settings.delete_handle).remove();   
                                }
                                var htm = $('#'+sourceId)[0].innerHTML;             //Extract html code of source to inject
                                htm = "<div class='col-md-12 col-sm-12 col-xs-12 ' id ='"+sourceId+"'>"+htm+"</div>";

                               // console.log(code);
                                var new_field = $('#combo-fields').html();
                                $('#'+targetId).empty();
                                $('#'+sourceId).remove();
                                
                                $('#'+targetId).append(htm1);
                                $('#'+targetId).append(htm);     //Add to html
                                $( '#'+targetId ).addClass('combo-field-box');
                                $( '#'+targetId ).addClass('clearfix');
                                $('.combo-field-box').draggable(settings.disable_after);
                                $('#'+targetId).parent().prepend($('#'+targetId)); //display combobox st the top
                                
                                $('#'+targetId).attr('id','merged-'+targetId+'-'+sourceId);
                               // make_editable();
                                
                                
                        
                            }
                            else {      //If not the first time
                                
                                if(settings.delete_handle !== false) {
                                    $('#'+sourceId).find('.'+settings.delete_handle).remove();   
                                }
                                var htm = $('#'+sourceId)[0].innerHTML;     
                                htm = "<div class='col-md-12 col-sm-12 col-xs-12 ' id ='"+sourceId+"'>"+htm+"</div>";

                               // var new_field = $('#combo-field-add').html();
                                $('#'+sourceId).remove();
                                $('#'+targetId).append(htm); 
                                
                            }
                    },100);

                }
            });
            return this;
 
    };

}( jQuery ));


