// ===== TEMREOS BETA V.03 - TÜM JAVASCRIPT =====
console.log("🚀 TemreOS Beta V.03 Başlatılıyor...");

// Global değişkenler
let currentApp = null;
let appAnimationEnabled = true;
let fingerprintCooldown = false;

// ===== SAYFA YÜKLENDİĞİNDE =====
document.addEventListener('DOMContentLoaded', function() {
    console.log("📱 TemreOS DOM hazır");
    
    // Boot ekranından sonra kilit ekranını göster
    setTimeout(() => {
        showLockScreen();
        updateTime();
    }, 3500); // Boot süresi + fade
    
    // Saat güncellemesi
    setInterval(updateTime, 60000);
    
    // Tema yükleme
    loadTheme();
    
    // Kaydırma event'leri
    initSwipeGestures();
    
    console.log("✅ TemreOS hazır!");
});

// ===== ZAMAN GÜNCELLEME =====
function updateTime() {
    const now = new Date();
    const time = now.getHours().toString().padStart(2, '0') + ':' + 
                 now.getMinutes().toString().padStart(2, '0');
    
    const date = now.toLocaleDateString('tr-TR', {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
    });
    
    // Tüm zaman elementlerini güncelle
    document.querySelectorAll('.time, .status-time, .lock-time').forEach(el => {
        if (el) el.textContent = time;
    });
    
    document.querySelectorAll('.lock-date').forEach(el => {
        if (el) el.textContent = date;
    });
}

// ===== EKRAN GEÇİŞLERİ =====
function showLockScreen() {
    document.getElementById('bootScreen').style.display = 'none';
    document.getElementById('lockScreen').style.display = 'flex';
    document.getElementById('homeScreen').style.display = 'none';
    document.getElementById('appWindow').style.display = 'none';
}

function unlockPhone() {
    console.log("🔓 Telefon açılıyor...");
    
    // Kilit ekranını kapat
    const lockScreen = document.getElementById('lockScreen');
    lockScreen.style.opacity = '0';
    lockScreen.style.transform = 'translateY(-20px)';
    lockScreen.style.transition = 'all 0.5s ease';
    
    setTimeout(() => {
        lockScreen.style.display = 'none';
        
        // Ana ekranı aç
        const homeScreen = document.getElementById('homeScreen');
        homeScreen.style.display = 'flex';
        homeScreen.style.opacity = '0';
        
        setTimeout(() => {
            homeScreen.style.opacity = '1';
            homeScreen.style.transition = 'opacity 0.5s ease';
            showToast("📱 TemreOS'a hoş geldiniz!");
        }, 50);
    }, 500);
}

function lockScreen() {
    console.log("🔒 Ekran kilitleniyor...");
    
    // Uygulama varsa kapat
    closeApp();
    
    // Ana ekranı kapat
    const homeScreen = document.getElementById('homeScreen');
    homeScreen.style.opacity = '0';
    homeScreen.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        homeScreen.style.display = 'none';
        
        // Kilit ekranını aç
        const lockScreen = document.getElementById('lockScreen');
        lockScreen.style.display = 'flex';
        lockScreen.style.opacity = '0';
        lockScreen.style.transform = 'translateY(0)';
        
        setTimeout(() => {
            lockScreen.style.opacity = '1';
            lockScreen.style.transition = 'opacity 0.5s ease';
            showToast("📱 Ekran kilitlendi");
        }, 50);
    }, 300);
}

// ===== PARMAK İZİ İLE AÇMA =====
function unlockWithFingerprint() {
    if (fingerprintCooldown) return;
    fingerprintCooldown = true;
    
    console.log("👆 Parmak izi taranıyor...");
    
    const fingerprintIcon = document.querySelector('.fingerprint-icon');
    if (fingerprintIcon) {
        fingerprintIcon.style.background = '#4CAF50';
        fingerprintIcon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        showToast("👆 Parmak izi taranıyor...");
        
        // 2 saniye animasyon
        setTimeout(() => {
            unlockPhone();
            
            // Animasyonu sıfırla
            setTimeout(() => {
                fingerprintIcon.style.background = '';
                fingerprintIcon.innerHTML = '<i class="fas fa-fingerprint"></i>';
                fingerprintCooldown = false;
            }, 500);
        }, 2000);
    }
}

// ===== UYGULAMA YÖNETİMİ =====
function openApp(appId) {
    if (currentApp) return;
    
    console.log(`📱 ${appId} uygulaması açılıyor...`);
    currentApp = appId;
    
    // Tıklanan ikonu bul
    const clickedIcon = document.querySelector(`[data-app="${appId}"] .icon-circle`);
    let iconRect = { top: 0, left: 0, width: 0, height: 0 };
    
    if (clickedIcon) {
        iconRect = clickedIcon.getBoundingClientRect();
    }
    
    // App penceresini hazırla
    const appWindow = document.getElementById('appWindow');
    const appTitle = document.getElementById('appTitle');
    const appContent = document.getElementById('appContent');
    
    // Başlık ve içerik yükle
    const appTitles = {
        'settings': 'Ayarlar',
        'camera': 'Kamera',
        'messages': 'Mesajlar',
        'phone': 'Telefon',
        'chrome': 'Chrome',
        'gallery': 'Galeri',
        'music': 'Müzik',
        'files': 'Dosyalar',
        'calendar': 'Takvim',
        'calculator': 'Hesap Makinesi',
        'weather': 'Hava Durumu',
        'notes': 'Notlar'
    };
    
    appTitle.textContent = appTitles[appId] || appId;
    
    // İçerik yükle
    const contentTemplate = document.getElementById(`${appId}Content`);
    if (contentTemplate) {
        appContent.innerHTML = contentTemplate.innerHTML;
        
        // Ayarlar için event listener'ları ekle
        if (appId === 'settings') {
            initSettingsApp();
        }
    } else {
        appContent.innerHTML = `<div class="app-loading">
            <h3>${appTitles[appId] || appId}</h3>
            <p>Uygulama yükleniyor...</p>
        </div>`;
    }
    
    // Animasyonlu açılış
    if (appAnimationEnabled && clickedIcon) {
        // İkon pozisyonundan başlat
        appWindow.style.position = 'fixed';
        appWindow.style.top = `${iconRect.top}px`;
        appWindow.style.left = `${iconRect.left}px`;
        appWindow.style.width = `${iconRect.width}px`;
        appWindow.style.height = `${iconRect.height}px`;
        appWindow.style.borderRadius = '18px';
        appWindow.style.transform = 'scale(1)';
        appWindow.style.display = 'flex';
        
        // Tam ekrana animasyon
        setTimeout(() => {
            appWindow.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            appWindow.style.top = '0';
            appWindow.style.left = '0';
            appWindow.style.width = '100%';
            appWindow.style.height = '100%';
            appWindow.style.borderRadius = '0';
            appWindow.classList.add('active');
        }, 10);
    } else {
        // Normal açılış
        appWindow.style.display = 'flex';
        setTimeout(() => {
            appWindow.classList.add('active');
        }, 10);
    }
    
    showToast(`${appTitles[appId] || appId} açılıyor...`);
}

function closeApp() {
    if (!currentApp) return;
    
    console.log(`📱 ${currentApp} uygulaması kapatılıyor...`);
    
    const appWindow = document.getElementById('appWindow');
    
    // Animasyonlu kapanış
    if (appAnimationEnabled) {
        appWindow.classList.remove('active');
        
        setTimeout(() => {
            appWindow.style.display = 'none';
            currentApp = null;
        }, 300);
    } else {
        appWindow.style.display = 'none';
        currentApp = null;
    }
}

// ===== AYARLAR UYGULAMASI =====
function initSettingsApp() {
    console.log("⚙️ Ayarlar uygulaması başlatılıyor...");
    
    // Toggle'lar için event listener'lar
    document.getElementById('wifiToggle').addEventListener('change', function() {
        showToast(`Wi-Fi ${this.checked ? 'açıldı' : 'kapatıldı'}`);
    });
    
    document.getElementById('bluetoothToggle').addEventListener('change', function() {
        showToast(`Bluetooth ${this.checked ? 'açıldı' : 'kapatıldı'}`);
    });
    
    document.getElementById('darkModeToggle').addEventListener('change', function() {
        toggleTheme();
    });
    
    document.getElementById('animationsToggle').addEventListener('change', function() {
        appAnimationEnabled = this.checked;
        showToast(`Animasyonlar ${this.checked ? 'açıldı' : 'kapatıldı'}`);
    });
    
    document.getElementById('faceUnlockToggle').addEventListener('change', function() {
        showToast(`Yüz tanıma ${this.checked ? 'açıldı' : 'kapatıldı'}`);
    });
}

function toggleSetting(settingId) {
    console.log(`⚙️ ${settingId} ayarı değiştiriliyor...`);
    // Toggle işlemleri burada
}

function openThemeSelector() {
    showToast("🎨 Tema seçici açılıyor...");
    // Tema seçici implementasyonu
}

function showDeviceInfo() {
    const deviceInfo = `
        📱 TemreOS Beta V.03
        📅 Derleme: ${new Date().toLocaleDateString('tr-TR')}
        ⚡ İşlemci: Snapdragon 8 Gen 2
        💾 Bellek: 12 GB RAM
        💿 Depolama: 256 GB
        🔋 Pil: %78
    `;
    showToast("📊 Cihaz bilgileri görüntüleniyor...");
    alert(deviceInfo);
}

function checkForUpdates() {
    showToast("🔄 Güncellemeler kontrol ediliyor...");
    setTimeout(() => {
        showToast("✅ Sistem güncel: TemreOS Beta V.03");
    }, 1500);
}

// ===== TEMA YÖNETİMİ =====
function loadTheme() {
    const savedTheme = localStorage.getItem('temreos-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Toggle'ı güncelle
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.checked = savedTheme === 'dark';
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('temreos-theme', newTheme);
    
    showToast(`🌓 ${newTheme === 'dark' ? 'Karanlık' : 'Aydınlık'} tema aktif`);
}

// ===== KAMERA UYGULAMASI =====
function takePhoto() {
    console.log("📸 Fotoğraf çekiliyor...");
    
    const shutter = document.querySelector('.shutter-circle');
    if (shutter) {
        shutter.style.transform = 'scale(0.8)';
        shutter.style.transition = 'transform 0.1s';
        
        setTimeout(() => {
            shutter.style.transform = 'scale(1)';
        }, 100);
    }
    
    // Flaş efekti
    const viewfinder = document.querySelector('.camera-viewfinder');
    if (viewfinder) {
        viewfinder.style.backgroundColor = 'white';
        setTimeout(() => {
            viewfinder.style.backgroundColor = '';
            viewfinder.style.transition = 'background-color 0.3s';
        }, 100);
    }
    
    showToast("📸 Fotoğraf kaydedildi!");
}

// ===== TOAST NOTIFICATION =====
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===== KAYDIRMA GESTURE'LARI =====
function initSwipeGestures() {
    const lockScreen = document.getElementById('lockScreen');
    let startY = 0;
    
    lockScreen.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
    });
    
    lockScreen.addEventListener('touchend', (e) => {
        const endY = e.changedTouches[0].clientY;
        const diff = startY - endY;
        
        if (diff > 50) { // Yukarı kaydırma
            unlockPhone();
        }
    });
    
    // Mouse desteği
    lockScreen.addEventListener('mousedown', (e) => {
        startY = e.clientY;
    });
    
    lockScreen.addEventListener('mouseup', (e) => {
        const endY = e.clientY;
        const diff = startY - endY;
        
        if (diff > 50) {
            unlockPhone();
        }
    });
}

// ===== GLOBAL FONKSİYONLAR =====
window.unlockWithFingerprint = unlockWithFingerprint;
window.openApp = openApp;
window.closeApp = closeApp;
window.lockScreen = lockScreen;
window.toggleTheme = toggleTheme;
window.takePhoto = takePhoto;
window.showDeviceInfo = showDeviceInfo;
window.checkForUpdates = checkForUpdates;

console.log("✨ TemreOS Beta V.03 başarıyla yüklendi!");
