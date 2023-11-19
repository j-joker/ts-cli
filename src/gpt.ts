import OpenAI from 'openai';
import { writeFile } from 'fs/promises';

const openai = new OpenAI({
    apiKey: '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', // Use your actual API key
});

export async function askGPT(chineseSentences: string[], filePath: string) {
    const joinedSentences = chineseSentences.join('\\n');
    const prompt = `Generate a JSON object with unique localization keys for each of the following Chinese sentences. Each key should start with the project prefix 'test', followed by two more segments, making it a three-level structure like 'test_xx_yyy'. Here's an example key: 'test_category_subcategory'.\n\nChinese Sentences:\n${joinedSentences}`;

    try {
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-1106",
            seed: 42,
            response_format: { "type": "json_object" },
            messages: [
                { role: 'system', content: "You are an assistant that generates localization keys for Chinese sentences following a specific format." },
                { role: 'user', content: prompt }
            ],
        });

        const responseText = chatCompletion.choices[0].message.content;

        // Write the JSON object to a file
        await writeFile(filePath, responseText as string);
        console.log(`Localization JSON written to ${filePath}`);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Example usage
// askGPT(["欢迎来到我们的网站", "这是一个示例组件，包含中文字符，用于本地化测试。"], "localization.json");
