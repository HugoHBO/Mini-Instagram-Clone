module.exports = function ({ app, dbConn }) {
  app.post("/followers/get", (req, res) => {
    const { followerId, userId } = req.body;
    if (!followerId || !userId) {
      res.status(200).jsonp({ message: "Not found" });
    }
    const getFollowerSql =
      "SELECT * FROM user_follower WHERE follower_id = ? AND user_id = ?";
    dbConn.query(
      getFollowerSql,
      [followerId, userId],
      function (error, response) {
        if (response && response.length) {
          res.status(200).jsonp({ ...response[0] });
        } else {
          res.status(200).jsonp({ message: "Not found" });
        }
      }
    );
  });

  app.post("/followers/create", (req, res) => {
    const { followerId, userId } = req.body;
    if (!followerId || !userId) {
      res.status(200).jsonp({
        message: "No se ha podido crear el seguidor, intentelo de nuevo",
      });
    }
    const followers = [[followerId, userId]];
    const insertFollowerSql =
      "INSERT INTO user_follower (follower_id, user_id) VALUES ?";
    dbConn.query(
      insertFollowerSql,
      [followers],
      function (error, insertedFollower) {
        if (insertedFollower) {
          res.status(200).jsonp({
            insertId: insertedFollower.insertId,
            follower_id: followerId,
            user_id: userId,
          });
        } else {
          res
            .status(200)
            .jsonp({
              message: "No se pudo crear el seguidor, intentelo de nuevo",
            });
        }
      }
    );
  });

  app.post("/followers/delete", (req, res) => {
    const { followerId, userId } = req.body;
    if (!followerId || !userId) {
      res
        .status(200)
        .jsonp({
          message: "No se pudo borrar el seguidor, intentelo de nuevo",
        });
    }
    const deleteFollowerSql =
      "DELETE FROM user_follower WHERE follower_id = ? AND user_id = ?";
    dbConn.query(
      deleteFollowerSql,
      [followerId, userId],
      function (error, response) {
        if (response && response.affectedRows) {
          res.status(200).jsonp({ followerId, userId });
        } else {
          res
            .status(200)
            .jsonp({
              message: "No se pudo borrar el seguidor, intentelo de nuevo",
            });
        }
      }
    );
  });
};
