window.addEventListener('message', function (e) {
    if (!event.origin.startsWith("https://accounts.nintendo.com")) {  //送信元のドメインが明確な場合は、チェックすることが強く推奨されています
        alert('OUT');
        return;
    }
    alert(e.data);
});
