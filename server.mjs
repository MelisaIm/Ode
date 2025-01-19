import express from 'express';
import bodyParser from 'body-parser';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(bodyParser.json());

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// API route
app.post('/query', async (req, res) => {
  try {
    let { prompt } = req.body;
    prompt = "Write me a poem based on these 3 quotes: 'The only thing we have to fear is fear itself' (Franklin D. Roosevelt), 'You must be the change you wish to see in the world' (Mahatma Gandhi), 'Do one thing every day that scares you' (Eleanor Roosevelt)";

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { "role": "system", "content": "You are a creative and optimistic poet." },
        {"role": "user", "content": prompt},
      ],
    });

    console.log(completion);
    res.json(completion.choices[0].message);
  } catch (error) {
    console.error('Error querying OpenAI:', error.message);
    res.status(500).json({ error: 'An error occurred while querying OpenAI' });
  }
});

app.get('/', async (req, res) => {
  try {
    let { prompt } = req.body;
    prompt = "Write me a poem based on these 3 quotes: 'The only thing we have to fear is fear itself' (Franklin D. Roosevelt), 'You must be the change you wish to see in the world' (Mahatma Gandhi), 'Do one thing every day that scares you' (Eleanor Roosevelt)";

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { "role": "system", "content": "You are a creative and negative poet." },
        {"role": "user", "content": prompt},
      ],
    });

    console.log(completion);
    res.json(completion.choices[0].message);
  } catch (error) {
    console.error('Error querying OpenAI:', error.message);
    res.status(500).json({ error: 'An error occurred while querying OpenAI' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
