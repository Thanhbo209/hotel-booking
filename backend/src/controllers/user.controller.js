export const authMe = async (req, res) => {
  res.status(200).json(req.user);
};
