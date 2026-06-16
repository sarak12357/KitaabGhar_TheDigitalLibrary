router.post("/unlock", async (req, res) => {
  try {
    const { userId, bookId, type } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cost = type === "full" ? 20 : 5;

    if (user.credits < cost) {
      return res.status(400).json({ message: "Not enough credits" });
    }

    user.credits -= cost;

    user.unlockedBooks.push({
      bookId,
      type,
    });

    await user.save();

    res.json({
      message: "Unlocked",
      credits: user.credits,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unlock failed" });
  }
});