import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ILoadingProps, Loading } from "../components/loading";

export default {
  title: "Loading",
  component: Loading,
} as ComponentMeta<typeof Loading>;

const Template: ComponentStory<typeof Loading> = (args: ILoadingProps) => (
  <Loading />
);

export const LoadingComponent = Template.bind({});

LoadingComponent.args = {};
