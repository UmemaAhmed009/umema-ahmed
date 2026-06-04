export interface IAiProvider {
  ask(question: string): Promise<string>;
}