const apiKey = "ANSPHEcZTrqPXybaAH3X1A==";


app.get("/mrtService", async function (req, res) {

    var axios = require('axios');

    var config = {
        method: 'get',
        url: 'http://datamall2.mytransport.sg/ltaodataservice/TrainServiceAlerts',
        headers: {
            'AccountKey': 'ANSPHEcZTrqPXybaAH3X1A=='
        }
    };

    let x = await axios(config);
    console.log(x.data.value);
    //res.send(x.data.value);
    if (x.data.value.Status == 1) {
        status_1 = "Mrt working fine";

        res.render("mrtService", {
            status: status_1,
        });

    } else {


        res.render("mrtService", {
            status_1: status_1,
            Message: Message,
            affected_line: affected_line,
            direction: direction,
        });
    }
});