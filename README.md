
# Flood

A simple way of transitioning child elements through a toggle.

```
;( function( w, $, d ) {

	$(d).ready( function() {

		$('ul').flood({
			state : 'closed'
		});

	});

})( window, jQuery, document );
```