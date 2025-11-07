const burger = document.getElementById("burger");
const circle = document.getElementById("circle");
let isOpen = false;
let rotation = 0;
const items = [...circle.querySelectorAll(".menu-item")];
const total = items.length;
let radius = window.innerWidth < 600 ? 100 : 160;

// обновление позиций элементов по кругу
function updatePositions() {
  items.forEach((item, i) => {
    const angle = ((i * 360) / total + rotation) * (Math.PI / 180);
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    item.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  });
}

// клик по бургеру
burger.addEventListener("click", () => {
  isOpen = !isOpen;
  burger.classList.toggle("active");
  circle.style.transform = isOpen
    ? "rotateX(20deg) rotateY(0deg) scale(1)"
    : "rotateX(20deg) rotateY(0deg) scale(0.1)";
  if (isOpen) updatePositions();
  else items.forEach((item) => (item.style.transform = "translate3d(0, 0, 0)"));
});

// вращение колесиком мыши
window.addEventListener("wheel", (e) => {
  if (!isOpen) return;
  rotation += e.deltaY * 0.1;
  updatePositions();
});

// 👉 свайпы для смартфонов
let startX = 0;

window.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

window.addEventListener("touchmove", (e) => {
  if (!isOpen) return;
  const deltaX = e.touches[0].clientX - startX;
  rotation += deltaX * 0.2;
  updatePositions();
  startX = e.touches[0].clientX;
});

// обновляем радиус при изменении ширины окна
window.addEventListener("resize", () => {
  radius = window.innerWidth < 600 ? 100 : 160;
  if (isOpen) updatePositions();
});
