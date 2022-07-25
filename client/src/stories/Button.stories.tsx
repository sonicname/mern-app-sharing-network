// YourComponent.stories.ts|tsx
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button, IButtonProps } from "../components/buttons";

export default {
  title: "Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args: IButtonProps) => (
  <Button {...args}>{args.children}</Button>
);

export const ButtonComponent = Template.bind({});

ButtonComponent.args = {
  primary: true,
  children: "hello world",
  type: "button",
};
