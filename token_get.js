window.addEventListener('message', function (e) {
    if (!event.origin.startsWith("https://accounts.nintendo.com")) {
        alert('OUT');
        return;
    }
    alert(e.data);
    const params = {};
    e.data.split('#')[1]
        .split('&')
        .forEach(str => {
            const splitStr = str.split('=');
            params[splitStr[0]] = splitStr[1];
        });
    alert(params.session_token_code);
    alert(window.codeVerifier);
    session_token(params.session_token_code, window.codeVerifier);
});

function session_token(session_token_code, session_token_code_verifier) {
    const form = $('<form style="display: none" action="https://accounts.nintendo.com/connect/1.0.0/api/session_token" method="post" target="session_token_response"></form>');
    form.append(`<input name="client_id" value="71b963c1b7b6d119"></input>`);
    form.append(`<input name="session_token_code" value="${session_token_code}"></input>`);
    form.append(`<input name="session_token_code_verifier" value="${session_token_code_verifier}"></input>`);
    const button = $('<input type="submit"></input>');
    form.append(button);
    button.click();
    /*
    fetch('https://accounts.nintendo.com/connect/1.0.0/api/session_token', {
        method: "POST",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "client_id=71b963c1b7b6d119&session_token_code=" + session_token_code + "&session_token_code_verifier=" + session_token_code_verifier
    }).then(res => res.json()).then(console.log).catch(console.error);
    */
}
