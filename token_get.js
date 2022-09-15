window.addEventListener('message', function (e) {
    if (!event.origin.startsWith("https://accounts.nintendo.com"))
        return;
    $('#login_button').prop("disabled", true);
    $('#login_button').text("ログイン済み");
    if(e.data.head == "session_token_code") {
        const params = {};
        e.data.body.split('#')[1]
            .split('&')
            .forEach(str => {
                const splitStr = str.split('=');
                params[splitStr[0]] = splitStr[1];
            });
        session_token(params.session_token_code, window.codeVerifier);
    } else if(e.data.head == "session_token") {
        id_token(e.data.body);
    } else if(e.data.head == "id_token") {
        splatoon_token(e.data.body);
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

function splatoon_token(id_token) {
    fetch('https://ftoken-api.herokuapp.com/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({token: id_token})
    }).then(res => res.json()).then((res) => {
        $('#open_button').prop("disabled", false);
        $('#open_button').text("起動");
        $('#open_button').on('click', () => {
            window.open('https://api.lp1.av5ja.srv.nintendo.net/?lang=jp&token='+res)
        });
    }).catch(console.error);
}
