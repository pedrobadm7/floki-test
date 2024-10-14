import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Avatar from '.';

describe('Avatar Component', () => {
  it('should render the user image if src is provided', () => {
    render(
      <Avatar
        src="https://randomuser.me/api/portraits/women/75.jpg"
        alt="User Avatar"
        fallback="User Name"
      />,
    );

    const imgElement = screen.getByAltText('User Avatar');

    expect(imgElement).toHaveAttribute(
      'src',
      'https://randomuser.me/api/portraits/women/75.jpg',
    );
  });

  it('should call the fallback URL when the image fails to load', () => {
    render(
      <Avatar
        src="https://invalid-url.com/invalid.jpg"
        alt="User Avatar"
        fallback="User Name"
      />,
    );

    const imgElement = screen.getByAltText('User Avatar');

    fireEvent.error(imgElement);

    expect(imgElement).toHaveAttribute(
      'src',
      'https://ui-avatars.com/api/?name=User%20Name&color=7F9CF5&background=EBF4FF',
    );
  });
});
