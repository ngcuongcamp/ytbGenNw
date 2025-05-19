chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'openLocalhost') {
        const targetUrlPrefix = 'http://localhost:8000/';

        // Tìm tab localhost đang mở
        chrome.tabs.query({}, (tabs) => {
            const tabsToClose = tabs.filter(tab => tab.url && tab.url.startsWith(targetUrlPrefix));
            const tabIdsToClose = tabsToClose.map(tab => tab.id);
            console.log('Tabs to close:', tabIdsToClose);

            if (tabIdsToClose.length === 0) {
                // Nếu không có tab localhost nào, mở tab mới
                openNewLocalhostTab(request.videoId);
                return;
            }

            // Đóng từng tab và xử lý lỗi
            let closedCount = 0;
            tabIdsToClose.forEach(id => {
                chrome.tabs.remove(id, () => {
                    // Kiểm tra lỗi
                    if (chrome.runtime.lastError) {
                        console.warn(`Error closing tab ${id}:`, chrome.runtime.lastError.message);
                    }
                    closedCount++;
                    // Nếu đã xử lý tất cả tab (dù thành công hay thất bại)
                    if (closedCount === tabIdsToClose.length) {
                        openNewLocalhostTab(request.videoId);
                    }
                });
            });
        });
    }
});

function openNewLocalhostTab(videoId) {
    const newUrl = `http://localhost:8000/?videoId=${videoId}`;
    chrome.tabs.create({ url: newUrl }, (tab) => {
        console.log('Opened new tab:', newUrl);
    });
}