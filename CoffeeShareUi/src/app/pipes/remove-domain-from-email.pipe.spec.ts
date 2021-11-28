import { RemoveDomainFromEmailPipe } from './remove-domain-from-email.pipe';

describe('RemoveDomainFromEmailPipe', () => {
  it('create an instance', () => {
    const pipe = new RemoveDomainFromEmailPipe();
    expect(pipe).toBeTruthy();
  });
});
