/** Возможности
 * - label (readonly)
 * - count
 * ------
 * - clear
 * -* colorPicker
 */

import { Close } from "@mui/icons-material";
import { Chip, IconButton, Stack, TextField } from "@mui/material"

interface ListItemSelectedProps {
  count?: number;
  onClose: () => void;
  // 
  value?: string;
  children?: string;
}
export const ListItemSelected = ({
  count,
  onClose,
  value = "",
  children,
}: ListItemSelectedProps) => {
  return (
    <TextField
      value={children || value}
      variant="outlined"
      slotProps={{
        input: {
          readOnly: true,
          endAdornment: (
            <Stack direction="row">
              {count && <Chip label={count} variant="filled" color="info" />}
              <IconButton onClick={onClose}>
                <Close />
              </IconButton>
            </Stack>
          )
        }
      }}
    />
  )
}