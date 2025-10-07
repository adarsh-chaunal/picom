document.addEventListener("DOMContentLoaded", () => {
  const formBuilder = document.getElementById("form-builder");

  // Enable drag-and-drop functionality
  formBuilder.addEventListener("dragover", (event) => {
    event.preventDefault();
    formBuilder.style.borderColor = "#007bff";
  });

  formBuilder.addEventListener("dragleave", () => {
    formBuilder.style.borderColor = "#ccc";
  });

  formBuilder.addEventListener("drop", (event) => {
    event.preventDefault();
    formBuilder.style.borderColor = "#ccc";

    const componentType = event.dataTransfer.getData("text/plain");
    if (componentType) {
      const newComponent = document.createElement("div");
      newComponent.className = "form-component";
      newComponent.textContent = componentType;
      formBuilder.appendChild(newComponent);
    }
  });

  // Example: Add draggable components
  const components = ["Button", "Input", "Checkbox"];
  const testArea = document.getElementById("test-area");

  components.forEach((component) => {
    const draggable = document.createElement("div");
    draggable.className = "draggable-component";
    draggable.textContent = component;
    draggable.draggable = true;

    draggable.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", component);
    });

    testArea.appendChild(draggable);
  });
});