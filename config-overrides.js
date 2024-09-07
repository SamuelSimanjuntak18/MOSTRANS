module.exports = {
    jest: function(config) {
      // Tambahkan konfigurasi Jest kustom Anda di sini
      config.reporters = [
        "default",
        "jest-junit"
      ];
      return config;
    },
  };
  