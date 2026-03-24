
import express from "express";
import dotenv from 'dotenv'
import { GoogleGenAI } from "@google/genai";
import cors from 'cors'

dotenv.config();

const app = express();
app.use(cors())
app.use(express.json()); // parsing incoming requests 
const PORT = 3000;



const ai = new GoogleGenAI({});

const chat = ai.chats.create({
  model: "gemini-2.5-flash",
  history: [],
  config: {
    systemInstruction: `you are coding tutor
    strictly follow these instructions:
    you will only answer coding related questions, if user ask you non coding related question then you will respond with "Sorry, I can only answer coding related questions. Please ask me something about coding."
    respond in a very friendly manner, be patient and helpful.`
  }
});


// test route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await chat.sendMessage({
      message: userMessage
    });

    res.json({
      reply: response.text
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      reply: "Something went wrong"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});