"use client";

import { TypeAnimation } from "react-type-animation";

export default function Component() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <h1 className="text-4xl font-bold">
        <TypeAnimation
          sequence={[
            "Judy",
            1000,
            "Web Developer",
            1000,
            "Mobile Developer",
            1000,
            "UI/UX Designer",
            1000,
          ]}
          wrapper="span"
          speed={50}
          style={{ color: "white" }} // Inline CSS to make text white
          repeat={Number.POSITIVE_INFINITY}
        />
      </h1>
    </div>
  );
}
