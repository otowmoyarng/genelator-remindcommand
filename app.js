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
        command: REMINDCOMMAND
    },
    computed: {
        selected_sendtarget_custom() {
            return this.sendtarget1 != 'custom';
        },
        selected_datetime_custom() {
            return this.datetime1 != 'custom';
        },
        selected_date_custom() {
            return this.datetime1 == 'date-custom';
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

            // // 通知日時を取得する関数
            // const getDateTime = function(datetime1, datetime2) {

            //     // FIXME
            //     // console.log("datetime1:" + datetime1);
            //     // console.log("datetime2:" + datetime2);

            //     // 日時指定の場合
            //     if (datetime1 === 'custom') {
            //         return datetime2;
            //     // 日時指定以外の場合
            //     } else {
            //         return datetime1;
            //     }
            // }

            if (this.datetime1 === 'custom') {
                item = this.datetime2;
            } else if (this.datetime1 === 'date-custom') {
                // FIXME
                // console.log("datetime_year:" + this.datetime_year);
                // console.log("datetime_month:" + this.datetime_month);
                // console.log("datetime_day:" + this.datetime_day);
                date = new Date(this.datetime_year, (this.datetime_month - 1), this.datetime_day);
                item = date.toLocaleDateString();
            } else {
                item = this.datetime1;
            }

            // 通知日時を取得する
            // item = getDateTime(this.datetime1, this.datetime2);
            // // FIXME
            // console.log("datetime:" + item);
            if (item != null) {
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
            if (this.datetime1 === 'date-custom') {
                let today = new Date();
                this.datetime_year = today.getFullYear();
                this.datetime_month = today.getMonth()+1;
                this.datetime_day = today.getDate();
            }
        }
    }
});