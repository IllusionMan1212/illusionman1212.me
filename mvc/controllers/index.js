const fs = require("fs");
const axios = require("axios");
const Portfolio = require("../models/portfolio");
const { env } = require("process");
const showdown = require("showdown");

function sendMessage(req, res) {
    if (!fs.existsSync("CONTACTS")) {
        fs.mkdir("CONTACTS", (err) => {
            if (err) console.log(err);
        });
    }
    const [month, date, year] = ( new Date() ).toLocaleDateString().split("/")
    const time = new Date().toLocaleTimeString();
    fs.writeFileSync(`CONTACTS/${year}-${month}-${date} ${time} - ${req.body.name}.txt`, `Email: ${req.body.email}\n`, "utf8", (err) => {
        if (err) console.log(err);
    });
    fs.appendFileSync(`CONTACTS/${year}-${month}-${date} ${time} - ${req.body.name}.txt`, `Subject: ${req.body.subject}\n\n`, "utf8", (err) => {
        if (err) console.log(err);
    });
    fs.appendFileSync(`CONTACTS/${year}-${month}-${date} ${time} - ${req.body.name}.txt`, req.body.message, "utf8", (err) => {
        if (err) console.log(err);
    });

    const body = {
        "content": "Received a new contact message!",
        "embeds": [
            {
                "title": req.body.subject,
                "color": 2368898,
                "fields": [
                    {
                        "name": "Sender Name",
                        "value": req.body.name,
                        "inline": true,
                    },
                    {
                        "name": "Sender Email",
                        "value": req.body.email,
                        "inline": true
                    },
                    {
                        "name": "Message",
                        "value": req.body.message,
                    }
                ],
                "footer": {
                    "text": new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
                },
            }
        ]
    };

    axios.post(process.env.WEBHOOK_URL, body)
    .then((success) => {
        if (success) console.log("succ: " + JSON.stringify(success));
    })
    .catch((err) => {
        if (err) console.log("err: " + JSON.stringify(err));
    })

    res.status(200).json({ message: "Successfully received your message", status: 200, success: true });
}

function addProject(req, res) {
    if (req.body.password !== env.ADMIN_PASSWORD) {
        console.log("you're not illusion >:( stop trying to hack me");
        res.status(401).json({message: "You're not illusion >:( stop this at once", status: 401, success: false});
    }
    let category = new Portfolio;
    const converter = new showdown.Converter();
    
    let tags = [];
    if (req.body.tags) {
        let tagsNames = req.body.tags.split(',');
        tagsNames.forEach(element => {
            tags.push({name: element});
        });
    }

    const baseImageLocation = "./assets/img/graphics/"

    if (req.files && req.files.file) {
        fs.stat("angular/build/assets/img/graphics/" + req.files.file.name, (err) => {
            if (err) {
                fs.writeFileSync("angular/build/assets/img/graphics/" + req.files.file.name, req.files.file.data, (error) => {
                    if (error) console.log(error);
                });
            } else {
                console.log(`image "${req.files.file.name}" already exists, skipping upload`);                
            }
        });
    }

    if (req.files && req.files.file) {
        var image_location = baseImageLocation + req.files.file.name;
    } else {
        var image_location = "";
    }

    descHtml = converter.makeHtml(req.body.description);

    let project = {
        name: req.body.name,
        link: req.body.link,
        color1: req.body.color1 || "#000000",
        color2: req.body.color2 || "#000000",
        tags: tags,
        image_location: image_location,
        description: descHtml,
    }

    let portfolio = {
        name: req.body.category,
        projects: [project]
    }

    Portfolio.findOne({name: req.body.category}, (err, port) => {
        if (err) console.log(err);
        if (port) {
            port.projects.push(project);
            port.save();
            res.status(200).json({message: "Project successfully added", status: 200, success: true});
        } else {
            category.name = portfolio.name;
            category.projects = [project];
            category.save((err) => {
                if (err) {
                    res.status(500).json({message: err, status: 500, success: false});
                }
                res.status(200).json({message: "Project successfully added", status: 200, success: true});
            });
        }
    });
}

function getProjects(req, res) {
    Portfolio.find((err, doc) => {
        if (err) {
            res.status(500).json({message: err, status: 500, success: false});
        }
        if (doc) {
            res.send({message: "Projects fetched successfully", status: 200, success: true, doc: doc});
        }
    });
}

module.exports = {
    sendMessage,
    addProject,
    getProjects,
}