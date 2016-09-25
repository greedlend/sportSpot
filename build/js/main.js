var Vue = require('vue'),
    app = require('./app.vue');


window.addEventListener('load', function() {
    new Vue({
        el: '#app',
        components: {
            app: app
        }
    })
})
