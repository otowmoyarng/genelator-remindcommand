// remindコマンド
const RemindCommand = '/remind';

const isShowDateTimeArrays = [
    'tomorrow',
    'everyday',
    'every weekday',
    'every week',
    'every month',
    'date-custom',
    'time-custom',
    'dateTime-custom'
];

const isEnableTimeArrays = [
    'tomorrow',
    'everyday',
    'every weekday',
    'time-custom'
];

const weekdayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

// Vue.js
var app = new Vue({
    el: '#app',
    data: {
        sendTarget1: 'default',
        sendTarget2: '',
        messege: '',
        dateTime1: 'default',
        dateTime2: '',
        dateTime_year: 2021,
        dateTime_month: 1,
        dateTime_day: 1,
        dateTime_week: 'default',
        dateTime_hour: 1,
        dateTime_minute: 1,
        command: RemindCommand
    },
    computed: {
        selectedSendTargetCustom() {
            return this.sendTarget1 != 'custom';
        },
        isShowDateCustom() {
            return isShowDateTimeArrays.includes(this.dateTime1);
        },
        selectedDateCustom() {
            return isEnableTimeArrays.includes(this.dateTime1);
        },
        selectedTimeCustom() {
            return this.dateTime1 == 'date-custom'
        },
        selectedCustom() {
            return this.dateTime1 != 'custom';
        }
    },
    watch: {
        sendTarget1: function () {
            this.createCommand();
        },
        sendTarget2: function () {
            this.createCommand();
        },
        messege: function () {
            this.createCommand();
        },
        dateTime1: function () {
            this.setTodayDateCustom();
            this.createCommand();
        },
        dateTime_year: function () {
            this.createCommand();
        },
        dateTime_month: function () {
            this.createCommand();
        },
        dateTime_day: function () {
            this.createCommand();
        },
        dateTime_hour: function () {
            this.createCommand();
        },
        dateTime_minute: function () {
            this.createCommand();
        },
        dateTime2: function () {
            this.createCommand();
        }
    },
    methods: {
        createCommand: function () {

            this.command = RemindCommand;
            let bindArray = new Array();
            bindIndex = 0;

            // 通知対象を取得する関数
            const getTarget = function (sendTarget1, sendTarget2) {

                console.debug("sendTarget1:" + sendTarget1);
                console.debug("sendTarget2:" + sendTarget2);

                if (sendTarget1 == 'default') {
                    return null;
                }

                let target = '';
                // 自分に
                if (sendTarget1 != 'me') {
                    target += '@';
                }
                // 指定する
                if (sendTarget1 == 'custom') {
                    target += sendTarget2;
                } else {
                    target += sendTarget1;
                }
                return target;
            };

            // 通知対象を取得する
            var item = getTarget(this.sendTarget1, this.sendTarget2);
            if (item != null) {
                bindArray[bindIndex] = item;
                bindIndex++;
            }

            // メッセージを取得する関数
            const getMessage = function (messege) {

                console.debug("messege:" + messege);

                if (messege == '') {
                    return null;
                } else {
                    return '"' + messege + '"';
                }
            }
            // メッセージを取得する
            item = getMessage(this.messege);
            if (item != null) {
                bindArray[bindIndex] = item;
                bindIndex++;
            }

            // 通知日時を取得する関数
            const getCustomDateTime = function (dateTime1,
                dateTime2,
                dateTime_year,
                dateTime_month,
                dateTime_day,
                dateTime_week,
                dateTime_hour,
                dateTime_minute) {

                console.debug("dateTime1:" + dateTime1);
                console.debug("dateTime2:" + dateTime2);
                console.debug("dateTime_year:" + dateTime_year);
                console.debug("dateTime_month:" + dateTime_month);
                console.debug("dateTime_day:" + dateTime_day);
                console.debug("dateTime_hour:" + dateTime_hour);
                console.debug("dateTime_minute:" + dateTime_minute);

                let date = new Date();
                let result = "at ";

                if (!isEnableTimeArrays.includes(dateTime1)) {
                    date.setFullYear(dateTime_year);
                    date.setMonth((dateTime_month - 1));
                    date.setDate(dateTime_day);
                }
                if (dateTime1 != 'date-custom') {
                    date.setHours(dateTime_hour);
                    date.setMinutes(dateTime_minute);
                }
                date.setSeconds(0);

                if (dateTime1 == 'date-custom') {
                    result += date.toLocaleDateString();
                } else if (isEnableTimeArrays.includes(dateTime1)) {
                    result += date.toLocaleTimeString();
                    if (dateTime1 != 'time-custom') {
                        result += " " + dateTime1;
                    }
                } else {
                    result += date.toLocaleString()
                }
                return result;
            }

            if (this.dateTime1 === 'custom') {
                item = this.dateTime2;
            } else if (isShowDateTimeArrays.includes(this.dateTime1)) {
                item = getCustomDateTime(this.dateTime1,
                    this.dateTime2,
                    this.dateTime_year,
                    this.dateTime_month,
                    this.dateTime_day,
                    this.dateTime_week,
                    this.dateTime_hour,
                    this.dateTime_minute);
            } else {
                item = this.dateTime1;
            }

            if (item != null) {
                console.debug("dateTime:" + item);
                bindArray[bindIndex] = item;
                bindIndex++;
            }

            for (i = 0; i < bindIndex; i++) {
                console.debug(bindArray[i]);
                this.command += ' ' + bindArray[i];
            }
        }, copyToClipboard: function () {

            // コピー対象をJavaScript上で変数として定義する
            var copyTarget = document.getElementById("command");

            // コピー対象のテキストを選択する
            copyTarget.select();

            // 選択しているテキストをクリップボードにコピーする
            document.execCommand("Copy");

            console.debug(copyTarget.value);
        }, setTodayDateCustom: function () {
            if (this.dateTime1 === 'date-custom' || this.dateTime1 == 'dateTime-custom') {
                let today = new Date();
                this.dateTime_year = today.getFullYear();
                this.dateTime_month = today.getMonth() + 1;
                this.dateTime_day = today.getDate();
                this.dateTime_week = weekdayNames[today.getDay()];
            }
            if (isEnableTimeArrays.includes(this.dateTime1)) {
                if (this.dateTime1 == 'time-custom') {
                    let today = new Date();
                    this.dateTime_hour = today.getHours();
                    this.dateTime_minute = today.getMinutes();
                } else {
                    this.dateTime_hour = 9;
                    this.dateTime_minute = 0;
                }
            }
        }
    }
});

// const weekday = document.getElementById('dateTime_week');
// if (weekday) {
//     weekday.selectedIndex = 0;
// }