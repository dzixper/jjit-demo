import { TECHNOLOGIES } from '../shared/technologies';

export function weirdTechLabels(tech: string): string { // TODO XD przepraszam
  tech = tech.toLowerCase();
  switch (tech) {
    case '.net': return 'net';
    case 'ux/ui': return 'ux';
    default: return tech;
  }
}

export function offerDaysAfterPosted(date: Date): number {
  const today = new Date();
  date = new Date(date);
  return Math.floor(
    (today.getTime() - date.getTime()) / (1000 * 3600 * 24)
  );
}

export function skillDescription(skill: number): string {
  switch (skill) {
    case 1: return 'Nice to have';
    case 2: return 'Junior';
    case 3: return 'Regular';
    case 4: return 'Advanced';
    case 5: return 'Master';
  }
}

export function salaryStyling(salary: [number, number], currency: string): string {
  if (salary[0] === undefined || salary[1] === undefined || currency === undefined) {
    return 'Undisclosed salary';
  }
  if (salary[0] === null || salary[1] === null || currency === null) {
    return 'Undisclosed salary';
  }
  return (salary[0] + ' - ' + salary[1] + ' ' + currency).replace(
    /([0-9]{3} )/g,
    ' $1'
  );
}

export function dateStyling(date: Date): string {
  return isNew(date) ? 'New' : offerDaysAfterPosted(date) + 'd ago';
}

export function isNew(date: Date): boolean {
  return offerDaysAfterPosted(date) <= 1;
}

export function findTechColor(tech: string): string {
  return TECHNOLOGIES.find(x => x.name.toLowerCase() === tech.toLowerCase()).color;
}

export function convertEveryTechnologyToGrayscale(id: number): void {
  const buttonsQuantity = document.querySelectorAll('.technology').length;
  if (document.getElementById('button0') === null) {
    for (let i = 1; i < buttonsQuantity; i++) {
      const button = document.getElementById('button' + i);
      button.style.filter = id === i ? 'grayscale(0%)' : 'grayscale(100%)';
    }
  } else {
    for (let i = 0; i < buttonsQuantity - 1; i++) {
      const button = document.getElementById('button' + i);
      button.style.filter = id === 0 ? 'grayscale(0%)' : id === i ? 'grayscale(0%)' : 'grayscale(100%)';
    }
  }
}
