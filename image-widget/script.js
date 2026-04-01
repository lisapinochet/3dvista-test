function updateImage() {
    const img = document.getElementById("dynamicImage");

    // Exemple API simple avec image aléatoire
    const url = "https://picsum.photos/800/600?random=" + Date.now();

    img.src = url;

}

// premier chargement
updateImage();

// refresh toutes les 30 secondes
setInterval(updateImage, 30000);