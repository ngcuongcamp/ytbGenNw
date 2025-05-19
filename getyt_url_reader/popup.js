chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0];
    if (currentTab?.url) {
        document.getElementById("urlField").value = currentTab.url;
        // Trích xuất videoID từ URL
        const videoID = currentTab.url.split("/").pop();
        // Gửi message đến background.js
        chrome.runtime.sendMessage({ action: "openLocalhost", videoId: videoID });
    }
});