import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import WorkWidget from '../../components/WorkWidget.jsx';

const mockExperiences = [
  {
    logo: '/images/company1.png',
    organization: 'Anthropic',
    jobTitle: 'Software Engineer',
    startYear: 2023,
    endYear: null,
  },
  {
    logo: '/images/company2.png',
    organization: 'Ensign College',
    jobTitle: 'Teaching Assistant',
    startYear: 2022,
    endYear: 2023,
  },
];

test('renders the title and content', () => {
  render(
    <WorkWidget title="Experience" content="Where I have worked." experiences={mockExperiences} />
  );

  expect(screen.getByTestId('workWidgetTitle').textContent).toBe('Experience');
  expect(screen.getByTestId('workWidgetContent').textContent).toBe('Where I have worked.');
});

test('renders all experience items', () => {
  render(
    <WorkWidget title="Experience" content="Where I have worked." experiences={mockExperiences} />
  );

  expect(screen.getByTestId('workWidgetItem0')).toBeTruthy();
  expect(screen.getByTestId('workWidgetItem1')).toBeTruthy();
});

test('renders organization name and job title correctly', () => {
  render(
    <WorkWidget title="Experience" content="Where I have worked." experiences={mockExperiences} />
  );

  expect(screen.getByTestId('workWidgetItemTitle0').textContent).toBe('Anthropic');
  expect(screen.getByTestId('workWidgetItemContent0').textContent).toBe('Software Engineer');
});

test('shows Now when endYear is null', () => {
  render(
    <WorkWidget title="Experience" content="Where I have worked." experiences={mockExperiences} />
  );

  expect(screen.getByTestId('workWidgetItemDates0').textContent).toContain('Now');
});

test('shows endYear when provided', () => {
  render(
    <WorkWidget title="Experience" content="Where I have worked." experiences={mockExperiences} />
  );

  expect(screen.getByTestId('workWidgetItemDates1').textContent).toContain('2023');
});

test('renders no items when experiences is empty', () => {
  render(<WorkWidget title="Experience" content="Where I have worked." />);

  expect(screen.queryByTestId('workWidgetItem0')).toBeNull();
});
