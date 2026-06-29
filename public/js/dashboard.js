// ================= PIE CHART =================

const statusChart = document.getElementById("statusChart");

if (statusChart) {

    new Chart(statusChart, {

        type: "pie",

        data: {

            labels: [
                "Completed",
                "Ongoing",
                "Planning"
            ],

            datasets: [{

                data: [8, 5, 2],

                backgroundColor: [
                    "#10b981",
                    "#f59e0b",
                    "#8b5cf6"
                ]

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    position: "bottom"

                }

            }

        }

    });

}


// ================= BAR CHART =================

const monthChart = document.getElementById("monthChart");

if (monthChart) {

    new Chart(monthChart, {

        type: "bar",

        data: {

            labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun"
            ],

            datasets: [{

                label: "Projects",

                data: [2, 4, 5, 3, 6, 7],

                backgroundColor: "#2563eb",

                borderRadius: 10

            }]

        },

        options: {

            responsive: true,

            scales: {

                y: {

                    beginAtZero: true

                }

            }

        }

    });

}


// ================= LIVE DATE & TIME =================

function updateDateTime() {

    const now = new Date();

    const date = now.toLocaleDateString();

    const time = now.toLocaleTimeString();

    const dateElement = document.getElementById("currentDate");

    const timeElement = document.getElementById("currentTime");

    if (dateElement) {
        dateElement.innerHTML = date;
    }

    if (timeElement) {
        timeElement.innerHTML = time;
    }

}

updateDateTime();

setInterval(updateDateTime, 1000);