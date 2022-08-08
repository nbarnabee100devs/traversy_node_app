module.exports = {
  truncate: function (str, len) {
    if (str.length > len && str.length > 0) {
      let new_str = str + " ";
      new_str = str.substr(0, len); // Sets the string to the maximum length
      new_str = str.substr(0, new_str.lastIndexOf(" ")); // Ends the string on a space, thus eliminating any words that got cut through
      new_str = new_str.length > 0 ? new_str : str_substr(0, len); // If for some reason the string is now empty (like there was only a single word that got cut off), it returns to the earlier value.  The reader will just have to cope with a truncated word.
      return new_str + "...";
    }
    return str;
  },
};
