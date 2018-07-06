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
          birth_date ASC
      UNION
      SELECT
          name,
          birth_date,
          EXTRACT(YEAR FROM age(birth_date)) AS age
      FROM
          "People"
      WHERE
          EXTRACT(MONTH FROM birth_date) = (EXTRACT(MONTH FROM NOW()) -1)
      ORDER BY
          birth_date ASC`,
      {
        model: models.Person
      }
    )
    .then(function(people) {
      res.render("index", { title: "Celebrities, ordered by who has the next birthday", people: people });
    });
});

module.exports = router;
