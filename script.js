/* ===== TEMREOS BETA V.03 - TÜM STİLLER ===== */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    /* Light Theme */
    --bg-primary: #ffffff;
    --bg-secondary: #f8f9fa;
    --bg-surface: #ffffff;
    --bg-card: rgba(255, 255, 255, 0.9);
    
    --text-primary: #1a1a1a;
    --text-secondary: #5f6368;
    --text-tertiary: #80868b;
    
    --primary-color: #4285f4;
    --accent-color: #34a853;
    --warning-color: #ea4335;
    
    --border-color: #dadce0;
    --shadow-color: rgba(0, 0, 0, 0.1);
    
    --status-bar-height: 44px;
    --app-header-height: 56px;
}

[data-theme="dark"] {
    /* Dark Theme */
    --bg-primary: #121212;
    --bg-secondary: #1e1e1e;
    --bg-surface: #1e1e1e;
    --bg-card: rgba(30, 30, 30, 0.9);
    
    --text-primary: #e8eaed;
    --text-secondary: #9aa0a6;
    --text-tertiary: #80868b;
    
    --border-color: #3c4043;
    --shadow-color: rgba(0, 0, 0, 0.3);
}

body {
    font-family: 'Inter', sans-serif;
    background: var(--bg-primary);
    color: var(--text-primary);
    height: 100vh;
    overflow: hidden;
    transition: background-color 0.3s ease;
}

/* ===== BOOT SCREEN ===== */
.boot-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #0d47a1, #1a237e);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    animation: bootFadeOut 0.5s ease 3s forwards;
}

.boot-content {
    text-align: center;
    color: white;
}

.android-logo {
    margin-bottom: 30px;
    animation: logoPulse 2s infinite;
}

.boot-text {
    margin-bottom: 40px;
}

.powered-by {
    font-size: 14px;
    opacity: 0.8;
    margin-bottom: 10px;
    letter-spacing: 2px;
}

.os-name {
    font-size: 48px;
    font-weight: 700;
    margin-bottom: 5px;
    letter-spacing: -1px;
}

.os-version {
    font-size: 16px;
    opacity: 0.9;
    font-weight: 500;
}

.boot-progress {
    width: 200px;
    height: 4px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
    overflow: hidden;
    margin: 0 auto;
}

.progress-bar {
    height: 100%;
    background: #3ddc84;
    width: 0%;
    animation: progressLoad 3s ease forwards;
}

@keyframes bootFadeOut {
    to { opacity: 0; visibility: hidden; }
}

@keyframes logoPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

@keyframes progressLoad {
    0% { width: 0%; }
    100% { width: 100%; }
}

/* ===== LOCK SCREEN ===== */
.lock-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    flex-direction: column;
    z-index: 900;
}

.status-bar {
    height: var(--status-bar-height);
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    font-size: 14px;
    font-weight: 500;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
}

.status-time {
    font-weight: 600;
}

.lock-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 60px 20px 40px;
    color: white;
}

.lock-time {
    font-size: 82px;
    font-weight: 300;
    letter-spacing: -2px;
    margin-top: 40px;
}

.lock-date {
    font-size: 18px;
    opacity: 0.9;
    margin-top: -10px;
}

.lock-bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    margin-bottom: 40px;
}

.fingerprint-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    cursor: pointer;
}

.fingerprint-icon {
    width: 70px;
    height: 70px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    transition: all 0.3s ease;
}

.fingerprint-icon:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: scale(1.05);
}

.fingerprint-text {
    font-size: 14px;
    opacity: 0.9;
}

.swipe-hint {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    opacity: 0.8;
    font-size: 14px;
    animation: bounceHint 2s infinite;
}

@keyframes bounceHint {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
}

/* ===== HOME SCREEN ===== */
.home-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--bg-primary);
    display: none;
    flex-direction: column;
    z-index: 800;
}

.home-content {
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
}

/* App Grid */
.app-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-top: 20px;
    flex: 1;
}

.app-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    user-select: none;
}

.icon-circle {
    width: 60px;
    height: 60px;
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: white;
    margin-bottom: 8px;
    transition: all 0.2s ease;
    box-shadow: 0 4px 12px var(--shadow-color);
}

.app-icon:hover .icon-circle {
    transform: scale(1.1) translateY(-2px);
    box-shadow: 0 6px 20px var(--shadow-color);
}

.app-name {
    font-size: 12px;
    color: var(--text-primary);
    text-align: center;
    max-width: 70px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/* Dock */
.app-dock {
    display: flex;
    justify-content: space-around;
    background: var(--bg-card);
    backdrop-filter: blur(20px);
    border-radius: 25px;
    padding: 15px 20px;
    margin-top: 20px;
    border: 1px solid var(--border-color);
    box-shadow: 0 4px 12px var(--shadow-color);
}

.dock-icon {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background: var(--bg-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: var(--text-primary);
    cursor: pointer;
    transition: all 0.2s ease;
}

.dock-icon:hover {
    background: var(--primary-color);
    color: white;
    transform: scale(1.1);
}

/* ===== APP WINDOW ===== */
.app-window {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--bg-primary);
    z-index: 1000;
    display: none;
    flex-direction: column;
    transform: translateY(100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.app-window.active {
    transform: translateY(0);
}

.app-header {
    height: var(--app-header-height);
    padding: 0 16px;
    display: flex;
    align-items: center;
    background: var(--bg-surface);
    border-bottom: 1px solid var(--border-color);
}

.back-btn {
    background: none;
    border: none;
    font-size: 24px;
    color: var(--primary-color);
    cursor: pointer;
    padding: 8px;
    margin-right: 16px;
}

.app-title {
    flex: 1;
    font-size: 18px;
    font-weight: 600;
}

.app-actions {
    color: var(--text-secondary);
    padding: 8px;
    cursor: pointer;
}

.app-content {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
}

/* ===== SETTINGS APP ===== */
.settings-container {
    max-width: 600px;
    margin: 0 auto;
}

.settings-header {
    margin-bottom: 30px;
}

.settings-header h2 {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    font-size: 24px;
}

.search-bar {
    background: var(--bg-secondary);
    border-radius: 25px;
    padding: 12px 20px;
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--text-secondary);
}

.search-bar input {
    flex: 1;
    background: none;
    border: none;
    outline: none;
    color: var(--text-primary);
    font-size: 16px;
}

.settings-section {
    margin-bottom: 30px;
}

.settings-section h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
    color: var(--text-secondary);
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.settings-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    background: var(--bg-surface);
    border-radius: 12px;
    margin-bottom: 8px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    border: 1px solid var(--border-color);
}

.settings-item:hover {
    background: var(--bg-secondary);
}

.item-info {
    display: flex;
    align-items: center;
    gap: 15px;
    flex: 1;
}

.item-info i {
    font-size: 20px;
    color: var(--primary-color);
    width: 24px;
    text-align: center;
}

.item-info strong {
    display: block;
    font-size: 16px;
    margin-bottom: 2px;
}

.item-info small {
    font-size: 12px;
    color: var(--text-secondary);
}

/* Switch */
.switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 26px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 34px;
}

.slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
}

input:checked + .slider {
    background-color: var(--primary-color);
}

input:checked + .slider:before {
    transform: translateX(24px);
}

/* Color Preview */
.color-preview {
    width: 24px;
    height: 24px;
    border-radius: 12px;
    border: 2px solid var(--border-color);
}

/* Device Stats */
.device-stats {
    background: var(--bg-surface);
    border-radius: 12px;
    padding: 20px;
    margin-top: 15px;
    border: 1px solid var(--border-color);
}

.stat-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 12px 0;
    border-bottom: 1px solid var(--border-color);
}

.stat-item:last-child {
    border-bottom: none;
}

.stat-item i {
    font-size: 20px;
    color: var(--primary-color);
    width: 24px;
}

.stat-item strong {
    display: block;
    font-size: 14px;
    margin-bottom: 2px;
}

.stat-item span {
    font-size: 12px;
    color: var(--text-secondary);
}

/* Update Badge */
.update-badge {
    background: var(--accent-color);
    color: white;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
}

/* ===== CAMERA APP ===== */
.camera-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: #000;
}

.camera-viewfinder {
    flex: 1;
    background: linear-gradient(45deg, #1a1a1a, #333);
    position: relative;
}

.camera-viewfinder::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
}

.camera-controls {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    background: rgba(0, 0, 0, 0.8);
}

.camera-btn {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
}

.shutter-circle {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 3px solid #000;
}

.camera-mode {
    color: white;
    font-size: 14px;
    opacity: 0.8;
}

/* ===== TOAST NOTIFICATION ===== */
.toast {
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 12px 24px;
    border-radius: 25px;
    font-size: 14px;
    z-index: 9999;
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(10px);
}

.toast.show {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
}

/* ===== ANIMATIONS ===== */
@keyframes appOpen {
    from {
        opacity: 0;
        transform: scale(0.9);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes appClose {
    from {
        opacity: 1;
        transform: scale(1);
    }
    to {
        opacity: 0;
        transform: scale(0.9);
    }
}

/* ===== RESPONSIVE ===== */
@media (max-width: 400px) {
    .app-grid {
        gap: 15px;
    }
    
    .icon-circle {
        width: 50px;
        height: 50px;
        border-radius: 15px;
        font-size: 20px;
    }
    
    .lock-time {
        font-size: 64px;
    }
    
    .os-name {
        font-size: 36px;
    }
                                }
