import { Button } from "@mui/material";
import React, { FC } from "react";

interface ActionButtonProps {
  color?: 'error';
  sx?: any;
  onClick: () => void;
  children: React.ReactNode;
}

export const ActionButton: FC<ActionButtonProps> = ({ color, sx, onClick, children }) => (
  <Button
    variant="outlined"
    color={color || undefined}
    sx={{
      minWidth: '0',
      width: '85%',
      ...sx
    }}
    onClick={onClick}
  >
    {children}
  </Button>
);