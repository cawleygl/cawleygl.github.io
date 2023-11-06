const productInfo = [
    {
        name: "Getaway Car Motel Keychain",
        image: "https://i.etsystatic.com/26350705/r/il/6505f5/5028452601/il_794xN.5028452601_srhc.jpg",
        description: '"Getaway car" vinyl lettering motel keychain with gold hardware. Perfect for a thoughtful gift :)',
        url: "https://www.etsy.com/listing/1498723679/getaway-car-motel-keychain?click_key=610d9573f4e04a5978d5227fae8f7596fb217407%3A1498723679&click_sum=eac7dc62&ref=shop_home_feat_3",
        page: "getawaycarmotelkeychain.html"
    },
    {
        name: "Coffee & True Crime Podcast Glass Cup",
        image: "https://i.etsystatic.com/26350705/r/il/609755/4937230555/il_794xN.4937230555_m730.jpg",
        description: 'Coffee & True Crime Podcast glass can cup (Libbey glass) with skulls. 16 oz glass perfect for coffee, water, juice, or any beverage of your choice.',
        url: "https://www.etsy.com/listing/1463905438/coffee-true-crime-podcast-glass-cup?click_key=7e24dad132f715a5032143b48cbbaa29c8297c02%3A1463905438&click_sum=0b5064f8&ref=shop_home_feat_2",
        page: "coffeeandtruecrimepodcastglasscup.html"
    },
    {
        name: "Cherries Pink Motel Keychain",
        image: "https://i.etsystatic.com/26350705/r/il/073a40/4747644056/il_794xN.4747644056_al1k.jpg",
        description: 'Cherries vinyl lettering, pink motel keychain with gold hardware. Perfect for a thoughtful gift :)',
        url: "https://www.etsy.com/listing/1444913133/cherries-pink-motel-keychain?click_key=04d100fe15a0e81c6c80dfc3735e4b23f28320a8%3A1444913133&click_sum=57cbfef5&ref=shop_home_recs_2",
        page: "cherriespinkmotelkeychain.html"
    },
    {
        name: "Swiss Cheese Plant Sticker",
        image: "https://i.etsystatic.com/26350705/r/il/1a3e3a/4875110190/il_794xN.4875110190_i8my.jpg",
        description: 'Commonly known as the swiss cheese plant, this Monstera adansonii is the perfect addition to your collection!',
        url: "https://www.etsy.com/listing/1460660818/swiss-cheese-plant-sticker?click_key=d314b10d609e3d102f634a39e2be0a7e2786f46e%3A1460660818&click_sum=b5da5662&ref=shop_home_feat_4",
        page: "swisscheeseplantsticker.html"
    }
];

var activeProduct = 0;

function toggleNavDropdown() {
    // Change links from open to closed
    var links = document.getElementsByClassName("nav-link");
    for (let i = 0; i < links.length; i++) {
        links[i].classList.toggle("open");
        links[i].classList.toggle("closed");
    }
    // Change direction of collapse arrow
    document.getElementById("collapse-arrow").classList.toggle("down");
    document.getElementById("collapse-arrow").classList.toggle("up");
    document.getElementById("collapse-button").classList.toggle("down");
    document.getElementById("collapse-button").classList.toggle("up");
}

function navLogoHighlight() {
    document.getElementById("nav-logo-image-color").classList.toggle("invisible");
    document.getElementById("nav-logo-image-highlight").classList.toggle("invisible");
}

function navigateFeaturedProducts(operator) {
    // Increment active product based on operator
    if (operator == '+') {
        activeProduct++;
    } else if (operator == '-') {
        activeProduct--;
    } else {
        console.error("ERROR: INVALID OPERATOR");
    }
    // Loop if active product is out of bounds
    if (activeProduct >= productInfo.length) {
        activeProduct = 0;
    } else if (activeProduct < 0) {
        activeProduct = (productInfo.length - 1);
    }

    document.getElementById("featured-product-title").innerHTML = productInfo[activeProduct].name;
    document.getElementById("featured-product-description").innerHTML = productInfo[activeProduct].description;
    var image = document.getElementById("featured-product-image")
    image.src = productInfo[activeProduct].image;
    image.alt = productInfo[activeProduct].name;
    document.getElementById("featured-product-purchase").href = productInfo[activeProduct].url;
    document.getElementById("featured-product-page-link").href = productInfo[activeProduct].page;
}

function searchProducts() {
    var term = document.getElementById("search-term").value;
    var results = document.getElementById("search-results");
    var resultFlag = false;
    // Show results element on first search
    if (!results.classList.contains("display")) {
        results.classList.remove("hidden");
        results.classList.add("display");
    }
    results.innerHTML = "";

    for (let i = 0; i < productInfo.length; i++) {
        console.log("Loop " + i);
        console.log(productInfo[i].name.toUpperCase());
        console.log(term.toUpperCase());

        if (term && productInfo[i].name.toUpperCase().includes(term.toUpperCase())) {
            resultFlag = true;
            var newResult = document.createElement("div");
            newResult.classList.add("result");

            var productTitle = document.createElement("h2");
            productTitle.innerHTML = productInfo[i].name;

            var productName = document.createElement("a");
            productName.classList.add("product-name");
            productName.href = productInfo[i].page;
            productTitle.innerHTML = productInfo[i].name;

            var productPurchase = document.createElement("a");
            productPurchase.classList.add("product-purchase");
            productPurchase.href = productInfo[i].url;
            productPurchase.target = "_blank";
            productPurchase.innerHTML = "Purchase";

            productName.appendChild(productTitle);
            newResult.appendChild(productName);
            newResult.appendChild(productPurchase);
            results.appendChild(newResult);
        }
    }

    if (!resultFlag) {
        var noResultMessage = document.createElement("h2");
        noResultMessage.innerHTML = "No Results Found";
        results.appendChild(noResultMessage);
    }

    console.log(term);

}