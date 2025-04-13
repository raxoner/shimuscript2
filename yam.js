(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const scriptParam = urlParams.get("script");

    if (scriptParam) {
        const scriptUrl = `https://raw.githubusercontent.com/raxoner/shimuscript2/script/${scriptParam}.lua`;

        fetch(scriptUrl)
            .then(response => response.text())
            .then(scriptContent => {
                // Pastikan executor mendukung eksekusi LUA
                if (typeof loadstring !== 'undefined') {
                    const executeScript = loadstring(scriptContent);
                    executeScript();
                } else {
                    console.error('Executor tidak mendukung loadstring!');
                }
            })
            .catch(error => {
                console.error('Error loading script:', error);
                document.body.innerHTML = "<h1>Script tidak ditemukan atau gagal di-load.</h1>";
            });
    } else {
        document.body.innerHTML = "<h1>Parameter 'script' tidak ditemukan di URL.</h1>";
    }
})();
