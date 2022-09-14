window.addEventListener('message', function (e) {
    if (!event.origin.startsWith("https://accounts.nintendo.com")) {  //送信元のドメインが明確な場合は、チェックすることが強く推奨されています
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
});

function session_token(session_token_code, session_token_code_verifier) {
    xhr = new XMLHttpRequest();
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var answer = document.getElementById('answer');
                answer.value = xhr.responseText;
            }
        }
    };
    xhr.open('POST', 'https://accounts.nintendo.com/connect/1.0.0/api/session_token', false);
    xhr.setRequestHeader('User-Agent', 'OnlineLounge/2.0.0 NASDKAPI iOS');
    var request = "client_id=71b963c1b7b6d119&session_token_code=" + session_token_code + "&session_token_code_verifier=" + session_token_code_verifier;
    xhr.send(request);
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            alert(xhr.responseText);
        }
    }
}
