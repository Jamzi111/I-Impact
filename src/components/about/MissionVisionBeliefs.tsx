"use client"

import React from "react"
import { MissionVisionSection } from "./MissionVisionSection"
import { WhatWeBelieveSection } from "./WhatWeBelieveSection"

export function MissionVisionBeliefs() {
  return (
    <>
      <MissionVisionSection />
      <WhatWeBelieveSection />
    </>
  )
}

export * from "./MissionVisionSection"
export * from "./WhatWeBelieveSection"
