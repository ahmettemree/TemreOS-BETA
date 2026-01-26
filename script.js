// ===== TEMREOS V.04 - EMERGENCY FIX =====
console.log("🚀 EMERGENCY FIX Aktif!");

// Tüm ekranları gizle
function hideAllScreens() {
    document.querySelectorAll('.boot-screen, .lock-screen, .home-screen, .app-window').forEach(screen => {
        screen.style.display = 'none';
    });
}

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', function() {
    console.log("📱 Acil başlatma...");
    
    // 1. Önce tüm ekranları temizle
    hideAllScreens();
    
    // 2. Boot1'i göster (1 saniye)
    document.getElementById('bootScreen1').style.display = 'flex';
    
    setTimeout(() => {
        // Boot1'i kapat, Boot2'yi göster (1 saniye)
        document.getElementById('bootScreen1').style.display = 'none';
        document.getElementById('bootScreen2').style.display = 'flex';
        
        setTimeout(() => {
            // Boot2'yi kapat, Lock ekranını göster
            document.getElementById('bootScreen2').style.display = 'none';
            document.getElementById('lockScreen').style.display = 'flex';
            
            // Saati güncelle
            updateTime();
            setInterval(updateTime, 60000);
            
            console.log("✅ Kilit ekranı hazır!");
            showToast("📱 TemreOS V.04 yüklendi!");
        }, 1000);
    }, 1000);
});

// Basit saat güncelleme
function updateTime() {
    const now = new Date();
    const time = now.getHours().toString().padStart(2, '0') + ':' + 
                 now.getMinutes().toString().padStart(2, '0');
    
    document.querySelectorAll('.time, .status-time, .lock-time').forEach(el => {
        if (el) el.textContent = time;
    });
}

// Diğer fonksiyonlar aynı...
// (geri kalan kodu buraya yapıştır)
