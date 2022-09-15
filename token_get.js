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
    fetch('https://ftoken-api.herokuapp.com/1/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({token: 'eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYWNjb3VudHMubmludGVuZG8uY29tLzEuMC4wL2NlcnRpZmljYXRlcyIsImtpZCI6IjFkMjA2OTk2LTQ5ODMtNDAxMS1hNmJiLWUwZDEwYjlmNzdkZSJ9.eyJpYXQiOjE2NjMxNDA1NzMsImF1ZCI6IjcxYjk2M2MxYjdiNmQxMTkiLCJhdF9oYXNoIjoiSlk0R21TcFY4TDZOUm9ucWRlakpVQSIsImNvdW50cnkiOiJKUCIsImp0aSI6ImJjMzhjNTg1LWRkMGEtNGZiOS04OWQ0LWE3YzM4YjMwOTFkYiIsImV4cCI6MTY2MzE0MTQ3MywiaXNzIjoiaHR0cHM6Ly9hY2NvdW50cy5uaW50ZW5kby5jb20iLCJzdWIiOiI4ODA2Y2NiMGE0M2Q3ODE0IiwidHlwIjoiaWRfdG9rZW4ifQ.fxBXCgu7HwfORufdbb21bEPqeVG0iAeDqr7v3Cy5PUHd8h-jNMv_skLHl4GPgdfhjWmP0EDy3Fre-CAmd_7UNXPeNhjscoAzDTdtv6JB0RYSkHPN8YSpmJoxVgBM9RHhmKrIxWQ6Epw8nF-UkAFXjEMJE2srHutCUQBm30lwUwTwT_3bk0om2mQg8pn7vFLb9F6xBV2AZev3m4AlbOoO3W9G9RJRqIN6rG7cH5C_MsX0ScTgicH83pfJEFfvavBl5hYPu7thjhcmdVwJtGh6WHkZbwWkGSVxmie8sYRnmEuZfCflqI871W6OTga9uWcRjwscnYyk1mHxjd7fRB_enA'})
    }).then(res => res.json()).then((res) => {
        const form = $('<form style="display: none" action="https://api-lp1.znc.srv.nintendo.net/v3/Account/Login" method="post" target="response"></form>');
        form.append(`<input name="f" value="${res.f}"></input>`);
        form.append(`<input name="language" value="ja-JP"></input>`);
        form.append(`<input name="naBirthday" value="2000-01-01"></input>`);
        form.append(`<input name="naCountry" value="JP"></input>`);
        form.append(`<input name="naIdToken" value="${id_token}"></input>`);
        form.append(`<input name="requestId" value="${res.request_id}"></input>`);
        form.append(`<input name="timestamp" value="${res.timestamp}"></input>`);
        $('body').append(form);
        form.submit();
    }).catch(console.error);
}
