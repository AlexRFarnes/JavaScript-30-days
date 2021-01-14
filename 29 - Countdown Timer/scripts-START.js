function timer(seconds) {
    const now  = Date.now();
    const then = now  + seconds * 1000;
    setInterval(() => {
        then
    }, 1000)
}