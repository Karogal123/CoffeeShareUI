import { ShortenRecipeBodyPipe } from './shorten-recipe-body.pipe';

describe('ShortenRecipeBodyPipe', () => {
  it('create an instance', () => {
    const pipe = new ShortenRecipeBodyPipe();
    expect(pipe).toBeTruthy();
  });
});
