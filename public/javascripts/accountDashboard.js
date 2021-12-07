function closeModalDashboardAddStaff() {
    document.getElementById("dashboard-add-staff-modal").classList.add("hidden");
}

function openModalDashboardAddStaff() {
    document.getElementById("dashboard-add-staff-form").reset();
    document.getElementById("dashboard-add-staff-modal").classList.remove("hidden");
}