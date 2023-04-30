import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function openAIGenerateAnimal (req: any, res: any) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const animal = req.body.animal || '';
  if (animal.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid animal",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-ada-001", //Better model text-davinci-003
      prompt: generateSimplePrompt(animal),
      max_tokens: 256,
      temperature: 0.6,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
    // TODO, get cheaper model up and running
    // const completion = await openai.createChatCompletion({
    //     model: "gpt-3.5-turbo",
    //     messages: [{
    //         role: 'user',
    //         content: generateRecipePrompt(animal),
    //     }],
    //     temperature: 0.6,
    //   });
    //   res.status(200).json({ result: completion.data.choices[0].message?.content });
  } catch(error: any) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(animal: any) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `Suggest three names for an animal that is a superhero.

Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: ${capitalizedAnimal}
Names:`;
}

function generateSimplePrompt(cuisine: string) {
    return `Give me a recipe for ${cuisine} cuisine`;
}

function generateRecipePrompt(cuisine: string) {
    return `
    Suggest a recipe and grocery list for a cuisine. Never include kitchen staples like olive oil or salt and pepper in the grocery list. Here is an example response I'd like you to follow.

    Cuisine: Italian
    Recipe: Spaghetti with Tomato Sauce

    Ingredients: 1 pound spaghetti
    2 tablespoons olive oil
    1 onion, chopped
    4 cloves garlic, minced
    1 can (28 ounces) crushed tomatoes
    1 teaspoon salt
    1/4 teaspoon black pepper
    1/4 teaspoon red pepper flakes (optional)
    1/4 cup chopped fresh basil
    1/4 cup grated Parmesan cheese
    
    Instructions: 1. Cook spaghetti according to package directions.
    2. Meanwhile, heat olive oil in a large saucepan over medium heat. Add onion and garlic and cook until softened, about 5 minutes.
    3. Add crushed tomatoes, salt, black pepper, and red pepper flakes (if using). Bring to a simmer and let cook for 10-15 minutes, stirring occasionally.
    4. Drain spaghetti and add to the saucepan with the tomato sauce. Toss to combine.
    5. Serve topped with chopped fresh basil and grated Parmesan cheese.

    Grocery List: 1 lb Spaghetti
    1 yellow Onion
    1 head of Garlic
    1 can (28oz) Crushed tomatoes
    1 package Fresh basil
    1/4 cup Parmesan cheese

    Cuisine: ${cuisine}
  `;
}