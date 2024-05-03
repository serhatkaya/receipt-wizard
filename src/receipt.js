"use strict";

const EOL = "\n";
const formatters = require("./formatter");

const receipt = {
  config: {
    currency: "$",
    width: 50,
    ruler: "=",
  },

  formatters: {},

  create(chunks) {
    return chunks
      .map((chunk) => {
        if (chunk.hasOwnProperty("type")) {
          return this.formatters[chunk.type](chunk, this.config);
        }

        return "";
      })
      .join(EOL);
  },

  addFormatter(name, handler) {
    if (!this.formatters.hasOwnProperty(name)) {
      this.formatters[name] = handler.bind(this);
    } else {
      throw new Error('Formatter named "' + name + '" already exists.');
    }
  },

  addFormatters(formatters) {
    for (let name in formatters) {
      this.addFormatter(name, formatters[name]);
    }
  },

  /**
   * Note: Web use only
   * Creates a canvas element with given text and converts it to base64 image
   * @returns {string}
   */
  convertToBase64Image(text) {
    // Create a new canvas element
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");

    // Set canvas size
    canvas.width = 600; // Adjust as needed
    canvas.height = 800; // Adjust as needed

    // Set text styles
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";

    // Define text layout
    var lines = text.split("\n");
    var lineHeight = 20; // Adjust as needed
    var y = 40; // Starting position

    // Draw each line of text
    lines.forEach(function (line) {
      ctx.fillText(line, 20, y);
      y += lineHeight;
    });

    // Convert canvas content to Base64 image
    var base64Image = canvas.toDataURL("image/png");
    return base64Image;
  },
};

receipt.addFormatters({
  empty: formatters.empty,
  ruler: formatters.ruler,
  text: formatters.text,
  properties: formatters.properties,
  table: formatters.table,
});

module.exports = receipt;
