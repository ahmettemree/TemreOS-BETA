const demo = document.getElementById("appDemo");
const icons = document.querySelectorAll(".appIcon");

function openApp(name) {
    demo.style.display = "block";
    icons.forEach(i => i.style.display = "none");
    console.log(name + " açıldı");
}

function closeApp() {
    demo.style.display = "none";
    icons.forEach(i => i.style.display = "flex");
}

function notifyCmd(cmd) {
    if(cmd === "Bildirim") {
        alert("Bildirim geldi!");
    } else if(cmd === "Geri") {
        alert("Geri tuşuna basıldı");
    } else if(cmd === "Aç") {
        openApp('Demo App');
    } else if(cmd === "Kapat") {
        closeApp();
    }
    console.log("Komut çalıştı:", cmd);
}
