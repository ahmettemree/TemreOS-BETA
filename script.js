const demo = document.getElementById("appDemo");
const icons = document.querySelectorAll(".appIcon");

function openApp(name) {
    demo.classList.add("show");
    icons.forEach(i => i.style.display = "none");
    console.log(name + " açıldı");
}

function closeApp() {
    demo.classList.remove("show");
    setTimeout(() => icons.forEach(i => i.style.display = "flex"), 250);
}

function notifyCmd(cmd) {
    switch(cmd) {
        case "Bildirim":
            alert("Bildirim geldi!");
            break;
        case "Geri":
            alert("Geri tuşuna basıldı");
            break;
        case "Aç":
            openApp('Demo App');
            break;
        case "Kapat":
            closeApp();
            break;
        default:
            console.log("Bilinmeyen komut:", cmd);
    }
    console.log("Komut çalıştı:", cmd);
}
