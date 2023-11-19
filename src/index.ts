import { readFileSync } from 'fs';
import { askGPT } from './gpt';

function extractChineseText(filePath: string, stopSigns: string[]): string[] {
    const fileContent = readFileSync(filePath, 'utf8');
    const chineseTextSegments: string[] = [];
    const chineseCharRegex = /[\u4e00-\u9fa5]/;
    let currentSegment = '';
    let isCapturing = false;

    for (let i = 0; i < fileContent.length; i++) {
        const char = fileContent[i];

        if (isCapturing) {
            if (stopSigns.includes(char)) {
                isCapturing = false;
                chineseTextSegments.push(currentSegment.trim());
                currentSegment = '';
            } else {
                currentSegment += char;
            }
        } else if (chineseCharRegex.test(char)) {
            isCapturing = true;
            currentSegment += char;
        }
    }

    // Check for any remaining captured text
    if (currentSegment.trim()) {
        chineseTextSegments.push(currentSegment.trim());
    }

    return chineseTextSegments;
}

const stopSigns = ['<', '"',"'"]; // Define the stop signs
const textSegments = extractChineseText('./test/b.jsx', stopSigns);
console.log(textSegments);
askGPT(textSegments,'localization.json')





