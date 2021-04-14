console.log(window);

document.dispatchEvent(new CustomEvent("mainWorldLoad", { detail: window.$ }));
