import { getCurrentDate } from "../dates";
import promptRepository from "../repository";

export function getCurrentPrompt(user) {
        const currentDate = getCurrentDate();
        const prompt = promptRepository.getPromptByDate(currentDate, user);
        return prompt;
}
