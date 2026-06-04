import { IAiProvider } from "./IAiPorovider";

export class MockOpenAIProvider
implements IAiProvider {

  async ask(question: string) {

    await new Promise(resolve =>
      setTimeout(resolve, 2000)
    );

    return `Mocked AI response for:
    ${question}`;
  }
}