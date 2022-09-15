window.addEventListener('message', function (e) {
    if (!event.origin.startsWith("https://accounts.nintendo.com")) {
        alert('OUT');
        return;
    }
    alert(e.data);
    if(e.data.head == "session_token_code") {
        const params = {};
        e.data.body.split('#')[1]
            .split('&')
            .forEach(str => {
                const splitStr = str.split('=');
                params[splitStr[0]] = splitStr[1];
            });
        alert(params.session_token_code);
        alert(window.codeVerifier);
        session_token(params.session_token_code, window.codeVerifier);
    } else if(e.data.head == "session_token") {
        alert(e.data.body);
        id_token(e.data.body);
    } else if(e.data.head == "id_token") {
        alert(e.data.body);
        splanet2statink(e.data.body);
    }
});

function session_token(session_token_code, session_token_code_verifier) {
    const form = $('<form style="display: none" action="https://accounts.nintendo.com/connect/1.0.0/api/session_token" method="post" target="response"></form>');
    form.append(`<input name="client_id" value="71b963c1b7b6d119"></input>`);
    form.append(`<input name="session_token_code" value="${session_token_code}"></input>`);
    form.append(`<input name="session_token_code_verifier" value="${session_token_code_verifier}"></input>`);
    $('body').append(form);
    form.submit();
}

function id_token(session_token) {
    const form = $('<form style="display: none" action="https://accounts.nintendo.com/connect/1.0.0/api/token" method="post" target="response"></form>');
    form.append(`<input name="client_id" value="71b963c1b7b6d119"></input>`);
    form.append(`<input name="session_token" value="${session_token}"></input>`);
    form.append(`<input name="grant_type" value="urn:ietf:params:oauth:grant-type:jwt-bearer-session-token"></input>`);
    $('body').append(form);
    form.submit();
}

function splanet2statink(id_token) {
    fetch('https://elifessler.com/s2s/api/gen2', {
        method: 'POST',
        headers: {
            'User-Agent': 'ikaling3-web/1.0',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: {
            naIdToken: id_token,
            timestamp: Date.now()
        }
    }).then(res => res.json()).then(console.log).catch(console.error);/*
    const form = $('<form style="display: none" action="https://api-lp1.znc.srv.nintendo.net/v3/Account/Login" method="post" target="response"></form>');
    form.append(`<input name="language" value="ja-JP"></input>`);
    form.append(`<input name="naBirthday" value="2000-01-01"></input>`);
    form.append(`<input name="naCountry" value="JP"></input>`);
    form.append(`<input name="naIdToken" value="${id_token}"></input>`);
    form.append(`<input name="requestId" value="96a80e43-cc15-4724-9196-31708bc56d1d"></input>`);
    form.append(`<input name="timestamp" value="${Date.now()}"></input>`);
    $('body').append(form);
    form.submit();*/
}

function splatoon_token(id_token) {
    fetch('https://api.imink.app/f', {
        method: 'POST',
        headers: {
            'User-Agent': 'ikaling3-web/1.0'
        },
        body: {
            token: id_token,
            hash_method: 1
        }
    }).then(res => res.json()).then(console.log).catch(console.error);/*
    const form = $('<form style="display: none" action="https://api-lp1.znc.srv.nintendo.net/v3/Account/Login" method="post" target="response"></form>');
    form.append(`<input name="language" value="ja-JP"></input>`);
    form.append(`<input name="naBirthday" value="2000-01-01"></input>`);
    form.append(`<input name="naCountry" value="JP"></input>`);
    form.append(`<input name="naIdToken" value="${id_token}"></input>`);
    form.append(`<input name="requestId" value="96a80e43-cc15-4724-9196-31708bc56d1d"></input>`);
    form.append(`<input name="timestamp" value="${Date.now()}"></input>`);
    $('body').append(form);
    form.submit();*/
}
