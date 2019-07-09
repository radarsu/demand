import '../scss/index.scss';

document.addEventListener('DOMContentLoaded', async () => {

    document.body.innerHTML = `<r-main></r-main>`;
    await import(`../app/main/main`);

});