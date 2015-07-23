(function() {
	// integrates `app-menu` with `app-router`
	var AppRouterAdapter = {
		
		// private properties
		_appRouterSelector: 'app-router',
		_appRouter: null,
		_subscribers: [],
		_eventHandler: null,
		
		/**
		 * Adds a subscriber to be notified when the route is changed.
		 *
		 * @param callback The callback function to call when the route changes.
		 */
		subscribe: function (callback) {
			this._subscribers.push(callback);
			
			if (!this._eventHandler) {
				this._eventHandler = function (event) {
					this._subscribers.forEach(function (subscriber) {
						subscriber(event.detail.path);
					});
				}.bind(this);
			}
			
			if (!this._appRouter) {
				this._appRouter = document.querySelector(this._appRouterSelector);
				if (!this._appRouter)
					return;
				this._appRouter.addEventListener('state-change', this._eventHandler);
				this._appRouter.init();
			}
		},
		
		/**
		 * Navigates to the specified path.
		 *
		 * @param path The path.
		 */
		go: function (path) {
			if (this._appRouter)
				this._appRouter.go(path);
		}
		
	};
	
	var app = document.querySelector('#app');
	
	app.addEventListener('template-bound', function () {
		app.appRouterAdapter = AppRouterAdapter;
	});
	
})();
