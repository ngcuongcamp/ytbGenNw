(() => {
    const currentUrl = window.location.href;

    const infoDiv = document.createElement('div');
    infoDiv.style.position = 'fixed';
    infoDiv.style.top = '10px';
    infoDiv.style.right = '10px';
    infoDiv.style.padding = '6px 10px';
    infoDiv.style.backgroundColor = 'rgba(0,0,0,0.7)';
    infoDiv.style.color = 'white';
    infoDiv.style.fontSize = '12px';
    infoDiv.style.zIndex = 9999;
    infoDiv.style.borderRadius = '4px';
    infoDiv.style.fontFamily = 'Arial, sans-serif';
    infoDiv.style.display = 'flex';
    infoDiv.style.alignItems = 'center';
    infoDiv.style.gap = '8px';

    const urlSpan = document.createElement('span');
    urlSpan.textContent = currentUrl;

    const copyBtn = document.createElement('button');
    copyBtn.textContent = '📋';
    copyBtn.title = 'Sao chép URL';
    copyBtn.style.cursor = 'pointer';
    copyBtn.style.border = 'none';
    copyBtn.style.background = 'transparent';
    copyBtn.style.color = 'white';
    copyBtn.style.fontSize = '14px';

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(currentUrl)
            .then(() => {
                copyBtn.textContent = '✅';

                let videoID = currentUrl.split("/").pop();
                // Gửi message đến background.js thay vì dùng window.open
                chrome.runtime.sendMessage({
                    action: 'openLocalhost',
                    videoId: videoID
                });

                setTimeout(() => {
                    copyBtn.textContent = '📋';
                }, 1000);
            })
            .catch((err) => {
                alert('❌ Không thể sao chép URL!');
                console.log(err);
            });
    });

    infoDiv.appendChild(urlSpan);
    infoDiv.appendChild(copyBtn);
    document.body.appendChild(infoDiv);
})();