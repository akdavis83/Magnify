$(function() {

    var mouse = {x: 0, y: 0};
    var magnify;
    var cur_text;

    var ui = {
      magniflier: $('.magniflier')
    };

    // Add the magnifying glass
    if (ui.magniflier.length) {
      var div = document.createElement('div');
      div.setAttribute('class', 'glass');
      ui.glass = $(div);

      $('body').append(div);

      // Style the glass for text magnification
      ui.glass.css({
        position: 'absolute',
        border: '2px solid #000',
        borderRadius: '50%',
        overflow: 'hidden',
        width: '350px',
        height: '350px',
        display: 'none',
        backgroundColor: '#fff',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '2em',
        zIndex: 1000
      });
    }

    var mouseMove = function(e) {
      var $el = $(this);

      // Container offset relative to document
      var magnify_offset = $el.offset();

      // Mouse position relative to container
      mouse.x = e.pageX - magnify_offset.left;
      mouse.y = e.pageY - magnify_offset.top;

      // The magnifying glass should only show up when the mouse is inside
      if (
        mouse.x < $el.width() &&
        mouse.y < $el.height() &&
        mouse.x > 0 &&
        mouse.y > 0
      ) {
        magnify(e);
      } else {
        ui.glass.fadeOut(100);
      }

      return;
    };

    var magnify = function(e) {
      // Set the text inside the magnifying glass
      ui.glass.text(cur_text.text());

      // Position the magnifying glass
      var glass_left = e.pageX - ui.glass.width() / 2;
      var glass_top = e.pageY - ui.glass.height() / 2;

      ui.glass.css({
        left: glass_left,
        top: glass_top,
        display: 'flex'
      });

      return;
    };

    $('.magniflier').on('mousemove', function() {
      ui.glass.fadeIn(200);

      cur_text = $(this);

      mouseMove.apply(this, arguments);

      ui.glass.on('mousemove', mouseMove);
    });

    $('.magniflier').on('mouseleave', function() {
      ui.glass.fadeOut(100000); // Hide the magnifying glass
    });

    ui.glass.on('mouseout', function() {
      ui.glass.off('mousemove', mouseMove);
    });

});
