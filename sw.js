// アプリが閉じられていても定期的にバックグラウンドで時間をチェックする
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'check-notice') {
        event.waitUntil(checkAndShowNotification());
    }
});

// プッシュ通知やタイマーのイベントを受け取って画面に表示する
self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : { title: '持ち物チェックの時間です！', body: '今日の持ち物リストを確認しましょう。' };
    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: 'https://cdn-icons-png.flaticon.com/512/3284/3284649.png',
            badge: 'https://cdn-icons-png.flaticon.com/512/3284/3284649.png',
            vibrate: [200, 100, 200]
        })
    );
});

// 通知をクリックしたらアプリを開く設定
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('./index.html')
    );
});