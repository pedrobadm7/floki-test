import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '.';

describe('Card Component', () => {
  it('renders the Card component', () => {
    render(<Card className="custom-card">Card Content</Card>);

    const card = screen.getByText('Card Content');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('custom-card');
    expect(card).toHaveClass(
      'rounded-lg border bg-card text-card-foreground shadow-sm',
    );
  });

  it('renders the CardHeader component', () => {
    render(<CardHeader className="custom-header">Card Header</CardHeader>);

    const cardHeader = screen.getByText('Card Header');
    expect(cardHeader).toBeInTheDocument();
    expect(cardHeader).toHaveClass('custom-header');
    expect(cardHeader).toHaveClass('flex flex-col space-y-1.5 p-6');
  });

  it('renders the CardTitle component', () => {
    render(<CardTitle className="custom-title">Card Title</CardTitle>);

    const cardTitle = screen.getByText('Card Title');
    expect(cardTitle).toBeInTheDocument();
    expect(cardTitle).toHaveClass('custom-title');
    expect(cardTitle).toHaveClass('text-2xl text-text');
  });

  it('renders the CardDescription component', () => {
    render(
      <CardDescription className="custom-description">
        Card Description
      </CardDescription>,
    );

    const cardDescription = screen.getByText('Card Description');
    expect(cardDescription).toBeInTheDocument();
    expect(cardDescription).toHaveClass('custom-description');
    expect(cardDescription).toHaveClass('text-sm text-muted-foreground');
  });

  it('renders the CardContent component', () => {
    render(<CardContent className="custom-content">Card Content</CardContent>);

    const cardContent = screen.getByText('Card Content');
    expect(cardContent).toBeInTheDocument();
    expect(cardContent).toHaveClass('custom-content');
    expect(cardContent).toHaveClass('p-6 pt-0');
  });

  it('renders the CardFooter component', () => {
    render(<CardFooter className="custom-footer">Card Footer</CardFooter>);

    const cardFooter = screen.getByText('Card Footer');
    expect(cardFooter).toBeInTheDocument();
    expect(cardFooter).toHaveClass('custom-footer');
    expect(cardFooter).toHaveClass('flex items-center');
  });
});
