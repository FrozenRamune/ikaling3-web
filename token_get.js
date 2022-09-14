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
    const body = new FormData();
    body.append('client_id', '71b963c1b7b6d119');
    body.append('session_token_code', session_token_code);
    body.append('session_token_code_verifier', session_token_code_verifier);
    fetch('https://accounts.nintendo.com/connect/1.0.0/api/session_token', {
        mode: 'no-cors',
        method: "POST",
        body: body
    }).then(res => res.json()).then(console.log).catch(console.error);
}
