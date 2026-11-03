import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";

import Search from "./Search";

const meta: Meta<typeof Search> = {
  title: "Components/Design System/Search",
  component: Search,
};
export default meta;

type Story = StoryObj<typeof Search>;

export const Primary: Story = {
  args: {},
  render: (args) => {
    const [value, setValue] = useState<string>("");
    return (
      <Search
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const ClearButtonIsKeyboardAccessible: Story = {
  args: {},
  render: (args) => {
    const [value, setValue] = useState<string>("hello");
    return (
      <Search
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Given a search field that already has a value, its clear control
    // must be exposed as a real button so keyboard and screen reader
    // users can find and use it, not only mouse users.
    const clearButton = canvas.getByRole("button", { name: /clear search/i });

    // When a keyboard user focuses the clear control and presses Enter
    clearButton.focus();
    await userEvent.keyboard("{Enter}");

    // Then the search value is cleared
    const input = canvas.getByPlaceholderText("Search");
    await expect(input).toHaveValue("");
  },
};
