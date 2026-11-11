import React from "react";
import {Composition} from "remotion";
import {Captioned, CaptionedProps} from "./Captioned";

// 9:16, 30 fps. A hossz a bemeneti videóból jön (calculateMetadata).
export const Root: React.FC = () => (
  <Composition
    id="Captioned"
    component={Captioned}
    width={1080}
    height={1920}
    fps={30}
    durationInFrames={150}
    defaultProps={{
      src: "",
      title: "Cím ide",
      cta: "",
      words: [{text: "Teszt", start: 0.2, end: 0.8}, {text: "felirat", start: 0.8, end: 1.5}],
      durationSec: 5,
    } satisfies CaptionedProps}
    calculateMetadata={({props}) => ({durationInFrames: Math.max(30, Math.round(props.durationSec * 30))})}
  />
);
