import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) =>
  createStyles({
    button: {
      backgroundColor: theme.palette.grey['300'],
      fontSize: 16,
      height: 48,
      marginButton: 16,
      width: 256,
    },
  })
)

const GreyButton = (props: { onClick: any; label: string }) => {
  const classes = useStyles()
  return (
    <Button className={classes.button} variant="contained" onClick={() => props.onClick()}>
      {props.label}
    </Button>
  )
}

export default GreyButton
