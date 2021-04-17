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
        command: REMINDCOMMAND
    },
    computed: {
        selected_sendtarget_custom() {
            return this.sendtarget1 != 'custom';
        },
        selected_datetime_custom() {
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
            const getDateTime = function(datetime1, datetime2) {

                // FIXME
                // console.log("datetime1:" + datetime1);
                // console.log("datetime2:" + datetime2);

                // 日時指定の場合
                if (datetime1 === 'custom') {
                    return datetime2;
                // 日時指定以外の場合
                } else {
                    return datetime1;
                }
            }
            // 通知日時を取得する
            item = getDateTime(this.datetime1, this.datetime2);
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
        }
    }
});