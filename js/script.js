var app = new Vue({
    el: '#app',
    data: {
        panelShown: false,
        timer: null,
        candidates: AppData.candidates,
        actions: AppData.actions,
        candidate: 0,
        action: AppData.actions.default,
        secondsLeft: 0,
        paused: false
    },
    mounted: function() {
        this.reset();
    },
    methods: {
        start: function() {
            if (this.timer == null) {
                this.reset();
                this.timer = setInterval(this.countdown.bind(this), 1000);
                this.panelShown = false;
            }
        },
        stop: function() {
            if (this.timer != null) {
                clearInterval(this.timer);
                this.timer = null;
            }
        },
        pause: function() {
            this.paused = !this.paused;
        },
        reset: function() {
            this.stop();
            this.secondsLeft = AppData.actions[this.action].duration;
        },
        countdown: function() {
            if (!this.paused) {
                var secs = --this.secondsLeft;
                if (this.secondsLeft <= 0) {
                    document.getElementById('timeout-sound').play();
                    this.stop();
                }
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
