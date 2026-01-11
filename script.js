// Dinamik Saat
function updateTime() {
  const now = new Date();
  document.querySelector('.time').textContent = now.toLocaleTimeString('tr-TR', {hour: '2-digit', minute: '2-digit'});
}
setInterval(updateTime, 1000);
updateTime();

// Hover efekti app'lara
document.querySelectorAll('.app, .folder, .dock-item').forEach(el => {
  el.addEventListener('mouseenter', () => el.style.transform = 'scale(1.1)');
  el.addEventListener('mouseleave', () => el.style.transform = 'scale(1)');
});
