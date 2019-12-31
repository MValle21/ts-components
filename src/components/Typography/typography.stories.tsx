import React from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider } from '../../index';
import { BaseStyles } from '../BaseStyles';
import * as Typography from './index';

storiesOf("Typography2", module)
  .add("Default", () => (
    <ThemeProvider>
      <BaseStyles />
      <Typography.H1>H1. Heading Text</Typography.H1>
      <Typography.H2>H2. Heading Text</Typography.H2>
      <Typography.H3>H3. Heading Text</Typography.H3>
      <Typography.H4>H4. Heading Text</Typography.H4>
      <Typography.H5>H5. Heading Text</Typography.H5>
      <Typography.LargeLead>LargeLead</Typography.LargeLead>
      <Typography.SmallLead>SmallLead</Typography.SmallLead>
      <Typography.Paragraph>Paragraph</Typography.Paragraph>
      <Typography.SmallParagraph>SmallParagraph</Typography.SmallParagraph>
    </ThemeProvider>
  ));