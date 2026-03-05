import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import SkillsWidget from '../../components/SkillsWidget.jsx';

const mockSkills = [
  { name: 'React', proficiency: 90, icon: '/icons/react.png' },
  { name: 'Python', proficiency: 60, icon: '/icons/python.png' },
  { name: 'Rust', proficiency: 30, icon: '/icons/rust.png' },
];

test('renders the title and content', () => {
  render(<SkillsWidget title="Tech Stack" content="Tools I use daily." skills={mockSkills} />);

  expect(screen.getByTestId('skillsWidgetTitle').textContent).toBe('Tech Stack');
  expect(screen.getByTestId('skillsWidgetContent').textContent).toBe('Tools I use daily.');
});

test('renders all skill items', () => {
  render(<SkillsWidget title="Tech Stack" content="Tools I use daily." skills={mockSkills} />);

  expect(screen.getByTestId('skillsWidgetItem0')).toBeTruthy();
  expect(screen.getByTestId('skillsWidgetItem1')).toBeTruthy();
  expect(screen.getByTestId('skillsWidgetItem2')).toBeTruthy();
});

test('sorts skills by proficiency descending', () => {
  render(<SkillsWidget title="Tech Stack" content="Tools I use daily." skills={mockSkills} />);

  expect(screen.getByTestId('skillsWidgetItemName0').textContent).toBe('React');
  expect(screen.getByTestId('skillsWidgetItemName1').textContent).toBe('Python');
  expect(screen.getByTestId('skillsWidgetItemName2').textContent).toBe('Rust');
});

test('shows Advanced label for proficiency >= 80', () => {
  render(<SkillsWidget title="Tech Stack" content="Tools I use daily." skills={mockSkills} />);

  expect(screen.getByTestId('skillsWidgetItemProficiency0').textContent).toBe('Advanced');
});

test('shows Proficient label for proficiency >= 50', () => {
  render(<SkillsWidget title="Tech Stack" content="Tools I use daily." skills={mockSkills} />);

  expect(screen.getByTestId('skillsWidgetItemProficiency1').textContent).toBe('Proficient');
});

test('shows Learning label for proficiency below 50', () => {
  render(<SkillsWidget title="Tech Stack" content="Tools I use daily." skills={mockSkills} />);

  expect(screen.getByTestId('skillsWidgetItemProficiency2').textContent).toBe('Learning');
});
