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
    'every week',
    'every month',
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
        selectedDayCustom() {
            return ['tomorrow','everyday','every weekday','every week','time-custom'].includes(this.dateTime1);
        },
        selectedTimeCustom() {
            return this.dateTime1 == 'date-custom'
        },
        selectedEveryWeek() {
            return this.dateTime1 != 'every week'
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
            this.setWeekDay();
            this.createCommand();
        },
        dateTime_year: function () {
            this.setWeekDay();
            this.createCommand();
        },
        dateTime_month: function () {
            this.setWeekDay();
            this.createCommand();
        },
        dateTime_day: function () {
            this.setWeekDay();
            this.createCommand();
        },
        dateTime_week: function () {
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
                console.debug("dateTime_week:" + dateTime_week);
                console.debug("dateTime_hour:" + dateTime_hour);
                console.debug("dateTime_minute:" + dateTime_minute);

                let date = new Date();
                let result = "at ";

                // 日付を指定する or 日時を指定する
                if (!isEnableTimeArrays.includes(dateTime1)) {
                    date.setFullYear(dateTime_year);
                    date.setMonth((dateTime_month - 1));
                    date.setDate(dateTime_day);
                }

                // 日付を指定する以外
                if (dateTime1 != 'date-custom') {
                    date.setHours(dateTime_hour);
                    date.setMinutes(dateTime_minute);
                }
                date.setSeconds(0);

                // 日付を指定する
                if (dateTime1 == 'date-custom') {
                    result += date.toLocaleDateString();
                // 日時を指定する
                } else if (dateTime1 == 'dateTime-custom') {
                    result += date.toLocaleString()
                } else {
                    result += date.toLocaleTimeString();

                    // 毎週
                    if (dateTime1 == 'every week') {
                        result += " on every " + dateTime_week;
                    // 毎月
                    } else if (dateTime1 == 'every month') {
                        result += " on the " + dateTime_day;
                        
                        switch (dateTime_day) {
                            case '1':
                                result += "st";
                                break;
                            case '2':
                                result += "nd";
                                break;
                            case '3':
                                result += "rd";
                                break;
                            default:
                                result += "th";
                                break;
                        }
                        result += " of " + dateTime1;

                    // 明日･毎日･平日
                    } else if (dateTime1 != 'time-custom') {
                        result += " " + dateTime1;
                    }
                }
                return result;
            }

            switch (this.dateTime1) {
                // すぐ
                case 'now':
                    item = this.dateTime1;
                    break;
                // その他
                case 'custom':
                    item = this.dateTime2;
                    break;
                default:
                    item = getCustomDateTime(
                                this.dateTime1,
                                this.dateTime2,
                                this.dateTime_year,
                                this.dateTime_month,
                                this.dateTime_day,
                                this.dateTime_week,
                                this.dateTime_hour,
                                this.dateTime_minute);
                    break;
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
        }, setWeekDay: function () {
            let weekdayValue = '';
            if (this.dateTime1 === 'default') {
                weekdayValue = 'default';
            } else {
                let date = new Date();
                date.setFullYear(this.dateTime_year);
                date.setMonth((this.dateTime_month - 1));
                date.setDate(this.dateTime_day);
                weekdayValue = weekdayNames[date.getDay()];
            }
            this.dateTime_week = weekdayValue;
        }
    }
});
