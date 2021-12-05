function showDashboardSidebar() {
    const dashboardSidebarBackground = document.getElementById("dashboard-sidebar-background");
    dashboardSidebarBackground.classList.remove("opacity-0");
    dashboardSidebarBackground.classList.add("opacity-100");
    const dashboardSideBar = document.getElementById("dashboard-sidebar");
    dashboardSideBar.classList.remove("-translate-x-64");
    dashboardSideBar.classList.add("translate-x-0");
}

function hideDashboardSidebar() {
    const dashboardSidebarBackground = document.getElementById("dashboard-sidebar-background");
    dashboardSidebarBackground.classList.remove("opacity-100");
    dashboardSidebarBackground.classList.add("opacity-0");
    const dashboardSideBar = document.getElementById("dashboard-sidebar");
    dashboardSideBar.classList.remove("translate-x-0");
    dashboardSideBar.classList.add("-translate-x-64");
}

function toggleDashboardDropdown() {
    const dropdownMenu = document.getElementById("dashboard-dropdown-main");
    if (dropdownMenu.classList.contains("opacity-0")) { //show
        //opacity-0 -translate-x-2 -translate-y-2
        dropdownMenu.classList.remove("opacity-0");
        dropdownMenu.classList.remove("-translate-y-2");
        dropdownMenu.classList.add("opacity-100");
        dropdownMenu.classList.add("translate-y-0");
    } else { // hide
        dropdownMenu.classList.remove("opacity-100");
        dropdownMenu.classList.remove("translate-y-0");
        dropdownMenu.classList.add("opacity-0");
        dropdownMenu.classList.add("-translate-y-2");
    }
}