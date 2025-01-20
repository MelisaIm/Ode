import express from 'express';
import bodyParser from 'body-parser';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: "https://odeapp.netlify.app",
  methods: "GET,POST",
}));
app.use(bodyParser.json());

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// API route
app.post('/optimist_query', async (req, res) => {
  try {
    let { prompt } = req.body;

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

app.post('/negative_query', async (req, res) => {
  try {
    let { prompt } = req.body;

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

// Sameple poem data
app.get('/', async (req, res) => {

  const sample_poem = {
    negative: {"role":"assistant","content":"In the shadows, dread's tight grip will bind,  \nFear breeds itself, a cage of the mind,  \nRoosevelt whispered, though his words seem bright,  \nIn the hollow echoes where courage takes flight.  \n\nChange, they implore, to ripple the ground,  \nYet in the silence, reluctance is found,  \nGandhi proclaimed, a manifesto of light,  \nBut hearts worry and whisper in the dark of the night.  \n\nEach day dawns anew with the specter of fright,  \nEleanor beckons, \"Face shadows that bite,\"  \nBut oh, the weight of each trembling step,  \nAs we dance with our phantoms in a world miskept.  \n\nWhat’s the worth of courage if it's astray?  \nThe change that we long for feels distant, decayed,  \nWe mask our desires, a theater of guile,  \nAnd bravely pretend as we shy from the trial.  \n\nSo speak of the fear we are tethered to,  \nA haunting refrain that loses its hue,  \nFor to be the change is a daunting embrace,  \nYet fear casts a shadow, a relentless chase.  \n\nSo tread lightly, dreamers, on paths dark and frail,  \nFor in this great dance, we may surely fail—  \nEach one of us haunted by specters of shame,  \nIn a world where just living feels like a game.","refusal":null},
    positive: {
      "role": "assistant",
      "content": "In the shadows, fear will find no hold,  \nFor courage is the light that makes us bold,  \nRoosevelt spoke, his words a beacon bright,  \nGuiding us through the darkness of the night.  \n\nChange is the call that echoes through time,  \nGandhi's words a melody, pure and sublime,  \nBe the change you wish to see in the world,  \nLet your dreams and your actions be unfurled.  \n\nEleanor's wisdom, a truth we must heed,  \nDo one thing each day that makes your heart bleed,  \nFor it's in the doing that we find our might,  \nAnd cast off the shadows that haunt us at night.  \n\nFear is the specter that haunts our days,  \nBut courage is the light that guides our ways,  \nSo let us be brave and face our fears,  \nAnd watch as the darkness disappears.  \n\nThe change that we seek is within our grasp,  \nIf we dare to dream, if we dare to ask,  \nFor the power to change lies within our hands,  \nLet us rise up and make our stand.  \n\nSo let us be brave and face the unknown,  \nFor in the darkness, our light is shown,  \nLet us be the change we wish to see,  \nAnd set our hearts and our spirits free."
    },
    prompt: "Write me a poem based on these 3 quotes: 'The only thing we have to fear is fear itself' (Franklin D. Roosevelt), 'You must be the change you wish to see in the world' (Mahatma Gandhi), 'Do one thing every day that scares you' (Eleanor Roosevelt)"
  }

  res.status(200).json(sample_poem);

});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
