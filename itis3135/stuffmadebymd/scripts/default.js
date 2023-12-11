const featuredProducts = [0, 2, 8, 1];
var activeProduct = 0;

window.onload = function () {
	if (window.location.href.includes("product")) {
		loadProductPage();
	}
	if (window.location.href.includes("search")) {
		document.getElementById("search-term").focus();
	}
	if (window.location.href.includes("featured")) {
		navigateFeaturedProducts('x');
	}
}

function loadProductPage() {
	let productId = window.location.search.slice(9, window.location.search.length);

	let productObj = {
		"id": -1,
		"name": "No Product Found",
		"image": "#",
		"description": "No Product Found",
		"url": "#",
		"page": "#"
	};

	$.ajax({
		dataType: "json",
		url: "data/products.json",
		success: function (data) {
			const { productInfo } = data;
			for (let i = 0; i < productInfo.length; i++) {
				if (productInfo[i].id == productId) {
					productObj = productInfo[i];
				}
			}
			if (productObj.id == -1) console.error("ERROR - PRODUCT ID NOT FOUND");

			document.getElementById("product-title").innerHTML = productObj.name;
			document.getElementById("product-image").setAttribute("src", productObj.image);
			document.getElementById("product-image").setAttribute("alt", productObj.name);
			document.getElementById("product-description").innerHTML = productObj.description;
			document.getElementById("product-purchase").setAttribute("href", productObj.url);

		},
		fail: function (error) {
			console.error("ERROR: Failed to retrieve JSON ", error);
			document.getElementById("product-title").innerHTML = "No Product Found";
			document.getElementById("product-description").innerHTML = "No Product Found";
		}
	});
}

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
		activeProduct++
	} else if (operator == '-') {
		activeProduct--;
	} else if (operator == 'x') {
		activeProduct = 0;
	} else {
		console.error("ERROR: INVALID OPERATOR");
	}
	// Loop if active product is out of bounds
	if (activeProduct >= featuredProducts.length) {
		activeProduct = 0;
	} else if (activeProduct < 0) {
		activeProduct = featuredProducts.length - 1;
	}

	$.ajax({
		dataType: "json",
		url: "data/products.json",
		success: function (data) {
			const { productInfo } = data;

			let productIndex = featuredProducts[activeProduct];

			document.getElementById("featured-product-title").innerHTML = productInfo[productIndex].name;
			document.getElementById("featured-product-description").innerHTML = productInfo[productIndex].description;
			var image = document.getElementById("featured-product-image")
			image.src = productInfo[productIndex].image;
			image.alt = productInfo[productIndex].name;
			document.getElementById("featured-product-purchase").href = productInfo[productIndex].url;
			let pageUrl = 'product.html?product=';
			pageUrl += productInfo[productIndex].id;
			document.getElementById("featured-product-page-link").href = pageUrl;

		},
		fail: function (error) {
			console.error("ERROR: Failed to retrieve JSON ", error);
			document.getElementById("featured-product-title").innerHTML = "No Product Found";
			document.getElementById("featured-product-description").innerHTML = "No Product Found";
		}
	});
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

	$.ajax({
		dataType: "json",
		url: "data/products.json",
		success: function (data) {
			const { productInfo } = data;

			for (let i = 0; i < productInfo.length; i++) {
				if (term && productInfo[i].name.toUpperCase().includes(term.toUpperCase())) {
					resultFlag = true;
					var newResult = document.createElement("div");
					newResult.classList.add("result");

					var productTitle = document.createElement("h2");
					productTitle.innerHTML = productInfo[i].name;

					var productName = document.createElement("a");
					productName.classList.add("product-name");
					let pageUrl = 'product.html?product=';
					pageUrl += productInfo[i].id;
					productName.href = pageUrl;
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

		},
		fail: function (error) {
			console.error("ERROR: Failed to retrieve JSON ", error);
			var noResultMessage = document.createElement("h2");
			noResultMessage.innerHTML = "No Results Found";
			results.appendChild(noResultMessage);
		}
	});
}