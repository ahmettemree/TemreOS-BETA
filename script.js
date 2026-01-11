function updateClock() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('tr-TR', {hour: '2-digit', minute: '2-digit'});
  // Status bar'da da saat göster (senin gibi)
  document.querySelector('.status-bar').innerHTML = `${timeStr} WiFi VoLTE %55 🔋`;
}
setInterval(updateClock, 1000);
updateClock();
