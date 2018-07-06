var models = require("../models");
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  models.sequelize
    .query(
      `SELECT
          name,
          birth_date,
          EXTRACT(YEAR FROM age(birth_date)) AS age
      FROM
          "People"
      WHERE
          EXTRACT(MONTH FROM birth_date) = (EXTRACT(MONTH FROM NOW()) -4)
      ORDER BY
          birth_date ASC`,
    /*SELECT NOW(), IF(DATE_FORMAT(BirthDate, "%m%d")-DATE_FORMAT(NOW(), "%m%d")<=0, DATE_FORMAT(BirthDate, "%m%d")-DATE_FORMAT(NOW(), "%m%d")+1231, DATE_FORMAT(BirthDate, "%m%d")-DATE_FORMAT(NOW(), "%m%d")) as Dif, CONCAT(FirstName, LastName) as Name, BirthDate from Employees
order by Dif*/
      {
        model: models.Person
      }
    )
    .then(function(people) {
      res.render("index", { title: "Celebrities, ordered by who has the next birthday", people: people });
    });
});

module.exports = router;
