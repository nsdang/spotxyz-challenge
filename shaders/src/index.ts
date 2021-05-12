import App from './app';

window.addEventListener("DOMContentLoaded", () => {
  let app = new App(document.getElementById("app") as HTMLCanvasElement);
  app.createScene();
  app.start();
});
