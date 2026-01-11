// Sayfa Yüklendiğinde
document.addEventListener('DOMContentLoaded', function() {
    console.log('Android Simülatörü Yüklendi');
    
    // Session kontrolü - daha önce kilit açıldı mı?
    const isUnlocked = sessionStorage.getItem('unlocked') === 'true';
    
    if (isUnlocked) {
        showHomeScreen();
    } else {
        showLockScreen();
    }
    
    // Tema kontrolü
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Saati güncelle
    updateTime();
    setInterval(updateTime, 60000);
    
    // Kilit ekranı kaydırma
    initSwipe();
});

// Saati Güncelle
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('tr-TR', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
    });
    
    const dateString = now.toLocaleDateString('tr-TR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    });
    
    // Tüm saatleri güncelle
    document.querySelectorAll('.lock-time, .status-left').forEach(el => {
        el.textContent = timeString;
    });
    
    // Tarihi güncelle
    const dateEl = document.querySelector('.lock-date');
    if (dateEl) {
        dateEl.textContent = dateString;
    }
}

// Kilit Ekranı Kaydırma
function initSwipe() {
    const lockScreen = document.getElementById('lockScreen');
    let startY = 0;
    let currentY = 0;
    let isSwiping = false;
    
    lockScreen.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
        isSwiping = true;
        lockScreen.style.transition = 'none';
    });
    
    lockScreen.addEventListener('touchmove', function(e) {
        if (!isSwiping) return;
        
        currentY = e.touches[0].clientY;
        const diff = startY - currentY;
        
        if (diff > 0) { // Yukarı kaydırma
            const translateY = Math.min(diff, 100);
            lockScreen.style.transform = `translateY(-${translateY}px)`;
            
            // Opacity efekti
            lockScreen.style.opacity = 1 - (translateY / 200);
        }
    });
    
    lockScreen.addEventListener('touchend', function() {
        if (!isSwiping) return;
        isSwiping = false;
        
        const diff = startY - currentY;
        
        if (diff > 50) { // Kaydırma tamamlandı
            unlockPhone();
        } else { // Yeterli değil, geri dön
            lockScreen.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            lockScreen.style.transform = 'translateY(0)';
            lockScreen.style.opacity = '1';
        }
    });
    
    // Fare desteği
    lockScreen.addEventListener('mousedown', function(e) {
        startY = e.clientY;
        isSwiping = true;
        lockScreen.style.transition = 'none';
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isSwiping) return;
        
        currentY = e.clientY;
        const diff = startY - currentY;
        
        if (diff > 0) {
            const translateY = Math.min(diff, 100);
            lockScreen.style.transform = `translateY(-${translateY}px)`;
            lockScreen.style.opacity = 1 - (translateY / 200);
        }
    });
    
    document.addEventListener('mouseup', function() {
        if (!isSwiping) return;
        isSwiping = false;
        
        const diff = startY - currentY;
        
        if (diff > 50) {
            unlockPhone();
        } else {
            lockScreen.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            lockScreen.style.transform = 'translateY(0)';
            lockScreen.style.opacity = '1';
        }
    });
}

// Kilidi Aç
function unlockPhone() {
    const lockScreen = document.getElementById('lockScreen');
    const homeScreen = document.getElementById('homeScreen');
    
    lockScreen.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease';
    lockScreen.style.transform = 'translateY(-100%)';
    lockScreen.style.opacity = '0';
    
    setTimeout(() => {
        lockScreen.classList.remove('active');
        homeScreen.classList.add('active');
        
        // Session'a kaydet
        sessionStorage.setItem('unlocked', 'true');
    }, 300);
}

// Ekranı Kilitle
function lockScreen() {
    const lockScreen = document.getElementById('lockScreen');
    const homeScreen = document.getElementById('homeScreen');
    
    // Tüm açık uygulamaları kapat
    document.querySelectorAll('.app-window').forEach(app => {
        app.classList.remove('active');
    });
    
    homeScreen.classList.remove('active');
    lockScreen.classList.add('active');
    
    lockScreen.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease';
    lockScreen.style.transform = 'translateY(0)';
    lockScreen.style.opacity = '1';
    
    // Session'dan sil
    sessionStorage.removeItem('unlocked');
}

// Ana Ekranı Göster
function showHomeScreen() {
    const lockScreen = document.getElementById('lockScreen');
    const homeScreen = document.getElementById('homeScreen');
    
    lockScreen.classList.remove('active');
    homeScreen.classList.add('active');
}

// Kilit Ekranını Göster
function showLockScreen() {
    const lockScreen = document.getElementById('lockScreen');
    const homeScreen = document.getElementById('homeScreen');
    
    lockScreen.classList.add('active');
    homeScreen.classList.remove('active');
}

// Uygulama Aç
function openApp(appName) {
    const appContent = document.getElementById('appContent');
    const appTitle = document.getElementById('appTitle');
    const appContentBody = document.getElementById('appContentBody');
    
    appTitle.textContent = appName;
    
    // Uygulama içeriğini oluştur
    let content = '';
    switch(appName) {
        case 'Settings':
            openSettings();
            return;
        case 'Shopping':
            content = '<div class="app-page"><h4>Shopping App</h4><p>Alışveriş uygulaması yükleniyor...</p></div>';
            break;
        case 'Games':
            content = '<div class="app-page"><h4>Games</h4><p>Oyunlar yükleniyor...</p></div>';
            break;
        case 'Social':
            content = '<div class="app-page"><h4>Social Media</h4><p>Sosyal medya uygulamaları</p></div>';
            break;
        case 'Play Store':
            content = '<div class="app-page"><h4>Google Play Store</h4><p>Uygulama mağazası</p></div>';
            break;
        case 'Weather':
            content = '<div class="app-page"><h4>Hava Durumu</h4><p>İstanbul: 18°C, Güneşli</p></div>';
            break;
        case 'Chrome':
            content = '<div class="app-page"><h4>Chrome</h4><p>Tarayıcı açılıyor...</p></div>';
            break;
        case 'Fazilet':
            content = '<div class="app-page"><h4>Fazilet</h4><p>Kitap uygulaması</p></div>';
            break;
        case 'Duolingo':
            content = '<div class="app-page"><h4>Duolingo</h4><p>Dil öğrenme uygulaması</p></div>';
            break;
        case 'Gmail':
            content = '<div class="app-page"><h4>Gmail</h4><p>E-postalar yükleniyor...</p></div>';
            break;
        case 'Camera':
            content = '<div class="app-page"><h4>Camera</h4><div class="camera-view"><div class="viewfinder"></div></div></div>';
            break;
        default:
            content = `<div class="app-page"><h4>${appName}</h4><p>Uygulama içeriği</p></div>`;
    }
    
    appContentBody.innerHTML = content;
    appContent.classList.add('active');
}

// Klasör Aç
function openFolder(folderName) {
    if (folderName === 'Settings') {
        openSettings();
    }
}

// Ayarları Aç
function openSettings() {
    document.getElementById('settingsApp').classList.add('active');
}

// Google Arama Aç
function openSearch() {
    document.getElementById('googleSearch').classList.add('active');
    document.getElementById('searchInput').focus();
}

// Google Ana Sayfası
function openGoogle() {
    const appContent = document.getElementById('appContent');
    const appTitle = document.getElementById('appTitle');
    const appContentBody = document.getElementById('appContentBody');
    
    appTitle.textContent = 'Google';
    appContentBody.innerHTML = `
        <div class="google-home">
            <div class="google-logo">
                <span style="color:#4285f4">G</span>
                <span style="color:#ea4335">o</span>
                <span style="color:#fbbc05">o</span>
                <span style="color:#4285f4">g</span>
                <span style="color:#34a853">l</span>
                <span style="color:#ea4335">e</span>
            </div>
            <div class="google-search-box">
                <input type="text" placeholder="Google'da ara veya URL yaz">
                <button><i class="fas fa-search"></i></button>
