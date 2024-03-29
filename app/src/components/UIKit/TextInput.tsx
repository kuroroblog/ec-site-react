import { TextField } from '@material-ui/core'

const TextInput = (props: {
  fullWidth: boolean
  label: string
  multiline: boolean
  required: boolean
  rows: number
  value: string | number
  type: string
  onChange: any
}) => {
  return (
    <TextField
      fullWidth={props.fullWidth}
      label={props.label}
      margin="dense"
      multiline={props.multiline}
      required={props.required}
      rows={props.rows}
      value={props.value}
      type={props.type}
      onChange={props.onChange}
    />
  )
}

export default TextInput
