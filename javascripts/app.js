
;( function ( $ ) {

	/**
	 * [flood description]
	 * @param  {[type]} opts [description]
	 * @return {[type]}      [description]
	 */
	$.fn.flood = function( opts )
	{

		/**
		 * [opts description]
		 * @type {[type]}
		 */
		var opts = $.extend({

			/**
			 * [state description]
			 * @type {String}
			 */
			state : 'open',

			/**
			 * [binding description]
			 * @type {String}
			 */
			binding : 'click',

			/**
			 * [speed description]
			 * @type {Number}
			 */
			speed : 500,

			/**
			 * [trigger description]
			 * @type {[type]}
			 */
			trigger : $('body'),

			/**
			 * [easing description]
			 * @type {String}
			 */
			easing : 'swing'

		}, opts);

		/**
		 * [flood description]
		 * @param  {[type]} _this [description]
		 * @param  {[type]} index [description]
		 * @return {[type]}       [description]
		 */
		var flood = function( _this, index )
		{

			/**
			 * [elm description]
			 * @type {[type]}
			 */
			this.elm = $( _this );

			/**
			 * [isCurrently description]
			 * @type {Boolean}
			 */
			this.isCurrently = null;

			/**
			 * [childCount description]
			 * @type {[type]}
			 */
			this.childCount = $( '> *', this.elm ).length;

			/**
			 * [interval description]
			 * @type {[type]}
			 */
			this.interval = null;

			/**
			 * [isCurrently description]
			 * @type {Boolean}
			 */
			if( typeof opts.trigger === 'object' ) {
				this.trigger = opts.trigger;
			} else {
				this.trigger = $(opts.trigger);
			}

			/**
			 * [_flood description]
			 * @type {[type]}
			 */
			var _flood = this;

			/**
			 * [slideElementDown description]
			 * @return {[type]} [description]
			 */
			var slideElementDown = function( speed )
			{
				_flood.elm.slideDown({
					speed 		: speed,
					easing 		: opts.easing,
					complete 	: function(){
						_flood.isCurrently = 'open';
					}
				});
			};

			/**
			 * [slideElementUp description]
			 * @return {[type]} [description]
			 */
			var slideElementUp = function( speed )
			{
				_flood.elm.slideUp({
					speed 		: speed,
					easing 		: opts.easing,
					complete 	: function(){
						_flood.isCurrently = 'closed';
					}
				});
			};

			/**
			 * [flood description]
			 * @param  {[type]} children [description]
			 * @param  {[type]} loop     [description]
			 * @return {[type]}          [description]
			 */
			var flood = function( children, loop, method )
			{
				_flood.interval = setInterval( function(){

					var current = children.eq( loop );

					if( ! current.length ) {
						clearTimeout( _flood.interval );
						_flood.interval = null;
						bindEvent();
					}

					current[method]( 'flooded' );

					loop++;

				}, ( opts.speed / _flood.childCount ) );
			};

			/**
			 * [incrementFlooding description]
			 * @return {[type]} [description]
			 */
			var incrementFlooding = function(){

				flood( $( '> *', _flood.elm ), 0, 'addClass' );

			};

			/**
			 * [decrementFlooding description]
			 * @return {[type]} [description]
			 */
			var decrementFlooding = function(){

				var children = $( $( '> *', _flood.elm ).get().reverse() );

				children.eq(0).removeClass('flooded');

				flood( children, 0, 'removeClass' );

			};

			/**
			 * [bindEvent description]
			 * @return {[type]} [description]
			 */
			var bindEvent = function()
			{
				_flood.trigger.on(  opts.binding + '.flood', function(e){
					$(this).unbind( opts.binding + '.flood' );
					e.preventDefault();
					if( _flood.isCurrently === 'open' ) {
						slideElementUp( opts.speed );
						decrementFlooding();
					} else {
						slideElementDown( opts.speed );
						incrementFlooding();
					}
				});
			};

			/**
			 * [description]
			 * @return {[type]} [description]
			 */
			( function(){

				if( opts.state === 'closed' ) {
					slideElementUp(0);
				} else {
					slideElementDown(0);
				}
				bindEvent();

			})();


		};

		return $(this).each( function ( i ) {
			$(this).data( 'flood', new flood( this, i ) );
		});

	};

})( jQuery );




( function( w, $, d ) {

	$(d).ready( function() {

		$('ul').flood({
			state : 'closed'
		});

	});

})( window, jQuery, document );