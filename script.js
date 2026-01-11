function updateClock() {
  const now = new Date();
  document.querySelector('.clock').textContent = now.toLocaleTimeString('tr-TR', {hour: '2-digit', minute: '2-digit'});
}
setInterval(updateClock, 1000);
updateClock();
