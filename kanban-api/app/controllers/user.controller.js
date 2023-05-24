const User = require('../models/user.model');

// Kullanıcı kaydı
exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Kullanıcıyı oluştur ve veritabanına kaydet
    const user = new User({
      username,
      password
    });
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Kullanıcıyı bul ve doğrula
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      res.status(401).json({ message: 'Invalid username or password' });
    } else {
      res.status(200).json({ message: 'Login successful' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
