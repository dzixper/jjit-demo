import { salaryStyling, skillDescription } from './shared-functions';

test('salaryStyling: [number, null], null', () => {
  const noSalary = salaryStyling([1200, null], null);
  expect(noSalary).toBe('Undisclosed salary');
});

test('salaryStyling: [null, number], undefined', () => {
  const noSalary = salaryStyling([null, 1400], undefined);
  expect(noSalary).toBe('Undisclosed salary');
});

test('salaryStyling: [undefined, null], undefined', () => {
  const noSalary = salaryStyling([undefined, null], undefined);
  expect(noSalary).toBe('Undisclosed salary');
});

test('salaryStyling: [null, null], string', () => {
  const noSalary = salaryStyling([null, null], 'PLN');
  expect(noSalary).toBe('Undisclosed salary');
});

test('salaryStyling: [undefined, number], string', () => {
  const noSalary = salaryStyling([undefined, 1600], 'CHF');
  expect(noSalary).toBe('Undisclosed salary');
});

test('salaryStyling: [number, number], string', () => {
  const noSalary = salaryStyling([1200, 1600], 'PLN');
  expect(noSalary).toBe('1 200 - 1 600 PLN');
});

test('skillDescription: out of range', () => {
  const outOfRange = skillDescription(6);
  expect(outOfRange).toBe(undefined);
});
