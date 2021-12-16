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
        dropdownMenu.classList.remove("invisible")
        dropdownMenu.classList.add("visible")
        dropdownMenu.classList.remove("opacity-0");
        dropdownMenu.classList.remove("-translate-y-2");
        dropdownMenu.classList.add("opacity-100");
        dropdownMenu.classList.add("translate-y-0");
    } else { // hide
        dropdownMenu.classList.remove("opacity-100");
        dropdownMenu.classList.remove("translate-y-0");
        dropdownMenu.classList.add("opacity-0");
        dropdownMenu.classList.add("-translate-y-2");
        setTimeout(() => {
            dropdownMenu.classList.remove("visible")
            dropdownMenu.classList.add("invisible")
        }, 200);
    }
}

function toggleDashboardSidebarDropDown() {
    const sidebarDropdownButton = document.getElementById("dashboard-sidebar-dropdown-arrow");
    const sidebarDropdownMenu = document.getElementById("dashboard-sidebar-dropdown-button");
    sidebarDropdownMenu.classList.toggle("hidden");
    sidebarDropdownButton.classList.toggle("rotate-180");
}

var xValues = [100,200,300,400,500,600,700,800,900,1000];
new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      data: [860,1140,1060,1060,1070,1110,1330,2210,7830,2478],
      borderColor: "red",
      fill: false
    },{
      data: [1600,1700,1700,1900,2000,2700,4000,5000,6000,7000],
      borderColor: "green",
      fill: false
    },{
      data: [300,700,2000,5000,6000,4000,2000,1000,200,100],
      borderColor: "blue",
      fill: false
    }]
  },
  options: {
    legend: {display: false}
  }
});