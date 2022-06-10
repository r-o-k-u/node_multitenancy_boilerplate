const httpStatus = require("http-status");

const authentication = async (data, socketId) => {
  try {
    let user = { token: "token" };
    console.log("testing connection", data);
    if (user.token == data.token) {
      return user;
    } else {
      return null;
    }
  } catch (err) {
    return {
      message: "Unauthorized",
      status: httpStatus.UNAUTHORIZED,
    };
  }
};

exports.emitToSocketId = (socketId, eventName, data) => {
  console.log(`Emit ${eventName}`, socketId, data);
  global.io.to(`${socketId}`).emit(eventName, data);
};

exports.emitOverChannel = (eventName, data) => {
  console.log(`Emit over channel ${eventName}`, data);
  global.io.emit(eventName, data);
};

exports.init = async () => {
  console.log("initialized socket");
  global.io.on("connection", async (socket) => {
    const query = socket.request._query;

    authentication(query, socket.id)
      .then((result) => {
        if (result) {
          global.io.to(socket.id).emit("onAuthenticated", true);
          return;
        }

        global.io.to(socket.id).emit("onAuthenticated", false);
        global.io.sockets.sockets[socket.id].disconnect();
      })
      .catch(() => {});
  });
};
