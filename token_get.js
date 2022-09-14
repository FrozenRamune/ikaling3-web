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
