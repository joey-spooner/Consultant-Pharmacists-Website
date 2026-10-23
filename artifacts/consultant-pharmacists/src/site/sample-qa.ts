export type SampleQaItem = { number: number; question: string; answer: string };

/**
 * The Markdown's editorial preamble is not public content. Once the numbered
 * sample begins, consume every nonblank line so malformed pairs cannot vanish.
 * Validate whitespace without normalizing the client's wording.
 */
export function parseSampleQa(source: string): SampleQaItem[] {
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  const start = lines.findIndex(line => /^\d+\./.test(line));
  const body = start < 0 ? [] : lines.slice(start).filter(line => line.trim() !== '');
  const fail = (detail: string): never => {
    throw new Error(`The Calcium sample must contain 36 consecutive questions with answers. ${detail}`);
  };
  if (body.length !== 72) fail(`Expected 72 question/answer lines; found ${body.length}.`);

  return Array.from({ length: 36 }, (_, index) => {
    const number = index + 1;
    const question = body[index * 2].match(/^(\d+)\. (.+)\\$/);
    const answer = body[index * 2 + 1].match(/^\*\*Answer:\*\* (.+)$/);
    if (!question || Number(question[1]) !== number || !question[2].trim()) {
      return fail(`Invalid or out-of-order question ${number}.`);
    }
    if (!answer || !answer[1].trim()) {
      return fail(`Missing or invalid answer for question ${number}.`);
    }
    return { number, question: question[2], answer: answer[1] };
  });
}
