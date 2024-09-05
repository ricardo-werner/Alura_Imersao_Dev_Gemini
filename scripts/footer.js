export function updateCurrentYear() {
  document.getElementById("current-year").textContent =
    new Date().getFullYear();
}