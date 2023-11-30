import { getTimeDifference } from '../Utils/getTimeDifference';

describe('getTimeDifference function', () => {
  it('should return "Timestamp not available" when timestamp is undefined', () => {

    const output = getTimeDifference(undefined);

    expect(output).toBe('Timestamp not available');
  });

  it('should return time difference in minutes when timestamp is provided', () => {

    const currentTime = new Date().getTime();
    const timestamp = new Date(currentTime - 5 * 60 * 1000).toISOString();

    const output = getTimeDifference(timestamp);

    expect(output).toMatch(/\d+ minutes ago/);
  });

  it('should return 0 minutes ago for a current timestamp', () => {

    const currentTime = new Date().toISOString();

    const output = getTimeDifference(currentTime);

    expect(output).toBe('0 minutes ago');
  });
});
