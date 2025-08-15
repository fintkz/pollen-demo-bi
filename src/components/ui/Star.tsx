import React from "react";
import { Star as LucideStar } from "lucide-react";

export const Star = React.memo(
  (props: React.ComponentProps<typeof LucideStar>) => <LucideStar {...props} />
);
Star.displayName = "Star"; 