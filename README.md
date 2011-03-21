# jQuery Actual Plugin

A jQuery BlockUI alternative plugin.

## Description



## Requires
  - jQuery 1.2.6+
  - [jQuery center plugin](https://github.com/dreamerslab/jquery.center) v1.0.0+

## Browser Compatibility
  - [Firefox](http://mzl.la/RNaI) 2.0+
  - [Internet Explorer](http://bit.ly/9fMgIQ) 6+
  - [Safari](http://bit.ly/gMhzVR) 3+
  - [Opera](http://bit.ly/fWJzaC) 10.6+
  - [Chrome](http://bit.ly/ePHvYZ) 8+

## Installation
  - First, make sure you are using valid [DOCTYPE](http://bit.ly/hQK1Rk)
  - Include nessesary JS files

<!-- -->

      <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"></script>
      <script type="text/javascript" src="path-to-file/jquery.msg.js"></script>

## Options

#### autoUnblock
- description: auto unblock the screen
- data type: bool
- default value: true
- possible value: true, false
- sample code

<!-- -->

    $.msg({ autoUnblock : false });
    
#### center
- description: options for jQuery center plugin
- data type: object
- default value: { topPercentage : 0.4 }
- possible value: please check [jQuery center plugin](https://github.com/dreamerslab/jquery.center) for detail
- sample code

<!-- -->

    $.msg({ 
      center : {
        topPercentage : 0.5
        border : '1px solid #cccccc'
      }
    });

#### css
- description: extra css style for the msg content
- data type: float
- default value: {} (none)
- possible value: please check [jquery.css()](http://api.jquery.com/css/)
- sample code

<!-- -->

    $.msg({ 
      css : {
        background : blue
      }
    });

#### clickUblock
- description: click the overlay to unblock the screen
- data type: bool
- default value: true
- possible value: true, false
- sample code

<!-- -->

    $.msg({ clickUblock : false });

#### content
- description: the message content
- data type: string
- default value: "Please wait..."
- sample code

<!-- -->

    $.msg({ 
      content : '<img src="loading.gif"/> Loading images, please wait...'
    });

#### fadeIn
- description: message fade in speed
- data type: integer
- default value: 200
- sample code

<!-- -->

    $.msg({ fadeIn : 500 });

#### fadeOut
- description: message fade out speed
- data type: integer
- default value: 300
- sample code

<!-- -->

    $.msg({ fadeOut : 200 });

#### klass
- description: extra class to message content, separate multiple class with space
- data type: string
- default value: 'black-on-white'
- example value: 'round-corner shadow'
- sample code

<!-- -->

    $.msg({ klass : 'round-corner shadow' });

#### method
- description: jquery manipulation method to determinate how you want the message to appear
- data type: string
- default value: 'appendTo'
- possible value: 'appendTo', 'prependTo', 'insertAfter', 'insertBefore'
- sample code

<!-- -->

    $.msg({ method : 'insertAfter' });

#### target
- description: the target DOM element that 
- data type: string
- default value: 'body'
- example value: '#layer', '#content', '#footer .nav'
- sample code

<!-- -->

    $.msg({ method : '#layer' });

#### timeOut
- description: screen block time out
- data type: integer
- default value: 2400
- sample code

<!-- -->

    $.msg({ timeOut : 5000 });

#### z
- description: the z-index of jQuery MSG element
- data type: integer
- default value: 1000
- sample code

<!-- -->

    $.msg({ z : 5000 });

## Events

#### afterBlock
- description: callback function for the afterBlock event
- sample code

<!-- -->

    // show msg and replace message content woth a ajax call after block the screen
    $.msg({ 
      autoUnblock : false,
      afterBlock : function(){
        $.getJSON('ajax/test.json', function( rsp ){
          $.msg( 'replace', rsp );
      } 
    });

#### beforeUnblock
- description: callback function for the beforeUnblock event
- sample code

<!-- -->
    
    // clear all input value before msg unblock
    $.msg({ 
      beforeUnblock : function(){
        $( 'input' ).val( '' );
      } 
    });


## Methods

#### replace
- description: replace message content
- syntax: $.msg( 'replace', content ); content has to be string
- sample code

<!-- -->
    
    $.msg( 'replace', '<p>This is the replaced content</>' );

#### unblock
- description: manually unblock the screen
- sample code

<!-- -->
    
    $.msg( 'unblock' );

## Demo
Please see demo.html 

## License

The expandable plugin is licensed under the MIT License (LICENSE.txt).

Copyright (c) 2011 [Ben Lin](http://dreamerslab.com)