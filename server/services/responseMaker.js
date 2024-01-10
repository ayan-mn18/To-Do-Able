const colors = require("colors");

const responseMaker = (message, body, success) => {
    const response = {
        message: message,
        body: body,
        success: success
    }
    if (success) {
        console.log(colors.green.bold(response));
    } else {
        console.log(colors.red(response));
    }
    return response;
}
module.exports = responseMaker;