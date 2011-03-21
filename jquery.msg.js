/*! Copyright 2011, Ben Lin (http://dreamerslab.com/)
* Licensed under the MIT License (LICENSE.txt).
*
* Version: 1.0.0
*
* Requires: 
* jQuery 1.2.6+, 
* jQuery Center plugin 1.0.0+ https://github.com/dreamerslab/jquery.center
*/
// wrap all the code in an anonymous function to prevent global vars
;( function( $, doc ){

  // a higher scope to store the user configs for private methods to access
  var configs,

  blockID = 0,

  unblockID = 0,

  // a var to hold the beforeUnblock event handler
  beforeUnblock = function(){},

  // private methods
  _ = {
    // private unblock method
    unblock : function(){
      if( blockID - unblockID === 1 ){
        // remove msg after fade out
        $overlay = $( '#jquery-msg-overlay' ).fadeOut( configs.fadeOut, function(){
          // callback
          beforeUnblock( $overlay );
          $overlay.remove();
        });
        unblockID = blockID;
      }
    }
  },

  publicMethods = {
    // unblock the screen
    unblock : function( ms ){
      // default unblock delay is 0 ms
      var _ms = ms === undefined ? 0 : ms;
      setTimeout( function(){
        _.unblock();
      }, _ms );
    },
    // replace current content in the msg
    replace : function( content ){
      // check if the to be replaced content exist
      // and make sure it's a string
      if( content === undefined && typeof( content ) === 'string' ){
        throw '$.msg(\'replace\') error: second argument is undefined or is not a string';
      }
      // replace old contant with new content and set the msg box to center
      $( '#jquery-msg-content' ).empty().
        html( content ).
        center();
    }
  };

  // the jquery plugin
  $.msg = function( options, extra ){

    var $overlay, $content;
    
    // merge default setting with user options
    // IMPORTANT!! do not use 'var'
    // the higher scope configs has to be over written here
    // for private method to access the user configs
    configs = $.extend({
      // after block event handler
      afterBlock : function(){},
      autoUnblock : true,
      // options for $.center( center ) plugin
      center : { topPercentage : 0.4 },
      css : {},
      // click overlay to unblock
      clickUblock : true,
      content : "Please wait..." ,
      fadeIn : 200,
      fadeOut : 300,
      bgPath : '/img/',
      // default theme
      klass : 'black-on-white',
      // jquery methodds, can be appendTo, after, before...
      method : 'appendTo',
      // DOM target to be insert into the msg
      target : 'body',
      // default auto unblock count down
      timeOut : 2400,
      // default z-index of the overlay
      z : 1000
    }, options );

    // DOM el
    // for ie fade in trans we have to use img instead of  div
    $overlay = $(
      '<div id="jquery-msg-overlay" class="' + configs.klass + '" style="position:absolute; z-index:' + configs.z + '; top:0px; right:0px; left:0px; height:' + $( doc ).height() + 'px;">' +
        '<img src="' + configs.bgPath + 'blank.gif" id="jquery-msg-bg" style="width: 100%; height: 100%; top: 0px; left: 0px;"/>' +
        '<div id="jquery-msg-content" class="jquery-msg-content" style="position:absolute;">' +
          configs.content +
        '</div>' +
      '</div>'
    );

    // check if the beforeUnblock event handler is defined in the user option
    // if it does save it to higher scope to be execute later
    if( configs.beforeUnblock ) beforeUnblock = configs.beforeUnblock;

    // if options is a string
    // execute public method
    if( typeof( options ) === 'string' ){
      publicMethods[ options ]( extra );
    }else{
      // configs.method can be appendTo, after ...
      $overlay[ configs.method ]( configs.target );

      // set content ( msg ) to center before hiding
      // and apply user option css if any
      $content = $( '#jquery-msg-content' ).
        center( configs.center ).
        css( configs.css ).
        hide();
      
      // fadein the content after fade in the bg
      // then trigger afterBlock event handler
      $overlay.
        hide().
        fadeIn( configs.fadeIn, function(){
          $content.fadeIn( 'fast' );

          blockID++;

          configs.afterBlock( $overlay );

          // apply click unblock if the config set to true
          if( configs.clickUblock ){
            $overlay.bind( 'click', function( e ){
              e.stopPropagation();
              _.unblock();
            });
          }
          
          // apply auto unblock if the config set to true
          if( configs.autoUnblock ){
            setTimeout( _.unblock , configs.timeOut );
          }
        });
    }

    // return this to enable chaining
    return this;
  };

})( jQuery, document );