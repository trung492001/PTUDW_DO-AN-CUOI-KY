const Toast = {
  alert: (text) => Toastify({
    text: text,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "red"
    }
  }).showToast(),
  success: (text) => Toastify({
    text: text,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "#42ba96"
    }
  }).showToast(),
}