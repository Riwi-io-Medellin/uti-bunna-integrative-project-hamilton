const app = document.getElementById('app')

export function render(view) {
    app.innerHTML = `
        ${view}
    `
}