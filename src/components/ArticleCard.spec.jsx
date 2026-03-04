import { fireEvent, render } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import renderer from 'react-test-renderer';
import ArticleCard from './ArticleCard.jsx';
import fs from 'fs';
import path from 'path';

function loadCss(container, filePath) {
  const cssFileContent = fs.readFileSync(path.resolve(filePath), 'utf8');
  const style = document.createElement('style');
  style.innerHTML = cssFileContent;
  container.append(style);
}

function getByTestId(testId) {
  // -- render component
  const { container, getByTestId } = render(
    <ArticleCard content={'a'} date={'b'} title={'c'} link={'d'} />,
    {
      container: document.body,
    }
  );

  // -- load css
  loadCss(container, './src/index.css');
  loadCss(container, './src/components/ArticleCard/ArticleCard.css');

  // Act & Assert
  return getByTestId(testId);
}

afterEach(() => {
  // Restore the original console.error function after all tests
  vi.restoreAllMocks();
});

test('Required props are set correctly', async () => {
  // Arrange
  let actualErrors = [];
  const spy = vi.spyOn(console, 'error').mockImplementation((_, __, message) => {
    actualErrors.push(message);
  });
  // -- define the expected errors
  let expectedErrors = [
    'The prop `date` is marked as required in `ArticleCard`, but its value is `undefined`.',
    'The prop `title` is marked as required in `ArticleCard`, but its value is `undefined`.',
    'The prop `content` is marked as required in `ArticleCard`, but its value is `undefined`.',
  ];

  // Act
  render(<ArticleCard />);

  // Assert
  expect(spy).toHaveBeenCalledTimes(3);
  // -- for each expected error, check if it exists in the actual errors
  for (const expected of expectedErrors) {
    expect(actualErrors.find((actual) => actual === expected)).toBeTruthy();
  }
});

test('Prop types are set correctly', async () => {
  // Arrange
  let actualErrors = [];
  const spy = vi.spyOn(console, 'error').mockImplementation((_, __, message) => {
    actualErrors.push(message);
  });
  // -- define the expected errors
  let expectedErrors = [
    'Invalid prop `date` of type `number` supplied to `ArticleCard`, expected `string`.',
    'Invalid prop `title` of type `number` supplied to `ArticleCard`, expected `string`.',
    'Invalid prop `content` of type `number` supplied to `ArticleCard`, expected `string`.',
    'Invalid prop `link` of type `number` supplied to `ArticleCard`, expected `string`.',
  ];

  // Act
  render(<ArticleCard content={1} date={1} title={1} link={1} />);

  // Assert
  expect(spy).toHaveBeenCalledTimes(4);
  // -- for each expected error, check if it exists in the actual errors
  for (const expected of expectedErrors) {
    expect(actualErrors.find((actual) => actual === expected)).toBeTruthy();
  }
});

test('Default props have correct values', async () => {
  const component = renderer.create(<ArticleCard content={'a'} date={'b'} title={'c'} />);
  const testInstance = component.root;
  expect(testInstance.props.link).toBe('#');
});

test('ArticleCard has correct behavior', () => {
  const { getByTestId } = render(<ArticleCard content={'a'} date={'b'} title={'c'} link={'d'} />);
  const articleCardDate = getByTestId('articleCardDate');
  const articleCardTitle = getByTestId('articleCardTitle');
  const articleCardContent = getByTestId('articleCardContent');
  const articleCardLink = getByTestId('articleCardLink');

  // Assert
  expect(articleCardContent.textContent).toBe('a');
  expect(articleCardDate.textContent).toBe('b');
  expect(articleCardTitle.textContent).toBe('c');
  expect(articleCardLink.getAttribute('href')).toBe('d');
});

describe('ArticleCard has correct style', () => {
  test('article tag has correct style', () => {
    // Arrange
    const articleCard = getByTestId('articleCard');
    const { display, flexDirection, padding, border, borderRadius, width, maxWidth, boxShadow } =
      window.getComputedStyle(articleCard);

    expect(display).toBe('flex');
    expect(flexDirection).toBe('column');
    expect(padding).toBe('24px 32px');
    expect(border).toBe('1px solid #e0e0e0');
    expect(borderRadius).toBe('6px');
    expect(width).toBe('100%');
    expect(maxWidth).toBe('360px');
    expect(boxShadow).toBe('0 0 10px rgba(0, 0, 0, 0.1)');
  });

  test('time tag has correct style', () => {
    // Arrange
    const articleCardDate = getByTestId('articleCardDate');
    const { fontSize, textTransform, color, borderLeft, paddingLeft } =
      window.getComputedStyle(articleCardDate);
    expect(fontSize).toBe('14px');
    expect(textTransform).toBe('uppercase');
    expect(color).toBe('rgb(161, 161, 170)');
    expect(borderLeft).toBe('4px solid #e4e4e7');
    expect(paddingLeft).toBe('8px');
  });

  test('h2 tag has correct style', () => {
    // Arrange
    const articleCardTitle = getByTestId('articleCardTitle');
    const { fontSize, textTransform, margin, fontWeight } =
      window.getComputedStyle(articleCardTitle);
    expect(fontSize).toBe('24px');
    expect(textTransform).toBe('capitalize');
    expect(margin).toBe('16px 0px');
    expect(fontWeight).toBe('bold');
  });

  test('p tag has correct style', () => {
    // Arrange
    const articleCardContent = getByTestId('articleCardContent');
    const { fontSize, color, lineHeight, margin } = window.getComputedStyle(articleCardContent);
    expect(fontSize).toBe('16px');
    expect(color).toBe('rgb(51, 51, 51)');
    expect(lineHeight).toBe('1.5');
    expect(margin).toBe('0px 0px 16px 0px');
  });

  test('a tag has correct style', () => {
    // Arrange & Act
    const articleCardLink = getByTestId('articleCardLink');
    const { fontSize, fontWeight, color } = window.getComputedStyle(articleCardLink);
    fireEvent.mouseOver(articleCardLink);
    const { textDecoration } = window.getComputedStyle(articleCardLink);
    // Assert
    expect(fontSize).toBe('16px');
    expect(fontWeight).toBe('bold');
    expect(color).toBe('rgb(0, 123, 255)');
    expect(textDecoration).toBe('underline');
  });
});
