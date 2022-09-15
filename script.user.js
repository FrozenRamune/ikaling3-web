// ==UserScript==
// @name       ikaling3_web
// @namespace  ikaling3_web
// @version    1.0
// @description  ikaling3 on web
// @match      https://api.lp1.av5ja.srv.nintendo.net/*
// @match      https://accounts.nintendo.com/connect/1.0.0/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// @require https://huttou-tansan.github.io/ikaling3-web/jquery.cookie.js
// ==/UserScript==

if(window.location.href.startsWith('https://accounts.nintendo.com/connect/1.0.0/api/session_token')) {
    $(function() {
        if(window.parent != window) {
            window.parent.postMessage({ head: 'session_token', body: JSON.parse($('pre').text()).session_token}, 'https://huttou-tansan.github.io/ikaling3-web/');
        }
    });
} else if(window.location.href.startsWith('https://accounts.nintendo.com/connect/1.0.0/api/token')) {
    $(function() {
        if(window.parent != window) {
            window.parent.postMessage({ head: 'id_token', body: JSON.parse($('pre').text()).id_token}, 'https://huttou-tansan.github.io/ikaling3-web/');
        }
    });
} else if(window.location.href.startsWith('https://accounts.nintendo.com/connect/1.0.0/authorize')) {
    $(function() {
        if(window.opener) {
            const url = $('#authorize-switch-approval-link').attr('href');
            window.opener.postMessage({ head: 'session_token_code', body: url}, 'https://huttou-tansan.github.io/ikaling3-web/');
            alert('イカリング3をブラウザで使う場合、「この人にする」を選択せずに先ほどのタブに戻ってください。\n（もうこのタブは閉じても大丈夫です）');
        }
    });
} else {
    function getParam(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    if(getParam('token')) {
        $.cookie('_gtoken', getParam('token'), {sameSite: "Strict"});
        window.location = window.location.pathname;
    }
}
