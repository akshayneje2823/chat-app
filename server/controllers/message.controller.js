import Conversation from "../model/conversation.model.js";
import Message from "../model/message.model.js";
import { getReciverSocketId, io } from "../socket/server.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: reciverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      paricipants: { $all: [senderId, reciverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        paricipants: [senderId, reciverId],
      });
    }

    console.log(message);
    const newMessage = new Message({
      senderId,
      reciverId,
      message,
    });
    console.log(newMessage);

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    // await conversation.save();
    // await newMessage.save();

    //code optimiazation
    await Promise.all([conversation.save(), newMessage.save()]);

    // SOCKET IO functionality goes here
    const reciverSocketId = getReciverSocketId(reciverId);

    if(reciverSocketId) {
      // io.to(<socket_id>).emmit used to send events to specifuc client
      io.to(reciverSocketId).emit('newMessage',newMessage)
    }


    res.status(201).json({ success: true, messages: newMessage });
  } catch (error) {
    console.log("ERROR: " + error);
    res.status(400).json({ error: "Internal Server Error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatid } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      paricipants: { $all: [senderId, userToChatid] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]);
    }

    const message = conversation.messages;
    res.status(200).json(message);
  } catch (error) {
    console.log("ERROR => " + error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
