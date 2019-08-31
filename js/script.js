var app = new Vue({
    el: '#app',
    data: {
        panelShown: false,
        timer: null,
        candidates: AppData.candidates,
        actions: AppData.actions,
        candidate: 0,
        action: AppData.actions.default,
        secondsLeft: 0
    },
    mounted: function() {
        this.reset();
    },
    methods: {
        start: function() {
            if (this.timer == null) {
                this.reset();
                this.timer = setInterval(this.countdown.bind(this), 1000);
            }
        },
        stop: function() {
            if (this.timer != null) {
                clearInterval(this.timer);
                this.timer = null;
            }
        },
        reset: function() {
            this.stop();
            this.secondsLeft = AppData.actions[this.action].duration;
        },
        countdown: function() {
            if (this.secondsLeft > 0) {
                this.secondsLeft--;
            } else {
                this.stop();
            }
        }
    },
    computed: {
        timerStr: function() {
            var date = new Date(0, 0, 0, 0, 0, this.secondsLeft);
            var hours = date.getHours().toString().padStart(2, '0');
            var minutes = date.getMinutes().toString().padStart(2, '0');
            var seconds = date.getSeconds().toString().padStart(2, '0');

            return hours + ':' + minutes + ':' + seconds;
        }
    },
    watch: {
        action: function() {
            this.reset();
        },
        candidate: function() {
            this.reset();
        }
    }
});