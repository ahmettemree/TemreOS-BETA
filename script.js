document.querySelectorAll('.glass').forEach(el => {
  el.addEventListener('mouseenter', () => {
    el.style.transform = 'scale(1.08) translateY(-6px)';
    el.style.boxShadow = '0 20px 80px rgba(0,0,0,0.6)';
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = 'scale(1)';
    el.style.boxShadow = '0 12px 50px rgba(0,0,0,0.5)';
  });
  el.addEventListener('click', () => {
    el.style.transform = 'scale(0.92)';
    setTimeout(() => el.style.transform = 'scale(1)', 200);
  });
});
