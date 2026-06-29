const express = require("express");
const path = require("path");
const db = require("./config/db");

const app = express();
const PORT = 5000;

// ================= VIEW ENGINE =================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ================= MIDDLEWARE =================
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ================= LOGIN =================
app.get("/", (req, res) => {
    res.render("login");
});

// ================= DASHBOARD =================
app.get("/dashboard", (req, res) => {

    const statsQuery = `
        SELECT
            COUNT(*) AS totalProjects,
            SUM(CASE WHEN status='Completed' THEN 1 ELSE 0 END) AS completedProjects,
            SUM(CASE WHEN status='Ongoing' THEN 1 ELSE 0 END) AS ongoingProjects,
            SUM(CASE WHEN status='Planning' THEN 1 ELSE 0 END) AS planningProjects
        FROM projects
    `;

    const recentQuery = `
        SELECT *
        FROM projects
        ORDER BY id DESC
        LIMIT 5
    `;

    db.query(statsQuery, (err, stats) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        db.query(recentQuery, (err, recentProjects) => {

            if (err) {
                console.log(err);
                return res.send("Database Error");
            }

            res.render("dashboard", {

                totalProjects: stats[0].totalProjects || 0,
                completedProjects: stats[0].completedProjects || 0,
                ongoingProjects: stats[0].ongoingProjects || 0,
                planningProjects: stats[0].planningProjects || 0,

                recentProjects

            });

        });

    });

});

// ================= ADD PROJECT =================
app.get("/addProject", (req, res) => {
    res.render("addProject");
});
// ================= SAVE PROJECT =================

app.post("/saveProject", (req, res) => {

    const {
        project_name,
        client_name,
        start_date,
        end_date,
        status
    } = req.body;

    const sql = `
        INSERT INTO projects
        (project_name, client_name, start_date, end_date, status)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [project_name, client_name, start_date, end_date, status],
        (err) => {

            if (err) {
                console.log(err);
                return res.send("❌ Database Error");
            }

            // After saving, go back to dashboard
            res.redirect("/dashboard");

        }
    );

});


// ================= PROJECTS =================

app.get("/projects", (req, res) => {

    const sql = `
        SELECT *
        FROM projects
        ORDER BY id DESC
    `;

    db.query(sql, (err, projects) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        res.render("projects", {
            projects
        });

    });

});


// ================= TEST =================

app.get("/test", (req, res) => {

    res.send("✅ TEST ROUTE WORKING");

});


// ================= SERVER =================

app.listen(PORT, () => {

    console.log("======================================");
    console.log("✅ MySQL Connected Successfully");
    console.log("🚀 Server Running Successfully");
    console.log(`🌐 http://localhost:${PORT}`);
    console.log("======================================");

});