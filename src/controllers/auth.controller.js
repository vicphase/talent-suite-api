module.exports = () => {
  const signUp = async (req, res) => {
    req.login(req.body, () => {
      res.send({});
    });
  };

  return {
    signUp: signUp
  };
};
