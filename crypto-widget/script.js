let lastPrice = null;

async function updatePrice() {
    try {
        const response = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT");

        if (!response.ok) {
            throw new Error("HTTP " + response.status);
        }

        const data = await response.json();
        const price = parseFloat(data.price);

        if (isNaN(price)) {
            throw new Error("Prix invalide");
        }

        const priceEl = document.getElementById("price");
        const timeEl = document.getElementById("time");

        let arrow = "";
        let className = "price neutral";

        if (lastPrice !== null) {
            if (price > lastPrice) {
                arrow = " ▲";
                className = "price up";
            } else if (price < lastPrice) {
                arrow = " ▼";
                className = "price down";
            }
        }

        lastPrice = price;

        priceEl.className = className;
        priceEl.textContent = price.toFixed(2) + arrow;
        timeEl.textContent = new Date().toLocaleTimeString("fr-FR");
    } catch (error) {
        console.error("Erreur API:", error);

        const priceEl = document.getElementById("price");
        const timeEl = document.getElementById("time");

        priceEl.className = "price error";
        priceEl.textContent = "Erreur API";
        timeEl.textContent = new Date().toLocaleTimeString("fr-FR");
    }
}

updatePrice();
setInterval(updatePrice, 5000);