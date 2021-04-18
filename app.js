// remindコマンド
const REMINDCOMMAND = '/remind';

// Vue.js
var app = new Vue({
    el : '#app',
    data : {
        sendtarget1: 'default',
        sendtarget2: '',
        messege: '',
        datetime1: 'default',
        datetime2: '',
        datetime_year: 2021,
        datetime_month: 1,
        datetime_day: 1,
        datetime_hour: 1,
        datetime_minute: 1,
        command: REMINDCOMMAND
    },
    computed: {
        selected_sendtarget_custom() {
            return this.sendtarget1 != 'custom';
        },
        is_show_date_custom() {
            return this.datetime1 == 'date-custom' || 
                    this.datetime1 == 'time-custom'||
                    this.datetime1 == 'datetime-custom';
        },
        selected_date_custom() {
            return this.datetime1 == 'time-custom'
        },
        selected_time_custom() {
            return this.datetime1 == 'date-custom'
        },
        selected_custom() {
            return this.datetime1 != 'custom';
        }
    },
    watch: {
        sendtarget1: function() {
            this.createCommand();
        },
        sendtarget2: function() {
            this.createCommand();
        },
        messege: function() {
            this.createCommand();
        },
        datetime1: function() {
            this.set_today_datecustom();
            this.createCommand();
        },
        datetime_year: function() {
            this.createCommand();
        },
        datetime_month: function() {
            this.createCommand();
        },
        datetime_day: function() {
            this.createCommand();
        },
        datetime_hour: function() {
            this.createCommand();
        },
        datetime_minute: function() {
            this.createCommand();
        },
        datetime2: function() {
            this.createCommand();
        }
    },
    methods: {
        createCommand: function() {

            this.command = REMINDCOMMAND;
            let bindarray = new Array();
            bindindex = 0;

            // 通知対象を取得する関数
            const getTarget = function(sendtarget1, sendtarget2) {

                // FIXME
                // console.log("sendtarget1:" + sendtarget1);
                // console.log("sendtarget2:" + sendtarget2);

                if (sendtarget1 == 'default') {
                    return null;
                }

                let target = '';
                // 自分に
                if (sendtarget1 != 'me') {
                    target += '@';
                }
                // 指定する
                if (sendtarget1 == 'custom') {
                    target += sendtarget2;
                } else {
                    target += sendtarget1;
                }
                return target;
            };

            // 通知対象を取得する
            var item = getTarget(this.sendtarget1, this.sendtarget2);
            if (item != null) {
                bindarray[bindindex] = item;
                bindindex++;
            }

            // メッセージを取得する関数
            const getMessage = function(messege) {
                
                // FIXME
                // console.log("messege:" + messege);

                if (messege == '') {
                    return null;
                } else {
                    return '"' + messege + '"';
                }
            }
            // メッセージを取得する
            item = getMessage(this.messege);
            if (item != null) {
                bindarray[bindindex] = item;
                bindindex++;
            }

            // 通知日時を取得する関数
            const getCustomDateTime = function(datetime1,
                                                datetime2,
                                                datetime_year,
                                                datetime_month,
                                                datetime_day,
                                                datetime_hour,
                                                datetime_minute) {

                // FIXME
                /*
                console.log("datetime1:" + datetime1);
                console.log("datetime2:" + datetime2);
                console.log("datetime_year:" + datetime_year);
                console.log("datetime_month:" + datetime_month);
                console.log("datetime_day:" + datetime_day);
                console.log("datetime_hour:" + datetime_hour);
                console.log("datetime_minute:" + datetime_minute);
                */

                let date = new Date();
                let result = "at ";

                if (datetime1 == 'date-custom') {
                    date = new Date(datetime_year, (datetime_month - 1), datetime_day);
                    result += date.toLocaleDateString();
                } else if (datetime1 == 'time-custom') {
                    date = new Date(datetime_hour, datetime_minute);
                    result += date.toLocaleTimeString();
                } else {
                    date = new Date(datetime_year, (datetime_month - 1), datetime_day, datetime_hour, datetime_minute);
                    result += date.toLocaleString()
                }
                return result;
            }

            if (this.datetime1 === 'custom') {
                item = this.datetime2;
            } else if (this.datetime1 == 'date-custom' || this.datetime1 == 'time-custom' || this.datetime1 == 'datetime-custom') {
                item = getCustomDateTime(this.datetime1,
                                        this.datetime2,
                                        this.datetime_year,
                                        this.datetime_month,
                                        this.datetime_day,
                                        this.datetime_hour,
                                        this.datetime_minute);
            } else {
                item = this.datetime1;
            }

            if (item != null) {
                // // FIXME
                // console.log("datetime:" + item);
                bindarray[bindindex] = item;
                bindindex++;
            }

            for (i = 0; i < bindindex; i++) {
                // FIXME
                // console.log(bindarray[i]);
                this.command += ' ' + bindarray[i];
            }
        }, copyToClipboard: function() {
            
            // コピー対象をJavaScript上で変数として定義する
            var copyTarget = document.getElementById("command");

            // コピー対象のテキストを選択する
            copyTarget.select();

            // 選択しているテキストをクリップボードにコピーする
            document.execCommand("Copy");

            // FIXME
            // console.log(copyTarget.value);
        }, set_today_datecustom: function() {
            if (this.datetime1 === 'date-custom' || this.datetime1 == 'datetime-custom') {
                let today = new Date();
                this.datetime_year = today.getFullYear();
                this.datetime_month = today.getMonth()+1;
                this.datetime_day = today.getDate();
            }
        }
    }
});