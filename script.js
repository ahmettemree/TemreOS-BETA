document.querySelectorAll('.app-icon').forEach(icon => {
    icon.addEventListener('click', () => {
        // Tıklama efekti
        icon.style.transform = "scale(0.9)";
        
        setTimeout(() => {
            icon.style.transform = "scale(1)";
            // Uygulama ismini al ve kullanıcıya göster
            const appName = icon.innerText.replace(/[^\w\sğüşıöçĞÜŞİÖÇ]/g, '').trim();
            console.log(appName + " başlatılıyor...");
            alert(appName + " Realme UI üzerinde açılıyor!");
        }, 150);
    });
});

// Durum çubuğu saatini güncelleme (Gerçek zamanlı)
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    
    const statusBar = document.querySelector('.status-bar');
    if (statusBar) {
        statusBar.innerHTML = `<span>${timeString}</span> <span>🔋 100%</span>`;
    }
}

setInterval(updateClock, 1000);
updateClock();
